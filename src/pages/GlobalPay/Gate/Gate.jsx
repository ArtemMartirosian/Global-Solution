import React, {useState, useEffect, useRef} from 'react'
import {useTranslation} from "react-i18next";
import InputMask from 'react-input-mask';
import {Row, Col, Collapse, Form, Input, Button, Alert, Checkbox } from 'antd'

import {MainDiv, PopUpDiv, ButtonChat} from "./styles";
import {Pic1, Pic2, Pic3, Pic4, ArrowRight, Chat, CloseButton} from "../../../assets/icons";
import {Helmet} from "react-helmet-async";
import {FeedBackApiClient, ADMIN_PANEL_PAY} from "../../../api";
import {Link} from "react-router-dom";
import MapSection from "../../../components/Map/Map";
import {SectionContacts} from "../Main/styles";



export  default function Gate(props){
    const {t} = useTranslation()
    const {locale,contacts } = props
    const [form] = Form.useForm();
    const [showPopUp, setShowPopup] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [loader, setLoader] = useState(false)



    useEffect(()=>{
        if(alertSuccess){
            form.resetFields();
        }
    }, [alertSuccess])

    const onFinish = async (values)=>{
        setLoader(true)
        window.grecaptcha.ready(function() {
            window.grecaptcha.execute('6Lc1l2caAAAAAMJY54sSmK6Z2jUP5GFbWq23ey9_', {action: 'submit'}).then(function(token) {

                    const data = {...values, adminPanel: ADMIN_PANEL_PAY}
                    FeedBackApiClient.createFeedBack(token, data)
                        .then(()=>{
                            setLoader(false)
                            setAlertSuccess(true)
                            setAlertError(false)
                            setTimeout(()=>{
                                setAlertSuccess(false)
                            }, 4000)
                        })
                        .catch(()=>{
                            setLoader(false)
                            setAlertError(true)
                            setTimeout(()=>{
                                setAlertError(false)
                            }, 4000)
                        })

            });
        });

    }

    return(
        <MainDiv>
            <Form.Provider onFormFinish={(name, { values, forms }) => {
                if(name==='formorder'){
                    const { formorder } = forms;
                    formorder.setFieldsValue({name: '', cellphone: '', INN:'', website: '', platform: []})
                }
            }}>
            <PopUp show={showPopUp} setShowPopup={(val)=>setShowPopup(val)} form={form}/>
            <ButtonChat onClick={()=>setShowPopup(true)}><Chat/></ButtonChat>
            <section className='d-flex justify-content-between align-items-center container'>

                <div className='col-lg-6 block_content_text pr-30'>
                    <h1>{t('gate.title1')}</h1>
                    <p>{t('gate.text1')}</p>
                </div>
                <div className='col-lg-6 block_content_image pl-30 mt-md-30'>
                    <img src="/images/illustrations/global pay connect.png" alt=""/>
                </div>
            </section>

            <section className='d-flex justify-content-between align-items-center container'>
                <div className='col-lg-6 block_content_image pr-30'>
                    <img src="/images/illustrations/photo.png" alt=""/>
                </div>
                <div className='col-lg-6 block_content_text pl-30 mt-md-30'>
                    <h1>{t('gate.title2')}</h1>
                    <p>{t('gate.text2')}</p>
                </div>
            </section>

            <section className='d-flex justify-content-between align-items-center position-relative container'>
                <div className='col-lg-7 col-12 block_content_text pr-30'>
                    <h1>{t('gate.title3')}</h1>
                    <ul>
                        {Array.from(Array(6).keys()).map(item=>{
                            return(
                                <li key={item} className='check'><span>{t(`gate.text3.${item+1}`)}</span></li>
                            )
                        })}
                    </ul>
                </div>
                <div className='col-lg-5 block_content_image pl-30 block_image_position mt-md-30'>
                    <img src="/images/illustrations/photo2.png" alt=""/>
                </div>
            </section>

            <section className='d-flex justify-content-between align-items-center container'>
                <div className='col-lg-6 block_content_image pr-30'>
                    <img src="/images/illustrations/pic-payments.png" alt=""/>
                </div>
                <div className='col-lg-6 col-12 block_content_text pl-30 mt-md-30'>
                    <h1>{t('gate.title4')}</h1>
                    <ul>
                        {Array.from(Array(2).keys()).map(item=>{
                            return(
                                <li key={item} className='check'><span>{t(`gate.text4.${item+1}`)}</span></li>
                            )
                        })}
                    </ul>
                </div>
            </section>

            <section className='d-flex justify-content-between align-items-center container'>

                <div className='col-lg-6 block_content_text pr-30'>
                    <h1>{t('gate.title5')}</h1>
                    <p>{t('gate.text5')}</p>
                </div>
                <div className='col-lg-6 block_content_image pl-30 mt-md-30'>
                    <img src="/images/illustrations/photo3.png" alt=""/>
                </div>
            </section>

            <section className='container position-relative'>
                <h1 className='text-center'>{t('gate.title6')}</h1>
                <Row className='block_row_images'>

                    <div className='position-absolute block_items_top d-flex'>
                        <div className='block_item'>
                            <div className='block_img'>
                                <img src="/images/illustrations/icon01.png" alt=""/>
                            </div>
                            <div className='position-relative text_info'>
                                <p className='d-flex align-items-center'> {t('gate.text6.8')}</p>
                            </div>
                            <div className='block_info_text'>
                                <p>{t('gate.text6.5')}</p>
                            </div>
                            <div className='block_img_line'>
                                <img src="/images/illustrations/path186.png" alt=""/>
                            </div>
                        </div>
                        <div className='block_item'>
                            <div className='d-flex'>
                                <div className='block_img'>
                                    <img src="/images/illustrations/icon-uzcard.png" alt="image"/>
                                </div>
                                <div className='block_img'>
                                    <img src="/images/illustrations/Humo.png" alt="image"/>
                                </div>
                            </div>
                            <div className='position-relative text_info'>
                                <p className='d-flex align-items-center'>{t('gate.text6.7')}</p>
                            </div>
                            <div className='block_info_text'>
                                <p>{t('gate.text6.5')}</p>
                            </div>
                            <div className='block_img_line'>
                                <img src="/images/illustrations/path186.png" alt="image"/>
                            </div>
                        </div>
                    </div>


                    <Col lg={6} md={24} className='block_content_text'>
                        <div>
                            <Pic1 />
                        </div>
                        <div className='position-relative'>
                            <p className='text_info d-flex align-items-center'>{t('gate.text6.1')}</p>
                            <div className='block_info_text'>
                                <p>{t('gate.text6.5')}</p>
                            </div>
                        </div>

                    </Col>
                    <Col lg={6} md={24} className='block_content_text'>
                        <div>
                            <Pic2 />
                        </div>
                        <div className='position-relative'>
                            <p className='text_info d-flex align-items-center'>{t('gate.text6.2')}</p>
                            <div className='block_info_text'>
                                <p>{t('gate.text6.5')}</p>
                            </div>
                        </div>

                    </Col>
                    <Col lg={6} md={24} className='block_content_text'>
                        <div>
                            <Pic3 />
                        </div>
                        <div className='position-relative'>
                            <p className='text_info d-flex align-items-center'>{t('gate.text6.3')}</p>
                            <div className='block_info_text'>
                                <p>{t('gate.text6.5')}</p>
                            </div>
                        </div>

                    </Col>
                    <Col lg={6} md={24} className='block_content_text'>
                        <div>
                            <Pic4 />
                        </div>
                        <div className='position-relative'>
                            <p className='text_info d-flex align-items-center'>{t('gate.text6.4')}</p>
                            <div className='block_info_text'>
                                <p>{t('gate.text6.5')}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <button className='button_test' onClick={()=>setShowPopup(true)}>{t('gate.text6.6')}</button>
            </section>


            <section className='d-flex justify-content-between align-items-center container'>

                <div className='col-lg-6 block_content_text pr-30'>
                    <h1>{t('gate.title7')}</h1>
                    <ul>
                        {Array.from(Array(7).keys()).map((item, index)=>{
                            if(index===5){
                                return(
                                    <li key={item} className='check'><p>{t(`gate.text7.${item+1}`)} <span>Global Pay </span></p></li>
                                )
                            }else if(index===6){
                                return(
                                    <li key={item} className='check'><p><span to={`/${locale}/global-id`}>Global Id</span> {t(`gate.text7.${item+1}`)}</p></li>
                                )
                            }else{
                                return(
                                    <li key={item} className='check'><p>{t(`gate.text7.${item+1}`)}</p></li>
                                )
                            }
                        })}
                    </ul>
                </div>

                <div className='col-lg-6 block_content_image pl-30'>
                    <img src="/images/illustrations/photo5.png" alt=""/>
                </div>
            </section>

            <section className='container block_bank_bg'>
                <h1 className='text-center'>{t('gate.title8')}</h1>
            </section>

            <section className='container d-none'>
                <h1 className='text-center'>{t('gate.title9')}</h1>

                <Collapse accordion className='question-answer col-12'>
                    {Array.from(Array(3).keys()).map(item=>{
                        return(
                            <Collapse.Panel header={t(`gate.text9.question-${item+1}`)} key={item}>
                                <p>{t(`gate.text9.answer-${item+1}`)}</p>
                            </Collapse.Panel>
                        )
                    })}
                </Collapse>
            </section>

            <section className='container form-application'>
                <h1 className='text-center'>{t('gate.title10')}</h1>
                <p className='text-center'>{t('gate.text10.1')}</p>

                <Form className='col-lg-4' layout="vertical" onFinish={onFinish} form={form} name='feedback'>

                    <Form.Item
                        name='name'
                        label={t('gate.text10.2')}
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input />

                    </Form.Item>

                    <Form.Item
                        name='theme'
                        label={t('Main.text20')}
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input />

                    </Form.Item>



                    <Form.Item
                        name='cellphone'
                        label={t('gate.text10.3')}
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <InputMask mask="+999 99 999 99 99">
                            {(inputProps) =>   <Input {...inputProps} />}
                        </InputMask>

                    </Form.Item>
                    <Button htmlType="submit" className='button-submit' loading={loader}>{t('gate.text10.4')}</Button>
                </Form>
                {alertSuccess?<Alert message={t('id.Main.text53')} type="success" showIcon />:''}
                {alertError?<Alert message={t('id.Main.text56')} type="error" showIcon />:''}
            </section>

            <section className='block-documents position-relative'>

                <Row className='container mx-auto' justify="space-between" gutter={24}>
                    <Col lg={12} span={24} className='item-block-content'>
                       <div>
                           <div className='text-block'>
                               <h1>{t('date.document01')}</h1>
                               <p>{t('date.document02')}</p>
                           </div>

                           <a href='https://test-follower-api.globalpay.uz/swagger-ui.html#/follower-controller' target='_blank' rel='noreferrer'><ArrowRight /></a>
                       </div>
                    </Col>

                    <Col lg={12} span={24} className='item-block-content'>
                        <div>
                            <div className='text-block'>
                                <h1>{t('date.document03')}</h1>
                                <p>{t('date.document02')}</p>
                            </div>

                            <a href='/договор мерчанты last (3).docx' target='_blank' rel='noreferrer'><ArrowRight /></a>
                        </div>
                    </Col>
                </Row>
            </section>

            <SectionContacts>
                <Row className='position-relative container'>
                    <Col lg={12}>
                        <h1>{t('footer-cat3')}</h1>
                        <div>
                            <Row gutter={24}>
                                <Col lg={8}><p>{t('id.Main.text54')}</p></Col>
                                <Col lg={16}><p>{contacts&&contacts.address[locale]?contacts.address[locale]:''}</p></Col>
                            </Row>
                            <Row gutter={24}>
                                <Col lg={8}><p>{t('id.Main.text49')}</p></Col>
                                <Col lg={16}><p>{contacts&&contacts.cellphone?contacts.cellphone:''}</p></Col>
                            </Row>
                            <Row gutter={24}>
                                <Col lg={8}><p>Email</p></Col>
                                <Col lg={16}><p>{contacts&&contacts.mail?contacts.mail:''}</p></Col>
                            </Row>
                            <Row gutter={24}>
                                <Col lg={8}><p>{t('id.Main.text55')}</p></Col>
                                <Col lg={16}><p>Пн-Пт с 9.00 до 18.00</p></Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={12} className='section-map'>
                        <MapSection style={{ height: '180px', width: '100%', padding: 0 }} />
                    </Col>

                </Row>

            </SectionContacts>
            </Form.Provider>
        </MainDiv>
    )
}

function PopUp(data){

    const {t} = useTranslation()
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const [form] = Form.useForm()

    const {setShowPopup} = data
    const [loader, setLoader] = useState(false)

    const validateMessages = {
        required: 'Это поле обязательно для заполнения'
    };



    const onFinish = (values)=>{
        setLoader(true)
        window.grecaptcha.ready(function() {
            window.grecaptcha.execute('6Lc1l2caAAAAAMJY54sSmK6Z2jUP5GFbWq23ey9_', {action: 'submit'}).then(function(token) {

                const ValueData = {
                    name: values.name,
                    cellphone: values.cellphone,
                    theme: `Заявка на интеграцию платёжного шлюза GPG ${Array.isArray(values.platform)&&values.platform.length?values.platform.join(', '): ' '}.\n
            Наименование Компании: ${values.name},\n INN: ${values.INN?values.INN:'-'},\n Website: ${values.website?values.website:'-'}`
                }
                const data = {...ValueData, adminPanel: ADMIN_PANEL_PAY}

                FeedBackApiClient.createFeedBack(token, data)
                    .then(()=>{
                        setAlertSuccess(true)
                        setAlertError(false)
                        setLoader(false)

                        setTimeout(()=>{
                            setAlertSuccess(false)
                            setShowPopup(false)
                        }, 2000)
                    })
                    .catch(()=>{
                        setAlertError(true)
                        setLoader(false)

                    })

            });
        });


    }


    return(
        <PopUpDiv className={data.show? 'show': ''}>

            <button  className='close-form' onClick={()=>{
                setShowPopup(false)

            }}><CloseButton /></button>
            <Col lg={20} md={20} sm={24} className='popUp-wrap container-lg'>
                <Col lg={12} span={24}>
                    <h1 className='text-center'>{t('gate.title12')}</h1>
                </Col>

                <Col lg={18}>
                    <Form
                        onFinish={onFinish}
                        name='formorder'
                        validateMessages={validateMessages}
                        layout="vertical">

                        <Form.Item name='platform'  className='checkbox-group'>
                            <Checkbox.Group>
                                <Row className='checkbox-group'>
                                    <Checkbox value={t('gate.text12.6')}>{t('gate.text12.6')}</Checkbox>
                                    <Checkbox value={t('gate.text12.7')}>{t('gate.text12.7')}</Checkbox>
                                    <Checkbox value={t('gate.text12.8')}>{t('gate.text12.8')}</Checkbox>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>

                        <Form.Item name='name' label={t('gate.text12.1')} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='cellphone'
                            initialValue={initialValues.cellphone}
                            label={t('gate.text10.3')}
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <InputMask mask="+999 99 999 99 99">
                                {(inputProps) =>   <Input {...inputProps} />}
                            </InputMask>

                        </Form.Item>


                        <Form.Item name='INN' label={t('gate.text12.2')}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='website' label={t('gate.text12.3')}>
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit' data-action='submit' loading={loader}>{t('gate.text12.4')}</Button>
                        </Form.Item>
                        {alertSuccess?<Alert message={t('id.Main.text53')} type="success" showIcon />:''}
                        {alertError?<Alert message={t('id.Main.text56')} type="error" showIcon />:''}
                    </Form>
                </Col>
            </Col>
        </PopUpDiv>
    )
}


