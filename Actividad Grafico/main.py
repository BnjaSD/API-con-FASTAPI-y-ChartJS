from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from Modelo.productoModel import productoModelo
from Controlador.productoController import productoControlador

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

#CRUD productos

@app.get("/api/productos/")

def buscarProductos():
    productos = productoControlador.buscarProductos()
    return productos

@app.get("/api/producto/{id}")
def buscarProducto(id):
    producto = productoControlador.buscarProducto(id)
    return producto

@app.post('/api/producto/')
async def crearProducto(request: Request):
    datos = await request.json()
    print(datos)
    nombre = str(datos['NombreProducto'])
    stock = int(datos['StockProducto'])
    print(nombre, stock)
    print(productoModelo.crearProducto(nombre, stock))

@app.put('/api/producto/{id}')
async def editarProducto(request: Request):
    datos = await request.json()
    nombre = str(datos['NombreProducto'])
    stock = int(datos['StockProducto'])
    _id = int(datos['ID'])
    print(productoModelo.editarProducto(nombre, stock, _id))
    return datos

@app.delete('/api/producto/{id}')
async def eliminarProducto(request: Request):
    datos = await request.json()
    _id = int(datos['ID'])
    print(productoModelo.eliminarProducto(_id))
