import React, {useEffect, useState} from 'react';
import RatesImage from "../rates-image/rates-image";
import {Rates} from "../../styles";
import {useTranslation} from "react-i18next";
import RatesWrapper from "../rates-wrapper/rates-wrapper";


const RatesItem = () => {

    const {t} = useTranslation()
    const [rate, setRate] = useState(1.5)

    const [isStart, setIsStart] = useState(false)

    const onMouseOver = () => setIsStart(true)

    useEffect(() => {
        const onScroll = (e) => {
            const scrollY = e.currentTarget.scrollY
            if (scrollY > 3800) {
                setIsStart(true)
            }
        }

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <Rates>
            <div onMouseOver={onMouseOver} onTouchMove={onMouseOver}  className={'integration container'}>
                <h1>
                    {t('uzcard_rates')}
                </h1>
                <div className={'rates__wrapper'}>
                    <div className={'rates__information'}>
                        <p className={'rates__text'}>
                            {t('rates_text')}
                        </p>
                        <RatesWrapper rate={rate} setRate={setRate} isStart={isStart}/>
                    </div>
                    <div className={'rates__img'}>
                        <RatesImage setRate={setRate} isStart={isStart}/>
                    </div>
                </div>
            </div>
        </Rates>
    );
};

export default RatesItem;