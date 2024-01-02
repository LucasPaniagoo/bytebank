async function conectaAPI()
{
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/DOGE-BRL');
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido.DOGEBRL);
}

addEventListener("message", () => {
    conectaAPI();
    setInterval(() => conectaAPI(), 5000);
})