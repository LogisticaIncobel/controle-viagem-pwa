
const motoristasAutorizados = [
  "1193829976", "2058686900", "527525936", "515901903", "41856082091"
];
const placasCavalo = ["RLO3J98", "RYN0I35", "SXS7F99", "GBY1A57", "MKP5722"];
const placasCarreta = ["ABC1D23", "XYZ9Z99", "KLR4H22", "JHN8U33", "QWE9T88"];

const estadosPermitidos = {
  iniciar_viagem: ["parada_descanso", "parada_refeicao", "parada_interjornada", "chegada_fabrica"],
  parada_descanso: ["reinicio_viagem"],
  parada_refeicao: ["reinicio_viagem"],
  parada_interjornada: ["reinicio_viagem"],
  chegada_fabrica: ["inicio_carregamento"],
  inicio_carregamento: ["fim_carregamento"],
  fim_carregamento: ["reinicio_viagem", "parada_descanso", "parada_refeicao", "parada_interjornada"],
  reinicio_viagem: ["parada_descanso", "parada_refeicao", "parada_interjornada", "fim_viagem"]
};

const nomesEventos = {
  iniciar_viagem: "Início de Viagem",
  parada_descanso: "Parada de Descanso",
  parada_refeicao: "Parada de Refeição",
  parada_interjornada: "Parada Interjornada",
  reinicio_viagem: "Reinício de Viagem",
  chegada_fabrica: "Chegada na Fábrica",
  inicio_carregamento: "Início de Carregamento",
  fim_carregamento: "Fim de Carregamento",
  fim_viagem: "Fim de Viagem"
};

let estadoAtual = "iniciar_viagem";
let historico = [];
let cpfAtivo = "";

function confirmarCpf() {
  const cpf = document.getElementById("cpf").value;
  if (motoristasAutorizados.includes(cpf)) {
    cpfAtivo = cpf;
    document.getElementById("login").classList.add("hidden");
    document.getElementById("painel").classList.remove("hidden");
    document.getElementById("cpf-msg").textContent = "";
    carregarPlacas();
    atualizarPainel();
  } else {
    document.getElementById("cpf-msg").textContent = "CPF não autorizado";
  }
}

function carregarPlacas() {
  const cavaloSelect = document.getElementById("placaCavalo");
  placasCavalo.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    cavaloSelect.appendChild(opt);
  });

  const carretaSelect = document.getElementById("placaCarreta");
  placasCarreta.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    carretaSelect.appendChild(opt);
  });
}

function atualizarPainel() {
  document.getElementById("eventoAtualNome").textContent = nomesEventos[estadoAtual];
  const botoesDiv = document.getElementById("botoes");
  botoesDiv.innerHTML = "";

  const cavalo = document.getElementById("placaCavalo").value;
  const carreta = document.getElementById("placaCarreta").value;

  (estadosPermitidos[estadoAtual] || []).forEach(evento => {
    const btn = document.createElement("button");
    btn.className = "event-button";
    btn.textContent = nomesEventos[evento];
    btn.disabled = !(cavalo && carreta);
    btn.onclick = () => registrarEvento(evento);
    botoesDiv.appendChild(btn);
  });
}

function registrarEvento(evento) {
  const dataHora = new Date().toISOString();
  const registro = {
    cpf: cpfAtivo,
    cavalo: document.getElementById("placaCavalo").value,
    carreta: document.getElementById("placaCarreta").value,
    evento,
    dataHora
  };
  historico.push(registro);
  estadoAtual = evento;
  atualizarPainel();
  atualizarHistorico();
}

function atualizarHistorico() {
  const ul = document.getElementById("historicoLista");
  ul.innerHTML = "";
  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.dataHora} - ${nomesEventos[item.evento]} | Cavalo: ${item.cavalo} | Carreta: ${item.carreta}`;
    ul.appendChild(li);
  });
}
