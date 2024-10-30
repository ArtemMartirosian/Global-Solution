
/*----Styles---*/
import {SectionTop} from "./style";
import React from "react";

export default function HeaderPages(props){
    const {title} = props
    return(
        <SectionTop className="section-pagetop font-segoe">
            <video className="bg-video" autoPlay={true} loop={true} muted={true} playsInline={true}>
                <source src="/images/videobg.mp4" type="video/mp4"/>
            </video>
            <div className="container">
                <h1 className="title-page text-white">{title}</h1>
            </div>
        </SectionTop>
    )
}
