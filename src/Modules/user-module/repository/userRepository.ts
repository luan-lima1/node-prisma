
import prismaClient from "../../../config/database/prismaClient";
import { IUserRepo, IUserReq, IUserResp } from "../interfaces/userInterface";

export default class UserRepository implements IUserRepo {
  async create(data: IUserReq): Promise<IUserResp> {
    const userData = await prismaClient.user.create({ data });
    return userData;
  }

  async findUserById(id: string): Promise<IUserResp | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });
    return user;
    
  }

  async findUserByEmail(email: string): Promise<IUserResp | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

}