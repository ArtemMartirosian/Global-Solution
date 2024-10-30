import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {Table, Button, Tabs, Form, InputNumber, Input, Row, Col, message} from 'antd';
import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import View from "../../../../components/Admin/View/View";
import {News} from "../../../../api";
import {ToastContainer, toast} from 'react-toastify'
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons'

import {findGetParameter} from "../../../../assets/scripts";

export default function Team(props) {
    const {t} = useTranslation()
    const {locale} = props
    const id = findGetParameter('id')
    const navigate = useNavigate()
    const formRef = useRef()
    const [confirmLoading, setConfirmLoading] = useState(false)

//============================================================
    const [valuesField, setValuesField] = useState({})
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState([0])
    const [dataNews, setDataNews] = useState([])
    const [currentNumberPage, setCurrentNumberPage] = useState(1)
//============================================================

    useEffect(() => {
        getNews()
    }, [])

    const getNews = (pageNum = 0) => {
        setConfirmLoading(true)
        News.getAll({page: pageNum})
            .then(result => {
                setTotal(result.data.totalElements)
                setSize(result.data.size)
                if (result.data.content && result.data.content[0].id) {
                    setDataNews(result.data.content.map((item, index) => {
                        return {
                            ...item,
                            id: item.id,
                            active: item.active ? t("admin.main.table1") : t("admin.main.table2"),
                            title: item.title ? item.title[locale] : null,
                            description: item.description ? item.description[locale] : null,
                            key: index,
                            categories: item.categories
                                ? item.categories.map((m) => {
                                    return m
                                })
                                : null,
                            authors: item.authors
                                ? item.authors.map((m) => {
                                    return m.firstname[locale] + ` ` + m.lastname[locale] + " "
                                })
                                : null,
                            tag: item.categories
                                ? item.categories.map((m) => {
                                    return m.name[locale] + " "
                                })
                                : null,
                        }
                    }))
                }
                setValuesField(result)
            }).finally(() => setConfirmLoading(false))

    }
    const onFinish = (order, id) => {
        if (order.order !== undefined && order.order !== null) {
            let dataToServer;
            for (let i = 0; i < valuesField.data.numberOfElements; i++) {
                if (valuesField.data.content[i].id === id) {
                    dataToServer = valuesField.data.content[i]
                }
            }
            for (let i = 0; i < dataToServer.authors.length; i++) {
                dataToServer.authors[i] = dataToServer.authors[i].id
            }
            for (let i = 0; i < dataToServer.categories.length; i++) {
                dataToServer.categories[i] = dataToServer.categories[i].id
            }
            for (let i = 0; i < dataToServer.photos.length; i++) {
                dataToServer.photos[i] = dataToServer.photos[i].id
            }
            dataToServer.bannerPhoto = dataToServer.bannerPhoto.id
            dataToServer.order = order.order / 1
            // dataToServer.photos = [dataToServer.photos[0].id]
            document.getElementById(id).disabled = true;
            delete dataToServer.lastModifiedBy;
            delete dataToServer.lastModifiedDate
            delete dataToServer.createdBy;
            delete dataToServer.createdDate
            delete dataToServer.id
            News.updateNews(id, dataToServer)
                .then(() => {
                    document.getElementById(id).disabled = false;
                    document.getElementById(id).style.display = "none";
                    toast.success(t('admin.main.alert4'))
                })
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: t("admin.main25"),
            dataIndex: 'order',
            render: (order, data, record) => {
                return (
                    <>
                        {data.top === true
                            ? <Tabs><Form
                                onFinish={(order) => {
                                    onFinish(order, data.id)
                                }}><Form.Item
                                name={`order`}
                                initialValues={valuesField}
                                ref={formRef}
                                encType="multipart/form-data">
                                <InputNumber min="1" style={{width: '55px'}} defaultValue={order} onChange={() => {
                                    document.getElementById(data.id).style.display = "block"
                                }}/>
                            </Form.Item>
                                <Button type="primary" htmlType="submit" id={data.id}
                                        style={{display: "none"}}>Submit</Button>
                            </Form></Tabs>
                            : <div>{t("admin.main26")}</div>}
                    </>
                )
            }
        },
        {
            title: t("admin.main.table5"),
            dataIndex: 'title'
        },
        {
            title: t("admin.navbar-main5"),
            dataIndex: 'authors'
        },
        {
            title: t('admin.navbar-main4'),
            dataIndex: 'tag'
        },
        {
            title: t('admin.main.table4'),
            dataIndex: 'active'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => {
                return (
                    <Row justify={'space-around'}>
                        <Col>
                            <Button
                                disabled={confirmLoading}
                                style={{
                                    marginRight: '15px',
                                    marginBottom: "7px",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onClick={() => navigate(`/admin/main/blog?id=${record?.id}`)}><EyeOutlined/></Button>
                        </Col>
                        <Col>
                            <Button
                                disabled={confirmLoading}
                                style={{
                                    marginBottom: "7px",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onClick={() => navigate(`/admin/main/edit-blog/${record?.id}`)}><EditOutlined/></Button>
                        </Col>
                        <Col>
                            <Button
                                disabled={confirmLoading}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onClick={() => newsDelete(record?.id)}><DeleteOutlined/></Button>
                        </Col>
                    </Row>
                )
            }
        },
    ]

    const getById = (id) => {
        return News.getNews(id)
    }

    const newsDelete = (id) => {
        let access = window.confirm(t("admin.main.alert1"))
        if (access) {
            setConfirmLoading(true)
            News.deleteNews(id)
                .then(() => {
                    setTotal(total - 1)
                    setDataNews(dataNews.filter(item => item.id !== id))
                    message.success('Блог успешно удалён')
                }).catch((e) => {

            }).finally(() => setConfirmLoading(false))
        }
    }

    const paginationChange = (e) => {
        getNews(e - 1)
        setCurrentNumberPage(e)
    }

    return (
        <NavBar {...{locale}}>
            <ToastContainer/>
            <AdminHeader>
                {
                    id ? (<Link to={`/admin/main/blog-form`}>{t('admin.main11')}</Link>) : (<Button type='primary'
                                                                                                    onClick={() => navigate(`/admin/main/blog-form`)}>{t('admin.main11')}</Button>)
                }
            </AdminHeader>
            {
                id ? (<View {...props} apiGet={getById}/>) : (<Table
                    columns={columns}
                    dataSource={dataNews}
                    scroll={{x: true}}
                    loading={confirmLoading}
                    style={{marginTop: '30px', padding: '0px 20px'}}
                    pagination={{
                        showSizeChanger: false,
                        pageSize: size,
                        total: total,
                        current: findGetParameter('page') ? Number(findGetParameter('page')) : currentNumberPage,
                        onChange: paginationChange,
                        hideOnSinglePage: true
                    }}
                />)
            }
        </NavBar>
    )
}