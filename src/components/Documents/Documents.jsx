import {Row, Col, Image} from 'antd';
import {SectionCertificates} from "./style/index";
import React from "react";
import {image_download} from "../../api";

export default function Documents({documents, locale, type}){
    return(
        <SectionCertificates className='container font-segoe'>
            <Row gutter={24}>
                {
                    documents.map((item,index)=>{
                        return(
                            <Col lg={6} md={12} span={24} key={index}>
                                {
                                    type==='letters'?(<figure className="item-doc">
                                        <Image src={item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''}/>

                                        <figcaption className="info-wrap">
                                            <h6 className="title">{item.name[locale]?item.name[locale]:''} </h6>
                                            <p>{item.type[locale]?item.type[locale]:''}</p>
                                        </figcaption>
                                    </figure>):(<figure className="item-doc">
                                        <Image src={item.fileId?`${image_download}?fileKey=${item.fileId.url}`:''}/>

                                        <figcaption className="info-wrap">
                                            <h6 className="title">{item.name[locale]?item.name[locale]:''} </h6>
                                            <p>{item.org[locale]?item.org[locale]:''}</p>
                                        </figcaption>
                                    </figure>)
                                }
                            </Col>
                        )
                    })
                }
            </Row>
        </SectionCertificates>
    )
}
