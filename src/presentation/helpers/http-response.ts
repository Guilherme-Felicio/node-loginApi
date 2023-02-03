import MissingParamError from "./missing-param-error";

class HttpResponse {
  static badRequest(paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static serverError() {
    return {
      statusCode: 500,
      body: new MissingParamError("test"),
    };
  }
}

export default HttpResponse;
