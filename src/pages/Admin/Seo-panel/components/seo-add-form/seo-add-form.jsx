import {useTranslation} from "react-i18next";
import NavBar from "../../../../../components/Admin/NavBar/NavBar";
import AdminHeader from "../../../../../components/Admin/Header/AdminHeader";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {Button, Card, Col, Form, message, Tabs} from "antd";
import SeoAddFormContent from "./components/seo-add-form-content/seo-add-form-content";
import {Seo} from "../../../../../api";
import {useState} from "react";
import {openNotificationWithIcon} from "../../../../../shared/notification";


const SeoAddForm = (props) => {
    const {t} = useTranslation()
    const {locale, edit, data, id, isLoading, refetch} = props
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false)
    const navigate = useNavigate()
    const tabs =
        [
            {
                id: 1,
                title: "Русский",
                key: "ru"
            },
            {
                id: 2,
                title: "Узбекский",
                key: "uz"
            },
            {
                id: 3,
                title: "Английский",
                key: "en"
            },
        ]

    const onFinish = (values) => {

        const dataFinal = {
            url: values.url,
            header: {
                en: values.header['en'],
                ru: values.header['ru'],
                uz: values.header['uz']
            },
            description: {
                en: values.description['en'],
                ru: values.description['ru'],
                uz: values.description['uz']
            },
            keyWords: {
                en: Array.isArray(values.keyWords['en']) ? values.keyWords['en'].join(',') : values.keyWords['en'],
                ru: Array.isArray(values.keyWords['ru']) ? values.keyWords['ru'].join(',') : values.keyWords['ru'],
                uz: Array.isArray(values.keyWords['uz']) ? values.keyWords['uz'].join(',') : values.keyWords['uz'],
            },
        }



        setConfirmLoading(true)
        if (edit) {
            Seo.update(dataFinal, id)
                .then((response) => {
                    message.success('SEO успешно изменён')
                    refetch()
                    navigate('/admin/seo-panel')
                }).catch((e) => {

            }).finally(() => setConfirmLoading(false))
        } else {
            Seo.create(dataFinal)
                .then((response) => {
                    message.success('SEO успешно добавлен')
                    form.resetFields()
                    navigate('/admin/seo-panel')
                }).catch((e) => {

            }).finally(() => setConfirmLoading(false))
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Пожалуйста, заполните поля на всех языках')
    };

    const initialValues = data ? {
        ...data,
        keyWords: {
            en: data.keyWords.en.split(','),
            ru: data.keyWords.ru.split(','),
            uz: data.keyWords.uz.split(',')
        }
    } : undefined

    return (
        <NavBar {...{locale}}>
            <AdminHeader>
                <Link to={'/admin/seo-panel'}>
                    {t('admin.logo-button2')}
                </Link>
            </AdminHeader>
            <Card title={'Meta данные'}>
                {!isLoading && <Form
                    name="basic"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 12}}
                    form={form}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Tabs>
                        {tabs.map(({
                                       key,
                                       title,
                                       id
                                   }) => (
                            <Tabs.TabPane forceRender={true} key={id} tab={title}>
                                <SeoAddFormContent data={data} language={key}/>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                    <Col span={24} style={{marginTop: '15px'}}>
                        <Button loading={confirmLoading} disabled={searchParams.get('readOnly') || confirmLoading}
                                onClick={form.submit}
                                type={'primary'}>
                            {t(edit ? 'save' : 'send')}
                        </Button>
                    </Col>
                </Form>}

            </Card>
        </NavBar>
    )
}


export default SeoAddForm

