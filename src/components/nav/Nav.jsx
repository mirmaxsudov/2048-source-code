import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Nav = ({ handleChangeLanguage }) => {
    const { t } = useTranslation();
    return (
        <nav className="c-nav py-5 bg-[#fff4eb]">
            <div className='container mx-auto px-24'>
                <div className="nav-wrapper flex items-center justify-between">
                    <div className="c-nav__logo">
                        <h3 className='c-nav__title text-[#756452] font-bold text-[3.0rem]'>
                            <Link className='' to={"/"}>
                                2048
                            </Link>
                        </h3>
                    </div>
                    <div className="game-scores ml-14 flex justify-between items-center gap-[20px]">
                        <div className="current-score bg-[#EAE7D9] px-10 py-1 rounded-[15px] text-center text-[#988876] font-bold">
                            <h6>{t("nav.score")}</h6>
                            <p className='text-[20px]'>0</p>
                        </div>
                        <div className="best-score py-1 rounded-[15px] text-center text-[#988876] font-bold border-[2px] border-[#EAE7D9] px-10">
                            <h5>{t("nav.bestScore")}</h5>
                            <p className='text-[20px]'>0</p>
                        </div>
                    </div>
                    <div className="left-inputs">
                        <div className="game-language flex align-items-center gap-[20px]">
                            <select
                                onChange={handleChangeLanguage}
                                name="lan"
                                class="text-white bg-[#998878] border border-[#fff4eb] rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-[#fff4eb] focus:border-[#fff4eb] shadow-sm px-2"
                            >
                                <option value="uz">Uzbek</option>
                                <option value="kr">Krillcha</option>
                                <option value="ru">Russian</option>
                                <option value="en">English</option>
                                <option value="zh">中文</option>
                            </select>
                            <button className='text-[#fff4eb] bg-[#998878] border border-[#fff4eb] rounded-lg text-[16px] focus:ring-2 focus:ring-[#fff4eb] focus:border-[#fff4eb] shadow-sm px-4 py-2 hover:bg-[#fff4eb] hover:text-[#998878] transition ease-in-out duration-300x hover:outline-double'>
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