import { Layout, Menu } from 'antd'
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {getCookie, deleteCookie} from "../../../assets/scripts";

import {
    FormOutlined,
    PieChartOutlined,
    LogoutOutlined,
    TeamOutlined,
    FileDoneOutlined,
    SnippetsOutlined,
    ContactsOutlined,
    MailOutlined,
    UnorderedListOutlined
} from '@ant-design/icons'



const { Content, Sider } = Layout
const { SubMenu } = Menu

export default function NavBar(props){

    const {t} = useTranslation()
    const [collapsed,setCollapsed] = useState(false)
    const [openKeys, setOpenKeys] = useState([''])
    const {children, locale} = props
    const navigate = useNavigate()


    const rootSubmenuKeys = ['sub1']

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    useEffect(()=>{
        let token = getCookie('admin-token')
        if(!token){
            navigate(`/admin/login`)
        }
    }, [])

    const logout = ()=>{
        deleteCookie('admin-token')
        navigate(`/admin/login`)
    }

    function defaultKeyNav (){
        const locations = [
            {"tag": `/admin/references/tags`},
            {"category": `/admin/references/category`},
            {"network": `/admin/network`},
            {"team": `/admin/team`},
            {"employee": `/admin/team`},
            {"letter": `/admin/letters`},
            {"contacts": `/admin/contacts`},
            {"experience":`/admin/experience`},
            {"global-id/certificate": `/admin/global-id/certificate`},
            {"global-pay/certificate": `/admin/global-pay/certificate`},
            {"certificate": `/admin/certificate`},
            {"global-pay/feedback": `/admin/global-pay/feedback`},
            {"global-id/feedback": `/admin/global-id/feedback`},
            {"telegram-pay/feedback": `/admin/telegram-pay/feedback`},
            {"telegram-pay/certificate": `/admin/telegram-pay/certificate`},
            {"feedback": `/admin/feedback`}]


        for(let i=0; i<locations.length; i++){
            let key = Object.keys(locations[i])[0]
            if(window.location.pathname.match(key)){
                return locations[i][key]
            }
        }
        return 'main'
    }




    return(
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)} style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                zIndex: 10
            }}>
                <div style={{padding: '20px', width: '70%'}} ><img style={{width: '100%', height: '100%'}} src="/images/logo-white.svg" alt="Logo"/></div>
                <Menu style={{
                    paddingBottom: '50px'
                }} theme="dark" className="custom-menu" openKeys={openKeys} onOpenChange={onOpenChange} defaultSelectedKeys={[defaultKeyNav()]} mode="inline">
                <SubMenu key="sub0" icon={<FormOutlined />}  title={t('admin.navbar-main')}>
                        <Menu.Item key={`/admin/main/blog`} icon={<PieChartOutlined />}><Link to={`/admin/main/blog`}>{t('admin.navbar-main1')}</Link></Menu.Item>
                        <Menu.Item key={`/admin/main/video`} icon={<PieChartOutlined />}><Link to={`/admin/main/video`}>{t('admin.navbar-main2')}</Link></Menu.Item>
                        <Menu.Item key={`/admin/main/photo`} icon={<PieChartOutlined />}><Link to={`/admin/main/photo`}>{t('admin.navbar-main3')}</Link></Menu.Item>
                        <Menu.Item key={`/admin/main/newsCategories`} icon={<PieChartOutlined />}><Link to={`/admin/main/newsCategories`}>{t('admin.navbar-main4')}</Link></Menu.Item>
                        <Menu.Item kkey={`/admin/main/authors`} icon={<PieChartOutlined />}><Link to={`/admin/main/authors`}>{t('admin.navbar-main5')}</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1" icon={<FormOutlined />} title={t('admin.navbar-link1')}>
                        <Menu.Item key={`/admin/references/category`}><Link to={`/admin/references/category`}>{t('admin.navbar-link1-1')}</Link></Menu.Item>
                        <Menu.Item key={`/admin/references/tags`}><Link to={`/admin/references/tags`}>{t('admin.navbar-link1-2')}</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key={`/admin/network`} icon={<SnippetsOutlined />}><Link to={`/admin/network`}>{t('admin.navbar-link2')}</Link></Menu.Item>
                    <Menu.Item key={`/admin/team`} icon={<TeamOutlined />}><Link to={`/admin/team`}>{t('admin.navbar-link3')}</Link></Menu.Item>
                    <Menu.Item key={`/admin/letters`} icon={<FileDoneOutlined />}><Link to={`/admin/letters`}>{t('admin.navbar-link4')}</Link></Menu.Item>
                    <Menu.Item key={`/admin/experience`} icon={<FileDoneOutlined />}><Link to={`/admin/experience`}>{t('admin.navbar-link5')}</Link></Menu.Item>
                    <Menu.Item key={`/admin/certificate`} icon={<FileDoneOutlined />}><Link to={`/admin/certificate?type=global_site`}>{t('admin.navbar-link6')}</Link></Menu.Item>
                    <Menu.Item key={`/admin/contacts`} icon={<ContactsOutlined />}><Link to={`/admin/contacts`}>{t('admin.navbar-link7')}</Link></Menu.Item>
                    <Menu.Item key={`/admin/feedback`} icon={<MailOutlined />}><Link to={`/admin/feedback?type=global_site`}>{t('admin.navbar-link8')}</Link></Menu.Item>

                    <SubMenu key="sub2" icon={<PieChartOutlined />} title='Global Id'>
                        <Menu.Item key={`/admin/global-id/feedback`}><Link to={`/admin/global-id/feedback?type=global_id`}>{t('admin.navbar-link8')}</Link></Menu.Item>
                        <Menu.Item key={`/admin/global-id/certificate`}><Link to={`/admin/global-id/certificate?type=global_id`}>{t('admin.navbar-link6')}</Link></Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" icon={<PieChartOutlined />} title='Global Pay'>
                        <Menu.Item key={`/admin/global-pay/feedback`}><Link to={`/admin/global-pay/feedback?type=global_pay`}>{t('admin.navbar-link8')}</Link></Menu.Item>
                        <Menu.Item key={`/admin/global-pay/certificate`}><Link to={`/admin/global-pay/certificate?type=global_pay`}>{t('admin.navbar-link6')}</Link></Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub4" icon={<PieChartOutlined />} title='Telegram Pay'>
                        <Menu.Item key={`/admin/telegram-pay/feedback`}><Link to={`/admin/global-pay/feedback?type=global_tg`}>{t('admin.navbar-link8')}</Link></Menu.Item>
                        <Menu.Item key={`/admin/telegram-pay/certificate`}><Link to={`/admin/global-pay/certificate?type=global_tg`}>{t('admin.navbar-link6')}</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item icon={<UnorderedListOutlined />} key={'/admin/seo-panel'}>
                        <Link to={'/admin/seo-panel'}>
                            SEO панель
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={()=>logout()}>Выйти</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={collapsed ? {maxWidth: 'calc(100% - 80px)'} : {maxWidth: 'calc(100% - 200px)', background: '#fff', marginLeft: 'auto'}}>
                <Content style={{ marginTop: 64 }}>
                    <div>
                        {children}
                    </div>
                </Content>
            </Layout>

        </Layout>
    )
}
