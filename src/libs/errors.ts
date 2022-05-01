class UsernameExistsException extends Error {}

class InvalidPasswordException extends Error {}

class UserNotFoundException extends Error {}

class UserNotConfirmedException extends Error {}

class NotAuthorizedException extends Error {}

export {
  UsernameExistsException,
  InvalidPasswordException,
  UserNotFoundException,
  UserNotConfirmedException,
  NotAuthorizedException,
};
