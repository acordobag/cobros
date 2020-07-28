export const config = {
    dtConfig: {
        responsive: true,
        select: true,
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ],
        language: {
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "zeroRecords": "No hay registros disponibles",
            "lengthMenu": "Mostrando _MENU_ registros por pagina ",
            "paginate": {
                "first": "First",
                "last": "Last",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    }
};
