import {Col, Row} from "antd";
import React, {useState} from "react";
import {reduceArray, renderDate} from "../../../assets/scripts";
import defaultImage from "../../../assets/defaultImage.svg"
import Loader from "../../../components/Loader/Loader";
import {BreadCrumbs, VideoBlock} from "../Video/style/index"
import {useInfiniteQuery, useQuery} from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import NotContent from "../../../components/NotContent/NotContent";
import {useTranslation} from "react-i18next";


// API
import {image_download, NewsClient, VideoClient} from "../../../api/index"


//Style
import {Link} from "react-router-dom";
import {InputSearch, TagsLink} from "../Blog/style";


export default function VideoList(props) {
    const {locale} = props
    const [onSearch, setOnSearch] = useState(null)
    const [filter, setFilter] = useState([])
    const {t} = useTranslation()


     const videoResponse = useInfiniteQuery(
        ['video', {filter, onSearch}],
        ({pageParam = 0}) =>{
            if(filter.length) return getVideoAll(filter,pageParam)
            return getVideoAll(null,pageParam)
        },
        {
             getNextPageParam: ({data}) => {
                let nextP = data.number+1
                return data.last?undefined:nextP
            },
            enabled: !onSearch?true:false
        }
    );

    const searchResponse = useQuery(
        ['search', {onSearch}],
        ({pageParam = 0}) =>{
            return getVideoAll(null, pageParam)
        },
        {
            enabled: onSearch?true:false
        }
    );

    async function getVideoAll(filter,page){
        let data = {}
        if(filter){
            data =  await VideoClient.filtered(filter, {page})
       }else{
           if(onSearch){
               data =  await VideoClient.search({page, keyword: onSearch, size: 10})
           }else{
               data =  await VideoClient.getAll({page, size: 10})
           }
       }

        return data
    }

     const {data} =  useQuery(
        ['categories'],
        () => NewsClient.getCategories()
    );

    const isLoading = videoResponse.isLoading
    const error = videoResponse.error
    const videoArray = videoResponse.data
    const isFetching = videoResponse.isFetching
    const fetchNextPage = videoResponse.fetchNextPage
    const hasNextPage = videoResponse.hasNextPage

    const dataVideos = videoArray?.pages.length&&videoArray?.pages[0]?.data?.content?reduceArray(videoArray):[]
    const categories = data?.data?.content||[]
    const totalElemVideos = videoResponse?.data?.pages.length?videoResponse?.data?.pages[0]?.data?.totalElements:0
    const searchVideo = searchResponse?.data?.data||[]


    function handlerSearch(value){
        setOnSearch(value)
    }


    if(isLoading){
       return (
            <div style={{minHeight: '600px'}} className='d-flex justify-content-center flex-column align-items-center'>
                <h2>Loading...</h2>
                <Loader />
            </div>
        )
    }

    if(error){
        return <div style={{minHeight: '600px'}}><h2 className='text-center mt-5'>Что-то пошло не так</h2></div>
    }


    return(
        <div className="container">

            <InputSearch className={`mt-2 ${onSearch?'focus-input':''}`}>
                <button>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6667 0.666626C19.2907 0.666626 24.6667 6.04263 24.6667 12.6666C24.6667 19.2906 19.2907 24.6666 12.6667 24.6666C6.04266 24.6666 0.666656 19.2906 0.666656 12.6666C0.666656 6.04263 6.04266 0.666626 12.6667 0.666626ZM12.6667 22C17.8227 22 22 17.8226 22 12.6666C22 7.50929 17.8227 3.33329 12.6667 3.33329C7.50932 3.33329 3.33332 7.50929 3.33332 12.6666C3.33332 17.8226 7.50932 22 12.6667 22ZM23.98 22.0946L27.752 25.8653L25.8653 27.752L22.0947 23.98L23.98 22.0946Z" fill="#141414"/>
                    </svg>
                </button>
                <input type="text" placeholder={t('search')} value={onSearch??''} onChange={(e)=>handlerSearch(e.target.value)}/>
                <button className={onSearch?'d-block':'d-none'} onClick={()=>setOnSearch(null)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.9998 27.3333C6.63584 27.3333 0.666504 21.364 0.666504 14C0.666504 6.63596 6.63584 0.666626 13.9998 0.666626C21.3638 0.666626 27.3332 6.63596 27.3332 14C27.3332 21.364 21.3638 27.3333 13.9998 27.3333ZM13.9998 24.6666C16.8288 24.6666 19.5419 23.5428 21.5423 21.5424C23.5427 19.542 24.6665 16.8289 24.6665 14C24.6665 11.171 23.5427 8.45788 21.5423 6.45749C19.5419 4.4571 16.8288 3.33329 13.9998 3.33329C11.1709 3.33329 8.45775 4.4571 6.45737 6.45749C4.45698 8.45788 3.33317 11.171 3.33317 14C3.33317 16.8289 4.45698 19.542 6.45737 21.5424C8.45775 23.5428 11.1709 24.6666 13.9998 24.6666ZM13.9998 12.1146L17.7705 8.34263L19.6572 10.2293L15.8852 14L19.6572 17.7706L17.7705 19.6573L13.9998 15.8853L10.2292 19.6573L8.3425 17.7706L12.1145 14L8.3425 10.2293L10.2292 8.34263L13.9998 12.1146Z" fill="#03053D"/>
                    </svg>
                </button>
            </InputSearch>
            <Tags filter={filter} setFilter={setFilter} locale={locale} tags={categories}/>
            <BreadCrumbs>
                <Link to={locale === 'ru' ? '/' : `/${locale}`}>Global Solutions</Link>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.17177 4.99996L0.342773 2.17196L1.75677 0.756958L5.99977 4.99996L1.75677 9.24296L0.342773 7.82796L3.17177 4.99996Z" fill="#141414"/>
                </svg>
                <Link to={'#'}>{t("blog video")}</Link>
            </BreadCrumbs>

            {onSearch&&!filter.length?( <VideoBlock gutter={[24,24]}>
                {
                    searchVideo.length?(<>{(searchVideo||[]).map((item)=>{
                        return(
                            <Col lg={8} sm={12} span={24} className="videoList-item">
                                <div className="item-media">
                                    <Link to={locale === 'ru' ? `/video/${item.id}` :`/${locale}/video/${item.id}`}>
                                        <div className={`item-media-video ${item.photos&&item.photos.length?'':'default-video'}`}><img src={item.photos&&item.photos.length?`${image_download}?fileKey=${item.photos[0].url}`:defaultImage} alt=""/></div>
                                    </Link>
                                    <div className="item-media-time">{item?.time}</div>
                                </div>
                                <div className="item-media-info">
                                    <Link to={`/video/${item.id}`}>{item.name?item.name[locale]:''}</Link>
                                    <div className="info-author">
                                        <div className="author-image">
                                            {
                                                item.author?(<div><img src={item.author.photo?`${image_download}?fileKey=${item.author.photo.url}`:''} alt=""/></div>):''
                                            }
                                        </div>
                                        <div className="author-name">
                                            {
                                                item.author?(<div>{item.author.firstname?item.author.firstname[locale]:''} {item.author.lastname?item.author.lastname[locale]:''}</div>):''
                                            }
                                        </div>
                                    </div>
                                    <div className="media-date">
                                        <div className="date-time">{renderDate(item.publishedDate, locale)}</div>
                                        <div className="date-circle">
                                            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.00016 3.66671C2.92064 3.66671 3.66683 2.92052 3.66683 2.00004C3.66683 1.07957 2.92064 0.333374 2.00016 0.333374C1.07969 0.333374 0.333496 1.07957 0.333496 2.00004C0.333496 2.92052 1.07969 3.66671 2.00016 3.66671Z" fill="#141414"/>
                                            </svg>
                                        </div>
                                        <div className="media-tags">
                                            {
                                                (item?.categories||[]).map(item=>{
                                                    return(<span>{item.name?item.name[locale]:''}</span>)
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}</>):(<NotContent {...props}/>)
                }
                         </VideoBlock>):(<InfiniteScroll dataLength={totalElemVideos}
                                 hasMore={hasNextPage}
                                 loadMore={fetchNextPage}>
                    <VideoBlock gutter={[24,24]}>
                        {Array.isArray(dataVideos) && dataVideos.length?(<>{dataVideos.map((item)=>{
                            return(
                                <Col lg={8} sm={12} span={24} className="videoList-item">
                                    <div className="item-media">
                                        <Link to={locale === 'ru' ? `/video/${item.id}` :`/${locale}/video/${item.id}`}>
                                            <div className={`item-media-video ${item.photos&&item.photos.length?'':'default-video'}`}><img src={item.photos&&item.photos.length?`${image_download}?fileKey=${item.photos[0].url}`:defaultImage} alt=""/></div>
                                        </Link>
                                        <div className="item-media-time">{item?.time}</div>
                                    </div>

                                    <div className="item-media-info">
                                        <Link to={`/video/${item.id}`}>{item.name?item.name[locale]:''}</Link>
                                        <div className="info-author">
                                            <div className="author-image">
                                                {
                                                    item.author?(<div><img src={item.author.photo?`${image_download}?fileKey=${item.author.photo.url}`:''} alt=""/></div>):''
                                                }
                                            </div>
                                            <div className="author-name">
                                                {
                                                    item.author?(<div>{item.author.firstname?item.author.firstname[locale]:''} {item.author.lastname?item.author.lastname[locale]:''}</div>):''
                                                }
                                            </div>
                                        </div>
                                        <div className="media-date">
                                            <div className="date-time">{renderDate(item.publishedDate, locale)}</div>
                                            <div className="date-circle">
                                                <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.00016 3.66671C2.92064 3.66671 3.66683 2.92052 3.66683 2.00004C3.66683 1.07957 2.92064 0.333374 2.00016 0.333374C1.07969 0.333374 0.333496 1.07957 0.333496 2.00004C0.333496 2.92052 1.07969 3.66671 2.00016 3.66671Z" fill="#141414"/>
                                                </svg>
                                            </div>
                                            <div className="media-tags">
                                                {
                                                    (item?.categories||[]).map(item=>{
                                                        return(<span>{item.name?item.name[locale]:''}</span>)
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            )
                        })}</>):(<NotContent {...props}/>)}

                         </VideoBlock>
                </InfiniteScroll>)}
            {isFetching?<div className='d-flex justify-content-center'><Loader /></div>:''}
        </div>
    )

}


function Tags(props){
    const {filter, setFilter, locale, tags} = props
    const {t} = useTranslation()

    return(
        <Row style={{marginTop: '16px', marginBottom: '16px'}}>
                <TagsLink className={!filter.length?'active':''} onClick={()=>setFilter([])}>{t("all tags")}</TagsLink>
                {
                    tags.map(item=>{
                        return(
                            <TagsLink key={item.id} className={filter.find(filtItem=>filtItem===item.id)?'active':''} onClick={()=>{
                                if(filter.find(filtItem=>filtItem===item.id)) setFilter(filter.filter(filtItem=>filtItem!==item.id))
                                else setFilter([...filter, item.id])
                            }}>{item.name?item.name[locale]:''}</TagsLink>
                        )
                    })
                }
            </Row>
    )
}
