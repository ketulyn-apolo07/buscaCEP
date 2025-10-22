//-------------------------------------------------------------------
//1. variaveis globais
//-------------------------------------------------------------------

const txt_cep = document.querySelector("#cep");
const txt_rua = document.querySelector("#rua");
const txt_numero =document.querySelector("#numero");
const txt_cidade = document.querySelector("#cidade");
const txt_bairro = document.querySelector("#bairro");
const slt_estado = document.querySelector("#estado");

const loadingOverlay = document.querySelector("#loadingOverlay");

//-------------------------------------------------------------------
//2. funcoes de logica
//-------------------------------------------------------------------

       function consultaCEP() {
      let cep = txt_cep.value;

         if (cep.match(/^\d{5}-\d{3}$/)) {

       cep = cep.replace("-", "");

       limpaCampos();

       loadingOverlay.classList.add('d-flex');
       loadingOverlay.classList.remove('d-none');

       fetch('https://viacep.com.br/ws/'+cep+'/json/')
            .then(function(response) {
                loadingOverlay.classList.add('d-none');
                loadingOverlay.classList.remove('d-flex');

                //converte a resposta para JSON.
                return response.json();
            })
            .then(function(jsonResponse) {
                console.log(jsonResponse);

                if (jsonResponse.erro) {
                    console.log("CEP invalido!");
                    txt_cep.classList.add("is-invalid");
                } else {
                    txt_cep.classList.remove("is-invalid");
                    if (jsonResponse.rua !== "") {
                        txt_rua.value = jsonResponse.logradouro;
                        txt_rua.disabled = true;
                    }
                    if (jsonResponse.cidade !== "") {
                        txt_cidade.value = jsonResponse.localidade;
                        txt_cidade.disabled = true;
                    }
                    if (jsonResponse.bairro !== "") {
                        txt_bairro.value = jsonResponse.bairro;
                        txt_bairro.disabled = true;
                    }
                    if (jsonResponse.uf !== "") {
                        slt_estado.value = jsonResponse.uf;
                        slt_estado.disabled = true;
                    }
                }
            });

    }
}
function limpaCampos() {
    txt_rua.value = "";
    txt_cidade.value = "";
    txt_bairro.value = "";
    txt_numero.value = "";
    slt_estado.value = "";

    txt_rua.disabled = true;
    txt_cidade.disabled = true;
    txt_bairro.disabled = true;
    slt_estado.disabled = true;
}

//-------------------------------------------------------------------
//3. escutadores de eventos e inicio
//-------------------------------------------------------------------

txt_cep.addEventListener("keyup", consultaCEP);

jQuery(function($) {
    $("#cep").mask("99999-999");
    $("#numero").mask('0#', {
        translation: {
            '0': { pattern: /[0-9]/, recursive: true }
        }
   });
});