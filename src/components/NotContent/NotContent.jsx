import {NotContentSection} from "./style/style";
import {useTranslation} from "react-i18next";
import {NotContentIcon} from "../../assets/icons";


export default function NotContent(){
    const {t} = useTranslation()

    return(<NotContentSection>
        <div className="notContent-icon text-center">{NotContentIcon()}</div>
        <div className="notContent-text text-center">
            <p>{t("not data")}</p>
            <span>{t("not data desc")}</span>
        </div>
    </NotContentSection>)
}