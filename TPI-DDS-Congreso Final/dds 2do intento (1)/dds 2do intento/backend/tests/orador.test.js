import request from "supertest";
import app from "../index.js";

describe("GET /orador", () => {
  test("Debería responder un statusCode 200", async () => {
    const response = await request(app).get("/orador").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería devolver un array con objetos", async () => {
    const response = await request(app).get("/orador").send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: expect.any(Number),
          Nombre: expect.any(String),
          Apellidos: expect.any(String),
          Biografia: expect.any(String),
          Email: expect.any(String),
          Activo: expect.any(Boolean),
        }),
      ])
    );
  });
});
describe("GET /orador/nombre/:nombre", function () {
  it("Orador por nombre", async function () {
    const res = await request(app).get("/orador/nombre/Luis");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe("POST /orador", function () {
  it("Crear un Autor", async function () {
    const res = await request(app).post("/orador").send({
      Nombre: "Orador de prueba",
      Apellidos: "Apellido de prueba",
      Biografia: "Biografia de prueba",
      Email: "test@example.com",
      Activo: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("PUT /orador/:id", function () {
  it("Actualizar un Orador", async function () {
    const idOrador = 5;
    const res = await request(app).put(`/orador/${idOrador}`).send({
      Nombre: "Orador de prueba",
      Apellidos: "Apellido de prueba",
      Biografia: "Biografia de prueba",
      Email: "test@example.com",
      Activo: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// describe("DELETE /autores/eliminarAutor/:id", function () {
//   it("Eliminar un Autor", async function () {
//     const res = await request(app).delete("/autores/eliminarAutor/3");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toBeInstanceOf(Object);
//   });
// });
