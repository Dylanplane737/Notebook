const textInput = document.getElementById('textInput');
const htmlInput = document.getElementById('htmlInput');
const htmlOutput = document.getElementById('htmlOutput');
const htmlModeContainer = document.getElementById('htmlModeContainer');

const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const saveHtmlBtn = document.getElementById('saveHtmlBtn');
const smallTextBtn = document.getElementById('smallTextBtn');
const mediumTextBtn = document.getElementById('mediumTextBtn');
const largeTextBtn = document.getElementById('largeTextBtn');
const fontCourier = document.getElementById('fontCourier');
const fontMonaco = document.getElementById('fontMonaco');
const fontArial = document.getElementById('fontArial');
const fontGeorgia = document.getElementById('fontGeorgia');
const insertImageBtn = document.getElementById('insertImageBtn');
const insertLinkBtn = document.getElementById('insertLinkBtn');
const bgWhite = document.getElementById('bgWhite');
const bgYellow = document.getElementById('bgYellow');
const bgGray = document.getElementById('bgGray');
const bgCustomBtn = document.getElementById('bgCustomBtn');
const bgColorPicker = document.getElementById('bgColorPicker');
const textModeBtn = document.getElementById('textModeBtn');
const htmlModeBtn = document.getElementById('htmlModeBtn');
const symbolButtons = document.querySelectorAll('.emoji-btn');

// Insert at cursor
function insertAtCursor(textArea, text) {
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;
  textArea.value = textArea.value.slice(0,start)+text+textArea.value.slice(end);
  textArea.selectionStart = textArea.selectionEnd = start+text.length;
  textArea.focus();
  if(htmlModeContainer.style.display==='flex') updateHtmlPreview();
}

// Set style for both editors
function setStyle(prop, value) {
  [textInput, htmlInput].forEach(el => el.style[prop] = value);
}

// Save/load
saveBtn.addEventListener('click', ()=>{localStorage.setItem('dylatoshContent', textInput.value); alert('Saved!');});
loadBtn.addEventListener('click', ()=>{
  const c=localStorage.getItem('dylatoshContent'); 
  if(c){textInput.value=c; if(htmlModeContainer.style.display==='flex') htmlInput.value=c; updateHtmlPreview(); alert('Loaded!');} 
  else alert('Nothing saved');
});

// Download HTML
saveHtmlBtn.addEventListener('click', ()=>{
  const content = textInput.value;
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Dylatosh Note</title></head><body><pre style="white-space: pre-wrap; font-family: monospace;">${content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`;
  const blob = new Blob([html], {type:'text/html'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='dylatosh-note.html'; a.click(); URL.revokeObjectURL(a.href);
});

// Text size
smallTextBtn.addEventListener('click', ()=>setStyle('fontSize','12px'));
mediumTextBtn.addEventListener('click', ()=>setStyle('fontSize','16px'));
largeTextBtn.addEventListener('click', ()=>setStyle('fontSize','20px'));

// Fonts
fontCourier.addEventListener('click', ()=>setStyle('fontFamily',"'Courier New', Courier, monospace"));
fontMonaco.addEventListener('click', ()=>setStyle('fontFamily','Monaco, monospace'));
fontArial.addEventListener('click', ()=>setStyle('fontFamily','Arial, sans-serif'));
fontGeorgia.addEventListener('click', ()=>setStyle('fontFamily','Georgia, serif'));

// Insert Image/Link
insertImageBtn.addEventListener('click', ()=>{const url=prompt('Image URL:'); if(url) insertAtCursor(textInput, `![Image](${url})`);});
insertLinkBtn.addEventListener('click', ()=>{const url=prompt('URL:'); if(url){const t=prompt('Display text:', url)||url; insertAtCursor(textInput, `[${t}](${url})`);}});

// Background
bgWhite.addEventListener('click', ()=>setStyle('backgroundColor','white'));
bgYellow.addEventListener('click', ()=>setStyle('backgroundColor','#fffacd'));
bgGray.addEventListener('click', ()=>setStyle('backgroundColor','#f0f0f0'));
bgCustomBtn.addEventListener('click', ()=>bgColorPicker.click());
bgColorPicker.addEventListener('input',(e)=>setStyle('backgroundColor', e.target.value));

// Symbols
symbolButtons.forEach(b=>b.addEventListener('click',()=>insertAtCursor(textInput,b.textContent)));

// Mode switching
textModeBtn.addEventListener('click',()=>{htmlModeContainer.style.display='none'; textInput.style.display='block';});
htmlModeBtn.addEventListener('click',()=>{htmlModeContainer.style.display='flex'; textInput.style.display='none'; htmlInput.value=textInput.value; updateHtmlPreview();});

// HTML preview with small delay to reduce lag
let htmlTimeout;
htmlInput.addEventListener('input', () => {
  clearTimeout(htmlTimeout);
  htmlTimeout = setTimeout(updateHtmlPreview, 300);
});
function updateHtmlPreview(){
  const d=htmlOutput.contentDocument||htmlOutput.contentWindow.document; 
  d.open(); d.write(htmlInput.value); d.close();
}

// Initialize
setStyle('fontSize','16px');
setStyle('fontFamily',"'Courier New', Courier, monospace");
setStyle('backgroundColor','white');
