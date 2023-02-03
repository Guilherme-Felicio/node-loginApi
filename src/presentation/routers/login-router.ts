import HttpResponse from "../helpers/http-response";

interface HttpRequest {
  body: any;
}

class LoginRouter {
  route(httpRequest: HttpRequest | undefined) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError();
    }

    const { email, password } = httpRequest.body;
    if (!email) {
      return HttpResponse.badRequest("email");
    }
    if (!password) {
      return HttpResponse.badRequest("password");
    }
  }
}

export default LoginRouter;
