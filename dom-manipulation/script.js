const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "Motivation"
  },
  {
    text: "Success is not in what you have, but who you are.",
    category: "Success"
  },
  {
    text: "Do not wait for the perfect moment, take the moment and make it perfect.",
    category: "Inspiration"
  },
  {
    text: "It always seems impossible until it is done.",
    category: "Determination"
  }
];

const quoteText = document.getElementById('quote');
const quoteCategory = document.getElementById('author');
const newQuote = document.getElementById('generate-btn'); //  REQUIRED VARIABLE NAME
const formContainer = document.getElementById('form-container');

//  Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteText.innerHTML = `"${randomQuote.text}"`;
  quoteCategory.innerHTML = `Category: <strong>${randomQuote.category}</strong>`;
}

//  Function to create a form that adds new quotes
function createAddQuoteForm() {
  const form = document.createElement('form');

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.placeholder = 'Enter quote text';
  textInput.required = true;

  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  categoryInput.required = true;

  const addButton = document.createElement('button');
  addButton.type = 'submit';
  addButton.textContent = 'Add Quote';

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
      quotes.push({ text, category });
      textInput.value = '';
      categoryInput.value = '';
      showRandomQuote();
    }
  });

  formContainer.appendChild(form);
}

//  Event listener for the “Show New Quote” button using `newQuote`
newQuote.addEventListener('click', showRandomQuote);

//  Create the form when the page loads
createAddQuoteForm();
