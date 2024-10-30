import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Form, Input, Button, Row, Col, Tabs, InputNumber, Upload, Image} from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../References/Category/style";
import {LettersApi, Files, image_download} from "../../../api";
import { UploadOutlined  } from '@ant-design/icons'


export default function FormLetter(props){
    const {locale} = props
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()
    const [valuesField, setValuesField] = useState({})
    const [image, setImage] = useState(null)
    const [dataFile, setDataFile] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)

    useEffect(()=>{
        if(id){
            getLetter()
        }
    },[])

    const onFinish = (values)=>{

        let name = {}
        let organisation = {}
        let type={}
        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')
            if(key.match('name')){
                name[lang] = values[key]
            }
            if(key.match('organization')){
                organisation[lang] = values[key]
            }
            if(key.match('type')){
                type[lang] = values[key]
            }
        }
        if(Object.keys(name).length<3&&Object.keys(organisation).length<3&&Object.keys(type).length<3&&!id){
            setShowAlert(true)
        }else{
            const data = {
                name: name,
                order: values.order,
                organization: organisation,
                type: type
            }
            if(!id){
                LettersApi.createLetter(data)
                    .then((result)=>{
                        fileUpload(dataFile, result.data.id, 'letter')
                            .then(()=>{
                                setShowAlert(false)
                                setShowAlertSuccess(true)
                                formRef.current.resetFields();
                                setTimeout(()=>{
                                    navigate(`/${locale}/admin/letters`)
                                }, 500)
                            })
                    })
            }else{
                LettersApi.updateLetter(id, data)
                    .then((result)=>{
                        if(dataFile){
                            fileUpload(dataFile, result.data.id, 'letter')
                                .then(()=>{
                                    setShowAlert(false)
                                    setShowAlertSuccess(true)
                                    setTimeout(()=>{
                                        navigate(`/${locale}/admin/letters`)
                                    }, 500)
                                })
                        }else{
                            setShowAlert(false)
                            setShowAlertSuccess(true)
                            setTimeout(()=>{
                                navigate(`/admin/letters`)
                            }, 500)
                        }
                    })
            }
        }


    }



    const getLetter = ()=>{
        LettersApi.getLetter(id)
            .then(result=>{

                let data = {}
                let lang = ['ru', 'uz', 'en']
                for(let key in result.data){
                    if(key.match(/name|type|organization/)){
                        lang.forEach(item=>{
                            data[`${key}.${item}`] = result.data[key][item] || ''
                        })
                    }

                }

                data['order'] = result.data.order
                if(result.data.fileId){
                    setImage(`${image_download}?fileKey=${result.data.fileId.url}`)
                }
                setValuesField(data)
            })
    }

    const finishFailed = (err)=>{
        if(err.errorFields.length){
            setShowAlert(true)
        }
    }

    const fileUpload = async(file, id, entity) => {
        const data = new FormData()
        data.append('file', file)
        await Files.uploadFile(data, id, entity)
    }

    const handleUpload = async(val)=>{

        if(val.fileList.length){
            setDataFile(val.file)
        }else{
            setDataFile(null)
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
                <Link to={`/admin/letters`}>{t('admin.logo-button2')}</Link>
            </AdminHeader>
            {
                (id && Object.keys(valuesField).length)||!id? (<Form
                    layout="vertical"
                    onFinish={onFinish}
                    style={{padding: '60px 20px'}}
                    onFinishFailed={finishFailed}
                    initialValues={valuesField}
                    ref={formRef}
                    encType="multipart/form-data"
                >

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
                                        name='organization.ru'
                                        label={t('admin.letters-1')}
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
                                        name='type.ru'
                                        label={t('admin.letters-3')}
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
                                        name='organization.uz'
                                        label={t('admin.letters-1')}
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
                                        name='type.uz'
                                        label={t('admin.letters-3')}
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
                                        name='organization.en'
                                        label={t('admin.letters-1')}
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
                                        name='type.en'
                                        label={t('admin.letters-3')}
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
                            </Row>
                        </Tabs.TabPane>
                    </Tabs>

                    <Form.Item
                        name='file'
                        label={t('admin.letters-4')}
                    >
                        <Upload onChange={handleUpload}
                                maxCount={1}
                                beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        {image?(<Image width={200} src={image} style={{marginTop: '30px'}}/>):''}
                    </Form.Item>
                    <Col span={10}>
                        <Form.Item
                            name='order'
                            label={t('admin.logo-label1')}
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <div style={{marginTop: '20px'}}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </div>
                </Form>): ''
            }


        </NavBar>
    )
}
