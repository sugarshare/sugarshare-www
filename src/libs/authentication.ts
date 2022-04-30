import { Amplify, Auth } from 'aws-amplify';

import {
  UsernameExistsException,
  UserNotFoundException,
  UserNotConfirmedException,
  NotAuthorizedException,
} from 'libs/errors';
import { authentication as authenticationSettings } from 'settings';

Amplify.configure({
  Auth: authenticationSettings,
});

interface AuthenticationInput {
  email: string;
  password: string;
}

export default class AuthenticationClient {
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
      console.log(user);
      return user;
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
      case 'UserNotConfirmedException':
        throw new UserNotConfirmedException();
      case 'NotAuthorizedException':
        throw new NotAuthorizedException();
      case 'UserNotFoundException':
        throw new UserNotFoundException();
      default:
        throw error;
    }
  }
}
