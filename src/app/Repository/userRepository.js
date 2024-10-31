import conexao from "../DataBase/conexao.js";

class userRepository {

    postUser(dados) {

        const sql = "INSERT INTO users SET ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                console.log(error);
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    }

    async verifyEmail(email)
    {
        const sql = 'SELECT * FROM users WHERE email = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,email,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    passwordRecovery(email) {
        const sql = "SELECT id, nick, password FROM users WHERE email = ?";

        return new Promise((resolve, reject) => {
            conexao.query(sql,email,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            })
        })
    }
}

export default new userRepository();