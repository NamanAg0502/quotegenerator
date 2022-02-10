const container = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitterBtn');
const newQuote = document.getElementById('newQuote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  container.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    container.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://intense-retreat-41902.herokuapp.com/';
  const apiUrl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // if author is unknown than add 'Unknown
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // reduce font size if data size is large
    if (data.quoteText.Text === 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = data.quoteText;
    removeLoadingSpinner();
  } catch (err) {
    getQuote();
  }
}

//tweet function
function twitterQuote() {
  const quote = quoteText.innerHTML;
  const author = authorText.innerHTML;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

//Event listeners
newQuote.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twitterQuote);

// onload
getQuote();
