import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRespository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase { 
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {};

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);

    if(userAlreadyExist) {
      throw new Error('User already exists. ');
    }

    const user = new User(data);

    await this.userRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe do barulho',
        email: 'email@email.com'
      },
      subject: 'Falai meu garoto',
      body: '<p>Bom dia seu Armando!</p>'
    });
    
  }
}