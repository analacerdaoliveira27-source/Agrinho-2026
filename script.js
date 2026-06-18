function calcularImpacto() {
    // Obtém o valor selecionado no elemento <select>
    var tech = document.getElementById('tech-select').value;
    // Obtém a div onde o resultado será exibido
    var resultBox = document.getElementById('calc-result');
    var texto = "";

    // Define a mensagem com base na tecnologia selecionada
    if (tech === "irrigacao") {
        texto = "🎯 Resultado Estimado: Economia de até 40% no consumo de recursos hídricos e redução imediata nos custos de energia elétrica das bombas de aspersão.";
    } else if (tech === "precisao") {
        texto = "🎯 Resultado Estimado: Redução de 25% no desperdício de insumos nitrogenados e defensivos químicos, com aumento real de 12% na produtividade por hectare.";
    } else if (tech === "ilpf") {
        texto = "🎯 Resultado Estimado: Sequestro de cerca de 4 a 8 toneladas de CO₂ por hectare ao ano através do crescimento arbóreo, alcançando o selo de Carne Carbono Neutro.";
    }

    // Insere o texto na div e a torna visível alterando o display para "block"
    resultBox.innerHTML = texto;
    resultBox.style.display = "block";
}
