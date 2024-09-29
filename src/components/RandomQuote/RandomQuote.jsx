import "./RandomQuote.styles.css";

const quotes = [
  { quote: "Outside of a dog, a book is a man’s best friend. Inside of a dog, it’s too dark to read.", author: "Groucho Marx" },
  { quote: "Think before you speak. Read before you think.", author: "Fran Lebowitz" },
  { quote: "Reading is a discount ticket to everywhere.", author: "Mary Schmich" },
  { quote: "We read in bed because reading is halfway between life and dreaming, our own consciousness in someone else’s mind.", author: "Anna Quindlen" },
  { quote: "My alma mater was books, a good library…. I could spend the rest of my life reading, just satisfying my curiosity.", author: "Malcolm X" },
  { quote: "Books are a uniquely portable magic.", author: "Stephen King" },
  { quote: "Books and doors are the same thing. You open them, and you go through into another world.", author: "Jeanette Winterson" },
  { quote: "Books are mirrors: you only see in them what you already have inside you.", author: "Carlos Ruiz Zafón" },
  { quote: "A book is a way for your imagination to be wild and free.", author: "Unknown" },
  { quote: "Take a good book to bed with you - books do not snore.", author: "Thea Dorn" },
  { quote: "A book is a gift you can open again and again.", author: "Garrison Keillor" }
];

const RandomQuote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div>
      <span className="random-quote playwrite-de-grund">{randomQuote.quote}</span>
      <span className="quote-author">- {randomQuote.author}</span>
    </div>
  );
};

export default RandomQuote;