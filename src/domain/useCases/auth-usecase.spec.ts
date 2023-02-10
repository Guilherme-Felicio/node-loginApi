import HttpResponse from "@/presentation/helpers/http-response";
import { MissingParamError } from "@/utils/errors";

/* eslint-disable @typescript-eslint/ban-ts-comment */
class AuthUseCase {
  async auth(email: string) {
    if (!email) throw new MissingParamError("email");
  }
}

describe("Auth usecase", () => {
  test("should throw if no email is provided", async () => {
    const sut = new AuthUseCase();
    // @ts-ignore
    const promise = sut.auth();
    expect(promise).rejects.toThrow();
  });
});
