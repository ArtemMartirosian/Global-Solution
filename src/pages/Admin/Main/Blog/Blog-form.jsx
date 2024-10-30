import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, Col, DatePicker, Form, Image, Input, InputNumber, Row, Select, Tabs, Upload} from 'antd';
import "antd/dist/antd.css";
import moment from 'moment'
import {toast, ToastContainer} from 'react-toastify'

import JoditEditor from "jodit-react";
import NavBar from "../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import {DivAlert} from "../../References/Category/style";
import {Authors, Files, image_download, MinioUpload, News, NewsCategories} from "../../../../api";
import {UploadOutlined} from '@ant-design/icons'
import {AdminPanel} from "../styles/index"


export default function FormEmployee(props) {

    const {TextArea} = Input;
    const {Option} = Select;
    const {locale} = props
    const navigate = useNavigate()
    const params = useParams()
    const {id} = params
    const formRef = useRef()
    const {t} = useTranslation()
    const options = ['inline', 'blockType', 'list', 'link', 'embedded', 'remove', 'history', 'image']
    const [fileList, setFileList] = useState([])


    const [valuesField, setValuesField] = useState({})
    const [image, setImage] = useState(null)
    const [dataFile, setDataFile] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)


    const [isActive, setActive] = useState(null)
    const [isElected, setElected] = useState(null)
    const [date, setDate] = useState()
    const [banner, setBanner] = useState()

    const [authorsBase, setAuthors] = useState([])
    const [authorsId, setAuthorsId] = useState([])

    const [tagsBase, setTags] = useState([])
    const [tagsId, setTagsId] = useState([])

    const [editorStateRu, setEditorStateRu] = useState('')
    const [editorStateUz, setEditorStateUz] = useState('')
    const [editorStateEn, setEditorStateEn] = useState('')




    const editor = useRef(null)

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        controls: {
            font: {
                list: {
                    'Segoe UI, sans-serif': 'Segoe UI'
                }
            }
        }
    }

    document.getElementsByClassName('jodit-ui-button jodit-ui-button_size_middle jodit-ui-button_variant_initial jodit-ui-button_link jodit-ui-button_text-icons_true jodit-tabs__button jodit-tabs__button_columns_1')

    useEffect(() => {
        NewsCategories.getAll().then((t) => {
            if (t.data.content) {
                let id = t.data.content.map((k) => {
                    if (k.active) {
                        return k.id
                    }
                });
                setTagsId(id.filter(e => e != undefined))
                //======
                let tagsTable = t.data.content.map((k) => {
                    if (k.active) {
                        return k.name[locale] || ""
                    }
                });
                setTags(tagsTable.filter(e => e != undefined))
            }
        })
        Authors.getAll().then((t) => {
            if (t.data.content) {
                let id = t.data.content.map((k) => {
                    if (k.active) {
                        return k.id
                    }
                });
                setAuthorsId(id.filter(e => e != undefined))
                //=======
                let authorsTable = t.data.content.map((k) => {
                    if (k.active) {
                        return k.firstname[locale] + " " + k.lastname[locale] || "noName"
                    }
                });
                setAuthors(authorsTable.filter(e => e != undefined))
            }
        })
        if (id) {
            getNews()
        }
    }, [])

    const onFinish = (values) => {
        let title = {}
        let description = {}
        let authors = []
        let categories = []
        let photos = []
        let shortDescription = {}
        let readTime = 0
        let likes
        let dislikes
        let active
        let publishedDate
        let top
        let views
        let order


        title["ru"] = values.titleRu
        title["en"] = values.titleEn
        title["uz"] = values.titleUz

        description["en"] = document.getElementById('descriptionE').value
        description["uz"] = document.getElementById('descriptionU').value
        description["ru"] = document.getElementById('descriptionR').value

        if (description.ru === "<p><br></p>" || description.ru === "") {
            delete description.ru
        }
        if (description.en === "<p><br></p>" || description.en === "") {
            delete description.en
        }
        if (description.uz === "<p><br></p>" || description.uz === "") {
            delete description.uz
        }

        shortDescription["ru"] = values.shortDescriptionRu
        shortDescription["en"] = values.shortDescriptionEn
        shortDescription["uz"] = values.shortDescriptionUz

        let indexArrayAuthors = values.authors.map((a) => {
            return authorsBase.indexOf(a)
        })
        authors = indexArrayAuthors.map((i) => {
            return authorsId[i]
        })

        let indexArrayTags = values.tag.map((a) => {
            return tagsBase.indexOf(a)
        })
        categories = indexArrayTags.map((i) => {
            return tagsId[i]
        })
        readTime = Number(values.read)
        values.likes ? likes = values.likes : likes = 0
        values.dislikes ? dislikes = values.dislikes : dislikes = 0
        values.views ? views = values.views : views = 0
        if (date) {
            publishedDate = date
        } else {
            publishedDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS' + "Z")
            publishedDate = publishedDate.substring(0, publishedDate.length - 6) + "Z";
        }
        if (values.order) {
            order = values.order / 1
        }

        active = !!isActive
        top = JSON.parse(isElected)
        if (Object.keys(title).length < 3 || Object.keys(shortDescription).length < 3 || Object.keys(description).length < 3) {
            setShowAlert(true)
        } else {
            const data = {
                title, description, authors,
                categories, photos, readTime,
                likes, top, views, active, order,
                publishedDate, dislikes, shortDescription,

            }

            if (!id && fileList.length) {
                setConfirmLoading(true)

                News.createNews(data)
                    .then(async (result) => {
                        if (dataFile) {
                            await fileUpload(dataFile, result.data.id, 'news')
                                .then(uploadRes => {
                                    News.updateNews(result.data.id, {...data, photos: [uploadRes.data.id]})
                                        .then(async () => {
                                            if (banner) {
                                                await fileUpload(banner, result.data.id, 'news')
                                                    .then(uploadRes2 => {
                                                        News.updateNews(result.data.id, {
                                                            ...data,
                                                            photos: [uploadRes.data.id],
                                                            bannerPhoto: uploadRes2.data.id
                                                        })
                                                    })
                                            }
                                            toast.success(t('admin.main.alert2'))
                                            setTimeout(() => {
                                                navigate(`/admin/main/blog`)
                                            }, 1000)
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth'
                                            })
                                        }).finally(() => setConfirmLoading(false))
                                })
                        } else {
                            if (banner) {
                                await fileUpload(banner, result.data.id, 'news')
                                    .then(uploadRes2 => {
                                        News.updateNews(result.data.id, {...data, bannerPhoto: uploadRes2.data.id})
                                    }).finally(() => setConfirmLoading(false))
                            }
                            setShowAlert(false)
                            toast.success("Успешно создано")
                            setTimeout(() => {
                                navigate(`/admin/main/blog`)
                            }, 1000)
                        }
                    })
            } else {

                if (fileList.length) {
                    setConfirmLoading(true)
                    News.updateNews(id, data)
                        .then(async (result) => {
                            if (dataFile) {
                                await fileUpload(dataFile, result.data.id, 'news')
                                    .then(uploadRes => {
                                        News.updateNews(result.data.id, {...data, photos: [uploadRes.data.id]})
                                            .then(() => {
                                                setEditorStateRu('')
                                                setEditorStateUz('')
                                                setEditorStateEn('')
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: 'smooth'
                                                })
                                                toast.success(t('admin.main.alert2'))
                                                //formRef.current.resetFields();
                                                setTimeout(() => {
                                                    navigate(`/admin/main/blog`)
                                                }, 1000)
                                            }).finally(() => setConfirmLoading(false))

                                    })
                            } else {
                                if (banner) {
                                    await fileUpload(banner, result.data.id, 'news')
                                        .then(uploadRes2 => {
                                            News.updateNews(result.data.id, {...data, bannerPhoto: uploadRes2.data.id})
                                        }).finally(() => setConfirmLoading(false))
                                }
                                setShowAlert(false)
                                toast.success(t('admin.main.alert2'))
                                setTimeout(() => {
                                    navigate(`/admin/main/blog`)
                                }, 1000)
                            }
                        })
                }
            }
        }
    }

    const fileUpload = async (file, id, entity) => {
        const data = new FormData()
        data.append('file', file)
        return Files.uploadFile(data, id, entity).then((result) => {
            return result
        })
    }

    const pictureInDescriptionUpload = async (file) => {
        const data = new FormData()
        data.append('file', file)
        return MinioUpload.uploadPhoto(data).then(result => result)
    }

    const getNews = () => {
        News.getNews(id)
            .then(result => {
                let data = {}
                let lang = ['ru', 'uz', 'en']

                for (let key in result.data) {
                    if (key.match(/name|position/)) {
                        lang.forEach(item => {
                            data[`${key}.${item}`] = result.data[key][item] || ''
                        })
                    }
                }
                if (result.data.photos && result.data.photos.length) {
                    setFileList(result.data.photos)
                    setImage(`${image_download}?fileKey=${result.data.photos[0].url}`)
                }
                data.order = result.data.order

                if (result.data.shortDescription) {
                    data.shortDescription = {}
                    data.shortDescriptionRu = result.data.shortDescription.ru
                    data.shortDescriptionEn = result.data.shortDescription.en
                    data.shortDescriptionUz = result.data.shortDescription.uz
                }
                if (result.data.description && result.data.description.en) {
                    setEditorStateEn(result.data.description.en)
                }
                if (result.data.description && result.data.description.uz) {
                    setEditorStateUz(result.data.description.uz)
                }
                if (result.data.description && result.data.description.ru) {
                    setEditorStateRu(result.data.description.ru)
                }
                if (result.data.title) {
                    data.title = {}
                    data.titleRu = result.data.title.ru
                    data.titleEn = result.data.title.en
                    data.titleUz = result.data.title.uz
                }
                data.active = result.data.active
                data.read = result.data.readTime
                data.likes = result.data.likes
                data.order = result.data.order || 0
                data.dislikes = result.data.dislikes
                data.views = result.data.views
                setElected(result.data.top)
                setActive(result.data.active)
                setDate(result.data.publishedDate)

                if (result.data.authors) {
                    data.authors = result.data.authors.map((m) => {
                        if (m.active) {
                            return m.firstname[locale] + ` ` + m.lastname[locale]
                        }
                    }).filter(e => e != undefined)
                }

                if (result.data.categories) {
                    data.tag = result.data.categories.map((m) => {
                        if (m.active) {
                            return m.name[locale]
                        }
                    }).filter(e => e != undefined)
                }
                if (result.data.likes) {
                    data.likes = result.data.likes
                } else {
                    data.likes = 0
                }
                if (result.data.views) {
                    data.views = result.data.views
                } else {
                    data.views = 0
                }
                if (result.data.photos) {
                    let photosArray = result.data.photos.map((p) => {
                        return `${image_download}?fileKey=${p?.url}`
                    })
                    setImage(photosArray)
                }
                setValuesField(data)
            })
    }

    const finishFailed = (err) => {
        if (err.errorFields.length) {
            setShowAlert(true)
        }
    }

    const handleUpload = async (val) => {
        setImage(null)
        if (val.fileList.length && val.file.size < 2000000) {
            setDataFile(val.file)
            setFileList(val.fileList)
        } else {
            setDataFile(null)
            alert("Файл должен быть меньше 2 мб")
        }
    }

    const handleUploadBanner = async (val) => {
        setBanner(val.file)
    }

    const pictureInTextRu = async (val) => {
        if (val.file.size < 2000000) {
            await pictureInDescriptionUpload(val.file)
                .then((uploadRes) => {
                    setEditorStateRu(document.getElementById('descriptionR').value + `<img src=${uploadRes.data}></img>`)
                })
        } else {
            alert("Файл должен быть меньше 2 мб")
        }
    }

    const pictureInTextUz = async (val) => {
        if (val.file.size < 2000000) {
            await pictureInDescriptionUpload(val.file)
                .then((uploadRes) => {
                        setEditorStateUz(document.getElementById('descriptionU').value + `<img src=${uploadRes.data}></img>`)
                    }
                )
        } else {
            alert("Файл должен быть меньше 2 мб")
        }

    }

    const pictureInTextEn = async (val) => {
        if (val.file.size < 2000000) {
            await pictureInDescriptionUpload(val.file)
                .then((uploadRes) => {
                        setEditorStateEn(document.getElementById('descriptionE').value + `<img src=${uploadRes.data}></img>`)
                    }
                )
        } else {
            alert("Файл должен быть меньше 2 мб")
        }

    }


//============
    return (
        <AdminPanel>
            <ToastContainer/>
            <NavBar {...{locale}}>
                <DivAlert message={t('admin.error-message')}
                          className={showAlert ? 'show' : ''}
                          showIcon
                          type="error"
                          action={
                              <Button size="small" danger onClick={() => setShowAlert(false)}>
                                  X
                              </Button>
                          }/>
                <DivAlert message={t('admin.success-message')}
                          className={showAlertSuccess ? 'show' : ''}
                          showIcon
                          type="success"
                          closable/>
                <AdminHeader>
                    <Button type='primary'
                            onClick={() => navigate(`/admin/main/blog`)}>{t('admin.logo-button2')}</Button>
                </AdminHeader>
                {
                    (id && Object.keys(valuesField).length) || !id ? (<Form
                        layout="vertical"
                        onFinish={onFinish}
                        style={{padding: '60px 20px'}}
                        onFinishFailed={finishFailed}
                        initialValues={valuesField}
                        ref={formRef}
                        encType="multipart/form-data">
                        <Tabs>
                            <Tabs.TabPane tab={'Русский'} key={0} forceRender>
                                <Row>
                                    <Col className="col-12 p-4">
                                        <Form.Item
                                            name={`titleRu`}
                                            label={t('admin.main1')}
                                            rules={[
                                                {
                                                    required: true,
                                                    min: 2,
                                                    whitespace: true
                                                }
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            name={`shortDescriptionRu`}
                                            label={t('admin.main2')}
                                            rules={[
                                                {
                                                    required: true,
                                                    min: 2,
                                                    whitespace: true
                                                }
                                            ]}
                                        >
                                            <TextArea rows={5}/>
                                        </Form.Item>
                                        <Form.Item name={'descriptionRu'}>
                                            <div className="App">
                                                <div style={{
                                                    backgroundColor: "#f9f9f9",
                                                    border: "#dadada solid 1px",
                                                    borderBottom: "0px",
                                                    textAlign: "center"
                                                }}>
                                                    <Upload onChange={pictureInTextRu}
                                                            showUploadList={false}
                                                            maxCount={1}
                                                            beforeUpload={() => false}>
                                                        <div icon={<UploadOutlined/>}>{t('admin.main27')}</div>
                                                    </Upload>
                                                </div>
                                                <JoditEditor id="descriptionR"
                                                             value={editorStateRu}
                                                             ref={editor}
                                                             config={config}
                                                             tabIndex={1}/>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={'Английский'} key={1} forceRender>
                                <Row>
                                    <Col className="col-12 p-4">
                                        <Form.Item
                                            name={`titleEn`}
                                            label={t('admin.main1')}
                                            rules={[
                                                {
                                                    required: true,
                                                    min: 2,
                                                    whitespace: true
                                                }
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            name={`shortDescriptionEn`}
                                            label={t('admin.main2')}
                                            rules={[
                                                {
                                                    required: true,
                                                    min: 2,
                                                    whitespace: true
                                                }
                                            ]}
                                        >
                                            <TextArea rows={5}/>
                                        </Form.Item>
                                        <Form.Item name={'descriptionEn'}>
                                            <div className="App">
                                                <div style={{
                                                    backgroundColor: "#f9f9f9",
                                                    border: "#dadada solid 1px",
                                                    borderBottom: "0px",
                                                    textAlign: "center"
                                                }}>
                                                    <Upload onChange={pictureInTextEn}
                                                            showUploadList={false}
                                                            maxCount={1}
                                                            beforeUpload={() => false}>
                                                        <div icon={<UploadOutlined/>}>{t('admin.main27')}</div>
                                                    </Upload>
                                                </div>

                                                <JoditEditor id="descriptionE"
                                                             value={editorStateEn}
                                                             ref={editor}
                                                             config={config}
                                                             tabIndex={1}/>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={'Узбекский'} key={2} forceRender>
                                <Row>
                                    <Col className="col-12 p-4">
                                        <Form.Item
                                            name={`titleUz`}
                                            label={t('admin.main1')}
                                            rules={[
                                                {
                                                    required: true,
                                                }
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            name={`shortDescriptionUz`}
                                            label={t('admin.main2')}
                                            rules={[
                                                {
                                                    required: true,
                                                    min: 2,
                                                    whitespace: true
                                                }
                                            ]}
                                        >
                                            <TextArea rows={5}/>
                                        </Form.Item>
                                        <Form.Item name={'descriptionUz'}>
                                            <div className="App">
                                                <div style={{
                                                    backgroundColor: "#f9f9f9",
                                                    border: "#dadada solid 1px",
                                                    borderBottom: "0px",
                                                    textAlign: "center"
                                                }}>
                                                    <Upload onChange={pictureInTextUz}
                                                            showUploadList={false}
                                                            maxCount={1}
                                                            fileList={fileList}
                                                            beforeUpload={() => false}>
                                                        <Button icon={<UploadOutlined/>}>{t('admin.main27')}</Button>
                                                    </Upload>
                                                </div>

                                                <JoditEditor id="descriptionU"
                                                             value={editorStateUz}
                                                             ref={editor}
                                                             config={config}
                                                             tabIndex={1}/>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                        </Tabs>
                        <Row>
                            <Col className="col-12 col-lg-12 p-4">
                                <Form.Item name='tag'
                                           label={t('admin.main3')}
                                           rules={[{required: true}]}>
                                    <Select mode="tags"
                                            style={{width: '100%'}}
                                            placeholder="Tags">
                                        {tagsBase ? tagsBase.map(el => <Select key={el}>{el}</Select>) : ""}
                                    </Select>
                                </Form.Item>
                                <Form.Item name='authors'
                                           label={t('admin.main4')}
                                           rules={[{required: true}]}>
                                    <Select mode="tags"
                                            style={{width: '100%'}}
                                            placeholder="Authors">
                                        {authorsBase ? authorsBase.map(el => <Select key={el}>{el}</Select>) : ""}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-lg-3 px-4">
                                <Form.Item name='calendar' label={t('admin.main12')}>
                                    <DatePicker showTime onChange={(e) => {
                                        if (e) {
                                            setDate(e._d)
                                        }
                                    }} defaultValue={moment(date)} id="date"/>
                                </Form.Item>
                            </Col>
                            <Col className="col-12 col-lg-3 px-4">
                                <Form.Item name='makeActive'>
                                    {t('admin.main5')}
                                    <Select onChange={(e) => {
                                        setActive(e)
                                    }} defaultValue={isActive ? isActive.toString() : ""} className="my-2">
                                        <Option value="true">{t('admin.main23')}</Option>
                                        <Option value="false">{t('admin.main24')}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="col-12 col-lg-3 px-4">
                                <Form.Item name='makeElected'>
                                    {t('admin.main6')}
                                    <Select onChange={(e) => {
                                        setElected(e)
                                    }} defaultValue={isElected ? isElected.toString() : ""} className="my-2">
                                        <Option value="true">{t('admin.main23')}</Option>
                                        <Option value="false">{t('admin.main24')}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            {isElected == true || isElected == "true"
                                ? <Col className="col-12 col-md-6 col-lg-3 px-4">
                                    <Form.Item
                                        name='order'
                                        label="Приоретет"
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                : <div></div>}

                        </Row>

                        <Row>
                            <Col className="col-12 col-md-6 col-lg-3 px-4">
                                <Form.Item
                                    name='dislikes'
                                    label={t('admin.main18')}
                                    rules={[{required: true}]}>
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col className="col-12 col-md-6 col-lg-3 px-4">
                                <Form.Item
                                    name='likes'
                                    label={t('admin.main8')}
                                    rules={[{required: true}]}>
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col className="col-12 col-md-6 col-lg-3 px-4">
                                <Form.Item
                                    name='read'
                                    label={t('admin.main9')}
                                    rules={[{required: true}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col className="col-12 col-md-6 col-lg-3 px-4">
                                <Form.Item
                                    name='views'
                                    label={t('admin.main16')}
                                    rules={[{required: true}]}>
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col className="col-12 col-md-6 col-lg-3 px-4">
                                <Form.Item
                                    name='file'
                                    label={t('admin.main10')}
                                >
                                    <Upload onChange={handleUpload}
                                            maxCount={1}
                                            fileList={fileList}
                                            beforeUpload={() => false}>
                                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                                    </Upload>
                                    {image ? (<Image width={200} src={image} style={{marginTop: '30px'}}/>) : ''}
                                </Form.Item>
                            </Col>
                            {isElected == true || isElected == "true"
                                ?
                                <Col className="col-12 col-md-6 col-lg-3 px-4">
                                    <Form.Item
                                        name='file'
                                        label={t('admin.main28')}
                                    >
                                        <Upload onChange={handleUploadBanner}
                                                maxCount={1}
                                                beforeUpload={() => false}>
                                            <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                                        </Upload>
                                        {image ? (<Image width={200} src={image} style={{marginTop: '30px'}}/>) : ''}
                                    </Form.Item>
                                </Col>
                                : <div></div>
                            }
                        </Row>
                        <div className="p-4">
                            <Button loading={confirmLoading}
                                    disabled={confirmLoading || (id ? false : !fileList.length)} type="primary"
                                    htmlType="submit" id="submit">Submit</Button>
                        </div>
                    </Form>) : ''}
            </NavBar>
        </AdminPanel>
    )
}


