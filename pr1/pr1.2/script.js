function calculateMazut() {
    let c = parseFloat(document.getElementById('carbon').value);
    let h = parseFloat(document.getElementById('hydrogen').value);
    let o = parseFloat(document.getElementById('oxygen').value);
    let s = parseFloat(document.getElementById('sulfur').value);
    let q_dafi = parseFloat(document.getElementById('q_dafi').value);
    let w = parseFloat(document.getElementById('moisture').value);
    let a = parseFloat(document.getElementById('ash').value);
    let v = parseFloat(document.getElementById('vanadium').value);

    if (isNaN(c) || isNaN(h) || isNaN(o) || isNaN(s) || isNaN(q_dafi) || isNaN(w) || isNaN(a) || isNaN(v)) {
        alert("Будь ласка, введіть всі значення!");
        return;
    }

    let c_r = c * (100 - w - a) / 100;
    let h_r = h * (100 - w - a) / 100;
    let o_r = o * (100 - w - a) / 100;
    let s_r = s * (100 - w - a) / 100;
    let a_r = a * (100 - w) / 100;
    let v_r = v * (100 - w) / 100;

    let q_r = (q_dafi * (100 - w - a) / 100) - 0.025 * w;

    document.getElementById('results').innerHTML = `
        <h3>Склад робочої маси мазуту:</h3>
        <p>Вуглець: ${c_r.toFixed(2)}%</p>
        <p>Водень: ${h_r.toFixed(2)}%</p>
        <p>Кисень: ${o_r.toFixed(2)}%</p>
        <p>Сірка: ${s_r.toFixed(2)}%</p>
        <p>Зола: ${a_r.toFixed(2)}%</p>
        <p>Ванадій: ${v_r.toFixed(2)} мг/кг</p>

        <h3>Нижча теплота згоряння робочої маси:</h3>
        <p>QpH: ${q_r.toFixed(2)} МДж/кг</p>
    `;
}


