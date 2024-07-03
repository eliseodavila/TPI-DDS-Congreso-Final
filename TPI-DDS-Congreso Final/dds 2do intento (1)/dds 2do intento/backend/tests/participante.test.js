import request from "supertest";
import app from "../index.js";

describe("GET /participante", () => {
  test("Debería responder un statusCode 200", async () => {
    const response = await request(app).get("/participante").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(app).get("/participante").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          NombreParticipante: expect.any(String),
          ApellidoParticipante: expect.any(String),
          FechaNacimiento: expect.any(String),
          Activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /participante/nombre/:nombre", function () {
  it("Participante por nombre", async function () {
    const res = await request(app).get("/participante/nombre/Luis");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /participante", function () {
  it("Crea un participante", async function () {
    const res = await request(app).post("/participante").send({
        NombreParticipante: "Nombre de prueba",
        ApellidoParticipante: "Apellido de prueba",
        FechaNacimiento: "2020-05-20",
        Activo: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /participante/:id", function () {
  it("Actualizar un participante", async function () {
    const idParticipante = 9;
    const res = await request(app).put(`/sala/${idParticipante}`).send({
        NombreParticipante: "Nombre de prueba",
        ApellidoParticipante: "Apellido de prueba",
        FechaNacimiento: "2020-05-20",
        Activo: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});