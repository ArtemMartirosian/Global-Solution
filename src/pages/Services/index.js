import {ServicesSection} from "./styles";
import {Col} from "antd";
import {Link, useLocation} from "react-router-dom";
import Articles from "../../vr_db/services.json"
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {renderMeta} from "../../assets/scripts";
import meta from "../../vr_db/meta.json";
import {Seo} from "../../api";
import {urlCleaner} from "../../utils/url-cleaner";
import {renderMetaPixel} from "../../utils/meta-pixels";


export default function Services(props) {
    const [services, setServices] = useState([])
    const {locale, pathname} = props
    const [mainUrl, setMainUrl] = useState('')
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)


    useEffect(() => {
        Seo.getAll()
            .then((response) => {
                if (response) {
                    const foundResponse = response.find((item) => `/${item.url}` === urlCleaner(location.pathname))
                    if (foundResponse) {
                        setSeoData(foundResponse)
                    }
                }
            })

        if (pathname.match('global-pay')) {
            setMainUrl('global-pay')
            setServices(Articles.find(item => item.key === 'global-pay')?.article || [])
        } else if (pathname.match('global-id')) {
            setMainUrl('global-id')
            setServices(Articles.find(item => item.key === 'global-id')?.article || [])
        } else {

            //setServices(Articles.find(item=>item.key==='global')?.article||[])
        }
    }, [pathname])

    function getMainPath() {
        if (pathname.match('global-pay')) {
            return '/global-pay/services'
        } else if (pathname.match('global-id')) {
            return '/global-id/services'
        } else {
            return '/services'
        }
    }


    return (
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta property="og:title" content={renderMeta(getMainPath(), locale, 'title')}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:description" content={renderMeta(getMainPath(), locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta(getMainPath(), locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta(getMainPath(), locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta(getMainPath(), locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta(getMainPath(), locale, 'og:image')}/>
                {renderMetaPixel()}
            </Helmet>
            <ServicesSection>
                <div className="container" style={{minHeight: 600}}>
                    <div className="row services">
                        {!pathname.match('global-pay') && !pathname.match('global-id') ? (<>
                            {Articles.filter((item) => item.key !== 'global-id').map(main => {

                                return (
                                    <React.Fragment key={main.id}>
                                        <h2>{main.title}</h2>
                                        {
                                            main.article.map((item, index) => {
                                                return (
                                                    <Col md={8} key={item.id} className="services__item">
                                                        <Link to={`${locale==='ru'?'':`/${locale}`}${item.path}${item.id}`}
                                                              className="services__item_img">
                                                            <img src={item.image[locale]} alt=""/>
                                                        </Link>
                                                        <div className="services__item_info">
                                                            <Link
                                                                to={`${locale==='ru'?'':`/${locale}`}${item.path}${item.id}`}>{item.description[locale]}</Link>
                                                            <p>{item.subtitle[locale]}</p>
                                                            <div className="services__item_info_date">
                                                                <p>{item.date[locale]}</p>
                                                                <div>
                                                                    <svg width="4" height="4" viewBox="0 0 4 4"
                                                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M2.00016 3.66659C2.92064 3.66659 3.66683 2.92039 3.66683 1.99992C3.66683 1.07944 2.92064 0.333252 2.00016 0.333252C1.07969 0.333252 0.333496 1.07944 0.333496 1.99992C0.333496 2.92039 1.07969 3.66659 2.00016 3.66659Z"
                                                                            fill="#141414"/>
                                                                    </svg>
                                                                </div>
                                                                <span>{item.tag[locale]}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </>) : (<>{services.map((item) => {
                            return (
                                <Col md={8} key={item.id} className="services__item">
                                    <Link to={`${locale==='ru'?'':`/${locale}`}${item.path}${item.id}`} className="services__item_img">
                                        <img src={item.image[locale]} alt=""/>
                                    </Link>
                                    <div className="services__item_info">
                                        <Link to={`${locale==='ru'?'':`/${locale}`}${item.path}${item.id}`}>{item.description[locale]}</Link>
                                        <p>{item.subtitle[locale]}</p>
                                        <div className="services__item_info_date">
                                            <p>{item.date[locale]}</p>
                                            <div>
                                                <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M2.00016 3.66659C2.92064 3.66659 3.66683 2.92039 3.66683 1.99992C3.66683 1.07944 2.92064 0.333252 2.00016 0.333252C1.07969 0.333252 0.333496 1.07944 0.333496 1.99992C0.333496 2.92039 1.07969 3.66659 2.00016 3.66659Z"
                                                        fill="#141414"/>
                                                </svg>
                                            </div>
                                            <span>{item.tag[locale]}</span>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}</>)}


                    </div>
                </div>
            </ServicesSection>
        </>
    )
}