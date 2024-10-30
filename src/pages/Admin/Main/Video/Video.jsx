import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import { Button, Table } from 'antd';
import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {findGetParameter} from "../../../../assets/scripts";
import {Videos} from "../../../../api/index";
import View from "../../../../components/Admin/View/View";
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'
import moment from "moment";

export default function Video(props){
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()

//=====================================================
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataAuthors, setDataAuthors] = useState([])
    const [currentNumberPage, setCurrentNumberPage] = useState(1)
//=====================================================

    useEffect(()=>{
        getVideo()
    }, [])

    const getVideo = (pageNum = 0)=>{
        Videos.getAll({page: pageNum})
            .then(result=>{
                if (result.data.content != undefined){
                    setTotal(result.data.totalElements)
                    setSize(result.data.size)
                if(result.data.content.length && result.data.content[0].id){
                    setDataAuthors(result.data.content.map((item, index)=>{
                        return {
                            ...item,
                            id: item.id,
                           name: item.name[locale]??'-',
                            publishedDate: moment(item.publishedDate).format('DD-MM-YYYY hh:mm'),
                           active: item.active ? "активен" : "неактивен"
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
            title: 'Название',
            dataIndex: 'name'
        },
        {
            title: 'Дата',
            dataIndex: 'publishedDate'
        },
        {
            title: 'Активность',
            dataIndex: 'active'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record)=>{
                return(
                    <>

                        <Button style={{marginRight: '15px'}} onClick={()=>navigate(`/admin/main/video?id=${record?.id}`)}><EyeOutlined /></Button>
                        <Button onClick={()=>navigate(`/admin/main/edit-video/${record?.id}`)}><EditOutlined /></Button>
                        <Button style={{marginLeft: '15px'}} onClick={()=>VideoDelete(record?.id)}><DeleteOutlined /></Button>
                    </>
                )
            }
        },
    ]

    const VideoDelete = (id)=>{
        let access = window.confirm('Вы действительно хотите удалить запись?')
        if(access){
            Videos.deleteVideo(id)
                .then(()=>{
                    setDataAuthors(dataAuthors.filter(item=>item.id!==id))
                })
        }
    }

    const paginationChange = (e)=>{
        getVideo(e-1)
        setCurrentNumberPage(e)
    }

    const getById = (id)=>{
        return Videos.getVideo(id)
    }

    return(
        <NavBar {...{locale}}>
            <AdminHeader>
                {
                    id?(<Link to={`/admin/main/video`}>{t('admin.main.video1')}</Link>):(<Button type='primary' onClick={()=>navigate(`/admin/main/video-form`)}>{t('admin.main.video1')}</Button>)
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
