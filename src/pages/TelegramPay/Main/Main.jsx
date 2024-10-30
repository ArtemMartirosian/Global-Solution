import React, {useEffect, useRef, useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";
import Slider from "react-slick";
import "@fancyapps/ui/dist/fancybox.css";
import {Col, Form, Input, Radio, Row} from "antd";
import Carousel from "react-spring-3d-carousel";
import {config} from "react-spring";

/*-----Styles----*/
import {
    AnimatedArrow,
    AudienceMedia,
    BaseSection,
    ButtonCarousel,
    DataCard,
    FloatingCard,
    ModalForm,
    ModalSuccess,
    PrimaryButton,
    SecondaryButton,
    Section1,
    Section10,
    Section11,
    Section12,
    Section13,
    Section14,
    Section15,
    Section2,
    Section3,
    Section7,
    Section8,
    Section9,
    ToolTipCustom,
} from "./styles";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../index";
import {Fancybox as NativeFancybox} from "@fancyapps/ui";
import {ADMIN_PANEL_TELEGRAM, FeedBackApiClient, image_download, LicensesClient, Seo} from "../../../api";
import {CloseModal} from "../../../assets/icons";
import {Link, useLocation} from "react-router-dom";

// import { ReactComponent as IconArrowRight } from '../../../assets/telegramPayIcons/arrow-right-line.svg';
import {ReactComponent as IconAttachment} from "../../../assets/telegramPayIcons/attachment-2.svg";
// import { ReactComponent as IconBankCard } from '../../../assets/telegramPayIcons/bank-card-line.svg';
import {ReactComponent as IconChat} from "../../../assets/telegramPayIcons/chat-3-line.svg";
import {ReactComponent as IconClock} from "../../../assets/telegramPayIcons/clock.svg";
// import { ReactComponent as IconCode } from '../../../assets/telegramPayIcons/code-s-slash-line.svg';
import {ReactComponent as IconEye} from "../../../assets/telegramPayIcons/eye-line.svg";
import {ReactComponent as IconFile} from "../../../assets/telegramPayIcons/file-3-line.svg";
// import { ReactComponent as IconFingerprint } from '../../../assets/telegramPayIcons/fingerprint-line.svg';
// import { ReactComponent as IconGlobal } from '../../../assets/telegramPayIcons/global-line.svg';
// import { ReactComponent as IconCheck } from '../../../assets/telegramPayIcons/check.svg';
import {ReactComponent as IconHeart} from "../../../assets/telegramPayIcons/heart-3-line.svg";
import {ReactComponent as IconImage} from "../../../assets/telegramPayIcons/image-2-line.svg";
// import { ReactComponent as IconInformation } from '../../../assets/telegramPayIcons/information-line.svg';
import {ReactComponent as IconPieChart} from "../../../assets/telegramPayIcons/pie-chart-2-line.svg";
// import { ReactComponent as IconSplit } from '../../../assets/telegramPayIcons/split.svg';
// import { ReactComponent as IconTimer } from '../../../assets/telegramPayIcons/timer-line.svg';
import {ReactComponent as IconUser} from "../../../assets/telegramPayIcons/user-3-line.svg";
import {ReactComponent as IconWallet} from "../../../assets/telegramPayIcons/wallet-line.svg";
import {ReactComponent as SvgHumo} from "../../../assets/telegramPayIcons/humo.svg";
import {ReactComponent as SvgPieChart} from "../../../assets/telegramPayIcons/pie-chart.svg";
import {ReactComponent as SvgTelegram} from "../../../assets/telegramPayIcons/telegram.svg";
import {ReactComponent as SvgUzcard} from "../../../assets/telegramPayIcons/uzcard.svg";

import {ReactComponent as Arrow0101} from "../../../assets/telegramPayIcons/arrow_1_1.svg";
import {ReactComponent as Arrow0102} from "../../../assets/telegramPayIcons/arrow_1_2.svg";
import {ReactComponent as Arrow0103} from "../../../assets/telegramPayIcons/arrow_1_3.svg";
import {ReactComponent as Arrow0104} from "../../../assets/telegramPayIcons/arrow_1_4.svg";
import {ReactComponent as Arrow0105} from "../../../assets/telegramPayIcons/arrow_1_5.svg";
import {ReactComponent as Arrow0201} from "../../../assets/telegramPayIcons/arrow_2_1.svg";
import {ReactComponent as Arrow0301} from "../../../assets/telegramPayIcons/arrow_3_1.svg";
import {ReactComponent as Arrow0401} from "../../../assets/telegramPayIcons/arrow_4_1.svg";
import {ReactComponent as Arrow0501} from "../../../assets/telegramPayIcons/arrow_5_1.svg";
import {ReactComponent as Arrow0601} from "../../../assets/telegramPayIcons/arrow_6_1.svg";
import {ReactComponent as Arrow0701} from "../../../assets/telegramPayIcons/arrow_7_1.svg";
import {ReactComponent as Arrow0801} from "../../../assets/telegramPayIcons/arrow_8_1.svg";
import {ReactComponent as Arrow1001} from "../../../assets/telegramPayIcons/arrow_10_1.svg";
import {ReactComponent as Arrow1101} from "../../../assets/telegramPayIcons/arrow_11_1.svg";

import useScrollTrigger from "../../../hooks/useScrollTrigger";
import usePrevious from "../../../hooks/usePrevious";
import {ModalError, ScrollTop} from "../../GlobalPay/Main/styles";
import {renderMeta} from "../../../assets/scripts";
import meta from "../../../vr_db/meta.json";
import {urlCleaner} from "../../../utils/url-cleaner";
import {renderMetaPixel} from "../../../utils/meta-pixels";

function Fancybox(props) {
    const delegate = props.delegate || "[data-fancybox]";

    useEffect(() => {
        logEvent(analytics, "global_blog_page_visited");
        const opts = props.options || {};

        NativeFancybox.bind(delegate, opts);

        return () => {
            NativeFancybox.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{props.children}</>;
}

function SampleNextArrow(props) {
    const {onClick, currentSlide, slideCount, slideShow} = props;

    return (
        <ButtonCarousel
            className={`arrow-next ${
                currentSlide === slideCount - slideShow ? "d-none" : "d-block"
            }`}
            onClick={onClick}
        >
            <img src="/images/icons/global-pay/arrow-right.svg" alt="next"/>
        </ButtonCarousel>
    );
}

function SamplePrevArrow(props) {
    const {onClick, currentSlide} = props;

    return (
        <ButtonCarousel
            className={`arrow-prev ${currentSlide > 0 ? "d-block" : "d-none"}`}
            onClick={onClick}
        >
            <img src="/images/icons/global-pay/arrow-left.svg" alt="previous"/>
        </ButtonCarousel>
    );
}

function RenderTitleTooltip() {
    const {t} = useTranslation();
    return (
        <>
            <p className="mb-2" style={{fontWeight: 700}}>
                {t("global-id.tooltip1")}
            </p>
            <p className="mb-0">{t("global-id.tooltip2")} </p>
        </>
    );
}

function RederTitleTg() {
    return (
        <p className="mb-0">
            Мы свяжемся с Вами через Telegram и подберем удобное время для более
            подробного обсуждения{" "}
        </p>
    );
}

function Audience() {
    const [activeItem, setActiveItem] = useState(0);
    const media = useRef();
    const {t} = useTranslation();

    const audienceItems = [
        {
            color: "#FEDC94",
            label: t("tgPay.forCook", "КОНДИТЕРАМ"),
            images: {
                main: "/images/telegram-pay/audience_cook_main.png",
                active: "/images/telegram-pay/audience_cook_active.jpg",
            },
        },
        {
            color: "#BDD2BA",
            label: t("tgPay.forBloggers", "БЛОГЕРАМ"),
            images: {
                main: "/images/telegram-pay/audience_blogger_main.png",
                active: "/images/telegram-pay/audience_blogger_active.jpg",
            },
        },
        {
            color: "#C9D2FF",
            label: t("tgPay.forTutors", "ТЬЮТОРАМ"),
            images: {
                main: "/images/telegram-pay/audience_tutor_main.png",
                active: "/images/telegram-pay/audience_tutor_active.jpg",
            },
        },
    ];

    useEffect(() => {
        media.current
            .querySelectorAll(".audience-media__item")
            .forEach((item, index) => {
                item.addEventListener("mouseover", () => {
                    setActiveItem(index);
                });
            });
    }, []);

    return (
        <AudienceMedia className="audience-media" ref={media}>
            {audienceItems.map((item, index) => (
                <div
                    key={index}
                    className={`audience-media__item ${
                        activeItem === index ? "active" : ""
                    }`}
                    style={{background: item.color}}
                >
                    <img
                        src={item.images.main}
                        alt={item.label}
                        className="audience-media__image audience-media__image--main"
                    />
                    <img
                        src={item.images.active}
                        alt={item.label}
                        className="audience-media__image audience-media__image--active"
                    />
                    <div className="audience-media__label">{item.label}</div>
                </div>
            ))}
        </AudienceMedia>
    );
}

export function Section(props) {
    const {title, children, ...rest} = props;
    return (
        <BaseSection {...rest}>
            <div className="container">
                {title && <h2 className="section-title">{title}</h2>}
                {children}
            </div>
        </BaseSection>
    );
}

const usersItems = [
    {
        photo: "/images/telegram-pay/users_1.png",
        name: "Аскарова Наргизабону",
        bot: "@sladkoejka",
        description:
            "Кондитер под псевдонимом “Сладкоежка” подключила платежи в Telegram через Global Pay",
        screenshot: "/images/telegram-pay/users_1_1.png",
        bgcolor: "#FFDE97",
        color: "#D08E00",
    },
    {
        photo: "/images/telegram-pay/users_2.png",
        name: "Рахимов Умид",
        bot: "@Umidjon",
        description:
            "Популярный блогер подключил платежи в Telegram через Global Pay",
        screenshot: "/images/telegram-pay/users_1_1.png",
        bgcolor: "#B4CDB4",
        color: "#7D8D7D",
    },
    {
        photo: "/images/telegram-pay/users_3.png",
        name: "Аскарова Наргизабону",
        bot: "@Art_studio",
        description:
            "Кондssитsер под псевдонимом “Сладкоежка” подключила платежи в Telegram через Global Pay",
        screenshot: "/images/telegram-pay/users_1_1.png",
        bgcolor: "#C9D2FF",
        color: "#738AFF",
    },
];

export default function TelegramPayMain(props) {
    const {t, i18n} = useTranslation();
    const {locale} = props;
    const [sertificate, setSertificate] = useState([]);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const [licenceCurrent, setLicenseCurrent] = useState(0);
    const [goToSlide, setGoToSlide] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false)
    const location = useLocation()
    const [seoData, setSeoData] = useState(undefined)

    const [selectedUser, setSelectedUser] = useState(0);

    const [currentFrame, setCurrentFrame] = useState(null);
    const prevFrame = usePrevious(currentFrame);

    const intro = useRef();
    useEffect(() => {
        setTimeout(() => {
            intro.current
                .querySelectorAll(".floating-card__hint")
                .forEach((item, index) => {
                    setTimeout(() => item.classList.add("active"), index * 1000);
                });
        }, 1000);
    }, []);

    const section2ref = useRef();
    const section2Triggered = useScrollTrigger(section2ref, 500);
    useEffect(() => {
        if (section2Triggered) {
            section2ref.current
                .querySelector(".audience__arrow")
                .classList.add("active");
        }
    }, [section2Triggered]);

    function animateFrame(ref, trigger) {
        const video = ref.current.querySelector("video");
        if (trigger) {
            ref.current.classList.add("animate");
            video.play();
        } else {
            ref.current.classList.remove("animate");
            video.pause();
            video.currentTime = 0;
        }
    }

    const frameContainerRef = useRef();
    const frameContainerTriggered = useScrollTrigger(frameContainerRef, window.innerHeight / 2 + (window.innerHeight - 600) / 2);
    useEffect(() => {
        if (!frameContainerTriggered) {
            setCurrentFrame(null);
        }
    }, [frameContainerTriggered])


    const section3ref = useRef();
    const section3Triggered = useScrollTrigger(section3ref, window.innerHeight / 2 + (window.innerHeight - 480) / 2 + 70);
    useEffect(() => {
        if (section3Triggered) {
            setCurrentFrame(1);
            if (isMobile) {
                animateFrame(section3ref, section3Triggered)
            } else {
                animateFrame(section3ref, section3Triggered)
                frameContainerRef.current.querySelector('.frame--1').classList.remove('slideDown')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section3Triggered]);

    const section4ref = useRef();
    const section4Triggered = useScrollTrigger(section4ref, 400);
    useEffect(() => {
        if (section4Triggered) setCurrentFrame(2);
        animateFrame(section4ref, section4Triggered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section4Triggered]);

    const section5ref = useRef();
    const section5Triggered = useScrollTrigger(section5ref, 400);
    useEffect(() => {
        if (section5Triggered) setCurrentFrame(3);
        animateFrame(section5ref, section5Triggered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section5Triggered]);

    const section6ref = useRef();
    const section6Triggered = useScrollTrigger(section6ref, 400);
    useEffect(() => {
        if (section6Triggered) setCurrentFrame(4);
        animateFrame(section6ref, section6Triggered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section6Triggered]);

    const section7ref = useRef();
    const section7Triggered = useScrollTrigger(section7ref, 500);
    useEffect(() => {
        if (section7Triggered) {
            section7ref.current.querySelector(".arrow-hint").classList.add("active");
        }
    }, [section7Triggered]);

    const section8ref = useRef();
    const section8Triggered = useScrollTrigger(section8ref, 500);
    useEffect(() => {
        if (section8Triggered) {
            section8ref.current.querySelector(".arrow-hint").classList.add("active");
        }
    }, [section8Triggered]);

    const section10ref = useRef();
    const section10Triggered = useScrollTrigger(section10ref, 500);
    useEffect(() => {
        if (section10Triggered) {
            section10ref.current.querySelector(".arrow-hint").classList.add("active");
        }
    }, [section10Triggered]);

    const section11ref = useRef();
    const section11Triggered = useScrollTrigger(section11ref, 500);
    useEffect(() => {
        if (section11Triggered) {
            section11ref.current.querySelector(".arrow-hint").classList.add("active");
        }
    }, [section11Triggered]);

    function handleResize() {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        if (intro.current) {
            if (width < 1140) {
                const scale = (width - 20) / intro.current.offsetWidth;
                intro.current.style.transform = `scale(${scale}) translateX(-50%)`;
            } else {
                intro.current.style.transform = "translateX(-50%)";
            }
        }
    }

    useEffect(() => {
        handleResize();
        const resizer = window.addEventListener("resize", handleResize);
        return window.removeEventListener("resize", resizer);
    }, []);

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        if (!isMobile) {
            const container = frameContainerRef.current;

            if (!currentFrame && prevFrame === 1)
                container.querySelector(".frame--1")?.classList.add("slideDown");

            container.querySelectorAll(`.frame`).forEach((frame) => {
                frame.classList.remove("active", "animate");
                frame.querySelector("video").pause();
                frame.querySelector("video").currentTime = 0;
            });

            const frame = container.querySelector(`.frame--${currentFrame}`);
            if (frame) {
                frame.classList.add("active");
                setTimeout(() => {
                    frame.classList.add("animate");
                }, currentFrame === 1 && prevFrame === null ? 500 : 0);
                frame.querySelector('video').play();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFrame, isMobile]);

    const spring_settings = {
        goToSlide: goToSlide,
        offsetRadius: 2,
        showNavigation: true,
        animationConfig: config.gentle,
    };


    const images = [
        {
            org: "/images/telegram-pay/img_9_1.png",
            min: "/images/telegram-pay/img_9_1.png",
        },
        {
            org: "/images/telegram-pay/img_9_2.png",
            min: "/images/telegram-pay/img_9_2.png",
        },
        {
            org: "/images/telegram-pay/img_9_3.png",
            min: "/images/telegram-pay/img_9_3.png",
        },
    ];

    const sliders = images
        .map((item, index) => ({
            key: index,
            content: (
                <img
                    src={item.min}
                    data-src={item.org}
                    alt={index}
                    className="slider-3d"
                />
            ),
        }))
        .map((slide, index) => {
            if (index === goToSlide) {
                return {
                    ...slide,
                    key: index,
                    content: (
                        <img
                            src={slide.content.props.src}
                            className="slider-3d active"
                            data-src={slide.content.props["data-src"]}
                            alt=""
                        />
                    ),
                };
            }

            return {
                ...slide,
                onClick: () => {
                    setGoToSlide(index);
                },
            };
        });

    const safetyCertificates = [
        {
            id: 1,
            img: {
                full: "/images/telegram-pay/img_11_1.png",
                thumb: "/images/telegram-pay/img_11_1-min.png",
            },
            title: "Telegram Payment API",
            description: t(
                "tgPay.safetyText1",
                "Используем защищенные протоколы Telegram Payment API"
            ),
        },
        {
            id: 2,
            img: {
                full: "/images/telegram-pay/img_11_2.png",
                thumb: "/images/telegram-pay/img_11_2-min.png",
            },
            title: `${t("sertifikate")} PCI DSS `,
            description: t(
                "tgPay.safetyText2",
                "Прошли проверку по требованиям стандарта PCI DSS"
            ),
        },
        {
            id: 3,
            img: {
                full: "/images/telegram-pay/img_11_3.png",
                thumb: "/images/telegram-pay/img_11_3-min.png",
            },
            title: `${t("gnk")}`,
            description: t(
                "tgPay.safetyText3",
                "Гарантированное получение покупателем чека оплаты с QR-кодом"
            ),
        },
    ];

    const licenseImages = [
        {
            id: 1,
            img: {
                full: "/images/telegram-pay/img_12_1.png",
                thumb: "/images/telegram-pay/img_12_1-min.png",
            },
            title: "ISO 27001:2013",
            description: "Информационная безопасность",
        },
        {
            id: 2,
            img: {
                full: "/images/telegram-pay/img_12_2.png",
                thumb: "/images/telegram-pay/img_12_2-min.png",
            },
            title: "PCI DSS",
            description: "Сертификат соответствия",
        },
        {
            id: 3,
            img: {
                full: "/images/telegram-pay/img_12_3.png",
                thumb: "/images/telegram-pay/img_12_3-min.png",
            },
            title: "ISO 9001:2015",
            description: "Сертификат от G-Certi",
        },
    ];

    const connectionData = [
        {
            title: t("tgPay.becomeSelfemployed", "Стать самозанятым"),
            image: "/images/telegram-pay/img_8_1.svg",
            minutes: 10,
            href: "https://soliq.uz/press-services/news/show/samozanyatost-udobno-legalno-i-bez-riska?lang=ru",
            hrefTarget: "_blank",
        },
        {
            title: t("tgPay.agreement", "Договор и открытие счета"),
            image: "/images/telegram-pay/img_13_2.svg",
            minutes: 15,
            href: "/docs/merchants-contract.docx",
        },
        {
            title: t("tgPay.botCreating", "Создание бота"),
            image: "/images/telegram-pay/img_13_3.svg",
            minutes: 20,
            //   href: "#",
        },
    ];

    useEffect(() => {
        LicensesClient.getAll({type: "GLOBAL_TG"})
            .then(result => {
                if (result.data.content.length && result.data.content[0].id) {
                    setSertificate(result?.data?.content ?? [])
                }
            })
    }, []);

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
            setGoToSlide(next);
            setCurrentSlide(current);
        },
    };

    const settings3 = {
        className: "carousel-documents",
        infinite: false,
        slidesToShow: 3,
        speed: 500,
        beforeChange: (current) => {
            setLicenseCurrent(current);
        },
        mobileFirst: true,
        nextArrow: <SampleNextArrow slideShow={3}/>,
        prevArrow: <SamplePrevArrow slideShow={3}/>,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    swipeToSlide: true,
                },
            },
        ],
    };

    const users_slider_config = {
        className: "carousel-users",
        infinite: true,
        loop: true,
        slidesToShow: 1,
        speed: 500,
        beforeChange: (current, next) => setSelectedUser(next),
        mobileFirst: true,
        fade: true,
        // arrows: false,
    };

    const usersRef = useRef();
    const handleSelectUser = (index) => {
        setSelectedUser(index);
        usersRef.current.slickGoTo(index);
    };

    const userSelectorRef = useRef();
    useEffect(() => {
        userSelectorRef.current &&
        userSelectorRef.current
            .querySelectorAll(".users-selector__item")
            .forEach((item, index) => {
                item.addEventListener("mouseover", () => handleSelectUser(index));
            });
    }, []);

    useEffect(() => {
        let sliders_array = Array.from(
            document.querySelectorAll(".slider-3d[data-fancybox]")
        );
        sliders_array.forEach((item) => {
            item.removeAttribute("data-fancybox");
        });

        let slider_active = document.querySelector(".slider-3d.active");
        slider_active.setAttribute("data-fancybox", "");
    }, [currentSlide]);

    useEffect(() => {
        setCurrentSlide(goToSlide);
    }, [goToSlide]);

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
        logEvent(analytics, "global_pay_main_page_visited");
    }, []);

    useEffect(() => {
        document.getElementById("root").style.overflow = "initial";
    }, []);

    function handleOpenModal(e) {
        e.preventDefault();
        setIsModalOpen(true);
        setIsValidated(false);
    }

    async function onFinish(values) {
        setErrorMessage(null);
        setLoading(true);
        setDataLoading(true)

        window.grecaptcha.ready(function () {
            window.grecaptcha
                .execute("6Lc1l2caAAAAAMJY54sSmK6Z2jUP5GFbWq23ey9_", {
                    action: "submit",
                })
                .then(function (token) {
                    const {description, have_bot, bot_link, ...rest} = values;
                    const dataRequest = {
                        ...rest,
                        description: t("tgPay.form.haveBot.label", "У Вас есть бот?") + ' - ' + t('tgPay.' + have_bot)
                            + '\n' + bot_link
                            + '\n\n' + description,
                        adminPanel: ADMIN_PANEL_TELEGRAM,
                        theme: `Telegram Pay - ${t("form-message-success")}`,
                        fileExist: true
                    };
                    FeedBackApiClient.createFeedBack(token, dataRequest)
                        .then(() => {
                            setAlertSuccess(true);
                            setIsModalOpen(false);
                            form.resetFields();
                            setLoading(false);
                            setDataLoading(false)
                        })
                        .catch((e) => {
                            setAlertError(true)
                            setIsModalOpen(false);
                            setErrorMessage(t('Form.error'));
                            setLoading(false);
                            setDataLoading(false)
                        });
                });
        });
    }

    const [haveBot, setHaveBot] = useState("yes");

    const onHaveBotRadioChange = (e) => {
        setHaveBot(e.target.value);
        if (e.target.value === "no") {
            if (!form.getFieldValue("bot_link")) {
                form.setFieldsValue({bot_link: " "});
                form.setFieldsValue({bot_link: ""});
            }
        }
    };

    const [isValidated, setIsValidated] = useState(false);

    function validateForm(fields) {
        let validated = true;
        const requiredFields = ["name", "email", "have_bot", "cellphone"];

        fields.forEach((field) => {
            if (requiredFields.includes(field.name[0])) {
                if (
                    !field.value ||
                    (field.name[0] === "have_bot" &&
                        field.value === "yes" &&
                        !fields.find((item) => item.name.includes("bot_link")).value)
                ) {
                    validated = false;
                }
            }
        });

        setIsValidated(
            validated &&
            form.getFieldsError().filter(({errors}) => errors.length).length === 0
        );
    }

    useEffect(() => {
        if (document !== undefined) {
            window.addEventListener("scroll", () => {
                let buttonScroll = document.querySelector(".scroll-top-button")
                if (buttonScroll) {
                    if (window.pageYOffset >= 700) {
                        buttonScroll.classList.add("visible-btn")
                    } else {
                        buttonScroll.classList.remove("visible-btn")
                    }

                    if (window.pageYOffset >= 11085) {
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

                    if (window.pageYOffset >= 11085) {
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
        <>
            <Helmet>
                <title>{seoData ? seoData.header[`${locale}`] : ''}</title>
                <meta name="description" content={seoData ? seoData.description[`${locale}`] : ''}/>
                <meta name="keywords" content={seoData ? seoData.keyWords[`${locale}`] : ''}/>
                <meta property="og:title" content={renderMeta('/global-pay/telegram-pay', locale, 'title')}/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:description"
                      content={renderMeta('/global-pay/telegram-pay', locale, 'og:description')}/>
                <meta property="og:url" content={renderMeta('/global-pay/telegram-pay', locale, 'og:url')}/>
                <meta property="og:type" content={renderMeta('/global-pay/telegram-pay', locale, 'og:type')}/>
                <meta property="og:site_name" content={renderMeta('/global-pay/telegram-pay', locale, 'og:site_name')}/>
                <meta property="og:image" content={renderMeta('/global-pay/telegram-pay', locale, 'og:image')}/>
                {renderMetaPixel()}
            </Helmet>

            <ModalSuccess
                itemScope
                itemType="http://schema.org/ImageObject"
                width={window.innerWidth <= 992 ? "100%" : "496px"}
                footer={null}
                visible={alertSuccess}
            >
                <img
                    itemProp="contentUrl"
                    src="/images/icons/global-pay/check-success.svg"
                    alt="success"
                />

                <div>
                    <h2>{t("pay_form.request.success")}</h2>
                    <p>{t("pay_form.request.success2")}</p>
                    <div className="warning-text">
                        <span>
                            <svg width="23" height="22" viewBox="0 0 23 22" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.5 20.1667C6.43724 20.1667 2.33333 16.0627 2.33333 11C2.33333 5.93725 6.43724 1.83333 11.5 1.83333C16.5627 1.83333 20.6667 5.93725 20.6667 11C20.6667 16.0627 16.5627 20.1667 11.5 20.1667ZM11.5 18.3333C13.4449 18.3333 15.3102 17.5607 16.6854 16.1854C18.0607 14.8102 18.8333 12.9449 18.8333 11C18.8333 9.05508 18.0607 7.18982 16.6854 5.81455C15.3102 4.43928 13.4449 3.66667 11.5 3.66667C9.55507 3.66667 7.68981 4.43928 6.31455 5.81455C4.93928 7.18982 4.16666 9.05508 4.16666 11C4.16666 12.9449 4.93928 14.8102 6.31455 16.1854C7.68981 17.5607 9.55507 18.3333 11.5 18.3333ZM10.5833 6.41667H12.4167V8.25H10.5833V6.41667ZM10.5833 10.0833H12.4167V15.5833H10.5833V10.0833Z"
                                    fill="#F38A23"/>
                            </svg>
                        </span>
                        {t('form_site4')}
                    </div>
                </div>

                <button onClick={() => setAlertSuccess(false)}>{t("close")}</button>
            </ModalSuccess>

            <ModalError itemScope itemType="http://schema.org/ImageObject"
                        width={window.innerWidth <= 992 ? '100%' : '496px'} footer={null} visible={alertError}>
                <img itemProp='contentUrl' src='/images/globalPay/error-icon.svg'/>

                <div>
                    <h2>{t('global-id.form_error1')}</h2>

                    <p>{errorMessage}</p>
                </div>

                <button onClick={() => setAlertError(false)}>{t('close')}</button>
            </ModalError>

            <ScrollTop className="scroll-top-button" onClick={scrollTop}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.5833 12.3943V31.6666H17.4166V12.3943L8.92365 20.8873L6.68481 18.6485L19 6.33331L31.3151 18.6485L29.0763 20.8873L20.5833 12.3943Z"
                        fill="white"/>
                </svg>
            </ScrollTop>

            <ModalForm
                width={window.innerWidth <= 992 ? "100%" : "690px"}
                closeIcon={<CloseModal/>}
                title={t("global-id.form_title")}
                footer={null}
                visible={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
            >
                {dataLoading ? <div className="modal-preloader">
                    <div className="preloader-img">
                        <img src="/images/globalPay/preloader-form.png" alt=""/>
                    </div>
                    <p>{t('form_site3')}</p>
                </div> : ''}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                        companyName: "",
                        name: "",
                        cellphone: "",
                        email: "",
                        have_bot: "yes",
                        bot_link: "",
                        description: "",
                    }}
                    onFieldsChange={(changedFields, allFields) => {
                        validateForm(allFields);
                    }}
                >
                    <Row gutter={[24]}>
                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label={t(
                                    "tgPay.form.companyName.label",
                                    "Название компании / проекта"
                                )}
                                name="companyName"
                                rules={[
                                    {
                                        required: false,
                                        message: t("pay_form.required1"),
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={t(
                                        "tgPay.form.companyName.placeholder",
                                        "Введите компанию / проект"
                                    )}
                                />
                            </Form.Item>
                            <ToolTipCustom
                                overlayInnerStyle={{
                                    borderRadius: 8,
                                    padding: "12px 14px",
                                    width: 248,
                                    boxShadow:
                                        "0px 12px 16px -4px rgba(234, 84, 48, 0.08), 0px 4px 6px -2px rgba(234, 84, 48, 0.03)",
                                }}
                                color="#EA5430"
                                placement="right"
                                title={<RenderTitleTooltip/>}
                            >
                <span className="icon-tooltip">
                  <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M6.9987 13.6673C3.3167 13.6673 0.332031 10.6827 0.332031 7.00065C0.332031 3.31865 3.3167 0.333984 6.9987 0.333984C10.6807 0.333984 13.6654 3.31865 13.6654 7.00065C13.6654 10.6827 10.6807 13.6673 6.9987 13.6673ZM6.9987 12.334C8.41319 12.334 9.76974 11.7721 10.7699 10.7719C11.7701 9.77169 12.332 8.41514 12.332 7.00065C12.332 5.58616 11.7701 4.22961 10.7699 3.22942C9.76974 2.22922 8.41319 1.66732 6.9987 1.66732C5.58421 1.66732 4.22766 2.22922 3.22746 3.22942C2.22727 4.22961 1.66536 5.58616 1.66536 7.00065C1.66536 8.41514 2.22727 9.77169 3.22746 10.7719C4.22766 11.7721 5.58421 12.334 6.9987 12.334V12.334ZM6.33203 3.66732H7.66536V5.00065H6.33203V3.66732ZM6.33203 6.33398H7.66536V10.334H6.33203V6.33398Z"
                        fill="#6C757D"
                    />
                  </svg>
                </span>
                            </ToolTipCustom>
                        </Col>

                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label={t("tgPay.form.name.label", "Имя")}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: t("pay_form.required1"),
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={t("tgPay.form.name.placeholder", "Введите имя")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24]}>
                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label={t("tgPay.form.telegram.label", "Telegram")}
                                name="cellphone"
                                rules={[
                                    {
                                        required: true,
                                        message: t("pay_form.required1"),
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder={t(
                                        "tgPay.form.telegram.placeholder",
                                        "Введите юзернейм / номер"
                                    )}
                                    className="w-100"
                                    onChange={(e) => {
                                        form.setFieldsValue({
                                            cellphone: form
                                                .getFieldValue("cellphone")
                                                .replace(/[аА-яЯ]+/g, ""),
                                        });
                                    }}
                                />
                            </Form.Item>
                            <ToolTipCustom
                                overlayInnerStyle={{
                                    borderRadius: 8,
                                    padding: "12px 14px",
                                    width: 248,
                                    boxShadow:
                                        "0px 12px 16px -4px rgba(234, 84, 48, 0.08), 0px 4px 6px -2px rgba(234, 84, 48, 0.03)",
                                }}
                                color="#EA5430"
                                placement="right"
                                title={<RederTitleTg/>}
                            >
                <span className="icon-tooltip">
                  <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M6.9987 13.6673C3.3167 13.6673 0.332031 10.6827 0.332031 7.00065C0.332031 3.31865 3.3167 0.333984 6.9987 0.333984C10.6807 0.333984 13.6654 3.31865 13.6654 7.00065C13.6654 10.6827 10.6807 13.6673 6.9987 13.6673ZM6.9987 12.334C8.41319 12.334 9.76974 11.7721 10.7699 10.7719C11.7701 9.77169 12.332 8.41514 12.332 7.00065C12.332 5.58616 11.7701 4.22961 10.7699 3.22942C9.76974 2.22922 8.41319 1.66732 6.9987 1.66732C5.58421 1.66732 4.22766 2.22922 3.22746 3.22942C2.22727 4.22961 1.66536 5.58616 1.66536 7.00065C1.66536 8.41514 2.22727 9.77169 3.22746 10.7719C4.22766 11.7721 5.58421 12.334 6.9987 12.334V12.334ZM6.33203 3.66732H7.66536V5.00065H6.33203V3.66732ZM6.33203 6.33398H7.66536V10.334H6.33203V6.33398Z"
                        fill="#6C757D"
                    />
                  </svg>
                </span>
                            </ToolTipCustom>
                        </Col>

                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                label={t("tgPay.form.email.label", "E-mail адрес")}
                                name="email"
                                rules={[
                                    {
                                        type: "email",
                                        message: t("pay_form.required3"),
                                    },
                                    {
                                        required: true,
                                        message: t("pay_form.required1"),
                                    },
                                ]}
                            >
                                <Input
                                    onChange={() => {
                                        form.setFieldsValue({
                                            email: form
                                                .getFieldValue("email")
                                                .replace(/[аА-яЯ]+/g, ""),
                                        });
                                    }}
                                    placeholder={t(
                                        "tgPay.form.email.placeholder",
                                        "Введите e-mail"
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24]}>
                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                className="have-bot-radio"
                                // label={t('pay_form.label6')}
                                label={t("tgPay.form.haveBot.label", "У Вас есть бот?")}
                                name="have_bot"
                                rules={[
                                    {
                                        required: true,
                                        message: t("pay_form.required1"),
                                    },
                                ]}
                            >
                                <Radio.Group
                                    onChange={onHaveBotRadioChange}
                                    value={haveBot}
                                    name="have_bot"
                                >
                                    <Radio
                                        value={"yes"}
                                        className={
                                            haveBot === "yes" ? "ant-radio-wrapper-checked" : ""
                                        }
                                    >
                                        {t("tgPay.yes", "Да")}!
                                    </Radio>
                                    <Radio value={"no"}>{t("tgPay.no", "Нет")} :(</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} span={24}>
                            <Form.Item
                                // label={t('pay_form.label6')}
                                label={t("tgPay.form.botLink.label", "Ссылка на бот")}
                                name="bot_link"
                                rules={[
                                    {
                                        required: haveBot === "yes",
                                        message: t("pay_form.required1"),
                                    },
                                ]}
                            >
                                {/* <Input   placeholder={t('pay_form.label7')}/> */}
                                <Input
                                    placeholder={t(
                                        "tgPay.form.botLink.placeholder",
                                        "Вставьте ссылку"
                                    )}
                                    onChange={() => {
                                        form.setFieldsValue({
                                            bot_link: form
                                                .getFieldValue("bot_link")
                                                .replace(/[аА-яЯ]+/g, ""),
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label={t("tgPay.form.description.label", "Сообщение")}
                        name="description"
                    >
                        <Input.TextArea
                            placeholder={t(
                                "tgPay.form.description.placeholder",
                                "Введите сообщение"
                            )}
                            showCount
                            maxLength={100}
                        />
                    </Form.Item>

                    {errorMessage ? (
                        <div className="error-message-server">
                            <p>{errorMessage}</p>
                        </div>
                    ) : (
                        ""
                    )}

                    <Form.Item style={{margin: "61px 0 0"}}>
                        <button
                            type="submit"
                            className="d-block mx-auto"
                            disabled={loading || !isValidated}
                        >
                            {t("send")}
                        </button>
                    </Form.Item>
                </Form>
                <style>{`
           .ant-modal-body {
                position:relative;
             }
          `}</style>
            </ModalForm>

            {/* Intro */}
            <Section1 pt={72} pb={0} className="block-intro">
                <h1>
                    <Trans
                        i18nKey="tgPay.acceptPayments"
                        components={{1: <span/>, 2: <strong/>}}
                    />
                </h1>

                <div className="block-intro__container">
                    <div className="block-intro__image" ref={intro}>
                        <img
                            src="/images/telegram-pay/img-girl-with-bg.png"
                            alt=""
                            className="block-intro__bg"
                        />

                        <FloatingCard className="product-card">
                            <div className="product-card__image">
                                <img src="/images/telegram-pay/product-image.png" alt=""/>
                            </div>
                            <div className="product-card__info">
                                <div className="product-card__title">
                                    {t("tgPay.oversize", "Футболка OVERSIZE")}
                                </div>
                                <div className="product-card__price">
                                    200 000 {t("tgPay.uzs", "сум")}
                                </div>
                                <div className="product-card__options">
                                    <span>{t("tgpay.colors", "цвета")}:</span>
                                    <div className="color-list">
                                        <div
                                            className="color-list__item"
                                            style={{
                                                backgroundColor: "#FFFFFF",
                                                borderColor: "#EAEAEA",
                                            }}
                                        ></div>
                                        <div
                                            className="color-list__item"
                                            style={{
                                                backgroundColor: "#A7DFFF",
                                                borderColor: "#F5F5F5",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <AnimatedArrow className="floating-card__hint">
                                <Arrow0101/>
                                <span>{t("tgPay.hint.create", "создавай")}</span>
                            </AnimatedArrow>
                        </FloatingCard>

                        <FloatingCard className="humo-uzcard">
                            <SvgUzcard width={50} height={50}/>
                            <SvgHumo width={50} height={50}/>
                            <SvgTelegram width={50} height={50}/>

                            <AnimatedArrow className="floating-card__hint">
                                <Arrow0102/>
                                <span>{t("tgPay.hint.uzcardHumo", "Humo и Uzcard")}</span>
                            </AnimatedArrow>
                        </FloatingCard>

                        <FloatingCard className="promote">
                            <div className="promote__stat">
                                <IconEye/>
                                <span>200K</span>
                            </div>
                            <div className="promote__stat">
                                <IconChat/>
                                <span>165K</span>
                            </div>

                            <AnimatedArrow className="floating-card__hint">
                                <Arrow0103/>
                                <span>{t("tgPay.hint.promote", "продвигай")}</span>
                            </AnimatedArrow>
                        </FloatingCard>

                        <FloatingCard className="statistics">
                            <SvgPieChart width={100} className="statistics__chart"/>
                            <div className="statistics__legend">
                                <div className="statistics__legend-item">
                  <span
                      className="statistics__legend-color"
                      style={{backgroundColor: "#297FFF"}}
                  />
                                    <span className="statistics__legend-label">
                    {t("tgPay.clothes", "одежда")}
                  </span>
                                </div>
                                <div className="statistics__legend-item">
                  <span
                      className="statistics__legend-color"
                      style={{backgroundColor: "#5D9EFF"}}
                  />
                                    <span className="statistics__legend-label">
                    {t("tgPay.courses", "курсы")}
                  </span>
                                </div>
                                <div className="statistics__legend-item">
                  <span
                      className="statistics__legend-color"
                      style={{backgroundColor: "#9DC4FF"}}
                  />
                                    <span className="statistics__legend-label">
                    {t("tgPay.pastries", "выпечка")}
                  </span>
                                </div>
                            </div>

                            <AnimatedArrow className="floating-card__hint">
                                <Arrow0104/>
                                <span>{t("tgPay.hint.statistics", "статистика")}</span>
                            </AnimatedArrow>
                        </FloatingCard>

                        <FloatingCard className="pay-button">
                            <div className="pay-button__card">
                                {t("tgPay.pay", "Оплатить")}
                            </div>

                            <AnimatedArrow className="floating-card__hint">
                                <Arrow0105/>
                                <span>{t("tgPay.hint.acceptPayments", "получай платежи")}</span>
                            </AnimatedArrow>
                        </FloatingCard>
                    </div>
                </div>
            </Section1>

            {/* КОМУ это нужно? */}
            <Section2 bgcolor="#FAFCFF" pt={75} pb={75}>
                <div className="row g-4 audience" ref={section2ref}>
                    <div className="col-lg-4">
                        <div className="audience__text">
                            <AnimatedArrow className="audience__arrow d-none d-lg-block">
                                <Arrow0201/>
                            </AnimatedArrow>
                            <h2>{t("tgPay.whoNeedThis", "Кому это нужно?")}</h2>
                            <p>
                                (
                                {t(
                                    "tgPay.everyoneWhoWant",
                                    "всем кто хочет получать оплаты через Telegram"
                                )}{" "}
                                :)
                            </p>
                            <div className="d-none d-lg-flex">
                                <PrimaryButton size="small" onClick={handleOpenModal}>
                                    {t("tgPay.connect", "Подключить")}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <Audience/>
                        <div className="d-flex justify-content-center mt-5 d-lg-none">
                            <PrimaryButton size="small" onClick={handleOpenModal}>
                                {t("tgPay.connect", "Подключить")}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Section2>

            {/* Как это работает? */}
            <Section3
                className="how-it-works"
                style={{overflow: "initial"}}
                title={t("tgPay.howItWorks", "Как это работает?")}
            >
                <div
                    className="row d-none d-md-flex position-sticky gx-5"
                    style={{top: 0, zIndex: 10, height: '100vh'}}
                >
                    <div className="col-md-7 col-xl-6 d-flex align-items-center">
                        <div className="frame-container w-100 d-none d-md-flex" ref={frameContainerRef}>
                            <div className="frame frame--1 slideDown">
                                <video
                                    src="/videos/tg-pay-3.mp4"
                                    width={238}
                                    height={430}
                                    autoplay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="frame__icon frame__icon--right-top">
                                    <IconImage/>
                                </div>
                                <div className="frame__icon frame__icon--left-top">
                                    <IconAttachment/>
                                </div>
                                {/* <div className="frame__icon frame__icon--left-bottom"></div> */}
                                <div className="frame__icon frame__icon--right-bottom">
                                    <IconWallet/>
                                </div>
                                <AnimatedArrow className="frame__arrow">
                                    <Arrow0301/>
                                    <span>{t("tgPay.hint.createPost", "создать пост")}</span>
                                </AnimatedArrow>
                            </div>

                            <div className="frame frame--2">
                                <video
                                    src="/videos/tg-pay-4.mp4"
                                    width={238}
                                    height={430}
                                    autoplay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="frame__icon frame__icon--right-top">
                                    <IconChat/>
                                </div>
                                {/* <div className="frame__icon frame__icon--left-top"></div> */}
                                <div className="frame__icon frame__icon--left-bottom">
                                    <IconEye/>
                                </div>
                                <div className="frame__icon frame__icon--right-bottom">
                                    <IconHeart/>
                                </div>
                                <AnimatedArrow className="frame__arrow">
                                    <Arrow0401/>
                                    <span>{t("tgPay.hint.yourGroup", "ваша группа")}</span>
                                </AnimatedArrow>
                            </div>

                            <div className="frame frame--3">
                                <video
                                    src="/videos/tg-pay-5.mp4"
                                    width={238}
                                    height={430}
                                    autoplay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="frame__icon frame__icon--right-top">
                                    <SvgUzcard/>
                                </div>
                                {/* <div className="frame__icon frame__icon--left-top"></div> */}
                                <div className="frame__icon frame__icon--left-bottom">
                                    <SvgHumo/>
                                </div>
                                <div className="frame__icon frame__icon--right-bottom">
                                    <IconWallet/>
                                </div>
                                <AnimatedArrow className="frame__arrow">
                                    <Arrow0501/>
                                    <span>{t("tgPay.hint.uzcardHumo", "Humo и Uzcard")}</span>
                                </AnimatedArrow>
                            </div>

                            <div className="frame frame--4">
                                <video
                                    src="/videos/tg-pay-6.mp4"
                                    width={238}
                                    height={430}
                                    autoplay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="frame__icon frame__icon--right-top">
                                    <IconUser/>
                                </div>
                                {/* <div className="frame__icon frame__icon--left-top"></div> */}
                                <div className="frame__icon frame__icon--left-bottom">
                                    <IconPieChart/>
                                </div>
                                <div className="frame__icon frame__icon--right-bottom">
                                    <IconFile/>
                                </div>
                                <AnimatedArrow className="frame__arrow">
                                    <Arrow0601/>
                                    <span>{t("tgPay.hint.yourBot", "ваш бот")}</span>
                                </AnimatedArrow>
                            </div>

                        </div>

                    </div>
                    <div className="col-md-5 col-xl-6">
                        <div className="how-it-works__title">
                            {t("tgPay.howItWorks", "Как это работает?")}
                        </div>
                    </div>
                </div>
                <div className="row gx-5" ref={section3ref}>
                    {/* <div className="col-md-6 d-flex justify-content-center"> */}
                    <div className="col-md-7 col-xl-6 d-flex justify-content-center">
                        <div className="frame frame--1 slideDown">
                            <video
                                src="/videos/tg-pay-3.mp4"
                                width={238}
                                height={430}
                                autoplay
                                loop
                                muted
                                playsInline
                            />
                            <div className="frame__icon frame__icon--right-top">
                                <IconImage/>
                            </div>
                            <div className="frame__icon frame__icon--left-top">
                                <IconAttachment/>
                            </div>
                            {/* <div className="frame__icon frame__icon--left-bottom"></div> */}
                            <div className="frame__icon frame__icon--right-bottom">
                                <IconWallet/>
                            </div>
                            <AnimatedArrow className="frame__arrow">
                                <Arrow0301/>
                                <span>{t("tgPay.hint.createPost", "создать пост")}</span>
                            </AnimatedArrow>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-6">
                        <div className="screen how-it-works__text">
                            {/* <div className="how-it-works__title">{t("tgPay.howItWorks", "Как это работает?")}</div> */}
                            <div className="how-it-works__description">
                                {t(
                                    "tgPay.howItWorks1",
                                    "Создавайте посты, назначайте цену, добавляйте описание и фотографии товаров или услуг"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-5" ref={section4ref}>
                    <div className="col-md-7 col-xl-6 d-flex justify-content-center">
                        <div className="frame frame--2">
                            <video
                                src="/videos/tg-pay-4.mp4"
                                width={238}
                                height={430}
                                autoplay
                                loop
                                muted
                                playsInline
                            />
                            <div className="frame__icon frame__icon--right-top">
                                <IconChat/>
                            </div>
                            {/* <div className="frame__icon frame__icon--left-top"></div> */}
                            <div className="frame__icon frame__icon--left-bottom">
                                <IconEye/>
                            </div>
                            <div className="frame__icon frame__icon--right-bottom">
                                <IconHeart/>
                            </div>
                            <AnimatedArrow className="frame__arrow">
                                <Arrow0401/>
                                <span>{t("tgPay.hint.yourGroup", "ваша группа")}</span>
                            </AnimatedArrow>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-6">
                        <div className="screen how-it-works__text">
                            {/* <div className="how-it-works__title">{t("tgPay.howItWorks", "Как это работает?")}</div> */}
                            <div className="how-it-works__description">
                                {t(
                                    "tgPay.howItWorks2",
                                    "Продвигайте свой пост. Делитесь инвойсам в группах, каналах или отправляете в личном сообщении. Запускайте рекламу в платных каналах."
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-5" ref={section5ref}>
                    <div className="col-md-7 col-xl-6 d-flex justify-content-center">
                        <div className="frame frame--3">
                            <video
                                src="/videos/tg-pay-5.mp4"
                                width={238}
                                height={430}
                                autoplay
                                loop
                                muted
                                playsInline
                            />
                            <div className="frame__icon frame__icon--right-top">
                                <SvgUzcard/>
                            </div>
                            {/* <div className="frame__icon frame__icon--left-top"></div> */}
                            <div className="frame__icon frame__icon--left-bottom">
                                <SvgHumo/>
                            </div>
                            <div className="frame__icon frame__icon--right-bottom">
                                <IconWallet/>
                            </div>
                            <AnimatedArrow className="frame__arrow">
                                <Arrow0501/>
                                <span>{t("tgPay.hint.uzcardHumo", "Humo и Uzcard")}</span>
                            </AnimatedArrow>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-6">
                        <div className="screen how-it-works__text">
                            {/* <div className="how-it-works__title">{t("tgPay.howItWorks", "Как это работает?")}</div> */}
                            <div className="how-it-works__description">
                                {t(
                                    "tgPay.howItWorks3",
                                    "Ваши клиенты смогут прямо в мессенджере осуществлять оплату через карты Uzcard и Humo. Нужно просто указать  имя, телефон, добавить и сохранить карту."
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-5" ref={section6ref}>
                    <div className="col-md-7 col-xl-6 d-flex justify-content-center">
                        <div className="frame frame--4">
                            <video
                                src="/videos/tg-pay-6.mp4"
                                width={238}
                                height={430}
                                autoplay
                                loop
                                muted
                                playsInline
                            />
                            <div className="frame__icon frame__icon--right-top">
                                <IconUser/>
                            </div>
                            {/* <div className="frame__icon frame__icon--left-top"></div> */}
                            <div className="frame__icon frame__icon--left-bottom">
                                <IconPieChart/>
                            </div>
                            <div className="frame__icon frame__icon--right-bottom">
                                <IconFile/>
                            </div>
                            <AnimatedArrow className="frame__arrow">
                                <Arrow0601/>
                                <span>{t("tgPay.hint.yourBot", "ваш бот")}</span>
                            </AnimatedArrow>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-6">
                        <div className="screen how-it-works__text">
                            {/* <div className="how-it-works__title">{t("tgPay.howItWorks", "Как это работает?")}</div> */}
                            <div className="how-it-works__description">
                                {t(
                                    "tgPay.howItWorks4",
                                    "Получайте мгновенные уведомления об оплате с указанием имени и номера телефона клиента. Просматривайте статистику по платежам."
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="how-it-works__shadow"></div>
            </Section3>

            {/* У вас есть свой бот? */}
            <Section7
                bgcolor="#FAFCFF"
                pt={62}
                pb={70}
                title={t("tgPay.doYouHaveABot", "У вас есть свой бот?")}
                className="have-bot"
            >
                <div className="row justify-content-center" ref={section7ref}>
                    <DataCard hoverColor="blue">
                        <div className="data-card__title">{t("tgPay.yes", "Да")}!</div>
                        <img
                            src="/images/telegram-pay/img_7_1.png"
                            alt=""
                            className="data-card__media"
                        />
                        <div className="data-card__description">
                            {t(
                                "tgPay.botConnection",
                                "Мы можем подключить онлайн оплаты на ваш бот"
                            )}
                        </div>

                        {/* <div className="data-card__action">
                <SecondaryButton href="/" target="_blank">{t("tgPay.instruction", "Инструкция")}</SecondaryButton>
            </div> */}
                    </DataCard>
                    <DataCard hoverColor="blue">
                        <div className="data-card__title">{t("tgPay.no", "Нет")} :(</div>
                        <img
                            src="/images/telegram-pay/img_7_2.png"
                            alt=""
                            className="data-card__media"
                        />
                        <div className="data-card__description">
                            {t(
                                "tgPay.botCreation",
                                "Мы помогаем интересным проектам и создаем для них бот бесплатно"
                            )}
                        </div>

                        <div className="data-card__action">
                            <SecondaryButton href="https://global.uz/blog/9"
                                             target="_blank">{t("tgPay.instruction", "Инструкция")}</SecondaryButton>
                        </div>

                        <AnimatedArrow className="arrow-hint position-right">
                            <Arrow0701/>
                            <span>{t("tgPay.hint.learnMore", "узнай больше")}</span>
                        </AnimatedArrow>
                    </DataCard>
                </div>
            </Section7>

            {/* С кем мы работаем? */}
            <Section8
                className="clients"
                pt={62}
                title={t("tgPay.workWith", "С кем мы работаем?")}
            >
                <div className="row justify-content-center" ref={section8ref}>
                    <DataCard>
                        <div className="data-card__title">
                            {t("tgPay.selfEmployed", "Самозанятые")}
                        </div>
                        <img
                            src="/images/telegram-pay/img_8_1.svg"
                            alt={t("tgPay.selfEmployeed", "Самозанятые")}
                            className="data-card__media"
                        />
                        <div className="data-card__description">
                            <a
                                href="https://soliq.uz/press-services/news/show/samozanyatost-udobno-legalno-i-bez-riska?lang=ru"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {t(
                                    "tgPay.reasonsBecomeSelfemployed",
                                    "Как и зачем становиться самозанятым?"
                                )}
                            </a>
                        </div>

                        <AnimatedArrow className="arrow-hint position-left">
                            <Arrow0801/>
                            <span>
                {t("tgPay.hint.learnHowtoBecome", "узнай как им стать")}
              </span>
                        </AnimatedArrow>
                    </DataCard>
                    <DataCard>
                        <div className="data-card__title">
                            {t("tgPay.legalEntities", "Юридические лица")}
                        </div>
                        <img
                            src="/images/telegram-pay/img_8_2.svg"
                            alt={t("tgPay.legalEntities", "Юридические лица")}
                            className="data-card__media"
                        />
                        <div className="data-card__description">
                            {t(
                                "tgPay.privateCompanies",
                                "Государственные и частные компании"
                            )}
                        </div>
                    </DataCard>
                </div>
            </Section8>

            {/* Отслеживайте запросы через личный кабинет */}
            <Section9
                bgcolor="#FAFCFF"
                title={t(
                    "tgPay.watchPersonalCabinet",
                    "Отслеживайте запросы через личный кабинет"
                )}
                pt={64}
            >
                <Fancybox options={{infinite: false}} className="demo-slides">
                    <div className="carousel-wrap">
                        {window.innerWidth <= 991 ? (
                            <Slider {...settings}>
                                {sliders.map((item) => item.content)}
                            </Slider>
                        ) : (
                            <Carousel slides={sliders} {...spring_settings} />
                        )}
                    </div>
                </Fancybox>
                <div className="demo-version">
                    <PrimaryButton
                        href="https://demo.globalpay.uz/1/dashboard-merchant"
                        target="_blank"
                        rel="nofollow"
                    >
                        {t("tgPay.tryDemo")}
                    </PrimaryButton>
                </div>
            </Section9>

            {/* Сумм */}
            <Section10 pt={60} pb={60}>
                <div className="row g-0 position-relative" ref={section10ref}>
                    <div className="col-6 section-summ">
                        <div className="section-summ__info">
                            <p>0</p>
                            <span>{t("tgPay.uzs", "сум")}</span>
                        </div>
                        <div className="section-summ__text">
                            <p>{t("tgPay.freeIntegration", "Интеграция бесплатно")}</p>
                        </div>

                        <AnimatedArrow className="arrow-hint">
                            <Arrow1001/>
                            <span>
                - {t("tgPay.hint.botIsFree", "И бот бесплатно?")}
                                <br/>- {t("tgPay.hint.readAbove", "Читай выше")} :)
              </span>
                        </AnimatedArrow>
                    </div>
                    <div className="col-6 section-summ">
                        <div className="section-summ__info">
                            <p>1.5</p>
                            <span className="fw-900">%</span>
                        </div>
                        <div className="section-summ__text text-size">
                            <p>{t("tgPay.transactionPrice", "Стоимость с транзакции")}</p>
                        </div>
                    </div>
                </div>
            </Section10>

            {/* Это безопасно */}
            <Section11
                bgcolor="#FAFCFF"
                pt={63}
                pb={70}
                title={t("tgPay.itsSafe", "Это безопасно")}
            >
                <div className="row gx-0 gx-md-4" ref={section11ref}>
                    <div className="col-md-5">
                        <div className="safety-image">
                            <img
                                src="/images/telegram-pay/img_11.png"
                                alt={t("tgPay.itsSafe", "Это безопасно")}
                            />

                            <AnimatedArrow className="safety-image__hint arrow-hint">
                                <Arrow1101 className="d-none d-lg-block"/>
                                <div className="safety-image__hint-text">
                                    <span>{t("tgPay.hint.checkLink", "проверь по ссылке")}</span>
                                    <a
                                        href="https://t.me/BotNews"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        https://t.me/BotNews
                                    </a>
                                </div>
                            </AnimatedArrow>
                        </div>
                    </div>
                    <div className="col-md-7 align-self-end">
                        <div className="safety-cards">
                            {safetyCertificates.map((item, index) => (
                                <div
                                    key={index}
                                    className="safety-card"
                                    data-fancybox={`safety-certificate-${index}`}
                                    data-src={item.img.full}
                                    itemScope
                                    itemType="http://schema.org/ImageObject"
                                >
                                    <div className="safety-card__image">
                                        <img src={item.img.thumb} alt={item.title}/>
                                    </div>
                                    <div className="safety-card__info">
                                        <div className="safety-card__title">{item.title}</div>
                                        <div className="safety-card__description">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section11>

            {/* Наши лицензии */}
            <Section12 title={t("pay_sertificate.text1")} pt={62} pb={62}>
                <Slider {...settings3} key={"key-sertificate"}>
                    {sertificate.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className="certificate"
                                data-fancybox={`certificate-${index}`}
                                data-src={item.fileId ? `${image_download}?fileKey=${item.fileId.url}` : ''}
                                itemScope
                                itemType="http://schema.org/ImageObject"
                            >
                                <div className="certificate__image">
                                    <img
                                        itemProp="contentUrl"
                                        src={item.fileId ? `${image_download}?fileKey=${item.fileId.url}` : ''}
                                        alt={item.title}
                                    />
                                </div>
                                <div className="certificate__info">
                                    <h6 className="certificate__title">{item.name[locale] ? item.name[locale] : ''} </h6>
                                    <div className="certificate__description">
                                        {item.org[locale] ? item.org[locale] : ''}
                                    </div>
                                </div>
                            </div>
                            // <div key={item.id} className='certificate'>
                            //     <div>
                            //         <div className='img-documents' data-fancybox="" data-src={item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''} itemScope itemType="http://schema.org/ImageObject">
                            //             <img itemProp='contentUrl' src={item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''}/>
                            //         </div>
                            //         <div className='text-documents'>
                            //             <h6 className="title">{item.name[locale]?item.name[locale]:''} </h6>
                            //             <p>{item.org[locale]?item.org[locale]:''}</p>
                            //         </div>
                            //     </div>
                            // </div>
                        );
                    })}
                </Slider>
            </Section12>

            {/* Как подключить */}
            <Section13
                bgcolor="#FAFCFF"
                title={t("tgPay.howToConnect", "Как подключить")}
                pt={66}
            >
                <div className="row gy-4">
                    {connectionData.map((item, index) => (
                        <div className="col-md-4 col-lg-4 d-flex justify-content-center" key={index}>
                            <DataCard onClick={() => item.href && window.open(item.href)}>
                                <div className="data-card__title">{item.title}</div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="data-card__image"
                                />
                                {/*<div className="data-card__description">*/}
                                {/*    <IconClock/> {item.minutes} {t("tgPay.minutes", "минут")}*/}
                                {/*</div>*/}
                            </DataCard>
                        </div>
                    ))}
                </div>
            </Section13>

            {/* Кто уже с нами */}
            {false && (
                <Section15 bgcolor="#FAFCFF" pt={85} pb={0}>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <h2>{t("tgPay.withUs", "Уже с нами")}</h2>
                            <Slider {...users_slider_config} ref={usersRef}>
                                {usersItems.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="user-info">
                                                <div className="user-info__heading">
                                                    <img
                                                        src={item.photo}
                                                        alt={item.name}
                                                        className="user-info__photo"
                                                        width={50}
                                                    />
                                                    <div className="user-info__name">{item.name}</div>
                                                    <div className="user-info__bot">
                                                        <Link
                                                            to={`https://t.me/${
                                                                item.bot.startsWith("@")
                                                                    ? item.bot.substring(1)
                                                                    : item.bot
                                                            }`}
                                                        >
                                                            {item.bot}
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="user-info__description">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                            <div className="users-selector-buttons"></div>
                        </div>
                        <div className="col-md-8">
                            <div className="users-selector" ref={userSelectorRef}>
                                {usersItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={
                                            "users-selector__item" +
                                            (selectedUser === index ? " active" : "")
                                        }
                                        style={{backgroundColor: item.bgcolor}}
                                    >
                                        <img
                                            src={item.photo}
                                            alt={item.name}
                                            className="users-selector__avatar"
                                        />
                                        <div
                                            className="users-selector__username"
                                            style={{color: item.color}}
                                        >
                                            {item.bot}
                                        </div>
                                        <div className="users-selector__screenshot">
                                            <img src={item.screenshot} alt={item.bot}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section15>
            )}

            {/* Дополнительные услуги */}
            <Section14 bgcolor="#141414" title={t("pay_service.text1")}>
                <div className="services row gx-8">
                    <div className="col-md-4 mt-block">
                        <a href={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay/services/2`}
                           className="services__link bg_orange">
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
                        <a href={`${locale === 'ru' ? '/' : `/${locale}/`}global-pay`}
                           className="services__link bg_orange">
                            <div className="services__link_top" itemScope itemType="http://schema.org/ImageObject">
                                <img height={50} itemProp='contentUrl' src="/images/icons/global-pay/circle-pay.svg"
                                     alt=""/>
                                <span>
                                        <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                    </span>
                            </div>
                            <p>{t('pay_service.text10')}</p>
                        </a>
                    </div>
                    {/* <div className="col-md-4 mt-block">
                        <a href="/" className="services__link bg_orange">
                            <div className="services__link_top">
                                <img src="/images/icons/global-pay/user-plus.svg" alt=""/>
                                <span>
                                    <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                </span>
                            </div>
                            <p>{t('pay_service.text4')}</p>
                        </a>
                    </div>
                    <div className="col-md-4 mt-block">
                        <a href="/" className="services__link bg_blue">
                            <div className="services__link_top">
                                <img src="/images/icons/global-pay/smartphone.svg" alt=""/>
                                <span>
                                    <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                </span>
                            </div>
                            <p>Заказать разработку мобильного приложения </p>
                        </a>
                    </div>
                    <div className="col-md-4 mt-block">
                        <a href="/" className="services__link bg_blue">
                            <div className="services__link_top">
                                <img src="/images/icons/global-pay/web-line.svg" alt=""/>
                                <span>
                                    <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                                </span>
                            </div>
                            <p>Заказать разработку вебсайта </p>
                        </a>
                    </div> */}
                    <div className="col-md-4 mt-block">
                        <a
                            href={`${locale === 'ru' ? '/' : `/${locale}/`}global-id`}
                            className="services__link bg_blue"
                        >
                            <div className="services__link_top">
                                <img src="/images/icons/global-pay/finger.svg" alt=""/>
                                <span>
                  <img src="/images/icons/global-pay/arrow-link.svg" alt=""/>
                </span>
                            </div>
                            <p>{t("pay_service.text7")}</p>
                        </a>
                    </div>
                </div>
                {/* <div className="services-button">
                    <OutlinedButton>{t('pay_service.text8')}</OutlinedButton>
                </div> */}
            </Section14>
            <style>{`
                .ant-tooltip { margin-top: 4px; }
                .ant-tooltip-placement-left .ant-tooltip-arrow { right: -7px; }
                .ant-tooltip-placement-right .ant-tooltip-arrow { left: -2px; }
                .ant-tooltip .ant-tooltip-arrow span { width: 13px; height: 13px; }
                .ant-tooltip .ant-tooltip-arrow-content { box-shadow: none; }
            `}</style>
        </>
    );
}
