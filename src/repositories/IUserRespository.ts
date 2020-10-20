import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(email: String): Promise<User>;
  save(user: User): Promise<void>;
}