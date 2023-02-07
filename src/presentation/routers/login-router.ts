import HttpResponse from "../helpers/http-response";

export interface HttpRequest {
  body: any;
}

class AuthUseCase {
  auth(email: string, password: string): string {
    return "";
  }
}

class LoginRouter {
  authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  route(httpRequest: HttpRequest): { statusCode: number; body?: any } {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest("email");
      }
      if (!password) {
        return HttpResponse.badRequest("password");
      }

      const accessToken = this.authUseCase.auth(email, password);
      if (!accessToken) return HttpResponse.UnauthorizedError();
      return HttpResponse.ok({ accessToken });
    } catch (err) {
      console.error(err);
      return HttpResponse.serverError();
    }
  }
}

export default LoginRouter;
