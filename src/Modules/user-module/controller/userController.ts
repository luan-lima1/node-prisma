import { Request, Response, NextFunction } from "express";
import { ServiceError } from "../../../config/error";
import loggerIndex from "../../../config/logger/logger-index";
import { StatusCodes } from "../../../enums/statusCodes";
import { IUserService } from "../interfaces/userInterface";

export default class userController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  handle = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    loggerIndex.info("[UserController]::: Tentando cadastrar Usuário");

    try {
      const { name, email, password } = request.body;

      const user = await this.userService.execute({
        name,
        email,
        password,
      });
      response.status(StatusCodes.OK).json(user);
      return next();
    } catch (error: any) {
      if (error.isAxiosError) {
        const errorMessage = "Erro ao cadastrar Usuário.";
        return next(new ServiceError(errorMessage));
      }
      next(error);
    }
  };
}
