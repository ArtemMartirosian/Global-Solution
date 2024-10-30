import {useTranslation} from "react-i18next";

/*---Components---*/
import HeaderPages from "../../components/Header-Pages/HeaderPages";

/*---Styles---*/
import {SectionContent} from "./style";

export default function Agreement(){
    const {t} = useTranslation()

    return(
        <>
            <HeaderPages {...{title: t('agreement.title')}}/>
            <SectionContent className='container'>
                <h3>{t('agreement.title1')}</h3>
                <p className='font-weight'>{t('agreement.title2')}</p>
                <p>{t('agreement.text1')}</p>
                <p>{t('agreement.text2')}</p>
                <p>{t('agreement.text3')}</p>
                <p>{t('agreement.text4')}</p>
                <p className='font-weight'>{t('agreement.title3')}</p>
                <p>{t('agreement.text5')}</p>
                <p>{t('agreement.text6')}</p>
                <p className='font-weight'>{t('agreement.title4')}</p>
                {
                    Array.from(Array(20).keys()).map(item=>{
                        return(<p key={item}>{t(`agreement.text${item+7}`)}</p>)
                    })
                }
                <p className='font-weight'>{t('agreement.title5')}</p>
                {
                    Array.from(Array(7).keys()).map(item=>{
                        return(<p key={item}>{t(`agreement.text${item+27}`)}</p>)
                    })
                }
                <p className='font-weight'>{t('agreement.title6')}</p>
                {
                    Array.from(Array(12).keys()).map(item=>{
                        return(<p key={item}>{t(`agreement.text${item+34}`)}</p>)
                    })
                }
                <p className='font-weight'>{t('agreement.title7')}</p>
                {
                    Array.from(Array(2).keys()).map(item=>{
                        return(<p key={item}>{t(`agreement.text${item+46}`)}</p>)
                    })
                }
                <p className='font-weight'>{t('agreement.title8')}</p>
                {
                    Array.from(Array(2).keys()).map(item=>{
                        return(<p key={item}>{t(`agreement.text${item+48}`)}</p>)
                    })
                }
                <p className='font-weight'>{t('agreement.title9')}</p>
                <p>{t(`agreement.text50`)}</p>
                <p className='font-weight'>{t('agreement.title10')}</p>
                {
                    Array.from(Array(5).keys()).map(item=>{
                        return(<p key={item}>{t(`agreement.text${item+51}`)}</p>)
                    })
                }
                <p className='font-weight'>{t('agreement.title11')}</p>
                {
                    Array.from(Array(8).keys()).map(item=>{
                        return(<p key={item}>{t(`agreement.text${item+56}`)}</p>)
                    })
                }
            </SectionContent>
        </>
    )
}
