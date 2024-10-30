import React, {useEffect, useRef, useState} from 'react'
import {useTranslation} from "react-i18next";
import {Col, Form, Input, Row} from 'antd';
import {Helmet} from 'react-helmet-async';
import {ADMIN_PANEL_ID, FeedBackApiClient, image_download, LicensesClient,} from "../../../api";
import {analytics} from "../../../index";
import {logEvent} from "firebase/analytics";
import Carousel from "react-spring-3d-carousel";
import {config} from "react-spring";
import {Fancybox, images, phone_images} from "./constanats_data";


/*---styles---*/
import {
    ButtonCarousel,
    CalculationSection,
    DecreeSection,
    EdditionalServices,
    ModalForm,
    ParallaxSection,
    ProgressBarImage,
    SectionAdaptationProject,
    SectionAnimationService,
    SectionBanner,
    SectionBenefit,
    SectionCarousel3D,
    SectionDemo,
    SectionGlobalId,
    SectionOurPartners,
    SectionSertificat,
    SectionWithUs,
    Solutions,
    ToolTipTable,
    TreeService,
    UploadImage
} from "./style";
import ReactPlayer from "react-player";
import {CloseModal} from "../../../assets/icons";
import {ModalError, ModalSuccess, ScrollTop, ToolTipCustom} from "../../GlobalPay/Main/styles";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {renderMetaPixel} from "../../../utils/meta-pixels";


function SampleNextArrow(props) {
    const {onClick, currentSlide, slideCount, slideShow} = props

    return(
        <ButtonCarousel
            className={`arrow-next ${currentSlide===slideCount-slideShow?'d-none':'d-block'}`}
            onClick={onClick}
        >
            <img src='/images/icons/global-pay/arrow-right.svg'/>
        </ButtonCarousel>
    )
}

function SamplePrevArrow(props) {
    const {onClick, currentSlide} = props

    return(
        <ButtonCarousel
            className={`arrow-prev ${currentSlide>0?'d-block':'d-none'}`}
            onClick={onClick}
        >
            <img src='/images/icons/global-pay/arrow-left.svg'/>
        </ButtonCarousel>
    )
}




export default function GlobalIdMain(props){
    const {contacts, locale} = props
    const {t} = useTranslation()
    const formRef = useRef(null)
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentScroll, setCurrentScroll] = useState(1)
    const [form] = Form.useForm();
    const [demo, setDemo] = useState("web")
    const [activeScroll, setActiveScroll] = useState(false)
    const [buttonsTransition, setButtonsTransition] = useState('up')
    const [licenceCurrent, setLicenseCurrent] = useState(0)
    const [sertificate, setSertificate] = useState([])
    const [goToSlide, setGoToSlide] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [adaptiveProjectObject, setAdaptiveProjectObject] = useState({background:'#fff', button:'#806EFF', logo:null})
    const [progress, setProgress] = useState(0);
    const [fileNameUpload, setFileNameUpload] = useState('');
    const [errorUpload, setErrorUpload] = useState(null)
    const [solutionState, setSolutionState] = useState('0')
    const [loading, setLoading] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [controls, setControls] = useState("play")
    const [controlsHide, setControlsHide] = useState(false)


    useEffect(()=>{
        window.addEventListener('resize', (e)=>{
            setWindowSize(window.innerWidth)
        })

        return ()=>{
            window.removeEventListener('resize', (e)=>{
                setWindowSize(window.innerWidth)
            })
        }
    }, [])

    let switchControls = ()=>{
        let state = controls==="play"?"pause":"play"
        setControls(state)
        let video = document.querySelector('video')

        if(state==='play'){
            video.pause()
            setControlsHide(false)

        }else{
            video.play()
            setTimeout(()=>setControlsHide(true), [1500])

        }

    }



    const handleChange = ({file, cancel=false}) => {

        if(!cancel){
            setFileNameUpload(file.name)
            if(file.status==='uploading'){
                setProgress(50)
            }else if(file.originFileObj) {
                setProgress((prev)=>prev+20)
                let reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = function () {
                    setProgress((prev)=>prev+30)
                    setAdaptiveProjectObject({...adaptiveProjectObject, logo: reader.result})
                    setTimeout(()=>setProgress(0),500)
                };

            }
        }else{
            setProgress(0)
            setFileNameUpload('')
            setAdaptiveProjectObject({...adaptiveProjectObject, logo: null})
        }

    }



    useEffect(()=>{
        LicensesClient.getAll({type: ADMIN_PANEL_ID})
            .then(result=>{
                if(result.data.content.length && result.data.content[0].id){
                    setSertificate(result?.data?.content??[])
                }
            })
    }, [])

    useEffect(()=>{
        if(window){
            const listener = ()=>{
                const video = document.getElementById('video-window')

                const elem = video.getBoundingClientRect()

                if(elem.top - 300<0){
                    video.classList.add('video-scale-start')
                }

                if(window.pageYOffset === 0){
                    video.classList.remove('video-scale-start')
                }

                if(elem.bottom <80 && elem.bottom>0){
                    video.classList.remove('video-scale-start')
                }
            }


            window.addEventListener('scroll', listener);


            return ()=>{
                window.removeEventListener('scroll', listener)
            }
        }




    },[])


    useEffect(()=>{

        let blocks = Array.from(document.querySelectorAll('.hidden_block'))
        blocks.forEach(item=>item.style.height='0px')
        let activeBlock = document.querySelector(`.hidden_block.show`)
        let hiddenBlock = document.querySelector(`.hidden_block.show>div`)
        if(activeBlock){
            activeBlock.style.height = `${hiddenBlock.offsetHeight+20}px`
        }

    }, [solutionState])


    useEffect(()=>{

        let sliders_array = Array.from(document.querySelectorAll('.slider-3d[data-fancybox]'))
        sliders_array.forEach(item=>{
            item.removeAttribute('data-fancybox')
        })

        let slider_active = document.querySelector('.slider-3d.active')
        slider_active.setAttribute('data-fancybox', "")

    }, [currentSlide])

    useEffect(()=>{
        setCurrentSlide(goToSlide)
    },[goToSlide])


    useEffect(()=>{

        const listener = (e)=>{
            const scrollsBlock = document.getElementById('parallax-wrap'),
                top = scrollsBlock?scrollsBlock.parentElement.offsetTop-200:0

            if(window.pageYOffset>=top){
                setButtonsTransition('down')
                setActiveScroll(true)

            }else{
                setButtonsTransition('up')
                e.preventDefault()
                setCurrentScroll(1)
                setActiveScroll(false)
            }

        }
        window.addEventListener('scroll', listener)

        return ()=>{
            window.removeEventListener('scroll', listener)
        }
    }, [])

    useEffect(()=>{
        let container_div = document.getElementById('parallax-wrap')

        if(container_div){


            const listener = ()=>{
                let container = document.getElementById('parallax-wrap')
                let items = container?Array.from(container.querySelectorAll('div[data-item]')):[]

                items.forEach((item, index)=>{

                    let number = item.getAttribute('data-item')

                    if(window.pageYOffset>=item.getBoundingClientRect().y-400+window.pageYOffset){
                        setCurrentScroll(+number)
                    }

                })


            }

            if(document!==undefined){
                window.addEventListener('scroll', listener, {passive: true})
            }





            return ()=>{
                window.removeEventListener('scroll', listener)
            }
        }
    }, [])



    const settings3 = {
        className: "carousel-documents",
        infinite: false,
        slidesToShow: 3,
        speed: 500,
        mobileFirst:true,
        beforeChange: (current)=>{
            setLicenseCurrent(current)
        },
        nextArrow: <SampleNextArrow slideShow={3}/>,
        prevArrow: <SamplePrevArrow slideShow={3}/>,
        responsive:[
            {
                breakpoint: 991,
                settings: {
                    slidesToShow:2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow:1,
                    nextArrow:false,
                    prevArrow:false
                }
            }
        ]
    };


    const spring_settings =  {
        goToSlide: goToSlide,
        offsetRadius: 2,
        showNavigation: true,
        config: config.gentle
    };


    const settings = {
        centerPadding: 0,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        focusOnSelect: true,
        speed: 500,
        beforeChange: (current, next)=>{
            setGoToSlide(next)
            setCurrentSlide(current)
        }
    };


    const sliders = images.map((item,index)=>{
        return  {
            key: index,
            content: <img src={item.min} data-src={item.org} alt={index} className='slider-3d' />
        }
    }).map((slide, index) => {

        if(index===goToSlide){
            return { ...slide, content:  <img src={slide.content.props.src}  className='slider-3d active' data-src={slide.content.props['data-src']}/>}
        }

        return { ...slide, onClick: () => {
                setGoToSlide(index)
            } };
    });




    useEffect(()=>{
        logEvent(analytics, 'global_id_main_page_visited');
    }, [])

    function RenderTitleTooltip(){
        return (<>
            <p className='mb-2' style={{fontWeight:700}}>{t('global-id.tooltip1')}</p>
            <p className='mb-0'>{t('global-id.tooltip2')}</p>
        </>)

    }

    function RenderTitleTooltipTable(){
        return (<>
            <p className='mb-2' style={{fontWeight:700}}>База данных</p>
            <p className='mb-0'>Место где будут храниться данные для сверки</p>
        </>)

    }


    function scrollToDiv(item){
        let container = document.getElementById('parallax-wrap')
        let div = container.querySelector("div[data-item='"+item+"']")

        let top = item===6?div.getBoundingClientRect().y-350:div.getBoundingClientRect().y -200
        window.scrollTo({
            top: top + window.pageYOffset,
            behavior: 'smooth'
        })


    }

    function RederTitleTg() {
        return(
            <p className="mb-0">Мы свяжемся с Вами через Telegram и подберем удобное время для более подробного обсуждения </p>
        )
    }



    const onFinish = (values)=>{
        setLoading(true)

        window.grecaptcha.ready(function() {
            window.grecaptcha.execute('6Lc1l2caAAAAAMJY54sSmK6Z2jUP5GFbWq23ey9_', {action: 'submit'}).then(function(token) {
                const data = {
                    ...values,
                    adminPanel: ADMIN_PANEL_ID,
                    fileExist: true
                }
                FeedBackApiClient.createFeedBack(token, data)
                    .then(()=>{
                        form.resetFields()
                        setIsModalOpen(false)
                        setAlertSuccess(true)
                        setAlertError(false)
                        setTimeout(()=>{
                            setAlertSuccess(false)
                        }, 4000)
                    })
                    .catch(()=>{
                        form.resetFields()
                        setIsModalOpen(false)
                        setAlertError(true)
                        setTimeout(()=>{
                            setAlertError(false)
                        }, 4000)
                    }).finally(() => setLoading(false))
            });
        });
    }

    useEffect(()=>{
        const head = document.querySelector('.robot')
        if(head) {head.remove()}
        if(document!==undefined) {
            window.addEventListener("scroll", ()=>{
                // const desc = document.getElementById('description-6')
                // const nav = document.querySelector('.sticky-nav')
                // if(desc.getBoundingClientRect().bottom-200<nav.getBoundingClientRect().bottom){
                //     setCurrentScroll(7)
                // }
                let buttonScroll = document.querySelector(".scroll-top-button")
                if(buttonScroll) {
                    if (window.pageYOffset >= 700) {
                        buttonScroll.classList.add("visible-btn")
                    } else {
                        buttonScroll.classList.remove("visible-btn")
                    }
                    if (window.pageYOffset >= 11085) {
                        buttonScroll.classList.add("color-button")
                    }else {
                        buttonScroll.classList.remove("color-button")
                    }
                }
            })
        }
        return ()=>{
            window.removeEventListener("scroll", ()=>{
                // const desc = document.getElementById('description-6')
                // const nav = document.querySelector('.sticky-nav')
                // if(desc.getBoundingClientRect().bottom-200<nav.getBoundingClientRect().bottom){
                //     setCurrentScroll(7)
                // }
                let buttonScroll = document.querySelector(".scroll-top-button")
                if (buttonScroll) {
                    if (window.pageYOffset >= 700) {
                        buttonScroll.classList.add("visible-btn")
                    } else {
                        buttonScroll.classList.remove("visible-btn")
                    }
                    if (window.pageYOffset >= 11085) {
                        buttonScroll.classList.add("color-button")
                    }else {
                        buttonScroll.classList.remove("color-button")
                    }
                }
            })
        }
    },[])

    function scrollTop(){
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    return(
        <>
            <Helmet>
                <title>{renderMeta('/global-id', locale, 'Title')}</title>
                <meta name="description" content={renderMeta('/global-id', locale, 'description')} />
                <meta name="keywords" content={renderMeta('/global-id', locale, 'keywords')} />
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content={renderMeta('/global-id', locale, 'title')} />
                <meta property="og:description" content={renderMeta('/global-id', locale, 'og:description')} />
                <meta property="og:url" content={renderMeta('/global-id', locale, 'og:url')} />
                <meta property="og:type" content={renderMeta('/global-id', locale, 'og:type')} />
                <meta property="og:site_name" content={renderMeta('/global-id', locale, 'og:site_name')} />
                <meta property="og:image" content={renderMeta('/global-id', locale, 'og:image')} />
                {renderMetaPixel()}
            </Helmet>
            {/*<ButtonChat className='position-fixed' ><GlobalPayChat /></ButtonChat>*/}
            <ScrollTop className="scroll-top-button" onClick={scrollTop}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5833 12.3943V31.6666H17.4166V12.3943L8.92365 20.8873L6.68481 18.6485L19 6.33331L31.3151 18.6485L29.0763 20.8873L20.5833 12.3943Z" fill="white"/>
                </svg>
            </ScrollTop>

            <ModalSuccess itemScope itemType="http://schema.org/ImageObject" width={window.innerWidth<=992?'100%':'496px'} footer={null} visible={alertSuccess}>
                <img itemProp='contentUrl' src='/images/icons/global-pay/check-success.svg'/>

                <div>
                    <h2>{t('pay_form.request.success')}</h2>
                    <p>{t('pay_form.request.success2')} </p>
                </div>

                <button onClick={()=>setAlertSuccess(false)}>{t('close')}</button>
            </ModalSuccess>
            <ModalError itemScope itemType="http://schema.org/ImageObject" width={window.innerWidth<=992?'100%':'496px'} footer={null} visible={!!errorUpload||alertError}>
                <img itemProp='contentUrl' src='/images/globalPay/error-icon.svg'/>

                <div>
                    <h2>{t('global-id.form_error1')}</h2>

                    <p>{alertError?t('Form.error'):errorUpload}</p>
                </div>

                <button onClick={()=>setErrorUpload(null)}>{t('close')}</button>
            </ModalError>
            <ModalForm width={window.innerWidth<=992?'100%':'42%'}  closeIcon={<CloseModal/>} title={t('global-id.form_title')} footer={null} visible={isModalOpen} onCancel={()=>{
                setIsModalOpen(false)
                setLoading(false)
                form.resetFields()
            }}>
                <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                    {loading ? <div className="modal-preloader">
                        <div className="preloader-img">
                            <img src="/images/globalId/preloader-id.png" alt=""/>
                        </div>
                        <p>{t('form_site3')}</p>
                    </div> : ''}
                <Row gutter={[12]}>
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
                            <Input  placeholder={t('global-id.form_label1')}/>
                        </Form.Item>
                        <ToolTipCustom overlayInnerStyle={{borderRadius:8, padding:12,width:"262px"}} color='#8F73FF' placement="right" title={<RenderTitleTooltip />}>
                                <span className='icon-tooltip'><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.9987 13.6673C3.3167 13.6673 0.332031 10.6827 0.332031 7.00065C0.332031 3.31865 3.3167 0.333984 6.9987 0.333984C10.6807 0.333984 13.6654 3.31865 13.6654 7.00065C13.6654 10.6827 10.6807 13.6673 6.9987 13.6673ZM6.9987 12.334C8.41319 12.334 9.76974 11.7721 10.7699 10.7719C11.7701 9.77169 12.332 8.41514 12.332 7.00065C12.332 5.58616 11.7701 4.22961 10.7699 3.22942C9.76974 2.22922 8.41319 1.66732 6.9987 1.66732C5.58421 1.66732 4.22766 2.22922 3.22746 3.22942C2.22727 4.22961 1.66536 5.58616 1.66536 7.00065C1.66536 8.41514 2.22727 9.77169 3.22746 10.7719C4.22766 11.7721 5.58421 12.334 6.9987 12.334V12.334ZM6.33203 3.66732H7.66536V5.00065H6.33203V3.66732ZM6.33203 6.33398H7.66536V10.334H6.33203V6.33398Z" fill="#6C757D"/>
                                </svg></span>
                        </ToolTipCustom>
                        <style>{
                            `
                             .ant-modal-body {
                                    position:relative;
                                }
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
                            <Input   placeholder={t('pay_form.label7')}/>
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={[12]}>
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
                            {/*<InputMask placeholder={t('pay_form.label5')}  mask='+99999999999999999' maskChar=" " className='w-100'/>*/}
                            <Input type="text" placeholder="Введите юзернейм / номер" className='w-100' onChange={(e)=>{
                                form.setFieldsValue({cellphone: form.getFieldValue('cellphone').replace(/[аА-яЯ]+/g, '')})
                            }
                            }/>
                        </Form.Item>
                        <ToolTipCustom overlayInnerStyle={{borderRadius:8, padding:12, width:'300px'}} color='#8F73FF' placement="right" title={<RederTitleTg />}>
                                <span className='icon-tooltip'><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.9987 13.6673C3.3167 13.6673 0.332031 10.6827 0.332031 7.00065C0.332031 3.31865 3.3167 0.333984 6.9987 0.333984C10.6807 0.333984 13.6654 3.31865 13.6654 7.00065C13.6654 10.6827 10.6807 13.6673 6.9987 13.6673ZM6.9987 12.334C8.41319 12.334 9.76974 11.7721 10.7699 10.7719C11.7701 9.77169 12.332 8.41514 12.332 7.00065C12.332 5.58616 11.7701 4.22961 10.7699 3.22942C9.76974 2.22922 8.41319 1.66732 6.9987 1.66732C5.58421 1.66732 4.22766 2.22922 3.22746 3.22942C2.22727 4.22961 1.66536 5.58616 1.66536 7.00065C1.66536 8.41514 2.22727 9.77169 3.22746 10.7719C4.22766 11.7721 5.58421 12.334 6.9987 12.334V12.334ZM6.33203 3.66732H7.66536V5.00065H6.33203V3.66732ZM6.33203 6.33398H7.66536V10.334H6.33203V6.33398Z" fill="#6C757D"/>
                                </svg></span>
                        </ToolTipCustom>
                    </Col>

                    <Col lg={12} md={12} span={24}>
                        <Form.Item
                            label={t('pay_form.label8')}
                            name="email"
                            shouldUpdate
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
                            <Input onChange={()=>{
                                form.setFieldsValue({email: form.getFieldValue('email').replace(/[аА-яЯ]+/g, '')})
                            }
                            }  placeholder={t('pay_form.label9')}/>
                        </Form.Item>
                    </Col>
                </Row>


                <Form.Item
                    label={t('pay_form.label10')}
                    name="description"

                >
                    <Input.TextArea placeholder={t('pay_form.label11')} showCount maxLength={100}/>
                </Form.Item>
                <Form.Item className="text-center" shouldUpdate>
                    {() => (
                        <button type='submit' disabled={
                            !(form.isFieldTouched('email')&&form.isFieldTouched('name')&&form.isFieldTouched('cellphone')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length > 0||loading}>
                            {t('send')}
                        </button>
                    )}

                </Form.Item>
            </Form>

            </ModalForm>
            <SectionBanner>
                <div className='top-banner'>
                    <div className='banner-text'>
                        <h1>Global ID Gate</h1>
                        <p>{t('global-id.banner')}</p>
                        <button onClick={()=>{
                            setIsModalOpen(true)
                        }}>{t('connect')}</button>
                    </div>
                    <div className='big-round-wrap'>
                        <div className='big-round'>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/passport.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/myid.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/face.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/oneid.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                        </div>
                    </div>

                    <div className='small-round-wrap'>
                        <div className='small-round'>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/nfc.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/myid.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/face.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/oneid.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                            <div className='position-absolute icon-round' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/icons/globalID/default.svg'/></div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className="video-block">
                        <div className='video-wrap' id='video-window'>
                            <ReactPlayer url={`/videos/global-id.mp4`} controls={false} width="100%" height="100%" />
                            <button onClick={switchControls} itemScope itemType="http://schema.org/ImageObject" className={`${controlsHide?'hide':''}`}>
                                {controls==='play'?(<img itemProp='contentUrl' src="/images/icons/globalID/play.svg" alt=""/>):(<img itemProp='contentUrl' src="/images/icons/globalID/stop.svg" alt=""/>)}
                            </button>
                        </div>
                    </div>
                </div>
            </SectionBanner>

            <SectionGlobalId className="container">
                <div className="global-id row">
                    <Col lg={12} sm={13} className="global-id__text">
                        <h3>Global ID Gate</h3>
                        <p>{t('global-id.sam')}</p>
                    </Col>
                    <Col lg={12} sm={11} className="global-id__img">
                        <div className="global-id__img_my">
                            <div className="my-id position-relative">
                                <div className="switch" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/switch-left.svg" alt=""/></div>
                                <div className="circle" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/myidsmall.svg" alt=""/></div>
                            </div>
                        </div>
                        <div className="global-id__img_photo" itemScope itemType="http://schema.org/ImageObject">
                            <img itemProp='contentUrl' src={locale==='ru'?"/images/globalId/simple.png":locale==='uz'?"/images/globalId/simpleuZ.png":locale==='en'?"/images/globalId/simpleeN.png":''} alt=""/>
                        </div>
                        <div className="global-id__img_one">
                            <div className="one-id position-relative">
                                <div className="switch" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/switch-right.svg" alt=""/></div>
                                <div className="circle" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/oneidsmall.svg" alt=""/></div>
                            </div>
                        </div>
                    </Col>
                </div>
            </SectionGlobalId>

            <SectionAnimationService>
                <TreeService className='container'>
                    <h1>{t('global-id.methods1')}</h1>

                    <div className='tree-block position-relative'>
                        <div className='tree-block-elem' itemScope itemType="http://schema.org/ImageObject">
                            <img src={windowSize>991?'':'/images/globalId/svg/three-arrow-mobile1.svg'}/>
                        </div>
                        <div className='logo-id' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src='/images/logo-id.svg'/></div>

                        <div className='tree-block-elem' itemScope itemType="http://schema.org/ImageObject">
                            <img itemProp='contentUrl' src={windowSize>991?'/images/globalId/svg/three-arrow.svg':'/images/globalId/svg/three-arrow-mobile2.svg'}/>
                        </div>

                        {windowSize>991?( <div className={`d-flex nav-buttons ${buttonsTransition==='up'?'state-up':'state-down'}`}>
                            <div className={`nav-button ${currentScroll===1&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                if(buttonsTransition==='up'){
                                    scrollToDiv(1)
                                }

                            }}>
                                <span className='icon-button icon-mrz'/>
                                <p>QR / MRZ</p>
                            </div>
                            <div className={`nav-button ${currentScroll===2&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                if(buttonsTransition==='up'){
                                    scrollToDiv(2)
                                }

                            }}>
                                <span className='icon-button icon-livenes'/>
                                <p>Liveness</p>
                            </div>
                            <div className={`nav-button ${currentScroll===3&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                if(buttonsTransition==='up'){
                                    scrollToDiv(3)
                                }

                            }}>
                                <span className='icon-button icon-nfc'/>
                                <p>NFC</p>
                            </div>
                            <div className={`nav-button ${currentScroll===4&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                if(buttonsTransition==='up'){
                                    scrollToDiv(4)
                                }

                            }}>
                                <span className='icon-button icon-location'/>
                                <p>Location</p>
                            </div>

                            <div className={`nav-button ${currentScroll===5&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                if(buttonsTransition==='up'){
                                    scrollToDiv(5)
                                }

                            }}>
                                <span className='icon-button icon-device'/>
                                <p>Device</p>
                            </div>
                            <div className={`nav-button ${currentScroll===6&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                if(buttonsTransition==='up'){
                                    scrollToDiv(6)
                                }

                            }}>
                                <span className='icon-button icon-biometric'/>
                                <p>Biometrics</p>
                            </div>
                        </div>):(
                            <div className='nav-buttons nav-buttons-mobile'>
                                <div className="d-flex justify-content-between wrap-mobile">
                                    <div className={`nav-button`} onClick={()=>{
                                        if(buttonsTransition==='up'){
                                            scrollToDiv(1)
                                        }

                                    }}>
                                        <span className='icon-button icon-mrz'/>
                                        <p>QR / MRZ</p>
                                    </div>
                                    <div className={`nav-button`} onClick={()=>{
                                        if(buttonsTransition==='up'){
                                            scrollToDiv(2)
                                        }

                                    }}>
                                        <span className='icon-button icon-livenes'/>
                                        <p>Liveness</p>
                                    </div>
                                    <div className={`nav-button `} onClick={()=>{
                                        if(buttonsTransition==='up'){
                                            scrollToDiv(3)
                                        }

                                    }}>
                                        <span className='icon-button icon-nfc'/>
                                        <p>NFC</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between wrap-mobile">
                                    <div className={`nav-button`} onClick={()=>{
                                        if(buttonsTransition==='up'){
                                            scrollToDiv(4)
                                        }

                                    }}>
                                        <span className='icon-button icon-biometric'/>
                                        <p>Biometrics</p>
                                    </div>

                                    <div className={`nav-button`} onClick={()=>{
                                        if(buttonsTransition==='up'){
                                            scrollToDiv(5)
                                        }

                                    }}>
                                        <span className='icon-button icon-location'/>
                                        <p>Location</p>
                                    </div>

                                    <div className={`nav-button`} onClick={()=>{
                                        if(buttonsTransition==='up'){
                                            scrollToDiv(6)
                                        }

                                    }}>
                                        <span className='icon-button icon-device'/>
                                        <p>Device</p>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                </TreeService>

                <ParallaxSection className='container' id='section-scrolling'>

                    <div className='parallax-container d-flex'>
                        <div id='parallax-wrap' className={`col-lg-6 col-md-12 ${activeScroll?'active':''} position-relative`}>
                            {
                                windowSize>991?(<div className={`d-flex nav-buttons sticky-nav 
                            ${buttonsTransition==='up'?'opacity-0':'opacity-1'} ${currentScroll<7?'position-sticky':'position-absolute disable-sticky'}`}>
                                    <div className={`nav-button ${currentScroll===1&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                        if(buttonsTransition==='down'){
                                            scrollToDiv(1)
                                        }

                                    }}>
                                        <span className='icon-button icon-mrz'/>
                                        <p>QR / MRZ</p>
                                    </div>
                                    <div className={`nav-button ${currentScroll===2&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                        if(buttonsTransition==='down'){
                                            scrollToDiv(2)
                                        }

                                    }}>
                                        <span className='icon-button icon-livenes'/>
                                        <p>Liveness</p>
                                    </div>
                                    <div className={`nav-button ${currentScroll===3&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                        if(buttonsTransition==='down'){
                                            scrollToDiv(3)
                                        }

                                    }}>
                                        <span className='icon-button icon-nfc'/>
                                        <p>NFC</p>
                                    </div>
                                    <div className={`nav-button ${currentScroll===4&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                        if(buttonsTransition==='down'){
                                            scrollToDiv(4)
                                        }

                                    }}>
                                        <span className='icon-button icon-location'/>
                                        <p>Location</p>
                                    </div>
                                    <div className={`nav-button ${currentScroll===5&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                        if(buttonsTransition==='down'){
                                            scrollToDiv(5)
                                        }
                                    }}>
                                        <span className='icon-button icon-device'/>
                                        <p>Device</p>
                                    </div>
                                    <div className={`nav-button ${currentScroll===6&&buttonsTransition==='down'?'active':''} col-4`} onClick={()=>{
                                        if(buttonsTransition==='down'){
                                            scrollToDiv(6)
                                        }

                                    }}>
                                        <span className='icon-button icon-biometric'/>
                                        <p>Biometrics</p>
                                    </div>
                                </div>):''
                            }



                            {
                                windowSize>991?( <div  className={`block_hide_gradient ${activeScroll&&(currentScroll>0&&currentScroll<6)?'':'d-none'}`}/>):''
                            }



                            <div className='description-verification'>
                                <div className='text-block col-lg-9 col-12' data-item='1'>
                                    <h2>{t('global-id.methods2')}</h2>
                                    <p>{t('global-id.methods3')}</p>
                                </div>

                                <div className={`col-12 phone-block fade-up ${windowSize>991?'d-none':''}`} >
                                    <div className='phone-border position-relative' style={{width:"180px",height:"400px"}}>
                                        <video loop={true} autoPlay={true} playsInline={true} muted={true} src={phone_images[1]}  className={`active`}/>
                                    </div>
                                </div>
                            </div>
                            <div className='description-verification'>
                                <div className='text-block col-lg-9 col-12' data-item='2'>
                                    <h2>{t('global-id.methods4')}</h2>
                                    <p>{t('global-id.methods5')}</p>
                                </div>
                                <div className={`col-12 phone-block fade-up ${windowSize>991?'d-none':''}`} >
                                    <div className='phone-border position-relative' style={{width:"180px",height:"400px"}}>
                                        <video loop={true} autoPlay={true} playsInline={true} muted={true} src={phone_images[2]}  className={`active`}/>
                                    </div>
                                </div>
                            </div>
                            <div className='description-verification'>
                                <div className='text-block col-lg-9 col-12' data-item='3'>
                                    <h2>{t('global-id.methods6')}</h2>
                                    <p>{t('global-id.methods7')}</p>
                                </div>
                                <div className={`col-12 phone-block fade-up ${windowSize>991?'d-none':''}`} >
                                    <div className='phone-border position-relative' style={{width:"180px",height:"400px"}}>
                                        <video loop={true} autoPlay={true} playsInline={true} muted={true} src={phone_images[3]}  className={`active`}/>
                                    </div>
                                </div>
                            </div>
                            <div className='description-verification'>
                                <div className='text-block col-lg-9 col-12' data-item='4'>
                                    <h2>{t('global-id.methods8')}</h2>
                                    <p>{t('global-id.methods9')}</p>
                                </div>
                                <div className={`col-12 phone-block monitor-block fade-up ${windowSize>991?'d-none':''}`} >
                                    <div className='phone-border monitor position-relative' style={{width:"320px",height:"250px"}}>
                                        <video loop={true} autoPlay={true} playsInline={true} muted={true} src={phone_images[6]}  className={`active`}/>
                                    </div>
                                </div>
                            </div>
                            <div className='description-verification'>
                                <div className='text-block col-lg-9 col-12' data-item='5'>
                                    <h2>{t('global-id.methods10')}</h2>
                                    <p>{t('global-id.methods11')}</p>
                                </div>

                                <div className={`col-12 phone-block monitor-block fade-up ${windowSize>991?'d-none':''}`} >
                                    <div className='phone-border monitor position-relative' style={{width:"320px",height:"250px"}}>
                                        <video loop={true} autoPlay={true} playsInline={true} muted={true} src={phone_images[4]}  className={`active`}/>
                                    </div>
                                </div>
                            </div>
                            <div className='description-verification' id='description-6' style={currentScroll<6?{paddingBottom:'600px'}:{}}>
                                <div className='text-block col-lg-9 col-12' data-item='6'>
                                    <h2>{t('global-id.methods12')}</h2>
                                    <p>{t('global-id.methods13')}</p>
                                </div>
                                <div className={`col-12 phone-block monitor-block fade-up ${windowSize>991?'d-none':''}`} >
                                    <div className='phone-border monitor position-relative' style={{width:"320px",height:"250px"}}>
                                        <video loop={true} autoPlay={true} playsInline={true} muted={true} src={phone_images[5]}  className={`active`}/>
                                    </div>
                                </div>
                            </div>

                        </div>




                        {
                            windowSize>991?( <div className={`col-6 phone-block ${buttonsTransition==='down'?'fade-up':'fade-down'} position-sticky`} >
                                <div className='phone-border position-relative' style={{width:currentScroll===4?"487px":currentScroll===5?"487px":currentScroll===6?"487px":"230px",height:currentScroll===4?"310px":currentScroll===5?"310px":currentScroll===6?"310px":"500px"}}>
                                    {/*<video autoPlay={currentScroll===1} src={phone_images[1]}  className={`${currentScroll===1?'active':''}`}/>*/}
                                    <video loop={true} autoPlay={true} playsInline={true} muted={true} className={`${currentScroll===1?'active':''}`} src={phone_images[1]}/>
                                    <video loop={true} autoPlay={true} playsInline={true} muted={true} className={`${currentScroll===2?'active':''}`} src={phone_images[2]}/>
                                    <video loop={true} autoPlay={true} playsInline={true} muted={true} className={`${currentScroll===3?'active':''}`} src={phone_images[3]}/>
                                    <video loop={true} autoPlay={true} playsInline={true} muted={true} className={`${currentScroll===4?'active':''} desctop-monitor`} src={phone_images[4]}/>
                                    <video loop={true} autoPlay={true} playsInline={true} muted={true} className={`${currentScroll===5?'active':''} desctop-monitor`} src={phone_images[5]}/>
                                    <video loop={true} autoPlay={true} playsInline={true} muted={true} className={`${currentScroll===6?'active':''} desctop-monitor`} src={phone_images[6]} style={{top:110}}/>
                                </div>
                            </div>):''
                        }
                    </div>

                </ParallaxSection>
            </SectionAnimationService>

            <Solutions className='container'>
                <h2>{t('global-id.solution')}</h2>

                <Row className={`solutions_wrap position-relative ${solutionState==='1'?'shadow-none':solutionState==='2'?'shadow-none':solutionState==='3'?'shadow-none':''}`}>
                    <Col lg={8} span={24} className={`solutions_item ${solutionState==='1'?'active br-none-bl':solutionState==='0'?'default':''}`}  onClick={()=>{
                        if(solutionState==='1') setSolutionState('0')
                        else setSolutionState('1')

                    }}>
                        <p>{t('global-id.solution1')}</p>
                        <p>{t('global-id.solution2')}</p>
                        <img src="/images/icons/globalID/solution-pic.svg" alt=""/>
                    </Col>
                    <div className={`hidden_block solution_item_1 mobi-block ${solutionState==='1'?'show':''}`}>
                        <Row justify='space-between'>
                            <Col md={11} className="item__info">
                                <div className="d-flex align-items-lg-center info-block">
                                    <div className="info-block_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.pic1.svg" alt=""/></div>
                                    <div className="info-block_text">
                                        <p>Global Verify</p>
                                        <span>{t('global-id.solution7')}</span>
                                    </div>
                                </div>
                                <p className="info-desc">{t('global-id.solution8')}</p>
                            </Col>
                            <Col md={8} className="item-img__sol">
                                <Row justify='space-between'>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.qr.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.nfc.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.livenes.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.location.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.device.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.biometric.svg" alt=""/></div>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Col lg={8} span={24} className={`solutions_item ${solutionState==='2'?'active br-none-mr':solutionState==='0'?'default':''}`}  onClick={()=>{
                        if(solutionState==='2') setSolutionState('0')
                        else setSolutionState('2')
                    }}>
                        <p>{t('global-id.solution3')}</p>
                        <p>{t('global-id.solution4')}</p>
                        <Row justify='center' itemScope itemType="http://schema.org/ImageObject">
                            <img itemProp='contentUrl' src="/images/icons/globalID/solution-pic2.svg" alt="" style={{marginRight: '10px'}}/>
                            <img itemProp='contentUrl' src="/images/icons/globalID/solution-pic3.svg" alt=""/>
                        </Row>
                    </Col>
                    <div className={`hidden_block solution_item_2 mobi-block ${solutionState==='2'?'show':''}`}>
                        <div className="table">
                            <div className="table-wrap">
                                <Row className="table-wrap__top">
                                    <Col span={24} className="top-block">
                                        <div className="top-block__img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.myid.svg" alt=""/></div>
                                        <div className="top-block__text">
                                            <p>My ID</p>
                                            <ToolTipTable itemScope itemType="http://schema.org/ImageObject" overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="left" title={<RenderTitleTooltipTable/>}>
                                                <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                            </ToolTipTable>
                                        </div>
                                        <span>{t('global-id.solution9')}</span>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>{t('global-id.solution11')}</p>
                                        <ToolTipTable itemScope itemType="http://schema.org/ImageObject" overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                        <style>{
                                            `
                                                .ant-tooltip-placement-left .ant-tooltip-arrow {
                                                    right: -4px;
                                                }
                                            
                                                .ant-tooltip {
                                                    max-width: 320px;
                                                }
                                                .tooltip-table .ant-tooltip-content .ant-tooltip-arrow{
                                                   width: 15px;
                                                   height: 15px;
                                                   bottom: -2px;
                                                }
                                                .ant-tooltip-placement-right .ant-tooltip-arrow {
                                                    left: -3px;
                                                }
                                                .tooltip-table .ant-tooltip-content .ant-tooltip-arrow .ant-tooltip-arrow-content {
                                                    background: rgb(143, 115, 255)!important;
                                                    box-shadow: none;
                                                    width: 15px;
                                                    height: 15px;
                                                    border-radius: 1px;
                                                }
                                            `
                                        }</style>

                                    </Col>
                                    <Col span={12} className="block__middle">
                                        <p>{t('global-id.solution12')}</p>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>{t('global-id.solution14')}</p>
                                        <ToolTipTable itemScope itemType="http://schema.org/ImageObject" overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__middle" itemScope itemType="http://schema.org/ImageObject">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col sm={12} span={17} className="block__desc">
                                        <p>{t('global-id.solution15')}</p>
                                        <ToolTipTable itemScope itemType="http://schema.org/ImageObject" overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>
                                    </Col>
                                    <Col sm={12} itemScope itemType="http://schema.org/ImageObject" span={4} className="block__middle" style={{justifyContent:windowSize<576?'flex-start':'center'}}>
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <span>{t('global-id.solution16')}</span>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>QR / MRZ</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>
                                    </Col>
                                    <Col span={12} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>NFC</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Liveness</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Location</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Device</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Biometrics</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                            </div>
                            <div className="table-wrap">
                                <Row className="table-wrap__top">
                                    <Col span={24} className="top-block">
                                        <div className="top-block__img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.id.svg" alt=""/></div>
                                        <div className="top-block__text">
                                            <p>Global Identify</p>
                                            <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="left" title={<RenderTitleTooltipTable/>}>
                                                <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                            </ToolTipTable>
                                        </div>
                                        <span>{t('global-id.solution10')}</span>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>{t('global-id.solution11')}</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                        <style>{
                                            `
                                                .ant-tooltip-placement-left .ant-tooltip-arrow {
                                                    right: -4px;
                                                }
                                            
                                                .ant-tooltip {
                                                    max-width: 320px;
                                                }
                                                .tooltip-table .ant-tooltip-content .ant-tooltip-arrow{
                                                   width: 15px;
                                                   height: 15px;
                                                   bottom: -2px;
                                                }
                                                .ant-tooltip-placement-right .ant-tooltip-arrow {
                                                    left: -3px;
                                                }
                                                .tooltip-table .ant-tooltip-content .ant-tooltip-arrow .ant-tooltip-arrow-content {
                                                    background: rgb(143, 115, 255)!important;
                                                    box-shadow: none;
                                                    width: 15px;
                                                    height: 15px;
                                                    border-radius: 1px;
                                                }
                                            `
                                        }</style>

                                    </Col>
                                    <Col span={12} className="block__last">
                                        <p> {t('global-id.solution13')}</p>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>{t('global-id.solution14')}</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col sm={12} span={17} className="block__desc">
                                        <p>{t('global-id.solution15')}</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>
                                    </Col>
                                    <Col sm={12} span={4} className="block__middle" style={{justifyContent:windowSize<576?'flex-start':'center'}}>
                                        <img src="/images/icons/globalID/uncheck.svg" alt=""/>
                                    </Col>
                                </Row>
                                <span>{t('global-id.solution16')}</span>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>QR / MRZ</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>
                                    </Col>
                                    <Col span={12} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>NFC</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Liveness</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Location</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Device</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__last">
                                        <img src="/images/icons/globalID/uncheck.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col span={12} className="block__desc">
                                        <p>Biometrics</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col span={12} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <Col lg={8} span={24} className={`solutions_item ${solutionState==='3'?'active br-none-br':solutionState==='0'?'default':''}`} onClick={()=>{
                        if(solutionState==='3') setSolutionState('0')
                        else setSolutionState('3')
                    }}>
                        <p>{t('global-id.solution5')}</p>
                        <p>{t('global-id.solution6')}</p>

                        <img itemProp='contentUrl' src="/images/icons/globalID/solutions-pic3.svg" alt=""/>
                    </Col>
                    <div className={`hidden_block solution_item_3 mobi-block ${solutionState==='3'?'show':''}`}>
                        <Row justify='space-between'>
                            <Col md={12} className="item__info">
                                <div className="d-flex align-items-center info-block">
                                    <div className="info-block_img " itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.pic2.svg" alt=""/></div>
                                    <div className="info-block_text">
                                        <p>One ID </p>
                                        <span>{t('global-id.solution17')}</span>
                                    </div>
                                </div>
                                <p className="info-desc"> {t('global-id.solution18')}</p>
                            </Col>
                            <Col md={8} className="item-img__sol">
                                <Row justify='space-between'>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.qr.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.nfc.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.livenes.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.location.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.device.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.biometric.svg" alt=""/></div>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div className={`hidden_block solution_item_1 desktop_block ${solutionState==='1'?'show':''}`}>
                        <Row justify='space-between'>
                            <Col md={11} className="item__info">
                                <div className="d-flex align-items-center info-block">
                                    <div className="info-block_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.pic1.svg" alt=""/></div>
                                    <div className="info-block_text">
                                        <p>Global Verify</p>
                                        <span>{t('global-id.solution7')}</span>
                                    </div>
                                </div>
                                <p className="info-desc">{t('global-id.solution8')}</p>
                            </Col>
                            <Col md={8} className="item-img__sol">
                                <Row justify='space-between'>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.qr.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.nfc.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.livenes.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.location.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.device.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.biometric.svg" alt=""/></div>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className={`hidden_block solution_item_2 desktop_block ${solutionState==='2'?'show':''}`}>
                        <div className="table">
                            <div className="table-wrap">
                                <Row className="table-wrap__top">
                                    <Col md={8} className="top-block"></Col>
                                    <Col md={8} className="top-block">
                                        <div className="top-block__img" itemScope itemType="http://schema.org/ImageObject"><img src="/images/icons/globalID/into.myid.svg" alt=""/></div>
                                        <div className="top-block__text">
                                            <p>My ID</p>
                                            <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="left" title={<RenderTitleTooltipTable/>}>
                                                <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                            </ToolTipTable>
                                        </div>
                                        <span>{t('global-id.solution9')}</span>
                                    </Col>
                                    <Col md={8} className="top-block">
                                        <div className="top-block__img"><img src="/images/icons/globalID/into.id.svg" alt=""/></div>
                                        <div className="top-block__text">
                                            <p>Global Identify</p>
                                            <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="left" title={<RenderTitleTooltipTable/>}>
                                                <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                            </ToolTipTable>
                                        </div>
                                        <span>{t('global-id.solution10')}</span>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>{t('global-id.solution11')}</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                        <style>{
                                            `
                                                .ant-tooltip-placement-left .ant-tooltip-arrow {
                                                    right: -4px;
                                                }
                                            
                                                .ant-tooltip {
                                                    max-width: 320px;
                                                }
                                                .tooltip-table .ant-tooltip-content .ant-tooltip-arrow{
                                                   width: 15px;
                                                   height: 15px;
                                                   bottom: -2px;
                                                }
                                                .ant-tooltip-placement-right .ant-tooltip-arrow {
                                                    left: -3px;
                                                }
                                                .tooltip-table .ant-tooltip-content .ant-tooltip-arrow .ant-tooltip-arrow-content {
                                                    background: rgb(143, 115, 255)!important;
                                                    box-shadow: none;
                                                    width: 15px;
                                                    height: 15px;
                                                    border-radius: 1px;
                                                }
                                            `
                                        }</style>

                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <p>{t('global-id.solution12')}</p>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <p> {t('global-id.solution13')}</p>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>{t('global-id.solution14')}</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>{t('global-id.solution15')}</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>
                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/uncheck.svg" alt=""/>
                                    </Col>
                                </Row>
                                <span>{t('global-id.solution16')}</span>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>QR / MRZ</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>
                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>NFC</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>Liveness</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>Location</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor:"#F9FAFB"}} className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>Device</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/uncheck.svg" alt=""/>
                                    </Col>
                                </Row>
                                <Row className="table-wrap__block">
                                    <Col md={8} className="block__desc">
                                        <p>Biometrics</p>
                                        <ToolTipTable overlayClassName="tooltip-table" overlayInnerStyle={{borderRadius:8, padding:12,boxShadow:"none"}} color='#8F73FF' placement="right" title={<RenderTitleTooltipTable/>}>
                                            <img src="/images/icons/globalID/tooltip-icon.svg" alt=""/>
                                        </ToolTipTable>

                                    </Col>
                                    <Col md={8} className="block__middle">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                    <Col md={8} className="block__last">
                                        <img src="/images/icons/globalID/check.svg" alt=""/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div className={`hidden_block solution_item_3 desktop_block ${solutionState==='3'?'show':''}`}>
                        <Row justify='space-between'>
                            <Col md={12} className="item__info">
                                <div className="d-flex align-items-center info-block">
                                    <div className="info-block_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.pic2.svg" alt=""/></div>
                                    <div className="info-block_text">
                                        <p>One ID </p>
                                        <span>{t('global-id.solution17')}</span>
                                    </div>
                                </div>
                                <p className="info-desc"> {t('global-id.solution18')}</p>
                            </Col>
                            <Col md={8} className="item-img__sol">
                                <Row justify='space-between'>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.qr.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.nfc.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.livenes.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.location.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.device.svg" alt=""/></div>
                                    <div itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/into.biometric.svg" alt=""/></div>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Row>
                <div className="solution__button">
                    <button onClick={()=>{
                        setIsModalOpen(true)
                    }}>{t('connect')}
                    </button>
                </div>
            </Solutions>

            <SectionOurPartners>
                <div className="container our-partners">
                    <h2>{t('global-id.partners')}</h2>
                    <div className="row our-partners__contain">
                        <Col md={8} span={24}>
                            <div className="our-partners__contain_block">
                                <div className="block-between">
                                    <div className="block__top">
                                        <div className='top-img' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/infocom.svg" alt=""/></div>
                                        <p>{t('global-id.partners1')}</p>
                                    </div>
                                    <div className="block__middle">
                                        <p>{t('global-id.partners2')}</p>
                                    </div>
                                </div>
                                <div className="block__bottom">
                                    <span>{t('global-id.partners3.1')}</span>
                                    <div className="bottom-img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/myidproducts.svg" alt=""/></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={8} span={24}>
                            <div className="our-partners__contain_block">
                                <div className="block-between">
                                    <div className="block__top">
                                        <div className='top-img' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/elektric.svg" alt=""/></div>
                                        <p>{t('global-id.partners4')}</p>
                                    </div>
                                    <div className="block__middle">
                                        <p>{t('global-id.partners5')}</p>
                                    </div>
                                </div>
                                <div className="block__bottom">
                                    <span>{t('global-id.partners3.1')}</span>
                                    <div className="bottom-img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/oneidproducts.svg" alt=""/></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={8} span={24}>
                            <div className="our-partners__contain_block">
                                <div className="block-between">
                                    <div className="block__top">
                                        <div className='top-img' itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/idintifity.svg" alt=""/></div>
                                        <p>{t('global-id.partners6')}</p>
                                    </div>
                                    <div className="block__middle">
                                        <p>{t('global-id.partners7')}</p>
                                    </div>
                                </div>
                                <div className="block__bottom">
                                    <span>{t('global-id.partners3')}</span>
                                    <div className="bottom-img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/globali.svg" alt=""/></div>
                                    <div className="bottom-img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/globalv.svg" alt=""/></div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>
            </SectionOurPartners>

            <SectionDemo className="container">
                <div className="demo row">

                    <Col lg={12} md={12} sm={14} className="demo__info">
                        <h2>{t('global-id.demo')}</h2>
                        <p>{t('global-id.demo1')}</p>
                        <div className="demo__info_menu">
                            <button  className={demo==="web"?"active":''} onClick={()=>setDemo('web')}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 6.25V20H25V6.25H5ZM2.5 5.00875C2.5 4.31375 3.06875 3.75 3.74 3.75H26.26C26.945 3.75 27.5 4.31125 27.5 5.00875V22.5H2.5V5.00875ZM1.25 23.75H28.75V26.25H1.25V23.75Z" fill="#8F73FF"/>
                                </svg>
                                {t('global-id.demo2')}
                            </button>
                            <button className={demo==="app"?"active":''} onClick={()=>setDemo('app')}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.75 5V25H21.25V5H8.75ZM7.5 2.5H22.5C22.8315 2.5 23.1495 2.6317 23.3839 2.86612C23.6183 3.10054 23.75 3.41848 23.75 3.75V26.25C23.75 26.5815 23.6183 26.8995 23.3839 27.1339C23.1495 27.3683 22.8315 27.5 22.5 27.5H7.5C7.16848 27.5 6.85054 27.3683 6.61612 27.1339C6.3817 26.8995 6.25 26.5815 6.25 26.25V3.75C6.25 3.41848 6.3817 3.10054 6.61612 2.86612C6.85054 2.6317 7.16848 2.5 7.5 2.5ZM15 21.25C15.3315 21.25 15.6495 21.3817 15.8839 21.6161C16.1183 21.8505 16.25 22.1685 16.25 22.5C16.25 22.8315 16.1183 23.1495 15.8839 23.3839C15.6495 23.6183 15.3315 23.75 15 23.75C14.6685 23.75 14.3505 23.6183 14.1161 23.3839C13.8817 23.1495 13.75 22.8315 13.75 22.5C13.75 22.1685 13.8817 21.8505 14.1161 21.6161C14.3505 21.3817 14.6685 21.25 15 21.25Z" fill="#8F73FF"/>
                                </svg>
                                {t('pay_integration.text6')}
                            </button>
                        </div>
                        <div className="demo__info_btn">
                            {demo==='web'?(<a href="#">{t('global-id.demo3')}</a>):(<button onClick={()=>setIsModalOpen(true)}>{t('global-id.demo4')}</button>)}
                        </div>
                    </Col>
                    <Col lg={12} md={12} sm={10} className={`position-relative demo__img d-flex ${demo==='web'?'justify-content-end':'justify-content-center'}`}>
                        {demo==="web"?(<div className="demo__img1" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/globalId/demo1.png" alt=""/></div>):(<div className="demo__img2" itemScope itemType="http://schema.org/ImageObject"><img  itemProp='contentUrl' src="/images/globalId/demo2.png" alt=""/></div>)}
                    </Col>
                </div>
            </SectionDemo>
            <SectionAdaptationProject className='container'>
                <Row>
                    <Col lg={12} md={12} span={24}>
                        <h2>{t('global-id.demo5')}</h2>
                        <p className='sub-title'>{t('global-id.demo6')} </p>

                        <Row className='tools-actions'>
                            <Col lg={12} md={12} span={8} className='upload-logo'>
                                <p className='text-header'>{t('global-id.demo7')}</p>
                                <div className='img-upload'>

                                    <UploadImage name="logo"
                                                 customRequest={({ file, onSuccess }) => {
                                                     setTimeout(() => {
                                                         onSuccess("ok");
                                                     }, 0);
                                                 }}
                                                 listType="picture-card"
                                                 accept='image/png, image/svg+xml'
                                                 beforeUpload={(file)=>{
                                                     const isJpgOrPng = file.type === 'image/svg+xml' || file.type === 'image/png';
                                                     if (!isJpgOrPng) {
                                                         setErrorUpload(t('global-id.demo.error1'));
                                                     }
                                                     const isLt2M = file.size / 1024 / 1024 < 2;
                                                     if (!isLt2M) {
                                                         setErrorUpload(t('global-id.demo.error2'));
                                                     }
                                                     return isJpgOrPng && isLt2M;
                                                 }}
                                                 showUploadList={false}
                                                 onChange={handleChange} >
                                        {
                                            progress?<button className='cancel' onClick={(e)=>{
                                                e.stopPropagation()
                                                handleChange({file:null, cancel:true})
                                            }
                                            }>
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.7" d="M4.99999 4.05734L8.29999 0.757339L9.24266 1.70001L5.94266 5.00001L9.24266 8.30001L8.29999 9.24267L4.99999 5.94267L1.69999 9.24267L0.757324 8.30001L4.05732 5.00001L0.757324 1.70001L1.69999 0.757339L4.99999 4.05734Z" fill="#959595"/>
                                                </svg>
                                            </button>:''
                                        }

                                        <div className='pic-img' itemScope itemType="http://schema.org/ImageObject">
                                            <img itemProp='contentUrl' src='/images/globalId/svg/img-default.svg'/>
                                        </div>

                                        {progress?<div className='w-100'>

                                            <ProgressBarImage  showInfo={false} percent={progress} strokeColor={{
                                                '0%': '#806EFF',
                                                '100%': 'rgba(179, 161, 255, 1)'
                                            }} strokeWidth='37px' type='line'/>
                                            <p className="file-name">{fileNameUpload}</p>
                                        </div>:<div>
                                            <button>
                                                {t('global-id.adaptive1')}
                                            </button>
                                            <p>{t('global-id.adaptive2')}</p>
                                        </div>}

                                    </UploadImage>
                                </div>
                            </Col>
                            <Col lg={10} md={10} span={14} className='block-actions-color'>
                                <div>
                                    <p className='text-header'>{t('global-id.adaptive3')}</p>
                                    <div className='block-colors'>
                                        <div className={`item-color color-white ${adaptiveProjectObject.background==='#fff'?'active':''}`}
                                             onClick={()=>setAdaptiveProjectObject({...adaptiveProjectObject, background: '#fff'})}>
                                            {adaptiveProjectObject.background==='#fff'?<span className='check-black'/>:''}
                                        </div>
                                        <div className={`item-color color-black ${adaptiveProjectObject.background==='#000'?'active':''}`}
                                             onClick={()=>setAdaptiveProjectObject({...adaptiveProjectObject, background: '#000'})}>
                                            {adaptiveProjectObject.background==='#000'?<span className='check-white'/>:''}
                                        </div>
                                        <div className='plus'/>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-header'>{t('global-id.adaptive4')}</p>
                                    <div className='block-colors'>
                                        <div className={`item-color color-purple ${adaptiveProjectObject.button==='#806EFF'?'active':''}`}
                                             onClick={()=>setAdaptiveProjectObject({...adaptiveProjectObject, button: '#806EFF'})}>
                                            {adaptiveProjectObject.button==='#806EFF'?<span className='check-white'/>:''}
                                        </div>
                                        <div className={`item-color color-yellow ${adaptiveProjectObject.button==='#FFD600'?'active':''}`}
                                             onClick={()=>setAdaptiveProjectObject({...adaptiveProjectObject, button: '#FFD600'})}>
                                            {adaptiveProjectObject.button==='#FFD600'?<span className='check-white'/>:''}
                                        </div>
                                        <div className={`item-color color-blue ${adaptiveProjectObject.button==='#3FBEFF'?'active':''}`}
                                             onClick={()=>setAdaptiveProjectObject({...adaptiveProjectObject, button: '#3FBEFF'})}>
                                            {adaptiveProjectObject.button==='#3FBEFF'?<span className='check-white'/>:''}
                                        </div>
                                        <div className={`item-color color-red ${adaptiveProjectObject.button==='#FF5B45'?'active':''}`}
                                             onClick={()=>setAdaptiveProjectObject({...adaptiveProjectObject, button: '#FF5B45'})}>
                                            {adaptiveProjectObject.button==='#FF5B45'?<span className='check-white'/>:''}
                                        </div>
                                        <div className={`item-color color-green ${adaptiveProjectObject.button==='#68C600'?'active':''}`}
                                             onClick={()=>setAdaptiveProjectObject({...adaptiveProjectObject, button: '#68C600'})}>
                                            {adaptiveProjectObject.button==='#68C600'?<span className='check-white'/>:''}
                                        </div>
                                        <div className='plus'/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} md={12} span={24} className='show-screen-result'>
                        <Row className="justify-content-evenly">
                            <Col lg={12} md={12} span={6} className="mobile-wrap">
                                <div className='mobile-screen screen-top' style={{backgroundColor:adaptiveProjectObject.background}}>
                                    <div itemScope itemType="http://schema.org/ImageObject" className={`logo-img ${!adaptiveProjectObject.logo?'default-img':''}`} >
                                        {adaptiveProjectObject.logo?<img itemProp='contentUrl' src={adaptiveProjectObject.logo}/>:''}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} md={12} span={6} className="mobile-wrap">
                                <div className={`mobile-screen ${adaptiveProjectObject.background==='#000'?'theme-dark':'theme-light'}`}>
                                    <button style={{background: adaptiveProjectObject.button,color:adaptiveProjectObject.button==='#FFD600'?'#141414':'#fff'}}>{t('global-id.adaptive5')}</button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </SectionAdaptationProject>
            <SectionCarousel3D>
                <div className='container'>
                    <h1>{t('global-id.adaptive6')}</h1>
                    <Fancybox options={{infinite: false}} className='demo-slides'>
                        <div  className='carousel-wrap'>
                            {
                                window.innerWidth<=991?(<Slider {...settings}>
                                    {
                                        sliders.map((item, index)=>{
                                            return item.content
                                        })
                                    }
                                </Slider>):(<Carousel
                                    slides={sliders}
                                    {...spring_settings}
                                    // goToSlide={spring_settings.goToSlide}
                                    // offsetRadius={spring_settings.offsetRadius}
                                    // showNavigation={spring_settings.showNavigation}
                                    // animationConfig={spring_settings.config}
                                />)
                            }
                        </div>
                    </Fancybox>
                    <div className="demo-version"><a href='https://dev-sdk.globalid.uz/' target='_blank' rel='nofollow'>{t('pay_demo.text1')}</a></div>
                </div>
            </SectionCarousel3D>
            <DecreeSection className="container">
                <h1>{t('global-id.section7')}</h1>
                <div className="row decree justify-content-between align-items-center">
                    <Col md={12} className="decree__img">
                        <div itemScope itemType="http://schema.org/ImageObject">
                            <img itemProp='contentUrl' src="/images/icons/globalID/decree.svg" alt=""/>
                        </div>
                    </Col>
                    <Col md={10} className="decree__request">
                        <div className="text">
                            {t('global-id.section6')}
                            <br/>(<a href="https://lex.uz/docs/5664111?otherlang=1">{t('global-id.section6.1')}</a>).
                        </div>
                        <div className="text">{t('global-id.section8')}</div>
                    </Col>
                </div>
            </DecreeSection>
            <CalculationSection className="container">
                <div className="row calculation position-relative">
                    <Col md={12} className="calculation__price">
                        <div className="price__zero">
                            0
                            <span>{t('global-id.section6.sum')}</span>
                        </div>
                        <span className="price__free">
                            {t('global-id.section9')}
                            <br/>
                            {t('global-id.section9.1')}

                        </span>
                    </Col>
                    <div className="calculation__line"></div>
                    <Col md={12} className="calculation__desc">
                        <div className="calculation__desc_info">
                            <div className="info__item">
                                <div className="item__img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/arrow-top.svg" alt=""/></div>
                                <div className="item__desc">
                                    <div>{t('global-id.section10')}</div>
                                    <p>{t('global-id.section11.1')} <span>{t('global-id.section11.2')}</span></p>
                                </div>
                            </div>
                            <div className="info__item">
                                <div className="item__img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/arrow-down.svg" alt=""/></div>
                                <div className="item__desc">
                                    <div>{t('global-id.section12')}</div>
                                    <p>{t('global-id.section13.1')} <span>{t('global-id.section13.2')}</span></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </div>
            </CalculationSection>
            <SectionBenefit className="container">
                <h1>{t('pay_clients.text1')}</h1>
                <div className="benefit row">
                    <Col md={8} className="benefit__item">
                        <div className="benefit__item_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/marketplace.svg" alt=""/></div>
                        <p>{t('global-id.benfit')}</p>
                        <span>{t('global-id.benfit2')}</span>
                    </Col>
                    <Col md={8} className="benefit__item">
                        <div className="benefit__item_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/bank.svg" alt=""/></div>
                        <p>{t('global-id.benfit3')}</p>
                        <span>{t('global-id.benfit4')}</span>
                    </Col>
                    <Col md={8} className="benefit__item">
                        <div className="benefit__item_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/card.svg" alt=""/></div>
                        <p>{t('global-id.benfit5')}</p>
                        <span>{t('global-id.benfit6')}</span>
                    </Col>
                    <Col md={8} style={{marginBottom:"0"}} className="benefit__item">
                        <div className="benefit__item_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/ticket.svg" alt=""/></div>
                        <p>{t('global-id.benfit7')}</p>
                        <span>{t('global-id.benfit9')}</span>
                    </Col>
                    <Col md={8} style={{marginBottom:"0"}} className="benefit__item">
                        <div className="benefit__item_img" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/smartphone.svg" alt=""/></div>
                        <p>{t('global-id.benfit8')}</p>
                        <span>{t('global-id.benfit10')}</span>
                    </Col>
                </div>
            </SectionBenefit>
            <SectionWithUs>
                <div className="container">
                    <div className="row with-us">
                        <div className="col-md-6 col-12 d-flex align-items-center">
                            <div className="with-us_block">
                                <h2>{t('global-id.with_us')}</h2>
                                <p>{t('global-id.with_us1')}</p>
                                <a className="with-us__site" href="https://anorbank.uz/" target="_blank" rel="noreferrer" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/global-pay/web-site.svg" alt=""/>anorbank.uz</a>
                                <div className="with-us__mag">
                                    <a href="https://play.google.com/store/apps/details?id=uz.global.ia" target="_blank" rel="noreferrer" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/global-pay/google-play.svg" alt=""/></a>
                                    <a href="https://apps.apple.com/uz/app/airport-tashkent/id1581648106" target="_blank" rel="noreferrer" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/global-pay/app-store.svg" alt=""/></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 position-relative">
                            <div className="images">
                                <div className="images__phone" itemScope itemType="http://schema.org/ImageObject"><img itemProp='contentUrl' src="/images/icons/globalID/res.svg" alt=""/></div>
                            </div>
                            <button className="message" data-fancybox='' data-src='/images/globalId/latter-anorBank.png'>
                                <div className="message__img" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src="/images/icons/globalID/message.svg" alt=""/>
                                </div>
                                <div className="message__text">
                                    <p>Anorbank</p>
                                    <span>{t('global-id.with_us2')}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </SectionWithUs>
            <SectionSertificat>
                <div className='container'>
                    <h1>{t('pay_sertificate.text1')}</h1>
                    <Slider {...settings3} key={sertificate.join('')}>
                        {
                            sertificate.map((item)=>{
                                return(
                                    <div key={item.id} className='item-document'>
                                        <div>
                                            <div className='img-documents' itemScope itemType="http://schema.org/ImageObject" data-fancybox="" data-src={item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''}>
                                                <img itemProp='contentUrl' src={item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''}/>
                                            </div>
                                            <div className='text-documents'>
                                                <h6 className="title">{item.name[locale]?item.name[locale]:''} </h6>
                                                <p>{item.org[locale]?item.org[locale]:''}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </SectionSertificat>
            {/*<Proccess>*/}
            {/*    <h2>{t('pay_process.text1')}</h2>*/}
            {/*    <div className="container">*/}
            {/*        <div className="proccess row gap-md-5">*/}
            {/*            <div className="proccess__block col-lg-4 col-md-5 col-6">*/}
            {/*                <a href="/договор%20мерчанты%20last%20(3).docx" target='_blank' rel="noreferrer">*/}
            {/*                    <span>{t('pay_process.text2')}</span>*/}
            {/*                    <div className="proccess__block_img">*/}
            {/*                        <img src="/images/icons/globalID/dogovor.svg" alt=""/>*/}
            {/*                    </div>*/}
            {/*                </a>*/}
            {/*            </div>*/}
            {/*            <div className="proccess__block col-lg-4 col-md-5 col-6">*/}
            {/*                <a href="/docs/documents-integration.pdf" target='_blank' rel="noreferrer">*/}
            {/*                    <span>{t('pay_process.text3')}</span>*/}
            {/*                    <div className="proccess__block_img">*/}
            {/*                        <img src="/images/icons/globalID/dev.svg" alt=""/>*/}
            {/*                    </div>*/}
            {/*                </a>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Proccess>*/}
            <EdditionalServices>
                <h1>{t('pay_service.text1')}</h1>
                <div className="container">
                    <div className="services row gx-8">
                        <div className="col-md-4 mt-block">
                            <a href={`${locale==='ru'?'/':`/${locale}/`}global-pay/services/2`} className="services__link bg_orange">
                                <div className="services__link_top">
                                    <img src="/images/icons/global-pay/split.svg" alt=""/>
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                    </span>
                                </div>
                                <p>{t('pay_service.text3')}</p>
                            </a>
                        </div>

                        <div className="col-md-4 mt-block">
                            <Link to={`${locale==='ru'?'/':`/${locale}/`}global-pay/telegram-pay`} className="services__link bg_orange">
                                <div className="services__link_top" itemScope itemType="http://schema.org/ImageObject">
                                    <img itemProp='contentUrl' src="/images/icons/global-pay/user-plus.svg" alt=""/>
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
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
                            <a href={`${locale==='ru'?'/':`/${locale}/`}global-pay`} className="services__link bg_orange">
                                <div className="services__link_top" itemScope itemType="http://schema.org/ImageObject">
                                    <img height={50} itemProp='contentUrl' src="/images/icons/global-pay/circle-pay.svg" alt=""/>
                                    <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                    </span>
                                </div>
                                <p>{t('pay_service.text10')}</p>
                            </a>
                        </div>
                        {/*<div className="col-md-4 mt-block">*/}
                        {/*    <a href={`${locale==='ru'?'/':`/${locale}/`}global-id`} className="services__link bg_blue">*/}
                        {/*        <div className="services__link_top">*/}
                        {/*            <img src="/images/icons/global-pay/finger.svg" alt=""/>*/}
                        {/*            <span>*/}
                        {/*                <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*        <p>{t('pay_service.text7')}</p>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>
                    {/*<div className="services-button">*/}
                    {/*    <button>{t('pay_service.text8')}</button>*/}
                    {/*</div>*/}
                </div>
            </EdditionalServices>
            <style>
                {
                    `
                        body{
                            overflow: initial;
                        }
                        body #root {
                            overflow-x: initial;
                        }
                           
                        @media(max-width: 991px) {
                            body #root {
                                overflow-x: hidden!important; 
                            }
                        }   
                        `
                }
            </style>
        </>
    )
}
