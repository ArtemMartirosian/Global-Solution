import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Select  } from 'antd';
import {NewsCategories} from "../../../../api";
import {ToastContainer, toast} from 'react-toastify'


import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../style/index";

export default function FormTag(props){
    const {locale} = props
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()
    const [valuesField, setValuesField] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [isActive, setActive] = useState()

    useEffect(()=>{
        if(id){
            getTag()
        }
    },[])

    const onFinish = (values)=>{
        let name = {}
        let active = isActive
        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')
            if(key.match('name')){
                name[lang] = values[key]
            }
        }
        if(Object.keys(name).length<3&&!id || isActive===undefined){
            setShowAlert(true)
        }else{
            const data = {
                name: name,
                active: active,
            }
            document.getElementById("submit").disabled = true;
            if(!id){
                NewsCategories.createNewsCategory(data)
                    .then(()=>{
                        toast.success(t("admin.main.alert2"))
                        formRef.current.resetFields();
                        setTimeout(()=>{
                            navigate(`/admin/main/newsCategories`)
                        }, 500)
                    })
            }else{
                NewsCategories.updateNewsCategory(id, data)
                    .then(()=>{
                        toast.success(t("admin.main.alert3"))
                        setTimeout(()=>{
                            navigate(`/admin/main/newsCategories`)
                        }, 500)
                    })
            }
        }


    }

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    const getTag = ()=>{
        NewsCategories.getNewsCategory(id)
            .then(result=>{
                let data = {}
                setActive(result.data.active)
                let lang = ['ru', 'uz', 'en']
                for(let key in result.data){
                    if(key.match(/name/)){
                        lang.forEach(item=>{
                            data[`${key}.${item}`] = result.data[key][item] || ''
                        })
                    }
                }
                setValuesField(data)
            })
    }

    const finishFailed = (err)=>{
        if(err.errorFields.length){
            setShowAlert(true)
        }
    }



    return(
        <NavBar {...{locale}}>
            <ToastContainer/>
            <DivAlert message={t('admin.error-message')}
                      className={showAlert?'show':''}
                      showIcon
                      type="error"
                      action={
                          <Button size="small" danger onClick={()=>setShowAlert(false)}>
                              X
                          </Button>
                      }/>
            <DivAlert message={t('admin.success-message')}
                      className={showAlertSuccess?'show':''}
                      showIcon
                      type="success"
                      closable/>
            <AdminHeader>
            <Button type='primary' onClick={()=>navigate(`/admin/main/newsCategories`)}>{t('admin.logo-button2')}</Button>
            </AdminHeader>
            {
                (id && Object.keys(valuesField).length)||!id? (<Form
                    layout="vertical"
                    onFinish={onFinish}
                    style={{padding: '60px 20px'}}
                    onFinishFailed={finishFailed}
                    initialValues={valuesField}
                    ref={formRef}
                >
                    <Tabs>
                        <Tabs.TabPane tab='Русский' key="1">
                            <Row>
                                <Col className="col-12">
                                    <Form.Item
                                        name='name.ru'
                                        label={t('admin.category-table1')}
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='Узбекский' key="2">
                            <Row gutter={12}>
                                <Col className="col-12">
                                    <Form.Item
                                        name='name.uz'
                                        label={t('admin.category-table1')}
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='Английский' key="3">
                            <Row gutter={12}>
                                <Col className="col-12">
                                    <Form.Item
                                        name='name.en'
                                        label={t('admin.category-table1')}
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                    </Tabs>

                    <Form.Item name='makeActive'>
                        {t('admin.main5')}
                        <Select onChange={(e)=>{setActive(e)}} defaultValue={isActive ? isActive.toString() : ""} className="my-2">
                            <Select value="true">{t('admin.main23')}</Select>
                            <Select value="false">{t('admin.main24')}</Select>
                        </Select>
                    </Form.Item>

                    <div style={{marginTop: '20px'}}>
                        <Button type="primary" htmlType="submit" id="submit">Submit</Button>
                    </div>
                </Form>): ''
            }


        </NavBar>
    )
}
