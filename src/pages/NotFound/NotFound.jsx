import {NotContentSection} from "../../components/NotContent/style/style";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function NotFound(){

    let navigate = useNavigate()
    const {t} = useTranslation()
    return(
        <NotContentSection>
            <div className="container not-found">
                <div className="not-found__block">
                    <div className="not-found__block_info">
                        <p>{t("error404")}</p>
                        <h1>{t("pust")} :(</h1>
                        <span className="frs-chld">{t("main-go1")}</span>
                        <span>{t("main-go2")}</span>
                        <a href="#" onClick={(e)=>{
                            e.preventDefault()
                            navigate("/")
                        }}>{t("bnt_main")}</a>
                    </div>
                    <div className="not-found__block_img">
                        <div className="img-404"><img src="/images/icons/404.svg" alt=""/></div>
                        <div className="bg-404"><img src="/images/icons/404-bg.svg" alt=""/></div>
                    </div>
                </div>
            </div>
        </NotContentSection>
    )
}
