import {image_download, NewsClient} from "../../../../api";
import {Link} from "react-router-dom";
import {renderDate} from "../../../../assets/scripts";
import {SliderBlog} from "../style";
import React from "react";
import {useQuery} from "react-query";
import {useTranslation} from "react-i18next";


export function BannerComponent(props){

    const {locale} = props
    const {t} = useTranslation()


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => {
            return (
                <div className="dotsSlider">
                    <ul>{dots}</ul>
                </div>
            )
        }
    };


    const {data} = useQuery(
        ['newstop'],
        () => NewsClient.top()
    );


    const newsTopArr = data?.data?.content || []



    return (
        <SliderBlog {...settings} className="mt-5">
            {newsTopArr.map((item, index) => {

                if (index < 4) {
                    return (
                        <div className="slider-item position-relative" key={item.id}>
                            <div className='slider-wrap-image position-absolute' itemScope
                                 itemType="http://schema.org/ImageObject">
                                <img itemProp='contentUrl'
                                     src={item?.bannerPhoto ? `${image_download}?fileKey=${item?.bannerPhoto?.url}` : ''}
                                     alt=""/>
                            </div>
                            <div className="slider-item-info">
                                <div className="info-title">{item.title ? item.title[locale] : ''}</div>
                                <div
                                    className="info-desc">{item.shortDescription ? item.shortDescription[locale] : ''}</div>
                                <Link
                                    to={`${locale === 'ru' ? '/' : `/${locale}/`}blog/${item.id}`}>{t('read btn')}</Link>
                            </div>
                            <div className="slider-item-author">
                                <div itemScope itemType="http://schema.org/ImageObject"
                                     className="author-image">{(item?.authors || []).map((item, index) => {
                                    return (
                                        <div itemProp='contentUrl' className="author-img" key={item.id}><img
                                            src={item.photo ? `${image_download}?fileKey=${item?.photo.url}` : ''}
                                            alt=""/></div>
                                    )
                                })}
                                </div>
                                <div className="author-info">
                                    <div className="info-block">
                                        <div
                                            className="block-name">{(item?.authors || []).map((item, index, arr) => {
                                            if (index < 1) {
                                                return (
                                                    <p key={item.id}>{item.firstname ? item.firstname[locale] : ''} {item.lastname ? item.lastname[locale] : ''} {item.position ? `${item.position[locale]}` : ''} </p>
                                                )
                                            }
                                        })}</div>

                                    </div>
                                    <div className="info-created">{renderDate(item.publishedDate, locale)}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </SliderBlog>
    )
}