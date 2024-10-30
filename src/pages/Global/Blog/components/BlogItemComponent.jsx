import {Col} from "antd";
import {image_download} from "../../../../api";
import {Link} from "react-router-dom";
import {renderDate} from "../../../../assets/scripts";
import defaultImage from "../../../../assets/defaultImage.svg";
import {BlogItem} from "../style";
import {useTranslation} from "react-i18next";


export function BlogItemComponent ({item, locale}){
    const {t} = useTranslation()
    return (
        <BlogItem key={item.id}>
            <Col lg={17} span={24} className="main-blog">
                <div className="blog-author">
                    <div
                        className="blog-author-images">{(item?.authors || []).map((item, index) => {

                        return (
                            <div className="author-img" key={item.id} itemScope
                                 itemType="http://schema.org/ImageObject">
                                <img itemProp='contentUrl'
                                     src={item.photo ? `${image_download}?fileKey=${item?.photo.url}` : ''}
                                     alt=""/>
                            </div>
                        )
                    })}</div>
                    <div className="author-name">
                        {(item?.authors || []).map((item) => item.firstname ? item.firstname[locale] : '').join(', ')}
                    </div>
                </div>
                <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}blog/${item.id}`}
                      className="blog-title">{item.title ? item.title[locale] : ''}</Link>
                <p className="blog-desc">{item.shortDescription ? item.shortDescription[locale] : ''}</p>
                <div className="blog-info">
                    <p className="info-date">{renderDate(item?.publishedDate, locale)}</p>
                    <div className="info-cirсle">
                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.00001 3.66665C2.92048 3.66665 3.66668 2.92045 3.66668 1.99998C3.66668 1.07951 2.92048 0.333313 2.00001 0.333313C1.07954 0.333313 0.333344 1.07951 0.333344 1.99998C0.333344 2.92045 1.07954 3.66665 2.00001 3.66665Z"
                                fill="#141414"/>
                        </svg>
                    </div>
                    <span
                        className="info-time">{item?.readTime} {t('min')} {t('read')}</span>
                    <div className="info-cirсle">
                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.00001 3.66665C2.92048 3.66665 3.66668 2.92045 3.66668 1.99998C3.66668 1.07951 2.92048 0.333313 2.00001 0.333313C1.07954 0.333313 0.333344 1.07951 0.333344 1.99998C0.333344 2.92045 1.07954 3.66665 2.00001 3.66665Z"
                                fill="#141414"/>
                        </svg>
                    </div>
                    <div className="blog-tags">
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

            <Col itemScope itemType="http://schema.org/ImageObject" lg={7} md={12}
                 span={24}
                 className={item.photos && item.photos.length ? "blog-images" : "blog-default-image"}>
                <img itemProp='contentUrl'
                     src={item.photos && item.photos.length ? `${image_download}?fileKey=${item?.photos[0].url}` : defaultImage}
                     alt=""/>
            </Col>
        </BlogItem>
    )
}