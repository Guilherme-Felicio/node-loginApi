import ServerError from "./server-error";
import UnauthorizedError from "./unauthorized-error";

class HttpResponse {
  static badRequest(error: Error) {
    return {
      statusCode: 400,
      body: error,
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
