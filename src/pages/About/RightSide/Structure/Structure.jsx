import { useTranslation } from "react-i18next";
import { SCStructure } from "./Structure.style";

export const Structure = () => {
  const { t } = useTranslation();

  return (
    <SCStructure>
      <h1>{t("about.structure")}</h1>
      <img
        src="/images/about/company-structure.png"
        alt={t("about.structure")}
      />
    </SCStructure>
  );
};
