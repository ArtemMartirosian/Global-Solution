import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

/*----Styles---*/
import {OffersBlogDiv} from "./styles";



export default function OffersBlog(){

    const {lang} = useParams()
    const {t} = useTranslation()

    const dataValue = [
        {
            title: t('gate.title17'),
            text: t('gate.text17.1'),
            link: null,
            button: {
                "ru": '',
                "uz": '',
                "en": '',
            },
            img: '/images/banners/block1.png'

        },
        {
            title: t('gate.title18'),
            text: '',
            link: t('gate.link18'),
            button: t('gate.button18'),
            img: '/images/banners/block2.png'

        }
    ]

    return(
        <OffersBlogDiv className="container">
            <div className='row'>
                {
                    dataValue.map(
                        (item, index) =>
                            <div className="col-md-6 mt-3" key={index}>
                                <div className="block" style={{backgroundImage: `url(${item.img})`}}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                    {item.link?(<a href={item.link} target="_blank" rel="nofollow">{item.button}</a>):''}
                                </div>
                            </div>
                    )
                }
            </div>
        </OffersBlogDiv>
    )
}
