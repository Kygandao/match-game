import './App.css';
import { useState } from 'react'
import SingleCard from './components/SingleCard';

//array of cards
const cardImages = [
  { 'src': '/images/chrome.png' },
  { 'src': '/images/doll.png' },
  { 'src': '/images/firefox.png' },
  { 'src': '/images/icon.png' },
  { 'src': '/images/line.png' },
  { 'src': '/images/penguin.png' }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] =useState(0)
  //player card choice
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)


  //shuffle cards function
  const shuffleCards = () => {
    //spread images twice to make matching sets
    const shuffledCards = [...cardImages, ...cardImages]
    //sort images in a random order
    .sort(() => Math.random() - 0.5 )
    //add id property to each image
    .map((card) => ({ ...card, id: Math.random() }))

    //set new state of cards and turns taken
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle player choice
  const handleChoice = (card) => {
    //if no value, update choice one //if value present, update choice two
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  return (
    <div className="App">
      <h1>Match-A-Rider</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            />
        ))}
      </div>
    </div>
  );
}

export default App;
