import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import {EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Form, Input, Button, Row, Col, Tabs, Select, InputNumber,Upload, Image  } from 'antd';

import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../References/Category/style";
import {ExperienceApi, Files, image_download, TagsApi} from "../../../api";
import { UploadOutlined  } from '@ant-design/icons'


export default function FormExperience(props){
    const {locale} = props
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()
    const [valuesField, setValuesField] = useState({})
    const [tags, setTags] = useState([])
    const [image, setImage] = useState(null)
    const [dataFile, setDataFile] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [tagsArr, setTagsArr] = useState([])
    const [responseData, setResponseData] = useState(null)

    const [editorStateRu, setEditorStateRU] = useState(EditorState.createEmpty())
    const [editorStateUz, setEditorStateUz] = useState(EditorState.createEmpty())
    const [editorStateEn, setEditorStateEn] = useState(EditorState.createEmpty())

    const options = ['inline', 'blockType', 'list', 'link', 'embedded', 'remove', 'history']

    useEffect(()=>{
        if(id){
            getExperience()
        }
        getTags()
    },[])

    useEffect(()=>{
        if(showAlertSuccess){
            formRef.current.resetFields();
        }
    }, [showAlertSuccess])

    useEffect(()=>{
        if(tags.length&&valuesField.tags){
            tagsInput(valuesField.tags)
        }
    }, [tags, valuesField])

    const getTags = ()=>{
        TagsApi.getAll({page:0})
            .then(result=>{
                if(result.data.content.length && result.data.content[0].id)
                setTags(result.data.content)
            })
    }

    const onFinish = (values)=>{

        let name = {}
        let description = {}

        for(let key in values){
            let lang = key.match('ru')?'ru':(key.match('uz')?'uz':'en')
            if(key.match('name')){
                name[lang] = values[key]
            }
            if(key.match('description')){
                if(draftToHtml(values[key])!==''){
                    description[lang] = draftToHtml(values[key])
                }
            }

        }
        if(Object.keys(name).length<3&&Object.keys(description).length<3&&!id){
            setShowAlert(true)
        }else{
            let data_tags = []

            for(let val in values){
                if(val.indexOf('tag')>=0){
                    let tag_object = {}
                    let id = val.match(/\d+/g)?Number(val.match(/\d+/g)[0]):null
                    if(id){
                        tag_object.link = values[val]
                        tag_object.tag = tags.filter(item=>item.id===id).length?{name: tags.filter(item=>item.id===id)[0].name}:{}
                        data_tags.push(tag_object)
                    }

                }
            }


            const data = {
                name: name,
                description: description,
                tags: data_tags,
                order: values.order
            }

            if(!id){
                ExperienceApi.createExperience(data)
                    .then((result)=>{
                        fileUpload(dataFile, result.data.id, 'experience')
                            .then(()=>{
                                setShowAlert(false)
                                setShowAlertSuccess(true)

                                setEditorStateRU('')
                                setEditorStateUz('')
                                setEditorStateEn('')
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                })
                                setTimeout(()=>{
                                    navigate(`/admin/experience`)
                                }, 500)
                            })

                    })

            }else{
                let dataTest = responseData

                for(let val in data){
                    let lang_arr = Object.keys(data[val])
                    if(val==='description'||val==='name'){
                        lang_arr.forEach(item=>{
                            dataTest[val][item] = data[val][item]
                            delete data[val][item]
                        })
                    }else{
                        dataTest[val] = data[val]
                    }

                }



                dataTest = Object.assign(data, dataTest)


                ExperienceApi.updateExperience(id, dataTest)
                    .then((result)=>{
                        if(dataFile){
                            fileUpload(dataFile, result.data.id, 'experience')
                                .then(()=>{
                                    setShowAlert(false)
                                    setShowAlertSuccess(true)
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    })
                                    setTimeout(()=>{
                                        navigate(`/admin/experience`)
                                    }, 500)
                                })
                        }else{
                            setShowAlert(false)
                            setShowAlertSuccess(true)
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })
                            setTimeout(()=>{
                                navigate(`/admin/experience`)
                            }, 500)
                        }

                    })
            }
        }


    }


    const getExperience = ()=>{
        ExperienceApi.getExperience(id)
            .then(result=>{

                let data = {}
                let lang = ['ru', 'uz', 'en']
                for(let key in result.data){
                    if(key.match(/name|description/)){
                        lang.forEach(item=>{
                            data[`${key}.${item}`] = result.data[key][item] || ''
                        })
                    }

                }

                if(result.data.description&&result.data.description.en){
                    setEditorStateEn(EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(result.data.description.en)
                        )))
                }
                if(result.data.description&&result.data.description.uz){
                    setEditorStateUz(EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(result.data.description.uz)
                        )))
                }
                if(result.data.description&&result.data.description.ru){
                    setEditorStateRU(EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(result.data.description.ru)
                        )))
                }



                data['order'] = result.data?.order
                data['tags'] = (result.data.tags||[]).map(item=>item.tag.id)



                let keys_data = ['name', 'description', 'order', 'tags']
                let new_data = {}
                for(let key in result.data){
                    keys_data.forEach(item=>{
                        if(key===item){
                            new_data[item] = result.data[key]
                        }
                    })
                }

                setResponseData(new_data)


                if(result.data.fileId){
                    setImage(`${image_download}?fileKey=${result.data.fileId.url}`)
                }
                setValuesField(data)
            })
    }

    const finishFailed = (err)=>{
        if(err.errorFields.length){
            setShowAlert(true)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
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

    const changeSelect = (val)=>{
        tagsInput( val)
    }

    const tagsInput = (tagsA)=>{

        let new_array = tagsA.map(item=>{
            return tags.filter(item_filter=>item_filter.id===item).length?tags.filter(item_filter=>item_filter.id===item)[0]:false
        });
        
        (responseData?.tags||[]).forEach(item=>{
            for(let i=0; new_array.length>i; i++){
                if(item.tag.id===new_array[i].id){
                    new_array[i].link = item.link
                }
            }
        })


        setTagsArr(new_array.map((item, index)=>{
            let tags_filter = tags.filter(itemTag=>itemTag.id===(item.tag?item.tag.id:item.id)),
            tag_link = tags_filter.length&&item.link?item.link:'',
            tag_name = tags_filter.length?tags_filter[0].name:'';

            return(
                <Form.Item name={`tag-${item.tag?item.tag.id:item.id}`} rules={[
                    {
                        required: true
                    }
                ]} label={`Введите ссылку для тега ${tag_name['ru']}`} key={index} initialValue={tag_link}>
                    <Input />
                </Form.Item>
            )
        }))
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
                <Link to={`/admin/experience`}>{t('admin.logo-button2')}</Link>
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
                    <Col span={6}>
                        <Form.Item
                            name='tags'
                            // rules={[
                            //     {
                            //         required: true
                            //     }
                            // ]}
                        >
                            <Select  mode="multiple" placeholder={t('admin.experience-2')} onChange={(e)=>changeSelect(e)}>
                                {
                                    tags.map((item,index)=>{

                                        return(
                                            <Select.Option key={index} value={item.id}>{item.name[locale]?item.name[locale]:''}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Col>
                    <div id='tags-input'>{tagsArr.length?tagsArr:''}</div>
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
                                <Col span={24}>
                                    <Form.Item name='description.ru'>
                                        <Editor
                                            editorStyle={{background: '#ffff', padding: '10px 15px', marginBottom: '30px'}}
                                            toolbar = {{options}}
                                            editorState={editorStateRu}
                                            onEditorStateChange={(editorState)=>setEditorStateRU(editorState)}
                                        />
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
                                <Col span={24}>
                                    <Form.Item name='description.uz'>
                                        <Editor
                                            editorStyle={{background: '#ffff', padding: '10px 15px', marginBottom: '30px'}}
                                            toolbar = {{options}}
                                            editorState={editorStateUz}
                                            onEditorStateChange={(editorState)=>setEditorStateUz(editorState)}
                                        />
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
                                <Col span={24}>
                                    <Form.Item name='description.en'>
                                        <Editor
                                            editorStyle={{background: '#ffff', padding: '10px 15px', marginBottom: '30px'}}
                                            toolbar = {{options}}
                                            editorState={editorStateEn}
                                            onEditorStateChange={(editorState)=>setEditorStateEn(editorState)}
                                        />
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
