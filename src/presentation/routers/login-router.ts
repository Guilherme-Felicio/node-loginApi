import HttpResponse from "../helpers/http-response";
import MissingParamError from "../helpers/missing-param-error";

export interface HttpRequest {
  body: any;
}

class AuthUseCase {
  async auth(email: string, password: string): Promise<string> {
    return "";
  }
}

class LoginRouter {
  authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  async route(
    httpRequest: HttpRequest
  ): Promise<{ statusCode: number; body?: any }> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError("email"));
      }

      if (!password) {
        return HttpResponse.badRequest(new MissingParamError("password"));
      }

      const accessToken = await this.authUseCase.auth(email, password);
      if (!accessToken) return HttpResponse.UnauthorizedError();
      return HttpResponse.ok({ accessToken });
    } catch (err) {
      console.error(err);
      return HttpResponse.serverError();
    }
  }
}

export default LoginRouter;
