class UnauthorizedError extends Error {
  constructor() {
    super(`Unauthorized`);
    this.name = "MissingParamError";
  }
}

export default UnauthorizedError;
