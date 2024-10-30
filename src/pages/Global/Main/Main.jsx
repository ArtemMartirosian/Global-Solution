import React, {useEffect, useState} from 'react'
import Typed from 'react-typed';
import 'react-typed/dist/animatedCursor.css';
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Col, Row} from 'antd';
import defaultImage from '../../../assets/defaultImage.svg'
import {renderDate, renderMeta} from '../../../assets/scripts'
import meta from '../../../vr_db/meta.json'
import {CategoriesClient, image_download, NetworkLogoClient, NewsClient, Seo, TeamClient} from "../../../api";

/*----Components---*/
import {SectionBanners, SectionBlog, SectionNetworking, TopBanner} from "./style";

/*---Icons---*/
import {ArrowRight} from "../../../assets/icons";
import {Helmet} from "react-helmet-async";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../index";
import {renderMetaPixel} from "../../../utils/meta-pixels";


export default function Main(props) {
    const {t} = useTranslation()
    const {locale} = props
    const navigate = useNavigate()
    const [seoData, setSeoData] = useState(undefined)
    const [category, setCategories] = useState([])
    const [clientsArr, setClients] = useState([])
    const [clientsFilter, setClientsFilter] = useState([])
    const [tabClients, setTabClients] = useState('')
    const [newsData, setNewsData] = useState([])
    const [team, setTeam] = useState([])
    const [currentBlog, setCurrentBlog] = useState(null)
    const [hoverBlog, setHoverBlog] = useState(null)
    const [title, setTitle] = useState(seoData ? seoData.header[`${locale}`] : '')


    useEffect(() => {
        logEvent(analytics, 'manin_page_visited');
    }, [])


    useEffect(() => {
        Seo.getAll()
            .then((response) => {
                if (response) {
                    const foundResponse = response.find((item) => item.url === 'index')
                    if (foundResponse) {
                        setSeoData(foundResponse)
                    }
                }
            })
        NetworkLogoClient.getAll()
            .then(result => {
                if (result.data.content.length && result.data.content[0].id) {
                    setClients(result.data.content)
                }
            })
        CategoriesClient.getAll()
            .then(result => {
                if (result.data.content.length && result.data.content[0].id) {
                    setCategories(result.data.content)
                }
            })

        TeamClient.getAll()
            .then(result => {
                if (result.data.content.length && result.data.content[0].id) {
                    setTeam(result.data.content)
                }
            })

        NewsClient.getAll({size: 15})
            .then(result => {
                if (result.data.content) {
                    const data = result.data.content.filter(item => item.active)
                    setNewsData(data)
                    setCurrentBlog(data.length ? data[0] : null)
                }
            })


    }, [])

    useEffect(() => {
        if (tabClients !== '') {
            let clientsSelect = clientsArr.filter(item => item.category.id === tabClients)

            setClientsFilter(clientsSelect.length ? clientsSelect : [])
        } else {
            setClientsFilter(clientsArr)
        }

    }, [tabClients, clientsArr])




    return (
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta property="og:title" content={renderMeta('/', locale, 'title')}/>
                <meta property="og:description" content={renderMeta('/', locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta('/', locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta('/', locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta('/', locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta('/', locale, 'og:image')}/>
                {renderMetaPixel()}

            </Helmet>
            <TopBanner className="section-intro-company padding-y-lg">
                <video className="bg-video" autoPlay={true} loop={true} muted={true} playsInline={true}>
                    <source src="/images/videobg.mp4" type="video/mp4"/>
                </video>
                <div className="container">
                    <Col lg={13} className='title-animation'>
                        <h1>{t('Main.title1')}</h1><br/>
                        <Typed
                            strings={[
                                t('Main.text1'),
                                t('Main.text2'),
                                t('Main.text3')]}
                            typeSpeed={40}
                            backSpeed={50}
                            showCursor={true}
                            cursorChar="|"
                            loop/>

                        <p>{t('Main.text4')}</p>
                    </Col>
                </div>
                <SectionBanners>
                    <div className='container'>
                        <Row gutter={24} className="position-relative" style={{zIndex: '11'}}>
                            <Col lg={12} className='banners-left'>
                                <div>
                                    <h2>{t('Main.title2')}</h2>
                                    <p>{t('Main.text5')}</p>
                                    <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}experience`}
                                          className='btn btn-outline-light'>{t('Main.text6')}</Link>
                                </div>
                            </Col>
                            <Col lg={12} className='banners-right'>
                                <Row>
                                    <Col lg={24}>
                                        <div className='wrap-banners'>
                                            <h4>{t('Main.title3')}</h4>
                                            <p>{t('Main.text7')}</p>
                                            <Link
                                                to={`${locale === 'ru' ? '/' : `/${locale}/`}networking`}><ArrowRight/></Link>
                                        </div>
                                    </Col>
                                    <Col lg={24}>
                                        <div className='wrap-banners'>
                                            <h4>{t('Main.title4')}</h4>
                                            <p>{t('Main.text8')}</p>
                                            <Link
                                                to={`${locale === 'ru' ? '/' : `/${locale}/`}certificate`}><ArrowRight/></Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </SectionBanners>
            </TopBanner>


            <SectionNetworking>
                <Row>
                    <Col className='aside-navbar' lg={8} md={8} sm={24} span={24}>
                        <div>
                            <h2>{t('Main.title5')}</h2>
                            <p className={tabClients === '' ? 'active' : ''} onClick={() => setTabClients('')}>
                                {t('allCategories')}</p>
                            {
                                category.map((item, index) => {
                                    return (
                                        <p className={tabClients === item.id ? 'active' : ''} key={index}
                                           onClick={() => setTabClients(item.id)}>{item.name[locale]}</p>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col lg={16} md={16} sm={24} span={24} className='wrap-clients'>
                        <Row gutter={[24, 24]}>

                            {
                                clientsFilter.map((item, index) => {
                                    if (tabClients === '') {
                                        if (index < 12) {
                                            return (
                                                <Col lg={6} md={6} sm={8} span={12} key={index}>
                                                    <div itemScope itemType="http://schema.org/ImageObject">
                                                        <img
                                                            src={item.fileId ? `${image_download}?fileKey=${item.fileId.url}` : ''}
                                                            alt={item.name[locale]}
                                                            itemProp='contentUrl'
                                                        />
                                                    </div>
                                                </Col>
                                            )
                                        }
                                    } else {
                                        return (
                                            <Col lg={6} md={6} sm={8} span={12} key={index}>
                                                <div itemScope itemType="http://schema.org/ImageObject">
                                                    <img
                                                        src={item.fileId ? `${image_download}?fileKey=${item.fileId.url}` : ''}
                                                        alt={item.name[locale]}
                                                        itemProp='contentUrl'
                                                    />
                                                </div>
                                            </Col>
                                        )
                                    }
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </SectionNetworking>

            <SectionBlog className='container'>
                <div className="top-title_blog">
                    <h1>{t('Blog link')}</h1>
                    <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}blog`}>
                        {t('allView')}
                        <ArrowRight/>
                    </Link>
                </div>
                <div className="main-blog_wrap">
                    <Row>
                        <Col lg={12} md={18} sm={15} span={24} className="wrap-menu">
                            <Row>
                                <Col lg={10} span={12} className="blog-menu">
                                    <div
                                        className={`blog-menu-1 blog-menu-image ${newsData[0] && newsData[0].id === currentBlog?.id ? 'active' : ''}`}
                                        onClick={() => {
                                            navigate(`${locale === 'ru' ? '/' : `/${locale}/`}blog/${newsData[0].id}`)

                                        }} onMouseOver={() => {
                                        if (newsData[0]) setCurrentBlog(newsData[0])
                                        if (newsData[0]) setHoverBlog(newsData[0])

                                    }} onMouseOut={() => setHoverBlog(null)}>
                                        <div itemScope itemType="http://schema.org/ImageObject"
                                             className={newsData[0] && newsData[0].photos ? '' : 'blog-default-img'}>
                                            <img itemProp='contentUrl'
                                                 src={`${newsData[0] && newsData[0].photos ? `${image_download}?fileKey=${newsData[0].photos[0]?.url}` : defaultImage}`}
                                                 alt=""/>
                                        </div>
                                        <div className="blog-image-bg"/>
                                    </div>
                                    <div
                                        className={`blog-menu-2 blog-menu-image ${newsData[1] && newsData[1].id === currentBlog?.id ? 'active' : ''}`}
                                        onClick={() => {
                                            navigate(`${locale === 'ru' ? '/' : `/${locale}/`}blog/${newsData[1].id}`)
                                        }} onMouseOver={() => {
                                        if (newsData[1]) setCurrentBlog(newsData[1])
                                        if (newsData[1]) setHoverBlog(newsData[1])

                                    }} onMouseOut={() => setHoverBlog(null)}>
                                        <div itemScope itemType="http://schema.org/ImageObject"
                                             className={newsData[1] && newsData[1].photos ? '' : 'blog-default-img'}>
                                            <img itemProp='contentUrl'
                                                 src={`${newsData[1] && newsData[1].photos ? `${image_download}?fileKey=${newsData[1].photos[0]?.url}` : defaultImage}`}
                                                 alt=""/>
                                        </div>
                                        <div className="blog-image-bg"/>
                                    </div>

                                </Col>
                                <Col lg={14} span={12} className="blog-menu">
                                    <div
                                        className={`blog-menu-3 blog-menu-image ${newsData[2] && newsData[2].id === currentBlog?.id ? 'active' : ''}`}
                                        onClick={() => {
                                            navigate(`${locale === 'ru' ? '/' : `/${locale}/`}blog/${newsData[2].id}`)
                                        }} onMouseOver={() => {
                                        if (newsData[2]) setCurrentBlog(newsData[2])
                                        if (newsData[2]) setHoverBlog(newsData[2])

                                    }} onMouseOut={() => setHoverBlog(null)}>
                                        <div itemScope itemType="http://schema.org/ImageObject"
                                             className={newsData[2] && newsData[2].photos ? '' : 'blog-default-img'}>
                                            <img itemProp='contentUrl'
                                                 src={`${newsData[2] && newsData[2].photos ? `${image_download}?fileKey=${newsData[2].photos[0]?.url}` : defaultImage}`}
                                                 alt=""/>
                                        </div>
                                        <div className="blog-image-bg"/>
                                    </div>

                                    <div
                                        className={`blog-menu-4 blog-menu-image ${newsData[3] && newsData[3].id === currentBlog?.id ? 'active' : ''}`}
                                        onClick={() => {
                                            navigate(`${locale === 'ru' ? '/' : `/${locale}/`}blog/${newsData[3].id}`)
                                        }} onMouseOver={() => {
                                        if (newsData[3]) setCurrentBlog(newsData[3])
                                        if (newsData[3]) setHoverBlog(newsData[3])

                                    }} onMouseOut={() => setHoverBlog(null)}>
                                        <div itemScope itemType="http://schema.org/ImageObject"
                                             className={newsData[3] && newsData[3].photos ? '' : 'blog-default-img'}>
                                            <img itemProp='contentUrl'
                                                 src={`${newsData[3] && newsData[3].photos ? `${image_download}?fileKey=${newsData[3].photos[0]?.url}` : defaultImage}`}
                                                 alt=""/>
                                        </div>
                                        <div className="blog-image-bg"/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12} md={18} sm={14} span={24} className="blog-info">

                            {hoverBlog ? (<>
                                <p className="main-blog_time">{renderDate(hoverBlog.createdDate,locale)}</p>
                                <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}blog/${hoverBlog.id}`}><p
                                    className="main-blog_title">{hoverBlog.title ? hoverBlog.title[locale] : ''}</p>
                                    <p className="main-blog_desc">{hoverBlog.shortDescription ? hoverBlog.shortDescription[locale] : ''}</p>
                                </Link>
                            </>) : (currentBlog ? (<>
                                <p className="main-blog_time">{renderDate(currentBlog.createdDate,locale)}</p>
                                <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}blog/${currentBlog.id}`}>
                                    <p className="main-blog_title">{currentBlog.title ? currentBlog.title[locale] : ''}</p>
                                    <p className="main-blog_desc">{currentBlog.shortDescription ? currentBlog.shortDescription[locale] : ''}</p>
                                </Link>
                            </>) : '')}

                        </Col>
                    </Row>
                </div>
            </SectionBlog>

            {/*<SectionTeam className='container'>*/}
            {/*    <div className='block-header'>*/}
            {/*        <Particles  id="tsparticles" options={particles_options}/>*/}
            {/*        <div className='title-block'>*/}
            {/*            <h2>{t('Main.title6')}</h2>*/}
            {/*            <a href="https://tashkent.hh.uz/employer/1933280" target="_blank" rel="noreferrer">+ Join us</a>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <Row className='block-team-list' gutter={[12,12]}>*/}
            {/*        {*/}
            {/*            team.map((item, index)=>{*/}
            {/*                if(index<11){*/}
            {/*                    return (*/}
            {/*                        <Col lg={4} md={8} sm={8} span={12} key={index}>*/}
            {/*                            <div className='wrap-card-team' style={{backgroundImage: `url(${item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''})`}}>*/}
            {/*                                <div className='text-card-team'>*/}
            {/*                                    <h6>{item.name[locale]?item.name[locale]:''}</h6>*/}
            {/*                                    <p>{item.position[locale]?item.position[locale]:''}</p>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </Col>*/}
            {/*                    )*/}
            {/*                }*/}
            {/*            })*/}
            {/*        }*/}
            {/*        <Col lg={4} md={8} sm={8} span={12}  className='more-employee'>*/}
            {/*            <div className='wrap-card-team'>*/}
            {/*                <div className="text-card-team">*/}
            {/*                    <h6 className='text-center'>+35</h6>*/}
            {/*                    <p className='text-center'>{t('Main.text9')}</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</SectionTeam>*/}
        </>
    )
}
