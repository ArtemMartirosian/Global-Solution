import React, {useEffect, useRef} from 'react';
import {clearInterval, setInterval} from "worker-timers";
import useWindowSize from "../../../../../hooks/useWindowSize";


const RatesImage = ({isStart, setRate}) => {

    const vidRef = useRef(null);


    const {width} = useWindowSize()


    const handlePlayVideo = () => {
        if (vidRef.current) {
            vidRef.current.muted = true
            vidRef.current.play();
        }
    }

    useEffect(() => {
        if (isStart) {
            handlePlayVideo()
            const timeout = setInterval(() => {
                handlePlayVideo()
                setRate(1.5)
            }, 4000)

            return () => {
                clearInterval(timeout)
            }
        }


    }, [isStart])

    return (
        <video preload={'auto'} ref={vidRef} autoPlay={false} muted="muted" playsInline={true} controls={false}
               className={'rates__video'}>
            {width <= 992 ? <source type="video/mp4" src={'/videos/rate-mobile.mp4'}/> :
                <source type="video/mp4" src={'/videos/rates.mp4'}/>
}
        </video>
    );
};

export default RatesImage;