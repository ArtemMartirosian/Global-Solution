import React, {useState, useEffect} from "react";
import {Row, Col} from 'antd';
import {useTranslation} from "react-i18next";

import {LettersClient, Seo} from "../../../api";

/*----Styles----*/
import {SectionBottom} from "./style";


/*----Components---*/
import HeaderPages from "../../../components/Header-Pages/HeaderPages";
import {ArrowRight} from "../../../assets/icons";
import Documents from "../../../components/Documents/Documents";
import {Link, useLocation} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {urlCleaner} from "../../../utils/url-cleaner";
import MetaPixel, {renderMetaPixel} from "../../../utils/meta-pixels";

export default function Networking(props) {
    const {locale} = props
    const {t} = useTranslation()
    const [documents, setDocuments] = useState([])
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
        LettersClient.getAll()
            .then(result => {
                if (result.data.content.length && result.data.content[0].id) {
                    setDocuments(result.data.content)
                }
            })

       
    }, [])
    return (
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/networking', locale, 'title')}/>
                <meta property="og:description" content={renderMeta('/networking', locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta('/networking', locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta('/networking', locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta('/networking', locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta('/networking', locale, 'og:image')}/>
                {renderMetaPixel()}
            </Helmet>
            <HeaderPages {...{title: t('Main.title8')}}/>
            <Documents documents={documents} locale={locale} type='letters'/>

            <SectionBottom>
                <div className="container">
                    <Row gutter={12}>
                        <Col lg={12} span={24}>
                            <div className='wrap-block'>
                                <div className='text-block'>
                                    <h4>{t('Main.text10')}</h4>
                                    <p>{t('Main.text11')}</p>
                                </div>
                                <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}experience`}><ArrowRight/></Link>
                            </div>
                        </Col>
                        <Col lg={12} span={24}>
                            <div className='wrap-block'>
                                <div className='text-block'>
                                    <h4>{t('Main.text14')}</h4>
                                    <p>{t('Main.text15')}</p>
                                </div>
                                <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}certificate`}><ArrowRight/></Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </SectionBottom>
        </>
    )
}
