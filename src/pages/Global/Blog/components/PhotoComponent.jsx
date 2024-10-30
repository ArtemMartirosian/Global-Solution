import {PhotoBlock, PhotoItem} from "../style";
import {Fancybox} from "./FanceBox";
import {Col} from "antd";
import {image_download, PhotoClient} from "../../../../api";
import defaultImage from "../../../../assets/defaultImage.svg";
import {reduceArray, renderDate} from "../../../../assets/scripts";
import NotContent from "../../../../components/NotContent/NotContent";
import React, {useEffect} from "react";
import {useInfiniteQuery} from "react-query";
import {useTranslation} from "react-i18next";



export function PhotoComponent(props){

    const {filter, tabKey, locale, type, onSearch} = props
    const {t} = useTranslation()


    const {data, hasNextPage, isFetching, fetchNextPage} = useInfiniteQuery(
        ['photos', {filter, tabKey, onSearch}],
        ({pageParam = 0}) => {
            if (filter.length && tabKey === 'gallery') return getPhotosAll(filter, pageParam)
            return getPhotosAll(null, pageParam)
        },
        {
            getNextPageParam: ({data}) => {
                let nextP = data.number + 1
                return data.last ? undefined : nextP
            }
        })

    useEffect(() => {
        if (hasNextPage && !onSearch && !isFetching) {
            fetchNextPage()
        }
    }, [data])


    async function getPhotosAll(filter = null, nextPage = 0) {

        var data = {}

        if (filter) {
            data = await PhotoClient.filtered(filter, {page: nextPage, size: 15})
        } else {
            data = await PhotoClient.getAll({page: nextPage, size: 15})
        }



        return data
    }




    const dataPhotos = data?.pages.length ? reduceArray(data, false) : []
    const totalElements = data && data.pages.length ? data?.pages[0]?.data?.totalElements : 0


    if(type==='list'){
        return(
            <PhotoBlock gutter={[24, 24]}>
                <Fancybox options={{infinite: false}}>
                    {dataPhotos.length ? (<>{(dataPhotos || []).map((item, index) => {
                        return (
                            <Col lg={8} span={12} className="photoBlock-item" key={item?.file?.url}>
                                <div itemScope itemType="http://schema.org/ImageObject"
                                     className={item.file ? "item-photo" : "blog-default-image"}
                                     data-fancybox="gallery"
                                     data-src={item.file ? `${image_download}?fileKey=${item.file.url}` : ''}>
                                    <img itemProp='contentUrl'
                                         src={item.file ? `${image_download}?fileKey=${item.file.url}` : defaultImage}
                                         alt=""/>
                                </div>

                                <div className="item-info">
                                    <div className="info-date">{renderDate(item.createdDate, locale)}</div>
                                    <div className="info-circle">
                                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2.00016 3.66671C2.92064 3.66671 3.66683 2.92052 3.66683 2.00004C3.66683 1.07957 2.92064 0.333374 2.00016 0.333374C1.07969 0.333374 0.333496 1.07957 0.333496 2.00004C0.333496 2.92052 1.07969 3.66671 2.00016 3.66671Z"
                                                fill="#141414"/>
                                        </svg>
                                    </div>
                                    <div className="info-tags">
                                        {
                                            (item.categories || []).map((cat, index) => {
                                                if (index < 1) return <div className="tags-blog"
                                                                           key={item.id}>{cat.name ? cat.name[locale] : ''}</div>
                                            })
                                        }
                                        {item.categories && item.categories.length > 1 ? <div
                                            className="tags-yet">{`+${item.categories.length - 1}`}</div> : ''}
                                    </div>
                                </div>
                            </Col>
                        )
                    })}</>) : <NotContent {...props}/>}
                </Fancybox>
            </PhotoBlock>
        )
    }


    return (
        <PhotoItem>
            <h2>{t('blog photo')}</h2>
            <div className="photo-list">
                <Fancybox options={{infinite: false}}>
                    {dataPhotos.map((item) => item.file ? item.file.url : null).map((item, index, arr) => {
                        if (index <= 2) {
                            return <button
                                data-fancybox="gallery"
                                key={item}
                                data-src={item ? `${image_download}?fileKey=${item}` : defaultImage}
                                aria-label="{{MODAL}}">
                                <img
                                    src={item ? `${image_download}?fileKey=${item}` : defaultImage}
                                    alt=""/>
                            </button>
                        } else {
                            if (totalElements > 3) {
                                if (index === 3) {
                                    const imgMore = arr[3] ? arr[3] : defaultImage
                                    return (
                                        <button style={{position: "relative"}}
                                                data-fancybox="gallery"
                                                data-src={`${image_download}?fileKey=${imgMore}`}
                                                key={index}>
                                            <img style={{position: "absolute"}}
                                                 src={`${image_download}?fileKey=${imgMore}`}
                                                 alt=""/>
                                            <div
                                                className="photo-list__opacity">+{totalElements - 3}</div>
                                        </button>
                                    )
                                }

                                return (<button
                                    key={index}
                                    data-fancybox="gallery"
                                    data-src={item ? `${image_download}?fileKey=${item}` : defaultImage}
                                    className='d-none'>
                                </button>)
                            } else {
                                return (
                                    <button
                                        key={index}
                                        data-fancybox="gallery"
                                        data-src={item ? `${image_download}?fileKey=${item}` : defaultImage}
                                        className='d-none'>
                                    </button>
                                )
                            }

                        }
                    })}

                </Fancybox>
            </div>
        </PhotoItem>
    )




}