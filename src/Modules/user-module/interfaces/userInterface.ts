import { NextFunction, Request, Response } from "express";

export interface IUserResp {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserServiceReq {
  name: string;
  email: string;
  password: string;
}
export interface IUserReq {
  name: string;
  email: string;
  password: string;
}

export interface IUserRepo {
  create(data: IUserReq): Promise<IUserResp>;

  findUserById(id: string): Promise<IUserResp | null>;

  findUserByEmail(email: string): Promise<IUserResp | null>;
}

export interface IUserController {
  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

export interface IUserService {
  execute(data: IUserServiceReq): Promise<IUserResp | void>;
}
