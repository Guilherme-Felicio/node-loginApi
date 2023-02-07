import MissingParamError from "./missing-param-error";
import ServerError from "./server-error";
import UnauthorizedError from "./unauthorized-error";

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
      body: new ServerError(),
    };
  }

  static UnauthorizedError() {
    return {
      statusCode: 401,
      body: new UnauthorizedError(),
    };
  }

  static ok(data: unknown) {
    return {
      statusCode: 200,
      body: data,
    };
  }
}

export default HttpResponse;
