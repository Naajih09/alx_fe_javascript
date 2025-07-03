let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" }
];

const quoteText = document.getElementById('quote');
const quoteCategory = document.getElementById('author');
const newQuote = document.getElementById('generate-btn');
const formContainer = document.getElementById('form-container');
const exportBtn = document.getElementById('export-btn');
const importInput = document.getElementById('importFile');

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteText.innerHTML = `"${randomQuote.text}"`;
  quoteCategory.innerHTML = `Category: <strong>${randomQuote.category}</strong>`;

  // Save last quote to sessionStorage
  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
}

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
      saveQuotes();
      showRandomQuote();
      textInput.value = '';
      categoryInput.value = '';
    }
  });

  formContainer.appendChild(form);
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        showRandomQuote();
      } else {
        alert("Invalid JSON file.");
      }
    } catch (e) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load last quote if available
window.onload = function () {
  const last = sessionStorage.getItem('lastQuote');
  if (last) {
    const lastQuote = JSON.parse(last);
    quoteText.innerHTML = `"${lastQuote.text}"`;
    quoteCategory.innerHTML = `Category: <strong>${lastQuote.category}</strong>`;
  } else {
    showRandomQuote();
  }
  createAddQuoteForm();
};

// Event listeners
newQuote.addEventListener('click', showRandomQuote);
exportBtn.addEventListener('click', exportToJsonFile);
importInput.addEventListener('change', importFromJsonFile);
