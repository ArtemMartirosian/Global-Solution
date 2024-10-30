import { Dropdown, Menu } from "antd";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { DropDownMenu, HeaderSection, MenuDropDown } from "./style";

export default function Header(props) {
  const { locale, contacts } = props;
  const { t, i18n } = useTranslation();
  const languagesArr = ["ru", "uz", "en"].filter((item) => item !== locale);
  const navigate = useNavigate();
  const subMenu = useRef();

  useEffect(() => {
    i18n.changeLanguage(locale).then();
  }, [locale]);

  useEffect(() => {
    function handlerHideNav() {
      if (subMenu?.current) {
        if (window.pageYOffset > 0) {
          subMenu.current.classList.add("visible-hide");
        } else {
          subMenu.current.classList.remove("visible-hide");
        }
      }
    }

    window.addEventListener("scroll", handlerHideNav);

    return () => {
      window.removeEventListener("scroll", handlerHideNav);
    };
  }, []);

  let pathname =
    locale !== "ru"
      ? props.pathname === `/${locale}`
        ? props.pathname.replace(`/${locale}`, "")
        : props.pathname.replace(`/${locale}/`, "")
      : props.pathname.substring(1);

  let pageTheme = props.pathname.match("global-id")
    ? "global-id"
    : props.pathname.match("telegram-pay")
      ? "global-pay telegram-pay"
      : props.pathname.match("global-pay")
        ? "global-pay"
        : "global";

  const languages = (
    <DropDownMenu className="drop-down-language">
      {languagesArr.map((item, index) => {
        if (item === "ru") {
          return (
            <Menu.Item key={index}>
              <Link to={`/${pathname}`}>Ру</Link>
            </Menu.Item>
          );
        }
        return (
          <Menu.Item key={index}>
            <Link to={`/${item}/${pathname}`}>
              {item === "uz" ? "O'z" : "En"}
            </Link>
          </Menu.Item>
        );
      })}
    </DropDownMenu>
  );

  const menu = () => {
    if (props.pathname.match("global-pay")) {
      return (
        <MenuDropDown>
          <div className="item-menu-group">
            <p>Global Pay Gate</p>
            <MenuDropDown.Item
              onClick={() =>
                navigate(
                  `${locale === "ru" ? "/" : `/${locale}/`
                  }global-pay/services/2`
                )
              }
            >
              <div className="group-svg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1_5909)">
                    <path
                      d="M19.0829 23.9665L23.5 19.5493L19.0829 15.1322L17.7578 16.4573L19.9128 18.6123H16.1328C14.7662 18.6123 13.4691 18.0201 12.5741 16.9876L9.39246 13.3174C8.92902 12.7828 7.80365 11.9755 7.80365 11.9755C7.80365 11.9755 8.9292 11.1835 9.3844 10.6582L12.5741 6.97888C13.4691 5.94635 14.7662 5.354 16.1328 5.354L19.9128 5.354L17.7578 7.50916L19.0829 8.83429L23.5 4.41705L19.0829 0L17.7578 1.32513L19.9128 3.4801L16.1328 3.4801C14.2224 3.4801 12.4093 4.30792 11.158 5.75134L7.96844 9.43066C7.09558 10.4376 5.80469 11.0178 4.42993 11.0228H-0.5V12.8967H4.41785C5.77136 12.8967 7.06848 13.4974 7.9765 14.545L11.158 18.2151C12.4093 19.6586 14.2224 20.4862 16.1328 20.4862H19.9128L17.7578 22.6414L19.0829 23.9665Z"
                      fill="#E9532F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_5909">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(24) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="group-text">
                <p>{t("pay_header5")}</p>
                <span>{t("pay_header4")}</span>
              </div>
            </MenuDropDown.Item>
            <MenuDropDown.Item
              onClick={() =>
                navigate(
                  `${locale === "ru" ? "/" : `/${locale}/`
                  }global-pay/telegram-pay`
                )
              }
            >
              <div className="group-svg">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1_5918)">
                    <path
                      d="M3.25008 3.25H22.7501C23.0374 3.25 23.313 3.36414 23.5161 3.5673C23.7193 3.77047 23.8334 4.04602 23.8334 4.33333V21.6667C23.8334 21.954 23.7193 22.2295 23.5161 22.4327C23.313 22.6359 23.0374 22.75 22.7501 22.75H3.25008C2.96276 22.75 2.68721 22.6359 2.48405 22.4327C2.28088 22.2295 2.16675 21.954 2.16675 21.6667V4.33333C2.16675 4.04602 2.28088 3.77047 2.48405 3.5673C2.68721 3.36414 2.96276 3.25 3.25008 3.25V3.25ZM21.6667 11.9167H4.33341V20.5833H21.6667V11.9167ZM21.6667 9.75V5.41667H4.33341V9.75H21.6667ZM15.1667 16.25H19.5001V18.4167H15.1667V16.25Z"
                      fill="#E9532F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_5918">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="group-text">
                <div className="text-new">
                  <div>{t("pay_header2")}</div>
                  <p>Telegram Pay</p>
                </div>
                <span>{t("tgPay.subtitle")}</span>
              </div>
            </MenuDropDown.Item>
          </div>
          <div className="item-menu-group">
            <p>{t("pay_header8")}</p>
            <MenuDropDown.Item
              onClick={() =>
                navigate(`${locale === "ru" ? "/" : `/${locale}/`}global-id`)
              }
            >
              <div className="group-svg" style={{ background: "#F2F0FF" }}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1_5937)">
                    <path
                      d="M18.4166 14.0834V15.1668C18.4166 18.1676 17.6973 21.0655 16.342 23.6666L16.0961 24.1216L14.2035 23.0664C15.4602 20.8131 16.1643 18.2889 16.2423 15.6608L16.2499 15.1668V14.0834H18.4166ZM11.9166 10.8334H14.0833V15.1668L14.0778 15.5773C13.9959 18.5432 12.9752 21.4066 11.1626 23.7554L10.9123 24.0696L9.23318 22.7003C10.8868 20.6808 11.8277 18.1721 11.9101 15.5633L11.9166 15.1668V10.8334ZM12.9999 6.50009C14.4365 6.50009 15.8143 7.07077 16.8301 8.0866C17.8459 9.10242 18.4166 10.4802 18.4166 11.9168H16.2499C16.2499 11.0548 15.9075 10.2282 15.298 9.61866C14.6885 9.00917 13.8619 8.66676 12.9999 8.66676C12.138 8.66676 11.3113 9.00917 10.7018 9.61866C10.0923 10.2282 9.74993 11.0548 9.74993 11.9168V15.1668C9.74993 17.588 8.86159 19.8728 7.28968 21.6418L7.06001 21.891L5.49134 20.396C6.7588 19.0699 7.50011 17.3278 7.57676 15.495L7.58326 15.1668V11.9168C7.58326 10.4802 8.15394 9.10242 9.16977 8.0866C10.1856 7.07077 11.5633 6.50009 12.9999 6.50009V6.50009ZM12.9999 2.16676C15.5858 2.16676 18.0657 3.19399 19.8942 5.02247C21.7227 6.85095 22.7499 9.3309 22.7499 11.9168V15.1668C22.7499 17.0063 22.5311 18.8176 22.1032 20.5726L21.9526 21.1565L19.8618 20.5867C20.2864 19.0299 20.5258 17.4212 20.5746 15.7821L20.5833 15.1668V11.9168C20.5833 10.5094 20.1916 9.12973 19.4521 7.93226C18.7126 6.7348 17.6545 5.76674 16.3961 5.13643C15.1378 4.50613 13.7288 4.23844 12.327 4.36333C10.9251 4.48822 9.58572 5.00076 8.45859 5.84359L6.91484 4.29876C8.64111 2.91565 10.7879 2.16348 12.9999 2.16676V2.16676ZM5.38193 5.83167L6.92676 7.37543C5.99762 8.61392 5.47191 10.1082 5.42093 11.6557L5.41659 11.9168L5.42093 14.0834C5.42093 15.2968 5.13493 16.47 4.59543 17.5252L4.42643 17.8393L2.54468 16.7647C2.95634 16.0443 3.19684 15.2404 3.24451 14.3998L3.25426 14.0834V11.9168C3.24783 9.70495 3.99867 7.55758 5.38193 5.83167V5.83167Z"
                      fill="#7B65FF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_5937">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="group-text">
                <div className="text-new">
                  <div>{t("pay_header9")}</div>
                  <p>{t("id.id1")}</p>
                  {/* <p>{t('pay_header10')}</p> */}
                </div>
                <span>Global ID</span>
              </div>
            </MenuDropDown.Item>
          </div>
          <Link
            to={`${locale === "ru" ? "/" : `/${locale}/`}global-pay/services`}
          >
            {t("pay_header12")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.172 7.00066L6.808 1.63666L8.222 0.222656L16 8.00066L8.222 15.7787L6.808 14.3647L12.172 9.00066H0V7.00066H12.172Z"
                fill="#03053D"
              />
            </svg>
          </Link>
        </MenuDropDown>
      );
    } else if (props.pathname.match("global-id")) {
      return (
        <MenuDropDown>
          <div className="item-menu-group">
            <p>Global ID SDK</p>
            <MenuDropDown.Item>
              <div className="group-svg" style={{ background: "#F2F0FF" }}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.2503 16.25V17.5C21.2503 20.9625 20.4203 24.3063 18.8565 27.3075L18.5728 27.8325L16.389 26.615C17.839 24.015 18.6515 21.1025 18.7415 18.07L18.7503 17.5V16.25H21.2503ZM13.7503 12.5H16.2503V17.5L16.244 17.9738C16.1495 21.3959 14.9718 24.6998 12.8803 27.41L12.5915 27.7725L10.654 26.1925C12.562 23.8623 13.6477 20.9677 13.7428 17.9575L13.7503 17.5V12.5ZM15.0003 7.50001C16.6579 7.50001 18.2476 8.15849 19.4197 9.3306C20.5918 10.5027 21.2503 12.0924 21.2503 13.75H18.7503C18.7503 12.7555 18.3552 11.8016 17.6519 11.0984C16.9487 10.3951 15.9948 10 15.0003 10C14.0057 10 13.0519 10.3951 12.3486 11.0984C11.6454 11.8016 11.2503 12.7555 11.2503 13.75V17.5C11.2503 20.2938 10.2253 22.93 8.41152 24.9713L8.14652 25.2588L6.33652 23.5338C7.79897 22.0037 8.65432 19.9935 8.74277 17.8788L8.75027 17.5V13.75C8.75027 12.0924 9.40875 10.5027 10.5809 9.3306C11.753 8.15849 13.3427 7.50001 15.0003 7.50001ZM15.0003 2.50001C17.984 2.50001 20.8454 3.68528 22.9552 5.79506C25.065 7.90484 26.2503 10.7663 26.2503 13.75V17.5C26.2503 19.6225 25.9978 21.7125 25.504 23.7375L25.3303 24.4113L22.9178 23.7538C23.4078 21.9575 23.684 20.1013 23.7403 18.21L23.7503 17.5V13.75C23.7503 12.1261 23.2984 10.5342 22.4451 9.15252C21.5919 7.77082 20.3709 6.65384 18.919 5.92656C17.467 5.19928 15.8413 4.89042 14.2238 5.03452C12.6063 5.17862 11.0608 5.77002 9.76027 6.74251L7.97902 4.96001C9.97087 3.36411 12.448 2.49623 15.0003 2.50001ZM6.21027 6.72876L7.99277 8.51001C6.92069 9.93905 6.3141 11.6633 6.25527 13.4488L6.25027 13.75L6.25527 16.25C6.25527 17.65 5.92527 19.0038 5.30277 20.2213L5.10777 20.5838L2.93652 19.3438C3.41152 18.5125 3.68902 17.585 3.74402 16.615L3.75527 16.25V13.75C3.74786 11.1979 4.61421 8.72019 6.21027 6.72876Z"
                    fill="#7B65FF"
                  />
                </svg>
              </div>
              <div className="group-text">
                <div className="text-new">
                  <div>{t("pay_header2")}</div>
                  <p>{t("global-id.header1")}</p>
                </div>
                <span>{t("pay_header4")}</span>
              </div>
            </MenuDropDown.Item>
            <MenuDropDown.Item>
              <div className="group-svg" style={{ background: "#F2F0FF" }}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.2503 16.25V17.5C21.2503 20.9625 20.4203 24.3063 18.8565 27.3075L18.5728 27.8325L16.389 26.615C17.839 24.015 18.6515 21.1025 18.7415 18.07L18.7503 17.5V16.25H21.2503ZM13.7503 12.5H16.2503V17.5L16.244 17.9738C16.1495 21.3959 14.9718 24.6998 12.8803 27.41L12.5915 27.7725L10.654 26.1925C12.562 23.8623 13.6477 20.9677 13.7428 17.9575L13.7503 17.5V12.5ZM15.0003 7.50001C16.6579 7.50001 18.2476 8.15849 19.4197 9.3306C20.5918 10.5027 21.2503 12.0924 21.2503 13.75H18.7503C18.7503 12.7555 18.3552 11.8016 17.6519 11.0984C16.9487 10.3951 15.9948 10 15.0003 10C14.0057 10 13.0519 10.3951 12.3486 11.0984C11.6454 11.8016 11.2503 12.7555 11.2503 13.75V17.5C11.2503 20.2938 10.2253 22.93 8.41152 24.9713L8.14652 25.2588L6.33652 23.5338C7.79897 22.0037 8.65432 19.9935 8.74277 17.8788L8.75027 17.5V13.75C8.75027 12.0924 9.40875 10.5027 10.5809 9.3306C11.753 8.15849 13.3427 7.50001 15.0003 7.50001ZM15.0003 2.50001C17.984 2.50001 20.8454 3.68528 22.9552 5.79506C25.065 7.90484 26.2503 10.7663 26.2503 13.75V17.5C26.2503 19.6225 25.9978 21.7125 25.504 23.7375L25.3303 24.4113L22.9178 23.7538C23.4078 21.9575 23.684 20.1013 23.7403 18.21L23.7503 17.5V13.75C23.7503 12.1261 23.2984 10.5342 22.4451 9.15252C21.5919 7.77082 20.3709 6.65384 18.919 5.92656C17.467 5.19928 15.8413 4.89042 14.2238 5.03452C12.6063 5.17862 11.0608 5.77002 9.76027 6.74251L7.97902 4.96001C9.97087 3.36411 12.448 2.49623 15.0003 2.50001ZM6.21027 6.72876L7.99277 8.51001C6.92069 9.93905 6.3141 11.6633 6.25527 13.4488L6.25027 13.75L6.25527 16.25C6.25527 17.65 5.92527 19.0038 5.30277 20.2213L5.10777 20.5838L2.93652 19.3438C3.41152 18.5125 3.68902 17.585 3.74402 16.615L3.75527 16.25V13.75C3.74786 11.1979 4.61421 8.72019 6.21027 6.72876Z"
                    fill="#7B65FF"
                  />
                </svg>
              </div>
              <div className="group-text">
                <p>{t("global-id.header1")}</p>
                <span>{t("pay_header4")}</span>
              </div>
            </MenuDropDown.Item>
            <MenuDropDown.Item>
              <div className="group-svg" style={{ background: "#F2F0FF" }}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.2503 16.25V17.5C21.2503 20.9625 20.4203 24.3063 18.8565 27.3075L18.5728 27.8325L16.389 26.615C17.839 24.015 18.6515 21.1025 18.7415 18.07L18.7503 17.5V16.25H21.2503ZM13.7503 12.5H16.2503V17.5L16.244 17.9738C16.1495 21.3959 14.9718 24.6998 12.8803 27.41L12.5915 27.7725L10.654 26.1925C12.562 23.8623 13.6477 20.9677 13.7428 17.9575L13.7503 17.5V12.5ZM15.0003 7.50001C16.6579 7.50001 18.2476 8.15849 19.4197 9.3306C20.5918 10.5027 21.2503 12.0924 21.2503 13.75H18.7503C18.7503 12.7555 18.3552 11.8016 17.6519 11.0984C16.9487 10.3951 15.9948 10 15.0003 10C14.0057 10 13.0519 10.3951 12.3486 11.0984C11.6454 11.8016 11.2503 12.7555 11.2503 13.75V17.5C11.2503 20.2938 10.2253 22.93 8.41152 24.9713L8.14652 25.2588L6.33652 23.5338C7.79897 22.0037 8.65432 19.9935 8.74277 17.8788L8.75027 17.5V13.75C8.75027 12.0924 9.40875 10.5027 10.5809 9.3306C11.753 8.15849 13.3427 7.50001 15.0003 7.50001ZM15.0003 2.50001C17.984 2.50001 20.8454 3.68528 22.9552 5.79506C25.065 7.90484 26.2503 10.7663 26.2503 13.75V17.5C26.2503 19.6225 25.9978 21.7125 25.504 23.7375L25.3303 24.4113L22.9178 23.7538C23.4078 21.9575 23.684 20.1013 23.7403 18.21L23.7503 17.5V13.75C23.7503 12.1261 23.2984 10.5342 22.4451 9.15252C21.5919 7.77082 20.3709 6.65384 18.919 5.92656C17.467 5.19928 15.8413 4.89042 14.2238 5.03452C12.6063 5.17862 11.0608 5.77002 9.76027 6.74251L7.97902 4.96001C9.97087 3.36411 12.448 2.49623 15.0003 2.50001ZM6.21027 6.72876L7.99277 8.51001C6.92069 9.93905 6.3141 11.6633 6.25527 13.4488L6.25027 13.75L6.25527 16.25C6.25527 17.65 5.92527 19.0038 5.30277 20.2213L5.10777 20.5838L2.93652 19.3438C3.41152 18.5125 3.68902 17.585 3.74402 16.615L3.75527 16.25V13.75C3.74786 11.1979 4.61421 8.72019 6.21027 6.72876Z"
                    fill="#7B65FF"
                  />
                </svg>
              </div>
              <div className="group-text">
                <p>{t("global-id.header1")}</p>
                <span>{t("pay_header4")}</span>
              </div>
            </MenuDropDown.Item>
          </div>
          <div className="item-menu-group">
            <p>{t("pay_header8")}</p>
            <MenuDropDown.Item>
              <div className="group-svg">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.022 7.46L23.8382 5.64375L25.6057 7.41125L23.7895 9.2275C25.5842 11.474 26.4506 14.3223 26.2108 17.1877C25.971 20.053 24.6432 22.7177 22.5001 24.6346C20.3569 26.5516 17.5612 27.5751 14.6869 27.4951C11.8127 27.4151 9.07822 26.2376 7.04505 24.2044C5.01188 22.1712 3.83437 19.4367 3.75436 16.5625C3.67435 13.6883 4.6979 10.8925 6.61481 8.74939C8.53172 6.60625 11.1965 5.27844 14.0618 5.03865C16.9271 4.79886 19.7755 5.66529 22.022 7.46V7.46ZM14.9995 25C16.1485 25 17.2863 24.7737 18.3479 24.3339C19.4095 23.8942 20.3741 23.2497 21.1866 22.4372C21.9992 21.6247 22.6437 20.6601 23.0834 19.5985C23.5231 18.5369 23.7495 17.3991 23.7495 16.25C23.7495 15.1009 23.5231 13.9631 23.0834 12.9015C22.6437 11.8399 21.9992 10.8753 21.1866 10.0628C20.3741 9.2503 19.4095 8.60578 18.3479 8.16605C17.2863 7.72633 16.1485 7.5 14.9995 7.5C12.6788 7.5 10.4532 8.42187 8.81228 10.0628C7.17134 11.7038 6.24946 13.9294 6.24946 16.25C6.24946 18.5706 7.17134 20.7962 8.81228 22.4372C10.4532 24.0781 12.6788 25 14.9995 25V25ZM13.7495 10H16.2495V17.5H13.7495V10ZM9.99946 1.25H19.9995V3.75H9.99946V1.25Z"
                    fill="#E9532F"
                  />
                </svg>
              </div>
              <div className="group-text">
                <div className="text-new">
                  <div>{t("pay_header9")}</div>
                  <p>{t("pay_header3")}</p>
                </div>
                <span>Global Pay</span>
              </div>
            </MenuDropDown.Item>
            <MenuDropDown.Item>
              <div className="group-svg" style={{ background: "#EDF5FF" }}>
                <svg
                  width="30"
                  height="24"
                  viewBox="0 0 30 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 12L22.9288 19.0712L21.1613 17.3038L26.465 12L21.1613 6.69625L22.9288 4.92875L30 12ZM3.535 12L8.83875 17.3038L7.07125 19.0712L0 12L7.07125 4.92875L8.8375 6.69625L3.535 12ZM12.235 23.25H9.575L17.765 0.75H20.425L12.235 23.25Z"
                    fill="#0D3664"
                  />
                </svg>
              </div>
              <div className="group-text text-size">
                <p>{t("pay_header11")}</p>
                <span>Global Dev</span>
              </div>
            </MenuDropDown.Item>
          </div>
          <Link to={"/"}>
            {t("pay_header12")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.172 7.00066L6.808 1.63666L8.222 0.222656L16 8.00066L8.222 15.7787L6.808 14.3647L12.172 9.00066H0V7.00066H12.172Z"
                fill="#03053D"
              />
            </svg>
          </Link>
        </MenuDropDown>
      );
    }
  };

  const submenuRender = () => {
    if (
      props.pathname.match("global-pay") ||
      props.pathname.match("telegram-pay")
    ) {
      return (
        <div className="submenu-wrap global-pay-wrap global-pay">
          <Link
            className={`nav-link ${props.pathname ===
                `${locale === "ru" ? "/" : `/${props.locale}/`}global-pay`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}/`}global-pay`}
          >
            <div className="icons-svg icon-gate"></div>
            <span>{t("gate")}</span>
          </Link>
          <Dropdown
            overlay={menu}
            trigger={window.innerWidth <= 556 ? "click" : "hover"}
            className={`nav-link ${props.pathname.match(
              `${locale === "ru" ? "/" : `/${props.locale}/`
              }global-pay/services`
            )
                ? "active"
                : ""
              }`}
          >
            <a href="/" onClick={(e) => e.preventDefault()}>
              <div className="icons-svg icon-service"></div>
              <span>
                {t("global-pay1")}
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.49999 4.97656L9.62499 0.851562L10.8033 2.0299L5.49999 7.33323L0.196655 2.0299L1.37499 0.851562L5.49999 4.97656Z"
                    fill="white"
                  />
                </svg>
              </span>
            </a>
          </Dropdown>

          <Link
            className={`nav-link ${props.pathname ===
                `${locale === "ru" ? "/" : `/${props.locale}/`
                }global-pay/certificate`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${props.locale}/`
              }global-pay/certificate`}
          >
            <div className={"icons-svg icon-cert"}></div>
            <span>{t("header-subtitle2")}</span>
          </Link>
          <Link
            className={`nav-link ${props.pathname.match("/global-pay/docs/") ? "active" : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${props.locale}/`
              }global-pay/docs/getCardInfo`}
          >
            <div className="icons-svg icon-dev"></div>
            <span>{t("global-pay2")}</span>
          </Link>
          {/*<Link className={`nav-link ${props.pathname === `${locale==='ru'?'/':`/${props.locale}/`}global-pay/contacts` ? 'active' : ''}`} to={`${locale==='ru'?'/':`/${props.locale}/`}global-pay/contacts`}>*/}
          {/*    <div className="icons-svg icon-kon"></div>*/}
          {/*    <span>{t('global-pay3')}</span>*/}
          {/*</Link>*/}
        </div>
      );
    } else if (props.pathname.match("global-id")) {
      return (
        <div className="submenu-wrap global-id global-pay">
          <Link
            className={`nav-link ${props.pathname ===
                `${props.locale === "ru" ? "/" : `/${props.locale}/`}global-id`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${props.locale}/`}global-id`}
          >
            <div className="icons-svg icon-gate"></div>
            <span>{t("gate")}</span>
          </Link>

          <Link
            className={`nav-link ${props.pathname === `/${props.locale}/global-id/certificate`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${props.locale}/`
              }global-id/certificate`}
          >
            <div className={"icons-svg icon-cert"}></div>
            <span>{t("header-subtitle2")}</span>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="submenu-wrap">
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}` : "/"}`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}`}`}
          >
            <span className="icon-svg icon-home"></span>
            <span>{t("header.link0")}</span>
          </Link>
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}` : "/"}about`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}`}about?content=about.info`}
          >
            <span className="icon-svg icon-info"></span>
            <span>{t("header.link1")}</span>
          </Link>
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}/` : "/"}services`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}/`}services`}
          >
            <span className="icon-svg icon-service"></span>
            <span>{t("services")}</span>
          </Link>
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}/` : "/"}blog`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}/`}blog`}
          >
            <span className="icon-svg icon-blog" />
            <span>{t("Blog link")}</span>
          </Link>
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}/` : "/"}networking`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}/`}networking`}
          >
            <span className="icon-svg icon-networking"></span>
            <span>{t("header.link2")}</span>
          </Link>
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}/` : "/"}experience`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}/`}experience`}
          >
            <span className="icon-svg icon-book"></span>
            <span>{t("header.link3")}</span>
          </Link>
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}/` : "/"}certificate`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}/`}certificate`}
          >
            <span className="icon-svg icon-list"></span>
            <span>{t("header.link4")}</span>
          </Link>
          <Link
            className={`text-nowrap nav-link d-flex flex-column justify-content-end align-items-center ${props.pathname ===
                `${props.locale !== "ru" ? `/${props.locale}/` : "/"}contacts`
                ? "active"
                : ""
              }`}
            to={`${locale === "ru" ? "/" : `/${locale}/`}contacts`}
          >
            <span className="icon-svg icon-local"></span>
            <span>{t("header.link5")}</span>
          </Link>
        </div>
      );
    }
  };

  return (
    <HeaderSection ref={subMenu}>
      <nav className={`navbar navbar-expand-lg navbar-dark ${pageTheme}`}>
        <div className={`container`}>
          <Link
            itemScope
            itemType="http://schema.org/Organization"
            className="navbar-brand navbar__logo"
            to={`${locale === "ru" ? "" : `/${locale}/`}`}
          >
            <img
              itemProp="logo"
              src={
                props.pathname.match("global-id")
                  ? "/images/logo-id.svg"
                  : props.pathname.match("global-pay")
                    ? "/images/icons/global-pay/logo-white-pay.svg"
                    : "/images/logo-white.svg"
              }
              className="logo"
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav mx-auto">
              <li
                className={`nav-item ${!props.pathname.match("global-pay") &&
                    !props.pathname.match("global-id")
                    ? "active"
                    : ""
                  }`}
              >
                <Link
                  className="nav-link"
                  to={`${locale === "ru" ? "/" : `/${locale}`}`}
                >
                  {" "}
                  Development{" "}
                </Link>
              </li>
              <li
                className={`nav-item ${props.pathname.match("global-pay") ? "active" : ""
                  }`}
              >
                <Link
                  className="nav-link"
                  to={`${locale === "ru" ? "/" : `/${locale}/`}global-pay`}
                >
                  {" "}
                  Payment{" "}
                </Link>
              </li>
              <li
                className={`nav-item ${props.pathname.match("global-id") ? "active" : ""
                  }`}
              >
                <Link
                  className="nav-link"
                  to={`${locale === "ru" ? "/" : `/${locale}/`}global-id`}
                >
                  {" "}
                  Identification{" "}
                </Link>
              </li>
            </ul>
            <div className="navbar-nav pt-0 align-items-center">
              <Dropdown
                overlayStyle={{ zIndex: 250000 }}
                overlay={languages}
                trigger={["click"]}
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {locale === "ru" ? "Ру" : locale === "uz" ? "O'z" : "En"}{" "}
                  <i className="icons8-sort-down" />
                </a>
              </Dropdown>
              <a
                className="nav-link"
                href={`tel:${contacts && contacts.cellphone ? contacts.cellphone : ""
                  }`}
              >
                <i className="icons8-phone" style={{ marginRight: "5px" }} />
                {t("header.link6")}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className={`navbar navbar-expand-lg position-fixed navbar-dark ${pageTheme}`}
      >
        <div className={`container`}>
          <Link
            itemScope
            itemType="http://schema.org/Organization"
            className="navbar-brand navbar__logo"
            to={
              props.pathname.match("global-pay")
                ? locale === "ru"
                  ? "/global-pay"
                  : `/${locale}/global-pay`
                : props.pathname.match("global-id")
                  ? locale === "ru"
                    ? "/global-id"
                    : `/${locale}/global-id`
                  : ""
            }
          >
            <img
              itemProp="logo"
              src={
                props.pathname.match("global-id")
                  ? "/images/logo-id.svg"
                  : props.pathname.match("global-pay")
                    ? "/images/icons/global-pay/logo-white-pay.svg"
                    : "/images/logo-white.svg"
              }
              className="logo"
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav mx-auto">
              <li
                className={`nav-item ${!props.pathname.match("global-pay") &&
                    !props.pathname.match("global-id")
                    ? "active"
                    : ""
                  }`}
              >
                <Link
                  className="nav-link"
                  to={`${locale === "ru" ? "/" : `/${locale}`}`}
                >
                  {" "}
                  Development{" "}
                </Link>
              </li>
              <li
                className={`nav-item ${props.pathname.match("global-pay") ? "active" : ""
                  }`}
              >
                <Link
                  className="nav-link"
                  to={`${locale === "ru" ? "/" : `/${locale}/`}global-pay`}
                >
                  {" "}
                  Payment{" "}
                </Link>
              </li>
              <li
                className={`nav-item ${props.pathname.match("global-id") ? "active" : ""
                  }`}
              >
                <Link
                  className="nav-link"
                  to={`${locale === "ru" ? "/" : `/${locale}/`}global-id`}
                >
                  {" "}
                  Identification{" "}
                </Link>
              </li>
            </ul>
            <div className="navbar-nav pt-0 align-items-center">
              <Dropdown overlay={languages} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {locale === "ru" ? "Ру" : locale === "uz" ? "O'z" : "En"}{" "}
                  <i className="icons8-sort-down" />
                </a>
              </Dropdown>
              <a
                className="nav-link"
                href={`tel:${contacts && contacts.cellphone ? contacts.cellphone : ""
                  }`}
              >
                <i className="icons8-phone" style={{ marginRight: "5px" }} />
                {t("header.link6")}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <nav className={`navbar-submenu ${pageTheme}`}>
        <div className="container no-scrollbar">{submenuRender()}</div>
      </nav>
    </HeaderSection>
  );
}
