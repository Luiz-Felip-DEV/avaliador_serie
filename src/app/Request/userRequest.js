class userRequest {

    async insertUser(req, res, next)
    {
        let msg = '';

        if (!req.body.telefone) {
            msg = 'Parametro telefone é obrigatorio.';
        }

        if (!req.body.password) {
            msg = 'Parametro password é obrigatorio.';
        }

        if (!req.body.email) {
            msg = 'Parametro email é obrigatorio.';
        }

        if (!req.body.birth_date) {
            msg = 'Parametro birth_date é obrigatorio.';
        }

        if (!req.body.cpf) {
            msg = 'Parametro cpf é obrigatorio.';
        }

        if (!req.body.last_name) {
            msg = 'Parametro last_name é obrigatorio.';
        }

        if (!req.body.name) {
            msg = 'Parametro name é obrigatorio.';
        }

        if(msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        // if (!UserUtils.emailValido(req.body.email)) {
        //     return res.status(400).json({
        //         error: true,
        //         msgUser: 'Email inválido, informe um email valido',
        //         msgOriginal: 'Email inválido, informe um email valido'
        //     });
        // }

        // if (await UserUtils.RepeatedEmail(req.body.email)) {
        //     return res.status(400).json({
        //         error: true,
        //         msgUser: 'Desculpe, o e-mail fornecido já está associado a um cadastro existente. Se deseja cadastrar um novo usuário, por favor, utilize um endereço de e-mail diferente ou entre em contato conosco para obter assistência.',
        //         msgOriginal: 'Email já consta na base de dados.'
        //     });
        // }

        next();
    }
}

export default new userRequest();