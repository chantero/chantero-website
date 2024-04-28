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
    navigator.clipboard.writeText(resultText)
        .then(function() {
            showCopyIndicator(resultText);
        })
        .catch(function(error) {
            console.error('Unable to copy: ', error);
        });
}

// Function to show copy indicator using alert
function showCopyIndicator(content) {

    var message = 'Copied: ' + content;

    var alertBox = document.createElement('div');
    alertBox.className = 'copy-alert';

    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(function() {
        document.body.removeChild(alertBox);
    }, 700);
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

