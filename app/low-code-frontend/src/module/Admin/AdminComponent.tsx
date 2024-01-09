import BaseContentLayout, {
  CfgProps,
} from '@/layout/BaseContentLayout'

import { Tag } from 'antd'
import { handlers } from '@/shared'

export default function AdminComponent() {
  async function getData() {
    return await handlers.getAllComponent()
  }

  const config: CfgProps = {
    toolCfg: {
      button: [
        {
          type: 'modalButton',
          formItem: [
            {
              type: 'input',
              props: {
                label: '组件名称',
                name: 'component_name',
                rules: [
                  {
                    required: true,
                    message: '请输入组件名称',
                  },
                ],
              },
            },
            {
              type: 'select',
              props: {
                label: '组件类别',
                name: 'component_type',
                rules: [
                  {
                    required: true,
                    message: '请输入组件类别',
                  },
                ],
              },
              inject: {
                options: [
                  {
                    label: "文本",
                    value: 'text'
                  },
                  {
                    label: "图片",
                    value: 'img'
                  },
                  {
                    label: "卡片",
                    value: 'card'
                  }
                ]
              }
            },
            {
              type: 'input',
              props: {
                label: '组件标签',
                name: 'component_tag',
                rules: [
                  {
                    required: true,
                    message: '请输入组件标签',
                  },
                ],
              },
            },
            {
              type: 'input',
              props: {
                label: '工具栏展示文本',
                name: 'value',
                rules: [
                  {
                    required: true,
                    message: '请输入文本信息',
                  },
                ],
              },
            },
            {
              type: 'dynamic',
              props: {
                label: '组件属性',
                name: 'props',
                rules: [
                  {
                    required: true,
                    message: '请输入组件属性',
                  },
                ],
              },
            },
            {
              type: 'dynamic',
              props: {
                label: '组件样式',
                name: 'style',
                rules: [
                  {
                    required: true,
                    message: '请输入组件样式',
                  },
                ],
              },
            },
          ],
          initialValues: {
            style: [
              {
                key: 'top',
                value: 0
              },
              {
                key: 'left',
                value: 0,
              },
              {
                key: 'width',
                value: 'auto'
              },
              {
                key: 'fontWeight',
                value: 400
              },
              {
                key: 'fontSize',
                value: 20
              }
            ]
          },
          children: '添加组件',
          restProps: {
            title: '添加组件',
            footer: null,
            onOk: async (value: any) => {
              const result: Record<string, any> = {
                props: {},
                style: {}
              }
              value?.props?.forEach(i => {
                result['props'][i.key] = i.value
              })
              value?.style?.forEach(i => {
                result['style'][i.key] = i.value
              })
              result['value'] = value.value
              Object.assign(value, {
                component_props: JSON.stringify(result)
              })

              await handlers.createComponent(value as any)
            },
          },
        },
      ],
    },
    searchCfg: {
      placeholder: '请输入要查询的组件名',
      primaryKey: 'component_name',
    },
    dataCfg: {
      primaryKey: 'component_id',
      columns: [
        {
          title: '组件ID',
          dataIndex: 'component_id',
          key: 'component_id',
          align: 'center',
        },
        {
          title: '组件名称',
          dataIndex: 'component_name',
          key: 'component_name',
          align: 'center',
        },
        {
          title: '组件标签',
          dataIndex: 'component_tag',
          key: 'component_tag',
          align: 'center',
        },
        {
          title: '组件类别',
          dataIndex: 'component_type',
          key: 'component_type',
          align: 'center',
          render: (value) => {
            switch (value) {
              case 'img':
                return <Tag color='blue-inverse'>图片</Tag>
              case 'text':
                return <Tag color='geekblue'>文本</Tag>
              case 'card':
                return <Tag color='cyan-inverse'>卡片</Tag>
            }
          }
        },
        {
          title: '组件属性',
          dataIndex: 'component_props',
          key: 'component_props',
          align: 'center',
        },
      ],
    },
    actionCfg: {
      formCfg: {
        title: '修改组件信息',
        form: true,
        formItem: [
          {
            type: 'input',
            props: {
              label: '组件名称',
              name: 'component_name',
              rules: [
                {
                  required: true,
                  message: '请输入组件名称',
                },
              ],
            },
          },
          {
            type: 'select',
            props: {
              label: '组件类别',
              name: 'component_type',
              rules: [
                {
                  required: true,
                  message: '请输入组件类别',
                },
              ],
            },
            inject: {
              options: [
                {
                  label: "文本",
                  value: 'text'
                },
                {
                  label: "图片",
                  value: 'img'
                },
                {
                  label: "卡片",
                  value: 'card'
                }
              ]
            }
          },
          {
            type: 'input',
            props: {
              label: '组件标签',
              name: 'component_tag',
              rules: [
                {
                  required: true,
                  message: '请输入组件标签',
                },
              ],
            },
          },
          {
            type: 'input',
            props: {
              label: '组件属性',
              name: 'component_props',
              rules: [
                {
                  required: true,
                  message: '请输入组件属性',
                },
              ],
            },
          },
        ],
        footer: null,
        onOk: async value => {
          await handlers.updateComponent(value)
        },
      },
      deleteButtonCfg: {
        onConfirm: async primaryKey => {
          await handlers.deleteComponent(primaryKey)
        },
      },
    },
  }

  return (
    <BaseContentLayout
      config={config}
      getData={getData}
    ></BaseContentLayout>
  )
}
