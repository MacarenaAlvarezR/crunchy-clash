const pool = require("../config/db");

const crearPedido = async (req, res) => {

    const client = await pool.connect();

    try {

        const { id_usuario } = req.usuario;
        const { productos } = req.body;
        


        // VALIDAR PRODUCT
        if (!productos || productos.length === 0) {

            return res.status(400).json({
                error: "Debe enviar productos"
            });

        }


  
        await client.query("BEGIN");


        // CREAR PEDIDO
        const pedido = await client.query(
            `INSERT INTO pedido
            (id_usuario)
            VALUES ($1)
            RETURNING *`,
            [id_usuario]
        );


        const id_pedido = pedido.rows[0].id_pedido;

        let total = 0;


        // RRCORRER PRODUCT
        for (const item of productos) {


            if (!item.personalizada) {

                const producto = await client.query(
                    `
                    SELECT *
                    FROM producto
                    WHERE id_producto = $1
                    `,
                    [item.id_producto]
                );


                if (producto.rows.length === 0) {

                    throw new Error(
                        "Producto no encontrado"
                    );

                }

                const datos =
                    producto.rows[0];


                // VERIFICAR STOCK

                if (
                    datos.stock <
                    item.cantidad
                ) {

                    throw new Error(
                        `Stock insuficiente para ${datos.nombre}`
                    );

                }


            const subtotal = Number(datos.precio) * item.cantidad;

            total += subtotal;


            //DETALLE
            await client.query(
                `INSERT INTO detalle_pedido
                (
                    id_pedido,
                    id_producto,
                    cantidad,
                    precio_unitario
                )
                VALUES ($1,$2,$3,$4)`,
                [
                    id_pedido,
                    item.id_producto,
                    item.cantidad,
                    datos.precio
                ]
            );


            // DESCONTAR STOCK
            await client.query(
                `UPDATE producto
                 SET stock = stock - $1
                 WHERE id_producto = $2`,
                [
                    item.cantidad,
                    item.id_producto
                ]
                );
                continue;

        }

            
            //band personalizada

            if (
                !item.banderilla ||
                !item.banderilla.id_producto
            ) {

                throw new Error(
                    "La banderilla personalizada no tiene una banderilla válida"
                );

            }

            const banderilla =
                await client.query(
                    `
                    SELECT *
                    FROM producto
                    WHERE id_producto = $1
                    `,
                    [
                        item.banderilla.id_producto
                    ]
                );


            if (banderilla.rows.length === 0) {

                throw new Error(
                    "Banderilla no encontrada"
                );

            }

            const datosBanderilla =
                banderilla.rows[0];

            if (
                datosBanderilla.stock <
                item.cantidad
            ) {

                throw new Error(
                    `Stock insuficiente para ${datosBanderilla.nombre}`
                );

            }
            
            let precioUnitario =
                Number(datosBanderilla.precio);
            let descripcion =
                datosBanderilla.nombre;
            
            let coberturaExtra = 0;


            if (
                item.cobertura &&
                item.cobertura.id_cobertura
            ) {

                const cobertura =
                    await client.query(
                        `
                        SELECT *
                        FROM cobertura
                        WHERE id_cobertura = $1
                        `,
                        [
                            item.cobertura.id_cobertura
                        ]
                    );

                if (cobertura.rows.length === 0) {

                    throw new Error(
                        "Cobertura no encontrada"
                    );

                }


                const datosCobertura =
                    cobertura.rows[0];
                
                
                const nombreCobertura =
                    datosCobertura.nombre
                        .toLowerCase();


                if (
                    nombreCobertura === "papa"
                ) {

                    coberturaExtra = 500;

                } else if (
                    nombreCobertura === "flamin" ||
                    nombreCobertura === "dorito" ||
                    nombreCobertura === "ramen"
                ) {

                    coberturaExtra = 1000;

                }

                precioUnitario +=
                    coberturaExtra;


                descripcion +=
                    ` + ${datosCobertura.nombre}`;

            }

            //bebida
            if (
                item.bebida &&
                item.bebida.id_producto
            ) {

                const bebida =
                    await client.query(
                        `
                        SELECT *
                        FROM producto
                        WHERE id_producto = $1
                        `,
                        [
                            item.bebida.id_producto
                        ]
                    );


                if (bebida.rows.length === 0) {

                    throw new Error(
                        "Bebida no encontrada"
                    );
                }


                const datosBebida =
                    bebida.rows[0];
                if (datosBebida.stock < item.cantidad) {

                    throw new Error(
                        `Stock insuficiente para ${datosBebida.nombre}`
                    );

                }


                precioUnitario +=
                    Number(datosBebida.precio);


                descripcion +=
                    ` + ${datosBebida.nombre}`;
                await client.query(
                    `
                    UPDATE producto
                    SET stock = stock - $1
                    WHERE id_producto = $2
                    `,
                    [
                        item.cantidad,
                        datosBebida.id_producto
                    ]
                );

            }
            //snack
            if (
                item.snack &&
                item.snack.id_producto
            ) {

                const snack =
                    await client.query(
                        `
                        SELECT *
                        FROM producto
                        WHERE id_producto = $1
                        `,
                        [
                            item.snack.id_producto
                        ]
                    );


                if (snack.rows.length === 0) {

                    throw new Error(
                        "Snack no encontrado"
                    );

                }
                const datosSnack =
                    snack.rows[0];
                
                if (datosSnack.stock < item.cantidad) {

                    throw new Error(
                        `Stock insuficiente para ${datosSnack.nombre}`
                    );

                }


                precioUnitario +=
                    Number(datosSnack.precio);


                descripcion +=
                    ` + ${datosSnack.nombre}`;

                await client.query(
                    `
                    UPDATE producto
                    SET stock = stock - $1
                    WHERE id_producto = $2
                    `,
                    [
                        item.cantidad,
                        datosSnack.id_producto
                    ]
                );

            }

            const subtotal =
                precioUnitario *
                item.cantidad;


            total += subtotal;

            await client.query(
                `
                INSERT INTO detalle_pedido
                (
                    id_pedido,
                    id_producto,
                    cantidad,
                    precio_unitario,
                    descripcion
                )
                VALUES ($1,$2,$3,$4,$5)
                `,
                [
                    id_pedido,
                    datosBanderilla.id_producto,
                    item.cantidad,
                    precioUnitario,
                    descripcion
                ]
            );
            await client.query(
                `
                UPDATE producto
                SET stock = stock - $1
                WHERE id_producto = $2
                `,
                [
                    item.cantidad,
                    datosBanderilla.id_producto
                ]
            );

        }

        // ACTUALIZACION TOTAL PEDIDO
        const actualizado = await client.query(
            `UPDATE pedido
             SET total = $1
             WHERE id_pedido = $2
             RETURNING *`,
            [
                total,
                id_pedido
            ]
        );


        // CONFIRMAR CAMBIOS
        await client.query("COMMIT");


        res.json({
            mensaje: "Pedido creado correctamente",
            pedido: actualizado.rows[0]
        });


    } catch (error) {


        await client.query("ROLLBACK");


        res.status(400).json({
            error: error.message
        });


    } finally {

        client.release();

    }

};


// Admin (ver todos los pedidos)
const obtenerPedidos = async (req, res) => {

    try {

        const resultado = await pool.query(
            `
            SELECT 
                p.id_pedido,
                p.fecha,
                p.estado,
                p.total,
                u.nombre,
                u.apellido,
                u.correo
            FROM pedido p
            JOIN usuario u
            ON p.id_usuario = u.id_usuario
            ORDER BY p.fecha DESC
            `
        );


        res.json(resultado.rows);


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};




// Cliente  (ver sus propios pedidos)
const obtenerMisPedidos = async (req, res) => {

    try {

        const { id_usuario } = req.usuario;


        const resultado = await pool.query(
            `
            SELECT  p.id_pedido,
                p.fecha,
                p.estado,
                p.total
            FROM pedido p
            WHERE p.id_usuario = $1
            ORDER BY p.fecha DESC
            `,
            [id_usuario]
        );

        const pedidos = resultado.rows;

        // Obtener los productos de cada pedido
        for (const pedido of pedidos) {

            const productos = await pool.query(
                `
                SELECT
                    COALESCE(pr.nombre, 'Banderilla personalizada') AS nombre,
                    dp.cantidad,
                    dp.precio_unitario,
                    dp.descripcion
                FROM detalle_pedido dp
                LEFT JOIN producto pr
                    ON dp.id_producto = pr.id_producto
                WHERE dp.id_pedido = $1
                `,
                [pedido.id_pedido]
            );

            pedido.productos = productos.rows;

        }

        res.json(pedidos);


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};




// Admin(cambiar estado del pedido)
const actualizarEstadoPedido = async (req, res) => {

    try {

        const { id } = req.params;
        const { estado } = req.body;


        const estadosPermitidos = [
            "pendiente",
            "preparando",
            "listo para retirar",
            "entregado"
        ];


        if (!estadosPermitidos.includes(estado)) {

            return res.status(400).json({
                error: "Estado no válido"
            });

        }


        const resultado = await pool.query(
            `
            UPDATE pedido
            SET estado = $1
            WHERE id_pedido = $2
            RETURNING *
            `,
            [
                estado,
                id
            ]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                error: "Pedido no encontrado"
            });

        }


        res.json({
            mensaje: "Estado actualizado correctamente",
            pedido: resultado.rows[0]
        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

const obtenerPedidoDetalle = async (req, res) => {

    try {

        const { id } = req.params;
        const { id_usuario, id_rol } = req.usuario;


        let consulta;
        let valores;


        // Admin (puede ver cualquier pedido)
        if (id_rol === 2) {

            consulta = `
                SELECT 
                    p.id_pedido,
                    p.fecha,
                    p.estado,
                    p.total,
                    u.nombre,
                    u.apellido,
                    u.correo
                FROM pedido p
                JOIN usuario u
                ON p.id_usuario = u.id_usuario
                WHERE p.id_pedido = $1
            `;

            valores = [id];


        } else {

            // Cliente (solo ve sus pedidos)
            consulta = `
                SELECT 
                    p.id_pedido,
                    p.fecha,
                    p.estado,
                    p.total,
                    u.nombre,
                    u.apellido,
                    u.correo
                FROM pedido p
                JOIN usuario u
                ON p.id_usuario = u.id_usuario
                WHERE p.id_pedido = $1
                AND p.id_usuario = $2
            `;

            valores = [
                id,
                id_usuario
            ];

        }


        const pedido = await pool.query(
    consulta, valores
        );



        if (pedido.rows.length === 0) {

            return res.status(404).json({
                error: "Pedido no encontrado o no tienes permisos"
            });

        }


        const productos = await pool.query(
            `
            SELECT
            COALESCE(
                pr.nombre,'Banderilla personalizada') AS nombre,
                dp.cantidad,
                dp.precio_unitario,
                dp.descripcion
            FROM detalle_pedido dp
            LEFT  JOIN producto pr
            ON dp.id_producto = pr.id_producto
            WHERE dp.id_pedido = $1
            `,
            [id]
        );


        res.json({
            pedido: pedido.rows[0],
            productos: productos.rows
        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



module.exports = {
    crearPedido,
    obtenerPedidos,
    obtenerMisPedidos,
    actualizarEstadoPedido,obtenerPedidoDetalle
};