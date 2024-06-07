import { z } from "zod";

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(3),
  }),
});

const register = z.object({
  body: z
    .object({
      email: z.string().min(1).email(),
      password: z
        .string()
        .min(1)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
          "Password must contains at least 1 character in lower case, 1 in upper case, symbol and digit",
        ),
      repeatPassword: z.string().min(1),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords don`t match",
    }),
});

export default { login, register };
