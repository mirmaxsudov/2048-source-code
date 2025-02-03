import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../features/language/languageSlice';
import { Link } from 'react-router-dom'

const Nav = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { bestScore, score } = useSelector(state => state.game)
    const { language } = useSelector(state => state.language)

    return (
        <nav className="c-nav py-5 bg-[#fff4eb]">
            <div className='container mx-auto px-4 sm:px-6 lg:px-24'>
                <div className="nav-wrapper flex flex-wrap gap-y-4 items-center justify-between">
                    {/* Logo Section */}
                    <div className="c-nav__logo order-1 flex-shrink-0">
                        <h3 className='c-nav__title text-[#756452] font-bold text-2xl md:text-3xl lg:text-[3rem]'>
                            <Link to={"/"}>2048</Link>
                        </h3>
                    </div>

                    {/* Scores Section */}
                    <div className="game-scores order-3 lg:order-2 w-full lg:w-auto ml-0 lg:ml-14 flex justify-center lg:justify-between items-center gap-2 sm:gap-4 lg:gap-5">
                        <div className="current-score bg-[#EAE7D9] px-4 sm:px-6 lg:px-10 py-1 rounded-lg text-center text-[#988876] font-bold flex-1 max-w-[150px]">
                            <h6 className="text-sm sm:text-base">{t("nav.score")}</h6>
                            <p className='text-lg sm:text-xl lg:text-2xl'>{score}</p>
                        </div>
                        <div className="best-score py-1 rounded-lg text-center text-[#988876] font-bold border-2 border-[#EAE7D9] px-4 sm:px-6 lg:px-10 flex-1 max-w-[150px]">
                            <h5 className="text-sm sm:text-base">{t("nav.bestScore")}</h5>
                            <p className='text-lg sm:text-xl lg:text-2xl'>{bestScore}</p>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="left-inputs order-2 lg:order-3 flex-shrink-0">
                        <div className="game-language flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                            <select
                                onChange={e => dispatch(changeLanguage(e.target.value))}
                                value={language}
                                className="w-full sm:w-auto text-white bg-[#998878] border border-[#fff4eb] rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#fff4eb] focus:border-[#fff4eb] shadow-sm px-3 py-2"
                            >
                                <option value="uz">Uzbek</option>
                                <option value="kr">Krillcha</option>
                                <option value="ru">Russian</option>
                                <option value="en">English</option>
                                <option value="zh">中文</option>
                            </select>
                            <button
                                onClick={() => window.location.reload()}
                                className='w-full sm:w-auto text-[#fff4eb] bg-[#998878] border border-[#fff4eb] rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-[#fff4eb] focus:border-[#fff4eb] shadow-sm px-4 py-2 hover:bg-[#fff4eb] hover:text-[#998878] transition-colors duration-300'
                            >
                                {t("nav.newGame")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav