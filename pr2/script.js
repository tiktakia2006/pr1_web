document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateButton");
    const resultElement = document.getElementById("result");

    calculateButton.addEventListener("click", function () {
        calculateEmissions(resultElement);
    });
});

function calculateEmissions(resultElement) {
    let coalMass = parseFloat(document.getElementById('coal').value) || 0;
    let mazutMass = parseFloat(document.getElementById('mazut').value) || 0;
    let gasVolume = parseFloat(document.getElementById('gas').value) * 1000 || 0;

    resultElement.classList.remove("error");
    resultElement.classList.remove("show");
    resultElement.innerHTML = '';

    if (coalMass < 0 || mazutMass < 0 || gasVolume < 0) {
        resultElement.innerHTML = "❌ Помилка: введіть коректні (невід'ємні) значення!";
        resultElement.classList.add("error");
        return;
    }

    const heatValueCoal = 20.47;
    const heatValueMazut = 40.40;
    const heatValueGas = 33.08;
    const filterEfficiency = 0.985;

    const ashContentCoal = 25.20;
    const burnResidueCoal = 1.5;
    const ashContentMazut = 0.15;
    const emissionFactorCoal = 0.80;
    const emissionFactorMazut = 1.00;

    let emissionRateCoal = (1e6 / heatValueCoal) * (emissionFactorCoal * (ashContentCoal / (100 - burnResidueCoal)) * (1 - filterEfficiency));
    let totalCoalEmission = (emissionRateCoal * heatValueCoal * coalMass) / 1e6;

    let emissionRateMazut = (1e6 / heatValueMazut) * (emissionFactorMazut * (ashContentMazut / 100) * (1 - filterEfficiency));
    let totalMazutEmission = (emissionRateMazut * heatValueMazut * mazutMass) / 1e6;

    let emissionRateGas = 0; // для природного газу показник емісії дорівнює нулю, оскільки він не утворює твердих частинок
    let totalGasEmission = (emissionRateGas * heatValueGas * gasVolume) / 1e6;

    let totalEmission = totalCoalEmission + totalMazutEmission + totalGasEmission;

    resultElement.innerHTML = `
        <div class="alert alert-info">
            <h5>Результати розрахунку:</h5>
            <p><strong>Показник емісії твердих частинок при спалюванні вугілля:</strong> ${emissionRateCoal.toFixed(2)} г/ГДж</p>
            <p><strong>Валовий викид твердих частинок при спалюванні вугілля:</strong> ${totalCoalEmission.toFixed(2)} т</p>
            <p><strong>Показник емісії твердих частинок при спалюванні мазуту:</strong> ${emissionRateMazut.toFixed(2)} г/ГДж</p>
            <p><strong>Валовий викид твердих частинок при спалюванні мазуту:</strong> ${totalMazutEmission.toFixed(2)} т</p>
            <p><strong>Показник емісії твердих частинок при спалюванні природного газу:</strong> ${emissionRateGas.toFixed(2)} г/ГДж</p>
            <p><strong>Валовий викид твердих частинок при спалюванні природного газу:</strong> ${totalGasEmission.toFixed(2)} т</p>
            <p><strong>Загальний викид:</strong> ${totalEmission.toFixed(2)} т</p>
        </div>
    `;

    resultElement.classList.add("show");
}


