# Koibanx challenge

API for challenge backend

# Configurar variables de entorno

Crear archivo .env a nivel raiz de la carpeta y colocar las siguientes variables de entorno

- PORT=
- MONGO_URL=

# Instalacion y uso

- npm i
- npm run start:dev

# Auth

Todos los endpoint usan Bearer token

Configurar un Header de tipo `authorization` con el siguiente valor `Bearer token`

```
Authorization: Bearer token
```

# Cargar archivo de Excel

Para cargar un archivo de Excel, realiza una petición POST a la siguiente ruta:

```bash
localhost:8081/excel/upload
```

El cuerpo de la petición debe ser un form-data con la clave "archivo" y el valor debe ser el archivo de Excel que deseas cargar.

Ejemplo usando curl:

```bash
curl -X POST \
  http://localhost:8081/excel/upload \
  -H 'Content-Type: multipart/form-data' \
  -F archivo=@/ruta/a/tu/archivo.xlsx
```

# Ver status del archivo

Para ver el status del archivo, realiza una peticion GET a la siguiente ruta:

```bash
localhost:8081/excel/mongo_id
```

# Ver errores por archivo

Para ver los errores paginados, debes hacer una solicitud GET a la ruta `localhost:8081/error/100/107`, donde 100 es el valor del `offset` y 107 es el valor del `limit`, por defecto son 10 y 0.

En el cuerpo de la solicitud, debes incluir un objeto JSON con el campo `fileId`, el cual debe ser el id del excel.

```bash
GET /error/100/107 HTTP/1.1
Host: localhost:8081
Content-Type: application/json

{
    "fileId": "60a994c6a0d565003452ce6e"
}
```

# Ver registros por archivo

Para ver los registros paginados, debes hacer una solicitud GET a la ruta `localhost:8081/record/100/107`, donde 100 es el valor del `offset` y 107 es el valor del `limit`, por defecto son 10 y 0.

En el cuerpo de la solicitud, debes incluir un objeto JSON con el campo `fileId`, el cual debe ser el id del excel.

```bash
GET /record/100/107 HTTP/1.1
Host: localhost:8081
Content-Type: application/json

{
    "fileId": "60a994c6a0d565003452ce6e"
}
```

# Justificaciones

A continuacion una pequeña explicacion del porque se usaron ciertos paquetes

- express: Crear el cliente http
- mongoose: ORM para la conexion con MongoDB
- dotenv: Usar variables de entorno
- multer: Manejo de archivos
- xlsx: Manipulacion de excel
- nodemon: Mejorar la productividad en el desarrollo de la api

Finalmente, podrán encontrar la colección de peticiones mencionadas anteriormente en postman ya configuradas junto con el archivo de excel que se usó para las pruebas
