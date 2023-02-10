import HttpResponse from "@/presentation/helpers/http-response";
import { MissingParamError } from "@/utils/errors";

/* eslint-disable @typescript-eslint/ban-ts-comment */

class AuthUseCase {
  loadUserByEmailRepository;

  constructor(loadUserByEmailRepository?: any) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  }
  async auth(email: string, password: string) {
    if (!email) throw new MissingParamError("email");
    if (!password) throw new MissingParamError("password");
    return await this.loadUserByEmailRepository.load(email);
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
    expect(promise).rejects.toThrow();
  });

  test("should throw if no password is provided", async () => {
    const { sut } = makeSut();
    // @ts-ignore
    const promise = sut.auth("anyEmail@email.com");
    expect(promise).rejects.toThrow();
  });

  test("should call loadUserByEmailRepository with correct email", async () => {
    const { sut, loadUserByEmailRepository } = makeSut();

    await sut.auth("anyEmail@email.com", "password");
    expect(loadUserByEmailRepository.email).toBe("anyEmail@email.com");
  });
});
