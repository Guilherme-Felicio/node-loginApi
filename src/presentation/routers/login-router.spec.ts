/* eslint-disable @typescript-eslint/ban-ts-comment */
import MissingParamError from "../helpers/missing-param-error";
import UnauthorizedError from "../helpers/unauthorized-error";
import LoginRouter, { HttpRequest } from "./login-router";

const makeSut = () => {
  class AuthUseCaseSpy {
    email: string | undefined = "";
    password = "";
    accessToken: string | null = "valid_token";

    auth(email: string, password: string) {
      this.email = email;
      this.password = password;
      return this.accessToken;
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy();
  // @ts-ignore
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    sut,
    authUseCaseSpy,
  };
};

describe("Login router", () => {
  test("Should return 400 if no email isProvided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password isProvided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "email@email.com",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 500 if no httpRequest is provided", () => {
    const { sut } = makeSut();
    // @ts-ignore
    const httpResponse = sut.route(undefined);
    expect(httpResponse?.statusCode).toBe(500);
  });

  test("Should return 500 if no httpRequest has no body", () => {
    const { sut } = makeSut();
    const httpRequest: any = {};
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
  });

  test("Should call auth useCase with correct params", () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        email: "email@email.com",
        password: "password",
      },
    };
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  test("Should return 401 when invalid credentials are provided", () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = null;

    const httpRequest: HttpRequest = {
      body: {
        email: "invalid_email@email.com",
        password: "invalid_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(401);
    expect(httpResponse?.body).toEqual(new UnauthorizedError());
  });

  test("Should return 200 when valid credentials are provided", () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        email: "valid_email@email.com",
        password: "valid_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(200);
  });

  test("Should return 500 if no authUseCase is provided", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const sut = new LoginRouter();
    const httpRequest: HttpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
  });

  test("Should return 500 if authUseCase has no auth method", () => {
    // @ts-ignore
    const sut = new LoginRouter({});
    const httpRequest: HttpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
  });
});
