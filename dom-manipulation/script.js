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
  },
  {
    text: "Believe you can and you're halfway there.",
    category: "Belief"
  }
];

// Get DOM elements
const quoteText = document.getElementById('quote');
const quoteCategory = document.getElementById('author');
const generateBtn = document.getElementById('generate-btn');

//  Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  //  only textContent
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteCategory.textContent = `Category: ${randomQuote.category}`;
}

//  Function to add a new quote to the array
function addQuote(text, category) {
  if (text.trim() && category.trim()) {
    quotes.push({ text, category });
    displayRandomQuote();
  }
}

// Event listener for the “Show New Quote” button
generateBtn.addEventListener('click', displayRandomQuote);






