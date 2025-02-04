import React, { useEffect, useRef } from 'react'
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { moveDown, moveLeft, moveRight, moveUp } from '../../features/2048/gameSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { grid, status } = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const touchStartRef = useRef({ x: 0, y: 0 });

    // useEffect(() => {
    //     localStorage.removeItem("last-game-grid");
    // }, [])

    console.log(grid);


    useEffect(() => {
        if (status === "GAMEOVER") navigate("/game-over");
    }, [status, navigate]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    dispatch(moveUp());
                    break;
                case "ArrowDown":
                    dispatch(moveDown());
                    break;
                case "ArrowLeft":
                    dispatch(moveLeft());
                    break;
                case "ArrowRight":
                    dispatch(moveRight());
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [dispatch]);

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e) => {
        const touch = e.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const { x: startX, y: startY } = touchStartRef.current;

        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                dispatch(moveRight());
            } else {
                dispatch(moveLeft());
            }
        } else {
            if (diffY > 0) {
                dispatch(moveDown());
            } else {
                dispatch(moveUp());
            }
        }
    };

    return (
        <header className="header mt-5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-24">
                <div className="flex justify-center">
                    <div
                        className="game-2048-wrapper bg-[#9C8B7D] w-[85vw] h-[85vw] max-w-[350px] max-h-[350px] rounded-[10px] border-[2vw] sm:border-[8px] lg:border-[10px] border-[#9C8B7D] relative"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <>
                            {grid.map((arr, rowIndex) =>
                                arr.map((item, colIndex) => (
                                    <Item2048
                                        item={item}
                                        key={`${rowIndex}-${colIndex}-${item.id}`}
                                    />
                                ))
                            )}
                        </>
                    </div>
                </div>
            </div>
        </header>
    );
};

export const Item2048 = ({ item: { val, bgColor, textColor, defaultBgColor } }) => {
    return (
        <div
            style={{
                backgroundColor: val ? bgColor : defaultBgColor,
            }}
            className={`aspect-square rounded-[5px] sm:rounded-[10px] flex items-center justify-center ${val ? "animate-tile-appear" : ""
                }`}
        >
            {val && (
                <p
                    className={`text-${textColor} ${val >= 1000
                        ? "text-sm xs:text-base sm:text-xl"
                        : val >= 100
                            ? "text-lg sm:text-2xl"
                            : "text-xl sm:text-3xl"
                        } font-bold`}
                >
                    {val}
                </p>
            )}
        </div>
    );
};

export default Header;
