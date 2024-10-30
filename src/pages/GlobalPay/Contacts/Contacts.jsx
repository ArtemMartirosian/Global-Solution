import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import InputMask from "react-input-mask";
import {ADMIN_PANEL_GLOBAL, FeedBackApiClient, Seo} from "../../../api";

/*---Components---*/
import MapSection from "../../../components/Map/Map";
import {Alert, Button, Col, Form, Input, Row} from 'antd';

/*---Styles----*/
import {SectionContacts, SectionMap, SectionTop} from "./style";
import {Helmet} from "react-helmet-async";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../index";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {useLocation} from "react-router-dom";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";


export default function ContactsPay(props){
    const {t}  = useTranslation()
    const {locale, contacts} = props
    const [form] = Form.useForm();
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)

    const validateMessages = {
        required: t('error-input2'),
        types: {
            email: t('error-input')
        }
    };

    useEffect(()=>{
        Seo.getAll()
            .then((response) => {
                if (response) {
                    const foundResponse = response.find((item) => `/${item.url}` === urlCleaner(location.pathname))
                    if (foundResponse) {
                        setSeoData(foundResponse)
                    }
                }
            })
        const head = document.querySelector('.robot')
        if(head) {head.remove()}
        logEvent(analytics, 'global_contacts_page_visited');
    }, [])

    useEffect(()=>{
        if(alertSuccess){
            form.resetFields();
        }
    }, [alertSuccess])

    const onFinish = (values) => {

        window.grecaptcha.ready(function() {
            window.grecaptcha.execute('6Lc1l2caAAAAAMJY54sSmK6Z2jUP5GFbWq23ey9_', {action: 'submit'}).then(function(token) {
                const data = {...values, adminPanel: ADMIN_PANEL_GLOBAL}
                FeedBackApiClient.createFeedBack(token, data)
                    .then(()=>{
                        setAlertSuccess(true)
                        setAlertError(false)

                        setTimeout(()=>{
                            setAlertSuccess(false)
                        }, 4000)
                    })
                    .catch(()=>{
                        setAlertError(true)
                        setTimeout(()=>{
                            setAlertError(false)
                        }, 4000)
                    })
            });
        });


    };

    return(
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/contacts', locale, 'title')} />
                <meta property="og:description" content={renderMeta('/contacts', locale, 'og:description')} />
                <meta property="og:url" content={renderMeta('/contacts', locale, 'og:url')} />
                <meta property="og:type" content={renderMeta('/contacts', locale, 'og:type')} />
                <meta property="og:site_name" content={renderMeta('/contacts', locale, 'og:site_name')} />
                <meta property="og:image" content={renderMeta('/contacts', locale, 'og:image')} />
                {renderMetaPixel()}
                <link rel="canonical" href="https://global.uz/contacts" />
            </Helmet>
            <SectionTop className="section-pagetop font-segoe">
                <video className="bg-video" autoPlay={true} loop={true} muted={true} playsInline={true}>
                    <source src="/images/videobg.mp4" type="video/mp4"/>
                </video>
                <div className="container">
                    <h1 className="title-page text-white">{t('Main.title10')}</h1>
                </div>
            </SectionTop>
            <SectionContacts className='container'>
                <Row>
                    <Col className='info-contacts' lg={12} md={12} span={24}>
                        <Row>
                            <div className='icon-inf'>
                                <i className="icon icon-sm bg-light text-primary rounded icons8-phone"/>
                            </div>
                            <div className='text-inf'>
                                <h6>{t('Main.text16')}</h6>
                                <p>{contacts&&contacts.cellphone?contacts.cellphone:'-'}</p>
                            </div>
                        </Row>
                        <Row>
                            <div className='icon-inf'>
                                <i className="icon icon-sm bg-light text-primary rounded icons8-new-post" />
                            </div>
                            <div className='text-inf'>
                                <h6>{t('Main.text17')}</h6>
                                <p>{contacts&&contacts.mail?contacts.mail:'-'}</p>
                            </div>
                        </Row>
                        <Row>
                            <div className='icon-inf'>
                                <i className="icon icon-sm bg-light text-primary rounded icons8-map"/>
                            </div>
                            <div className='text-inf'>
                                <h6>{t('Main.text18')}</h6>
                                <p>{contacts&&contacts.address?(contacts.address[locale]?contacts.address[locale]:''):'-'}</p>
                            </div>
                        </Row>
                    </Col>

                    <Col className='feedback-form' lg={12} md={12} span={24}>
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            validateMessages={validateMessages}
                            form={form}
                        >

                            <Col lg={12} md={12} span={24}>
                                <Form.Item label={t('Main.text19')} required name='name' rules={[{ required: true }]}>
                                    <Input  />
                                </Form.Item>
                            </Col>
                            <Col lg={12} md={12} span={24}>
                                <Form.Item
                                    label='E-mail'
                                    required
                                    name='email'
                                    rules={[{ type: 'email', required: true }]}
                                >
                                    <Input  />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label={t('Main.text21')} required name='cellphone' rules={[{ required: true }]}>
                                    <InputMask mask="+999 99 999 99 99">
                                        {(inputProps) =>   <Input {...inputProps} />}
                                    </InputMask>
                                </Form.Item>
                            </Col>
                            <Col lg={12} md={12} span={24}>
                                <Form.Item
                                    label={t('Main.text20')}
                                    required
                                    name='theme'
                                    rules={[{ required: true }]}
                                >
                                    <Input  />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label={t('Main.text22')} required name='description' rules={[{ required: true }]}>
                                    <Input.TextArea />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" data-action='submit'>{t('Main.text23')}</Button>
                                </Form.Item>
                            </Col>
                        </Form>
                        {alertSuccess?<Alert message={t('id.Main.text53')} type="success" showIcon />:''}
                        {alertError?<Alert message={t('id.Main.text56')} type="error" showIcon />:''}

                    </Col>

                </Row>
            </SectionContacts>

            <SectionMap>
                <MapSection style={{ height: '540px', width: '100%' }} center={{ lat: 41.2918943,
                    lng: 69.2683172
                }}/>
            </SectionMap>

        </>
    )
}
