function csvToTable(csv) {
  var rows = csv.split('\n');
  var table = document.getElementById('csv-table');
  table.innerHTML = '';

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].trim() === '') {
      continue; // Skip empty rows
    }

    var row = table.insertRow();

    var cells = parseCSVRow(rows[i]);
    for (var j = 0; j < cells.length; j++) {
      var cell = row.insertCell();
      cell.innerHTML = cells[j];

      var copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.innerHTML = 'Copy to Clipboard';

      cell.appendChild(copyButton);

      copyButton.addEventListener('click', function(event) {
        var content = this.parentNode.innerText.trim();
        var buttonContent = this.textContent;
        content = content.replace(buttonContent, '');
        copyText(content);
        showCopyIndicator(this, content);
        event.stopPropagation();
      });
    }
  }
}

// Function to parse a CSV row into cells
function parseCSVRow(row) {
  var cells = [];
  var currentCell = '';
  var insideQuotes = false;

  for (var i = 0; i < row.length; i++) {
    var char = row[i];

    if (char === ',') {
      if (!insideQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
        continue;
      }
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    currentCell += char;
  }

  cells.push(currentCell.trim());
  return cells;
}

// Function to copy text to clipboard
function copyText(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// Function to show copy indicator using alert
function showCopyIndicator(button, content) {
  var rect = button.getBoundingClientRect();
  var indicatorLeft = rect.left + (rect.width / 2);
  var indicatorTop = rect.top - 30;
  var message = 'Copied : ' + content;

  var alertBox = document.createElement('div');
  alertBox.className = 'copy-alert';
  alertBox.style.left = indicatorLeft + 'px';
  alertBox.style.top = indicatorTop + 'px';
  alertBox.innerHTML = message;
  document.body.appendChild(alertBox);

  setTimeout(function() {
    document.body.removeChild(alertBox);
  }, 700);
}



// Add event listeners for the drag and drop area and the file input
document.getElementById('drag-drop-area').addEventListener('click', function() {
  document.getElementById('file-input').click();
});

document.getElementById('browse-button').addEventListener('click', function() {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(e) {
  var file = e.target.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    var csv = e.target.result;
    csvToTable(csv);
  }

  reader.readAsText(file);
});

// Function to handle file drop
function handleFileDrop(e) {
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  handleFileSelect(file);
}

// Function to handle file selection
function handleFileSelect(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var csv = e.target.result;
    csvToTable(csv);
  };

  reader.readAsText(file);
}

// Function to handle drag over
function handleDragOver(e) {
  e.preventDefault();
}

// Event listeners for drag and drop
var dragDropArea = document.getElementById('drag-drop-area');
dragDropArea.addEventListener('dragover', handleDragOver);
dragDropArea.addEventListener('drop', handleFileDrop);
