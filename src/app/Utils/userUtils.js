import argon from 'argon2';
import userRepository from '../Repository/userRepository.js';

class userUtils {

    /**
     * 
     * @param {*} nome 
     * formata um nome
     * @returns 
     */

    formatarNome(nome) {
        const arrNome = nome.split(' ');
        for (let i = 0; i < arrNome.length; i++) {
            arrNome[i] = arrNome[i].charAt(0).toUpperCase() + arrNome[i].slice(1).toLowerCase();
        }
    
        return arrNome.join(' ');
    }

    /**
     * 
     * @param {*} email 
     * valida se um email é valido
     * @returns 
     */
    emailValido(email)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async formataData (data) {

        const dataString = data;
        const [dia, mes, ano] = dataString.split('/');

        const dataFormatada = `${ano}-${mes}-${dia}`

        return dataFormatada;
    }

    async retornarArrayFormatado(dados)
    {
        const nick      = dados.nome_usuario;
        const email     = dados.email;
        const password  = await argon.hash(dados.password);
        const birthDate = await this.formataData(dados.birth_date);

        const arrDados = {nick: nick, email: email, password: password, birth_date: birthDate};

        return arrDados;
    }
    
      async RepeatedEmail(email)
      {
            let verify = false;

            try {

                const arrDados = await userRepository.verifyEmail(email);
                verify         = (arrDados[0]) ? true : false;

            } catch(error) {
                return false;
            }

            return verify;
      }
}

export default new userUtils();