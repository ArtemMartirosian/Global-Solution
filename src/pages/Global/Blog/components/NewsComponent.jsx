import {useInfiniteQuery} from "react-query";
import {NewsClient} from "../../../../api";
import {Col} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import {BlogItemComponent} from "./BlogItemComponent";
import NotContent from "../../../../components/NotContent/NotContent";
import {reduceArray} from "../../../../assets/scripts";
import Loader from "../../../../components/Loader/Loader";
import {useTranslation} from "react-i18next";


export function NewsComponent(props) {

    const {tabKey, locale, onSearch, filter} = props

    const {t} = useTranslation()

    const {hasNextPage, fetchNextPage, isLoading, isFetching, error, data} = useInfiniteQuery(
        ['news', {filter, tabKey, onSearch}],
        ({pageParam = 0}) => {
            if (filter.length) return getNewsAll(filter, pageParam)
            return getNewsAll(null, pageParam)

        },
        {
            getNextPageParam: ({data}) => {
                let nextP = data.number + 1
                return data.last ? undefined : nextP
            }

        },
    );


    async function getNewsAll(filter = null, nextPage = 0) {


        let data = {}

        if (filter) {
            data = await NewsClient.getByCategories(filter, {page: nextPage, size: 10, sort: 'publishedDate,desc'})
        } else {
            if (onSearch) {
                data = await NewsClient.search({keyword: onSearch, sort: 'publishedDate,desc'})
            } else {
                data = await NewsClient.getAll({page: nextPage, size: 10, sort: 'publishedDate,desc'})
            }
        }


        return data

    }


    const dataNews = data?.pages.length ? reduceArray(data) : []
    const totalElemNews = data && data?.pages.length ? data.pages[0].data?.totalElements : 0


    if (isLoading) {
        return (
            <Col lg={17} span={24}>
                <div className='d-flex justify-content-center align-items-center'>
                    <Loader/>
                </div>
            </Col>
        )
    }

    if (error) {
        return (
            <Col lg={17} span={24}>
                <div><h2 className='text-center mt-5 text-danger'>{t('error 500')}</h2></div>
            </Col>
        )
    }


    return (
        <Col lg={17} span={24}>
            {
                dataNews.length > 0 ? (<InfiniteScroll
                    datalength={totalElemNews}
                    hasMore={!isFetching && hasNextPage}
                    loadMore={fetchNextPage}>
                    {(dataNews || []).map((item, index, arr) => {
                        if (arr.length) {
                            return (
                                <BlogItemComponent key={item.id} item={item} locale={locale}/>
                            )
                        }
                        return <NotContent key={item.id} {...props}/>
                    })}
                </InfiniteScroll>) : (<NotContent {...props}/>)
            }

            {isFetching && !onSearch ? <div className='d-flex justify-content-center'><Loader/></div> : ''}

        </Col>
    )
}