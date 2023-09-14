

//LLAMADO DE DATOS EN EL GRAFICO
$.ajax({
    url: "http://127.0.0.1:8000/api/productos/",
    type: "GET",
    contentType: "application/json ; charset=utf8",
    dataType: "json",
    success: function (response) {
        const ctx = document.getElementById('graficoProductos');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: response.map(row => row.NombreProducto),
                datasets: [{
                    label: 'Unidades en stock',
                    data: response.map(row => row.StockDisponible),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
})



//MOSTRAR DATOS DE LA API EN LA TABLA
$.ajax({
    url: "http://127.0.0.1:8000/api/productos/",
    type: "GET",
    contentType: "application/json ; charset=utf8",
    dataType: "json",
    success: function (response) {
        var tabla = $('#productosTable > tbody:last-child')

        console.log(response)

        response.forEach(autos => {
            var idProducto = autos.ID;
            var nombreProducto = autos.NombreProducto;
            var stockDisponible = autos.StockDisponible;
            var fila = '<tr class="filaTabla">' + '<td class ="id">' + idProducto + '</td>' + '<td>' + nombreProducto + '</td>' + '<td>' + stockDisponible + '</td>' + '<td> <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalVer" onclick="btnVer()"><i class="fas fa-eye"></i> Ver</button> <button  class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="btnEditarModal()"><i class="fa-solid fa-pen-to-square"></i> Editar</button> <button  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalEliminar" onclick="btnBorrar()" ><i class="fa-solid fa-trash"></i> Eliminar</button></td>' + '</tr>'
            tabla.append(fila)
            console.log(response)
        })
    }
});



//FUNCIONALIDAD DEL BOTON PARA CREAR REGISTRO
$('#crearBtn').click(() => {
    var nombreProducto = $('#nombreProducto').val()
    var stockDisponible = $('#stockDisponible').val()


  
    var datos = {
      "NombreProducto": nombreProducto,
      "StockProducto": stockDisponible,
    }
    console.log(datos)


  
    $.ajax({
      url:"http://127.0.0.1:8000/api/producto/",
      type:"POST",
      contentType:"application/json ; charset=utf8",
      data: JSON.stringify(datos) ,
      success: function(response){
        location.reload()
      }
    })
});




//MODAL VER REGISTRO
function btnVer() {
    var button = event.target;
    var row = button.closest('tr');
    var idElement = row.querySelector('.id');
    var id = idElement.textContent;

    $.ajax({
        url: `http://127.0.0.1:8000/api/producto/${id}`,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (response) => {
            console.log(response);
            $('#tituloModalVer').html("Nombre Producto: " + response.NombreProducto);

            var contenidoModal = `
                <div class="md-4">
                    <label for="idProducto">ID del Producto:</label>
                    <input type="text" id="idProducto" class="form-control" value="${response.ID}" disabled><br>
                </div>
  
                <div class="md-4">
                    <label for="nombreProducto">Nombre del Producto:</label>
                    <input type="text" id="nombreProducto" class="form-control" value="${response.NombreProducto}" disabled><br>
                </div>
                
                <div class="md-4">
                    <label for="stockDisponible">Unidades Disponibles:</label>
                    <input type="text" id="stockDisponible" class="form-control" value="${response.StockDisponible}" disabled>
                </div>
            `;
            $('#contenidoModalVer').html(contenidoModal);
            $('#verModal').modal('show');
        }
    });
}



//MODAL EDITAR REGISTRO
function btnEditarModal() {
    var button = event.target;
    var row = button.closest('tr');
    var idElement = row.querySelector('.id');
    ID = idElement.textContent; 

    $.ajax({
        url: `http://127.0.0.1:8000/api/producto/${ID}`,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (response) => {
            console.log(response);
            $('#tituloModalEditar').html("Editar el siguiente producto: " + response.NombreProducto);

            $("#nombreProductoE").val(response.NombreProducto);
            $("#stockDisponibleE").val(response.StockDisponible);
            /*var contenidoModal = `
                <div class="md-4">
                    <label for="nombreProducto">Nombre del Producto:</label>
                    <input type="text" id="nombreProducto" class="form-control" value="${response.NombreProducto}" disabled><br>
                </div>
                
                <div class="md-4">
                    <label for="stockDisponible">Unidades Disponibles:</label>
                    <input type="text" id="stockDisponible" class="form-control" value="${response.StockDisponible}" disabled>
                </div>
            `;*/

            //$('#contenidoModalEditar').html(contenidoModal);

            $('#modalEditar').modal('show');
        }
    });

}
//FUNCIONALIDAD DEL BOTON PARA EDITAR EL REGISTRO
$('#editarBtn').click(() => {
    if (ID !== null) {
        var nombre = $('#nombreProductoE').val();
        var stock = $('#stockDisponibleE').val();;

        var datos = {
            "ID": ID,
            "NombreProducto": nombre,
            "StockProducto": stock,
        };
        console.log(datos)

        $.ajax({
            url: `http://127.0.0.1:8000/api/producto/${ID}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function (response) {
                console.log("Producto Editado De Forma Exitosa", response);
                location.reload();
            },
            error: function (error) {
                console.error("Error al editar producto", error);
            }
        });
        $('#modalEditar').modal('hide');
    }
});



//MODAL DE ELIMINACION DE REGISTRO
function btnBorrar() {
    var button = event.target;
    var row = button.closest('tr');
    var idElement = row.querySelector('.id');
    ID = idElement.textContent;
    $('#modalEliminar').modal('show');
}
//FUNCIONALIDAD DEL BOTON PARA ELIMINAR EL REGISTRO
$('#btnBorrar').click(function () {
    if (ID !== null) {
        var datos = {
            "ID": ID
        };

        $.ajax({
            url: `http://127.0.0.1:8000/api/producto/${ID}`,
            type: "DELETE",
            data: JSON.stringify(datos),
            contentType: "application/json ; charset=utf8",
            dataType: "json",
            success: function (response) {
                console.log("Producto Eliminado", response);
                location.reload();
            },
            error: function (error) {
                console.error("Error", error);
            }
        });

        ID = null;
    }
});