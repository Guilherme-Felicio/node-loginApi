import HttpResponse from "@/presentation/helpers/http-response";
import { InvalidParamError, MissingParamError } from "@/utils/errors";

/* eslint-disable @typescript-eslint/ban-ts-comment */

class AuthUseCase {
  loadUserByEmailRepository;

  constructor(loadUserByEmailRepository?: any) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  }
  async auth(email: string, password: string) {
    if (!email) throw new MissingParamError("email");
    if (!password) throw new MissingParamError("password");
    if (!this.loadUserByEmailRepository)
      throw new MissingParamError("loadUserByEmailRepository");
    if (!this.loadUserByEmailRepository?.load)
      throw new InvalidParamError("loadUserByEmailRepository");

    const user = await this.loadUserByEmailRepository.load(email);

    if (!user) return null;
  }
}

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
    expect(promise).rejects.toThrow(
      new MissingParamError("loadUserByEmailRepository")
    );
  });

  test("should throw error if loadUserByEmailRepository ha no load method", async () => {
    const sut = new AuthUseCase({});

    const promise = sut.auth("anyEmail@email.com", "password");
    expect(promise).rejects.toThrow(
      new InvalidParamError("loadUserByEmailRepository")
    );
  });

  test("should return null of loadUserByEmailRepository returns null", async () => {
    const { sut } = makeSut();

    const accessToken = await sut.auth("invalid_Email@email.com", "password");
    expect(accessToken).toBeNull();
  });
});
