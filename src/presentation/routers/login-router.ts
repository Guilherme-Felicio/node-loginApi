import HttpResponse from "../helpers/http-response";
import { InvalidParamError, MissingParamError } from "@/utils/errors";

export interface HttpRequest {
  body: any;
}

class EmailValidorSpy {
  isEmailValid: boolean | undefined;
  isValid(email: string) {
    return this.isEmailValid;
  }
}
class AuthUseCase {
  async auth(email: string, password: string): Promise<string> {
    return "";
  }
}

class LoginRouter {
  authUseCase: AuthUseCase;
  emailValidator: EmailValidorSpy;

  constructor(authUseCase: AuthUseCase, emailValidator: EmailValidorSpy) {
    this.authUseCase = authUseCase;
    this.emailValidator = emailValidator;
  }

  async route(
    httpRequest: HttpRequest
  ): Promise<{ statusCode: number; body?: any }> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError("email"));
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError("email"));
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
