function showResult(headingText, resultText, isError) {
  const resultEl = document.getElementById("result");

  const preEl = document.createElement("pre");

  if (isError) {
    preEl.className = "error"
  }

  const h3El = document.createElement("h3");

  h3El.innerText = headingText;
  preEl.innerText = resultText;

  resultEl.appendChild(h3El);
  resultEl.appendChild(preEl);
}
