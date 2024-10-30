import {Button, Col, Form, Input, Row, Select} from "antd";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";

const SeoAddFormContent = ({language, data}) => {
    const [searchParams] = useSearchParams()
    const readOnly = searchParams.get('readOnly')
    const {t} = useTranslation()
    return (
        <Row align={'center'} justify={'start'} style={{marginTop: '15px', width: '100%'}}>
            <Col span={24}>
                <Form.Item
                    rules={[{
                    required: true,
                    message: 'Заполните это поле',
                    transform: (value) => typeof value === 'string' ? value.trim() : undefined,
                }]} name={`url`} label={'URL страницы'}>
                    <Input  disabled={readOnly} allowClear addonBefore={'/'} type={'text'} style={{width: '100%'}}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    rules={[{
                    required: true,
                    message: 'Заполните это поле',
                    transform: (value) => typeof value === 'string' ? value.trim() : undefined,
                }]} name={['header', language]} label={t('admin.main.table5')}>
                    <Input disabled={readOnly} allowClear type={'text'} style={{width: '100%'}}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    rules={[{
                    required: true,
                    message: 'Заполните это поле',
                    transform: (value) => typeof value === 'string' ? value.trim() : undefined,
                }]} name={['description',language ]} label={t('admin.experience-1')}>
                    <Input disabled={readOnly} allowClear type={'text'} style={{width: '100%'}}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    wrapperCol={{span: 20}} rules={[{
                    required: true,
                    message: 'Заполните это поле'
                }]} name={['keyWords', language ]} label={'Ключевые слова'}>
                    <Select disabled={readOnly}
                            mode="tags"
                            multiple
                            style={{width: '100%'}}/>
                </Form.Item>
            </Col>
        </Row>
    )
}

export default SeoAddFormContent