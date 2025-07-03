// Constants and DOM Elements
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteText = document.getElementById('quote');
const quoteCategory = document.getElementById('author');
const categoryFilter = document.getElementById('categoryFilter');
const notification = document.getElementById('notification');

// Load quotes from localStorage or fallback
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Learning never exhausts the mind.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" }
];

// Load last filter preference
const lastFilter = localStorage.getItem('lastFilter') || 'all';
categoryFilter.value = lastFilter;

// Utility Functions
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function notify(message) {
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => (notification.style.display = 'none'), 4000);
}

function displayRandomQuote(filteredQuotes = quotes) {
  const selected = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  quoteText.innerHTML = selected.text;
  quoteCategory.innerHTML = `Category: ${selected.category}`;
  sessionStorage.setItem('lastQuote', JSON.stringify(selected));
}

function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
  categoryFilter.value = lastFilter;
}

function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem('lastFilter', selected);
  const filtered = selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
  displayRandomQuote(filtered);
}

function addQuote(text, category) {
  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  sendQuoteToServer(newQuote);
  populateCategories();
  filterQuotes();
}

// Server Sync
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from server:', error);
    return [];
  }
}

async function syncWithServer() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    const isDifferent = JSON.stringify(serverQuotes) !== JSON.stringify(quotes);
    if (isDifferent) {
      quotes = serverQuotes;
      saveQuotes();
      notify('Quotes updated from server.');
      populateCategories();
      filterQuotes();
    }
  } catch (err) {
    console.error("Sync error:", err);
  }
}

async function sendQuoteToServer(quoteObj) {
  try {
    await fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteObj)
    });
  } catch (err) {
    console.error('Failed to sync to server:', err);
  }
}

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const imported = JSON.parse(e.target.result);
    quotes.push(...imported);
    saveQuotes();
    populateCategories();
    filterQuotes();
    notify('Quotes imported successfully!');
  };
  reader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();
  URL.revokeObjectURL(url);
}

// Event Listeners
document.getElementById('generate-btn').addEventListener('click', filterQuotes);
document.getElementById('addQuoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const text = document.getElementById('newQuote').value;
  const category = document.getElementById('newCategory').value;
  if (text && category) addQuote(text, category);
  e.target.reset();
});
document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Initialize
populateCategories();
filterQuotes();
syncWithServer();
setInterval(syncWithServer, 30000); // 30s