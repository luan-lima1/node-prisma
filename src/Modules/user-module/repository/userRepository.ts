import prismaClient from "../../../config/database/prismaClient";
import {
  IUserID,
  IUserRepo,
  IUserReq,
  IUserResp,
} from "../interfaces/userInterface";

export default class UserRepository implements IUserRepo {
  async createUser(data: IUserReq): Promise<IUserResp> {
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

  async updateUser(data: IUserID): Promise<IUserResp> {
    const user = await prismaClient.user.update({
      where: {
        id: data.id,
      },
      data: { ...data },
    });
    return user;
  }

  async deleteUser(id: string): Promise<IUserResp> {
    const user = await prismaClient.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
