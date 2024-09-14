class ResponseHandler {
  constructor(success, message, data = undefined, error = undefined) {
    this.success = success;
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
    if (error !== undefined) {
      this.error = this.serializeError(error);
    }
  }

  static success(message, data = undefined) {
    return new ResponseHandler(true, message, data);
  }

  static error(message, error = undefined) {
    return new ResponseHandler(false, message, undefined, error);
  }

  serializeError(error) {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
      };
    }
    return error;
  }
}

module.exports = ResponseHandler;
