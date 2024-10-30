import React from 'react'
import {TableWrapper} from "./styles";
import {Button, Col, Row, Table, message, Popconfirm} from "antd";
import {EditOutlined, EyeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {UseSeoAll} from "../../../../../hooks/useSeo";
import SeoRemove from "./components/seo-remove/seo-remove";
import moment from "moment";


const SeoTable = () => {


    const {data, isLoading, refetch, isRefetching} = UseSeoAll()

    const columns = [
        {
            key: 'id',
            dataIndex: "id",
            title: 'ID'
        },
        {
            key: 'header',
            dataIndex: "header",
            title: 'Заголовок'
        },
        {
            key: 'createdAt',
            dataIndex: "createdAt",
            title: 'Дата публикации'
        },
        {
            key: 'actions',
            dataIndex: "actions",
            title: 'Действия',
            render: (text, record) => (
                <Row>
                    <Col>

                        <Link to={`/admin/seo-panel/edit/${record.id}?readOnly=true`}>
                            <Button style={{
                                marginRight: '15px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}><EyeOutlined/></Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={`/admin/seo-panel/edit/${record.id}`}>
                            <Button style={{
                                marginRight: '15px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}><EditOutlined/></Button>
                        </Link>
                    </Col>
                    <Col>
                        <SeoRemove refetch={refetch} id={record.id}/>
                    </Col>
                </Row>
            )
        }
    ]

    const actualData = data ? data.map((item) => {
        return {
            ...item,
            header: item.header.ru,
            key: item.id,
            createdAt: item.createdAt ? moment(item.createdAt).format('YYYY-MM-DD') : ''
        }
    }) : undefined


    return (
        <TableWrapper>
            <Table
                columns={columns}
                scroll={{x: true}}
                pagination={false}
                loading={isLoading || isRefetching}
                dataSource={actualData}
            />
        </TableWrapper>
    )
}

export default SeoTable
