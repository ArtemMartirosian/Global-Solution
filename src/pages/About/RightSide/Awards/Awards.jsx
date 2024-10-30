import { Image } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { awardsDocuments } from "./Awards.data";
import { SCAwards } from "./Awards.style";

export const Awards = () => {
  const { t } = useTranslation();

  return (
    <SCAwards>
      <h1>{t("about.awards")}</h1>
      <div className="awards__wrapper">
        {awardsDocuments.map((doc) => (
          <div key={doc.id} className="award">
            <Image src={doc.img} alt="" />

            <div className="award__desc">
              <h6>{doc.title}</h6>
              <p>{doc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SCAwards>
  );
};
