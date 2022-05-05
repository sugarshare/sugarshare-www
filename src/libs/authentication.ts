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
} from 'libs/errors';
import { authentication as authenticationSettings } from 'settings';

Amplify.configure({
  Auth: authenticationSettings,
});

interface SignUpInput {
  email: string;
  password: string;
}

interface LogInInput {
  email: string;
  password: string;
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

  static async signUp({ email, password }: SignUpInput): Promise<string | undefined> {
    try {
      const { userSub } = await Auth.signUp({
        username: email,
        password,
      });

      return userSub;
    } catch (error) {
      AuthenticationClient.handleError(error);
    }
  }

  static async logIn({ email, password }: LogInInput): Promise<void> {
    try {
      await Auth.signIn({ username: email, password });
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
      // TODO Test this
    }
  }

  static async deleteUser() {
    try {
      await Auth.deleteUser();
    } catch (error) {
      // TODO
    }
  }

  static handleError(error: unknown) {
    if (!(error instanceof Error)) {
      throw error;
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
