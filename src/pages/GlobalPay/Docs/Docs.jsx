import React, {useEffect, useState} from 'react'
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {urls} from './data';
import {MainDiv} from "./styles";
import {Collapse} from 'antd'
import {Helmet} from "react-helmet-async";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {Seo} from "../../../api";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";

export  default function Docs(props){
    const { Panel } = Collapse;
    const {locale} = props
    const {t, i18n} = useTranslation()
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)
    const Navigations = urls().map(d => 
            <NavLink className={(navData) => navData.isActive ? "active-link" : "unactive-link"}
                    to={`${locale==='ru'?'/':`/${locale}/`}global-pay/docs/${d.url}`}>
                    <div>{t(`docs.title${d.id + 1}`)}</div>
            </NavLink>
       ); 

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
        const head = document.querySelector('.robot')
        if(head) {head.remove()}
    }, [])
    useEffect(()=>{
        i18n.changeLanguage(locale).then()
    }, [locale])

    return(
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/global-pay/docs/getCardInfo', locale, 'title')} />
                <meta property="og:description" content={renderMeta('/global-pay/docs/getCardInfo', locale, 'og:description')} />
                <meta property="og:url" content={renderMeta('/global-pay/docs/getCardInfo', locale, 'og:url')} />
                <meta property="og:type" content={renderMeta('/global-pay/docs/getCardInfo', locale, 'og:type')} />
                <meta property="og:site_name" content={renderMeta('/global-pay/docs/getCardInfo', locale, 'og:site_name')} />
                <meta property="og:image" content={renderMeta('/global-pay/docs/getCardInfo', locale, 'og:image')} />
                {renderMetaPixel()}
            </Helmet>
            <MainDiv>
                <section className={"section-content"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <aside className={"col-lg-3 col-md-4"}>
                                <div className={"aside-wrap"}>
                                    <ul className={"menu-docs-aside sticky-top"}>
                                        <h6 className={"text-muted border-bottom pb-2"}>
                                            <b>{t('docs.title')}</b>
                                        </h6>
                                        {/* ===== MOBILE MENU ===== */}
                                        <div className="mobile-menu">
                                            <Collapse accordion >
                                                <Panel header={<b>{title}</b>} key="1">
                                                    {Navigations}
                                                </Panel>
                                            </Collapse>
                                        </div>
                                        {/* ===== DESKTOP MENU ===== */}
                                        <div className="desktop-menu">
                                            {Navigations}
                                        </div>
                                    </ul>
                                </div>
                            </aside>
                            <div className={"col-lg-9 col-md-8"}>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </section>
            </MainDiv>
        </>
    )
}

// Get title from current Chunk
let title;
export function getTitle (name) {
    title = name
}