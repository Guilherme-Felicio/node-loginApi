import HttpResponse from "@/presentation/helpers/http-response";
import { MissingParamError } from "@/utils/errors";

/* eslint-disable @typescript-eslint/ban-ts-comment */
class AuthUseCase {
  async auth(email: string, password: string) {
    if (!email) throw new MissingParamError("email");
    if (!password) throw new MissingParamError("password");
  }
}

describe("Auth usecase", () => {
  test("should throw if no email is provided", async () => {
    const sut = new AuthUseCase();
    // @ts-ignore
    const promise = sut.auth();
    expect(promise).rejects.toThrow();
  });

  test("should throw if no password is provided", async () => {
    const sut = new AuthUseCase();
    // @ts-ignore
    const promise = sut.auth("anyEmail@email.com");
    expect(promise).rejects.toThrow();
  });
});
