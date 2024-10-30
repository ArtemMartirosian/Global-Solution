import {Col, Modal, Row} from "antd";
import React, {useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {renderMeta} from "../../../assets/scripts";

import "@fancyapps/ui/dist/fancybox.css";
import meta from "../../../vr_db/meta.json";
import {Helmet} from "react-helmet-async";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";

//Components
import {VideoComponent} from "./components/VideoComponent";
import {Tags} from "./components/Tags";
import {NewsComponent} from "./components/NewsComponent";
import {PhotoComponent} from "./components/PhotoComponent";
import {BannerComponent} from "./components/BannerComponent";


//Api
import {Seo} from "../../../api";


//Styles
import {InputSearch, NewItem, TabsButton} from "./style";


export default function BlogList(props) {
    const {locale} = props
    const videoRef = useRef()
    const [tabKey, setTabKey] = useState('news')
    const [filter, setFilter] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState('')
    const [onSearch, setOnSearch] = useState(null)
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)
    const {t} = useTranslation()
    const [rightBanner, setRightBanner] = useState(0)
    const [valueSearch, setValueSearch] = useState('')




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
        if (document !== undefined) {
            const onScroll = () => {
                setRightBanner(window.pageYOffset)
            }
            window.addEventListener('scroll', onScroll)
            return () => {
                window.removeEventListener('scroll', onScroll)
            }
        }
    }, [])
    




    useEffect(() => {
        if (videoRef.current) {
            if (document.querySelector('video')) {
                if (isModalVisible) document.querySelector('video').play()
                else document.querySelector('video').pause()
            }
        }
    }, [isModalVisible])

    useEffect(()=>{
       const debounce = setTimeout(()=>setValueSearch(onSearch), 2000)

        return () =>clearTimeout(debounce)
    }, [onSearch])

    function onTabChange(val) {
        setTabKey(val)
        setFilter([])
    }

    function handlerSearch(value) {
        setOnSearch(value)
    }





    // function renderButtonLoader() {
    //     // if (tabKey === 'news' && filter.length && hasNextPage && onSearch) {
    //     //     if (filter.length && Array.isArray(dataNews) && dataNews.length) {
    //     //         return (
    //     //             <ButtonLoadMore className='button-load-more' onClick={() => {
    //     //
    //     //                 fetchNextPageSrch()
    //     //             }}>{t('read more')}</ButtonLoadMore>
    //     //         )
    //     //     }
    //     // } else if (tabKey === 'video' && filter.length && hasNextPageVideo) {
    //     //     if (filter.length && videoData.length) {
    //     //         return (
    //     //             <ButtonLoadMore className='button-load-more' onClick={() => {
    //     //
    //     //                 fetchNextPageVideo()
    //     //             }}>{t('read more')}</ButtonLoadMore>
    //     //         )
    //     //     }
    //     // } else if (tabKey === 'gallery' && hasNextPagePhotos) {
    //     //     return (
    //     //         <ButtonLoadMore className='button-load-more' onClick={() => {
    //     //
    //     //             fetchNextPagePhotos()
    //     //         }}>{t('read more')}</ButtonLoadMore>
    //     //     )
    //     // }
    //
    //
    //     if (tabKey === 'news' && filter.length  && onSearch) {
    //         if (filter.length) {
    //             return (
    //                 <ButtonLoadMore className='button-load-more' onClick={() => {
    //
    //                     fetchNextPageSrch()
    //                 }}>{t('read more')}</ButtonLoadMore>
    //             )
    //         }
    //     } else if (tabKey === 'video' && filter.length) {
    //         // if (filter.length && videoData.length) {
    //         //     return (
    //         //         <ButtonLoadMore className='button-load-more' onClick={() => {
    //         //
    //         //             fetchNextPageVideo()
    //         //         }}>{t('read more')}</ButtonLoadMore>
    //         //     )
    //         // }
    //     } else if (tabKey === 'gallery' && hasNextPagePhotos) {
    //         return (
    //             <ButtonLoadMore className='button-load-more' onClick={() => {
    //
    //                 fetchNextPagePhotos()
    //             }}>{t('read more')}</ButtonLoadMore>
    //         )
    //     }
    // }



    return (
        <>

            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/blog', locale, 'title')}/>
                <meta property="og:description" content={renderMeta('/blog', locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta('/blog', locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta('/blog', locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta('/blog', locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta('/blog', locale, 'og:image')}/>
                {renderMetaPixel()}
            </Helmet>
            <div className="container mb-5" style={{minHeight: '62vh'}}>
                <Modal width="70%" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                    <ReactPlayer url={videoPlaying} controls={true} width="100%" height="500px" playing={isModalVisible}
                                 ref={videoRef}/>
                </Modal>
                <InputSearch className={`mt-2 ${onSearch ? 'focus-input' : ''}`}>
                    <button>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.6667 0.666626C19.2907 0.666626 24.6667 6.04263 24.6667 12.6666C24.6667 19.2906 19.2907 24.6666 12.6667 24.6666C6.04266 24.6666 0.666656 19.2906 0.666656 12.6666C0.666656 6.04263 6.04266 0.666626 12.6667 0.666626ZM12.6667 22C17.8227 22 22 17.8226 22 12.6666C22 7.50929 17.8227 3.33329 12.6667 3.33329C7.50932 3.33329 3.33332 7.50929 3.33332 12.6666C3.33332 17.8226 7.50932 22 12.6667 22ZM23.98 22.0946L27.752 25.8653L25.8653 27.752L22.0947 23.98L23.98 22.0946Z"
                                fill="#141414"/>
                        </svg>
                    </button>
                    <input type="text" placeholder={t('search')} value={onSearch ?? ''}
                           onChange={(e) => handlerSearch(e.target.value)}/>
                    <button className={onSearch ? 'd-block' : 'd-none'} onClick={() => {
                        setOnSearch(null)
                        setTabKey('news')
                    }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.9998 27.3333C6.63584 27.3333 0.666504 21.364 0.666504 14C0.666504 6.63596 6.63584 0.666626 13.9998 0.666626C21.3638 0.666626 27.3332 6.63596 27.3332 14C27.3332 21.364 21.3638 27.3333 13.9998 27.3333ZM13.9998 24.6666C16.8288 24.6666 19.5419 23.5428 21.5423 21.5424C23.5427 19.542 24.6665 16.8289 24.6665 14C24.6665 11.171 23.5427 8.45788 21.5423 6.45749C19.5419 4.4571 16.8288 3.33329 13.9998 3.33329C11.1709 3.33329 8.45775 4.4571 6.45737 6.45749C4.45698 8.45788 3.33317 11.171 3.33317 14C3.33317 16.8289 4.45698 19.542 6.45737 21.5424C8.45775 23.5428 11.1709 24.6666 13.9998 24.6666ZM13.9998 12.1146L17.7705 8.34263L19.6572 10.2293L15.8852 14L19.6572 17.7706L17.7705 19.6573L13.9998 15.8853L10.2292 19.6573L8.3425 17.7706L12.1145 14L8.3425 10.2293L10.2292 8.34263L13.9998 12.1146Z"
                                fill="#03053D"/>
                        </svg>
                    </button>
                </InputSearch>

                {!onSearch ? <Tags filter={filter} setFilter={setFilter} locale={locale} /> : ''}

                {onSearch ? (<TabsButton defaultActiveKey={tabKey} onChange={onTabChange}>
                    <TabsButton.TabPane tab={t('news')} key="news">

                        <Tags filter={filter} setFilter={setFilter} locale={locale} />

                        <NewsComponent locale={locale} tabKey={tabKey} onSearch={valueSearch} filter={filter}  {...props}/>

                    </TabsButton.TabPane>

                    <TabsButton.TabPane tab={t('video')} key="video">
                        <Tags filter={filter} setFilter={setFilter} locale={locale} />
                        <Col lg={24}>
                            <VideoComponent filter={filter}
                                            tabKey={tabKey}
                                            onSearch={valueSearch}
                                            locale={locale}
                                            setIsModalVisible={setIsModalVisible}
                                            setVideoPlaying={setVideoPlaying}
                                            type='list' {...props}/>
                        </Col>
                    </TabsButton.TabPane>

                    <TabsButton.TabPane tab={t('gallery')} key="gallery">
                        <Tags filter={filter} setFilter={setFilter} locale={locale} />

                        <PhotoComponent filter={filter}
                                        locale={locale}
                                        onSearch={valueSearch}
                                        tabKey={tabKey}
                                        type='list' {...props}/>
                    </TabsButton.TabPane>

                </TabsButton>) : ''}


                {!onSearch ? (<BannerComponent locale={locale}/>) : ''}


                {
                    !onSearch ? (

                        <Row className="justify-content-between align-items-start mt-5">

                            <NewsComponent locale={locale} tabKey={tabKey} onSearch={onSearch} filter={filter} {...props}/>

                            <Col lg={5} span={24}>
                                <VideoComponent filter={filter}
                                                tabKey={tabKey}
                                                onSearch={onSearch}
                                                locale={locale}
                                                setIsModalVisible={setIsModalVisible}
                                                setVideoPlaying={setVideoPlaying}
                                                type='side' {...props}/>

                                <PhotoComponent filter={filter}
                                                locale={locale}
                                                tabKey={tabKey}
                                                onSearch
                                                type='side' {...props}/>

                                <NewItem isShow={rightBanner >= 2015}>
                                    <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay/telegram-pay`}>
                                        <img loading={'lazy'} src="/images/banners/new-block.jpg" alt=""/>
                                    </Link>
                                </NewItem>
                            </Col>
                        </Row>) : ''
                }


            </div>

        </>

    )

}







