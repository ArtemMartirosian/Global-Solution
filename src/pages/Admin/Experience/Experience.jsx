import React, {useState, useEffect} from "react";
import styled from "styled-components";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import View from "../../../components/Admin/View/View";
import {ExperienceApi} from "../../../api/index";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../assets/scripts";

const DivDescription = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export default function Experience(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataExperience, setDataExperience] = useState([])

    useEffect(()=>{
        getLetters()
    }, [])


    const getLetters = ()=>{
        ExperienceApi.getAll({page: 0})
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
                            description: item.description[locale],
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
            title: t('admin.category-table1'),
            dataIndex: 'name'
        },
        {
            title: t('admin.experience-1'),
            dataIndex: 'description',
            render: (_, record)=>{
                return(<DivDescription className="text-description" dangerouslySetInnerHTML={{__html: record.description}} />)
            }
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
                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/experience?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/edit-experience/${record?.id}`)}><EditOutlined /></Button>
                        <Button  onClick={()=>ExperienceDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const ExperienceDelete = (id)=>{
        let access = window.confirm('Вы действительно хотите удалить запись?')
        if(access){
            ExperienceApi.deleteExperience(id)
                .then(()=>{
                    setDataExperience(dataExperience.filter(item=>item.id!==id))
                })
        }

    }

    const paginationChange = (page)=>{

    }

    const getById = (id)=>{
        return ExperienceApi.getExperience(id)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/experience`}>{t('admin.logo-button2')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/new-experience`)}>{t('admin.experience-3')}</Button>)
                }
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                        columns={columns}
                        dataSource={dataExperience}
                        style={{marginTop: '30px', padding: '0px 20px'}}
                        pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):1, onChange: paginationChange, hideOnSinglePage: true }}
                    />)
            }
        </NavBar>
    )
}
