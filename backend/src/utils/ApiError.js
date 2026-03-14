class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

// ? Custom error classes
export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message = "Service Unavailable") {
    super(503, message);
  }
}

export class GatewayTimeoutError extends ApiError {
  constructor(message = "Gateway Timeout") {
    super(504, message);
  }
}

export class RateLimitError extends ApiError {
  constructor(message = "Rate Limit Exceeded") {
    super(429, message);
  }
}

export default ApiError;