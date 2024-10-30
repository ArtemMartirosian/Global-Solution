import React, {useEffect, useState} from "react";
import moment from 'moment'

import {findGetParameter} from "../../../assets/scripts";
import {Section} from "./style";

export const url = process.env.REACT_APP_MAIN_URL

export default function View(props){
    const {locale, apiGet} = props
    const [data, setData] = useState(null)

    useEffect(()=>{
        apiGet(id).then(result=>{
            if(result.data){
                setData(result.data[locale])

            }
        })
    }, [])

    const id = findGetParameter('id')
    const type = findGetParameter('type')
    return(
        <Section>
            {
                data?(
                    <>
                        <div>
                            <p><b>Дата Создания</b>: {data?.createdAt?moment(data?.createdAt).format('YYYY-MM-DD'):''}</p>
                            <p><b>Телефон</b>: {data?.cellphone}</p>
                            <p><b>Email</b>: {data?.email}</p>
                        </div>

                        <div style={{marginTop:'60px'}}>
                            <p><b>Компания</b>: {data?.companyName??''}</p>
                            <p><b>Имя клиента</b>: {data?.name??''}</p>
                            <p><b>Сообщение</b>: {data?.description??''}</p>
                            <p><b>Тема сообщения</b>: {data?.theme??''}</p>
                            {type!=="global_tg"?(<>
                                <p><b>Платформы</b>: {(data?.platforms??[]).join(', ')}</p>
                                <p><b>Платежгые системы</b>: {(data?.paymentSystems??[]).join(', ')}</p>
                            </>):''}
                        </div>
                    </>
                ):''
            }
        </Section>
    )
}
