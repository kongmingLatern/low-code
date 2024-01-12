import BaseContentLayout, { CfgProps } from "@/layout/BaseContentLayout"
import { formatYMDHHmmss, handlers } from "@/shared"
import { sendAgree, sendReuse } from "@packages/server"

import DeleteButton from "@/components/common/DeleteButton"
import { Space } from "antd"
import StatusTag from "@/components/common/StatusTag"
import { useState } from "react"

export function Notice() {

  const [list, setList] = useState(JSON.parse(localStorage.getItem('invite_list') as any))

  function getData() {
    return {
      data: list || []
    }
  }

  const config: CfgProps = {
    searchCfg: {
      placeholder: '请输入要查询的项目名',
      primaryKey: 'project_name',
    },
    dataCfg: {
      primaryKey: 'project_id',
      columns: [
        {
          title: '项目ID',
          dataIndex: 'project_id',
          key: 'project_id',
          align: 'center',
        },
        {
          title: '项目名称',
          dataIndex: 'project_name',
          key: 'project_name',
          align: 'center',
        },
        {
          title: '项目描述',
          dataIndex: 'project_description',
          key: 'project_description',
          align: 'center',
        },
        {
          title: '项目创建者id',
          dataIndex: 'createBy',
          key: 'createBy',
          align: 'center',
        },
        {
          title: '项目邀请码',
          dataIndex: 'project_code',
          key: 'project_code',
          align: 'center',
        },
        {
          title: '项目状态',
          dataIndex: 'project_status',
          key: 'project_status',
          align: 'center',
          render: (_, { project_status }) => (
            <StatusTag status={project_status}>
              {project_status}
            </StatusTag>
          ),
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align: 'center',
          render: (_, { create_time }) =>
            formatYMDHHmmss(new Date(create_time)),
        },
        {
          title: '更新时间',
          dataIndex: 'update_time',
          key: 'update_time',
          align: 'center',
          render: (_, { update_time }) =>
            formatYMDHHmmss(new Date(update_time)),
        },
      ],
      operationColumns: [
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 200,
          render: (_, record) => (
            <Space>
              <DeleteButton description={'你确定要同意参加该项目吗?'} buttonProps={{ type: 'primary', danger: false }}
                onConfirm={async () => {
                  // TODO: 同意
                  sendAgree({
                    createBy: record.createBy,
                    uid: localStorage.getItem('uid'),
                    project_id: record.project_id
                  })
                  await handlers.joinProject({
                    uid: localStorage.getItem('uid'),
                    project_id: record.project_id
                  })
                  let res = [...list]
                  res = res.filter(i => i.project_id !== record.project_id)
                  setList(res)
                }}
              >
                同意
              </DeleteButton>
              <DeleteButton description={'你确定要拒绝参加该项目吗?'} onConfirm={() => {
                // TODO: 拒绝
                // 1. 通知服务端
                sendReuse({
                  createBy: record.createBy,
                  uid: localStorage.getItem('uid'),
                  project_id: record.project_id
                })
                // 2. 更新缓存
                // console.log(record);
                let res = [...list]
                res = res.filter(i => i.project_id !== record.project_id)
                localStorage.setItem('invite_list', JSON.stringify(res))
                setList(res)
              }}>
                拒绝
              </DeleteButton>
            </Space >
          ),
        }
      ]
    },
  }

  return (
    <BaseContentLayout
      config={config}
      getData={getData}
    ></BaseContentLayout>
  )
}