import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Image, InputNumber,Upload } from 'antd';


import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../References/Category/style";
import {Files, image_download, Teams} from "../../../api";
import { UploadOutlined  } from '@ant-design/icons'


export default function FormEmployee(props){
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
            getTeam()
        }
    },[])

    const onFinish = (values)=>{

        let name = {}
        let position = {}
        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')
            if(key.match('name')){
                name[lang] = values[key]
            }
            if(key.match('position')){
                position[lang] = values[key]
            }
        }
        if(Object.keys(name).length<3&&Object.keys(position).length<3&&!id){
            setShowAlert(true)
        }else{
            const data = {
                name: name,
                position: position,
                order: values.order
                
            }
            if(!id){
                Teams.createEmployee(data)
                    .then((result)=>{
                        fileUpload(dataFile, result.data.id, 'team')
                            .then(()=>{
                                setShowAlert(false)
                                setShowAlertSuccess(true)
                                formRef.current.resetFields();
                                setTimeout(()=>{
                                    navigate(`/admin/team`)
                                }, 500)
                            })
                    })
            }else{
                Teams.updateEmployee(id, data)
                    .then((result)=>{
                        if(dataFile){
                            fileUpload(dataFile, result.data.id, 'team')
                                .then(()=>{
                                    setShowAlert(false)
                                    setShowAlertSuccess(true)
                                    setTimeout(()=>{
                                        navigate(`/admin/team`)
                                    }, 500)
                                })
                        }else{
                            setShowAlert(false)
                            setShowAlertSuccess(true)
                            setTimeout(()=>{
                                navigate(`/admin/team`)
                            }, 500)
                        }

                    })
            }
        }


    }


    const getTeam = ()=>{
        Teams.getEmployee(id)
            .then(result=>{
                let data = {}
                let lang = ['ru', 'uz', 'en']
                for(let key in result.data){
                    if(key.match(/name|position/)){
                        lang.forEach(item=>{
                            data[`${key}.${item}`] = result.data[key][item] || ''
                        })
                    }
                }
                data.order = result.data.order

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
                <Link to={`/admin/team`}>{t('admin.logo-button2')}</Link>
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
                                        name='position.ru'
                                        label={t('admin.team-1')}
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
                                        name='position.uz'
                                        label={t('admin.team-1')}
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
                                        name='position.en'
                                        label={t('admin.team-1')}
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
                        label={t('admin.logo-label2')}
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


