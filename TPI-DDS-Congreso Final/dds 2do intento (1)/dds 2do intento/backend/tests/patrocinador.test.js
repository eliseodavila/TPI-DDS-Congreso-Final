import request from "supertest";
import app from "../index.js";

describe("GET /patrocinador", () => {
  test("Debería responder un statusCode 200", async () => {
    const response = await request(app).get("/patrocinador").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(app).get("/patrocinador").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          Nombre: expect.any(String),
          Descripcion: expect.any(String),
          Email: expect.any(String),
          Telefono: expect.any(String),
          Activo: expect.any(Boolean),

        }),
      ])
    );
  });
});

describe("GET /patrocinador/:nombre", function () {
  it("Patrocinador por Nombre", async function () {
    const res = await request(app).get("/patrocinador/AutoTech");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /patrocinador", function () {
  it("Crea un Patrocinador", async function () {
    const res = await request(app).post("/patrocinador").send({
        Nombre: "Nombre de prueba",
        Descripcion: "Descripcion de prueba",
        Email: "example@test.com",
        Telefono: '3525-4242',
        Activo: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /patrocinador/:id", function () {
  it("Actualizar un patrocinador", async function () {
    const idPatrocinador = 2;
    const res = await request(app).put(`/patrocinador/${idPatrocinador}`).send({
        Nombre: "Nombre de prueba",
        Descripcion: "Descripcion de prueba",
        Email: "example@test.com",
        Telefono: '3525-42242',
        Activo: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});