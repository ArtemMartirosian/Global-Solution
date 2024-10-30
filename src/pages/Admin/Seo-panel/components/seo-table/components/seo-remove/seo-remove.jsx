import React from 'react'
import {Button, message, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Seo} from "../../../../../../../api";


const SeoRemove = ({refetch, id}) => {


    const confirm = (e) => {
        Seo.delete(id)
            .then((response) => {
                message.success('Успешно удалён');
                refetch()
            })

    };

    const cancel = (e) => {
        message.error('Отмена');
    };
    return (
        <Popconfirm
            title="Удалить SEO"
            description="Вы уверены, что хотите удалить SEO?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Да"
            cancelText="Нет"
        >
            <Button
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            ><DeleteOutlined/></Button>
        </Popconfirm>
    )
}

export default SeoRemove
