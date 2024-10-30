import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ContactsClient } from "../../api";

/*-----Components-----*/
import About from "../../pages/About";
import Agreement from "../../pages/Agreement/Agreement";
import BlogList from "../../pages/Global/Blog/BlogList";
import BlogOne from "../../pages/Global/Blog/BlogOne";
import Certificate from "../../pages/Global/Certificate/Certificate";
import Contacts from "../../pages/Global/Contacts/Contacts";
import Experience from "../../pages/Global/Experience/Experience";
import Main from "../../pages/Global/Main/Main";
import Networking from "../../pages/Global/Networking/Networking";
import VideoList from "../../pages/Global/Video/VideoList";
import VideoOne from "../../pages/Global/Video/VideoOne";
import GlobalIdCertificates from "../../pages/GlobalId/Certificates/Certificates";
import GlobalIdMain from "../../pages/GlobalId/Main/Main";
import GlobalPayCertificate from "../../pages/GlobalPay/Certificate/Certificate";
import GlobalPayDocs from "../../pages/GlobalPay/Docs/Docs";
import Gate from "../../pages/GlobalPay/Gate/Gate";
import GlobalPayMain from "../../pages/GlobalPay/Main/Main";
import NotFound from "../../pages/NotFound/NotFound";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ContactsId from "../../pages/GlobalId/Contacts/Contacts";
import Chunk from "../../pages/GlobalPay/Docs/Chunk";
import { urls } from "../../pages/GlobalPay/Docs/data";
import Services from "../../pages/Services";
import ServiceView from "../../pages/Services/service-view";
import TelegramPay from "../../pages/TelegramPay/Main/Main";
import GlobalPayAgreement from '../../pages/GlobalPayAgreement/GlobalPayAgreement';

export default function Layout(props) {
  let { locale } = props;
  const [contacts, setContacts] = useState(null);
  const [contactsArr, setContactsArr] = useState([]);
  let urlLocale = props.pathname.substring(1, 3).match(/en|uz/)
    ? props.pathname.substring(1, 3)
    : "ru";
  if (locale !== urlLocale) {
    props.setLocale(urlLocale);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [props.pathname]);

  useEffect(() => {
    ContactsClient.getAll().then((result) => {
      if (result.data.content.length && result.data.content[0].id) {
        setContacts(result.data.content[0]);
        setContactsArr(result.data.content);
      }
    });
  }, []);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    let linkAlternate = Array.from(
      document.querySelectorAll("link[rel~='alternate']")
    );
    const languages = {
      ru: [
        {
          hreflang: "uz-UZ",
          link: "https://global.uz/uz/",
        },
        {
          hreflang: "en-UZ",
          link: "https://global.uz/en/",
        },
      ],
      uz: [
        {
          hreflang: "ru-UZ",
          link: "https://global.uz/",
        },
        {
          hreflang: "en-UZ",
          link: "https://global.uz/en/",
        },
      ],
      en: [
        {
          hreflang: "ru-UZ",
          link: "https://global.uz/",
        },
        {
          hreflang: "uz-UZ",
          link: "https://global.uz/uz/",
        },
      ],
    };

    linkAlternate.forEach((item, index) => {
      item.setAttribute("hreflang", languages[locale][index].hreflang);
      item.setAttribute("href", languages[locale][index].link);
    });

    const icons = {
      global: "/favicon.ico",
      global_pay: "/logo-pay.ico",
      global_id: "/logo-id.ico",
    };
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    if (props.pathname.match("global-pay")) {
      link.href = icons.global_pay;
    } else if (props.pathname.match("global-id")) {
      link.href = icons.global_id;
    } else {
      link.href = icons.global;
    }
  }, [locale]);

  const routes = [
    {
      path: "/",
      component: <Main {...props} />,
    },
    {
      path: "/about",
      component: <About {...props} />,
    },
    {
      path: "/experience",
      component: <Experience {...props} />,
    },
    {
      path: "/networking",
      component: <Networking {...props} />,
    },
    {
      path: "/contacts",
      component: <Contacts {...props} contacts={contactsArr} />,
    },
    {
      path: "/certificate",
      component: <Certificate {...props} />,
    },
    {
      path: "/agreement",
      component: <Agreement {...props} />,
    },
    {
      path: "/global-pay/agreement",
      component: <GlobalPayAgreement {...props} />,
    },
    {
      path: "/blog",
      component: <BlogList {...props} />,
    },
    {
      path: "/blog/:id",
      component: <BlogOne {...props} />,
    },
    {
      path: "/video/",
      component: <VideoList {...props} />,
    },
    {
      path: "/video/:id",
      component: <VideoOne {...props} />,
    },
    {
      path: "/services/",
      component: <Services {...props} />,
    },
    {
      path: "/services/:id",
      component: <ServiceView {...props} />,
    },
    {
      path: "/global-pay",
      component: <GlobalPayMain {...props} contacts={contactsArr} />,
    },
    {
      path: "/global-pay/gate",
      component: <Gate {...props} contacts={contactsArr} />,
    },
    {
      path: "/global-pay/certificate",
      component: <GlobalPayCertificate {...props} contacts={contactsArr} />,
    },
    {
      path: "/global-pay/services/:id",
      component: <ServiceView {...props} />,
    },
    {
      path: "/global-pay/services",
      component: <Services {...props} />,
    },
    {
      path: "/global-pay/contacts",
      component: <ContactsId {...props} />,
    },
    {
      path: "/global-pay/docs",
      component: <GlobalPayDocs {...props} contacts={contacts} />,
      children: urls(),
    },
    {
      path: "/global-pay/telegram-pay",
      component: <TelegramPay {...props} contacts={contacts} />,
    },
    {
      path: "/global-id",
      component: <GlobalIdMain {...props} contacts={contacts} />,
    },
    {
      path: "/global-id/certificate",
      component: <GlobalIdCertificates {...props} contacts={contacts} />,
    },
    {
      path: "/global-pay/telegram-pay",
      component: <TelegramPay {...props} contacts={contacts} />,
    },
    {
      path: "*",
      component: <NotFound />,
    },
  ];

  return (
    <>
      <Header {...props} contacts={contacts} />
      <Routes>
        {routes.map(({ path, component, children }) =>
          children ? (
            <Route path={path} key={path} element={component}>
              {children.map((d) => (
                <Route
                  key={d.url}
                  path={`/global-pay/docs/${d.url}`}
                  element={<Chunk {...props} contacts={contacts} num={d.id} />}
                />
              ))}
            </Route>
          ) : (
            <Route path={path} key={path} element={component} />
          )
        )}
      </Routes>
      <Footer {...props} contacts={contacts} />
    </>
  );
}
