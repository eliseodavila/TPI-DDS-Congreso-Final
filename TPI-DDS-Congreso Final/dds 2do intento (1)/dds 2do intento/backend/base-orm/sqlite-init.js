const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    try {
        await db.open("./data/congresos.db");

        //Definicion TipoCongreso
        let existeTipoCongresos = false; 
        let res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'TipoCongresos'",
            []
        );
        if (res.contar > 0) existeTipoCongresos = true;
        if (!existeTipoCongresos) {
            await db.run(
                `CREATE TABLE TipoCongresos (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Nombre TEXT,
                    Descripcion TEXT,
                    Activo BOOLEAN DEFAULT TRUE
                );`
            );
            console.log("Tabla TipoCongresos creada!");
            await db.run(
                `INSERT INTO TipoCongresos (Nombre, Descripcion) VALUES 
                    ('Congreso Nacional', 'Congreso de ámbito nacional'),
                    ('Congreso Internacional', 'Congreso de alcance internacional'),
                    ('Seminario Local', 'Evento de pequeña escala'),
                    ('Taller Técnico', 'Taller práctico'),
                    ('Simposio Científico', 'Simposio sobre investigaciones científicas'),
                    ('Congreso Educativo', 'Congreso de educación'),
                    ('Congreso de Tecnología', 'Congreso sobre avances tecnológicos'),
                    ('Foro Empresarial', 'Foro para empresarios');`
            );
            console.log("Datos insertados en TipoCongreso!");
        }
        let existeOrador = false;
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Oradores'",
            []
        );
        if (res.contar > 0) existeOrador = true;
        if (!existeOrador) {
            await db.run(`
                CREATE TABLE Oradores (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Nombre TEXT,
                    Apellidos TEXT,
                    Biografia TEXT,
                    Email TEXT,
                    Activo BOOLEAN DEFAULT TRUE
                )
            `);
            await db.run(`
                INSERT INTO Oradores (Nombre, Apellidos, Biografia, Email) VALUES
                ('Laura', 'García', 'Especialista en marketing digital', 'laura.garcia@example.com'),
                ('Juan', 'Pérez', 'Experto en biotecnología', 'juan.perez@example.com'),
                ('Ana', 'Martínez', 'Investigadora en inteligencia artificial', 'ana.martinez@example.com'),
                ('Carlos', 'López', 'Desarrollador de software', 'carlos.lopez@example.com'),
                ('María', 'Rodríguez', 'Profesora universitaria', 'maria.rodriguez@example.com'),
                ('Luis', 'Hernández', 'Ingeniero en telecomunicaciones', 'luis.hernandez@example.com'),
                ('Elena', 'González', 'Consultora de negocios', 'elena.gonzalez@example.com'),
                ('Pedro', 'Sánchez', 'Director de proyectos', 'pedro.sanchez@example.com'),
                ('Marta', 'Díaz', 'Especialista en recursos humanos', 'marta.diaz@example.com'),
                ('Jorge', 'Ruiz', 'Científico de datos', 'jorge.ruiz@example.com')
            `);
        }

        // Tabla Salas
        let existeSala = false;
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Salas'",
            []
        );
        if (res.contar > 0) existeSala = true;
        if (!existeSala) {
            await db.run(`
                CREATE TABLE Salas (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    NombreSala TEXT,
                    Capacidad INTEGER,
                    Activo BOOLEAN
                )
            `);
            await db.run(`
                INSERT INTO Salas (NombreSala, Capacidad, Activo) VALUES
                ('Auditorio Principal', 300 ,TRUE),
                ('Sala A', 100,TRUE),
                ('Sala B', 150,TRUE),
                ('Sala C', 200 ,TRUE),
                ('Sala D', 250,TRUE),
                ('Sala E', 400,TRUE),
                ('Sala F', 350,TRUE),
                ('Sala G', 450,TRUE),
                ('Sala H', 500,TRUE),
                ('Sala I', 600,TRUE)
            `);
        }

        // Tabla Patrocinador
        let existePatrocinador = false;
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Patrocinadores'",
            []
        );
        if (res.contar > 0) existePatrocinador = true;
        if (!existePatrocinador) {
            await db.run(`
                CREATE TABLE Patrocinadores (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Nombre TEXT,
                    Descripcion TEXT,
                    Email TEXT,
                    Telefono TEXT,
                    Activo BOOLEAN DEFAULT TRUE
                )
            `);
            await db.run(`
                INSERT INTO Patrocinadores (Nombre, Descripcion, Email, Telefono) VALUES
                ('Tech Corp', 'Patrocinador oficial del congreso', 'contact@techcorp.com', '555-1234'),
                ('Innovate Ltd', 'Empresa de innovación tecnológica', 'info@innovateltd.com', '555-5678'),
                ('Educa S.A.', 'Empresa de educación', 'contact@educasa.com', '555-9012'),
                ('Health Solutions', 'Empresa de salud', 'info@healthsolutions.com', '555-3456'),
                ('Green Energy', 'Empresa de energía renovable', 'contact@greenenergy.com', '555-7890'),
                ('Build It', 'Constructora', 'info@buildit.com', '555-2345'),
                ('AutoTech', 'Empresa automotriz', 'contact@autotech.com', '555-6789'),
                ('Foodies', 'Empresa de alimentos', 'info@foodies.com', '555-0123'),
                ('Travel Now', 'Agencia de viajes', 'contact@travelnow.com', '555-4567'),
                ('Finance Plus', 'Servicios financieros', 'info@financeplus.com', '555-8901')
            `);
        }

        // Tabla Congreso
        let existeCongreso = false;
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Congreso'",
            []
        );
        if (res.contar > 0) existeCongreso = true;
        if (!existeCongreso) {
            await db.run(`
                CREATE TABLE Congreso (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    NombreCongreso TEXT,
                    DescripcionCongreso TEXT,
                    FechaCongreso DATE,
                    IdTipoCongreso INTEGER,
                    IdOrador INTEGER,
                    IdSala INTEGER,
                    IdPatrocinador INTEGER,
                    Activo BOOLEAN DEFAULT TRUE,
                    FOREIGN KEY (IdTipoCongreso) REFERENCES TipoCongresos(Id),
                    FOREIGN KEY (IdOrador) REFERENCES Oradores(Id),
                    FOREIGN KEY (IdSala) REFERENCES Salas(Id),
                    FOREIGN KEY (IdPatrocinador) REFERENCES Patrocinadores(Id)
                )
            `);
            await db.run(`
                INSERT INTO Congreso (NombreCongreso, DescripcionCongreso, FechaCongreso, IdTipoCongreso, IdOrador, IdSala, IdPatrocinador) VALUES
                ('Innovación 2024', 'Congreso sobre innovación tecnológica', '2024-10-15', 1, 1, 1, 1),
                ('Biotecnología Avanzada', 'Congreso sobre biotecnología', '2024-11-20', 2, 2, 2, 2),
                ('IA y Futuro', 'Simposio sobre inteligencia artificial', '2024-09-05', 5, 3, 3, 3),
                ('Desarrollo Web', 'Taller práctico de desarrollo web', '2024-08-18', 4, 4, 4, 4),
                ('Educación 2.0', 'Congreso sobre innovaciones educativas', '2024-07-30', 6, 5, 5, 5),
                ('Tecnología y Negocios', 'Foro sobre impacto de la tecnología en los negocios', '2024-09-25', 7, 6, 6, 6),
                ('Salud Global', 'Congreso sobre salud global', '2024-11-10', 9, 7, 7, 7),
                ('Energías Renovables', 'Cumbre sobre energías renovables', '2024-12-05', 10, 8, 8, 8),
                ('Emprendimiento', 'Foro empresarial sobre emprendimiento', '2024-08-30', 8, 9, 9, 9),
                ('Gastronomía Sostenible', 'Simposio sobre gastronomía sostenible', '2024-10-01', 3, 10, 10, 10)
            `);
        }

        // Tabla Participante
        let existeParticipante = false;
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Participantes'",
            []
        );
        if (res.contar > 0) existeParticipante = true;
        if (!existeParticipante) {
            await db.run(`
                CREATE TABLE Participantes (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    NombreParticipante TEXT,
                    ApellidoParticipante TEXT,
                    FechaNacimiento DATE,
                    Activo BOOLEAN DEFAULT TRUE
                )
            `);
            await db.run(`
                INSERT INTO Participantes (NombreParticipante, ApellidoParticipante, FechaNacimiento) VALUES
                    ('María', 'López', '1990-05-15'),
                    ('Carlos', 'González', '1988-07-22'),
                    ('Laura', 'Martínez', '1995-03-10'),
                    ('Jorge', 'Sánchez', '1992-11-05'),
                    ('Ana', 'Hernández', '1987-04-30'),
                    ('Pablo', 'Díaz', '1993-09-18'),
                    ('Elena', 'Rodríguez', '1991-07-12'),
                    ('Luis', 'Gómez', '1989-01-25'),
                    ('Sofía', 'Pérez', '1994-06-08'),
                    ('Diego', 'Ruiz', '1996-02-14');
            `);
        }
        // Tabla Inscripcion
        let existeInscripcion = false;
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Inscripciones'",
            []
        );
        if (res.contar > 0) existeInscripcion = true;
        if (!existeInscripcion) {
            await db.run(`
                CREATE TABLE  Inscripciones (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    IdParticipante INTEGER,
                    IdCongreso INTEGER,
                    FechaInscripcion DATE,
                    EstadoInscripcion TEXT,
                    FOREIGN KEY (IdParticipante) REFERENCES Participantes(Id),
                    FOREIGN KEY (IdCongreso) REFERENCES Congreso(Id)
                )
            `);
            await db.run(`
                INSERT INTO Inscripciones (IdParticipante, IdCongreso, FechaInscripcion, EstadoInscripcion) VALUES
                (1, 1, '2024-09-01','Confirmada'),
                (2, 2, '2024-09-02','Confirmada'),
                (3, 3, '2024-09-03','Confirmada'),
                (4, 4, '2024-09-04','Confirmada'),
                (5, 5, '2024-09-05','Confirmada'),
                (6, 6, '2024-09-06','Confirmada'),
                (7, 7, '2024-09-07','Confirmada'),
                (8, 8, '2024-09-08','Confirmada'),
                (9, 9, '2024-09-09','Confirmada'),
                (10, 10, '2024-09-10','Confirmada')
            `);
        }

        // Tabla Evaluacion
        let existeEvaluacion = false;
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Evaluaciones'",
            []
        );
        if (res.contar > 0) existeEvaluacion = true;
        if (!existeEvaluacion) {
            await db.run(`
                CREATE TABLE  Evaluaciones (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    IdParticipante INTEGER,
                    IdCongreso INTEGER,
                    Puntuacion INTEGER,
                    Comentarios TEXT,
                    Fecha DATE,
                    FOREIGN KEY (IdParticipante) REFERENCES Participantes(Id),
                    FOREIGN KEY (IdCongreso) REFERENCES Congreso(Id)
                )
            `);
            await db.run(`
                INSERT INTO Evaluaciones (IdParticipante, IdCongreso, Puntuacion, Comentarios, Fecha) VALUES
                (1, 1, 4, 'Muy buen congreso, excelente organización.','2024-09-01'),
                (2, 2, 5, 'Me gustó mucho la profundidad de los temas tratados.','2024-09-01'),
                (3, 3, 3, 'Buena experiencia, aunque algunos horarios se solapaban.','2024-09-01'),
                (4, 4, 4, 'Interesante, aprendí mucho sobre desarrollo web.','2024-09-01'),
                (5, 5, 5, 'Excelente organización y ponentes muy cualificados.','2024-09-01'),
                (6, 6, 4, 'Buenas sesiones, aunque algunas podrían haber sido más interactivas.','2024-09-01'),
                (7, 7, 3, 'Temas relevantes pero la logística podría mejorar.','2024-09-01'),
                (8, 8, 5, 'Muy buena iniciativa sobre energías renovables.','2024-09-01'),
                (9, 9, 4, 'Interesante discusión sobre emprendimiento y financiamiento.','2024-09-01'),
                (10, 10, 3, 'Me gustó el enfoque en gastronomía sostenible.','2024-09-01')
            `);
        }

        await db.close();
        console.log("Base de datos creada correctamente.");
    } catch (err) {
        console.error("Error al crear la base de datos:", err);
    }
}

CrearBaseSiNoExiste();
     
module.exports = CrearBaseSiNoExiste;

