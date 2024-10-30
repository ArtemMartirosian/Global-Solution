import React, {useState, useEffect} from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import View from "../../../components/Admin/View/View";
import {ExperienceApi, FeedBackApi} from "../../../api/index";
import {
    EyeOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../assets/scripts";

export default function FeedBack(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const type = findGetParameter('type')
    const navigate = useNavigate()
    const [dataFeedBack, setDataFeedBack] = useState([])

    useEffect(()=>{
        getFeedBack()
    }, [])


    const getFeedBack = ()=>{

        FeedBackApi.getAll({page: 0, type: type?findGetParameter('type').toUpperCase():null})
            .then(result=>{
                if(result.data.content.length&&result.data.content[0].id){
                    setDataFeedBack(result.data.content.map((item, index)=>{

                        return {
                            ...item,
                            id: item.id,
                            key: index,
                            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
                            description: item.description
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
            title: t('Main.text19'),
            dataIndex: 'name'
        },
        {
            title: t('Main.text21'),
            dataIndex: 'cellphone'
        },
        {
            title: 'Email',
            dataIndex: 'email'
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
                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/feedback?id=${record?.id}&type=${type}`)}><EyeOutlined /></Button>
                    </>
                )
            }
        },
    ]


    const getById = (id)=>{
        return FeedBackApi.getFeedBack(id)
    }


    return(
        <NavBar {...{locale}}>
            <AdminHeader>{id?(<Link to={`/admin/feedback?type=${type}`}>{t('admin.logo-button2')}</Link>):''}</AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataFeedBack}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                />)
            }
        </NavBar>
    )
}
