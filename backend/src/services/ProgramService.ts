import { Program } from "@/database/entity/Program.ts";
import { AppDataSource } from "@/database/index.ts";

interface CreateData {
  title: string;
  setCount: number;
  rest: number;
}

export default class ProgramService {
  private static repository = AppDataSource.getRepository(Program);

  static async create(data: CreateData) {
    const program = new Program();

    program.title = data.title;
    program.set_count = data.setCount;
    program.rest = data.rest;

    return await ProgramService.repository.save(program);
  }

  static async getAll() {
    return await ProgramService.repository.find();
  }

  static async getById(id: number) {
    return await ProgramService.repository.findOneBy({ id });
  }

  static async increaseCompleteCount(id: number) {
    const program = await this.getById(id);

    if (!program) {
      throw new Error("Not found");
    }

    ++program.complete_count;

    return await ProgramService.repository.save(program);
  }
}
