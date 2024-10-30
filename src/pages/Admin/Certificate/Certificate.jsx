import React, {useState, useEffect} from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Table, Button } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import View from "../../../components/Admin/View/View";
import {Licenses} from "../../../api/index";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../assets/scripts";

export default function Certificate(props){
    const {t} = useTranslation()
    const {locale} = props
    const type = findGetParameter('type')
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const [dataLicenses, setDataLicenses] = useState([])



    useEffect(()=>{
        getLicenses()
    }, [])


    const getLicenses = ()=>{

        Licenses.getAll({page: 0, type: type?findGetParameter('type').toUpperCase():null})
            .then(result=>{

                if(result.data.content.length&&result.data.content[0].id){
                    setDataLicenses(result.data.content.map((item, index)=>{

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
            title: t('admin.category-table1'),
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

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/certificate?id=${record?.id}&type=${type}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/edit-certificate/${record?.id}?type=${type}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>LicensesDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const LicensesDelete = (id)=>{
        let access = window.confirm('Вы действительно хотите удалить запись?')
        if(access){
            Licenses.deleteLicenses(id)
                .then(()=>{
                    setDataLicenses(dataLicenses.filter(item=>item.id!==id))
                })
        }

    }


    const getById = (id)=>{
        return Licenses.getLicenses(id)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    !id?(<Button type='primary' onClick={()=>navigate(`/admin/new-certificate?type=${type}`)}>{t('admin.certificate-1')}</Button>):(<Link to={`/admin/certificate?type=${type}`}>{t('admin.logo-button2')}</Link>)
                }
            </AdminHeader>
            {
                id?(<View {...props} apiGet={getById}/>):(<Table
                    columns={columns}
                    dataSource={dataLicenses}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                />)
            }
        </NavBar>
    )
}
