let quote = {};

// const pickQuote = (data) => {
//   const intQuoteCount = data.length - 1; // The number of quotes in array
//   const dtNow = new Date();
//   const intTZOffset = dtNow.getTimezoneOffset() * 60000; // automatically adjust for user timezone
//   const intNow = dtNow.getTime() - intTZOffset;
//   const intDay = Math.floor(intNow / 86400000); // The number of 'local' days since Jan 1, 1970
//   const intQuoteToDisplay = intDay % intQuoteCount;
//   const quoteOfTheDay = data[intQuoteToDisplay];
//   return quoteOfTheDay;
// };

const getQuotes = async () => {
  let q = {};
  // const url =
  //   "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today";
  const url = "https://zenquotes.io/api/today";
  try {
    await axios.get(url).then(({ data }) => {
      // q = pickQuote(data);
      q = data[0];
    });
  } catch (error) {
    console.error("ERROR!", error);
  }
  return q;
};

const openQuoteModal = async () => {
  if (quote.q != undefined) {
    quote = quote;
  } else {
    quote = await getQuotes();
  }

  const modal = document.querySelector("#quoteModal");
  const filter = document.querySelector("#filter");
  const quoteEl = document.querySelector("#quote");
  const authorEl = document.querySelector("#author");

  quoteEl.innerText = `"${quote.q}"`;
  authorEl.innerText = `- ${quote.a}`;
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
