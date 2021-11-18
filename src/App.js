import './App.css';
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard';

//array of cards
const cardImages = [
  { 'src': '/images/emil.jpg', matched: false },
  { 'src': '/images/matt.jpg', matched: false },
  { 'src': '/images/nicholi.jpg', matched: false },
  { 'src': '/images/sam.jpg', matched: false },
  { 'src': '/images/tim.jpg', matched: false },
  { 'src': '/images/tom.jpg', matched: false }
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

  //compare 2 cards selected
  useEffect( () => {
    //comparison
    if (firstChoice && secondChoice) {
      ///if first choice src matches second choice src...
      if (firstChoice.src === secondChoice.src) {
        //...then update the cards state...
        setCards(prevCards => {
          ///...returns new array based on prevCards array...
          return prevCards.map(card => {
            //..fire function for each card in the array...
            if (card.src === firstChoice.src) {
              //changing matched property to true if cards selected match
              return {...card, matched: true}
            } else {
              //if no match, return cards unchanged
              return card
            }
          })
        })
        resetTurn()
      } else {
        
        resetTurn()
      }
    }
  }, [firstChoice, secondChoice])

  console.log(cards)

  //reset turn after player chooses two cards even if they don't match
  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns => prevTurns + 1)
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