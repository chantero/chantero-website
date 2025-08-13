
function copyToClipboard(el) {
  const text = el.textContent || el.innerText;
  navigator.clipboard.writeText(text).then(() => {
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 250);
  });
}


