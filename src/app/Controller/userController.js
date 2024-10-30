import userUtils from "../Utils/userUtils.js";
import userRepository from "../Repository/userRepository.js";

class userController {

    async insertUser(req, res) {

        const arrDados = await userUtils.retornarArrayFormatado(req.body);

        try {
            await userRepository.postUser(arrDados);
        }catch(error) {
            return res.status(400).json({
                error: true,
                msgUser: 'Ocorreu um erro ao tentar inserir seus dados para o cadastro. Verifique se todas as informações estão corretas e tente novamente.',
                msgOriginal: 'Erro ao inserir usuario na tabela pacientes'
            });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Usuario inserido com sucesso.",
            msgOriginal: null
        });
    }
}

export default new userController();