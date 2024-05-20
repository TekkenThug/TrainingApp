import { User } from "@/database/entity/User.ts";
import { AppDataSource } from "@/database/index.ts";

export default class UserService {
    private static repository = AppDataSource.getRepository(User);

    static async create(data) {
        const user = new User();

        user.first_name = data.firstName;
        user.last_name = data.lastName;
        user.birth_date = data.birthDate;

        return await UserService.repository.save(user);
    }

    static async getAll() {
        return await UserService.repository.find();
    }
}