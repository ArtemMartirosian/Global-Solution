import {Col,Row} from "antd";
import { ToastContainer, toast } from 'react-toastify';
import {FacebookShareButton, TelegramShareButton, TwitterShareButton} from 'react-share'
import {useTranslation} from "react-i18next";

//Styles
import {BlogContent,BlogSimilar} from "./style";
import {Link, useLocation} from "react-router-dom";
import {BreadCrumbs} from "../Video/style";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

//Api

import {NewsClient, image_download} from "../../../api";
import {useQuery} from "react-query";
import {renderDate, renderMeta} from "../../../assets/scripts";
import defaultImage from "../../../assets/defaultImage.svg";
import Loader from "../../../components/Loader/Loader";
import {Helmet} from "react-helmet-async";
import meta from "../../../vr_db/meta.json";


export default function BlogOne(props) {
    const {locale} = props
    const {t} = useTranslation()
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)
    const params = useParams()
    const [categories, setCategories] = useState([])
    const {id} = params
    var dataRating = window !== undefined&&localStorage.getItem('rating')?JSON.parse(localStorage.getItem('rating')):[]
    const [dataRat, setDataRat] = useState(dataRating)
    const [contLikes, setCountLikes] = useState(0)
    const [mount,setMount] = useState(true)




    const newsResponse = useQuery(
        ['news'],
        () => NewsClient.getOne(id).then(result=>{
            setCountLikes((result?.data.likes??0)-(result?.data.dislikes??0))
            setCategories((result?.data?.categories||[]).map(item=>item.id))
            return result
        })
    )

    console.log(newsResponse)

    const newsSimResponse = useQuery(
        ['news-similar', {categories}],
        () => NewsClient.getByCategories(categories, {size: 5}),
        {
            enabled: categories.length?true:false
        }
    )

    const copyLink = (e)=>{
        e.preventDefault()
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            toast.success("Ссылка успешно скопирована")
          })
    }

    const isLoading = newsResponse.isLoading
    const similarData = newsSimResponse.data?(newsSimResponse.data?.data?.content||[]).filter(item=>item.id!==+id&&item.active):[]
    const error = newsResponse.error
    const errorSim = newsSimResponse.error


    useEffect(()=>{
        if(newsResponse.status==='success'&&mount){
            setMount(false)

            NewsClient.views(id)
        }


    }, [newsResponse])

    var fightCheckLike = true;
    var fightCheckDisLike = true;

    async function like(){
        if(fightCheckLike){
            fightCheckLike = false
            const data = {
            id,
            like: true,
            dislike:false
        }
        let a = []

        if(dataRating.length){
            if(dataRating.find(item=>item.id===id)){
                dataRating.forEach(item=>{
                    if(item.id===id) {
                        a.push(data)
                    }else{
                        a.push(item)
                    }

                })

            }else{
                a.push(data)
            }
        }else{
            a.push(data)
        }

        await NewsClient.like(id)
            .then(result=>{

                setCountLikes((result?.data?.likes??0)-(result?.data.dislikes??0))
                setDataRat(a)
                localStorage.setItem('rating', JSON.stringify(a))
            })


        }

    }

    function dislike(){
        if(fightCheckDisLike){
             fightCheckDisLike = false
            const data = {
            id,
            like: false,
            dislike:true
        }
        let a = []

        if(dataRating.length){
            if(dataRating.find(item=>item.id===id)){
                dataRating.forEach(item=>{
                    if(item.id===id) {
                        a.push(data)
                    }else{
                        a.push(item)
                    }
                })

            }else{
                a.push(data)
            }
        }else{
            a.push(data)
        }

        NewsClient.dislike(id)
            .then(result=>{
                setCountLikes((result?.data.likes??0)-(result?.data.dislikes??0))
                setDataRat(a)
               localStorage.setItem('rating', JSON.stringify(a))
            })

        }
    }


    function isDisable(type){
       if(type==='like'){
            return dataRat.find(item=>item.id===id&&item.like)
       }else{
           return dataRat.find(item=>item.id===id&&item.dislike)
       }
    }


    

    if(isLoading){
        return (
            <div style={{minHeight: '600px'}} className='d-flex justify-content-center flex-column align-items-center'>
                <h2>{t('loading')}...</h2>
                <Loader />
            </div>
        )
    }



    if(error){
        return <div style={{minHeight: '600px'}}><h2 className='text-center mt-5'>{t('error 500')}</h2></div>
    }

    return (
        <>
        <Helmet>
            <title>{renderMeta(`/blog/${id}`, locale, 'Title')}</title>
            <meta name="description" content={renderMeta(`/blog/${id}`, locale, 'description')} />
            <meta name="keywords" content={renderMeta(`/blog/${id}`, locale, 'keywords')} />
            <meta name="robots" content="index, follow"/>
            <meta property="og:title" content={renderMeta(`/blog/${id}`, locale, 'title')} />
            <meta property="og:description" content={renderMeta(`/blog/${id}`, locale, 'og:description')} />
            <meta property="og:url" content={renderMeta(`/blog/${id}`, locale, 'og:url')} />
            <meta property="og:type" content={renderMeta(`/blog/${id}`, locale, 'og:type')} />
            <meta property="og:site_name" content={renderMeta(`/blog/${id}`, locale, 'og:site_name')} />
            <meta property="og:image" content={renderMeta(`/blog/${id}`, locale, 'og:image')} />
        </Helmet>
        <div className="container">
            <ToastContainer />
            <BlogContent>
                <div className="blog-content-item">
                    <div className="item-info">
                        <div className="image-block">{(newsResponse.data&&newsResponse.data?.data?.authors?newsResponse.data?.data?.authors:[]).map((item)=>{
                            console.log(item)
                            return(
                                <div className="blog-content-author-img" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src={item.photo?`${image_download}?fileKey=${item?.photo.url}`:''} alt=""/>
                                </div>
                            )
                        })}
                        </div>
                        <div className="blog-content-author-info">
                            <div className="author-name">{(newsResponse.data?.data?.authors||[]).map((item)=>item.firstname?item.firstname[locale]:'').join(', ')}</div>
                            <div className="author-action">
                                <div className="action-date">{renderDate(newsResponse.data?.data?.publishedDate, locale)}</div>
                                <div className="action-circle">
                                    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.99992 3.66671C2.92039 3.66671 3.66659 2.92052 3.66659 2.00004C3.66659 1.07957 2.92039 0.333374 1.99992 0.333374C1.07944 0.333374 0.333252 1.07957 0.333252 2.00004C0.333252 2.92052 1.07944 3.66671 1.99992 3.66671Z" fill="#141414"/>
                                    </svg>
                                </div>
                                <div className="action-reading">{newsResponse.data?.data?.readTime} {t('min')} {t('read')}</div>
                                <div className="action-circle">
                                    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.99992 3.66671C2.92039 3.66671 3.66659 2.92052 3.66659 2.00004C3.66659 1.07957 2.92039 0.333374 1.99992 0.333374C1.07944 0.333374 0.333252 1.07957 0.333252 2.00004C0.333252 2.92052 1.07944 3.66671 1.99992 3.66671Z" fill="#141414"/>
                                    </svg>
                                </div>
                                <div className="action-tags flex-wrap">
                                    {(newsResponse.data?.data?.categories||[]).map((item)=>{
                                        return(
                                            <span>{item.name[locale]}</span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blog-content-view">
                        <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 0C22.1894 0 28.1707 5.17333 29.4254 12C28.172 18.8267 22.1894 24 15 24C7.81071 24 1.82937 18.8267 0.574707 12C1.82804 5.17333 7.81071 0 15 0ZM15 21.3333C17.7193 21.3327 20.3579 20.4091 22.4838 18.7136C24.6098 17.018 26.0972 14.651 26.7027 12C26.095 9.35107 24.6066 6.98667 22.4809 5.29337C20.3551 3.60006 17.7178 2.67804 15 2.67804C12.2823 2.67804 9.64496 3.60006 7.51921 5.29337C5.39346 6.98667 3.90506 9.35107 3.29737 12C3.90284 14.651 5.39027 17.018 7.51623 18.7136C9.64219 20.4091 12.2807 21.3327 15 21.3333ZM15 18C13.4087 18 11.8826 17.3679 10.7574 16.2426C9.63218 15.1174 9.00004 13.5913 9.00004 12C9.00004 10.4087 9.63218 8.88258 10.7574 7.75736C11.8826 6.63214 13.4087 6 15 6C16.5913 6 18.1175 6.63214 19.2427 7.75736C20.3679 8.88258 21 10.4087 21 12C21 13.5913 20.3679 15.1174 19.2427 16.2426C18.1175 17.3679 16.5913 18 15 18ZM15 15.3333C15.8841 15.3333 16.7319 14.9821 17.3571 14.357C17.9822 13.7319 18.3334 12.8841 18.3334 12C18.3334 11.1159 17.9822 10.2681 17.3571 9.64298C16.7319 9.01786 15.8841 8.66667 15 8.66667C14.116 8.66667 13.2681 9.01786 12.643 9.64298C12.0179 10.2681 11.6667 11.1159 11.6667 12C11.6667 12.8841 12.0179 13.7319 12.643 14.357C13.2681 14.9821 14.116 15.3333 15 15.3333Z" fill="#141414"/>
                        </svg>
                        {newsResponse.data.data.views??0}  {t('views')}
                    </div>
                </div>
                <div className="blog-content-main">
                    <h2>{newsResponse.data.data.title[locale]}</h2>
                    <BreadCrumbs>
                        <Link to={`${locale==='ru'?'/':`/${locale}`}`}>Global Solutions</Link>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.17177 4.99996L0.342773 2.17196L1.75677 0.756958L5.99977 4.99996L1.75677 9.24296L0.342773 7.82796L3.17177 4.99996Z" fill="#141414"/>
                        </svg>
                        <Link to={`${locale==='ru'?'/':`/${locale}/`}blog`}>{t('Blog link')}</Link>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.17177 4.99996L0.342773 2.17196L1.75677 0.756958L5.99977 4.99996L1.75677 9.24296L0.342773 7.82796L3.17177 4.99996Z" fill="#141414"/>
                        </svg>
                        <p>{newsResponse.data.data.title[locale]}</p>
                    </BreadCrumbs>
                    <div className="blog-content-main-image">
                        <div itemScope itemType="http://schema.org/ImageObject">
                            <img itemProp='contentUrl' src={newsResponse.data?.data?.photos&&newsResponse.data?.data?.photos?.length?`${image_download}?fileKey=${newsResponse.data?.data?.photos[0]?.url}`:''} alt=""/>
                        </div>
                    </div>
                    <div className="content-text">
                        <Col lg={18}>
                            <div className="content" dangerouslySetInnerHTML={{__html: newsResponse.data?.data?.description?newsResponse.data?.data?.description[locale]:''}}/>
                        </Col>
                    </div>
                    <div className="blog-content-footer">
                        <div className="content-like">
                            <button onClick={()=>like()} disabled={isDisable('like')}>
                                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.99998 4.43735L2.39998 11.0374L0.514648 9.15202L8.99998 0.666687L17.4853 9.15202L15.6 11.0374L8.99998 4.43735Z" fill="#141414"/>
                                </svg>
                            </button>
                            <span className={contLikes === 0? '':(contLikes > 0? 'success' : 'danger')}>{contLikes}</span>
                            <button onClick={()=>dislike()} disabled={isDisable('dislike')}>
                                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.99998 7.56289L15.6 0.962891L17.4853 2.84822L8.99998 11.3336L0.514648 2.84822L2.39998 0.962891L8.99998 7.56289Z" fill="#141414"/>
                                </svg>
                            </button>
                        </div>
                        <div className="content-links">

                            <a href='' onClick={(e)=>copyLink(e)}>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.4854 18.7166L20.6001 16.8286L22.4854 14.9433C23.1089 14.3252 23.6042 13.5901 23.9429 12.7801C24.2815 11.9701 24.4568 11.1012 24.4587 10.2232C24.4606 9.34529 24.2891 8.47562 23.9541 7.66415C23.619 6.85267 23.1269 6.11537 22.5061 5.49458C21.8853 4.87379 21.148 4.38172 20.3366 4.04664C19.5251 3.71156 18.6554 3.54005 17.7775 3.54198C16.8995 3.5439 16.0306 3.71921 15.2206 4.05784C14.4106 4.39648 13.6755 4.89176 13.0574 5.51527L11.1721 7.40194L9.28543 5.5166L11.1734 3.63127C12.9239 1.88084 15.2979 0.897461 17.7734 0.897461C20.2489 0.897461 22.623 1.88084 24.3734 3.63127C26.1239 5.3817 27.1072 7.75579 27.1072 10.2313C27.1072 12.7068 26.1239 15.0808 24.3734 16.8313L22.4868 18.7166H22.4854ZM18.7148 22.4873L16.8281 24.3726C15.0777 26.123 12.7036 27.1064 10.2281 27.1064C7.75262 27.1064 5.37853 26.123 3.6281 24.3726C1.87767 22.6222 0.894287 20.2481 0.894287 17.7726C0.894287 15.2971 1.87767 12.923 3.6281 11.1726L5.51476 9.28727L7.4001 11.1753L5.51476 13.0606C4.89126 13.6787 4.39597 14.4138 4.05733 15.2238C3.7187 16.0338 3.54339 16.9027 3.54147 17.7807C3.53955 18.6586 3.71105 19.5283 4.04613 20.3397C4.38122 21.1512 4.87328 21.8885 5.49407 22.5093C6.11487 23.1301 6.85217 23.6222 7.66364 23.9572C8.47511 24.2923 9.34478 24.4638 10.2227 24.4619C11.1006 24.46 11.9696 24.2847 12.7796 23.946C13.5896 23.6074 14.3247 23.1121 14.9428 22.4886L16.8281 20.6033L18.7148 22.4886V22.4873ZM17.7708 8.3446L19.6574 10.2313L10.2294 19.6579L8.34276 17.7726L17.7708 8.34594V8.3446Z" fill="#141414"/>
                                </svg>
                            </a>


                            <TelegramShareButton url={`${process.env.REACT_APP_PUBLIC_URL}${locale}/blog/${id}`}>
                                 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.9993 24.668C16.8283 24.668 19.5414 23.5442 21.5418 21.5438C23.5422 19.5434 24.666 16.8303 24.666 14.0013C24.666 11.1723 23.5422 8.45922 21.5418 6.45883C19.5414 4.45844 16.8283 3.33464 13.9993 3.33464C11.1704 3.33464 8.45726 4.45844 6.45688 6.45883C4.45649 8.45922 3.33268 11.1723 3.33268 14.0013C3.33268 16.8303 4.45649 19.5434 6.45688 21.5438C8.45726 23.5442 11.1704 24.668 13.9993 24.668ZM13.9993 27.3346C6.63535 27.3346 0.666016 21.3653 0.666016 14.0013C0.666016 6.6373 6.63535 0.667969 13.9993 0.667969C21.3633 0.667969 27.3327 6.6373 27.3327 14.0013C27.3327 21.3653 21.3633 27.3346 13.9993 27.3346ZM9.85268 15.5613L6.52202 14.5226C5.80202 14.3026 5.79802 13.8066 6.68335 13.4506L19.6607 8.4373C20.414 8.13064 20.8407 8.51864 20.5967 9.49063L18.3874 19.9173C18.2327 20.66 17.786 20.8373 17.166 20.4946L13.7647 17.9773L12.1793 19.508C12.0167 19.6653 11.8847 19.8 11.634 19.8333C11.3847 19.868 11.1793 19.7933 11.0287 19.38L9.86868 15.552L9.85268 15.5626V15.5613Z" fill="#141414"/>
                                </svg>
                            </TelegramShareButton>

                            <FacebookShareButton url={`${process.env.REACT_APP_PUBLIC_URL}${locale}/blog/${id}`}>
                                 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.3327 24.5853C18.0224 24.2431 20.4809 22.8895 22.2084 20.7997C23.936 18.7099 24.803 16.0407 24.6332 13.3346C24.4634 10.6285 23.2696 8.08862 21.2944 6.23114C19.3191 4.37367 16.7108 3.338 13.9993 3.33464C11.2846 3.33261 8.67128 4.36575 6.6918 6.22354C4.71232 8.08133 3.51567 10.624 3.34567 13.3334C3.17568 16.0427 4.04513 18.715 5.77687 20.8057C7.50862 22.8963 9.97233 24.248 12.666 24.5853V16.668H9.99935V14.0013H12.666V11.796C12.666 10.0133 12.8527 9.36664 13.1993 8.71464C13.5408 8.06955 14.0686 7.54222 14.714 7.2013C15.2233 6.92797 15.8567 6.76397 16.9633 6.6933C17.402 6.6653 17.97 6.69997 18.6674 6.79997V9.3333H17.9993C16.7767 9.3333 16.2713 9.39064 15.97 9.55197C15.7902 9.64444 15.6438 9.79083 15.5513 9.97064C15.3913 10.272 15.3327 10.5706 15.3327 11.7946V14.0013H18.666L17.9993 16.668H15.3327V24.5853ZM13.9993 27.3346C6.63535 27.3346 0.666016 21.3653 0.666016 14.0013C0.666016 6.6373 6.63535 0.667969 13.9993 0.667969C21.3633 0.667969 27.3327 6.6373 27.3327 14.0013C27.3327 21.3653 21.3633 27.3346 13.9993 27.3346Z" fill="#141414"/>
                                </svg>
                            </FacebookShareButton>

                            <TwitterShareButton url={`${process.env.REACT_APP_PUBLIC_URL}${locale}/blog/${id}`}>
                                <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.3994 3.40276C18.386 3.40259 17.4131 3.80025 16.6899 4.51018C15.9668 5.22011 15.5512 6.18555 15.5327 7.19876L15.4954 9.29876C15.4932 9.41151 15.4672 9.52252 15.4191 9.62452C15.371 9.72652 15.3018 9.81719 15.2162 9.8906C15.1306 9.964 15.0304 10.0185 14.9223 10.0504C14.8142 10.0824 14.7005 10.0911 14.5887 10.0761L12.5074 9.79342C9.76871 9.42009 7.14471 8.15876 4.62738 6.06142C3.83004 10.4748 5.38737 13.5321 9.13804 15.8908L11.4674 17.3548C11.578 17.4243 11.67 17.5199 11.7352 17.6332C11.8003 17.7465 11.8368 17.8741 11.8412 18.0047C11.8457 18.1354 11.8181 18.2651 11.7608 18.3826C11.7036 18.5001 11.6184 18.6018 11.5127 18.6788L9.39004 20.2294C10.6527 20.3081 11.8514 20.2521 12.846 20.0548C19.1367 18.7988 23.3194 14.0654 23.3194 6.25742C23.3194 5.62009 21.97 3.40276 19.3994 3.40276ZM12.866 7.14942C12.8893 5.86416 13.2912 4.61432 14.0215 3.55639C14.7517 2.49845 15.7778 1.67945 16.9713 1.20191C18.1647 0.724376 19.4726 0.609529 20.731 0.871753C21.9895 1.13398 23.1426 1.76162 24.046 2.67609C24.994 2.66942 25.8007 2.90942 27.6047 1.81609C27.158 4.00276 26.938 4.95209 25.986 6.25742C25.986 16.4468 19.7234 21.4014 13.3687 22.6694C9.01137 23.5388 2.67537 22.1108 0.859375 20.2148C1.78471 20.1428 5.54471 19.7388 7.71804 18.1481C5.87937 16.9361 -1.43929 12.6294 3.37004 1.05076C5.62737 3.68676 7.91671 5.48142 10.2367 6.43342C11.7807 7.06676 12.1594 7.05342 12.8674 7.15076L12.866 7.14942Z" fill="#141414"/>
                                </svg>
                            </TwitterShareButton>


                        </div>
                    </div>
                </div>
            </BlogContent>
            {
                Array.isArray(similarData)&&similarData.length?(<BlogSimilar>
                <h3>{t('similar')}</h3>
                <div className="blog-similar-list">
                    <Row gutter={[24,24]}>
                        {(similarData||[]).map((item, index)=>{
                            if(index<3){
                                return(
                                <Col lg={8} span={12} className="similar-content" key={item.id}>
                            <div itemScope itemType="http://schema.org/ImageObject" className={`similar-content-img ${item?.photos && item?.photos?.length ? "" : "blog-default-image"}`} >
                                <img itemProp='contentUrl' src={item?.photos&&item?.photos?.length?`${image_download}?fileKey=${item?.photos[0]?.url}`: defaultImage} alt=""/>
                            </div>
                            <div className="similar-content-info">
                                <Link to={`${locale==='ru'?'/':`/${locale}/`}blog/${item.id}`}>
                                    <h4>{item.title?item.title[locale]:''}</h4>
                                </Link>
                                <div className="content-author">
                                    {(item?.authors||[]).map((item)=>{
                                        return (
                                            <div className="author-img" itemScope itemType="http://schema.org/ImageObject">
                                                <img itemProp='contentUrl' src={item?.photo?`${image_download}?fileKey=${item?.photo?.url}`:''} alt=""/></div>
                                        )
                                    })}
                                    <p>{(item.authors||[]).map((item)=>item.firstname?item.firstname[locale]:'').join(', ')}</p>
                                </div>
                                <div className="content-most">
                                    <div className="content-most-date">{renderDate(item?.publishedDate, locale)}</div>
                                    <div className="content-most-circle">
                                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.99992 3.66671C2.92039 3.66671 3.66659 2.92052 3.66659 2.00004C3.66659 1.07957 2.92039 0.333374 1.99992 0.333374C1.07944 0.333374 0.333252 1.07957 0.333252 2.00004C0.333252 2.92052 1.07944 3.66671 1.99992 3.66671Z" fill="#141414"/>
                                        </svg>
                                    </div>
                                    <div className="content-most-tags">{item.categories&&item.categories.length?item.categories[0].name[locale]:''}</div>
                                </div>
                            </div>
                        </Col>
                            )
                            }
                        })}
                    </Row>
                </div>
            </BlogSimilar>):''
            }
        </div>
    </>
    )
}
