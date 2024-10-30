import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FeedBackApiClient, Files, Seo} from "../../../api";

/*---Components---*/
import HeaderPages from "../../../components/Header-Pages/HeaderPages";
import MapSection from "../../../components/Map/Map";
import {Alert, Button, Col, Form, Input, Row, Select, Upload} from 'antd';

/*---Styles----*/
import {ModalAlert, SectionContacts, SectionMap, SuccessAlert} from "./style";
import {Helmet} from "react-helmet-async";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../index";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {ToolTipCustom} from "../../GlobalPay/Main/styles";
import {CheckIcon, Envelope, IconAlert, SelectIconArrow, ToolTipIcon} from "../../../assets/icons";
import {Link, useLocation} from "react-router-dom";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";

const {Dragger} = Upload;

const styleOptions = {
    color: '#475467',
    fontSize: '16px',
    fontWeight: '400'
}
const styleOptionsSpan = {
    color: '#101828',
    fontWeight: '500'
}


function LabelRender(...text) {
    return (
        <>{text[0]} &nbsp;<span>{text[1]}</span></>
    )

}


export default function Contacts(props) {
    const {t} = useTranslation()
    const {locale, contacts} = props
    const [form] = Form.useForm();
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [activeForm, setActiveForm] = useState(false)
    const [addressActive, setAddressActive] = useState('main')
    const [file, setFile] = useState(null)
    const [alertRequest, setAlertRequest] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [formValues, setFormValues] = useState({})
    const [stateTheme, setStateTheme] = useState('')
    const [loader, setLoader] = useState(false)
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)
    const [buttonDisabled, setButtonDisabled] = useState(true)


    function RenderTitleTooltip() {
        return (<>
            <p className='mb-0' style={{fontWeight: 400, fontSize: 12}}>{t('Form.tooltip')}</p>
        </>)

    }

    const themes = [{
        value: 'HR',
        label: <div className='item-option d-flex align-items-center justify-content-between pt-2 pb-2'>
            <p className='mb-0' style={styleOptions}><span
                style={styleOptionsSpan}>{t('Contacts.theme1')}</span> {t('Contacts.theme1.1')}</p>
            <span className='icon-selected'>
                <CheckIcon/>
            </span>
        </div>
    },
        {
            value: 'SALES',
            label: <div className='item-option d-flex align-items-center justify-content-between pt-2 pb-2'>
                <p className='mb-0' style={styleOptions}>
                    <span style={styleOptionsSpan}>{t('Contacts.theme2')} </span> {t('Contacts.theme2.1')}</p>
                <span className='icon-selected'>
                    <CheckIcon/>
                </span>
            </div>
        },

        {
            value: 'SUPPORT',
            label: <div className='item-option d-flex align-items-center justify-content-between pt-2 pb-2'>
                <p className='mb-0' style={styleOptions}><span
                    style={styleOptionsSpan}>{t('Contacts.theme3')}</span>{t('Contacts.theme3.1')}</p>
                <span className='icon-selected'>
                    <CheckIcon/>
                </span>
            </div>
        },
        {
            value: 'ACCOUNT',
            label: <div className='item-option d-flex align-items-center justify-content-between pt-2 pb-2'>
                <p className='mb-0' style={styleOptions}><span
                    style={styleOptionsSpan}>{t('Contacts.theme4')}</span>{t('Contacts.theme4.1')}</p>
                <span className='icon-selected'>
                    <CheckIcon/>
                </span>
            </div>
        },
        {
            value: 'GENERAL',
            label: <div className='item-option d-flex align-items-center justify-content-between pt-2 pb-2'>
                <p className='mb-0' style={styleOptions}><span
                    style={styleOptionsSpan}>{t('Contacts.theme5')}</span> {t('Contacts.theme5.1')}</p>
                <span className='icon-selected'>
                    <CheckIcon/>
                </span>
            </div>
        },
        {
            value: 'OTHER',
            label: <div className='item-option d-flex align-items-center justify-content-between pt-2 pb-2'>
                <p className='mb-0' style={styleOptions}><span style={styleOptionsSpan}>{t('Contacts.theme6')}</span>
                </p>
                <span className='icon-selected'>
                    <CheckIcon/>
                </span>
            </div>
        }]

    const addressCoordinate = {
        second: {
            lat: 41.2918943,
            lng: 69.2683172
        },
        main: {
            lat: 41.290459,
            lng: 69.267967
        }
    }


    const propsFile = {
        name: 'file',
        multiple: false,
        action: '',
        maxCount: 1,
        beforeUpload() {
            return false
        },
        onChange(info) {

            const {status} = info.file;
            if (status !== 'uploading') {
                if (info.fileList[0]) {
                    const size_kb = +(info.fileList[0].size / 1024).toFixed(1)
                    if (size_kb > 10000) {
                        setAlertError('Размер файла не должен привышать 10мб')
                    } else {
                        setFile(info.fileList[0])
                    }

                } else {
                    setFile(null)
                }

            }
            if (status === 'done') {

            } else if (status === 'error') {

            }
            return false
        }
    };

    const validateMessages = {
        required: t('error-input2'),
        pattern: t('error-input'),
    };


    useEffect(() => {
        logEvent(analytics, 'global_contacts_page_visited');
    }, [])

    let oldScrollTopPosition = 0;

    useEffect(() => {
        Seo.getAll()
            .then((response) => {
                if (response) {
                    const foundResponse = response.find((item) => `/${item.url}` === urlCleaner(location.pathname))
                    if (foundResponse) {
                        setSeoData(foundResponse)
                    }
                }
            })
        function scrollEvents(e) {
            let elem = document.getElementById('imitation-scroll')
            const scrollTopPosition = document.documentElement.scrollTop;


            if (elem) {
                const {top} = elem.getBoundingClientRect()

                if (window.pageYOffset + top + 400 < window.pageYOffset + document.documentElement.clientHeight) {
                    if (oldScrollTopPosition > scrollTopPosition) {
                        oldScrollTopPosition = scrollTopPosition
                        setAddressActive('main')
                    } else {
                        oldScrollTopPosition = scrollTopPosition
                        setAddressActive('second')

                    }

                }

            }
        }

        if (window !== undefined) {
            window.addEventListener('scroll', scrollEvents)
        }

        return () => {
            window.removeEventListener('scroll', scrollEvents)
        }
    }, [])

    useEffect(() => {
        if (alertSuccess) {
            setShowAlert(false)
            form.resetFields();
        }
    }, [alertSuccess])

    useEffect(() => {
        if (alertRequest) {
            onFinish(formValues)
        }
    }, [alertRequest])

    const onFinish = (values) => {

        if (alertRequest) {


            const request_data = {...values, adminPanel: values?.personal, companyName: 'default'}
            delete request_data.personal
            setAlertRequest(false)

            window.grecaptcha.ready(function () {
                window.grecaptcha.execute('6Lc1l2caAAAAAMJY54sSmK6Z2jUP5GFbWq23ey9_', {action: 'submit'}).then(function (token) {

                    setLoader(true)
                    FeedBackApiClient.createFeedBack(token, {...request_data, fileExist:!!file})
                        .then(async ({data}) => {
                            const feed_backId = data?.id
                            if (file && data?.id) {

                                const data_file = new FormData()
                                data_file.append('file', file?.originFileObj)
                                await Files.uploadFile(data_file, feed_backId, 'feedback')
                                    .then(async ({data}) => {

                                        await FeedBackApiClient.updateFeedBack({
                                            ...request_data,
                                            fileId: file?.originFileObj
                                        }, feed_backId)
                                            .then(() => {
                                                setAlertSuccess(true)
                                                setAlertError(false)
                                                window.scrollTo({
                                                    top: 200,
                                                    behavior: 'smooth'
                                                })
                                            }).catch(() => {
                                                setAlertError(true)
                                                setTimeout(() => {
                                                    setAlertError(false)
                                                }, 4000)
                                            })
                                    })
                                    .catch(() => {
                                        setAlertError(true)
                                        setTimeout(() => {
                                            setAlertError(false)
                                        }, 4000)
                                    })
                            } else {
                                setAlertSuccess(true)
                                setAlertError(false)
                                window.scrollTo({
                                    top: 200,
                                    behavior: 'smooth'
                                })
                            }


                            setLoader(false)
                            setShowAlert(false)


                        })
                        .catch(() => {
                            setAlertError(true)
                            setTimeout(() => {
                                setAlertError(false)
                            }, 4000)
                        })
                });
            });
        } else {
            setFormValues(values)
            setShowAlert(true)
        }


    };

    const onFinishFailed = (errors) => {
        console.log(errors)
    }

    function addressMatch(address) {

        if (address.toLowerCase().match('мирабад-2') || address.toLowerCase().match('39')) {
            return 'second'
        } else if (address.toLowerCase().match('Хамида Сулейманова') || address.toLowerCase().match('5')) {
            return 'main'
        }
        return 'undefined'
    }


    

    return (
        <div style={{minHeight: '90vh'}}>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/contacts', locale, 'title')}/>
                <meta property="og:description" content={renderMeta('/contacts', locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta('/contacts', locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta('/contacts', locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta('/contacts', locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta('/contacts', locale, 'og:image')}/>
                {renderMetaPixel()}
            </Helmet>
            <HeaderPages {...{title: t('Main.title10')}}/>
            <ModalAlert title={null}
                        visible={showAlert}
                        cancelText={t('Contacts.alert3')}
                        okText={t('send')}
                        onOk={() => setAlertRequest(true)}
                        onCancel={() => setShowAlert(false)}>
                {loader ? (<div className="modal-preloader">
                    <div className="preloader-img">
                        <img src="/images/preloader.png" alt=""/>
                    </div>
                    <p>{t('form_site3')}</p>
                </div>) : (<><span><IconAlert/></span>
                    <h3>{t('Contacts.alert1')}</h3>
                    <p>{t('Contacts.alert2')}</p></>)}

            </ModalAlert>
            {
                alertSuccess
                    ? (<SuccessAlert lg={12} span={24}>
                        <Envelope/>
                        <div>
                            <h1>{t('Main.contacts-success.message2')}</h1>
                            <p>{t('Main.contacts-success.message')}</p>
                        </div>
                        <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}`}>{t('Main.contacts-success.message1')}</Link>
                    </SuccessAlert>)
                    : (<>
                        <SectionContacts className='container'>
                            <Row justify='space-between' style={{padding: '60px 0'}}>
                                <Col className='info-contacts' lg={8} md={8} span={24}>
                                    <div>
                                        <div className='icon-inf mx-auto d-flex justify-content-center align-items-center'>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 12V7H11V14H17V12H13Z"
                                                    fill="#225A89"/>
                                            </svg>

                                        </div>
                                        <div className='text-inf'>
                                            <h6 className='text-center'>{t('Main.text16')}</h6>
                                            <p className='text-center'>{t('Main.contacts-work-days')}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='info-contacts' lg={8} md={8} span={24}>
                                    <div>
                                        <div className='icon-inf mx-auto d-flex justify-content-center align-items-center'>
                                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M21.5 16.42V19.956C21.5001 20.2092 21.4042 20.453 21.2316 20.6382C21.059 20.8234 20.8226 20.9363 20.57 20.954C20.133 20.984 19.776 21 19.5 21C10.663 21 3.5 13.837 3.5 5C3.5 4.724 3.515 4.367 3.546 3.93C3.56372 3.67744 3.67658 3.44101 3.8618 3.26841C4.04703 3.09581 4.29082 2.99989 4.544 3H8.08C8.20404 2.99987 8.3237 3.04586 8.41573 3.12902C8.50776 3.21218 8.5656 3.32658 8.578 3.45C8.601 3.68 8.622 3.863 8.642 4.002C8.84073 5.38892 9.248 6.73783 9.85 8.003C9.945 8.203 9.883 8.442 9.703 8.57L7.545 10.112C8.86445 13.1865 11.3145 15.6365 14.389 16.956L15.929 14.802C15.9919 14.714 16.0838 14.6509 16.1885 14.6237C16.2932 14.5964 16.4042 14.6068 16.502 14.653C17.767 15.2539 19.1156 15.6601 20.502 15.858C20.641 15.878 20.824 15.9 21.052 15.922C21.1752 15.9346 21.2894 15.9926 21.3724 16.0846C21.4553 16.1766 21.5012 16.2961 21.501 16.42H21.5Z"
                                                    fill="#225A89"/>
                                            </svg>

                                        </div>
                                        <div className='text-inf'>
                                            <h6 className='text-center'>{t('Main.text17')}</h6>
                                            <p className='text-center'>+998 97 722 99 42</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='info-contacts' lg={8} md={8} span={24}>
                                    <div>
                                        <div className='icon-inf mx-auto d-flex justify-content-center align-items-center'>
                                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M21.5 16.42V19.956C21.5001 20.2092 21.4042 20.453 21.2316 20.6382C21.059 20.8234 20.8226 20.9363 20.57 20.954C20.133 20.984 19.776 21 19.5 21C10.663 21 3.5 13.837 3.5 5C3.5 4.724 3.515 4.367 3.546 3.93C3.56372 3.67744 3.67658 3.44101 3.8618 3.26841C4.04703 3.09581 4.29082 2.99989 4.544 3H8.08C8.20404 2.99987 8.3237 3.04586 8.41573 3.12902C8.50776 3.21218 8.5656 3.32658 8.578 3.45C8.601 3.68 8.622 3.863 8.642 4.002C8.84073 5.38892 9.248 6.73783 9.85 8.003C9.945 8.203 9.883 8.442 9.703 8.57L7.545 10.112C8.86445 13.1865 11.3145 15.6365 14.389 16.956L15.929 14.802C15.9919 14.714 16.0838 14.6509 16.1885 14.6237C16.2932 14.5964 16.4042 14.6068 16.502 14.653C17.767 15.2539 19.1156 15.6601 20.502 15.858C20.641 15.878 20.824 15.9 21.052 15.922C21.1752 15.9346 21.2894 15.9926 21.3724 16.0846C21.4553 16.1766 21.5012 16.2961 21.501 16.42H21.5Z"
                                                    fill="#225A89"/>
                                            </svg>

                                        </div>
                                        <div className='text-inf mx-auto'>
                                            <h6 className='text-center'>{t('Main.text18')}</h6>
                                            <p className='text-center'>+998 90 963 28 89</p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>

                            <div className='feedback-form'>
                                <h2>{t('Main.contacts-title')}</h2>
                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    validateMessages={validateMessages}
                                    form={form}
                                    onChange={(e) => {
                                        const req_fields = ['name', 'email', 'personal']
                                        let disabled = false
                                        req_fields.forEach((item) => {
                                            if (!form.getFieldsValue()[item]) {
                                                disabled = true
                                            }
                                        })

                                        setButtonDisabled(disabled)
                                    }}

                                >

                                    <Col lg={12} md={12} span={24}>
                                        <Form.Item label={t('Form.label1')} required name='personal'
                                                   rules={[{required: true}]}>
                                            <Select suffixIcon={<SelectIconArrow/>} defaultValue='' onChange={(e) => {
                                                setStateTheme(e)
                                                e && e.length ? setActiveForm(true) : setActiveForm(false)
                                            }}>
                                                <option value={''}>{t('Form.theme')}</option>
                                                {
                                                    themes.map(item => {
                                                        return (
                                                            <option key={item.value}
                                                                    value={item.value}>{item.label}</option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    {
                                        activeForm ? (<>
                                            <Col lg={12} md={12} span={24}>
                                                <Form.Item label={t('Main.text19')}
                                                           required
                                                           name='name'
                                                           rules={[{required: true}]}


                                                >
                                                    <Input placeholder={t('Form.placeholder1')}/>
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12} md={12} span={24}>
                                                <Form.Item
                                                    label='E-mail'
                                                    required
                                                    name='email'
                                                    rules={[{
                                                        required: true,
                                                    }, {
                                                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: t('error-input')
                                                    }]}
                                                >
                                                    <Input placeholder={t('Form.placeholder2')}
                                                           onChange={(e) => {
                                                               form.setFieldsValue({email: e.target.value.replace(/[а-яА-Я]/, '')})
                                                           }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12} md={12} span={24}>
                                                <Form.Item
                                                    label={LabelRender(t('tgPay.form.telegram.label'), t('Form.label2'))}
                                                    name='cellphone'
                                                >
                                                    <Input onChange={(e) => {
                                                        form.setFieldsValue({cellphone: e.target.value.replace(/[^a-z0-9\w]/gi, '')})
                                                    }} placeholder={t('tgPay.form.telegram.placeholder')}/>

                                                </Form.Item>
                                                <ToolTipCustom
                                                    overlayInnerStyle={{borderRadius: 8, padding: 12, width: "262px"}}
                                                    color='#18406D' placement="right" title={<RenderTitleTooltip/>}>
                                                    <span className='icon-tooltip position-absolute'
                                                          style={{right: 28, top: 40}}><ToolTipIcon/></span>
                                                </ToolTipCustom>
                                                <style>{
                                                    `
                                            
                                                .ant-tooltip-arrow {
                                                    left: 1.928932px!important;
                                                }
                                                .ant-tooltip-arrow .ant-tooltip-arrow-content {
                                                        width: 30px;
                                                        height: 30px;
                                                        box-shadow: none!important;
                                                }
                                                
                                              
                                            `
                                                }</style>

                                            </Col>

                                            <Col lg={12} md={12} span={24} className='mb-3 file_upload'>
                                                <Dragger  {...propsFile}>
                                                    <p className="ant-upload-drag-icon">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M28 10.6665V27.9905C28.0012 28.1656 27.968 28.3392 27.9021 28.5015C27.8362 28.6637 27.739 28.8114 27.6161 28.9361C27.4931 29.0607 27.3468 29.16 27.1855 29.2281C27.0242 29.2963 26.8511 29.3319 26.676 29.3332H5.324C4.97308 29.3332 4.63652 29.1939 4.38826 28.9459C4.14 28.6978 4.00035 28.3614 4 28.0105V3.98917C4 3.27317 4.59867 2.6665 5.336 2.6665H19.996L28 10.6665ZM25.3333 11.9998H18.6667V5.33317H6.66667V26.6665H25.3333V11.9998ZM10.6667 9.33317H14.6667V11.9998H10.6667V9.33317ZM10.6667 14.6665H21.3333V17.3332H10.6667V14.6665ZM10.6667 19.9998H21.3333V22.6665H10.6667V19.9998Z"
                                                                fill="#225A89"/>
                                                        </svg>
                                                    </p>
                                                    <div className='btn-upload'>{t('Form.label3')}</div>

                                                    <p className="ant-upload-hint">
                                                        {stateTheme === 'HR' ? t('Form.upload-file-title') : t('Form.label3.1')}
                                                    </p>
                                                </Dragger>
                                                <p>{t('Form.upload-file')}</p>
                                            </Col>


                                            <Col lg={12} md={12} span={24}>

                                                <Form.Item label={LabelRender(t('Form.label4'), t('Form.label2'))}
                                                           name='description'
                                                >
                                                    <Input.TextArea placeholder={t('Form.placeholder4')}/>
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit"
                                                            data-action='submit'>{t('Main.text23')}</Button>
                                                </Form.Item>
                                            </Col></>) : ''
                                    }


                                </Form>
                                {alertSuccess ? <Alert message={t('id.Main.text53')} type="success" showIcon/> : ''}
                                {alertError ? <Alert message={t('id.Main.text56')} type="error" showIcon/> : ''}

                            </div>

                            <style>{`
                .ant-select-selection-item .item-option{
                padding:0!important;
                }
                .ant-select-selection-item .item-option .icon-selected{
                    opacity:0;
                }
                .ant-select-item-option[aria-selected='false'] .item-option .icon-selected{
                       opacity: 0;
                   }
                   .ant-select-item-option[aria-selected='true'] .item-option .icon-selected{
                       opacity: 1;
                   }
                
                `}</style>
                        </SectionContacts>

                        <SectionMap className='container'>
                            <h2>{t('contacts.address.title')}</h2>
                            <Row justify='space-between'>

                                <Col lg={12} md={12} span={24}
                                     id='imitation-scroll'
                                     className={addressActive === 'main' ? `address-container position-relative address-main` : `position-relative address-container address-second`}>
                                    {contacts.map(item => {
                                        return (
                                            <div className='address-item' onClick={() => {
                                                setAddressActive(addressMatch(item.address[locale]))
                                            }}>
                                                <h4>{item.name[locale]}</h4>
                                                <p className='title'>{item?.address[locale]}</p>
                                                <p><a href={`tel:${item?.cellphone}`} target='_blank'>{item?.cellphone}</a>
                                                </p>
                                                <p><a href={`mailto:${item?.mail}`} target='_blank'>{item?.mail}</a></p>
                                            </div>
                                        )
                                    })}
                                </Col>
                                <Col lg={12} md={12} span={24}><MapSection key={addressActive}
                                                                           center={addressCoordinate[addressActive]}
                                                                           style={{height: '300px', width: '100%'}}/></Col>
                            </Row>
                        </SectionMap>
                        <style>{
                            `
                        .gmnoprint{
                        display:none;
                        }
                        
                        `
                        }</style>
                    </>)
            }


        </div>
    )
}
