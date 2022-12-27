import { IUserRepo, IUserReq, IUserResp, IUserService } from "../interfaces/userInterface";
import UserRepository from "../repository/userRepository";

export default class UserService implements IUserService{
  private userRepository: IUserRepo;

  constructor(userRepository: IUserRepo) {
    this.userRepository = userRepository;
  }

  async execute(data: IUserReq): Promise<IUserResp | void> {
    console.log('Cadastrando Usuário');

    try {
      const existEmail = await this.userRepository.findUserByEmail(
        data.email
      );

      if (existEmail) {
        throw new Error('Usuário já Cadastrado');
      }

      const response = await this.userRepository.create({
        ...data,
      });
      console.log('Usuário cadastrado');
      return response;
      

    } catch (error) {
      throw new Error('Erro ao cadastrar usuário');
    }
    
  }
}