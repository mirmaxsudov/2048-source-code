import React, { useEffect } from 'react'
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { moveDown, moveLeft, moveRight, moveUp } from '../../features/2048/gameSlice'

const Header = () => {
    const { grid } = useSelector(state => state.game)
    const dispatch = useDispatch();

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

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);


    return (
        <header className="header mt-5">
            <div className="container mx-auto px-24">
                <div className='mx-[450px]'>
                    <div className="game-2048-wrapper bg-[#9C8B7D] w-[350px] h-[350px] rounded-[10px] border-[10px] border-[#9C8B7D]">
                        {
                            grid.map(arr => {
                                return arr.map((item, index) => <Item2048 item={item} key={item.id + index} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

const Item2048 = ({ item: { val, bgColor, textColor, defaultBgColor } }) => {

    return (
        <>
            <div
                style={{
                    backgroundColor: val ? bgColor : defaultBgColor,
                }}
                className={`w-[100%] h-[100%] rounded-[10px] flex items-center justify-center`}>
                {
                    val && <p className={`text-[${textColor}] text-[${(val + "").length >= 4 ? "20px" : "30px"}] font-bold`}>{val}</p>
                }
            </div >
        </>
    )
}

export default Header