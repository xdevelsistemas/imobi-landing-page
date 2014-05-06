// ao iniciar a tela deve ser executado
$(document).ready(function () {
    $('#login-area').hide();
    $('#forgot-password-fields').hide();
    topNav();
    layout_options();
    // Detecting IE
    if ($('html').is('.ie6, .ie7, .ie8, .ie9')) {
        $('input').placeholder();
        $('textarea').placeholder();
    }

    function loadPageVar (sVar) {
        return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }


    /*
    * adicionado controle para logon de usuário da pagina de confirmacao de senha
    */

    if (loadPageVar("username") != '')
    {
        clickloginarea();
        $('#username').val(loadPageVar("username"))
    }


	$('#form-login').keydown(function(event){    
	    if(event.keyCode==13){
	       $('#sign-in').trigger('click');
	    }
	});

    var urlapp = 'http://app.';


    $("#forgot-btn").click(function (event) {
        var email = $('#email-forgot');
        var email_value = email.val();

        var divmsglogin = $('#div-msg-login');

        fieldloginreset();

        if (email_value == "") {
            email.addClass('error-input');

            divmsglogin.empty();
            divmsglogin.append("<div style=\"color:red;font-weight: bolder\" class=\"col-xs-12\">faltam campos requeridos</div>");
        } else {
            divmsglogin.empty();


            $.getJSON(urlapp+ window.location.host  +"/Account/RecoverPassword" + "?jsoncallback=?", {
                tags: "jquery",
                email: email_value,
                urlauth: urlapp+ window.location.host ,
                tagmode: "any",
                format: "json"
            }, function (data) {
                var text_msg;
                if (data.mensagem != "") {
                    var cor = "red";
                    if (data.mensagem == "e-mail enviado com sucesso")
                    {
                        cor = "green"
                    }
                    text_msg = data.mensagem;
                } else {
                    text_msg = "erro ao recuperar o acesso";
                }

                divmsglogin.append("<div style=\"color:" + cor + ";font-weight: bolder\" class=\"col-xs-12\">" + data.mensagem + "</div>");
                return false;
            });


        }

        
        event.preventDefault();
    });


    $("#btn-enviar-contato").click(function (event) {
        var nome = $('#contato-nome');
        var nome_value = nome.val();

        var email = $('#contato-email');
        var email_value = email.val();

        var contato_mensagem = $('#contato-mensagem');
        var contato_mensagem_value = contato_mensagem.val();

        var divmsglogin = $('#msg-contato-enviado');

        fieldcontactreset();

        if (email_value == "" || nome_value == "") {
            email.addClass('error-input');
            nome.addClass('error-input');
            divmsglogin.empty();
            divmsglogin.append("<div style=\"color:red;font-weight: bolder\" class=\"col-xs-12\">faltam campos requeridos</div>");
        } else {
            divmsglogin.empty();


            $.getJSON(urlapp + window.location.host + "/Account/Contato" + "?jsoncallback=?", {
                tags: "jquery",
                Nome: nome_value,
                email: email_value,
                conteudo : contato_mensagem_value ,
                urlauth: urlapp + window.location.host,
                GER_COD : 1,
                tagmode: "any",
                format: "json"
            }, function (data) {
                var text_msg;
                if (data.mensagem != "") {
                    var cor = "red";
                    if (data.mensagem == "e-mail enviado com sucesso") {
                        cor = "green"
                    }
                    text_msg = data.mensagem;
                } else {
                    text_msg = "erro ao recuperar o acesso";
                }

                divmsglogin.append("<div style=\"color:" + cor + ";font-weight: bolder\" class=\"col-xs-12\">" + data.mensagem + "</div>");
                return false;
            });

        }


        event.preventDefault();
    });

    //FORMULÁRIO AGENDAR
    $("#btn-enviar-agendar").click(function (event) {
        var nome = $('#agendar-nome');
        var nome_value = nome.val();

        var email = $('#agendar-email');
        var email_value = email.val();

        var telefone = $('#agendar-telefone');
        var telefone_value = telefone.val();

        var estado = $('#agendar-estado');
        var estado_value = estado.val();

        var divmsglogin = $('#msg-agendar-enviado');

        fieldagendarreset();

        if (email_value == "" || nome_value == "") {
            email.addClass('error-input');
            nome.addClass('error-input');
            telefone.addClass('error-input');
            estado.addClass('error-input');
            divmsglogin.empty();
            divmsglogin.append("<div style=\"color:red;font-weight: bolder\" class=\"col-xs-12\">faltam campos requeridos</div>");
        } else {
            divmsglogin.empty();

            $.getJSON(urlapp + window.location.host + "/Account/Contato" + "?jsoncallback=?", {
                tags: "jquery",
                Nome: nome_value,
                email: email_value,
                telefone: telefone_value,
                estado: estado_value,
                urlauth: urlapp + window.location.host,
                GER_COD : 1,
                tagmode: "any",
                format: "json"
            }, function (data) {
                var text_msg;
                if (data.mensagem != "") {
                    var cor = "red";
                    if (data.mensagem == "e-mail enviado com sucesso") {
                        cor = "green"
                    }
                    text_msg = data.mensagem;
                } else {
                    text_msg = "erro ao recuperar o acesso";
                }

                divmsglogin.append("<div style=\"color:" + cor + ";font-weight: bolder\" class=\"col-xs-12\">" + data.mensagem + "</div>");
                return false;
            });

        }


        event.preventDefault();
    });



    $("#sign-in").click(function (event) {
        var username = $('#username');
        var username_value = username.val();
        var password = $('#password');
        var password_value = password.val();

        var divmsglogin = $('#div-msg-login');

        fieldloginreset();

        if (username_value == "" || password_value == "") {
            if (username_value == "") {
                username.addClass('error-input');

            } else {
                username.removeClass('error-input');
            }

            if (password_value == "") {
                password.addClass('error-input');

            } else {
                password.removeClass('error-input');
            }

            divmsglogin.empty();
            divmsglogin.append("<div style=\"color:red;font-weight: bolder\" class=\"col-xs-12 col-xs-offset-5\">faltam campos requeridos</div>");

        } else {
            divmsglogin.empty();


        }





        /*$.ajax({
            type: 'GET',
            url: urlapp + '/Account/LogoffExt',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            done: (function (data)
            {
                return false;
            })
        });*/

        $.getJSON(urlapp + window.location.host+ '/Account/LogoffExt' + "?jsoncallback=?", {
         tags: "jquery",
         tagmode: "any",
         format: "json"
         }, function (data) {
            return false;
         });


        $.getJSON(urlapp + window.location.host  + '/Account/LogonExt' + "?jsoncallback=?", {
            tags: "jquery",
            username: username_value,
            password: password_value,
            tagmode: "any",
            format: "json"
        }, function (data) {
            if (data.mensagem != "") {
                divmsglogin.append("<div style=\"color:red;font-weight: bolder\" class=\"col-xs-12 col-xs-offset-5\">" + data.mensagem + "</div>");
            } else {
                window.location.replace(urlapp + window.location.host);
            }
        });








        event.preventDefault();


    });

});




function fieldloginreset() {
    $('#div-msg-login').empty();
    $('#username').removeClass('error-input');
    $('#password').removeClass('error-input');
    $('#email-forgot').removeClass('error-input');
}

function fieldcontactreset() {
    $('#msg-contato-enviado').empty();
    $('#contato-nome').removeClass('error-input');
    $('#contato-email').removeClass('error-input');
    $('#contato-mensagem').removeClass('error-input');   
}

function fieldagendarreset() {
    $('#msg-agendar-enviado').empty();
    $('#agendar-nome').removeClass('error-input');
    $('#agendar-email').removeClass('error-input');
    $('#agendar-telefone').removeClass('error-input');   
    $('#agendar-estado').removeClass('error-estado');   
}

function clickforgotarea() {

    fieldloginreset();

    if ($('#forgot-password-fields').is(':hidden')) {
        $('#forget-password').text('Voltar para o login');
    }
    else {
        $('#forget-password').text('Esqueci minha senha');
    }
    $('#forgot-password-fields').slideToggle();
    $('#login-fields').slideToggle();
}
function clickloginarea() {

    fieldloginreset();

    $('#div-msg-login').empty();
    var loginarea = $('#login-area');
    var divloginarea = $('#div-login-area');
    if (loginarea.is(':visible')) {
        loginarea.slideUp();
        divloginarea.remove('#login-area');
    } else {
        divloginarea.append(loginarea)
        loginarea.slideDown();
    }



}
