import React, {useState, useEffect} from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import View from "../../../components/Admin/View/View";
import {ExperienceApi, LettersApi} from "../../../api/index";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../assets/scripts";

export default function Letters(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataLetters, setDataLetters] = useState([])

    useEffect(()=>{
        getLetters()
    }, [])


    const getLetters = ()=>{
        LettersApi.getAll({page: 0})
            .then(result=>{
                setTotal(result.data.page.totalElements)
                setSize(result.data.page.size)
                if(result.data.content.length && result.data.content[0].id){
                    setDataLetters(result.data.content.map((item, index)=>{

                        return {
                            ...item,
                            id: item.id,
                            key: index,
                            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
                            organization: item.organization[locale],
                            type: item.type[locale]

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
            title: t('admin.letters-1'),
            dataIndex: 'organization'
        },
        {
            title: t('admin.letters-3'),
            dataIndex: 'type'
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

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/letters?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/edit-letter/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>LetterDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const LetterDelete = (id)=>{
        let access = window.confirm('Вы действительно хотите удалить запись?')
        if(access){
            LettersApi.deleteLetter(id)
                .then(()=>{
                    setDataLetters(dataLetters.filter(item=>item.id!==id))
                })
        }
    }

    const paginationChange = (page)=>{

    }

    const getById = (id)=>{
        return LettersApi.getLetter(id)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {id?(<Link to={`/admin/letters`}>{t('admin.logo-button2')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/new-letter`)}>{t('admin.letters-2')}</Button>)}
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataLetters}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                    pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):1, onChange: paginationChange, hideOnSinglePage: true }}
                />)
            }
        </NavBar>
    )
}
