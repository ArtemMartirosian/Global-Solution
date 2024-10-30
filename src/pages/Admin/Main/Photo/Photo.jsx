import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';
import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {findGetParameter} from "../../../../assets/scripts";
import moment from 'moment'


import View from "../../../../components/Admin/View/View";
import {Photo} from "../../../../api/index";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'


export default function Team(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataPhoto, setDataPhoto] = useState([])
    const [currentNumberPage, setCurrentNumberPage] = useState(1)

    useEffect(()=>{
        getPhoto()
    }, [])

    const getPhoto = (pageNum = 0)=>{
        Photo.getAll({page: pageNum})
            .then(result=>{
                if (result.data.content != undefined){
                    setTotal(result.data.totalElements)
                    setSize(result.data.size)
                if(result.data.content.length && result.data.content[0].id){
                    setDataPhoto(result.data.content.map((item, index)=>{
                
                        return {
                            ...item,
                            id: item.id,
                           title: item.name ? item.name[locale] : null,

                        }
                    }))
                }
            }

        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: t('admin.main19'),
            dataIndex: 'title'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record)=>{
                return(
                    <>

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/main/photo?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/main/edit-photo/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>PhotoDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const PhotoDelete = (id)=>{
        let access = window.confirm(t("admin.main.alert1"))
        if(access){
            Photo.deletePhoto(id)
                .then(()=>{
                    setDataPhoto(dataPhoto.filter(item=>item.id!==id))
                })
        }
    }

    const getById = (id)=>{
        return Photo.getPhoto(id)
    }

    const paginationChange = (e)=>{
        getPhoto(e-1)
        setCurrentNumberPage(e)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/main/photo-form`}>{t('admin.main.photo1')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/main/photo-form`)}>{t('admin.main.photo1')}</Button>)
                }
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataPhoto}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                    pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):currentNumberPage, onChange: paginationChange, hideOnSinglePage: true }}
                />)
            }
        </NavBar>
    )
}