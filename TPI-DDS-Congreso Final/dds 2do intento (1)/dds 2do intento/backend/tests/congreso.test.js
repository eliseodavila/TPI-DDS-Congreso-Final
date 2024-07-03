import request from "supertest";
import app from "../index.js";

describe("GET /congreso", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(); // Levanta el servidor
  });

  afterAll(async () => {
    await server.close(); // Cierra el servidor
  });

  test("Debería responder un statusCode 200", async () => {
    const response = await request(server).get("/congreso").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(server).get("/congreso").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          NombreCongreso: expect.any(String),
          DescripcionCongreso: expect.any(String),
          FechaCongreso: expect.any(String),
          IdTipoCongreso: expect.any(Number),
          IdSala: expect.any(Number),
          IdPatrocinador: expect.any(Number),
          IdOrador: expect.any(Number),
          Activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /congreso/nombre/:nombre", function () {
  let server;

  beforeAll(async () => {
    server = app.listen(); // Levanta el servidor
  });

  afterAll(async () => {
    await server.close(); // Cierra el servidor
  });

  it("Evaluacion por Nombre", async function () {
    const res = await request(server).get("/congreso/nombre/Emprendimiento");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /congreso", function () {
  let server;

  beforeAll(async () => {
    server = app.listen(); // Levanta el servidor
  });

  afterAll(async () => {
    await server.close(); // Cierra el servidor
  });

  it("Crea una Congreso", async function () {
    const res = await request(server).post("/congreso").send({
        NombreCongreso: "Nombre de prueba",
        DescripcionCongreso: "Descripcion de prueba",
        FechaCongreso: "2024-07-20",
        IdTipoCongreso: 2,
        IdSala: 2,
        IdPatrocinador: 2,
        IdOrador: 2,
        Activo: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /congreso/:id", function () {
  let server;

  beforeAll(async () => {
    server = app.listen(); // Levanta el servidor
  });

  afterAll(async () => {
    await server.close(); // Cierra el servidor
  });

  it("Actualizar un congreso", async function () {
    const idCongreso = 5;
    const res = await request(server).put(`/congreso/${idCongreso}`).send({
        NombreCongreso: "Nombre de prueba",
        DescripcionCongreso: "Descripcion de prueba",
        FechaCongreso: "2024-07-20",
        IdTipoCongreso: 4,
        IdSala: 2,
        IdPatrocinador: 2,
        IdOrador: 2,
        Activo: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});
