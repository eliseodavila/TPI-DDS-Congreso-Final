import request from "supertest";
import app from "../index.js";

describe("GET /tipocongreso", () => {
  test("Debería responder un statusCode 200", async () => {
    const response = await request(app).get("/tipocongreso").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(app).get("/tipocongreso").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          Nombre: expect.any(String),
          Descripcion: expect.any(String),
          Activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /tipocongreso/:nombre", function () {
  it("Evaluacion por Nombre", async function () {
    const res = await request(app).get("/tipocongreso/Seminario%20Local");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /tipocongreso", function () {
  it("Crea una Tipo Congreso", async function () {
    const res = await request(app).post("/tipocongreso").send({
      Nombre: "Nombre de prueba",
      Descripcion: "Descripcion de prueba",
      Activo: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /tipocongreso/:id", function () {
  it("Actualizar un tipo congreso", async function () {
    const idTipoCongreso = 5;
    const res = await request(app).put(`/tipocongreso/${idTipoCongreso}`).send({
      Nombre: "Masterclass de herbologia",
      Descripcion: "Descripcion de prueba",
      Activo: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});