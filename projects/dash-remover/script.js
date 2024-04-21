function formatNumber(inputId) {
    var numberInput = document.getElementById(inputId).value;
    var formattedNumber = numberInput.replace(/-/g, '');
    return formattedNumber;
}

function formatAndUpdate(inputId, resultId) {
    var formattedNumber = formatNumber(inputId);
    var result = document.getElementById(resultId);
    result.innerText = formattedNumber;
}

function copyResult(resultId) {
    var resultText = document.getElementById(resultId).innerText;
    navigator.clipboard.writeText(resultText);
    var tooltip = document.getElementById('tooltip' + resultId.slice(-1));
    setTimeout(function(){ tooltip.style.display = 'none'; }, 2000); // Hide tooltip after 2 seconds
}


function displayTooltip(resultId) {
  var copyText = document.getElementById(resultId);
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}

function addInputField() {
    var container = document.querySelector('.container');
    var numInputs = document.querySelectorAll('.result-container').length + 1;

    var resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    container.insertBefore(resultContainer, container.lastElementChild);

    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Insert number';
    inputField.id = 'input' + numInputs;
    inputField.addEventListener('input', function() {
        formatAndUpdate(inputField.id, 'result' + numInputs);
    });
    resultContainer.appendChild(inputField);

    var resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.id = 'result' + numInputs;
    resultContainer.appendChild(resultDiv);

    var copyButton = document.createElement('button');
    copyButton.classList.add('copy-button');
    copyButton.innerText = 'Copy';
    copyButton.onclick = function() {
        copyResult('result' + numInputs);
    };
    resultContainer.appendChild(copyButton);

    var hr = document.createElement('hr');
    resultContainer.appendChild(hr);
}
