import React, {useEffect, useState} from 'react'
import 'react-fancybox/lib/fancybox.css'
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import {ADMIN_PANEL_PAY, LicensesClient, Seo} from "../../../api";

import Documents from "../../../components/Documents/Documents";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {useLocation} from "react-router-dom";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";


export default function GlobalPayCertificate(props) {
    const {locale, contacts} = props
    const [documents, setDocuments] = useState([])
    const {t} = useTranslation()
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
        LicensesClient.getAll({type: ADMIN_PANEL_PAY})
            .then(result => {
                if (result.data.content.length && result.data.content[0].id) {
                    setDocuments(result.data.content)
                }
            })
        const head = document.querySelector('.robot')
        if(head) {head.remove()}
    }, [])

    return (
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/global-pay/certificate', locale, 'title')}/>
                <meta property="og:description"
                      content={renderMeta('/global-pay/certificate', locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta('/global-pay/certificate', locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta('/global-pay/certificate', locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta('/global-pay/certificate', locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta('/global-pay/certificate', locale, 'og:image')}/>
                {renderMetaPixel()}
            </Helmet>
            <section className={'section-content padding-y'} style={{minHeight: '100vh'}}>
                <div className={'container'}>
                    <Documents documents={documents} locale={locale}/>
                </div>
            </section>
        </>

    )
}
