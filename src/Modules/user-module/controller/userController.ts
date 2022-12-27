import { Request, Response, NextFunction} from "express";
import { StatusCodes } from "../../../enums/statusCodes";
import { IUserService } from "../interfaces/userInterface";

export default class userController {
  private userService: IUserService;

  constructor(userService: IUserService){
    this.userService = userService;
  }

handle = async (request: Request, response: Response, next: NextFunction): Promise <Response | void> => { 
console.log('Tentando Cadastrar o usuário');

try {
  const { name, email, password } = request.body;

  const user = await this.userService.execute({
    name,
    email,
    password,

  });
 response.status(StatusCodes.OK).json(user);
} catch (error) {
  throw new Error('Erro ao cadastrar Usuário');
}
}
}