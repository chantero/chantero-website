function calculate() {
  const price1 = parseFloat(document.getElementById('price1').value);
  const unit1 = parseFloat(document.getElementById('unit1').value);
  const price2 = parseFloat(document.getElementById('price2').value);
  const unit2 = parseFloat(document.getElementById('unit2').value);

  const unitPerPrice1 = isNaN(price1) || isNaN(unit1) ? '' : (price1 / unit1).toFixed(5);
  const unitPerPrice2 = isNaN(price2) || isNaN(unit2) ? '' : (price2 / unit2).toFixed(5);
  document.getElementById('results1').innerHTML = `<strong>Price per Unit:</strong> ${unitPerPrice1}`;
  document.getElementById('results2').innerHTML = `<strong>Price per Unit:</strong> ${unitPerPrice2}`;

  const minUnitPerPrice = Math.min(unitPerPrice1 || Infinity, unitPerPrice2 || Infinity);

  document.querySelectorAll('.results').forEach(resultsDiv => {
    const unitPerPrice = parseFloat(resultsDiv.textContent.split(': ')[1]);
    if (unitPerPrice === minUnitPerPrice) {
      resultsDiv.style.fontWeight = 'bold';
      resultsDiv.style.color = 'red';
    } else {
      resultsDiv.style.fontWeight = 'normal';
      resultsDiv.style.color = 'initial';
    }
  });
}

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', calculate);
});

calculate(); // To highlight the cheapest price initially
