import {Col} from "antd";
import {image_download, VideoClient} from "../../../../api";
import defaultImage from "../../../../assets/defaultImage.svg";
import {Link} from "react-router-dom";
import {reduceArray, renderDate} from "../../../../assets/scripts";
import NotContent from "../../../../components/NotContent/NotContent";
import {VideoBlock} from "../../Video/style";
import {useTranslation} from "react-i18next";
import {useInfiniteQuery} from "react-query";
import {ButtonLoadMore, VideoItem} from "../style";
import Loader from "../../../../components/Loader/Loader";



export function VideoComponent(props){

    const {locale, filter, tabKey, onSearch, setIsModalVisible, setVideoPlaying, type} = props
    const {t} = useTranslation()

    const dataResponse = useInfiniteQuery(
        ['video', {filter, tabKey, onSearch}],
        ({pageParam = 0}) => {
            if (filter.length && onSearch) return getVideosAll(filter, pageParam)
            return getVideosAll(null, pageParam)
        },
        {
            getNextPageParam: ({data}) => {
                let nextP = data.number + 1
                return data.last ? undefined : nextP
            },
            enabled: tabKey === 'video' || !onSearch
        }
    )


    const videoData = dataResponse.data?.pages.length ? reduceArray(dataResponse.data) : []




    async function getVideosAll(filter = null, nextPage = 0) {

        var data = {}

        if (filter) {
            data = await VideoClient.filtered(filter, {page: nextPage})
        } else {
            if (onSearch) {
                data = await VideoClient.search({page: nextPage, keyword: onSearch})
            } else {
                data = await VideoClient.getAll({page: nextPage})
            }
        }


        return data
    }


    if(type==='list'){
        return (
            <VideoBlock gutter={[24, 24]}>
                {videoData.length ? (<>{(videoData).map((item) => {
                    return (
                        <VideoItemComponent item={item} locale={locale}/>
                    )

                })}</>) : <NotContent {...props}/>}
                {/*{renderButtonLoader()}*/}
                {dataResponse.isFetching && !onSearch ? <div className='d-flex justify-content-center'><Loader/></div> : ''}
            </VideoBlock>

        )
    }



    return(
        <VideoItem>
            <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}video`}
                  className="video-title">
                <h2>{t('blog video')}</h2>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M11 0.333313L9.12004 2.21331L16.56 9.66665H0.333374V12.3333H16.56L9.12004 19.7866L11 21.6666L21.6667 11L11 0.333313Z"
                          fill="#1D1D1D"/>
                </svg>
            </Link>
            <div className="video-list">
                {(videoData||[]).map((item, index) => {
                    if (index <= 2) {
                        return (<div className="video-main" key={item.id}>
                            <div
                                className={item.photos && item.photos.length ? 'video-set' : 'default-photo video-set'}>
                                <div itemScope itemType="http://schema.org/ImageObject"
                                     className="video-img">
                                    <img itemProp='contentUrl'
                                         src={item.photos && item.photos.length ? `${image_download}?fileKey=${item.photos[0].url}` : defaultImage}
                                         alt=""/>
                                </div>
                                <div className="video-param">
                                    <p>{item?.time}</p>
                                    <button onClick={() => {
                                        setIsModalVisible(true)
                                        setVideoPlaying(item.file && item.file.url ? `${image_download}?fileKey=${item.file.url}` : '')
                                    }}>
                                        <svg width="9" height="12" viewBox="0 0 9 12"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.91701 6.27819L0.851008 10.9889C0.800812 11.0223 0.742495 11.0414 0.682269 11.0443C0.622043 11.0472 0.562163 11.0337 0.509007 11.0052C0.455851 10.9768 0.41141 10.9344 0.380417 10.8827C0.349424 10.831 0.333039 10.7718 0.333008 10.7115V1.29019C0.333039 1.2299 0.349424 1.17074 0.380417 1.11902C0.41141 1.0673 0.455851 1.02496 0.509007 0.996499C0.562163 0.96804 0.622043 0.954531 0.682269 0.957412C0.742495 0.960293 0.800812 0.979456 0.851008 1.01286L7.91701 5.72353C7.96266 5.75397 8.00009 5.79521 8.02598 5.84359C8.05187 5.89197 8.06542 5.94599 8.06542 6.00086C8.06542 6.05573 8.05187 6.10975 8.02598 6.15813C8.00009 6.20651 7.96266 6.24775 7.91701 6.27819Z"
                                                fill="white"/>
                                        </svg>
                                        {t('blog view')}
                                    </button>
                                </div>
                            </div>
                            <Link
                                to={`${locale === 'ru' ? '/' : `/${locale}/`}video/${item.id}`}
                                className="video-desc">
                                <div>{item.name ? item.name[locale] : ''}</div>
                            </Link>
                        </div>)
                    }
                })}
            </div>
        </VideoItem>
    )




}


function VideoItemComponent({item, locale}){
    return(
        <Col lg={8} span={12} className="videoList-item" key={item.id}>
            <div className="item-media">
                <div itemScope itemType="http://schema.org/ImageObject"
                     className={item?.photos && item?.photos.length ? "item-media-video" : "blog-default-image"}
                     style={{backgroundColor: "grey"}}>
                    <img itemProp='contentUrl'
                         src={item?.photos && item.photos.length ? `${image_download}?fileKey=${item.photos[0].url}` : defaultImage}
                         alt=""/>
                </div>
                <div className="item-media-time">12:03</div>
            </div>
            <div className="item-media-info">
                <Link
                    to={`${locale === 'ru' ? '/' : `/${locale}/`}video/${item.id}`}>{item.name ? item.name[locale] : ''}</Link>
                <div className="info-author">
                    <div className="author-image">
                        <div itemScope itemType="http://schema.org/ImageObject">
                            <img itemProp='contentUrl'
                                 src={item.author && item.author.photo ? `${image_download}?fileKey=${item.author.photo.url}` : ''}
                                 alt=""/></div>
                    </div>
                    <div className="author-name">
                        <div
                            className="last-name">{item.author && item.author.lastname ? item.author.lastname[locale] : ''} {item.author && item.author.firstname ? item.author.firstname[locale] : ''}</div>
                    </div>
                </div>
                <div className="media-date">
                    <div
                        className="date-time">{renderDate(item.createdDate, locale)}</div>
                    <div className="date-circle">
                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.00016 3.66671C2.92064 3.66671 3.66683 2.92052 3.66683 2.00004C3.66683 1.07957 2.92064 0.333374 2.00016 0.333374C1.07969 0.333374 0.333496 1.07957 0.333496 2.00004C0.333496 2.92052 1.07969 3.66671 2.00016 3.66671Z"
                                fill="#141414"/>
                        </svg>
                    </div>
                    <div className="media-tags">
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
            </div>


        </Col>
    )
}