import React from 'react'
import NavBar from "../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import {useTranslation} from "react-i18next";
import {Button} from "antd";
import SeoTable from "./components/seo-table/seo-table";
import {Link} from "react-router-dom";


const SeoPanel = (props) => {
    const {t} = useTranslation()
    const {locale} = props
    return (
        <NavBar {...{locale}}>
            <AdminHeader>
                <Link to={'/admin/seo-panel/add'}>
                    <Button type='primary'>Добавить SEO</Button>
                </Link>
            </AdminHeader>
            <SeoTable/>
        </NavBar>
    )
}

export default SeoPanel