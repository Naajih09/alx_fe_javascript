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

const quoteText = document.getElementById('quote');
const quoteCategory = document.getElementById('author');
const generateBtn = document.getElementById('generate-btn');

//  Function name is showRandomQuote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  //  Uses innerHTML to update the DOM
  quoteText.innerHTML = `"${randomQuote.text}"`;
  quoteCategory.innerHTML = `Category: <strong>${randomQuote.category}</strong>`;
}

//  Event listener for “Show New Quote” button
generateBtn.addEventListener('click', showRandomQuote);
