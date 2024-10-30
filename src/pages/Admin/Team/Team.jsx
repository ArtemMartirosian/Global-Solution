import React, {useState, useEffect} from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import View from "../../../components/Admin/View/View";
import {Teams} from "../../../api/index";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../assets/scripts";

export default function Team(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataTeams, setDataTeams] = useState([])

    useEffect(()=>{
        getTeams()
    }, [])


    const getTeams = ()=>{
        Teams.getAll({page: 0})
            .then(result=>{
                setTotal(result.data.page.totalElements)
                setSize(result.data.page.size)
                if(result.data.content.length && result.data.content[0].id){
                    setDataTeams(result.data.content.map((item, index)=>{

                        return {
                            ...item,
                            id: item.id,
                            key: index,
                            createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
                            name: item.name[locale],
                            position: item.position[locale]

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
            title: 'ФИО',
            dataIndex: 'name'
        },
        {
            title: t('admin.team-1'),
            dataIndex: 'position'
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

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/team?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/edit-employee/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>EmployeeDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const EmployeeDelete = (id)=>{
        let access = window.confirm('Вы действительно хотите удалить запись?')
        if(access){
            Teams.deleteEmployee(id)
                .then(()=>{
                    setDataTeams(dataTeams.filter(item=>item.id!==id))
                })
        }
    }

    const paginationChange = (page)=>{

    }

    const getById = (id)=>{
        return Teams.getEmployee(id)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/team`}>{t('admin.logo-button2')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/new-employee`)}>{t('admin.team-2')}</Button>)
                }
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataTeams}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                    pagination={{ showSizeChanger: false, pageSize: size, total: total, current: findGetParameter('page')?Number(findGetParameter('page')):1, onChange: paginationChange, hideOnSinglePage: true }}
                />)
            }
        </NavBar>
    )
}
