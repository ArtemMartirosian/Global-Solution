import React, {useState, useEffect} from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import View from "../../../../components/Admin/View/View";
import {NewsCategories} from "../../../../api";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../../assets/scripts";

export default function Tags(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [currentNumberPage, setCurrentNumberPage] = useState(1)

    const [dataExperience, setDataExperience] = useState([])

    useEffect(()=>{
        getNewsCategories()
    }, [])

    const getNewsCategories = (pageNum = 0)=>{
        NewsCategories.getAll({page: pageNum})
            .then(result=>{

                setTotal(result.data.totalElements)
                setSize(result.data.size)
                if(result.data.content /*&& result.data.content[0].id*/){
                    setDataExperience(result.data.content.map((item, index)=>{
                        return {
                            ...item,
                            id: item.id,
                            active: item.active ? "активен" : "неактивен",
                            key: index,
                            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
                            name: item.name?item.name[locale]:''

                        }
                    }))
                }
            })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: t("admin.main19"),
            dataIndex: 'name'
        },
        {
            title: t("admin.main20"),
            dataIndex: 'createdAt'
        },
        {
            title: t("admin.main21"),
            dataIndex: 'active'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record)=>{
                return(
                    <>

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/main/newsCategories?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/main/edit-newsCategories/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>TagDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const TagDelete = (id)=>{
        let access = window.confirm(t("admin.main.alert1"))
        if(access){
            NewsCategories.deleteNewsCategory(id)
                .then(()=>{
                    setTotal(total-1)
                    setDataExperience(dataExperience.filter(item=>item.id!==id))
                })
        }
    }

    const paginationChange = (e)=>{
        getNewsCategories(e-1)
        setCurrentNumberPage(e)
    }

    const getById = (id)=>{
        return NewsCategories.getNewsCategory(id)
    }


    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/main/newsCategories-form`}>{t('admin.logo-button2')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/main/newsCategories-form`)}>{t('admin.category-create')}</Button>)
                }
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataExperience}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                    pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):currentNumberPage, onChange: paginationChange, hideOnSinglePage: true }}
                />)
            }
        </NavBar>
    )
}
