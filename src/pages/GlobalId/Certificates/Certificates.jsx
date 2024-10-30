import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
/*---Components---*/
import Documents from "../../../components/Documents/Documents";

import {ADMIN_PANEL_ID, LicensesClient, Seo} from "../../../api";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {useLocation} from "react-router-dom";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";


export default function GlobalIdCertificates(props){

    const {locale} = props
    const [documents, setDocuments] = useState([])
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)


    useEffect(()=>{
        Seo.getAll()
            .then((response) => {
                if (response) {
                    const foundResponse = response.find((item) => `/${item.url}` === urlCleaner(location.pathname))
                    if (foundResponse) {
                        setSeoData(foundResponse)
                    }
                }
            })
        LicensesClient.getAll({type: ADMIN_PANEL_ID})
            .then(result=>{
                if(result.data.content.length && result.data.content[0].id){
                    setDocuments(result.data.content)
                }
            })
        const head = document.querySelector('.robot')
        if(head) {head.remove()}
    }, [])
    return(
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/global-id/certificate', locale, 'title')} />
                <meta property="og:description" content={renderMeta('/global-id/certificate', locale, 'og:description')} />
                <meta property="og:url" content={renderMeta('/global-id/certificate', locale, 'og:url')} />
                <meta property="og:type" content={renderMeta('/global-id/certificate', locale, 'og:type')} />
                <meta property="og:site_name" content={renderMeta('/global-id/certificate', locale, 'og:site_name')} />
                <meta property="og:image" content={renderMeta('/global-id/certificate', locale, 'og:image')} />
                {renderMetaPixel()}
            </Helmet>
            <Documents documents={documents} locale={locale}/>
        </>
    )
}
