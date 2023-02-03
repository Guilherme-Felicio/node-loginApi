interface HttpRequest {
  body: any;
}

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
      body: new MissingParamError("test"),
    };
  }
}

class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
  }
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

describe("Login router", () => {
  test("Should return 400 if no email isProvided", () => {
    const sut = new LoginRouter();
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
    const sut = new LoginRouter();
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
    const sut = new LoginRouter();
    const httpResponse = sut.route(undefined);
    expect(httpResponse?.statusCode).toBe(500);
  });

  test("Should return 500 if no httpRequest has no body", () => {
    const sut = new LoginRouter();
    const httpRequest: any = {};
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
  });
});
