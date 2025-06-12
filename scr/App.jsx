import { useState } from "react";

const eventoInicial = "iniciar_viagem";

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

const motoristasAutorizados = [
  "1193829976", "2058686900", "527525936", "515901903", "41856082091"
];

const placasCavalo = ["RLO3J98", "RYN0I35", "SXS7F99", "GBY1A57", "MKP5722"];
const placasCarreta = ["ABC1D23", "XYZ9Z99", "KLR4H22", "JHN8U33", "QWE9T88"];

export default function App() {
  const [cpf, setCpf] = useState("");
  const [cpfConfirmado, setCpfConfirmado] = useState(false);
  const [estadoAtual, setEstadoAtual] = useState(eventoInicial);
  const [historico, setHistorico] = useState([]);
  const [placaCavalo, setPlacaCavalo] = useState("");
  const [placaCarreta, setPlacaCarreta] = useState("");

  const registrarEvento = (evento) => {
    const dataHora = new Date().toISOString();
    const novoRegistro = {
      cpf,
      placaCavalo,
      placaCarreta,
      evento,
      dataHora
    };
    setHistorico([...historico, novoRegistro]);
    setEstadoAtual(evento);
  };

  if (!cpfConfirmado) {
    return (
      <div className="p-4">
        <h1 className="text-xl mb-4">Login do Motorista</h1>
        <input
          className="border p-2 rounded w-full mb-2"
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setCpfConfirmado(true)}
          disabled={!motoristasAutorizados.includes(cpf)}
        >
          Entrar
        </button>
        {!motoristasAutorizados.includes(cpf) && cpf.length > 0 && (
          <p className="text-red-500 mt-2 text-sm">CPF não autorizado</p>
        )}
      </div>
    );
  }

  const opcoesDisponiveis = estadosPermitidos[estadoAtual] || [];

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Eventos de Viagem</h1>
      <p className="mb-2">CPF: {cpf}</p>

      <label className="block mb-2">Placa do Cavalo:</label>
      <select
        className="border p-2 rounded mb-4 w-full"
        value={placaCavalo}
        onChange={(e) => setPlacaCavalo(e.target.value)}
      >
        <option value="">Selecione o cavalo</option>
        {placasCavalo.map((placa) => (
          <option key={placa} value={placa}>{placa}</option>
        ))}
      </select>

      <label className="block mb-2">Placa da Carreta:</label>
      <select
        className="border p-2 rounded mb-4 w-full"
        value={placaCarreta}
        onChange={(e) => setPlacaCarreta(e.target.value)}
      >
        <option value="">Selecione a carreta</option>
        {placasCarreta.map((placa) => (
          <option key={placa} value={placa}>{placa}</option>
        ))}
      </select>

      <p className="mb-4">Último evento: {nomesEventos[estadoAtual]}</p>

      <div className="grid gap-2">
        {opcoesDisponiveis.map((evento) => (
          <button
            key={evento}
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => registrarEvento(evento)}
            disabled={!placaCavalo || !placaCarreta}
          >
            {nomesEventos[evento]}
          </button>
        ))}
      </div>

      <h2 className="text-lg mt-6">Histórico</h2>
      <ul className="mt-2">
        {historico.map((item, idx) => (
          <li key={idx} className="text-sm">
            {item.dataHora} - {nomesEventos[item.evento]} | Cavalo: {item.placaCavalo} | Carreta: {item.placaCarreta}
          </li>
        ))}
      </ul>
    </div>
  );
}
