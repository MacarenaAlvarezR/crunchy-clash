const request = require("supertest");
const jwt = require("jsonwebtoken")
const app = require("../app");
const pool =require("../config/db")

describe("Pruebas de API", () => {
    //1
    test("GET / debe responder con estado 200", async () => {

        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);

    });


    //2
    test("Get /api/health  comprobar la conexión con la base de datos", async () => {
        const response = await request(app).get("/api/health")
        expect(response.statusCode).toBe(200);
        expect(response.body.servidor).toBe("activo");
        expect(response.body.database).toBe("conectada");
    });
    //3
    test("POST api/productos sin token deben responder con 401", async () => {
        const response = await request(app)
            .post("/api/productos")
            .send({
                nombre: "Producto de prueba",
                precio: 1000
            });
        expect(response.statusCode).toBe(401)
    });
    //4
    test("POST /api/productos el usuario no administrador tiene que responder 403", async () => {
        const token = jwt.sign(
            {
                id: 1,
                id_rol: 1
            },
            process.env.JWT_SECRET
        );

        const response = await request(app)
            .post("/api/productos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nombre: "Producto de prueba",
                precio: 1000
            });
        expect(response.statusCode).toBe(403);
    });
});

afterAll(async () => {
    await pool.end();
});
