import { z } from "zod";

const create = z.object({
  body: z.object({
    title: z.string().min(1),
    setCount: z.number().min(1),
    rest: z.number().min(1),
  }),
});

const getOne = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export default { create, getOne };
