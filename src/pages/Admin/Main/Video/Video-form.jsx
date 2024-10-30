import React, {useState, useEffect, useRef} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Form, Input, Button, Row, Col, Tabs, Upload, DatePicker, Select, Progress, Image} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment'
import {ToastContainer, toast} from 'react-toastify'

import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../../References/Category/style";
import {languagesSplit, setLanguagesValues} from "../../../../assets/scripts";
import { UploadOutlined  } from '@ant-design/icons'

//api
import {Files, image_download, Videos, NewsCategories, Authors, VideoClient} from "../../../../api";


//styles
import {RenderImagePrev, LoaderProgress, SpinLoader} from "./style";
import {AdminPanel} from "../styles/index"

const languages = [
    {"id": "1", "lang" : "Русский", "domen" : "ru"},
    {"id": "2","lang" : "Узбекский", "domen" : "uz"},
    {"id": "3","lang" : "Английский", "domen" : "en"},
]

export default function FormEmployee(props){
    const { Option } = Select;
    const {locale} = props
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()


    const [videoIsCreated, setVideoIsCreated] = useState(null)
    const [imagePrevLoad, setImagePrevLoad] = useState(false)
    const [percentProgress, setPercentProgress] = useState(0)
    const [typeImageUpload, setTypeImageUpload] = useState('upload')
    const [entity, setEntity] = useState(null)
    const [loading, setLoading] = useState(false)
    const [authors, setAuthors] = useState([])
    const [dataEdit, setDataEdit] = useState(null)
    const [disables, setDisables] = useState(false)

    //=====================================

    const [date, setDate] = useState()
    const [dataFilePhoto, setDataFilePhoto] = useState(null)
    const [dataFileVideo, setDataFileVideo] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [tagsBase, setTags] = useState([])
    //=====================================

    useEffect(()=>{
        NewsCategories.getAll().then((t)=>{
            if (t.data.content){

            setTags((t.data.content||[]).map(item=>{
                return{
                    value: item.id,
                    name: item.name[locale]
                }
            }))
            }
        })

        Authors.getAll({size: 100})
            .then(result=>{
                setAuthors(result?.data?.content?result?.data?.content.map(item=>{
                    return{
                        name: item.firstname[locale]??item.firstname['ru']+' '+item.lastname[locale]??item.lastname['ru'],
                        value: item.id
                    }
                }):[])
            }).catch(err=>{
            })

    },[])

    useEffect(()=>{
        if(id){
            VideoClient.getOne(id)
                .then(result=>{
                    let dataLang = setLanguagesValues(result.data)

                    formRef.current.setFieldsValue({
                        "name.ru": dataLang?.['name.ru']??'',
                        "name.uz": dataLang?.['name.uz']??'',
                        "name.en": dataLang?.['name.en']??'',
                        authorId: result?.data?.author?.id??0,
                        tag: (dataLang?.categories||[]).map(item=>item.id),
                        active: dataLang?.active??false,
                        publishedDate: moment(dataLang.createdDate, 'YYYY-MM-DD hh:mm'),
                        likes: dataLang?.likes??0,
                        dislikes: dataLang?.dislikes??0,
                        views: dataLang?.views??0
                    });
                    setDataEdit(result.data)

                }).catch(err=>{})

        }
    }, [id])

    const onFinish = async (values)=>{


        let valueData = languagesSplit(values)

        if(Object.keys(languagesSplit(values).name).length<3&&!id){
            setShowAlert(true)
        }else{
            const data = {
                name: valueData?.name??'',
                active: valueData?.active??false,
                publishedDate: date || '2022-04-15T06:37:35.682Z',
                categories: valueData?.tag??[],
                top: false,
                fileId: 0,
                authorId: valueData?.authorId??0,
                photos: [],
                likes: valueData?.likes||0,
                dislikes: valueData?.dislikes||0,
                views: valueData?.views||0
            }
           setLoading(true)
            if(!id){

                if(dataFileVideo){
                    Videos.createVideo(data)
                    .then(result=>{
                        if(dataFileVideo?.size<=104857600){
                             fileUpload(dataFileVideo, result.data.id, 'video')
                            .then((videoResp)=>{
                                 Videos.updateVideo(result.data.id, {...data, fileId: videoResp.data.id})
                                     .then(result=>{

                                        setLoading(false)

                                     })
                                setEntity({...data, fileId: videoResp.data.id, id: result.data.id})
                                 setVideoIsCreated(videoResp.data, {...data, fileId: videoResp.data.id})


                            }).catch(err=>{
                                    setLoading(false)
                                    toast.error('Загрузите корректно видео')
                                })
                        }else{
                            setLoading(false)
                            toast.error('Видео не должно превышать 100мб')
                        }



                    }).catch(err=>{
                            setLoading(false)
                        })
                }else{
                    toast.error('Загрузите видео')
                    setLoading(false)
                }


            }else{


                if(!dataFileVideo&&!dataFilePhoto){
                    data.fileId = dataEdit.file?dataEdit.file.id:0
                    data.photos = dataEdit.photos?dataEdit.photos.map(item=>item.id):[]
                }else{
                    if(dataFileVideo) {
                        if (dataFileVideo?.size <= 104857600) {
                            await fileUpload(dataFileVideo, id, 'video')
                                .then((videoResp) => {
                                    data.fileId = videoResp.data ? videoResp.data.id : 0
                                }).catch(err => {
                                    setLoading(false)
                                })
                        }else{
                         toast.error('Видео не должно превышать 100мб')
                        }
                    }

                    if(dataFilePhoto){
                        await fileUpload(dataFilePhoto, id, 'photos')
                            .then((photoResp)=>{
                                data.photos = photoResp.data?[photoResp.data.id]:0
                            }).catch(err=>{
                                    setLoading(false)
                            })
                    }
                }

                Videos.updateVideo(id, data)
                    .then(result=>{
                        if(disables){
                            setVideoIsCreated(result.data)
                        setEntity({...data, fileId: result.data.fileId, id: id})
                        setLoading(false)
                        }else{
                            toast.success("Успешно создано")
                            setTimeout(()=>{
                                navigate(`/admin/main/video`)
                            }, 500)
                        }

                    }).catch(e=>{
                        setLoading(false)
                })

            }
        }
    }



    const finishFailed = (err)=>{
        if(err.errorFields.length){
            setShowAlert(true)
        }
    }

    const fileUpload = async(file, id, entity) => {

        const data = new FormData()
        data.append('file', file)
        return Files.uploadFile(data, id, entity)
            .then(result=>result)
    }

    const handleUploadVideo = async(val)=>{

        if(val.fileList.length){
            setDisables(true)
            let renderPrev = document.getElementById('render-preview')
            if(renderPrev) renderPrev.innerHTML = ''
            setDataFileVideo(val.file)
        }else{
            setDisables(false)
            setDataFileVideo(null)
        }
    }



    const handleUpload = async(val, type='upload')=>{


        let parentEl = document.getElementById('render-preview')
        let elems = []
        if(parentEl) elems = Array.from(parentEl.querySelectorAll('div'))
        setTypeImageUpload(type)
        if(type==='upload'){
            if(val.fileList.length){
                setDataFilePhoto(val.file)
                elems.forEach(item=>{
                  if(item.classList.contains('active')){
                      item.classList.remove('active')
                  }
                })
            }else{
                setDataFilePhoto(null)
            }
        }else{
            setDataFilePhoto(val)
        }
    }


    function setImageVideo(){

        if(dataFilePhoto){
            let id = entity.id
        delete entity.id
        if(entity){
            setLoading(true)
            fileUpload(dataFilePhoto, id, 'photos')
                .then(result=>{

                    Videos.updateVideo(id, {...entity, photos: [result.data.id]})
                        .then(()=>{
                            toast.success("Успешно создано")
                            setLoading(false)
                            setTimeout(()=>{
                                navigate(`/admin/main/video`)
                            }, 500)
                        }).catch(err=>{
                            setLoading(false)
                        })
                }).catch(err=>{
                    setLoading(false)
            })
        }
        }else{
            toast.error('Загрузите обложку к видео')
        }

    }

    async function getImagesVideo(){

        document.getElementById('video').pause();
        document.getElementById('video').currentTime = 0;
        document.getElementById('video').load();
        document.getElementById('video').play()

        const arrSec = [2000, 4000, 5000, 6000]
        setImagePrevLoad(true)
        const randomSec = Math.floor(Math.random() * (3 - 1) + 1)
        let renderPrev = document.getElementById('render-preview')
        renderPrev.innerHTML = ''
        let count = 1


        let timerId = setInterval(() => {
            capture()
            setPercentProgress(count*25)
            count++
        }, arrSec[randomSec]);
        setTimeout(() => { clearInterval(timerId); setImagePrevLoad(false); setPercentProgress(0)  }, arrSec[randomSec]*4);
    }


  async function capture(){

      let canvas = document.getElementById('canvas')
      let renderPrev = document.getElementById('render-preview')
      let width = document.getElementById('video').videoWidth
      let height = document.getElementById('video').videoHeight
      canvas.height = height
      canvas.width = width
      let ctx = document.getElementById('canvas').getContext("2d");
      ctx.drawImage(document.getElementById('video'), 0, 0, width, height);
      let div = document.createElement('div')
      div.classList.add('col-lg-3')

      let image = document.createElement('img')
      image.crossOrigin="anonymous"
      image.src = canvas.toDataURL()
      div.append(image)
      div.onclick = SelectImageScreen
      renderPrev.appendChild(div)

  }

  function SelectImageScreen(e){

        let elem = e.currentTarget

      let srcImg = elem.querySelector('img').getAttribute('src')
      let parentEl = document.getElementById('render-preview')
      const elems = Array.from(parentEl.querySelectorAll('div'))
      elems.forEach(item=>{
          if(item.classList.contains('active')){
              item.classList.remove('active')
          }
      })
      elem.classList.add('active')

      var arr = srcImg.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

      let file = new File([u8arr], 'file', {type:mime});
      handleUpload(file, 'blob')

  }
    return(
        <AdminPanel>
            <ToastContainer/>
            {
                imagePrevLoad?(<LoaderProgress>
                <Progress type="circle" percent={percentProgress}/>
                    <h3 className='mt-3'>Подождите пока загрузятся картинки</h3>
            </LoaderProgress>):''
            }
            <SpinLoader tip="Loading..." spinning={loading}>
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
                    <Button type='primary' onClick={()=>navigate(`/admin/main/video`)}>{t('admin.logo-button2')}</Button>
                </AdminHeader>
                <Form
                        layout="vertical"
                        onFinish={videoIsCreated?setImageVideo:onFinish}
                        style={{padding: '60px 20px'}}
                        onFinishFailed={finishFailed}
                        ref={formRef}
                        encType="multipart/form-data"
                    >
    <Tabs>
        {languages.map(el =>
        <Tabs.TabPane tab={el.lang} key={el.id} forceRender>
            <Row>
                <Col className="col-12 p-4">
                    <Form.Item
                        name= {`name.${el.domen}`}
                        label={t('admin.main.video2')}
                        rules={[
                            {
                                required: true,
                                min: 2,
                                whitespace: true
                            }
                        ]}
                    >
                        <Input disabled={videoIsCreated?true:false} />
                    </Form.Item>
                </Col>
            </Row>
        </Tabs.TabPane>)}
    </Tabs>
        <Row>
            <Col className="col-12 col-md-4 px-4">
                <Form.Item name='tag'
                            label={t('admin.main3')}
                            rules={[{required: true}]}>
                    <Select mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            disabled={videoIsCreated?true:false}
                            placeholder="Tags">
                        {tagsBase.map(el => <Option value={el.value} key={el.value}>{el.name}</Option>) }
                    </Select>
                </Form.Item>
            </Col>
            <Col className="col-12 col-md-4 px-4">
                <Form.Item name='authorId'
                            label="Выберите автора"
                            rules={[{required: true}]}>
                    <Select
                            style={{ width: '100%' }}
                            disabled={videoIsCreated?true:false}
                            placeholder="Автор">
                        {authors.map(el => <Select.Option value={el.value??0} key={el.value??0}>{el.name??''}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Col>
            <Col className="col-12 col-md-4 px-4">
                <Form.Item name='active' label={t('admin.main5')} >

                    <Select disabled={videoIsCreated?true:false} >
                         <Select.Option value={true} >Да</Select.Option>
                       <Select.Option value={false} >Нет</Select.Option>
                    </Select>
                </Form.Item>
            </Col>

            <Col className="col-12 col-md-4 px-4">
            <Form.Item name='calendar' label={t('admin.main12')} disabled={videoIsCreated?true:false} >
                    <DatePicker showTime onChange={(e)=>{if (e){setDate(e._d)}}} defaultValue={moment(date)} disabled={videoIsCreated?true:false}/>
                </Form.Item>
            </Col>
            <Col lg={24} className='px-4'>
                <Row gutter={[24,24]}>
                <Col lg={4}>
                    <Form.Item
                        name= "views"
                        label="Просмотры">
                        <Input disabled={videoIsCreated?true:false} type='number' />
                    </Form.Item>
                </Col>
                <Col lg={4}>
                    <Form.Item
                        name= "likes"
                        label="Лайки">
                        <Input disabled={videoIsCreated?true:false} type='number'/>
                    </Form.Item>
                </Col>
                <Col lg={4}>
                    <Form.Item
                        name= "dislikes"
                        label="Дислайки">
                        <Input disabled={videoIsCreated?true:false} type='number'/>
                    </Form.Item>
                </Col>
            </Row>
            </Col>
            </Row>
            <Row>
                <Col className="col-12 px-4">
                    <Form.Item
                        name='file'
                        label={id?`Изменить видео ${dataEdit?.file?.name??''}`:'Загрузить видео'}>
                        <Upload
                            name="video"
                            beforeUpload={() => false}
                            onChange={handleUploadVideo}
                            showUploadList={!videoIsCreated}
                            accept="video/*"
                            maxCount={1}
                        >
                        <Button icon={<UploadOutlined />} disabled={videoIsCreated?true:false}>Click to Upload</Button>
                    </Upload>

                        {
                            !disables&&(dataEdit?.photos&&dataEdit?.photos.length)?
                                (<Image width='200px' className='mt-3' src={`${image_download}?fileKey=${dataEdit.photos[0].url}`}/>):''
                        }

                </Form.Item>
            </Col>
        </Row>

                        {
                            videoIsCreated||(dataEdit&&dataEdit?.file)?(
                                <>
                                    <video id="video"  loop autoPlay style={{height: 0}} muted={true}>
                                        <source
                                            src={`${image_download}?fileKey=${videoIsCreated?.url||videoIsCreated?.file?.url?videoIsCreated.url||videoIsCreated?.file?.url:dataEdit?.file?.url??''}`}
                                            type="video/webm"/>
                                        <source
                                            src={`${image_download}?fileKey=${videoIsCreated?.url||videoIsCreated?.file?.url?videoIsCreated.url||videoIsCreated?.file?.url:dataEdit?.file?.url??''}`}
                                            type="video/ogg"/>
                                        <source
                                            src={`${image_download}?fileKey=${videoIsCreated?.url||videoIsCreated?.file?.url?videoIsCreated?.url||videoIsCreated?.file?.url:dataEdit?.file?.url??''}`}
                                            type="video/mp4"/>
                                        <source
                                            src={`${image_download}?fileKey=${videoIsCreated?.url?videoIsCreated.url:dataEdit?.file?.url??''}`}
                                            type="video/3gp"/>
                                    </video>

                                    <canvas id="canvas"  className='d-none'/>
                                    <RenderImagePrev gutter={[24,24]} id='render-preview'/>
                                </>
                            ):''
                        }

                        {
                            videoIsCreated||(dataEdit&&dataEdit?.file&&!disables)?(<Row>
                <Col className="col-sm-12 col-md-6 col-lg-3 px-4">
                     <div className="py-4" >
                        <Button type="primary" onClick={()=>{getImagesVideo()}}>Получить кадры из видео</Button>
                    </div>
                    <Form.Item
                        name='file'
                        label="Загрузить собственное изображение">
                        <Upload onChange={handleUpload}
                                maxCount={1}
                                showUploadList={typeImageUpload==='upload'}
                                beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} >Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>):''
                        }
            <div className="p-4">
                <Button type="primary" htmlType="submit">{videoIsCreated?'Загрузить обложку':'Submit'}</Button>
            </div>
        </Form>
        </NavBar>
            </SpinLoader>
            <style>
                {`.ant-spin-container{height: 100vh;}`}
            </style>
    </AdminPanel>
    )
}