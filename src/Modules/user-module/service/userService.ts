import { hash } from "bcryptjs";
import { ServiceError, ValidationError } from "../../../config/error";
import loggerIndex from "../../../config/logger/logger-index";
import {
  IUserRepo,
  IUserReq,
  IUserResp,
  IUserService,
} from "../interfaces/userInterface";

export default class UserService implements IUserService {
  private userRepository: IUserRepo;

  constructor(userRepository: IUserRepo) {
    this.userRepository = userRepository;
  }

  async execute(data: IUserReq): Promise<IUserResp | void> {
    loggerIndex.info("[UserService]::: Cadastrando Usuário");

    try {
      const existEmail = await this.userRepository.findUserByEmail(data.email);

      if (existEmail) {
        throw new ValidationError("Usuário já Cadastrado");
      }

      const hashPass = await hash(data.password, 8);

      const response = await this.userRepository.create({
        ...data,
        password: hashPass,
      });
      loggerIndex.info("[UserService]::: Usuário cadastrado com Sucesso.");
      return response;
    } catch (error) {
      const errorMessage = "Ocorreu um erro ao tentar cadastrar usuário.";
      loggerIndex.error(errorMessage);
      throw new ServiceError(errorMessage);
    }
  }
}
