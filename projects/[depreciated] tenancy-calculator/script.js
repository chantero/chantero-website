function calculate() {
    var monthlyRentInput = document.getElementById('monthlyRent');
    var monthlyRent = parseFloat(monthlyRentInput.value) || 0;

    if (monthlyRent === 0) {
        // If monthly rent is 0, display dashes in the result table
        document.getElementById('result1Year').textContent = "-";
        document.getElementById('result1YearRounded').textContent = "-";
        document.getElementById('result1To3Years').textContent = "-";
        document.getElementById('result1To3YearsRounded').textContent = "-";
        document.getElementById('resultMoreThan3Years').textContent = "-";
        document.getElementById('resultMoreThan3YearsRounded').textContent = "-";
        return;
    }

    var stampDuty = ((monthlyRent * 12) - 2000) / 250;
    var result1Year = stampDuty >= 0 ? stampDuty.toFixed(2) : 0;
    var result1To3Years = result1Year * 2 >= 0 ? (result1Year * 2).toFixed(2) : 0;
    var resultMoreThan3Years = result1Year * 4 >= 0 ? (result1Year * 4).toFixed(2) : 0;

    // Round up to the nearest whole number for all results
    var result1YearRounded = Math.ceil(result1Year);
    var result1To3YearsRounded = Math.ceil(result1To3Years);
    var resultMoreThan3YearsRounded = Math.ceil(resultMoreThan3Years);

    // Update the result table with calculated stamp duty values and rounded values
    document.getElementById('result1Year').textContent = result1Year;
    document.getElementById('result1YearRounded').textContent = result1YearRounded;
    document.getElementById('result1To3Years').textContent = result1To3Years;
    document.getElementById('result1To3YearsRounded').textContent = result1To3YearsRounded;
    document.getElementById('resultMoreThan3Years').textContent = resultMoreThan3Years;
    document.getElementById('resultMoreThan3YearsRounded').textContent = resultMoreThan3YearsRounded;


    // Calculate Legal Fees
    var legalFees = ((monthlyRent * 12) - 12000) * 1.75 / 100 + 700;
    var legalFeesResult = legalFees >= 0 ? legalFees.toFixed(2) : 0;
    var legalFeesResultRounded = Math.ceil(legalFeesResult);

    // Update the legal fees result table
    document.getElementById('legalFeesResult').textContent = legalFeesResult;
    document.getElementById('legalFeesResultRounded').textContent = legalFeesResultRounded;


}


// Add event listeners to all cells in the table
document.querySelectorAll('td').forEach(function(cell) {
    cell.addEventListener('click', function() {
        var resultValue = this.textContent.trim();
        if (!isNaN(parseFloat(resultValue))) {
            copyTextToClipboard(resultValue);
            showCopyIndicator(this);
        }
    });
});

// Function to copy text to clipboard
function copyTextToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Function to show copy indicator
function showCopyIndicator(cell) {
    var copyIndicator = document.createElement('div');
    copyIndicator.className = 'copy-indicator';
    copyIndicator.textContent = '[Copied!]';
    cell.appendChild(copyIndicator);
    setTimeout(function() {
        cell.removeChild(copyIndicator);
    }, 1000);
}
