import {FeatureDiv} from "./styles";
import React from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";





export default function FeatureListCard(){
    const {t} = useTranslation()


    const dataValues = [
        {
            iconClassName: 'money-dollar-circle-fill',
            title: t('gate.title13'),
            description: t('gate.text13.1')

        },
        {
            iconClassName: 'bank-card-fill',
            title: t('gate.title14'),
            description: t('gate.text14.1')

        },
        {
            iconClassName: 'wallet-fill',
            title: t('gate.title15'),
            description: t('gate.text15.1')

        },
        {
            iconClassName: 'numbers-fill',
            title: t('gate.title16'),
            description: t('gate.text16.1')

        }
    ]

    return(
        <FeatureDiv className='container'>
            <article className='box-quick bg'>
                <h3 className='title-box mb-5 text-center'>{t('home-title1')}</h3>
                <div className="row">
                    {
                        dataValues.map(
                            (item, index) =>
                                <div className="col-md-3" key={index}>
                                    <div className="item-feature">
                                        <span className="icon-wrap my-icon"><i className={item.iconClassName} /></span>
                                        <div className="text-wrap">
                                            <h6 className="title">{item.title}</h6>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>

                        )
                    }
                </div>
            </article>
        </FeatureDiv>
    )
}
