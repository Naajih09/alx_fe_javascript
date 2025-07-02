const quotes = [
  {
    quote: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    quote: "Success is not in what you have, but who you are.",
    author: "Bo Bennett"
  },
  {
    quote: "Do not wait for the perfect moment, take the moment and make it perfect.",
    author: "Unknown"
  },
  {
    quote: "It always seems impossible until it is done.",
    author: "Nelson Mandela"
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteText.textContent = `"${randomQuote.quote}"`;
  quoteAuthor.textContent = `- ${randomQuote.author}`;
});
