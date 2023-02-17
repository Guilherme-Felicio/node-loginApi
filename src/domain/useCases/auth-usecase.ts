import { InvalidParamError, MissingParamError } from "@/utils/errors";

export default class AuthUseCase {
  loadUserByEmailRepository;

  constructor(loadUserByEmailRepository?: any) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  }
  async auth(email: string, password: string) {
    if (!email) throw new MissingParamError("email");
    if (!password) throw new MissingParamError("password");

    const user = await this.loadUserByEmailRepository.load(email);

    if (!user) return null;
  }
}
