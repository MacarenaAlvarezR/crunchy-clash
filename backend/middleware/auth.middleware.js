const jwt = require("jsonwebtoken");


const verificarToken = (req, res, next) => {

    try {

        const token = req.headers.authorization;


        if (!token) {

            return res.status(401).json({
                error: "No existe token de acceso"
            });

        }


        const tokenLimpio = token.replace("Bearer ", "");


        const usuario = jwt.verify(
            tokenLimpio,
            process.env.JWT_SECRET
        );


        req.usuario = usuario;


        next();


    } catch (error) {

        return res.status(401).json({
            error: "Token inválido o expirado"
        });

    }

};


module.exports = {
    verificarToken
};