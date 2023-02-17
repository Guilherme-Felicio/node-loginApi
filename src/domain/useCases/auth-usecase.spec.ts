import { InvalidParamError, MissingParamError } from "@/utils/errors";
import AuthUseCase from "./auth-usecase";

/* eslint-disable @typescript-eslint/ban-ts-comment */

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    email = "";
    async load(email: string) {
      this.email = email;
    }
  }
  const loadUserByEmailRepository = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(loadUserByEmailRepository);

  return {
    sut,
    loadUserByEmailRepository,
  };
};

describe("Auth usecase", () => {
  test("should throw if no email is provided", async () => {
    const { sut } = makeSut();
    // @ts-ignore
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });

  test("should throw if no password is provided", async () => {
    const { sut } = makeSut();
    // @ts-ignore
    const promise = sut.auth("anyEmail@email.com");
    expect(promise).rejects.toThrow(new MissingParamError("password"));
  });

  test("should call loadUserByEmailRepository with correct email", async () => {
    const { sut, loadUserByEmailRepository } = makeSut();

    await sut.auth("anyEmail@email.com", "password");
    expect(loadUserByEmailRepository.email).toBe("anyEmail@email.com");
  });

  test("should throw error if no loadUserByEmailRepository is provided", async () => {
    const sut = new AuthUseCase();

    const promise = sut.auth("anyEmail@email.com", "password");
    expect(promise).rejects.toThrow();
  });

  test("should throw error if loadUserByEmailRepository ha no load method", async () => {
    const sut = new AuthUseCase({});

    const promise = sut.auth("anyEmail@email.com", "password");
    expect(promise).rejects.toThrow();
  });

  test("should return null of loadUserByEmailRepository returns null", async () => {
    const { sut } = makeSut();

    const accessToken = await sut.auth("invalid_Email@email.com", "password");
    expect(accessToken).toBeNull();
  });
});
