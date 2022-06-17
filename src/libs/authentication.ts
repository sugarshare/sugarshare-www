import type { CognitoUser } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';

import {
  UsernameExistsException,
  InvalidPasswordException,
  UserNotFoundException,
  UserNotConfirmedException,
  NotAuthorizedException,
  CodeMismatchException,
  ExpiredCodeException,
  InvalidParameterException,
  LimitExceededException,
  NetworkError,
  NoCurrentUserError,
} from 'libs/errors';
import { SubscriptionTier } from 'libs/subscription';
import { authentication as authenticationSettings } from 'settings';

Amplify.configure({
  Auth: authenticationSettings,
});

interface SignUpInput {
  email: string;
  password: string;
  subscriptionTier: SubscriptionTier;
}

interface LogInInput {
  email: string;
  password: string;
}

interface LogInOutput {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

interface ResendConfirmationInput {
  email: string;
}

interface ResetPasswordInput {
  email: string;
}

interface ResetPasswordCodeInput {
  email: string;
  code: string;
  newPassword: string;
}

interface SignOutInput {
  global?: boolean;
}

export default class AuthenticationClient {
  static isPasswordValid(password: string) {
    const PASSWORD_PATTERN = /.{8,}/; // At least 8 of any characters except newline
    return PASSWORD_PATTERN.test(password);
  }

  static async signUp({ email, password, subscriptionTier }: SignUpInput): Promise<string | undefined> {
    try {
      const { userSub } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          'custom:subscriptionTier': subscriptionTier.toLowerCase(),
        },
      });

      return userSub;
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static async logIn({ email, password }: LogInInput): Promise<LogInOutput | undefined> {
    try {
      await Auth.signIn({ username: email, password });
      const session = await Auth.currentSession();

      return {
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      };
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static async resendConfirmationEmail({ email }: ResendConfirmationInput) {
    try {
      await Auth.resendSignUp(email);
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static async resetPassword({ email }: ResetPasswordInput): Promise<void> {
    try {
      await Auth.forgotPassword(email);
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static async resetPasswordCode({ email, code, newPassword }: ResetPasswordCodeInput): Promise<void> {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static async signOut({ global = false }: SignOutInput = {}) {
    try {
      await Auth.signOut({ global });
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static async deleteUser() {
    try {
      await Auth.deleteUser();
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static getUser(): Promise<CognitoUser | any> {
    return Auth.currentAuthenticatedUser();
  }

  static handleError(error: unknown) {
    if (!(error instanceof Error)) {
      throw error;
    }

    if (/network/i.test(error.message)) {
      throw new NetworkError();
    }

    if (/No current user/i.test(error.message)) {
      throw new NoCurrentUserError();
    }

    switch (error.name) {
      case 'UsernameExistsException':
        throw new UsernameExistsException();
      case 'InvalidPasswordException':
        throw new InvalidPasswordException();
      case 'UserNotConfirmedException':
        throw new UserNotConfirmedException();
      case 'NotAuthorizedException':
        throw new NotAuthorizedException();
      case 'UserNotFoundException':
        throw new UserNotFoundException();
      case 'CodeMismatchException':
        throw new CodeMismatchException();
      case 'ExpiredCodeException':
        throw new ExpiredCodeException();
      case 'InvalidParameterException':
        throw new InvalidParameterException();
      case 'LimitExceededException':
        throw new LimitExceededException();
      default:
        throw error;
    }
  }
}
