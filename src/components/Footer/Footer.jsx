import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "../../assets/icons";
import { FooterSection } from "./style";

export default function Footer(props) {
  const { t } = useTranslation();
  const { locale } = props;
  let pageTheme = props.pathname.match("global-id")
    ? "purple"
    : props.pathname.match("global-pay")
    ? "orange"
    : "blue";
  const isPathPlobalPay = props.pathname.match("global-pay");
  return (
    <FooterSection className={`${pageTheme === "orange" ? "dark-footer" : ""}`}>
      <img src="/images/globe-transp.png" className="globe-bottom" alt="" />
      <div className="position-relative">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-2 col-md-2">
              <p>
                <img
                  src={
                    props.pathname.match("global-id")
                      ? "/images/logo-id.svg"
                      : props.pathname.match("global-pay")
                      ? "/images/icons/global-pay/logo-white-pay.svg"
                      : "/images/logo-white.svg"
                  }
                  className="img-logo"
                  alt=""
                />
              </p>
            </div>
            <div className="col-lg-5 col-md-4">
              <nav className="nav-footer d-flex justify-content-md-end flex-sm-row flex-column">
                <a
                  href="https://tashkent.hh.uz/employer/1933280"
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  {t("footer.link1")}
                </a>
                <Link
                  to={`${locale === "ru" ? "/" : `/${locale}/`}certificate`}
                >
                  {t("footer.link2")}
                </Link>
                {locale === "en" ? (
                  <Link
                    to="/POL01 Information Security Policy.pdf"
                    target="_blank"
                    rel="nofollow"
                  >
                    Security policy
                  </Link>
                ) : (
                  ""
                )}
                {isPathPlobalPay ? (
                  <Link
                    to={`${
                      locale === "ru" ? "/" : `/${locale}/`
                    }global-pay/agreement`}
                  >
                    {t("footer.link3.1")}
                  </Link>
                ) : (
                  <Link
                    to={`${locale === "ru" ? "/" : `/${locale}/`}agreement`}
                  >
                    {t("footer.link3")}
                  </Link>
                )}
                <Link to={`${locale === "ru" ? "/" : `/${locale}/`}contacts`}>
                  {t("footer.link4")}
                </Link>
              </nav>
            </div>
          </div>
          <div className="row justify-content-between">
            <p className="w-auto m-md-0 opacity-75">
              © 2011-2023 Global Solutions. {t("footer.text")}
            </p>
            <div className="social-footer w-auto opacity-75">
              <a
                href="https://www.instagram.com/globalsolutionsuz/"
                target="_blank"
                rel="nofollow noreferrer"
              >
                <Instagram />
              </a>
              <a
                href="https://www.facebook.com/globalsolutionsuzbekistan"
                target="_blank"
                rel="nofollow noreferrer"
              >
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/company/14532825/"
                target="_blank"
                rel="nofollow noreferrer"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </FooterSection>
  );
}
