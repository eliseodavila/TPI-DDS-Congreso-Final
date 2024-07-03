import request from "supertest";
import app from "../index.js";

describe("GET /sala", () => {
  test("Debería responder un statusCode 200", async () => {
    const response = await request(app).get("/sala").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(app).get("/sala").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          NombreSala: expect.any(String),
          Capacidad: expect.any(Number),
          Activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /sala/nombre/:nombre", function () {
  it("Sala por Nombre", async function () {
    const res = await request(app).get("/sala/nombre/Sala%20A");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /sala", function () {
  it("Crea una sala", async function () {
    const res = await request(app).post("/sala").send({
        NombreSala: "Nombre de prueba",
        Capacidad: 200,
        Activo: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /sala/:id", function () {
  it("Actualizar una sala", async function () {
    const idSala = 1;
    const res = await request(app).put(`/sala/${idSala}`).send({
        NombreSala: "Nombre de prueba",
        Capacidad: 201,
        Activo: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});