import {Link, useParams} from "react-router-dom";

import React, {useEffect, useState} from "react";
import Articles from '../../vr_db/services.json'
import {image_download} from "../../api";
import {renderDate, renderMeta} from "../../assets/scripts";
import {BreadCrumbs} from "../Global/Video/style";
import {Col} from "antd";
import {FacebookShareButton, TelegramShareButton, TwitterShareButton} from "react-share";
import {BlogContent} from "./styles";
import {useTranslation} from "react-i18next";
import {EdditionalServices} from "../GlobalPay/Main/styles";
import {Helmet} from "react-helmet-async";
import meta from "../../vr_db/meta.json";


export default function ServiceView(props) {
    const {id} = useParams()
    const [service, setService] = useState({})
    const [serviceAll, setServiceAll] = useState([])
    const {locale, pathname} = props
    const {t} = useTranslation()


    useEffect(() => {
        if (id) {
            if (pathname.match('/global-pay')) {
                let services = Articles.find(item => item.key === 'global-pay')?.article || []
                setService(services.find(item => item.id === +id) || {})
                setServiceAll(services)
            } else {
                let services = Articles.find(item => item.key === 'global')?.article || []
                setService(services.find(item => item.id === +id) || {})
                setServiceAll(services)
            }

        }
    }, [id])

    function getMainPath() {
        if (pathname.match('global-pay')) {
            return `/global-pay/services/${id}`
        } else if (pathname.match('global-id')) {
            return `/global-id/services/${id}`
        } else {
            return `/services/${id}`
        }
    }
    useEffect(() => {
        const head = document.querySelector('.robot')
        if(head) {
        head.remove()
        }
    }, [])

    const defineBreadcrumbsMain = () => {
       if (pathname.includes('-pay')) {
           return {
               path: `${locale === 'ru' ? '/' : `/${locale}/`}global-pay`,
               title: 'Global Pay'
           }
       } return {
           path: `${locale === 'ru' ? '/' : `/${locale}/`}`,
            title: 'Global'
        }
    }

    const defineBreadcrumbsServices = () => {
        if (pathname.includes('-pay')) {
            return {
                path: `${locale === 'ru' ? '/' : `/${locale}/`}global-pay/services`,
                title: 'services'
            }
        } return {
            path: `${locale === 'ru' ? '/services' : `/${locale}/services`}`,
            title: 'services'
        }
    }


    if (!service?.description) {
        return <></>
    }
    return (
        <>
            <Helmet>
                <title>{renderMeta(getMainPath(), locale, 'Title')}</title>
                <meta name="description" content={renderMeta(getMainPath(), locale, 'description')}/>
                <meta name="keywords" content={renderMeta(getMainPath(), locale, 'keywords')}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta(getMainPath(), locale, 'title')}/>
                <meta property="og:description" content={renderMeta(getMainPath(), locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta(getMainPath(), locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta(getMainPath(), locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta(getMainPath(), locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta(getMainPath(), locale, 'og:image')}/>
            </Helmet>
            <BlogContent className="container" style={{minHeight: '100vh'}}>
                <div className="blog-content-item">
                    <div className="item-info">
                        <div className="image-block">
                            <div className="blog-content-author-img" itemScope itemType="http://schema.org/ImageObject">
                                {pathname.includes('-pay')?(<svg width="34" height="28" viewBox="0 0 34 28" fill="none"
                                                                                                 xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M5.94429 4.02751C13.0761 -1.99032 23.8077 -1.1706 29.9135 5.85852C35.5449 12.3412 35.2751 21.8415 29.6043 28L4.34946 27.9463C4.26097 27.8491 4.17311 27.7509 4.0864 27.6512C-2.01949 20.6221 -1.18767 10.0454 5.94429 4.02751Z"
                                          fill="#E9532F"/>
                                </svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="663" height="660" viewBox="0 0 663 660" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M331.319 0C514.3 0 662.638 148.338 662.638 331.319C662.638 500.078 536.465 639.367 373.307 660L0.0978699 339.086C0.0387377 336.502 0 333.917 0 331.319C0 148.338 148.336 0 331.319 0V0Z" fill="#18406D"/>
                                </svg>)}
                            </div>
                        </div>
                        <div className="blog-content-author-info">
                            <div className="author-name">{service.author}</div>
                            <div className="author-action">
                                <div className="action-date">{service.date[locale]}</div>
                                <div className="action-circle">
                                    <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.99992 3.66671C2.92039 3.66671 3.66659 2.92052 3.66659 2.00004C3.66659 1.07957 2.92039 0.333374 1.99992 0.333374C1.07944 0.333374 0.333252 1.07957 0.333252 2.00004C0.333252 2.92052 1.07944 3.66671 1.99992 3.66671Z"
                                            fill="#141414"/>
                                    </svg>
                                </div>
                                <div className="action-reading">{service.reading[locale]}</div>
                                <div className="action-circle">
                                    <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.99992 3.66671C2.92039 3.66671 3.66659 2.92052 3.66659 2.00004C3.66659 1.07957 2.92039 0.333374 1.99992 0.333374C1.07944 0.333374 0.333252 1.07957 0.333252 2.00004C0.333252 2.92052 1.07944 3.66671 1.99992 3.66671Z"
                                            fill="#141414"/>
                                    </svg>
                                </div>
                                <div className="action-tags flex-wrap">
                                    <span>{service.tag[locale]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog-content-main">
                    <h2>{service?.description[locale]}</h2>
                    <BreadCrumbs>
                        <Link to={defineBreadcrumbsMain().path}>{defineBreadcrumbsMain().title}</Link>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.17177 4.99996L0.342773 2.17196L1.75677 0.756958L5.99977 4.99996L1.75677 9.24296L0.342773 7.82796L3.17177 4.99996Z"
                                fill="#141414"/>
                        </svg>
                        <Link
                            to={defineBreadcrumbsServices().path}>{t(defineBreadcrumbsServices().title)}</Link>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.17177 4.99996L0.342773 2.17196L1.75677 0.756958L5.99977 4.99996L1.75677 9.24296L0.342773 7.82796L3.17177 4.99996Z"
                                fill="#141414"/>
                        </svg>
                        <p>{service.description[locale]}</p>
                    </BreadCrumbs>
                    <div className="blog-content-main-image">
                        <div itemScope itemType="http://schema.org/ImageObject">
                            <img itemProp='contentUrl' src={service?.image[locale]} alt=""/>
                        </div>
                    </div>
                    <div className="content-text">
                        <Col span={24}>
                            <div className="content" dangerouslySetInnerHTML={{__html: service?.content[locale]}}></div>
                        </Col>
                    </div>
                </div>
            </BlogContent>
            <EdditionalServices>
                <h1>{t('pay_service.text1')}</h1>
                <div className="container">
                    <div className="services row gx-8">


                        <div className="col-md-4 mt-block">
                            <a href={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay/services/${serviceAll.find(item => item.id !== service.id)?.id}`}
                               className="services__link bg_orange">
                                <div className="services__link_top">
                                    <img
                                        src={`/images/icons/global-pay/${service.id === 2 ? "user-plus.svg" : 'split.svg'}`}
                                        alt=""/>
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                    </span>
                                </div>
                                <p>{serviceAll.find(item => item.id !== service.id)?.description[locale]}</p>
                            </a>
                        </div>
                        {/*<div className="col-md-4 mt-block">*/}
                        {/*    <a href={`/${locale}/global-pay/services/2`} className="services__link bg_orange">*/}
                        {/*        <div className="services__link_top">*/}
                        {/*            <img src="/images/icons/global-pay/split.svg" alt=""/>*/}
                        {/*            <span>*/}
                        {/*                <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*        <p>{t('pay_service.text3')}</p>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        <div className="col-md-4 mt-block">
                            <Link to={`${locale==='ru'?'/':`/${locale}/`}global-pay`} className="services__link bg_orange">
                                <div className="services__link_top" itemScope itemType="http://schema.org/ImageObject">
                                    <img height={50} itemProp='contentUrl' src="/images/icons/global-pay/circle-pay.svg" alt=""/>
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                    </span>
                                </div>
                                <p>{t('pay_service.text10')}</p>
                            </Link>
                        </div>
                        <div className="col-md-4 mt-block">
                            <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}global-id`}
                                  className="services__link bg_orange">
                                <div className="services__link_top">
                                    <img src="/images/icons/global-pay/finger.svg" alt=""/>
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                    </span>
                                </div>
                                <p>{t('pay_service.text7')}</p>
                            </Link>
                        </div>
                        {/*<div className="col-md-4 mt-block">*/}
                        {/*    <a href="#" className="services__link bg_blue">*/}
                        {/*        <div className="services__link_top">*/}
                        {/*            <img src="/images/icons/global-pay/smartphone.svg" alt=""/>*/}
                        {/*            <span>*/}
                        {/*                <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*        <p>Заказать разработку мобильного приложения </p>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-4 mt-block">*/}
                        {/*    <a href="#" className="services__link bg_blue">*/}
                        {/*        <div className="services__link_top">*/}
                        {/*            <img src="/images/icons/global-pay/web-line.svg" alt=""/>*/}
                        {/*            <span>*/}
                        {/*                <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*        <p>Заказать разработку вебсайта </p>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>
                    {/*<div className="services-button">*/}
                    {/*    <button>{t('pay_service.text8')}</button>*/}
                    {/*</div>*/}
                </div>
            </EdditionalServices>
        </>
    )
}