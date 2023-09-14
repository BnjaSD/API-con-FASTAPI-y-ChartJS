from Conexion.conexion import Conection

class productoModelo:

    def buscarProductos():
        query = 'SELECT * FROM producto'
        tipoConsulta = 2
        conexionBD = Conection()
        conexionBD.conectar()
        resultado = conexionBD.consultaBD(query, tipoConsulta)
        conexionBD.desconectar()
        return resultado
    
    def buscarProducto(id):
        query = "SELECT * FROM producto WHERE producto_id = %s"
        parametros = id,
        tipoConsulta = 2
        conexionBD = Conection()
        conexionBD.conectar()
        resultado = conexionBD.consultaBD(query, tipoConsulta, parametros)
        conexionBD.desconectar()
        return resultado
    
    def crearProducto(nombreProducto, stockProducto):
        query = "INSERT INTO producto (producto_nombre, producto_stock) VALUES (%s,%s)"
        tipoConsulta = 1
        parametros = nombreProducto, stockProducto
        conexionBD = Conection()
        conexionBD.conectar()
        try:
            conexionBD.consultaBD(query, tipoConsulta, parametros)
            print("Se ha insertado Correctamente")
        except:
            print("Ha ocurrido un problema en la inserción")
        conexionBD.desconectar()
    
    def editarProducto(nombreProducto, stockProducto, id):
        query = "UPDATE producto SET producto_nombre = %s, producto_stock = %s WHERE producto_id = %s;"
        tipoConsulta = 1
        parametros = nombreProducto,stockProducto, id
        conexionBD = Conection()
        conexionBD.conectar()
        try:
            conexionBD.consultaBD(query, tipoConsulta, parametros)
            print("Se ha Editado Correctamente")
        except:
            print("Ha ocurrido un problema en la edición")
        conexionBD.desconectar()

    def eliminarProducto(id):
        query = "DELETE FROM producto WHERE producto_id = %s;"
        tipoConsulta = 1
        parametros = id,
        conexionBD = Conection()
        conexionBD.conectar()
        try:
            conexionBD.consultaBD(query, tipoConsulta, parametros)
            print("Se ha Eliminado Correctamente")
        except:
            print("Ha ocurrido un problema en la Eliminación")
        conexionBD.desconectar()