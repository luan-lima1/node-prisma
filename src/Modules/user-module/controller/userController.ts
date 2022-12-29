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

      const user = await this.userService.executeServ({
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
  getIdData = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IUserResp | any> => {
    try {
      const { id } = request.params;

      const findUser = await this.userService.findIdServ(id);

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

  updateData = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IUserResp | void> => {
    try {
      const { name, email, password } = request.body;
      const { id } = request.params;

      const updateUser = await this.userService.updateServ({
        id,
        name,
        email,
        password,
      });

      response.status(StatusCodes.OK).json(updateUser);
      return next();
    } catch (error: any) {
      if (error.isAxiosError) {
        const errorMessage = "Erro ao cadastrar Usuario.";
        return next(new ServiceError(errorMessage));
      }
      next(error);
    }
  };

  deleteData = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IUserResp | any> => {
    try {
      const { id } = request.params;

      await this.userService.deleteServ(id);

      response.status(StatusCodes.OK).json();
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
