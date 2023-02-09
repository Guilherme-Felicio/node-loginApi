/* eslint-disable @typescript-eslint/ban-ts-comment */
import MissingParamError from "../helpers/missing-param-error";
import ServerError from "../helpers/server-error";
import UnauthorizedError from "../helpers/unauthorized-error";
import LoginRouter, { HttpRequest } from "./login-router";

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCaseSpy();
  // @ts-ignore
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    sut,
    authUseCaseSpy,
  };
};

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    async auth() {
      throw new Error();
    }
  }

  return new AuthUseCaseSpy();
};

const makeAuthUseCaseSpy = () => {
  class AuthUseCaseSpy {
    email: string | undefined = "";
    password = "";
    accessToken: string | null = "valid_token";

    async auth(email: string, password: string) {
      this.email = email;
      this.password = password;
      return this.accessToken;
    }
  }
  return new AuthUseCaseSpy();
};

describe("Login router", () => {
  test("Should return 400 if no email isProvided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password isProvided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "email@email.com",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 500 if no httpRequest is provided", async () => {
    const { sut } = makeSut();
    // @ts-ignore
    const httpResponse = await sut.route(undefined);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse?.body).toEqual(new ServerError());
  });

  test("Should return 500 if no httpRequest has no body", async () => {
    const { sut } = makeSut();
    const httpRequest: any = {};
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse?.body).toEqual(new ServerError());
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

  test("Should return 401 when invalid credentials are provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = null;

    const httpRequest: HttpRequest = {
      body: {
        email: "invalid_email@email.com",
        password: "invalid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(401);
    expect(httpResponse?.body).toEqual(new UnauthorizedError());
  });

  test("Should return 200 when valid credentials are provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        email: "valid_email@email.com",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(200);
    expect(httpResponse?.body?.accessToken).toBe(authUseCaseSpy.accessToken);
  });

  test("Should return 500 if no authUseCase is provided", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const sut = new LoginRouter();
    const httpRequest: HttpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse?.body).toEqual(new ServerError());
  });

  test("Should return 500 if authUseCase has no auth method", async () => {
    // @ts-ignore
    const sut = new LoginRouter({});
    const httpRequest: HttpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse?.body).toEqual(new ServerError());
  });

  test("Should return 500 if authUseCase throws error 500", async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError();
    // @ts-ignore
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest: HttpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse?.body).toEqual(new ServerError());
  });

  test("Should return 400 if invalid email is provided", async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError();
    // @ts-ignore
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest: HttpRequest = {
      body: {
        email: "invalid_email@email.com",
        password: "any_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
  });
});
