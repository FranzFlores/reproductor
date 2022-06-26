$().ready(function () {
    validateUser();
});

//Validar Informacion del Usuario
function validateUser(){
    $('#signup').validate({
        rules: {
            firstName: "required",
            lastName: "required",
            user: "required",
            email: "required",
            password: "required"
        },
        messages: {
            email: "Campo Obligatorio",
            password: "Campo Obligatorio",
            firstName: "Campo Obligatorio",
            lastName: "Campo Obligatorio",
            user: "Campo Obligatorio",
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            error.addClass('text-danger');
            error.insertAfter(element);
        }
    }); 
}
