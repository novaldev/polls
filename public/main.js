const app = document.getElementById('app');
const questionForm = document.getElementById('question-form');
const choices = document.querySelector('.choices-container');

questionForm.onsubmit = (e) => {
  e.preventDefault();

  const choices = document
    .getElementsByName('choices[]')
    .forEach((el) => console.log(el.value));
  console.log(choices);
};

function addChoice(e) {
  const currentChoice = e.target.parentNode;
  const newChoices = currentChoice.cloneNode(true);
  newChoices.getElementsByTagName('input')[0].value = '';
  choices.appendChild(newChoices);
}

function deleteChoice(e) {
  if (choices.childElementCount <= 1) return;
  const currentChoice = e.target.parentNode;
  currentChoice.remove();
}
