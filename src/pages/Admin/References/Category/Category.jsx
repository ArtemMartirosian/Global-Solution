import React, {useState, useEffect} from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import View from "../../../../components/Admin/View/View";
import {Categories} from "../../../../api";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../../assets/scripts";

export default function Category(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataExperience, setDataExperience] = useState([])

    useEffect(()=>{
        getCategories()
    }, [])

    const getCategories = ()=>{
        Categories.getAll({page: 0})
            .then(result=>{
                setTotal(result.data.page.totalElements)
                setSize(result.data.page.size)
                if(result.data.content.length && result.data.content[0].id){
                    setDataExperience(result.data.content.map((item, index)=>{
                        return {
                            ...item,
                            id: item.id,
                            key: index,
                            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
                            name: item.name[locale]

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
            title: 'Наименование',
            dataIndex: 'name'
        },
        {
            title: 'Дата публикации',
            dataIndex: 'createdAt'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record)=>{
                return(
                    <>

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/references/category?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/references/edit-category/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>categoryDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const categoryDelete = (id)=>{
        let access = window.confirm('Вы действительно хотите удалить запись?')
        if(access){
            Categories.deleteCategory(id)
                .then(()=>{
                    setTotal(total-1)
                    setDataExperience(dataExperience.filter(item=>item.id!==id))
                })
        }
    }

    const paginationChange = ()=>{

    }

    const getById = (id)=>{
        return Categories.getCategory(id)
    }


    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/references/category`}>{t('admin.logo-button2')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/references/new-category`)}>{t('admin.category-create')}</Button>)
                }
            </AdminHeader>
            {id?(<View {...props} apiGet={getById}/>):(<Table
                columns={columns}
                dataSource={dataExperience}
                style={{marginTop: '30px', padding: '0px 20px'}}
                pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):1, onChange: paginationChange, hideOnSinglePage: true }}
            />)}
        </NavBar>
    )
}
