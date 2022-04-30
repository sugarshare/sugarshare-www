class UsernameExistsException extends Error {}

class UserNotFoundException extends Error {}

class UserNotConfirmedException extends Error {}

class NotAuthorizedException extends Error {}

export {
  UsernameExistsException,
  UserNotFoundException,
  UserNotConfirmedException,
  NotAuthorizedException,
};
