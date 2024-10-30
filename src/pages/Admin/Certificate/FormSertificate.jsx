import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Image , InputNumber,Upload  } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../References/Category/style";
import {Licenses, image_download, Files} from "../../../api";
import { UploadOutlined  } from '@ant-design/icons'
import {findGetParameter} from "../../../assets/scripts";


export default function FormSertificate(props){
    const {locale} = props
    const params = useParams()
    const navigate = useNavigate()
    const type = findGetParameter('type')
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()
    const [valuesField, setValuesField] = useState({})
    const [image, setImage] = useState(null)
    const [dataFile, setDataFile] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    var link_return = `/${locale}/admin/certificate?type=global_site`

    if(type&&type!=='null'){
        link_return = type==='global_id'?`/admin/global-id/certificate?type=${type}`:`/admin/global-pay/certificate?type=${type}`
    }




    useEffect(()=>{
        if(id){
            getLicenses()
        }

    },[])

    const onFinish = (values)=>{

        let name = {}
        let org = {}

        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')

            if(key.match('name')){
                name[lang] = values[key]

            }
            if(key.match('org')){
                org[lang] = values[key]

            }

        }


        if(Object.keys(name).length<3&&Object.keys(org).length<3&&!id){
            setShowAlert(true)
        }else{

            const data = {
                name: name,
                org: org,
                order: values.order,
                adminPanel: type?findGetParameter('type').toUpperCase():''
            }
            if(!id){
                Licenses.createLicenses(data)
                    .then(result=>{
                        fileUpload(dataFile, result.data.id, 'license')
                            .then(()=>{
                                setShowAlert(false)
                                setShowAlertSuccess(true)
                                formRef.current.resetFields();
                                setTimeout(()=>{
                                    navigate(link_return)
                                }, 500)
                            })
                    })

            }else{
                Licenses.updateLicenses(id, data)
                    .then((result)=>{
                        if(dataFile){
                            fileUpload(dataFile, result.data.id, 'license')
                                .then(()=>{
                                    setShowAlert(false)
                                    setShowAlertSuccess(true)
                                    setTimeout(()=>{
                                        navigate(link_return)
                                    }, 500)
                                })
                        }else{
                            setShowAlert(false)
                            setShowAlertSuccess(true)
                            setTimeout(()=>{
                                navigate(`/admin/certificate`)
                            }, 500)
                        }
                    })
            }
        }


    }



    const getLicenses = ()=>{
        Licenses.getLicenses(id)
            .then(result=>{

                let data = {}
                let lang = ['ru', 'uz', 'en']
                for(let key in result.data){
                    if(key.match(/name|org/)){
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
                <Link to={link_return}>{t('admin.logo-button2')}</Link>
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
                                        name='org.ru'
                                        label={t('admin.experience-1')}
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
                                        name='org.uz'
                                        label={t('admin.experience-1')}
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
                                        name='org.en'
                                        label={t('admin.experience-1')}
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
