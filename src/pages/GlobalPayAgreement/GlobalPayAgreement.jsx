import { useTranslation } from "react-i18next";

/*---Components---*/
import HeaderPages from "../../components/Header-Pages/HeaderPages";

/*---Styles---*/
import { SectionContent } from "./style";

export default function GlobalPayAgreement() {
    const { t } = useTranslation()

    return (
        <>
            <HeaderPages {...{ title: t('global_pay.agreement.title') }} />
            <SectionContent className='container'>
                <div
                    dangerouslySetInnerHTML={{
                        __html: t('global_pay.agreement.intro'),
                    }}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: t('global_pay.agreement.termins'),
                    }}
                />
                {Array.from(Array(15).keys()).map(item => {
                    return <div
                        dangerouslySetInnerHTML={{
                            __html: t(`global_pay.agreement.${item + 1}`),
                        }}
                    />
                })}
            </SectionContent>
        </>
    )
}
