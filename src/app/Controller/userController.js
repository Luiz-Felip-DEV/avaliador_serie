import userUtils from "../Utils/userUtils.js";
import userRepository from "../Repository/userRepository.js";
import jwtUtils from "../Utils/jwtUtils.js";
import argon from 'argon2';

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
            msgUser: "Usuario cadastrado com sucesso.",
            msgOriginal: null
        });
    }

    async postLogin(req, res) {

        const arrDados = await userRepository.passwordRecovery(req.body.email);
        const hashPass = arrDados[0] ? arrDados[0].password : '';
        const pass     = req.body.password;

        if (!hashPass) {
            return res.status(400).json({
                error: true,
                msgUser: 'Email ou senha incorretos.',
                msgOriginal: 'Dados incorretos.'
            });
        }

        const verify = await argon.verify(hashPass, pass);

        if (!verify) {
            return res.status(400).json({
                error: true,
                msgUser: 'Email ou senha incorretos.',
                msgOriginal: 'Dados incorretos.'
            });
        } 

        const jwt = jwtUtils.createToken(arrDados[0].id);

        return res.status(200).json({
            error: false,
            msgUser: 'Login realizado com sucesso! Bem-vindo(a) de volta, ' + arrDados[0].nick,
            msgOriginal: null,
            nick: arrDados[0].nick,
            jwt: jwt
        });
    }
}

export default new userController();