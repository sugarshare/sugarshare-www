class UsernameExistsException extends Error {}

class InvalidPasswordException extends Error {}

class UserNotFoundException extends Error {}

class UserNotConfirmedException extends Error {}

class NotAuthorizedException extends Error {}

class CodeMismatchException extends Error {}

class ExpiredCodeException extends Error {}

class InvalidParameterException extends Error {}

class LimitExceededException extends Error {}

export {
  UsernameExistsException,
  InvalidPasswordException,
  UserNotFoundException,
  UserNotConfirmedException,
  NotAuthorizedException,
  CodeMismatchException,
  ExpiredCodeException,
  InvalidParameterException,
  LimitExceededException,
};
