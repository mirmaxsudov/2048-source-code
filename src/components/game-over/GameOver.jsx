import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Item2048 } from "../header/Header"

const GameOver = () => {
    const game = useSelector((state) => state.game)
    const navigate = useNavigate();
    const [lastGameInfo] = useState(JSON.parse(localStorage.getItem("last-game-grid")));

    if (!lastGameInfo) {
        navigate("/");
    }

    useEffect(() => {
        const maxScore = localStorage.getItem("bestScore") || 0
        if (game.score > Number(maxScore)) {
            localStorage.setItem("bestScore", game.score.toString())
        }
    }, [game.score])

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#faf8ef] p-4">
            <div className="max-w-md w-full space-y-6">
                <h1 className="text-5xl font-bold text-[#776e65] text-center">Game Over</h1>
                <div className="text-center text-[#776e65]">
                    <p className="text-xl">
                        <span>{lastGameInfo?.score} points scored </span>
                        <span>in {lastGameInfo?.moves} moves. </span>
                    </p>
                </div>

                <div className="p-3 m-auto">
                    <div className="flex justify-center p-3">
                        <div
                            className="game-2048-wrapper grid grid-cols-4 bg-[#9C8B7D] w-[85vw] h-[85vw] max-w-[350px] max-h-[350px] rounded-[10px] border-[2vw] sm:border-[8px] lg:border-[10px] border-[#9C8B7D] relative"
                        >
                            {lastGameInfo?.grid.map((arr, rowIndex) =>
                                arr.map((item, colIndex) => (
                                    <Item2048
                                        item={item}
                                        key={`${rowIndex}-${colIndex}-${item.id}`}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => {
                            localStorage.removeItem("last-game-grid");
                            navigate("/");
                        }}
                        className="w-full py-3 bg-[#8f7a66] text-white rounded-md
                                 font-bold text-xl hover:bg-[#7f6a56] 
                                 transition-colors"
                    >
                        Play Again
                    </button>
                    <p className="text-center text-[#776e65] text-sm">You can't undo right now</p>
                </div>

                <p className="text-center text-[#776e65] text-sm">
                    2048 game by <a
                        className="underline"
                        href="https://t.me/abdurhamonMirmaxsudov">
                        Abdurahmon Mirmaxsudov
                    </a>
                </p>
            </div>
        </section>
    )
}

export default GameOver