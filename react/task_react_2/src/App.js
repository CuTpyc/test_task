import './App.css';
import React, { useState, useEffect } from 'react';

const CensoredText = ({ badWords, children }) => {
  const [showOriginal, setShowOriginal] = useState({});
  console.log([...children.matchAll(/(\W*)(\w+)(\W*)/gm)])
  const censoredText = [...children.matchAll(/(\W*)(\w+)(\W*)/gm)].reduce(
    (censoredText, match) => {
      const [_, wordStart, word, wordEnd] = match;
      const { index: position } = match;
      console.log(position)
      if (badWords.includes(word)) {
        if (showOriginal[position]) {
          censoredText.push(<span key={position} onClick={() => setShowOriginal({ ...showOriginal, [position]: false })}>{wordStart + word + wordEnd}</span>)
        } else {
          censoredText.push(<span key={position} onClick={() => setShowOriginal({ ...showOriginal, [position]: true })}>{wordStart + '*'.repeat(word.length) + wordEnd}</span>)
        }
      } else {
        censoredText.push(<span key={position}>{wordStart + word + wordEnd}</span>)
      }
      return censoredText;
    },
    []
  )

  return <div>{censoredText}</div>;
};

function App() {
  const badWords = ['text', 'someBadWord'];
  const someText = 'Very ,long text who contains ?someBadWord and testWord';
  return (
    <div>
      <CensoredText badWords={badWords}>{someText}</CensoredText>
    </div>
  );
}

export default App;
