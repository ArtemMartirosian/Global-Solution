import { useTranslation } from "react-i18next";
import { Content } from "../../style/content.style";
import Banner from "../../images/Banner.png"


export const Vacancy = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <h1>{t("vacancies")}</h1>
      <img width={"100%"} src={Banner} alt="Banner" />
    </Content>
  );
};
