import { Amplify, Auth } from 'aws-amplify';

import { UsernameExistsException } from 'libs/errors';
import { authentication as authenticationSettings } from 'settings';

Amplify.configure({
  Auth: authenticationSettings,
});

interface SignUpInput {
  email: string;
  password: string;
}

export default class AuthenticationClient {
  static async signUp({ email, password }: SignUpInput): Promise<string> {
    try {
      const { userSub } = await Auth.signUp({
        username: email,
        password,
      });

      return userSub;
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      switch (error.name) {
        case 'UsernameExistsException':
          throw new UsernameExistsException();
        default:
          throw error;
      }
    }
  }
}
