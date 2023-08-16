CREATE TYPE public.estados_pedido AS ENUM (
    'Pendiente',
    'Finalizado',
    'Entregado',
    'Anulado'
);

CREATE TABLE categorias (
  id_categoria SERIAL PRIMARY KEY,
  nombre varchar(50) NOT NULL
);



CREATE TABLE clientes (
  id_cliente SERIAL PRIMARY KEY,
  nombres_cliente character varying(50) NOT NULL,
  apellidos_cliente character varying(50) NOT NULL,
  dui_cliente character varying(10) NOT NULL,
  correo_cliente character varying(100) NOT NULL,
  telefono_cliente character varying(9) NOT NULL,
  nacimiento_cliente date NOT NULL,
  direccion_cliente character varying(200) NOT NULL,
  clave_cliente character varying(100) NOT NULL,
  estado_cliente boolean DEFAULT true NOT NULL
);


CREATE TABLE detalle_pedidos (
  id_detalle SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  precio decimal(10,2) NOT NULL,
  cantidad INTEGER NOT NULL,
  estado INTEGER NOT NULL DEFAULT '1'
);

CREATE TABLE pedidos (
  id_pedido SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  fecha date,
  direccion_pedido character varying(200) NOT NULL,
  estado public.estados_pedido DEFAULT 'Pendiente'::public.estados_pedido NOT NULL
);


CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  titulo varchar(80)  NOT NULL,
  descripcion varchar(300)  NOT NULL,
  foto varchar(100) NOT NULL,
  precio decimal(10,2) NOT NULL,
  categoria_id INTEGER NOT NULL,
  fecha date NOT NULL,
  estado INTEGER NOT NULL DEFAULT '1'
);


CREATE TABLE usuarios (
   id_usuario SERIAL PRIMARY KEY,
   nombres_usuario character varying(50) NOT NULL,
   apellidos_usuario character varying(50) NOT NULL,
   correo_usuario character varying(100) NOT NULL,
   alias_usuario character varying(50) NOT NULL,
   clave_usuario character varying(100) NOT NULL
);

INSERT INTO categorias (nombre) VALUES
('Laptops'),
('Componentes'),
('Audifonos'),
('Mouses'),
('Teclados');

INSERT INTO productos (titulo, descripcion, foto, precio, categoria_id, fecha, estado) VALUES
('Laptop Acer', '10gb de Ram, 500 Disco duro', '2.jpg', '200.00', 1, '2022-09-03', 1),
('Laptop HP', 'Full 4k', '4.jpg', '255.00', 1, '2022-09-03', 1),
('Procesador i7', 'Procesador', '6.jpg', '100.00', 2, '2022-09-03', 1),
('Cooler', 'Ventilador de pc', 'cooler.jpg', '30.00', 2, '2022-09-03', 1),
('Audifonos Gamer', 'Audifonos RGB', 'audifonos.jpg', '45.00', 3, '2022-09-03', 1),
('Audifonos SkullCandy', 'Audifonos Wirelles', 'Skull.jpg', '80.00', 3, '2022-09-03', 1),
('Mouse', 'Mouse bajero', 'mouse.jpg', '17.00', 4, '2022-09-03', 1),
('Mouse Logitech', 'Logitech', 'mouse2.jpg', '45.00', 4, '2022-09-03', 1),
('Teclado logitech', 'Logitech', 'teclado.jpg', '66.00', 5, '2022-09-03', 1),
('Teclado', 'bajero', 'teclado2.jpg', '11.00', 5, '2022-09-03', 1);

