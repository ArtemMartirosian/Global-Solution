import React, {useEffect, useState} from "react";
import {Col, Row} from 'antd';
import {Link, useLocation} from "react-router-dom";
import {ArrowRight} from "../../../assets/icons";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";


import {ExperienceApiClient, image_download, Seo} from "../../../api";

/*----Components---*/
import HeaderPages from "../../../components/Header-Pages/HeaderPages";

/*---Styles---*/
import {SectionBottom, SectionExperience} from "./style";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../index";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";


export default function Experience(props){
    const {locale} = props
    const {t} = useTranslation()
    const [experienceArr, setExperience] = useState([])
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)

    useEffect(()=>{
        logEvent(analytics, 'global_experience_page_visited');
        Seo.getAll()
            .then((response) => {
                if (response) {
                    const foundResponse = response.find((item) => `/${item.url}` === urlCleaner(location.pathname))
                    if (foundResponse) {
                        setSeoData(foundResponse)
                    }
                }
            })
        ExperienceApiClient.getAll()
            .then(result=>{
                if(result.data.content.length && result.data.content[0].id){
                    setExperience(result.data.content)
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
                <meta property="og:title" content={renderMeta('/experience', locale, 'title')} />
                <meta property="og:description" content={renderMeta('/experience', locale, 'og:description')} />
                <meta property="og:url" content={renderMeta('/experience', locale, 'og:url')} />
                <meta property="og:type" content={renderMeta('/experience', locale, 'og:type')} />
                <meta property="og:site_name" content={renderMeta('/experience', locale, 'og:site_name')} />
                <meta property="og:image" content={renderMeta('/experience', locale, 'og:image')} />
                {renderMetaPixel()}
            </Helmet>
            <HeaderPages {...{title: t('Main.title9')}}/>
            <SectionExperience className='container'>
                <Row>
                    {experienceArr.map((item, index)=>{
                        return(
                            <Col span={24} key={index}>
                                <Row className='items-list'>
                                    <Col lg={12} className='block-left-text'>
                                        <div className='description-app'>
                                            <h5>{item.name[locale]?item.name[locale]:''}</h5>
                                            <div className="content" dangerouslySetInnerHTML={{__html: item.description[locale]?item.description[locale]:''}} />
                                        </div>
                                        {item.id === 17||item.id === 19||item.id===23||item.id === 18||item.id === 20||item.id===21?'':(
                                            <Row className='block-teg-list'>
                                                {
                                                    (item.tags||[]).map((tagItem, indexTag)=>{
                                                        return(
                                                            <a href={tagItem.link?tagItem.link:''} key={indexTag} className='btn btn-primary' target='_blank' rel='nofollow'>{tagItem.tag&&tagItem.tag.name[locale]?tagItem.tag.name[locale]:''}</a>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        )}
                                    </Col>
                                    <Col lg={12} className='block-right-image' itemScope itemType="http://schema.org/ImageObject">
                                        <img itemProp='contentUrl' src={`${item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''}`} alt={item.name[locale]?item.name[locale]:''}/>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                </Row>
            </SectionExperience>
            <SectionBottom>
                <div className="container">
                    <Row gutter={12}>
                        <Col lg={12} span={24}>
                            <div className='wrap-block'>
                                <div className='text-block'>
                                    <h4>{t('Main.text12')}</h4>
                                    <p>{t('Main.text13')}</p>
                                </div>
                                <Link to={`${locale==='ru'?'/':`/${locale}/`}networking`}><ArrowRight /></Link>
                            </div>
                        </Col>
                        <Col lg={12} span={24}>
                            <div className='wrap-block'>
                                <div className='text-block'>
                                    <h4>{t('Main.text14')}</h4>
                                    <p>{t('Main.text15')}</p>
                                </div>
                                <Link to={`${locale==='ru'?'/':`/${locale}/`}certificate`}><ArrowRight /></Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </SectionBottom>
        </>
    )
}
