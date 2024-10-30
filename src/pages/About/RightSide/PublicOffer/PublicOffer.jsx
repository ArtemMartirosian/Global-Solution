import { useTranslation } from "react-i18next";

export const PublicOffer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("about.public_offer.title")}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: t("global_pay.agreement.intro"),
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: t("global_pay.agreement.termins"),
        }}
      />
      {Array.from({ length: 15 }).map((_, index) => {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: t(`global_pay.agreement.${index + 2}`),
            }}
          />
        );
      })}
    </div>
  );
};
