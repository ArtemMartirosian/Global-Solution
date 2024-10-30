import {BtnWrapper, Categories, Category, ImgWrapper, Item, Wrapper} from "./styles";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import Actions from "./components/actions";

import FancyboxImg from "./components/fancybox-img";





export default function TrackTransactions({isBlue}) {
    const {t} = useTranslation()
    const [isWeb, setIsWeb] = useState(true)
    const [activeCategory, setActiveCategory] = useState('dashboard')
    const [currentImg, setCurrentImg] = useState("/images/globalPay/dashboard-web.jpg")



    const images =
        [
            '/images/globalPay/dashboard-web.jpg',
            '/images/globalPay/dashboard-mobile.jpg',
            '/images/globalPay/companies-web.jpg',
            '/images/globalPay/companies-mobile.jpg',
            '/images/globalPay/transactions-web.jpg',
            '/images/globalPay/transactions-mobile.jpg',
            '/images/globalPay/graphics-web.jpg',
            '/images/globalPay/graphics-mobile.jpg'
        ]

    const toggleButtons = [
        {
            id: 1,
            title: 'web',
            isActive: isWeb,
            action: () => {
                setIsWeb(true)
                setCurrentImg(currentImg.replace('mobile', 'web'))
            }
        },
        // {
        //     id: 2,
        //     title: 'app',
        //     isActive: !isWeb,
        //     action: () => {
        //         setIsWeb(false)
        //         setCurrentImg(currentImg.replace('web', 'mobile'))
        //     }
        // }
    ]

    const imageType = isWeb ? 'web' : 'mobile'

    const categories =
        [
            {
                id: 1,
                title: "dashboard",
                action: () => {
                    setCurrentImg(`/images/globalPay/dashboard-${imageType}.jpg`)
                    setActiveCategory('dashboard')
                },
                key: 'dashboard'
            },
            {
                id: 2,
                title: "companies",
                action: () => {
                    setCurrentImg(`/images/globalPay/companies-${imageType}.jpg`)
                    setActiveCategory('companies')
                },
                key: 'companies'
            },
            {
                id: 3,
                title: "transactions",
                action: () => {
                    setCurrentImg(`/images/globalPay/transactions-${imageType}.jpg` )
                    setActiveCategory('transactions')
                },
                key: 'transactions'
            },
            {
                id: 4,
                title: isWeb ? "graphics" : "filters",
                action: () => {
                    setCurrentImg(`/images/globalPay/graphics-${imageType}.jpg`)
                    setActiveCategory('graphics')
                },
                key: 'graphics'
            },
        ]


    return (
        <>
            <Wrapper>
                <Item>
                    <BtnWrapper>
                        <div className={`track__slide ${isBlue ? 'track__slide--blue' : ''} ${isWeb ? "" : 'track__slide--active'}`}/>
                        {toggleButtons.map(({
                                                id,
                                                title,
                                                isActive,
                                                action
                                            }) => (
                            <button key={id} onClick={action}
                                    className={`track__btn ${isActive ? 'track__btn--active' : ''}`}>
                                {t(title)}
                            </button>
                        ))}
                    </BtnWrapper>
                    <Categories>
                        {categories.map(({
                                             id,
                                             title,
                                             action,
                                             key
                                         }) => (
                            <Category
                                onMouseEnter={window.innerWidth <= 991 ? undefined : key === activeCategory ? undefined : action}
                                onTouchStart={window.innerWidth <= 991 ? key === activeCategory ? undefined : action : undefined}
                                onClick={action}
                                isActive={key === activeCategory} key={id}>
                                {t(title)}
                            </Category>
                        ))}
                    </Categories>
                    <Actions isWeb={isWeb} isMobile={false}/>
                </Item>
                <Item isBlue={isBlue} isWeb={isWeb}>
                        <ImgWrapper isBlue={isBlue} isWeb={isWeb}>
                            {images.map((item, index) => (
                                <FancyboxImg key={item} index={index} currentImg={currentImg} item={item}/>
                            ))}
                        </ImgWrapper>

                </Item>
            </Wrapper>
            <Actions isWeb={isWeb} isMobile={true}/>
        </>
    )
}