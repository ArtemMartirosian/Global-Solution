import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Form, Input, Button, Row, Col, Tabs} from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../References/Category/style";
import {ContactsApi} from "../../../api";


export default function FormContact(props){
    const {locale} = props
    const params = useParams()
    const navigate = useNavigate()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()
    const [valuesField, setValuesField] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)

    useEffect(()=>{
        if(id){
            getContact()
        }
    },[])

    const onFinish = (values)=>{

        let address = {}
        let name = {}
        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')
            if(key.match('address')){
                address[lang] = values[key]
            }
            if(key.match('name')){
                name[lang] = values[key]
            }

        }
        if(Object.keys(address).length<3&&Object.keys(name).length<3&&!id){
            setShowAlert(true)
        }else{
            const data = {
                address: address,
                name: name,
                cellphone: values.cellphone,
                mail: values.mail
            }
            if(!id){
                ContactsApi.createContact(data)
                    .then(()=>{
                        setShowAlert(false)
                        setShowAlertSuccess(true)
                        setTimeout(()=>{
                            navigate(`/admin/contacts`)
                        }, 500)
                    })
            }else{
                ContactsApi.updateContact(id, data)
                    .then(()=>{
                        setShowAlert(false)
                        setShowAlertSuccess(true)
                        setTimeout(()=>{
                            navigate(`/admin/contacts`)
                        }, 500)
                    })
            }
        }


    }



    const getContact = ()=>{
        ContactsApi.getContact(id)
            .then(result=>{

                let data = {}
                let lang = ['ru', 'uz', 'en']
                for(let key in result.data){
                    if(key.match(/address|name/)){
                        lang.forEach(item=>{
                            data[`${key}.${item}`] = result.data[key][item] || ''
                        })
                    }

                }

                data['cellphone'] = result.data.cellphone
                data['mail'] = result.data.mail
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
                <Link to={`/admin/contacts`}>{t('admin.logo-button2')}</Link>
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

                    <Row gutter={12}>
                        <Col span={10}>
                            <Form.Item
                                name='cellphone'
                                label={t('Main.text21')}
                                normalize={(value, prevValue) => {
                                    return value.replace(/[^0-9+ ]/, '')
                                }}
                                rules={[
                                    {

                                        required: true,
                                        min: 10,
                                        whitespace: true,
                                    }
                                ]}>
                                 <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                name='mail'
                                label='Email'
                                rules={[
                                    {
                                        required: true,
                                        type: 'email'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Tabs>
                        <Tabs.TabPane tab='Русский' key="1">
                            <Row gutter={12}>
                                <Col span={10}>
                                    <Form.Item
                                        name='name.ru'
                                        label={t('admin.category-table1')}
                                        rules={[
                                            {
                                                required: true,
                                                min: 2,
                                                whitespace: true
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        name='address.ru'
                                        label={t('id.Main.text54')}
                                        rules={[
                                            {
                                                required: true,
                                                min: 2,
                                                whitespace: true
                                            }
                                        ]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='Узбекский' key="2">
                            <Row gutter={12}>
                                <Col span={10}>
                                    <Form.Item
                                        name='name.uz'
                                        label={t('admin.category-table1')}
                                        rules={[
                                            {
                                                required: true,
                                                min: 2,
                                                whitespace: true
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        name='address.uz'
                                        label={t('id.Main.text54')}
                                        rules={[
                                            {
                                                required: true,
                                                min: 2,
                                                whitespace: true
                                            }
                                        ]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='Английский' key="3">
                            <Row gutter={12}>
                                <Col span={10}>
                                    <Form.Item
                                        name='name.en'
                                        label={t('admin.category-table1')}
                                        rules={[
                                            {
                                                required: true,
                                                min: 2,
                                                whitespace: true
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        name='address.en'
                                        label={t('id.Main.text54')}
                                        rules={[
                                            {
                                                required: true,
                                                min: 2,
                                                whitespace: true
                                            }
                                        ]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                    </Tabs>


                    <div style={{marginTop: '20px'}}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </div>
                </Form>): ''
            }


        </NavBar>
    )
}
