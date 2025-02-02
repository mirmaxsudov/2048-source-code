import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const GameOver = () => {
    const game = useSelector(state => state.game);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Game over", game);

        const maxScore = localStorage.getItem("bestScore") || 0;
        if (game.score > maxScore) localStorage.setItem("bestScore", game.score);
    })

    return (
        <div>GameOver</div>
    )
}

export default GameOver