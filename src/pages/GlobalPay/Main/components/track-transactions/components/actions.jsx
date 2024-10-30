import {Action, ActionsWrapper} from "../styles";
import {useTranslation} from "react-i18next";

export default function Actions({isWeb, isMobile}) {
    const {t} = useTranslation()
    const actions =
        [
            {
                id: 1,
                title: isWeb ? 'admin.login-button' : 'iosDownload',
                isBlack: true,
                path: isWeb ? 'https://merchant.globalpay.uz/' : ''
            },
            {
                id: 2,
                title: isWeb ? 'pay_demo.text1' : 'androidDownload',
                isBlack: !isWeb,
                path: isWeb ? 'http://demo.globalpay.uz' : ''
            }
        ]

    return (
        <ActionsWrapper isMobile={isMobile}>
            {actions.map(({
                              id,
                              title,
                              isBlack,
                              path
                          }) => (
                <Action href={path} isBlack={isBlack} key={id}>
                    {t(title)}
                </Action>
            ))}
        </ActionsWrapper>
    )
}