import { useTranslation } from "react-i18next";
import { SCManagement } from "./Management.style";

export const Management = () => {
  const { t } = useTranslation();

  return (
    <SCManagement>
      <h1>{t("about.management")}</h1>
      <div className="management__wrapper">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="manager">
            <div className="manager__img">
              <img
                src={`/images/about/manager-${index + 1}.png`}
                alt={`about.management.${index + 1}`}
              />
            </div>
            <div className="manager__desc">
              <h3>{t(`about.management.${index + 1}`)}</h3>
              <p>{t(`about.management.${index + 1}_role`)}</p>
            </div>
          </div>
        ))}
      </div>
      <p>{t("about.management_desc")}</p>
    </SCManagement>
  );
};
