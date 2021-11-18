import React from 'react'
import './SingleCard.css'

//pass in card and handleChoice function as props from APP.JS
const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        //check if card is disabled
        //if not disabled, then we can select a card, if disabled, then it will not fire handleChoice function
        if (!disabled) {
            handleChoice(card)
        }  
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img
                    src={card.src}
                    className='front'
                    alt='card front'
                    />
                <img
                    src='/images/cover.jpg'
                    className='back'
                    onClick={handleClick}
                    alt='card back'
                    />
            </div>
        </div>
    )
}

export default SingleCard;
