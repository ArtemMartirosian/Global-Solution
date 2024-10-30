import React from "react";
import NavBar from "../../../components/Admin/NavBar/NavBar";

export default function AdminMain(props){
    const {locale} = props

    return(
           <NavBar {...{locale}}/>
    )
}
