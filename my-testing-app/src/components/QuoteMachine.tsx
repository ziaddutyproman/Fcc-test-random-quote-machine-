import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://api.quotable.io/random";

const QuoteMachine = () => {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("Unknown");

  const fetchQuote = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      setQuote("Failed to load quote.");
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box" className="quote-box">
      <p id="text">{quote}</p>
      <p id="author">- {author}</p>
      <button id="new-quote" onClick={fetchQuote}>New Quote</button>
      <a
        id="tweet-quote"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `\"${quote}\" - ${author}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet Quote
      </a>
    </div>
  );
};

export default QuoteMachine;
