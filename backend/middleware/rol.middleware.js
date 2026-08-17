const verificarRol = (rolPermitido) => {

    return (req, res, next) => {

        if (!req.usuario) {

            return res.status(401).json({
                error: "Usuario no autenticado"
            });

        }


        if (req.usuario.id_rol !== rolPermitido) {

            return res.status(403).json({
                error: "No tienes permisos para realizar esta acción"
            });

        }


        next();

    };

};


module.exports = {
    verificarRol
};