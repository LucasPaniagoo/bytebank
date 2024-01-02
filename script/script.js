import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
  });

  function geraHorario()
  {
    let data  = new Date();
    let horario = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
    console.log(horario);
    return horario;
  }

  function adicionarDados(grafico, legenda, dados) 
  {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    })
    grafico.update();
  }

  //Worker para o Dolar
  let workerDolar = new Worker('./script/workers/workerDolar.js');
  workerDolar.postMessage('usd');

  workerDolar.addEventListener("message", event =>{
    let tempo = geraHorario()
    let valor = event.data.ask
    adicionarDados(graficoParaDolar, tempo, valor)
    selecionaCotacao("dolar", valor)
  });

  const graficoIene = document.getElementById('graficoIene');
  const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    }
  })

  //Worker para Iene
  let workerIene = new Worker("./script/workers/workerIene.js");
  workerIene.postMessage("iene");

  workerIene.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    adicionarDados(graficoParaIene, tempo, valor)
    selecionaCotacao("iene", valor)
  })

  const graficoDoge = document.getElementById('graficoDoge');
  const graficoParaDoge = new Chart(graficoDoge, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Doge',
            data: [],
            borderWidth: 1
        }]
    }
  })
  
  //Worker Doge
  let workerDoge = new Worker("./script/workers/workerDoge.js");
  workerDoge.postMessage("doge");

  workerDoge.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    adicionarDados(graficoParaDoge, tempo, valor)
    selecionaCotacao("doge", valor)
  })