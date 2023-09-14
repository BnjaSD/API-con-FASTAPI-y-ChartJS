from Modelo.productoModel import productoModelo

class productoControlador():

    def __init__(self, id, nombre, stock):
        self.id = id
        self.nombre = nombre
        self.stock = stock

    def buscarProductos():
        datos = productoModelo.buscarProductos()
        Productos = []
        print(datos)
        for dato in datos:
            producto = {

                "ID":dato[0],
                "NombreProducto":dato[1],
                "StockDisponible":dato[2],

            }
            Productos.append(producto)
        return Productos


    def buscarProducto(id):
        productoBuscado = {}
        infoProducto = productoModelo.buscarProducto(id)
        for info in infoProducto:
            productoBuscado = {

                "ID":info[0],
                "NombreProducto": info[1],
                "StockDisponible": info[2],
            }
        return productoBuscado