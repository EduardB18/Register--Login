import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Modelo de Ciudad
export const Ciudad = sequelize.define('Ciudad', {
    id_ciudad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_ciudad: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

// Modelo de PrecioPorCiudad
export const PrecioPorCiudad = sequelize.define('PrecioPorCiudad', {
    id_precio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Ciudad',
            key: 'id_ciudad'
        }
    },
    precio_minimo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    precio_maximo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

// Modelo de Hotel
export const Hotel = sequelize.define('Hotel', {
    id_hotel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_hotel: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Ciudad',
            key: 'id_ciudad'
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    precio_hora: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    precio_dia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    valoracion_promedio: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true
    }
});

// Modelo de Habitacion
export const Habitacion = sequelize.define('Habitacion', {
    id_habitacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_hotel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Hotel',
            key: 'id_hotel'
        }
    },
    numero_habitacion: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    capacidad_personas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Modelo de Usuario
export const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

// Modelo de Reserva
export const Reserva = sequelize.define('Reserva', {
    id_reserva: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id_usuario'
        }
    },
    id_hotel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Hotel',
            key: 'id_hotel'
        }
    },
    id_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Habitacion',
            key: 'id_habitacion'
        }
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    modo_reserva: {
        type: DataTypes.ENUM('hora', 'día'),
        allowNull: false
    },
    precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

// Modelo de Puntuacion
export const Puntuacion = sequelize.define('Puntuacion', {
    id_puntuacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id_usuario'
        }
    },
    id_hotel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Hotel',
            key: 'id_hotel'
        }
    },
    valor_puntuacion: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha_puntuacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

// Relaciones entre los modelos
Ciudad.hasMany(Hotel, { foreignKey: 'id_ciudad' });
Hotel.belongsTo(Ciudad, { foreignKey: 'id_ciudad' });

Ciudad.hasMany(PrecioPorCiudad, { foreignKey: 'id_ciudad' });
PrecioPorCiudad.belongsTo(Ciudad, { foreignKey: 'id_ciudad' });

Hotel.hasMany(Habitacion, { foreignKey: 'id_hotel' });
Habitacion.belongsTo(Hotel, { foreignKey: 'id_hotel' });

Usuario.hasMany(Reserva, { foreignKey: 'id_usuario' });
Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Hotel.hasMany(Reserva, { foreignKey: 'id_hotel' });
Reserva.belongsTo(Hotel, { foreignKey: 'id_hotel' });

Habitacion.hasMany(Reserva, { foreignKey: 'id_habitacion' });
Reserva.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });

Usuario.hasMany(Puntuacion, { foreignKey: 'id_usuario' });
Puntuacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Hotel.hasMany(Puntuacion, { foreignKey: 'id_hotel' });
Puntuacion.belongsTo(Hotel, { foreignKey: 'id_hotel' });
