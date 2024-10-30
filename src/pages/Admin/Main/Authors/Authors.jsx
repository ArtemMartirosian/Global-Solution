import React, {useState, useEffect} from "react";
import moment from 'moment'
import {findGetParameter} from "../../../../assets/scripts";
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';
import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import View from "../../../../components/Admin/View/View";
import {Authors} from "../../../../api/index";
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

//===============================================
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataAuthors, setDataAuthors] = useState([])
    const [currentNumberPage, setCurrentNumberPage] = useState(1)
//===============================================

    useEffect(()=>{
        getAuthors()
    }, [])

    const getAuthors = (pageNum = 0)=>{
        Authors.getAll({page: pageNum})
            .then(result=>{
                setTotal(result.data.totalElements)
                setSize(result.data.size)
                if (result.data.content != undefined){
                setTotal(result.data.content.length)
                setSize(result.data.content.length)
                if(result.data.content.length && result.data.content[0].id){
                    setDataAuthors(result.data.content.map((item, index)=>{
                        return {
                            ...item,
                            id: item.id,
                            key: index,
                            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
                            firstname: item.firstname ? item.firstname[locale] : null,
                           lastname: item.lastname ? item.lastname[locale] : null,
                           position: item.position ? item.position[locale] : null,
                           active: item.active ? t('admin.main.table1'): t('admin.main.table2')

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
            title: t('admin.main.authors1'),
            dataIndex: 'firstname'
        },
        {
            title: t('admin.main.authors6'),
            dataIndex: 'lastname'
        },
        {
            title: t('admin.main.authors2'),
            dataIndex: 'position'
        },
        {
            title: t('admin.main.table3'),
            dataIndex: 'createdAt'
        },
        {
            title: t('admin.main.table4'),
            dataIndex: 'active'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record)=>{
                return(
                    <>

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/main/authors?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/main/edit-authors/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>AuthorDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const AuthorDelete = (id)=>{
        let access = window.confirm(t('admin.main.alert1'))
        if(access){
            Authors.deleteAuthor(id)
                .then(()=>{
                    setDataAuthors(dataAuthors.filter(item=>item.id!==id))
                })
        }
    }

    const paginationChange = (e)=>{
        getAuthors(e-1)
        setCurrentNumberPage(e)
    }

    const getById = (id)=>{
        return Authors.getAuthor(id)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/main/authors`}>{t('admin.main.authors5')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/main/authors-form`)}>{t('admin.main.authors5')}</Button>)
                }
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataAuthors}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                    pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):currentNumberPage, onChange: paginationChange, hideOnSinglePage: true }}
                />)
            }
        </NavBar>
    )
}
