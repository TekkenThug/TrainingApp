import status from "statuses";
import { ApiError } from "@/utils/errors";
import { Program } from "@/database/entity/Program";
import { AppDataSource } from "@/database";
import { User } from "@/database/entity/User";

interface CreateData {
  title: string;
  setCount: number;
  rest: number;
}

export default class ProgramService {
  private static repository = AppDataSource.getRepository(Program);

  static async create(data: CreateData, user: User) {
    const program = new Program();

    program.title = data.title;
    program.set_count = data.setCount;
    program.rest = data.rest;

    if (!user) {
      throw new ApiError(status("Not found"), "User not found");
    }

    program.user = user;

    const { id } = await ProgramService.repository.save(program);

    return ProgramService.repository.createQueryBuilder("program").where("program.id = :id", { id }).getOne();
  }

  static async getAll(userId: number) {
    return await ProgramService.repository.find({ where: { user: { id: userId } } });
  }

  static async getById(id: number, userId: number) {
    return await ProgramService.repository
      .createQueryBuilder("program")
      .where("program.id = :id and program.userId = :userId", { id, userId })
      .getOne();
  }

  static async increaseCompleteCount(id: number, userId: number) {
    const program = await this.getById(id, userId);

    if (!program) {
      throw new ApiError(status("Not found"), "Program not found");
    }

    program.complete_count += 1;

    return await ProgramService.repository.save(program);
  }
}
