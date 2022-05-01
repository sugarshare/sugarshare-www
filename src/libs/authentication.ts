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

interface AuthenticationInput {
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

export default class AuthenticationClient {
  static isPasswordValid(password: string) {
    const PASSWORD_PATTERN = /.{8,}/; // At least 8 of any characters except newline
    return PASSWORD_PATTERN.test(password);
  }

  static async signUp({ email, password }: AuthenticationInput): Promise<string | undefined> {
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

  static async logIn({ email, password }: AuthenticationInput): Promise<string | undefined> {
    try {
      const user = await Auth.signIn({ username: email, password });
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
