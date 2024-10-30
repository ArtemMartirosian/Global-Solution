import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Col, Tabs, Select, InputNumber,Upload, Image } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../References/Category/style";
import {NetworkLogo, Files, Categories, image_download} from "../../../api";
import { UploadOutlined  } from '@ant-design/icons'


export default function FormNetwork(props){
    const {locale} = props
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()
    const [valuesField, setValuesField] = useState({})
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState(null)
    const [dataFile, setDataFile] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)

    useEffect(()=>{
        if(id){
            getLogo()
        }
        getCategories()
    },[])

    const onFinish = (values)=>{

        let name = {}
        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')
            if(key.match('name')){
                name[lang] = values[key]
            }
        }
        if(Object.keys(name).length<3&&!id){
            setShowAlert(true)
        }else{
            const data = {
                name: name,
                order: values.order,
                category: 'http://global-api.globaltrans.uz/categories/'+values.category
            }
            if(!id){
                NetworkLogo.createLogo(data)
                    .then((result)=>{
                        fileUpload(dataFile, result.data.id, 'logo')
                            .then(()=>{
                                setShowAlert(false)
                                setShowAlertSuccess(true)
                                formRef.current.resetFields();
                                setTimeout(()=>{
                                    navigate(`/admin/network`)
                                }, 500)
                            })
                    })
            }else{
                NetworkLogo.updateLogo(id, data)
                    .then((result)=>{
                        if(dataFile){
                            fileUpload(dataFile, result.data.id, 'logo')
                                .then(()=>{
                                    setShowAlert(false)
                                    setShowAlertSuccess(true)
                                    formRef.current.resetFields();
                                    setTimeout(()=>{
                                        navigate(`/admin/network`)
                                    }, 500)
                                })
                        }else{
                            setShowAlert(false)
                            setShowAlertSuccess(true)
                            formRef.current.resetFields();
                            setTimeout(()=>{
                                navigate(`/admin/network`)
                            }, 500)
                        }

                    })
            }
        }


    }

    const getCategories = ()=>{
        Categories.getAll({page: 0})
            .then(result=>{
                setCategories(result.data.content)
            })
    }



    const getLogo = ()=>{
        NetworkLogo.getLogo(id)
            .then(result=>{

                let data = {}
                let lang = ['ru', 'uz', 'en']
                for(let key in result.data){
                    if(key.match(/name/)){
                        lang.forEach(item=>{
                            data[`${key}.${item}`] = result.data[key][item] || ''
                        })
                    }

                }
                data['order'] = result.data.order
                data['category'] = result.data.category.id+''
                setValuesField(data)
                if(result.data.fileId){
                    setImage(`${image_download}?fileKey=${result.data.fileId.url}`)
                }

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
                <Link to={`/admin/network`}>{t('admin.logo-button2')}</Link>
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
                    <Form.Item
                        name='category'
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Select placeholder={t('admin.logo-select')}>
                            {
                                categories.map((item,index)=>{
                                    return(
                                        <Select.Option key={index} value={item.id+''}>{item.name[locale]}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Tabs>
                        <Tabs.TabPane tab='Русский' key="1">

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
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='Узбекский' key="2">
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
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='Английский' key="3">
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
