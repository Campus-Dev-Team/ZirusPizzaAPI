-- Crear tabla de departamentos
CREATE TABLE departamentos (
    id_departamento SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de ciudades (depende de departamentos)
CREATE TABLE ciudades (
    id_ciudad SERIAL PRIMARY KEY,
    id_departamento INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
);

-- Crear tabla de clientes (depende de ciudades)
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    id_ciudad INTEGER NOT NULL,
    detalle_direccion VARCHAR(200),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad)
);

-- Crear tabla de categorías
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Crear tabla de productos (depende de categorías)
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    id_categoria INTEGER NOT NULL,
    disponible BOOLEAN DEFAULT true,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Crear tabla de inventario (depende de productos)
CREATE TABLE inventario (
    id_inventario SERIAL PRIMARY KEY,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_actualizacion INTEGER,
    tipo_movimiento VARCHAR(50) NOT NULL CHECK (tipo_movimiento IN ('entrada', 'salida', 'ajuste')),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Crear tabla de pedidos (depende de clientes)
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    total DECIMAL(10,2) NOT NULL,
    notas TEXT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Crear tabla de detalles de pedido (depende de pedidos y productos)
CREATE TABLE detalles_pedido (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Crear tabla de conversaciones (depende de clientes)
CREATE TABLE conversaciones (
    id_conversacion SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'activa',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Crear tabla de mensajes (depende de conversaciones)
CREATE TABLE mensajes (
    id_mensaje SERIAL PRIMARY KEY,
    id_conversacion INTEGER NOT NULL,
    es_bot BOOLEAN NOT NULL,
    contenido TEXT NOT NULL,
    fecha_mensaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    intento VARCHAR(100),
    contexto JSONB,
    FOREIGN KEY (id_conversacion) REFERENCES conversaciones(id_conversacion)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_productos_categoria ON productos(id_categoria);
CREATE INDEX idx_inventario_producto ON inventario(id_producto);
CREATE INDEX idx_pedidos_cliente ON pedidos(id_cliente);
CREATE INDEX idx_detalles_pedido ON detalles_pedido(id_pedido);
CREATE INDEX idx_mensajes_conversacion ON mensajes(id_conversacion);
CREATE INDEX idx_ciudades_departamento ON ciudades(id_departamento);
CREATE INDEX idx_clientes_ciudad ON clientes(id_ciudad);

-- Crear triggers para actualizar timestamps
CREATE OR REPLACE FUNCTION update_fecha_ultima_actividad()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversaciones
    SET fecha_ultima_actividad = CURRENT_TIMESTAMP
    WHERE id_conversacion = NEW.id_conversacion;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_actividad_conversacion
AFTER INSERT ON mensajes
FOR EACH ROW
EXECUTE FUNCTION update_fecha_ultima_actividad();

-- Crear trigger para calcular subtotal en detalles_pedido
CREATE OR REPLACE FUNCTION calcular_subtotal()
RETURNS TRIGGER AS $$
BEGIN
    NEW.subtotal = NEW.cantidad * NEW.precio_unitario;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calcular_subtotal
BEFORE INSERT OR UPDATE ON detalles_pedido
FOR EACH ROW
EXECUTE FUNCTION calcular_subtotal();

-- Crear trigger para actualizar total en pedidos
CREATE OR REPLACE FUNCTION actualizar_total_pedido()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pedidos
    SET total = (
        SELECT SUM(subtotal)
        FROM detalles_pedido
        WHERE id_pedido = NEW.id_pedido
    )
    WHERE id_pedido = NEW.id_pedido;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_total_pedido
AFTER INSERT OR UPDATE OR DELETE ON detalles_pedido
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_pedido();