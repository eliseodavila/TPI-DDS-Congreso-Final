import request from "supertest";
import app from "../index.js";

describe("GET /evaluacion", () => {
  test("Debería responder un statusCode 200", async () => {
    const response = await request(app).get("/evaluacion").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(app).get("/evaluacion").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          IdCongreso: expect.any(Number),
          IdParticipante: expect.any(Number),
          Puntuacion: expect.any(Number),
          Comentarios: expect.any(String),
          Fecha: expect.any(String),
        }),
      ])
    );
  });
});
describe("GET /evaluacion/congreso/:filtro", function () {
  it("Evaluacion por Congreso", async function () {
    const res = await request(app).get("/evaluacion/congreso/4");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /evaluacion", function () {
  it("Crea una evaluacion", async function () {
    const res = await request(app).post("/evaluacion").send({
      IdCongreso: 7,
      IdParticipante: 7,
      Puntuacion: "4",
      Comentarios: "Comentario de prueba",
      Fecha: "2024-07-20",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /evaluacion/:id", function () {
  it("Actualizar una evaluacion", async function () {
    const idEvaluacion = 5;
    const res = await request(app).put(`/evaluacion/${idEvaluacion}`).send({
      IdCongreso: 7,
      IdParticipante: 7,
      Puntuacion: "4",
      Comentarios: "Comentario de prueba",
      Fecha: "2024-07-20",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});