import status from "statuses";
import { ApiError } from "@/utils/errors.ts";
import { Program } from "@/database/entity/Program.ts";
import { AppDataSource } from "@/database/index.ts";
import UserService from "@/services/UserService.ts";

interface CreateData {
  title: string;
  setCount: number;
  rest: number;
}

export default class ProgramService {
  private static repository = AppDataSource.getRepository(Program);

  static async create(data: CreateData, userId: number) {
    const program = new Program();

    program.title = data.title;
    program.set_count = data.setCount;
    program.rest = data.rest;

    const user = await UserService.getById(userId);

    if (!user) {
      throw new ApiError(status("NOT FOUND"), "User not found");
    }

    program.user = user;

    return await ProgramService.repository.save(program);
  }

  static async getAll(userId: number) {
    return await ProgramService.repository.find({ where: { user: { id: userId } } });
  }

  static async getById(id: number) {
    return await ProgramService.repository.findOneBy({ id });
  }

  static async increaseCompleteCount(id: number) {
    const program = await this.getById(id);

    if (!program) {
      throw new Error("Not found");
    }

    program.complete_count += 1;

    return await ProgramService.repository.save(program);
  }
}
