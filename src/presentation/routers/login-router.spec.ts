interface HttpRequest {
  body: any;
}

class LoginRouter {
  route(httpRequest: HttpRequest) {
    if (!httpRequest.body.email || !httpRequest.body.password) {
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
});
