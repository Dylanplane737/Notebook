// Just initialize editor styles and HTML preview
const textInput = document.getElementById('textInput');
const htmlInput = document.getElementById('htmlInput');
const htmlOutput = document.getElementById('htmlOutput');
const htmlModeContainer = document.getElementById('htmlModeContainer');

textInput.style.fontSize = '16px';
textInput.style.fontFamily = "'Courier New', Courier, monospace";
textInput.style.backgroundColor = 'white';

htmlInput.style.fontSize = '16px';
htmlInput.style.fontFamily = "'Courier New', Courier, monospace";
htmlInput.style.backgroundColor = 'white';

// HTML preview with small delay to reduce lag
let htmlTimeout;
htmlInput.addEventListener('input', () => {
  clearTimeout(htmlTimeout);
  htmlTimeout = setTimeout(() => {
    const d = htmlOutput.contentDocument || htmlOutput.contentWindow.document; 
    d.open(); d.write(htmlInput.value); d.close();
  }, 300);
});
