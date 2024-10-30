import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Image, InputNumber,Upload, Calendar,  DatePicker, Space, Select, Checkbox} from 'antd';
import "antd/dist/antd.css";
import {ToastContainer, toast} from 'react-toastify'

import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../../References/Category/style";
import {Files, image_download, Photo, NewsCategories} from "../../../../api";
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
    const [fileList, setFileList] = useState([])

    //=====================================
    const [isActive, setActive] = useState();
    const [tagsBase, setTags] = useState([])
    const [tagsId, setTagsId] = useState([])
    //=====================================

    useEffect(()=>{
        NewsCategories.getAll().then((t)=>{
            if (t.data.content){
                let id = t.data.content.map((k)=>{
                if(k.active){return k.id}});
            setTagsId(id.filter(e=>e != undefined))
            //======
            let tagsTable = t.data.content.map((k)=>{
                if(k.active){return k.name[locale] || ""}});
            setTags(tagsTable.filter(e=>e != undefined))
            }
        })
        if(id){
            getPhoto()
        }

    },[])

    const onFinish = (values)=>{
        let name = {}
        let categories = []

        if(values.titleRu) name["ru"] = values.titleRu;
        if(values.titleEn) name["en"] = values.titleEn;
        if(values.titleUz) name["uz"] = values.titleUz;

        let active = isActive

        let indexArrayTags = values.tag.map((a)=>{return tagsBase.indexOf(a)})
        categories = indexArrayTags.map((i)=>{return tagsId[i]})
        
        if(Object.keys(name).length<3&&!id || isActive===undefined){
            setShowAlert(true)
        }else{
            const data = {
                name,
                active,
                categories
            }
            document.getElementById("submit").disabled = true;
            if(!id && fileList.length){
                Photo.createPhoto(data)
                    .then(async(result)=>{
                        if(dataFile){
                            await fileUpload(dataFile, result.data.id, 'photos')
                            .then(uploadRes=>{
                                Photo.updatePhoto(result.data.id, {...data, fileId:uploadRes.data.id})
                                .then(()=>{
                                    toast.success(t("admin.main.alert2"))
                                    setTimeout(()=>{
                                        navigate(`/admin/main/photo`)
                                    }, 1000)
                                })
                                
                            })
                        }
                        setShowAlert(false)
                                toast.success(t("admin.main.alert2"))
                                setTimeout(()=>{
                                    navigate(`/admin/main/photo`)
                                }, 500)
                    })
            }else{
               if (fileList.length) {
                   Photo.updatePhoto(id, data)
                       .then(async(result)=>{
                           if(dataFile){
                               await fileUpload(dataFile, result.data.id, 'photos')
                                   .then(uploadRes=>{
                                       Photo.updatePhoto(result.data.id, {...data, fileId:uploadRes.data.id})
                                           .then(()=>{
                                               document.getElementById("submit").disabled = false;
                                               toast.success(t("admin.main.alert3"))
                                               setTimeout(()=>{
                                                   navigate(`/admin/main/photo`)
                                               }, 1000)
                                           })

                                   })
                           }else{
                               toast.success(t("admin.main.alert3"))
                               setTimeout(()=>{
                                   navigate(`/admin/main/photo`)
                               }, 500)
                           }

                       })
               }
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
               setActive(result.data.active)
                if(result.data.name){
                    data.title = {}
                data.titleRu = result.data.name.ru
                data.titleEn = result.data.name.en
                data.titleUz = result.data.name.uz
                }
                if (result.data.categories){
                    data.tag = result.data.categories.map((m)=>{if(m.active){return m.name[locale]}}).filter(e=>e != undefined)
                }
                if(result.data.file){
                    setImage(`${image_download}?fileKey=${result.data.file.url}`)
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
        return Files.uploadFile(data, id, entity).then((result)=>{ return  result})
    }

    const handleUpload = async(val)=>{
        setImage(null)
        if(val.fileList.length && val.file.size <2000000){
            setDataFile(val.file)
            setFileList(val.fileList)
        }else{
            setDataFile(null)
            alert("Файл должен быть меньше 2 мб")
        }
    }

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
                        label={t('admin.main.photo2')}
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
                        label={t('admin.main.photo2')}
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
                        label={t('admin.main.photo2')}
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
        <Col className="col-12 px-4" >
                <Form.Item name='tag'
                        label={t('admin.main3')}
                        rules={[{required: true}]}>
                <Select mode="tags" 
                        style={{ width: '100%' }} 
                        placeholder="Tags">
                    {tagsBase ? tagsBase.map(el => <Select key={el}>{el}</Select>) : ""}
                </Select>
            </Form.Item>
        </Col>
            <Col className="col-12 px-4" >
                <Form.Item name='active'>
                    {t('admin.main.authors3')}
                    <Select className="my-2" onChange={(e)=>{setActive(e)}} defaultValue={isActive ? isActive.toString() : ""} id="q">
                        <Option value="true">Да</Option>
                        <Option value="false">Нет</Option>
                    </Select>
                </Form.Item>
            </Col>

        <Col className="col-12 col-md-6 col-lg-3 px-4" >
            <Form.Item
                name='file'
                label={t('admin.main10')}
            >
                    <Upload onChange={handleUpload}
                            maxCount={1}
                            beforeUpload={() => false}
                            fileList={fileList}
                            >
                        <Button icon={<UploadOutlined />} >Click to Upload</Button>
                    </Upload>
                    {image?(<Image width={200} src={image} style={{marginTop: '30px'}}/>):''}
                </Form.Item>
            </Col>
        </Row>
            <div className="p-4">
                <Button id="submit" type="primary" disabled={!fileList.length} htmlType="submit" >Submit</Button>
            </div>                  
            </Form>): ''}
        </NavBar>
    </AdminPanel>
    )
}


