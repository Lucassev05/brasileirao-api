const {
	jogosPorRodada,
	editarPlacarDeJogo,
	getJogos,
} = require('../repositories/jogos');
const { getTimes } = require('../repositories/times');
const { response } = require('../utils/response');

const editJogos = async (ctx) => {
	const requisicao = ctx.request.body;
	if (
		requisicao.id !== undefined &&
		requisicao.golsCasa !== undefined &&
		requisicao.golsVisitante !== undefined
	) {
		if (requisicao.id >= 1 && requisicao.id <= 380) {
			const resposta = await editarPlacarDeJogo(requisicao);
			return response(ctx, 200, resposta);
		}
		return response(ctx, 404, { mensagem: 'Id não encontrada' });
	}
	return response(ctx, 400, { mensagem: 'Requisição Inválida' });
};

const getRodada = async (ctx) => {
	try {
		const result = await jogosPorRodada(ctx.params.rodada);
		return response(ctx, 200, result);
	} catch (error) {
		return response(ctx, 400, {
			mensagem: 'Ocorreu um erro, por favor, tente novamente',
		});
	}
};

const ordenarClassificacao = (a, b) => {
	const saldoGolsA = a.golsFeitos - a.golsSofridos;
	const saldoGolsB = b.golsFeitos - b.golsSofridos;
	const empatePontos = a.pontos === b.pontos;
	const empateVitorias = a.vitorias === b.vitorias;
	const empateSaldoGols = saldoGolsA === saldoGolsB;
	const empateGolsFeitos = a.golsFeitos === b.golsFeitos;

	if (empatePontos) {
		if (empateVitorias) {
			if (empateSaldoGols) {
				if (empateGolsFeitos) {
					return a.nome.localeCompare(b.nome);
				}
				return a.golsFeitos < b.golsFeitos ? 1 : -1;
			}
			return saldoGolsA < saldoGolsB ? 1 : -11;
		}
		return a.vitorias < b.vitorias ? 1 : -1;
	}
	return a.pontos < b.pontos ? 1 : -1;
};

const getClassificacao = async (ctx) => {
	try {
		const jogos = await getJogos();
		const listaTimes = await getTimes();
		const estruturaJson = {
			pontos: 0,
			jogos: 0,
			vitorias: 0,
			derrotas: 0,
			empates: 0,
			golsFeitos: 0,
			golsSofridos: 0,
		};

		const classificacao = listaTimes.map((element) => {
			const novoElemento = { ...element, ...estruturaJson };
			return novoElemento;
		});

		jogos.forEach((element) => {
			const empate = element.gols_casa === element.gols_visitante;
			const vitoriaCasa = element.gols_casa > element.gols_visitante;
			const vitoriaVisitante = element.gols_casa < element.gols_visitante;
			let indexTimeCasa = null;
			let indexTimeVisitante = null;
			classificacao.forEach((elemento, index) => {
				if (elemento.id === element.id_time_casa) {
					indexTimeCasa = index;
				}
				if (elemento.id === element.id_time_visitante) {
					indexTimeVisitante = index;
				}
			});

			if (empate) {
				classificacao[indexTimeCasa].pontos += 1;
				classificacao[indexTimeCasa].jogos += 1;
				classificacao[indexTimeCasa].empates += 1;
				classificacao[indexTimeCasa].golsFeitos += element.gols_casa;
				classificacao[indexTimeCasa].golsSofridos +=
					element.gols_visitante;
				classificacao[indexTimeVisitante].pontos += 1;
				classificacao[indexTimeVisitante].jogos += 1;
				classificacao[indexTimeVisitante].empates += 1;
				classificacao[indexTimeVisitante].golsFeitos +=
					element.gols_visitante;
				classificacao[indexTimeVisitante].golsSofridos +=
					element.gols_casa;
			} else if (vitoriaCasa) {
				classificacao[indexTimeCasa].pontos += 3;
				classificacao[indexTimeCasa].jogos += 1;
				classificacao[indexTimeCasa].vitorias += 1;
				classificacao[indexTimeCasa].golsFeitos += element.gols_casa;
				classificacao[indexTimeCasa].golsSofridos +=
					element.gols_visitante;
				classificacao[indexTimeVisitante].jogos += 1;
				classificacao[indexTimeVisitante].derrotas += 1;
				classificacao[indexTimeVisitante].golsFeitos +=
					element.gols_visitante;
				classificacao[indexTimeVisitante].golsSofridos +=
					element.gols_casa;
			} else if (vitoriaVisitante) {
				classificacao[indexTimeCasa].jogos += 1;
				classificacao[indexTimeCasa].derrotas += 1;
				classificacao[indexTimeCasa].golsFeitos += element.gols_casa;
				classificacao[indexTimeCasa].golsSofridos +=
					element.gols_visitante;
				classificacao[indexTimeVisitante].pontos += 3;
				classificacao[indexTimeVisitante].jogos += 1;
				classificacao[indexTimeVisitante].vitorias += 1;
				classificacao[indexTimeVisitante].golsFeitos +=
					element.gols_visitante;
				classificacao[indexTimeVisitante].golsSofridos +=
					element.gols_casa;
			}
		});

		const resposta = classificacao.map((element) => {
			const { id, ...elemento } = element;
			return elemento;
		});

		resposta.sort(ordenarClassificacao);

		return response(ctx, 200, resposta);
	} catch (error) {
		return response(ctx, 400, {
			mensagem: 'Ocorreu um erro, por favor, tente novamente',
		});
	}
};

module.exports = { getClassificacao, getRodada, editJogos };
