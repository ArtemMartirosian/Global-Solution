import { useTranslation } from "react-i18next";
import { SCCommonInfo } from "./CommonInfo.style";
import { LovelyHeart } from "../../../../assets/icons";

export const CommonInfo = () => {
  const { t } = useTranslation();

  return (
    <SCCommonInfo>
      <h1>{t("about.info")}</h1>
      <p>{t("about.common_info.desc")}</p>

      <div className="common-info__wrapper">
        {/* <img
          src="/images/about/about-common_info-1.png"
          alt={t("about.history")}
        /> */}
        <div className="wrapper__info">
          <h2>{t("about.history")}</h2>
          <p>{t("about.history_desc")}</p>
        </div>
      </div>
      <div className="common-info__wrapper">
        {/* <img
          src="/images/about/about-common_info-2.png"
          alt={t("about.mission")}
        /> */}
        <div className="wrapper__info">
          <h2>{t("about.mission")}</h2>
          <p>{t("about.mission_desc")}</p>
        </div>
      </div>

      <h2>{t("about.company_values")}</h2>
      <div className="common-info__values">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="values__wrapper">
            <LovelyHeart />
            <h3>{t(`about.company_value.${index + 1}`)}</h3>
            <p>{t(`about.company_value.${index + 1}_desc`)}</p>
          </div>
        ))}
      </div>
    </SCCommonInfo>
  );
};
