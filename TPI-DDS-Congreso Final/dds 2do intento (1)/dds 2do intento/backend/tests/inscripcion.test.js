import request from "supertest";
import app from "../index.js";

describe("GET /inscripcion", () => {
  test("Debería responder un statusCode 200", async () => {
    const response = await request(app).get("/inscripcion").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(app).get("/inscripcion").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          IdCongreso: expect.any(Number),
          IdParticipante: expect.any(Number),
          FechaInscripcion: expect.any(String),
          EstadoInscripcion: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /inscripcion/participante/:filtro", function () {
  it("Evaluacion por Participante", async function () {
    const res = await request(app).get("/inscripcion/participante/4");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /inscripcion", function () {
  it("Crea una Inscripcion", async function () {
    const res = await request(app).post("/inscripcion").send({
      IdCongreso: 6,
      IdParticipante: 6,
      FechaInscripcion: "2024-09-01",
      EstadoInscripcion: "Confirmada",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /inscripcion/:id", function () {
  it("Actualizar una inscripcion", async function () {
    const idInscripcion = 5;
    const res = await request(app).put(`/inscripcion/${idInscripcion}`).send({
      IdCongreso: 2,
      IdParticipante: 2,
      FechaInscripcion: "2024-09-02",
      EstadoInscripcion: "Confirmada",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});