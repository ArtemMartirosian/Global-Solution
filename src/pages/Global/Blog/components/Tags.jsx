import {useTranslation} from "react-i18next";
import {Row} from "antd";
import {TagsLink} from "../style";
import React from "react";
import {useQuery} from "react-query";
import {NewsClient} from "../../../../api";


export function Tags(props) {
    const {filter, setFilter, locale} = props
    const {t} = useTranslation()



    const {data} = useQuery(
        ['categories'],
        () => NewsClient.getCategories()
    );

    const categoriesArr = data?.data?.content || []



    return (
        <Row style={{marginTop: '16px', marginBottom: '6px'}}>
            <TagsLink className={!filter.length ? 'active' : ''}
                      onClick={() => setFilter([])}>{t("all tags")}</TagsLink>
            {
                categoriesArr.map(item => {
                    return (
                        <TagsLink key={item.id}
                                  className={filter.find(filtItem => filtItem === item.id) ? 'active' : ''}
                                  onClick={() => {
                                      if (filter.find(filtItem => filtItem === item.id)) setFilter(filter.filter(filtItem => filtItem !== item.id))
                                      else setFilter([...filter, item.id])
                                  }}>{item.name ? item.name[locale] : ''}</TagsLink>
                    )
                })
            }
        </Row>
    )
}