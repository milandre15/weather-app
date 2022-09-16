let quote = {};

const pickQuote = (data) => {
  const intQuoteCount = data.results.length; // The number of quotes in array
  const dtNow = new Date();
  const intTZOffset = dtNow.getTimezoneOffset() * 60000; // automatically adjust for user timezone
  const intNow = dtNow.getTime() - intTZOffset;
  const intDay = Math.floor(intNow / 86400000); // The number of 'local' days since Jan 1, 1970
  const intQuoteToDisplay = intDay % intQuoteCount;
  const quoteOfTheDay = data.results[intQuoteToDisplay];
  return quoteOfTheDay;
};
const getQuotes = async () => {
  let q = {};
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  try {
    await axios
      .get(`https://api.quotable.io/quotes?limit=150`, headers)
      .then(({ data }) => {
        let fixedNumber = getFixedNumber(data.totalPages);
        return axios.get(
          `https://api.quotable.io/quotes?limit=150&page=${fixedNumber}`,
          headers
        );
      })
      .then(({ data }) => {
        q = pickQuote(data);
      });
  } catch (error) {
    console.error("ERROR!", error);
  }
  return q;
};

const openQuoteModal = async () => {
  if (quote.content != undefined) {
    quote = quote;
  } else {
    quote = await getQuotes();
  }

  const modal = document.querySelector("#quoteModal");
  const filter = document.querySelector("#filter");
  const quoteEl = document.querySelector("#quote");
  const authorEl = document.querySelector("#author");

  quoteEl.innerText = `"${quote.content}"`;
  authorEl.innerText = `- ${quote.author}`;
  filter.style.width = "100%";
  modal.style.top = "40px";
  document.body.style.overflow = "hidden";
};

const closeQuoteModal = () => {
  const modal = document.querySelector("#quoteModal");
  const filter = document.querySelector("#filter");
  filter.style.width = "0";
  modal.style.top = "-100%";
  document.body.style.overflow = "auto";
};

const openButton = document.querySelector("#quoteButton");
openButton.addEventListener("click", openQuoteModal);

const closeButton = document.querySelector("#closeButton");
const filter = document.querySelector("#filter");
closeButton.addEventListener("click", closeQuoteModal);
filter.addEventListener("click", closeQuoteModal);
