import React, {useState, useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Image ,Upload, Select} from 'antd';
import "antd/dist/antd.css";
import {ToastContainer, toast} from 'react-toastify'

import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../../References/Category/style";
import {Files, image_download, Authors} from "../../../../api";
import { UploadOutlined  } from '@ant-design/icons'
import {AdminPanel} from "../styles/index"

const languages = [
    {"id": "1", "lang" : "Русский", "domen" : "ru"},
    {"id": "2","lang" : "Узбекский", "domen" : "uz"},
    {"id": "3","lang" : "Английский", "domen" : "en"},
]

export default function FormAuthors(props){
    const { TextArea } = Input;
    const { Option } = Select;
    const {locale} = props
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()

    //=====================================
    const [valuesField, setValuesField] = useState({})
    const [image, setImage] = useState(null)
    const [dataFile, setDataFile] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [isActive, setActive] = useState();
    //=====================================

    useEffect(()=>{
        if(id){
            getAuthor()
        }
    },[])

    const onFinish = (values)=>{

        let firstname = {};
        let position = {};
        let lastname = {};
        let active = isActive;
        let photoId = 0;
        
        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')

            if(key.match('firstname')){
                firstname[lang] = values[key]
            }
            if(key.match('lastname')){
                lastname[lang] = values[key]
            }
            if(key.match('position')){
                position[lang] = values[key]
            }
        }

        if(Object.keys(firstname).length<3&&Object.keys(lastname).length<3&&Object.keys(position).length&&!id || isActive===undefined){
            setShowAlert(true)
        }else{
            const data = {
                active: active,
                firstname: firstname,
                lastname: lastname,
                position: position,
                photoId
            }
            document.getElementById("submit").disabled = true;
            if(!id){
                Authors.createAuthor(data)
                    .then(async(result)=>{
                        if(dataFile){
                            await fileUpload(dataFile, result.data.id, 'authors')
                            .then(uploadRes=>{
                                Authors.updateAuthor(result.data.id, {...data, photoId:uploadRes.data.id})
                                .then(()=>{
                                    toast.success("Успешно создано")
                                    setTimeout(()=>{
                                        navigate(`/admin/main/authors`)
                                    }, 1000)
                                })
                                
                            })
                        }
                        setShowAlert(false)
                                toast.success("Успешно изменено")
                                setTimeout(()=>{
                                    navigate(`/admin/main/authors`)
                                }, 500)
                    })
            }else{
                Authors.updateAuthor(id, data)
                    .then(async(result)=>{
                        if(dataFile){
                            await fileUpload(dataFile, result.data.id, 'authors')
                            .then(uploadRes=>{
                                Authors.updateAuthor(result.data.id, {...data, photoId:uploadRes.data.id})
                                .then(()=>{
                                    toast.success("Успешно создано")
                                    setTimeout(()=>{
                                        navigate(`/admin/main/authors`)
                                    }, 1000)
                                })
                                
                            })
                        }else{
           //                 setShowAlert(false)
                            toast.success("Успешно создано")
             //               setShowAlertSuccess(true)
                            setTimeout(()=>{
                                navigate(`/admin/main/authors`)
                            }, 500)
                        }

                    })
            }
        }
    }
    const getAuthor = ()=>{
        Authors.getAuthor(id)
            .then(result=>{
                setActive(result.data.active)

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
                data.active = result.data.active
                if(result.data.photo){
                    setImage(`${image_download}?fileKey=${result.data.photo.url}`)
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
        return Files.uploadFile(data, id, entity).then((result)=>{return result})
    }

    const handleUpload = async(val)=>{
        setImage(null)
        if(val.fileList.length){
            setDataFile(val.file)
        }else{
            setDataFile(null)
        }
    }

//============
    return(
        <AdminPanel>
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
                    <Button type='primary' onClick={()=>navigate(`/admin/main/authors`)}>{t('admin.logo-button2')}</Button>
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
        {languages.map(el =>
        <Tabs.TabPane tab={el.lang} key={el.id}>
            <Row className="py-4">
                <Col className="col-sm-12 col-md-4 px-4">
                    <Form.Item
                        name= {`firstname.${el.domen}`}
                        label={t('admin.main.authors1')}
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
                <Col className="col-sm-12 col-md-4 px-4">
                    <Form.Item
                        name= {`lastname.${el.domen}`}
                        label={t('admin.main.authors6')}
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
                <Col className="col-sm-12 col-md-4 px-4">
                    <Form.Item
                        name= {`position.${el.domen}`}
                        label={t('admin.main.authors2')}
                        rules={[
                            {
                                required: true,
                                min: 2,
                            }
                        ]}
                    >
                            <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Tabs.TabPane>)}
    </Tabs>             

            <Row>
                {/* 
                <Col className="col-sm-12 col-md-6 col-lg-4 px-4">
                    <Form.Item name='calendar' label={t('admin.main7')} rules={[{required: true}]}>
                        <DatePicker showTime onChange={onChange} onOk={onOk} />
                    </Form.Item>
                </Col> */}
                <Col className="col-sm-12 col-md-6 col-lg-4 px-4">
                    <Form.Item name='active'>
                        {t('admin.main.authors3')}
                        <Select className="my-2" onChange={(e)=>{setActive(e)}} defaultValue={isActive ? isActive.toString() : ""}>
                            <Option value="true">Да</Option>
                            <Option value="false">Нет</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col className="col-sm-12 col-md-6 col-lg-4 px-4">
                <Form.Item
                        name='file'
                        label={t('admin.main10')}
                    >
                        <Upload onChange={handleUpload}
                                maxCount={1}
                                beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} >Click to Upload</Button>
                        </Upload>
                        {image?(<Image width={200} src={image} style={{marginTop: '30px'}}/>):''}
                    </Form.Item>
                </Col>
            </Row>
                <div className="p-4">
                    <Button type="primary" htmlType="submit" id="submit">Submit</Button>
                </div>                  
                </Form>): ''}
            </NavBar>
        </AdminPanel>
    )
}



  