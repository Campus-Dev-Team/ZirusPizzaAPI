-- CreateTable
CREATE TABLE "Departamento" (
    "id_departamento" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id_departamento")
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id_ciudad" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "id_departamento" INTEGER NOT NULL,

    CONSTRAINT "Ciudad_pkey" PRIMARY KEY ("id_ciudad")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(20),
    "id_ciudad" INTEGER NOT NULL,
    "detalle_direccion" VARCHAR(200),
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id_inventario" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_actualizacion" INTEGER,
    "tipo_movimiento" VARCHAR(50) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id_pedido" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "fecha_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    "total" DECIMAL(10,2) NOT NULL,
    "notas" TEXT,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "DetallePedido" (
    "id_detalle" SERIAL NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "DetallePedido_pkey" PRIMARY KEY ("id_detalle")
);

-- CreateTable
CREATE TABLE "Conversacion" (
    "id_conversacion" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_ultima_actividad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" VARCHAR(50) DEFAULT 'activa',

    CONSTRAINT "Conversacion_pkey" PRIMARY KEY ("id_conversacion")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "id_mensaje" SERIAL NOT NULL,
    "id_conversacion" INTEGER NOT NULL,
    "es_bot" BOOLEAN NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha_mensaje" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intento" VARCHAR(100),
    "contexto" JSONB,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id_mensaje")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventario_id_producto_key" ON "Inventario"("id_producto");

-- AddForeignKey
ALTER TABLE "Ciudad" ADD CONSTRAINT "Ciudad_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "Departamento"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "Ciudad"("id_ciudad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePedido" ADD CONSTRAINT "DetallePedido_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversacion" ADD CONSTRAINT "Conversacion_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_id_conversacion_fkey" FOREIGN KEY ("id_conversacion") REFERENCES "Conversacion"("id_conversacion") ON DELETE RESTRICT ON UPDATE CASCADE;
