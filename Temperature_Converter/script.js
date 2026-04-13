function convert() {
  const input = document.getElementById('tempInput');
  const errorMsg = document.getElementById('errorMsg');
  const val = input.value.trim();

  // Validate: empty or not a number
  if (val === '' || isNaN(val)) {
    errorMsg.textContent = 'Please enter a valid number.';
    input.classList.add('error');
    hideResult();
    return;
  }

  const temp = parseFloat(val);
  const unit = document.querySelector('input[name="unit"]:checked').value;

  // Validate: below absolute zero
  if (unit === 'kelvin' && temp < 0) {
    errorMsg.textContent = 'Kelvin cannot be negative.';
    input.classList.add('error');
    hideResult();
    return;
  }
  if (unit === 'celsius' && temp < -273.15) {
    errorMsg.textContent = 'Below absolute zero (−273.15°C).';
    input.classList.add('error');
    hideResult();
    return;
  }
  if (unit === 'fahrenheit' && temp < -459.67) {
    errorMsg.textContent = 'Below absolute zero (−459.67°F).';
    input.classList.add('error');
    hideResult();
    return;
  }

  errorMsg.textContent = '';
  input.classList.remove('error');

  // Convert everything to Celsius first
  let celsius;
  if (unit === 'celsius')         celsius = temp;
  else if (unit === 'fahrenheit') celsius = (temp - 32) * 5 / 9;
  else                            celsius = temp - 273.15;

  const fahrenheit = celsius * 9 / 5 + 32;
  const kelvin = celsius + 273.15;

  // Primary result display
  let primaryVal, fromText;
  if (unit === 'celsius') {
    primaryVal = fahrenheit.toFixed(2) + ' °F';
    fromText   = temp.toFixed(2) + ' °C → °F';
  } else if (unit === 'fahrenheit') {
    primaryVal = celsius.toFixed(2) + ' °C';
    fromText   = temp.toFixed(2) + ' °F → °C';
  } else {
    primaryVal = celsius.toFixed(2) + ' °C';
    fromText   = temp.toFixed(2) + ' K → °C';
  }

  // Temperature feel indicator
  let tempClass = 'neutral', icon = '🌡️';
  if      (celsius > 35) { tempClass = 'hot';     icon = '🔥'; }
  else if (celsius > 20) { tempClass = 'neutral';  icon = '☀️'; }
  else if (celsius > 10) { tempClass = 'neutral';  icon = '🌤️'; }
  else if (celsius > 0)  { tempClass = 'cold';    icon = '❄️'; }
  else                   { tempClass = 'cold';    icon = '🥶'; }

  // Update DOM
  document.getElementById('resultValue').textContent = primaryVal;
  document.getElementById('resultValue').className   = 'result-value ' + tempClass;
  document.getElementById('resultFrom').textContent  = fromText;
  document.getElementById('resultIcon').textContent  = icon;

  document.getElementById('cVal').textContent = celsius.toFixed(2) + '°';
  document.getElementById('fVal').textContent = fahrenheit.toFixed(2) + '°';
  document.getElementById('kVal').textContent = kelvin.toFixed(2);

  showResult();
}

function showResult() {
  document.getElementById('resultArea').classList.add('show');
  document.getElementById('allConversions').classList.add('show');
  document.getElementById('resetRow').classList.add('show');
}

function hideResult() {
  document.getElementById('resultArea').classList.remove('show');
  document.getElementById('allConversions').classList.remove('show');
  document.getElementById('resetRow').classList.remove('show');
}

function reset() {
  document.getElementById('tempInput').value = '';
  document.getElementById('errorMsg').textContent = '';
  document.getElementById('tempInput').classList.remove('error');
  document.querySelector('input[value="celsius"]').checked = true;
  hideResult();
  document.getElementById('tempInput').focus();
}

// Allow Enter key to trigger conversion
document.getElementById('tempInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') convert();
});
