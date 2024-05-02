import './App.css';
import CensoredText from './components/Censore';

function App() {
  const badWords = ['text', 'someBadWord'];

  return (
    <div>
      <CensoredText badWords={badWords}>{'Very long text who contains someBadWord and testWord'}</CensoredText>
      <CensoredText badWords={badWords}>{'Very long text, who contains someBadWord? and testWord'}</CensoredText>
    </div>
  );
}

export default App;
