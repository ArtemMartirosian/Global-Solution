import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import { Seo } from "../../api";
import { SectionTop } from "../../components/Header-Pages/style";
import NotContent from "../../components/NotContent/NotContent";
import { urlCleaner } from "../../utils/url-cleaner";
import { Capital } from "./RightSide/Capital/Capital";
import { CommonInfo } from "./RightSide/CommonInfo/CommonInfo";
import { Legal } from "./RightSide/Legal/Legal";
import { Management } from "./RightSide/Management/Management";
import { Vacancy } from "./RightSide/Vacancy/Vacancy";
import { LeftMenu } from "./components/LeftMenu";
import { options } from "./constants/options";
import { MainLayout } from "./style/MainLayout.style";
import { Structure } from "./RightSide/Structure/Structure";
import { Awards } from "./RightSide/Awards/Awards";
import { PublicOffer } from "./RightSide/PublicOffer/PublicOffer";
import { Helmet } from "react-helmet-async";
import { renderMeta } from "../../assets/scripts";
import { renderMetaPixel } from "../../utils/meta-pixels";
import DropdownMenu from "./components/DropdownMenu";

export default function About(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const { locale, pathname } = props;
  const [seoData, setSeoData] = useState(undefined);
  const [mainUrl, setMainUrl] = useState("");
  const location = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Seo.getAll().then((response) => {
      if (response) {
        const foundResponse = response.find(
          (item) => `/${item.url}` === urlCleaner(location.pathname)
        );
        if (foundResponse) {
          setSeoData(foundResponse);
        }
      }
    });

    if (pathname.match("global-pay")) {
      setMainUrl("global-pay");
      // setServices(Articles.find(item => item.key === 'global-pay')?.article || [])
    } else if (pathname.match("global-id")) {
      setMainUrl("global-id");
      // setServices(Articles.find(item => item.key === 'global-id')?.article || [])
    } else {
      //setServices(Articles.find(item=>item.key==='global')?.article||[])
    }
  }, [pathname]);

  function getMainPath() {
    if (pathname.match("global-pay")) {
      return "/global-pay/services";
    } else if (pathname.match("global-id")) {
      return "/global-id/services";
    } else {
      return "/services";
    }
  }

  const content = (value = searchParams.get("content")) => {
    switch (value) {
      case "about.info":
        return <CommonInfo />;
      case "about.management":
        return <Management />;
      case "about.legal":
        return <Legal />;
      case "about.structure":
        return <Structure />;
      case "about.awards":
        return <Awards />;
      case "about.investors":
      case "investors.business-plan":
      case "investors.own-shares":
      case "investors.dividends":
      case "investors.reports":
      case "investors.management-organisations":
      case "investors.internal-documents":
      case "investors.diclosure":
        return <NotContent />;
      case "investors.capital":
        return <Capital />;
      case "vacancies":
        return <Vacancy />;
      case "public-offer":
        return <PublicOffer />;
      default:
        return <NotContent />;
    }
  };

  const onItemClick = (value) => {
    setSearchParams({ content: value });
  };

  return (
    <>
      <Helmet>
        <title>{seoData ? seoData.header[`${locale}`] : ""}</title>
        <meta
          name="description"
          content={seoData ? seoData.description[`${locale}`] : ""}
        />
        <meta
          name="keywords"
          content={seoData ? seoData.keyWords[`${locale}`] : ""}
        />
        <meta
          property="og:title"
          content={renderMeta(getMainPath(), locale, "title")}
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:description"
          content={renderMeta(getMainPath(), locale, "og:description")}
        />
        <meta
          property="og:url"
          content={renderMeta(getMainPath(), locale, "og:url")}
        />
        <meta
          property="og:type"
          content={renderMeta(getMainPath(), locale, "og:type")}
        />
        <meta
          property="og:site_name"
          content={renderMeta(getMainPath(), locale, "og:site_name")}
        />
        <meta
          property="og:image"
          content={renderMeta(getMainPath(), locale, "og:image")}
        />
        {renderMetaPixel()}
      </Helmet>
      <SectionTop className="section-pagetop font-segoe">
        <video
          className="bg-video"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
        >
          <source src="/images/videobg.mp4" type="video/mp4" />
        </video>
        <div className="container">
          <h1 className="title-page text-white">{t("about.title")}</h1>
        </div>
      </SectionTop>
      <main>
        <div className="container">
          <div className="layout"></div>
          <MainLayout>
            <aside className="left-side">
              <LeftMenu
                options={options}
                onItemClick={onItemClick}
                activeItemValue={searchParams.get("content")}
              />
              <DropdownMenu
                open={open}
                setOpen={setOpen}
                activeItemValue={searchParams.get("content") || ""}
              >
                <LeftMenu
                  options={options}
                  onItemClick={onItemClick}
                  activeItemValue={searchParams.get("content")}
                />
              </DropdownMenu>
            </aside>
            <article className="right-side">{content()}</article>
          </MainLayout>
        </div>
      </main>
    </>
  );
}
