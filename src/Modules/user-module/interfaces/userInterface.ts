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
export interface IUserID {
  id: string;
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
  createUser(data: IUserReq): Promise<IUserResp>;

  findUserById(id: string): Promise<IUserResp | any>;

  findUserByEmail(email: string): Promise<IUserResp | null>;

  updateUser(data: IUserID): Promise<IUserResp | any>;

  deleteUser(id: string): Promise<IUserResp | any>;
}

export interface IUserController {
  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | any>;

  getIdData(data: IUserID): Promise<Response | void>;

  updateData(id: string): Promise<Response | void>;
}

export interface IUserService {
  executeServ(data: IUserServiceReq): Promise<IUserResp | void>;

  findIdServ(id: string): Promise<IUserResp | any>;

  updateServ(data: IUserID): Promise<IUserResp | any>;

  deleteServ(id: string): Promise<IUserResp | any>;
}
