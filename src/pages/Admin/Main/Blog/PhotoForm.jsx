import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Image, InputNumber,Upload, Calendar,  DatePicker, Space, Select, Checkbox} from 'antd';
import "antd/dist/antd.css";

import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../../References/Category/style";
import {Files, image_download, Photo} from "../../../../api";
import { UploadOutlined  } from '@ant-design/icons'
import {AdminPanel} from "../styles/index"

export default function FormEmployee(props){

    const { TextArea } = Input;
    const { Option } = Select;
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

    //=====================================
    const [authorArray, setAuthorArray] = useState([]);
    //=====================================

    useEffect(()=>{
        if(id){
            getPhoto()
        }

    },[])

    const onFinish = (values)=>{
        let name = {}
        let photos = [0]
        name["ru"] = values.titleRu
        name["en"] = values.titleEn
        name["uz"] = values.titleUz
        
        if(1<0){
            setShowAlert(true)
        }else{
            const data = {
                name,
                photos,
            }
            if(!id){
                Photo.createPhoto(data)
                    .then(async(result)=>{
                        if(dataFile){ await fileUpload(dataFile, result.data.id, 'photos')
                        .then(()=>{
                           
                        })
                    }
                        fileUpload(dataFile, result.data.id, 'photos')
                            .then(()=>{
                                setShowAlert(false)
                                setShowAlertSuccess(true)
                                formRef.current.resetFields();
                                setTimeout(()=>{
                                    navigate(`/admin/main/photo`)
                                }, 500)
                            })
                    })
            }else{
                Photo.updatePhoto(id, data)
                    .then((result)=>{
                        if(dataFile){
                            fileUpload(dataFile, result.data.id, 'photos')
                                .then(()=>{
                                    setShowAlert(false)
                                    setShowAlertSuccess(true)
                                    setTimeout(()=>{
                                        navigate(`/admin/main/photo`)
                                    }, 500)
                                })
                        }else{
                            setShowAlert(false)
                            setShowAlertSuccess(true)
                            setTimeout(()=>{
                                navigate(`/admin/main/photo`)
                            }, 500)
                        }

                    })
            }
        }
    }

    const getPhoto = ()=>{
        Photo.getPhoto(id)
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
               
                if(result.data.name){
                data.titleRu = result.data.name.ru
                data.titleEn = result.data.name.en
                data.titleUz = result.data.name.uz
                }
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
        <AdminPanel>
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
                    <Button type='primary' onClick={()=>navigate(`/admin/main/photo`)}>{t('admin.logo-button2')}</Button>
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

        <Tabs.TabPane tab={'Русский'} key={0}>
            <Row>
                <Col className="col-12 col-lg-8 p-4">
                    <Form.Item
                        name= {`titleRu`}
                        label={t('admin.main1')}
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
        <Tabs.TabPane tab={'Английский'} key={1}>
            <Row>
                <Col className="col-12 col-lg-8 p-4">
                    <Form.Item
                        name= {`titleEn`}
                        label={t('admin.main1')}
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
        <Tabs.TabPane tab={'Узбекский'} key={2}>
            <Row>
                <Col className="col-12 col-lg-8 p-4">
                    <Form.Item
                        name= {`titleUz`}
                        label={t('admin.main1')}
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
           
           
            <Row >
                
                <Col className="col-12 col-md-6 col-lg-3 px-4" >
                    <Form.Item
                        name='file'
                        label={t('admin.main10')}
                    >
                        <Upload onChange={handleUpload}
                              
                               >
                            <Button icon={<UploadOutlined />} >Click to Upload</Button>
                        </Upload>
                        {image?(<Image width={200} src={image} style={{marginTop: '30px'}}/>):''}
                    </Form.Item>
                </Col>
            </Row>
                <div className="p-4">
                    <Button type="primary" htmlType="submit">Submit</Button>
                </div>                  
                </Form>): ''}
            </NavBar>
        </AdminPanel>
    )
}


