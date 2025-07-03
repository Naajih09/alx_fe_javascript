let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" }
];


const newQuote = document.getElementById('generate-btn');
const exportBtn = document.getElementById('export-btn');
const importInput = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');
const formContainer = document.getElementById('form-container');
const quoteDisplay = document.getElementById('quoteDisplay'); 
const quoteText = document.getElementById('quote');
const quoteCategory = document.getElementById('author');


function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote(filtered = false) {
  let quotePool = quotes;

  const selected = categoryFilter.value;
  if (filtered && selected !== "all") {
    quotePool = quotes.filter(q => q.category === selected);
  }

  const randomIndex = Math.floor(Math.random() * quotePool.length);
  const randomQuote = quotePool[randomIndex] || { text: "No quotes in this category.", category: "None" };

  quoteText.innerHTML = `"${randomQuote.text}"`;
  quoteCategory.innerHTML = `Category: <strong>${randomQuote.category}</strong>`;

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
      populateCategories();
      showRandomQuote(true);
      textInput.value = '';
      categoryInput.value = '';
    }
  });

  formContainer.appendChild(form);
}

function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory);
  showRandomQuote(true);
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
        populateCategories();
        alert('Quotes imported successfully!');
        showRandomQuote(true);
      } else {
        alert("Invalid JSON file.");
      }
    } catch (e) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

window.onload = function () {
  populateCategories();

  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    quoteText.innerHTML = `"${quote.text}"`;
    quoteCategory.innerHTML = `Category: <strong>${quote.category}</strong>`;
  } else {
    showRandomQuote(true);
  }

  createAddQuoteForm();
};

// Event listeners
newQuote.addEventListener('click', () => showRandomQuote(true));
exportBtn.addEventListener('click', exportToJsonFile);
importInput.addEventListener('change', importFromJsonFile);


