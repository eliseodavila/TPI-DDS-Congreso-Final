const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("sqlite:" + "./data/congresos.db"); // Puedes cambiar la conexión a tu base de datos SQLite

const Congreso = sequelize.define('Congreso', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreCongreso: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre es requerido'
            },
            len: {
                args: [5, 60],
                msg: 'Nombre debe ser entre 5 y 60 caracteres de longitud'
            }
        }
    },
    DescripcionCongreso: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Descripción es requerida'
            },
            len: {
                args: [5, 200],
                msg: 'La descripción debe ser entre 5 y 200 caracteres de longitud'
            }
        }
    },
    FechaCongreso: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Fecha es requerida'
            }
        }
    },
    IdTipoCongreso: {
        type: DataTypes.INTEGER
    },
    IdSala: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Id de sala es requerido'
            }
        }
    },
    IdPatrocinador: {
        type: DataTypes.INTEGER
    },
    IdOrador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Id de orador es requerido'
            }
        }
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const Evaluaciones = sequelize.define('Evaluaciones', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdCongreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'ID de Congreso es requerido'
            }
        }
    },
    IdParticipante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'ID de Participante es requerido'
            }
        }
    },
    Puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Puntuación es requerida'
            }
        }
    },
    Comentarios: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Fecha es requerida'
            }
        }
    }
}, {
    timestamps: false
});

const Inscripciones = sequelize.define('Inscripciones', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdCongreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El ID de Congreso es requerido'
            }
        }
    },
    IdParticipante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El ID de Participante es requerido'
            }
        }
    },
    FechaInscripcion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La fecha de inscripción es requerida'
            }
        }
    },
    EstadoInscripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Confirmada', 'En espera']],
                msg: "El estado de inscripción debe ser 'Confirmada' o 'En espera'"
            },
            notEmpty: {
                args: true,
                msg: 'El estado de la inscripción es requerido'
            }
        }
    }
}, {
    timestamps: false
});

const Oradores = sequelize.define('Oradores', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre es requerido'
            },
            len: {
                args: [1, 60],
                msg: 'Nombre debe tener entre 1 y 60 caracteres'
            }
        }
    },
    Apellidos: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Apellidos son requeridos'
            },
            len: {
                args: [1, 60],
                msg: 'Apellidos deben tener entre 1 y 60 caracteres'
            }
        }
    },
    Biografia: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: 'Email debe ser una dirección válida'
            },
            notEmpty: {
                args: true,
                msg: 'Email es requerido'
            }
        }
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});

const Participantes = sequelize.define('Participantes', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreParticipante: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre es requerido'
            },
            len: {
                args: [5, 60],
                msg: 'Nombre debe tener entre 5 y 60 caracteres'
            }
        }
    },
    ApellidoParticipante: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Apellido es requerido'
            },
            len: {
                args: [5, 60],
                msg: 'Apellido debe tener entre 5 y 60 caracteres'
            }
        }
    },
    FechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Fecha de nacimiento es requerida'
            }
        }
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});

const Patrocinadores = sequelize.define('Patrocinadores', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre es requerido'
            },
            len: {
                args: [1, 60],
                msg: 'Nombre debe tener entre 1 y 60 caracteres'
            }
        }
    },
    Descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Descripción es requerida'
            },
            len: {
                args: [1, 200],
                msg: 'Descripción debe tener entre 1 y 200 caracteres'
            }
        }
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: 'Email debe ser una dirección válida'
            },
            notEmpty: {
                args: true,
                msg: 'Email es requerido'
            }
        }
    },
    Telefono: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Teléfono es requerido'
            },
            
        }
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});

const Salas = sequelize.define('Salas', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreSala: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre de sala es requerido'
            },
            len: {
                args: [5, 60],
                msg: 'Nombre de sala debe tener entre 5 y 60 caracteres'
            }
        }
    },
    Capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Capacidad de sala es requerida'
            },
            isInt: {
                args: true,
                msg: 'Capacidad de sala debe ser un número entero'
            },
            min: {
                args: 1,
                msg: 'Capacidad de sala debe ser como mínimo 1'
            }
        }
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});
const TipoCongresos = sequelize.define('TipoCongresos', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre es requerido'
            },
            len: {
                args: [1, 60],
                msg: 'Nombre debe tener entre 1 y 60 caracteres'
            }
        }
    },
    Descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Descripción es requerida'
            },
            len: {
                args: [1, 200],
                msg: 'Descripción debe tener entre 1 y 200 caracteres'
            }
        }
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});

/// Definición de relaciones

//Relaciones Congreso
Congreso.belongsTo(TipoCongresos, { foreignKey: 'IdTipoCongreso', as: 'TipoCongreso' });

Inscripciones.belongsTo(Congreso, { foreignKey: 'IdCongreso', as: 'Congreso' });

Inscripciones.belongsTo(Participantes, { foreignKey: 'IdParticipante', as: 'Participantes' });

Evaluaciones.belongsTo(Congreso, { foreignKey: 'IdCongreso', as: 'Congresos' });

Evaluaciones.belongsTo(Participantes, { foreignKey: 'IdParticipante', as: 'Participante' });

Congreso.belongsTo(Oradores, {foreignKey: 'IdOrador', as: 'Orador'});

Congreso.belongsTo(Patrocinadores, { foreignKey: 'IdPatrocinador', as: 'Patrocinador' });

Congreso.belongsTo(Salas, { foreignKey: 'IdSala', as: 'Sala' });


module.exports = {
    sequelize,
    Congreso,
    Evaluaciones,
    Inscripciones,
    Oradores,
    Participantes,
    Patrocinadores,
    Salas,
    TipoCongresos
};
