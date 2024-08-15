let gameName = "Guess The Word";

document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Abanob Nabeh`;

let numberOftries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let msgArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  const inputContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOftries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-input");

    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputContainer.appendChild(tryDiv);
  }

  inputContainer.children[0].children[1].focus();

  const inputsInDasableDiv = document.querySelectorAll(".disabled-input input");
  inputsInDasableDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);

function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actuaLetter = wordToGuess[i - 1];
    if (letter === actuaLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  if (successGuess) {
    msgArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
    if (numberOfHints === 2) {
      msgArea.innerHTML = `<p>Congratz You Didn't User Hints</p>`;
    }
    let alltries = document.querySelectorAll(".inputs > div");
    alltries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    const inputsInDasableDiv = document.querySelectorAll(
      ".disabled-input input"
    );
    inputsInDasableDiv.forEach((input) => (input.disabled = true));
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    const currentTryInput = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInput.forEach((input) => (input.disabled = true));
    currentTry++;

    const nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInput.forEach((input) => (input.disabled = false));
    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      msgArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }
  const enabledInputes = document.querySelectorAll("input:not([disabled])");

  const emptyEnabledInpute = Array.from(enabledInputes).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInpute.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInpute.length);
    const randomInput = emptyEnabledInpute[randomIndex];
    const indexToFill = Array.from(enabledInputes).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function hanleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const curreentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      curreentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", hanleBackSpace);

window.onload = function () {
  generateInput();
};
