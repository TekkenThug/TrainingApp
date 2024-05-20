import { Program } from "@/database/entity/Program.ts";
import { AppDataSource } from "@/database/index.ts";

export default class ProgramService {
  private static repository = AppDataSource.getRepository(Program);

  static async create(data) {
    const program = new Program();

    program.title = data.title;
    program.set_count = data.setCount;
    program.rest = data.rest;

    return await ProgramService.repository.save(program);
  }

  static async getAll() {
    return await ProgramService.repository.find();
  }
}
