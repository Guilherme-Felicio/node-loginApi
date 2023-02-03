interface HttpRequest {
  body: any;
}

class LoginRouter {
  route(httpRequest: HttpRequest | undefined) {
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500,
      };
    }

    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return {
        statusCode: 400,
      };
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
