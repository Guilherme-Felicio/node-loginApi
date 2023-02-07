import MissingParamError from "../helpers/missing-param-error";
import LoginRouter, { HttpRequest } from "./login-router";

const makeSut = () => {
  class AuthUseCaseSpy {
    email = "";
    password = "";
    auth(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy();
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
});
