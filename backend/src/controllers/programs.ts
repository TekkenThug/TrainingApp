import { catchAsync } from "@/utils/errors.ts";
import ProgramService from "@/services/ProgramService.ts";

const getAll = catchAsync(async (_, res) => {
  res.send(await ProgramService.getAll());
});

const createProgram = catchAsync(async (req, res) => {
  res.send(await ProgramService.create(req.body))
});

const getProgramById = catchAsync(async (req, res) => {
  res.send(await ProgramService.getById(+req.params.programId));
});

const completeProgram = catchAsync(async (req, res) => {
  res.send(await ProgramService.increaseCompleteCount(+req.params.programId));
});

export default {
  getAll,
  createProgram,
  getProgramById,
  completeProgram
}
