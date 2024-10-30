import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import "@fancyapps/ui/dist/fancybox.css";
import { Checkbox, Col, Form, Input, Row } from 'antd'
import ReactPlayer from "react-player";
import { config } from "react-spring";


/*-----Styles----*/
import {
    ButtonCarousel,
    EdditionalServices,
    Integration,
    ModalError,
    ModalForm,
    ModalSuccess,
    Proccess,
    ScrollTop,
    SectionBanner,
    SectionCarouselClients,
    SectionCarouselDemo,
    SectionConnect,
    SectionSertificat,
    SectionWithUs,
    ToolTipCustom
} from "./styles";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../../index";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { ADMIN_PANEL_PAY, FeedBackApiClient, image_download, LicensesClient, Seo } from "../../../api";
import { CloseModal } from "../../../assets/icons";
import { Link, useLocation } from "react-router-dom";
import { renderMeta } from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import { urlCleaner } from "../../../utils/url-cleaner";
import { renderMetaPixel } from "../../../utils/meta-pixels";
import TrackTransactions from "./components/track-transactions/track-transactions";
import VisaRates from "./components/visa-rates/visa-rates";
import RatesItem from './components/rates/rates'


function Fancybox(props) {
    const delegate = props.delegate || "[data-fancybox]";


    useEffect(() => {
        logEvent(analytics, 'global_blog_page_visited');
        const opts = props.options || {};

        NativeFancybox.bind(delegate, opts);

        return () => {
            NativeFancybox.destroy();
        };
    }, []);

    return <>{props.children}</>;
}

function SampleNextArrow(props) {
    const { onClick, currentSlide, slideCount, slideShow } = props

    return (
        <ButtonCarousel
            className={`arrow-next ${currentSlide === slideCount - slideShow ? 'd-none' : 'd-block'}`}
            onClick={onClick}
        >
            <img src='/images/icons/global-pay/arrow-right.svg' />
        </ButtonCarousel>
    )
}

function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props

    return (
        <ButtonCarousel
            className={`arrow-prev ${currentSlide > 0 ? 'd-block' : 'd-none'}`}
            onClick={onClick}
        >
            <img src='/images/icons/global-pay/arrow-left.svg' />
        </ButtonCarousel>
    )
}


function RenderTitle(props) {
    const { t } = useTranslation()
    if (props.stepperActive) {
        return (<p className='mb-0'>{t('global-id.form_title')}</p>)
    }

    return (<p className='mb-0'>{t('global-id.form_title')}</p>)

}


function RenderTitleTooltip() {
    const { t } = useTranslation()
    return (<>
        <p className='mb-2' style={{ fontWeight: 700 }}>{t('global-id.tooltip1')}</p>
        <p className='mb-0'>{t('global-id.tooltip2')} </p>
    </>)

}

function RederTitleTg() {
    return (
        <p className="mb-0">Мы свяжемся с Вами через Telegram и подберем удобное время для более подробного
            обсуждения </p>
    )
}


export default function GlobalPayMain(props) {
    const { t } = useTranslation()
    const { contacts, locale } = props
    const [imageIndex, setImageIndex] = useState(0)
    const [imageCurrent, setImageCurrent] = useState(0)
    const [sertificate, setSertificate] = useState([])
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [card, setCard] = useState([])
    const [platform, setPlatform] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm();
    const [stepper, setStepper] = useState(1)
    const [withStepper, setWithStepper] = useState(false)
    const [integrationEx, setIntegrationEx] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [licenceCurrent, setLicenseCurrent] = useState(0)
    const [goToSlide, setGoToSlide] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(false)
    const [controls, setControls] = useState("play")
    const [controlsHide, setControlsHide] = useState(false)
    const [dataLoading, setDataLoading] = useState(false)


    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)



    const spring_settings = {
        goToSlide: goToSlide,
        offsetRadius: 2,
        showNavigation: true,
        config: config.gentle
    };

    let switchControls = () => {
        let state = controls === "play" ? "pause" : "play"
        setControls(state)
        let video = document.querySelector('video')

        if (state === 'play') {
            video.pause()
            setControlsHide(false)

        } else {
            video.play()
            setTimeout(() => setControlsHide(true), [1500])

        }

    }


    // useEffect(()=>{
    //     let sliders_array = Array.from(document.querySelectorAll('.slider-3d[data-fancybox]'))
    //     sliders_array.forEach(item=>{
    //         item.removeAttribute('data-fancybox')
    //     })
    //
    //     let slider_active = document.querySelector('.slider-3d.active')
    //     slider_active.setAttribute('data-fancybox', "")
    //
    // }, [currentSlide])


    useEffect(() => {
        setCurrentSlide(goToSlide)
    }, [goToSlide])


    const images = [
        {
            org: '/images/globalPay/img_5.png',
            min: '/images/globalPay/img_5-min.png'
        },
        {
            org: '/images/globalPay/img_6.png',
            min: '/images/globalPay/img_6-min.png'
        },
        {
            org: '/images/globalPay/img_7.png',
            min: '/images/globalPay/img_7-min.png'
        }
    ]

    const sliders = images.map((item, index) => {
        return {
            key: index,
            content: <img src={item.min} data-src={item.org} alt={index} className='slider-3d' />
        }
    }).map((slide, index) => {


        if (index === goToSlide) {
            return {
                ...slide,
                content: <img src={slide.content.props.src} className='slider-3d active'
                    data-src={slide.content.props['data-src']} />
            }
        }

        return {
            ...slide, onClick: () => {
                setGoToSlide(index)
            }
        };
    });


    useEffect(() => {
        LicensesClient.getAll({ type: ADMIN_PANEL_PAY })
            .then(result => {
                if (result.data.content.length && result.data.content[0].id) {
                    setSertificate(result?.data?.content ?? [])
                }
            })
    }, [])

    useEffect(() => {

        if (window) {
            const listener = () => {
                const video = document.getElementById('video-window')
                const elem = video.getBoundingClientRect()

                if (elem.top - 300 < 0) {
                    video.classList.add('video-scale-start')
                }

                if (window.pageYOffset === 0) {
                    video.classList.remove('video-scale-start')
                }

                if (elem.bottom < 80 && elem.bottom > 0) {
                    video.classList.remove('video-scale-start')
                }
            }
            window.addEventListener('scroll', listener);


            return () => {
                window.removeEventListener('scroll', listener)
            }
        }


    }, [])


    const clients = [
        {
            img: '/images/globalPay/img_8.png',
            figseption: t('pay_slide1.title'),
            text: t('pay_slide1'),
            payments_system: ['/images/icons/global-pay/uzcard-big.svg', '/images/icons/global-pay/humo-big.svg', '/images/icons/global-pay/visa-big.svg', '/images/icons/global-pay/mastercard-big.svg']
        },
        {
            img: '/images/globalPay/img_9.png',
            figseption: t('pay_slide2.title'),
            text: t('pay_slide2'),
            payments_system: ['/images/icons/global-pay/uzcard-big.svg', '/images/icons/global-pay/humo-big.svg', '/images/icons/global-pay/visa-big.svg', '/images/icons/global-pay/mastercard-big.svg']
        },
        {
            img: '/images/globalPay/img_10.png',
            figseption: t('pay_slide3.title'),
            text: t('pay_slide3'),
            payments_system: ['/images/icons/global-pay/uzcard-big.svg', '/images/icons/global-pay/humo-big.svg', '/images/icons/global-pay/visa-big.svg', '/images/icons/global-pay/mastercard-big.svg']
        },
        {
            img: '/images/globalPay/img_11.png',
            figseption: t('pay_slide4.title'),
            text: t('pay_slide4'),
            payments_system: ['/images/icons/global-pay/uzcard-big.svg', '/images/icons/global-pay/humo-big.svg', '/images/icons/global-pay/visa-big.svg', '/images/icons/global-pay/mastercard-big.svg']
        }
    ]

    const settings = {
        centerPadding: 0,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        focusOnSelect: true,
        speed: 500,
        beforeChange: (current, next) => {
            setGoToSlide(next)
            setCurrentSlide(current)
        }
    };

    const settings_modal = {
        centerPadding: 0,
        slidesToScroll: 1,
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        focusOnSelect: true,
        speed: 500
    };

    const settings2 = {
        className: "carousel-clients",
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        beforeChange: (current, next) => {
            setImageIndex(next)
            setImageCurrent(current)
        },
        nextArrow: <SampleNextArrow slideShow={1} />,
        prevArrow: <SamplePrevArrow slideShow={1} />,
        responsive: [{
            breakpoint: 991,
            settings: {
                arrows: false,
                nextArrow: false,
                prevArrow: false,
                dots: false
            }
        }]
    };

    const settings3 = {
        className: "carousel-documents",
        infinite: false,
        slidesToShow: 3,
        speed: 500,
        beforeChange: (current) => {
            setLicenseCurrent(current)
        },
        mobileFirst: true,
        nextArrow: <SampleNextArrow slideShow={3} />,
        prevArrow: <SamplePrevArrow slideShow={3} />,
        responsive: [

            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                }
            },

        ]
    };

    useEffect(() => {
        logEvent(analytics, 'global_pay_main_page_visited');
    }, [])


    const options1 = [
        {
            label: 'Uzcard',
            value: 'UZCARD',
        },
        {
            label: 'Humo',
            value: 'HUMO',
        },
        {
            label: 'Visa',
            value: 'VISA',
        },
        {
            label: 'Mastercard',
            value: 'MASTERCARD',
        },
    ];

    const options2 = [
        {
            label: 'Android',
            value: 'ANDROID',
        },
        {
            label: 'iOS',
            value: 'IOS',
        },
        {
            label: t('form_site'),
            value: 'WEB',
        },
        {
            label: 'Telegram',
            value: 'TG_BOT',
        },
    ];

    async function onFinish(values) {
        setDataLoading(true)
        setErrorMessage(null)
        setLoading(true)
        window.grecaptcha.ready(function () {
            window.grecaptcha.execute('6Lc1l2caAAAAAMJY54sSmK6Z2jUP5GFbWq23ey9_', { action: 'submit' }).then(function (token) {
                const dataRequest = {
                    ...values,
                    paymentSystems: card.length ? card : null,
                    platforms: platform.length ? platform : null,
                    adminPanel: ADMIN_PANEL_PAY,
                    theme: t('form-message-success'),
                    fileExist: true
                }
                FeedBackApiClient.createFeedBack(token, dataRequest)
                    .then(() => {
                        setAlertSuccess(true)
                        setIsModalOpen(false)
                        setWithStepper(false)
                        setStepper(1)
                        setCard([])
                        setPlatform([])
                        setAlertError(false)
                        form.resetFields()
                        setLoading(false)
                        setDataLoading(false)
                    })
                    .catch((e) => {
                        setAlertError(true)
                        setErrorMessage(t('Form.error'))
                        setIsModalOpen(false)
                        setTimeout(() => {
                            setAlertError(false)
                        }, 4000)
                        setLoading(false)
                        setDataLoading(false)
                    })
            });
        });


    }


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
        if (document !== undefined) {
            window.addEventListener("scroll", () => {
                let buttonScroll = document.querySelector(".scroll-top-button")
                if (buttonScroll) {
                    if (window.pageYOffset >= 700) {
                        buttonScroll.classList.add("visible-btn")
                    } else {
                        buttonScroll.classList.remove("visible-btn")
                    }
                    if (window.pageYOffset >= 5175) {
                        buttonScroll.classList.add("color-button")
                    } else {
                        buttonScroll.classList.remove("color-button")
                    }
                }
            })
        }

        return () => {
            window.removeEventListener("scroll", () => {
                let buttonScroll = document.querySelector(".scroll-top-button")
                if (buttonScroll) {
                    if (window.pageYOffset >= 700) {
                        buttonScroll.classList.add("visible-btn")
                    } else {
                        buttonScroll.classList.remove("visible-btn")
                    }
                    if (window.pageYOffset >= 5175) {
                        buttonScroll.classList.add("color-button")
                    } else {
                        buttonScroll.classList.remove("color-button")
                    }
                }
            })
        }
    }, [])

    function scrollTop() {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        <section>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''} />
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''} />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={renderMeta('/global-pay', locale, 'title')} />
                <meta property="og:description" content={renderMeta('/global-pay', locale, 'og:description')} />
                <meta property="og:url" content={renderMeta('/global-pay', locale, 'og:url')} />
                <meta property="og:type" content={renderMeta('/global-pay', locale, 'og:type')} />
                <meta property="og:site_name" content={renderMeta('/global-pay', locale, 'og:site_name')} />
                <meta property="og:image" content={renderMeta('/global-pay', locale, 'og:image')} />
                {renderMetaPixel()}

            </Helmet>
            {/*<ButtonChat className='position-fixed' ><GlobalPayChat /></ButtonChat>*/}
            <ScrollTop className="scroll-top-button" onClick={scrollTop}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.5833 12.3943V31.6666H17.4166V12.3943L8.92365 20.8873L6.68481 18.6485L19 6.33331L31.3151 18.6485L29.0763 20.8873L20.5833 12.3943Z"
                        fill="white" />
                </svg>
            </ScrollTop>

            <ModalSuccess itemScope itemType="http://schema.org/ImageObject"
                width={window.innerWidth <= 992 ? '100%' : '496px'} footer={null} visible={alertSuccess}>

                <img itemProp='contentUrl' src='/images/icons/global-pay/check-success.svg' />

                <div>
                    <h2>{t('pay_form.request.success')}</h2>
                    <p>{t('pay_form.request.success2')}</p>
                    <div className="warning-text">
                        <span>
                            <svg width="23" height="22" viewBox="0 0 23 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.5 20.1667C6.43724 20.1667 2.33333 16.0627 2.33333 11C2.33333 5.93725 6.43724 1.83333 11.5 1.83333C16.5627 1.83333 20.6667 5.93725 20.6667 11C20.6667 16.0627 16.5627 20.1667 11.5 20.1667ZM11.5 18.3333C13.4449 18.3333 15.3102 17.5607 16.6854 16.1854C18.0607 14.8102 18.8333 12.9449 18.8333 11C18.8333 9.05508 18.0607 7.18982 16.6854 5.81455C15.3102 4.43928 13.4449 3.66667 11.5 3.66667C9.55507 3.66667 7.68981 4.43928 6.31455 5.81455C4.93928 7.18982 4.16666 9.05508 4.16666 11C4.16666 12.9449 4.93928 14.8102 6.31455 16.1854C7.68981 17.5607 9.55507 18.3333 11.5 18.3333ZM10.5833 6.41667H12.4167V8.25H10.5833V6.41667ZM10.5833 10.0833H12.4167V15.5833H10.5833V10.0833Z"
                                    fill="#F38A23" />
                            </svg>
                        </span>
                        {t('form_site4')}
                    </div>
                </div>
                <button onClick={() => setAlertSuccess(false)}>{t('close')}</button>
            </ModalSuccess>


            <ModalError itemScope itemType="http://schema.org/ImageObject"
                width={window.innerWidth <= 992 ? '100%' : '496px'} footer={null} visible={alertError}>
                <img itemProp='contentUrl' src='/images/globalPay/error-icon.svg' />

                <div>
                    <h2>{t('global-id.form_error1')}</h2>

                    <p>{errorMessage}</p>
                </div>

                <button onClick={() => setAlertError(false)}>{t('close')}</button>
            </ModalError>

            <ModalForm width={window.innerWidth <= 992 ? '100%' : '90%'}
                style={window.innerWidth >= 992 ? { top: "15px" } : { top: "120px" }} closeIcon={<CloseModal />}
                title={integrationEx?.title} footer={null} visible={!!integrationEx} onCancel={() => {
                    setIntegrationEx(null)
                }}>
                <div className='block-example'>

                    <div itemScope itemType="http://schema.org/ImageObject"
                        className={`img-example ${window.innerWidth <= 556 ? '' : 'd-flex justify-content-center'} `}>

                        {
                            window.innerWidth <= 556 ? (<>
                                <Slider {...settings_modal}>
                                    {
                                        (integrationEx?.imgs || []).map((img, index) => {
                                            return (

                                                <div itemScope itemType="http://schema.org/ImageObject"
                                                    className='text-center' key={index}>
                                                    <img itemProp='contentUrl' className='mx-auto'
                                                        style={{ width: img.width_mobile }} src={img.src} alt=""
                                                        key={index} />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </>) : (<>{
                                (integrationEx?.imgs || []).map((img, index) => {
                                    return (
                                        <img itemProp='contentUrl' style={{ width: img.width, height: img.height }}
                                            src={img.src} alt="" key={index} />
                                    )
                                })
                            }</>)
                        }

                    </div>
                    <p>{integrationEx?.desc}</p>
                </div>
            </ModalForm>
            <ModalForm width={window.innerWidth <= 992 ? '100%' : '690px'} closeIcon={<CloseModal />}
                title={<RenderTitle stepper={stepper} stepperActive={withStepper} />} footer={null}
                visible={isModalOpen} onCancel={() => {
                    setIsModalOpen(false)
                    setWithStepper(false)
                    setStepper(1)
                    setCard([])
                    setPlatform([])
                    form.resetFields()
                }}>
                {dataLoading ? <div className="modal-preloader">
                    <div className="preloader-img">
                        <img src="/images/globalPay/preloader-form.png" alt="" />
                    </div>
                    <p>{t('form_site3')}</p>
                </div> : ''}
                {withStepper && (<Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                        companyName: '',
                        cellphone: '',
                        name: '',
                        email: '',
                        description: ''
                    }}
                >
                    <Row gutter={[24]}>
                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label={t('pay_form.label4')}
                                name="companyName"
                                rules={[
                                    {
                                        required: false,
                                        message: t('pay_form.required1'),
                                    }
                                ]}
                            >
                                <Input placeholder={t('pay_form.label4')} />
                            </Form.Item>
                            <ToolTipCustom overlayInnerStyle={{ borderRadius: 8, padding: 12, width: '300px' }}
                                color='#EA5430' placement="right" title={<RenderTitleTooltip />}>
                                <span className='icon-tooltip'><svg width="14" height="14" viewBox="0 0 14 14"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.9987 13.6673C3.3167 13.6673 0.332031 10.6827 0.332031 7.00065C0.332031 3.31865 3.3167 0.333984 6.9987 0.333984C10.6807 0.333984 13.6654 3.31865 13.6654 7.00065C13.6654 10.6827 10.6807 13.6673 6.9987 13.6673ZM6.9987 12.334C8.41319 12.334 9.76974 11.7721 10.7699 10.7719C11.7701 9.77169 12.332 8.41514 12.332 7.00065C12.332 5.58616 11.7701 4.22961 10.7699 3.22942C9.76974 2.22922 8.41319 1.66732 6.9987 1.66732C5.58421 1.66732 4.22766 2.22922 3.22746 3.22942C2.22727 4.22961 1.66536 5.58616 1.66536 7.00065C1.66536 8.41514 2.22727 9.77169 3.22746 10.7719C4.22766 11.7721 5.58421 12.334 6.9987 12.334V12.334ZM6.33203 3.66732H7.66536V5.00065H6.33203V3.66732ZM6.33203 6.33398H7.66536V10.334H6.33203V6.33398Z"
                                        fill="#6C757D" />
                                </svg></span>
                            </ToolTipCustom>
                        </Col>

                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label={t('pay_form.label6')}
                                name="name"

                                rules={[
                                    {
                                        required: true,
                                        message: t('pay_form.required1'),
                                    },
                                ]}
                            >
                                <Input placeholder={t('pay_form.label7')} />
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row gutter={[24]}>
                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label="Telegram"
                                name="cellphone"
                                rules={[
                                    {
                                        required: true,
                                        message: t('pay_form.required1'),
                                    }
                                ]}
                            >
                                <Input type="text" placeholder={t('form_site1')} className='w-100' onChange={(e) => {
                                    form.setFieldsValue({ cellphone: form.getFieldValue('cellphone').replace(/[аА-яЯ]+/g, '') })
                                }
                                } />
                            </Form.Item>
                            <ToolTipCustom overlayInnerStyle={{ borderRadius: 8, padding: 12, width: '300px' }}
                                color='#EA5430' placement="right" title={<RederTitleTg />}>
                                <span className='icon-tooltip'><svg width="14" height="14" viewBox="0 0 14 14"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.9987 13.6673C3.3167 13.6673 0.332031 10.6827 0.332031 7.00065C0.332031 3.31865 3.3167 0.333984 6.9987 0.333984C10.6807 0.333984 13.6654 3.31865 13.6654 7.00065C13.6654 10.6827 10.6807 13.6673 6.9987 13.6673ZM6.9987 12.334C8.41319 12.334 9.76974 11.7721 10.7699 10.7719C11.7701 9.77169 12.332 8.41514 12.332 7.00065C12.332 5.58616 11.7701 4.22961 10.7699 3.22942C9.76974 2.22922 8.41319 1.66732 6.9987 1.66732C5.58421 1.66732 4.22766 2.22922 3.22746 3.22942C2.22727 4.22961 1.66536 5.58616 1.66536 7.00065C1.66536 8.41514 2.22727 9.77169 3.22746 10.7719C4.22766 11.7721 5.58421 12.334 6.9987 12.334V12.334ZM6.33203 3.66732H7.66536V5.00065H6.33203V3.66732ZM6.33203 6.33398H7.66536V10.334H6.33203V6.33398Z"
                                        fill="#6C757D" />
                                </svg></span>
                            </ToolTipCustom>
                        </Col>

                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label={t('pay_form.label8')}
                                name="email"

                                rules={[
                                    {
                                        type: 'email',
                                        message: t('pay_form.required3'),
                                    },
                                    {
                                        required: true,
                                        message: t('pay_form.required1'),
                                    },
                                ]}
                            >
                                <Input onChange={() => {
                                    form.setFieldsValue({ email: form.getFieldValue('email').replace(/[аА-яЯ]+/g, '') })
                                }
                                } placeholder={t('pay_form.label9')} />
                            </Form.Item>
                        </Col>
                    </Row>


                    <Form.Item
                        label={t('pay_form.label10')}
                        name="description"

                    >
                        <Input.TextArea placeholder={t('pay_form.label11')} showCount maxLength={100} />
                    </Form.Item>

                    {/*<Row className='block-row-connects'>*/}
                    {/*    <p>{t('form_site2')}: </p>*/}
                    {/*    <div className='d-flex'>*/}
                    {/*        {*/}
                    {/*            card.concat(platform).map((item, index) => {*/}
                    {/*                if (window.innerWidth >= 768 ? index <= 2 : index <= 1) {*/}
                    {/*                    let label = options1.concat(options2).find(opt => opt.value === item)*/}
                    {/*                    return (*/}
                    {/*                        <div key={item} className='item-list-connect'>{label?.label}</div>*/}
                    {/*                    )*/}
                    {/*                }*/}

                    {/*            })*/}
                    {/*        }*/}
                    {/*        /!*{card.concat(platform).length > (window.innerWidth >= 768 ? 3 : 1) ? (<div*!/*/}
                    {/*        /!*    className='item-list-connect'>+ {window.innerWidth >= 768 ? card.concat(platform).length - 3 : card.concat(platform).length - 2}</div>) : ''}*!/*/}

                    {/*    </div>*/}
                    {/*</Row>*/}

                    {errorMessage ? <div className='error-message-server'>
                        <p>{errorMessage}</p>
                    </div> : ''}


                    <Form.Item>
                        <button type='submit' className='d-block mx-auto' disabled={loading}>
                            {t('send')}
                        </button>
                    </Form.Item>
                </Form>)}

            </ModalForm>

            <SectionBanner>
                <div className='top-banner'>
                    <div className='banner-text'>
                        <h1>Global Pay Gate</h1>
                        <p>{t('pay_banner.text1')}</p>
                        <button onClick={() => {
                            setIsModalOpen(true)
                            setWithStepper(true)
                        }}>{t('connect')}</button>
                    </div>
                    <div className='big-round-wrap'>
                        <div className='big-round'>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/uzcard.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug-right.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/visa.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/humo.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/mastercard.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug-right.svg' />
                            </div>
                        </div>
                    </div>

                    <div className='small-round-wrap'>
                        <div className='small-round'>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/telegram.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug-right.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/web.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/ios.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/android.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug.svg' />
                            </div>
                            <div itemScope itemType="http://schema.org/ImageObject"
                                className='position-absolute icon-round'><img itemProp='contentUrl'
                                    src='/images/icons/global-pay/krug-right.svg' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='video-block position-relative'>
                    <div className='video-wrap container' id='video-window'>
                        <ReactPlayer url={`/videos/video-global-pay.mp4`} controls={false} width="100%" height="100%" />
                        <button itemScope itemType="http://schema.org/ImageObject" onClick={switchControls}
                            className={`${controlsHide ? 'hide' : ''}`}>
                            {controls === 'play' ? (
                                <img itemProp='contentUrl' src="/images/icons/global-pay/play.svg" alt="" />) : (
                                <img itemProp='contentUrl' src="/images/icons/global-pay/stop.svg" alt="" />)}
                        </button>
                    </div>
                </div>
            </SectionBanner>
            <SectionConnect id="connect">
                <div className='container'>
                    <div className='d-flex position-relative justify-content-between'>
                        <div className='col-lg-5 item-block-connect'>
                            <div className='block-chek-list col-lg-7'>
                                <p>{t('pay_connect.text1')}</p>
                                <Checkbox.Group options={options1} value={card} onChange={(value) => setCard(value)} />
                                <div className='round-icon' itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src="/images/icons/global-pay/logo-gp.svg" alt="" />
                                </div>
                                <div className={`img-shnur ${card.length && platform.length ? 'img-connect' : ''}`} />
                            </div>
                        </div>
                        <div itemScope itemType="http://schema.org/ImageObject"
                            className='img-round-center position-absolute'><img itemProp='contentUrl'
                                src="/images/icons/global-pay/around-big-connect.svg"
                                alt="" /></div>
                        <div className='col-lg-5 item-block-connect'>
                            <div className='block-chek-list col-lg-7' style={{ marginLeft: 'auto' }}>
                                <p>{t('pay_connect.text2')}</p>
                                <Checkbox.Group options={options2} value={platform}
                                    onChange={(value) => setPlatform(value)} />
                                <div className='round-icon d-flex'>
                                    <div itemScope itemType="http://schema.org/ImageObject">
                                        <img itemProp='contentUrl' src="/images/icons/global-pay/bag-icon.svg" alt="" />
                                        <p>{t('pay_connect.text3.1')}<br /> {t('pay_connect.text3.2')}</p>
                                    </div>
                                </div>
                                <div className={`img-shnur ${card.length && platform.length ? 'img-connect' : ''}`} />
                            </div>
                        </div>
                    </div>
                    <button className='button-connect' onClick={() => {
                        setIsModalOpen(true)
                        setWithStepper(true)
                    }}
                        disabled={!(card.length && platform.length)}>{t('connect')}</button>
                </div>
            </SectionConnect>
            <Integration>
                <div className="integration container">
                    <h1>{t('pay_integration.text7')}</h1>
                    <div className="integration__wrapper row gx-8">
                        <div className="integration__wrapper_block col-md-4">
                            <div>
                                <h4>{t('pay_connect.text4')}</h4>
                                <div className="wrapper_img" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src='/images/icons/global-pay/substract.svg'></img>
                                    <button onClick={() => setIntegrationEx({
                                        title: t('pay_integration.text5'),
                                        imgs: [{
                                            width: '85%',
                                            width_mobile: '100%',
                                            height: '100%',
                                            src: `${locale === 'ru' ? "/images/globalPay/ex01.jpg" : locale === 'uz' ? "/images/globalPay/ex01uZ.jpg" : locale === 'en' ? "/images/globalPay/ex01eN.jpg" : ''}`
                                        }],
                                        desc: t('design_interface')
                                    })}>{t('example')}</button>
                                </div>
                            </div>
                        </div>

                        <div className="integration__wrapper_block col-md-4">
                            <div>
                                <h4>{t('pay_integration.text6')}</h4>
                                <div className="wrapper_img" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src='/images/icons/global-pay/substract2.svg'></img>
                                    <button onClick={() => setIntegrationEx({
                                        title: t('pay_integration.text6'),
                                        imgs: [{
                                            width: '21%',
                                            width_mobile: '50%',
                                            height: '100%',
                                            src: locale === 'ru' ? '/images/globalPay/mobile1.jpg' : locale === 'uz' ? '/images/globalPay/mobile1uZ.jpg' : locale === 'en' ? '/images/globalPay/mobile1eN.jpg' : ''
                                        },
                                        {
                                            width: '21%',
                                            width_mobile: '50%',
                                            height: '100%',
                                            src: locale === 'ru' ? '/images/globalPay/mobile2.jpg' : locale === 'uz' ? '/images/globalPay/mobile2uZ.jpg' : locale === 'en' ? '/images/globalPay/mobile2eN.jpg' : ''
                                        },
                                        {
                                            width: '21%',
                                            width_mobile: '50%',
                                            height: '100%',
                                            src: locale === 'ru' ? '/images/globalPay/mobile3.jpg' : locale === 'uz' ? '/images/globalPay/mobile3uZ.jpg' : locale === 'en' ? '/images/globalPay/mobile3eN.jpg' : ''
                                        }],
                                        desc: t('design_interface1')
                                    })}>{t('example')}</button>
                                </div>
                            </div>
                        </div>

                        <div className="integration__wrapper_block col-md-4">
                            <div>
                                <h4>{t('pay_integration.text8')}</h4>
                                <div className="wrapper_img" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src='/images/icons/global-pay/substract3.svg'></img>
                                    <button onClick={() => setIntegrationEx({
                                        title: t('pay_integration.text9'),
                                        imgs: [{
                                            width: '20%',
                                            width_mobile: '50%',
                                            height: '100%',
                                            src: locale === 'ru' ? '/images/globalPay/modal2.jpg' : locale === 'uz' ? '/images/globalPay/modal2uZ.jpg' : locale === 'en' ? '/images/globalPay/modal2eN.jpg' : ''
                                        },
                                        {
                                            width: '20%',
                                            width_mobile: '50%',
                                            height: '100%',
                                            src: locale === 'ru' ? '/images/globalPay/modal3.jpg' : locale === 'uz' ? '/images/globalPay/modal3uZ.jpg' : locale === 'en' ? '/images/globalPay/modal3eN.jpg' : ''
                                        }],
                                        desc: t('design_interface2')
                                    })}>{t('example')}</button>
                                    <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay/telegram-pay`}>{t('readMore')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Integration>

            <SectionCarouselDemo>
                <div className='container'>
                    <h1>{t('global-pay.demo')}</h1>
                    <TrackTransactions />
                </div>
            </SectionCarouselDemo>
            <RatesItem />
            <VisaRates />
            <SectionCarouselClients>
                <div className='container'>
                    <h1>
                        {t('pay_clients.text1')}
                    </h1>
                    <Slider {...settings2}>
                        {
                            clients.map((item, index) => {
                                return (
                                    <div key={index} className='d-flex justify-content-between'>
                                        <div className='block_image position-relative col-6'>
                                            <div className="client-img" itemScope
                                                itemType="http://schema.org/ImageObject">
                                                <img itemProp='contentUrl' src={item.img} />
                                            </div>
                                            <span className='position-absolute'>{item.figseption}</span>
                                        </div>

                                        <div className='block_description col-6'>
                                            <div className='text'>{item.text}</div>
                                            <p>{t('pay_clients.text2')}:</p>
                                            <div className='payments d-flex'>
                                                {
                                                    item.payments_system.map((payment, ind) => {
                                                        return (
                                                            <div key={ind} itemScope
                                                                itemType="http://schema.org/ImageObject">
                                                                <img itemProp='contentUrl' src={payment} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </SectionCarouselClients>
            <SectionWithUs>
                <div className="container">
                    <div className="row with-us">
                        <div className="col-md-6 col-12">
                            <div className="with-us_block">
                                <h2>{t('pay_withUs.text1')}</h2>
                                <p>{t('pay_withUs.text2')}</p>
                                <a itemScope itemType="http://schema.org/ImageObject" className="with-us__site"
                                    href="https://tashkent-airport.uz/" target="_blank" rel='nofollow'><img
                                        itemProp='contentUrl' src="/images/icons/global-pay/web-site.svg" alt="" />tashkent-airport.uz</a>
                                <div className="with-us__mag">
                                    <a itemScope itemType="http://schema.org/ImageObject"
                                        href="https://play.google.com/store/apps/details?id=uz.global.ia" target="_blank"
                                        rel='nofollow'><img itemProp='contentUrl'
                                            src="/images/icons/global-pay/google-play.svg" alt="" /></a>
                                    <a itemScope itemType="http://schema.org/ImageObject"
                                        href="https://apps.apple.com/uz/app/airport-tashkent/id1581648106"
                                        target="_blank" rel='nofollow'><img itemProp='contentUrl'
                                            src="/images/icons/global-pay/app-store.svg"
                                            alt="" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="images-wrap">
                                <div className='img-01' itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src={locale === 'ru' ? '/images/globalPay/Airport web.png' : locale === 'uz' ? '/images/globalPay/Airport webuZ.png' : locale === 'en' ? '/images/globalPay/Airport webeN.png' : ''}></img>
                                </div>
                                <div className='img-02' itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src={locale === 'ru' ? '/images/globalPay/Airport mobile.png' : locale === 'uz' ? '/images/globalPay/Airport mobileuZ.png' : locale === 'en' ? '/images/globalPay/Airport mobileeN.png' : ''}></img>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </SectionWithUs>
            <SectionSertificat>
                <div className='container'>
                    <h1>{t('pay_sertificate.text1')}</h1>
                    <Slider {...settings3} key={sertificate.join('')}>
                        {
                            sertificate.map((item) => {
                                return (
                                    <div key={item.id} className='item-document'>
                                        <div>
                                            <div className='img-documents' data-fancybox=""
                                                data-src={item.fileId ? `${image_download}?fileKey=${item.fileId.url}` : ''}
                                                itemScope itemType="http://schema.org/ImageObject">
                                                <img itemProp='contentUrl'
                                                    src={item.fileId ? `${image_download}?fileKey=${item.fileId.url}` : ''} />
                                            </div>
                                            <div className='text-documents'>
                                                <h6 className="title">{item.name[locale] ? item.name[locale] : ''} </h6>
                                                <p>{item.org[locale] ? item.org[locale] : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </SectionSertificat>
            <Proccess>
                <h2>{t('pay_process.text1')} </h2>
                <div className="container">
                    <div className="proccess row gap-md-5">

                        <div className="proccess__block col-md-4 col-6">
                            <a href="/типовой_договор_31_07_24_final.pdf" target='_blank' rel='nofollow'>
                                <span>{t('pay_process.text2')}</span>
                                <div className="proccess__block_img" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src="/images/icons/global-pay/dogovor.svg" alt="" />
                                </div>
                            </a>
                        </div>

                        <div className="proccess__block col-md-4 col-6">
                            <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay/docs/getCardInfo`}>
                                <span>{t('pay_process.text3')}</span>
                                <div className="proccess__block_img" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src="/images/icons/global-pay/dev.svg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Proccess>

            <EdditionalServices>
                <h1>{t('pay_service.text1')}</h1>
                <div className="container">
                    <div className="services row gx-8">
                        <div className="col-md-4 mt-block">
                            <a href={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay/services/2`}
                                className="services__link bg_orange">
                                <div className="services__link_top">
                                    <img src="/images/icons/global-pay/split.svg" alt="" />
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt="" />
                                    </span>
                                </div>
                                <p>{t('pay_service.text3')}</p>
                            </a>
                        </div>
                        {/*<div className="col-md-4 mt-block">*/}
                        {/*    <a href={`/${locale}/global-pay/services/2`} className="services__link bg_orange">*/}
                        {/*        <div className="services__link_top">*/}
                        {/*            <img src="/images/icons/global-pay/split.svg" alt=""/>*/}
                        {/*            <span>*/}
                        {/*                <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*        <p>{t('pay_service.text3')}</p>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        <div className="col-md-4 mt-block">
                            <Link to={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay/telegram-pay`}
                                className="services__link bg_orange">
                                <div className="services__link_top">
                                    <img src="/images/icons/global-pay/user-plus.svg" alt="" />
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt="" />
                                    </span>
                                </div>
                                <p>{t('pay_service.text4')}</p>
                            </Link>
                        </div>
                        {/*<div className="col-md-4 mt-block">*/}
                        {/*    <a href="#" className="services__link bg_blue">*/}
                        {/*        <div className="services__link_top">*/}
                        {/*            <img src="/images/icons/global-pay/smartphone.svg" alt=""/>*/}
                        {/*            <span>*/}
                        {/*                <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*        <p>Заказать разработку мобильного приложения </p>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-4 mt-block">*/}
                        {/*    <a href="#" className="services__link bg_blue">*/}
                        {/*        <div className="services__link_top">*/}
                        {/*            <img src="/images/icons/global-pay/web-line.svg" alt=""/>*/}
                        {/*            <span>*/}
                        {/*                <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*        <p>Заказать разработку вебсайта </p>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        <div className="col-md-4 mt-block">

                            <a href={`${locale === 'ru' ? '/' : `/${locale}/`}global-id`}
                                className="services__link bg_blue">
                                <div className="services__link_top">
                                    <img src="/images/icons/global-pay/finger.svg" alt="" />
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt="" />
                                    </span>
                                </div>
                                <p>{t('pay_service.text7')}</p>
                            </a>
                        </div>
                    </div>
                    {/*<div className="services-button">*/}
                    {/*    <button>{t('pay_service.text8')}</button>*/}
                    {/*</div>*/}
                </div>
            </EdditionalServices>

        </section>
    )
}


