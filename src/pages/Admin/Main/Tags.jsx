import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Image, InputNumber,Upload, Calendar,  DatePicker, Space, Select, Checkbox} from 'antd';
import "antd/dist/antd.css";

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../References/Category/style";
import {Files, image_download, Teams} from "../../../api";
import { UploadOutlined  } from '@ant-design/icons'
import {AdminPanel} from "./styles/index"


let data = {
    tags: ["aaa2233234234", "bbb42341", "ccc", "ddd34356789808765", "ee453353456e"],
    authors: ["Bersenev Sergei", "Rainbow Dahs", "Alisher Navoi", "Jenna"]
}

const languages = [
    {"id": "1", "lang" : "Русский", "domen" : "ru"},
    {"id": "2","lang" : "Узбекский", "domen" : "uz"},
    {"id": "3","lang" : "Английский", "domen" : "en"},
]

const tags = data.tags.map(el => <Select key={el}>{el}</Select>)
const authors = data.authors.map(el => <Select key={el}>{el}</Select>)


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
                                    navigate(`/${locale}/admin/team`)
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
                                        navigate(`/${locale}/admin/team`)
                                    }, 500)
                                })
                        }else{
                            setShowAlert(false)
                            setShowAlertSuccess(true)
                            setTimeout(()=>{
                                navigate(`/${locale}/admin/team`)
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


//=========== It's neccesary
function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }
  
  function onOk(value) {
    console.log("onOk: ", value);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
//============
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
                    <Link to={`/${locale}/admin/team`}>{t('admin.logo-button2')}</Link>
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
                <Col className="col-sm-12 col-md-6 px-4">
                    <Form.Item
                        name= {`name.${el.domen}`}
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
                <Col className="col-sm-12 col-md-6 px-4">
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
            <Row>
                {/* {<Col className="col-md-12 col-lg-4 p-4">
                    <Form.Item name='namea' label={t('admin.main7')} rules={[{required: true}]}>
                        <DatePicker showTime onChange={onChange} onOk={onOk} />
                    </Form.Item>
                    <Form.Item name='makeActive'>
                        {t('admin.main5')}
                        <Select defaultValue="Нет" onChange={handleChange} className="my-2">
                            <Option value="jack">Да</Option>
                            <Option value="lucy">Нет</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='makeElected'>
                        {t('admin.main6')}
                        <Select defaultValue="Нет" onChange={handleChange} className="my-2">
                            <Option value="jack">Да</Option>
                            <Option value="lucy">Нет</Option>
                        </Select>
                    </Form.Item>
                </Col>} */}
            </Row>
        </Tabs.TabPane>)}
    </Tabs>             

            <Row>
                <Col className="col-sm-12 col-md-6 col-lg-4 px-4">
                    <Form.Item name='namea' label={t('admin.main7')} rules={[{required: true}]}>
                        <DatePicker showTime onChange={onChange} onOk={onOk} />
                    </Form.Item>
                </Col>
                <Col className="col-sm-12 col-md-6 col-lg-4 px-4">
                    <Form.Item name='makeActive'>
                        {t('admin.main.authors3')}
                        <Select defaultValue="Нет" onChange={handleChange} className="my-2">
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
                    <Button type="primary" htmlType="submit">Submit</Button>
                </div>                  
                </Form>): ''}
            </NavBar>
        </AdminPanel>
    )
}


