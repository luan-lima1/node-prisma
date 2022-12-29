import { hash } from "bcryptjs";
import { ServiceError, ValidationError } from "../../../config/error";
import loggerIndex from "../../../config/logger/index";
import {
  IUserID,
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

  async executeServ(data: IUserReq): Promise<IUserResp | void> {
    loggerIndex.info("[UserService]::: Cadastrando Usuario");

    try {
      const existEmail = await this.userRepository.findUserByEmail(data.email);

      if (existEmail) {
        throw new ValidationError("Usuario ja Cadastrado");
      }

      const hashPass = await hash(data.password, 8);

      const response = await this.userRepository.createUser({
        ...data,
        password: hashPass,
      });
      loggerIndex.info("[UserService]::: Usuario cadastrado com Sucesso.");
      return response;
    } catch (error) {
      const errorMessage = "Ocorreu um erro ao tentar cadastrar usuario.";
      loggerIndex.error(errorMessage);
      throw new ServiceError(errorMessage);
    }
  }

  async findIdServ(id: string) {
    try {
      const getUser = await this.userRepository.findUserById(id);

      if (getUser) {
        loggerIndex.info("[UserService]::: Usuario encontrado no sistema.");
      }
      return getUser;
    } catch (error) {
      const errorMessage = "Id de Usuario não encontrado no sistema.";
      loggerIndex.error(errorMessage);
      throw new ServiceError(errorMessage);
    }
  }

  async updateServ(data: IUserID): Promise<IUserResp | any> {
    try {
      const getUser = await this.userRepository.findUserById(data.id);

      if (getUser) {
        loggerIndex.info("[UserService]::: Atualizando Dados de Usuario");
      }

      const response = await this.userRepository.updateUser({
        ...data,
      });

      loggerIndex.info("[UserService]::: Usuario Atualizado com Sucesso.");
      return response;
    } catch (error) {
      const errorMessage = "Id de Usuario nao encontrado no sistema.";
      loggerIndex.error(errorMessage);
      throw new ServiceError(errorMessage);
    }
  }

  async deleteServ(id: string) {
    try {
      const getUser = await this.userRepository.findUserById(id);

      if (getUser) {
        loggerIndex.info("[UserService]::: Usuario encontrado no sistema.");
      }

      const deleteUser = await this.userRepository.deleteUser(id);

      loggerIndex.info("[UserService]::: Usuario deletado com Sucesso.");
      return deleteUser;
    } catch (error) {
      const errorMessage = "Id de Usuario não encontrado no sistema.";
      loggerIndex.error(errorMessage);
      throw new ServiceError(errorMessage);
    }
  }
}
