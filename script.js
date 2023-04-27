// Seleciona o elemento select
var select = document.getElementById("selectComandos");

// Cria uma solicitação AJAX para o arquivo JSON
var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://comandos.moysesnasciment.repl.co/comandos.json",
  true
);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Analisa a resposta JSON
    var data = JSON.parse(request.responseText);
    var opcoes = data.opcoes;
    // Ordena o array "opcoes" em ordem alfabética
    opcoes.sort(function (a, b) {
      var textA = a.texto.toUpperCase();
      var textB = b.texto.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    // Adiciona cada opção ao select
    for (var i = 0; i < opcoes.length; i++) {
      var option = document.createElement("option");
      option.value = opcoes[i].valor;
      option.text = opcoes[i].texto;
      select.add(option);
    }

    // Adiciona um evento de mudança ao select selectComandos

    select.addEventListener("change", function () {
      // Busca o objeto correspondente ao item selecionado
      var itemSelecionado = opcoes.find(function (item) {
        return item.valor === select.value;
      });

      // Atribui o valor da propriedade "comando" desse objeto ao input "resultadoComando"
      if (itemSelecionado === undefined) {
        resultadoComando.value = "";
        resultadoComando.placeholder = resultadoComando.placeholder;
      } else {
        comandoComId = itemSelecionado.com;
        resultadoComando.value = comandoComId.replace("_ID", idModulo.value);
      }
    });
  }
};
request.send();

const botaoCopiar = document.getElementById("botaoCopiar");
const resultadoComando = document.getElementById("resultadoComando");

botaoCopiar.addEventListener("click", () => {
  navigator.clipboard
    .writeText(resultadoComando.value)
    .then(() => {
      const alerta = `
        <div class="alert alert-success alert-dismissible fade show position-fixed start-50 translate-middle-x" role="alert">
          Comando copiado para a área de transferência!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", alerta);

      // Auto dismiss
      setTimeout(() => {
        const alertaEl = document.querySelector(".alert");
        alertaEl.classList.remove("show");
        alertaEl.addEventListener(
          "transitionend",
          () => {
            alertaEl.remove();
          },
          { once: true }
        );
      }, 3000);
    })
    .catch((err) => {
      console.error("Erro ao copiar o comando: ", err);
    });
});
