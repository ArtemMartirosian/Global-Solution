
import {useTranslation} from "react-i18next";
import {Data} from "./data"
import {getTitle} from "./Docs"

export default function GetCardInfo(props){
    const {t} = useTranslation()
    getTitle(Data()[props.num].title)

    //====== This func helps to render tables ======//
    const tableRender = (tableNum) => {
        return(
            <table className={"table table-bordered table-mobile"}>
                <thead>
                    <tr>
                        <th>
                            {tableNum ? t('docs.code') : t('docs.name')}
                        </th>
                        <th>
                           {t('docs.description')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Data()[props.num].tables[tableNum].map(table =>
                        <tr>
                                <td>{table[0].errorCode}
                                    <div className="word-break">{table[0].functionName}</div><br/>
                                    <i className="text-secondary">
                                        {table[0].type}
                                    </i>
                                </td>

                            {typeof(table[1]) !== "string"
                            ?<td>

                                <div className="table-mobile">
                                    <p>{table[1].desc1}</p>
                                </div>
                                <p>
                                    <code>
                                        <pre>
                                            {table[1].code1}
                                        </pre>
                                    </code>
                                </p>
                                <i>
                                    {tableNum ? t('docs.exampleVal'):""}
                                </i>
                                    {
                                        table[1].desc2||table[1].code2?(<><div>
                                            <p>{table[1].desc2}</p>
                                        </div>
                                            <code>
                                    <pre>
                                        {table[1].code2}
                                    </pre>
                                            </code></>):''
                                    }
                             </td>
                            :<td>
                                {table[1]}
                            </td>}
                        </tr>)
                    }
                </tbody>
            </table>
        )
    }

    return(
        <main className={"content-main py-5 px-3"}>
            <h3>
                <b>{Data()[props.num].title}</b>
            </h3>
            <hr/>
            <p className={"alert alert-danger d-flex"}> 
                <div className={"px-2 mx-3"}>
                    <i>{Data()[props.num].requestType}</i>
                </div>
                <div className={"word-break"}>
                    <b>{Data()[props.num].requestUrl}</b>
                </div>
            </p>
            <p>{t('docs.parameters')}</p>
            {tableRender(0)}
            <p>{t('docs.responce')}</p>
            {tableRender(1)}         
        </main>   
    )
}







