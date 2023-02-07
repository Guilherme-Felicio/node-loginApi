import HttpResponse from "../helpers/http-response";

export interface HttpRequest {
  body: any;
}

class AuthUseCase {
  auth(email: string, password: string) {
    //
  }
}

class LoginRouter {
  authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

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
    this.authUseCase.auth(email, password);
    return {
      statusCode: 401,
      body: httpRequest.body,
    };
  }
}

export default LoginRouter;
