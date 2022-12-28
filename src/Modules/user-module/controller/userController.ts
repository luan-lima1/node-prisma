import { Request, Response, NextFunction } from "express";
import { ServiceError } from "../../../config/error";
import loggerIndex from "../../../config/logger/index";
import { StatusCodes } from "../../../enums/statusCodes";
import { IUserResp, IUserService } from "../interfaces/userInterface";

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
    loggerIndex.info("[UserController]::: Tentando cadastrar Usuario");

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
        const errorMessage = "Erro ao cadastrar Usuario.";
        return next(new ServiceError(errorMessage));
      }
      next(error);
    }
  };
  getData = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IUserResp | any> => {
    try {
      const { id } = request.params;

      const findUser = await this.userService.find(id);

      response.status(StatusCodes.OK).json(findUser);
      return next();
    } catch (error: any) {
      if (error.isAxiosError) {
        const errorMessage = "Erro ao cadastrar Usuario.";
        return next(new ServiceError(errorMessage));
      }
      next(error);
    }
  };
}
