var tab_lista_clientes;
var tab_lista_clientes2;

$(document).ready(function ($) {
    'use strict';

    //****************************************************************************************************************************************************************
    // Tabla: Listado de clientes : Inicio
    //****************************************************************************************************************************************************************
    var data = {
                    metodo: "consultarclientes",
                    fila:"2"};
    var statuslist = [{'Value': '0', 'Text': 'Acción'}, {'Value': '1', 'Text': 'Detalle'}, {'Value': '2', 'Text': 'Eliminar'}];

    var actions = [
        {"action_type": "Detalle"},
        {"action_type": "Eliminar"}
      ];

    tab_lista_clientes = $('#lista_clientes').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        bInfo : false,
        responsive: true,
        autoWidth: false,
        language: {
            "decimal": "",
            "emptyTable": "No hay informaci&oacute;n",
            "info": " _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "0 a 0 de 0 registros",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "<<",
                "last": ">>",
                "next": ">",
                "previous": "<"
            }
        },
        "processing": true,
        /*"serverSide": true,*/
        "ajax": {
            url: "http://localhost:81/api/controllers/clientes/consultarlista", 
            type: "post",
            dataType: "json",
            error: function(xhr, status, error) {
                alert("Error: " + xhr.responseText);
            }
        },
        "columns": [
            { "data": "identificacion" },
            { "data": "razonSocial" },
            { "data": "nombreComercial" },
            { "data": "telefono" },
            { "data": "correo" },
            /*
            {            
                data:"identificacion",render: function(data, type, full, meta){
                   var $select = $('<select/>', { 'class': 'ctrl-status form-control select2 selectpicker' },{'data-dropdown-css-class':'select2-danger'});
                   $.each(statuslist, function (Value, Text) {
                      var $opt = $('<option/>', { 'value': Text.Value, 'text': Text.Text });
                      if (Text.Text === full[3]){
                         $opt.attr("selected", "selected");
                      }
                      $select.append($opt);
                   });
                   return $select.prop("outerHTML");
                }
             },*/
             /*{
                data: "identificacion",
                "render": function (data, type, row, meta) {
                  var select = '<div class="btn-group equi-width-last-actioned-btns" id="' + row.id + '">' +
                        '<button id="last-actioned-btn-' + row.id + '" type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                        'None' +
                        '</button>' +
                        '<div class="dropdown-menu">';

                    // Append actions
                    if (actions.length === 0) {
                        select = select + '<h6 class="dropdown-header">No actions configured</h6>';
                    } else {
                        select = select + '<!--<h6 class="dropdown-header">Actions</h6>-->';
                        $.each(actions, function (index, value) {
                            var option =
                                '<a class="dropdown-item action">' +
                                value.action_type +
                                '</a>';
                            select = select + option;
                        });
                    }

                    select = select + '</div>';

                    if (data) {
                        select = select.replace('>None</', '>Acciones</');
                    }

                    select = $($.parseHTML(select));

                    return select.prop("outerHTML");
                }
              }*/
              {
                data: "identificacion", render: function (data, type, row, meta) {
                    return type === 'display' ?
                       "<button type='button' id='E|" + data + "' class='btn btn-info btn-circle tooltip top'><i class='fas fa-edit'><span class='tiptext'>Ver/Editar</span></i></button>" +
                       "<button type='button' id='D|" + data + "' class='btn btn-danger btn-circle tooltip top'><i class='fas fa-trash-alt'><span class='tiptext'>Eliminar</span></i></button>" :
                      data;
                }
            }
        ]
    });

    // Handle change event for status selection control
    $('#lista_clientes').on('click', '.action', function(){
        var data = $('#lista_clientes').DataTable().row($(this).closest('tr')).data();
        //alert(data.identificacion + ' Selected:' + $(this).val());
        window.angularComponentReference.zone.run(() => { window.angularComponentReference.loadAngularFunction(data.identificacion); });
    });


    //********************************************************************************************************************************* */
    tab_lista_clientes2 = $('#lista_clientes2').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        bInfo : false,
        info: false,
        responsive: true,
        autoWidth: false,
        language: {
            "decimal": "",
            "emptyTable": "No hay informaci&oacute;n",
            "info": " _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "0 a 0 de 0 registros",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "<<",
                "last": ">>",
                "next": ">",
                "previous": "<"
            }
        },
        "processing": true,
        /*"serverSide": true,*/
        "ajax": {
            url: "http://localhost:81/api/controllers/clientes/consultarlista", 
            type: "post",
            dataType: "json",
            error: function(xhr, status, error) {
                alert("Error: " + xhr.responseText);
            }
        },
        "columns": [
            { "data": "identificacion" },
            { "data": "razonSocial" },
            { "data": "nombreComercial" }
        ],
        select: {
            style:    'single',
            selector: 'td:first-child'
        },
    });

    $('#lista_clientes2 tbody').on('click', 'tr', function () 
    {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            tab_lista_clientes2.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        
        var d = tab_lista_clientes2.row(this).data();
        //alert(d.identificacion);
        window.ReferenciaCliente.zone.run(() => { window.ReferenciaCliente.loadAngularFunction(d.identificacion); });
    });

});
