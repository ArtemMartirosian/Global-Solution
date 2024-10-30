import React, {useState, useEffect} from 'react';
import {clearInterval, setInterval} from "worker-timers";



const RatesWrapper = ({isStart, rate, setRate}) => {
    useEffect(() => {
        if (isStart) {
            const interval = setInterval(() => {
                setRate((prevState) => {
                    return (prevState < 1.02 ? prevState : prevState - .01 )
                })
            }, 55)

            return () => {
                clearInterval(interval)
            }
        }
    }, [rate, isStart])





    const rateTypes = [
        {
            img: '/images/globalPay/uzcard.svg',
            type: 'Uzcard'
        },
        {
            img: '/images/globalPay/humo.svg',
            type: 'Humo'
        }
    ]
    return (
        <div className={'rates__types'}>
            {rateTypes.map(({type, img}) => (
                <div key={type} className={'rates__type'}>
                    <img src={img} alt={type}/>
                    <div className={'rates__info'}>
                        <p className={'rates__card-type'}>
                            {type}
                        </p>
                        <h3 className={'rates__percent'}>
                            {Number(rate) < 1.02 ? Number(rate).toFixed(1) : rate.toFixed(2)}%
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RatesWrapper;