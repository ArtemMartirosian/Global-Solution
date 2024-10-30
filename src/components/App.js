import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import AdminLayout from "../pages/Admin/Layout/Layout";
import i18n from "../translations/i18n";
import Layout from "./Layout/Layout";

function App(props) {
  const { locale } = props;

  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <Helmet
          htmlAttributes={{
            lang:
              locale === "ru"
                ? "ru-UZ"
                : locale === "uz"
                ? "uz-UZ"
                : locale === "en"
                ? "en-UZ"
                : "",
          }}
        />
        {props.pathname.match("admin") ? (
          <AdminLayout {...props} />
        ) : (
          <Layout {...props} />
        )}
      </I18nextProvider>
    </HelmetProvider>
  );
}

export default App;
