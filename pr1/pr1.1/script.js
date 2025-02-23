function calculateFuel() {
    let H = parseFloat(document.getElementById('hydrogen').value);
    let C = parseFloat(document.getElementById('carbon').value);
    let S = parseFloat(document.getElementById('sulfur').value);
    let N = parseFloat(document.getElementById('nitrogen').value);
    let O = parseFloat(document.getElementById('oxygen').value);
    let W = parseFloat(document.getElementById('moisture').value);
    let A = parseFloat(document.getElementById('ash').value);

    let sum = H + C + S + N + O + W + A;
    if (sum.toFixed(1) !== "100.0") {
        alert("Сума всіх компонентів повинна дорівнювати 100%! Виправте введені дані.");
        return;
    }

    let dryFactor = 100 / (100 - W);
    let combustibleFactor = 100 / (100 - W - A);

    let Hc = (H * dryFactor).toFixed(2), Cc = (C * dryFactor).toFixed(2), Sc = (S * dryFactor).toFixed(2);
    let Nc = (N * dryFactor).toFixed(2), Oc = (O * dryFactor).toFixed(2), Ac = (A * dryFactor).toFixed(2);

    let Hg = (H * combustibleFactor).toFixed(2), Cg = (C * combustibleFactor).toFixed(2), Sg = (S * combustibleFactor).toFixed(2);
    let Ng = (N * combustibleFactor).toFixed(2), Og = (O * combustibleFactor).toFixed(2);

    let lowerHeatingValue = (339 * C + 1030 * H - 108.8 * (O - S) - 25 * W) / 1000;
    let lowerHeatingValueDry = (lowerHeatingValue + (0.025 * W)) * dryFactor;
    let lowerHeatingValueCombustible = (lowerHeatingValue + (0.025 * W)) * combustibleFactor;

    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <strong>Результати:</strong>
        <p><b>Коефіцієнт переходу до сухої маси:</b> ${dryFactor.toFixed(4)}</p>
        <p><b>Коефіцієнт переходу до горючої маси:</b> ${combustibleFactor.toFixed(4)}</p>

        <p><b>Склад сухої маси:</b></p>
        <p>Водень (H): ${Hc}%</p>
        <p>Вуглець (C): ${Cc}%</p>
        <p>Сірка (S): ${Sc}%</p>
        <p>Азот (N): ${Nc}%</p>
        <p>Кисень (O): ${Oc}%</p>
        <p>Зола (A): ${Ac}%</p>

        <p><b>Склад горючої маси:</b></p>
        <p>Водень (H): ${Hg}%</p>
        <p>Вуглець (C): ${Cg}%</p>
        <p>Сірка (S): ${Sg}%</p>
        <p>Азот (N): ${Ng}%</p>
        <p>Кисень (O): ${Og}%</p>

        <p><b>Нижча теплота згоряння:</b></p>
        <p>Робоча маса: ${lowerHeatingValue.toFixed(2)} МДж/кг</p>
        <p>Суха маса: ${lowerHeatingValueDry.toFixed(2)} МДж/кг</p>
        <p>Горюча маса: ${lowerHeatingValueCombustible.toFixed(2)} МДж/кг</p>
    `;

    resultsDiv.classList.add("show");
    setTimeout(() => {
        resultsDiv.scrollIntoView({ behavior: "smooth" });
    }, 300);
}
