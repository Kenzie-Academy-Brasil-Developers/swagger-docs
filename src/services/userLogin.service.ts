import { compare } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/users.repository";
import { sign } from "jsonwebtoken";

interface IProps {
  email: string;
  password: string;
}

class UserLoginService {
  async execute({ email, password }: IProps) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return "Email/Password incorrect";
    }

    // Aqui comparamos a senha enviada na requisição com a senha que está no banco de dados,
    // utilizamos a função compare do bcrypt para compará-las, já que a do banco está
    // criptografada
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return "Email/Password incorrect";
    }

    // Aqui utilizamos a função sign do jsonwebtoken para gerar um token, já que o email e a senha
    // já foram checados nesse ponto
    // Esta função recebe 3 parâmetros:
    // 1 - payload => Uma informação do usuário para ser usada na geração do token
    // 2 - secret => Uma chave secreta que será usada no middleware de autenticação
    // para verificar se o token é valido
    // 3 - options => Um objeto com algumas opções de configurações para o nosso token,
    // como o tempo de expiração e o subject, que será uma referência para o usuário que criar o token
    const token = sign({ email: user.email }, "a_great_secret_key", {
      subject: user.id,
      expiresIn: "3d",
    });

    // Aqui retornamos o token para usar no nosso controller
    return { token };
  }
}

export default UserLoginService;
