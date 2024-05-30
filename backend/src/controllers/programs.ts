import { ApiError, catchAsync } from "@/utils/errors";
import ProgramService from "@/services/ProgramService";
import status from "statuses";

const getAll = catchAsync(async (req, res) => {
  if (req.user?.id) {
    res.send(await ProgramService.getAll(req.user.id));
  }
});

const createProgram = catchAsync(async (req, res) => {
  if (req.user) {
    res.status(status("Created")).send(await ProgramService.create(req.body, req.user));
  }
});

const getProgramById = catchAsync(async (req, res) => {
  if (req.user) {
    const program = await ProgramService.getById(+req.params.id, req.user.id);

    if (program) {
      res.send(program);
    } else {
      throw new ApiError(status("Not found"), "Program not found");
    }
  }
});

const completeProgram = catchAsync(async (req, res) => {
  if (req.user) {
    res.send(await ProgramService.increaseCompleteCount(+req.params.id, req.user.id));
  }
});

export default {
  getAll,
  createProgram,
  getProgramById,
  completeProgram,
};
