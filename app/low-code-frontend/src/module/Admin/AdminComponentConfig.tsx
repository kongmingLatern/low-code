import BaseContentLayout, {
  CfgProps,
} from '@/layout/BaseContentLayout'

import { Tag } from 'antd';
import { handlers } from '@/shared'

export default function AdminComponentConfig() {
  async function getData() {
    return await handlers.getAllComponentConfig()
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
                label: '组件类型',
                name: 'component_tag',
                rules: [
                  {
                    required: true,
                    message: '请输入组件类型',
                  },
                ],
              },
            },
            {
              type: 'input',
              props: {
                label: '配置项名称',
                name: 'component_name',
                rules: [
                  {
                    required: true,
                    message: '请输入配置项名称',
                  },
                ],
              },
            },
            {
              type: 'select',
              props: {
                label: '配置项文本框类型',
                name: 'component_type',
                rules: [
                  {
                    required: true,
                    message: '请输入配置项文本框类型',
                  },
                ],
              },
              inject: {
                options: [
                  {
                    value: 'text',
                    label: '普通文本'
                  },
                  {
                    value: 'number',
                    label: '数字'
                  },
                  {
                    value: 'value',
                    label: '盒子文本'
                  },
                  {
                    value: 'select',
                    label: '下拉列表'
                  },
                  {
                    value: 'color',
                    label: '着色器'
                  }
                ]
              }
            },

            {
              type: 'input',
              props: {
                label: '组件占位符',
                name: 'placeholder',
                rules: [
                  {
                    required: true,
                    message: '请输入组件标签',
                  },
                ],
              },
            },
            {
              type: 'dynamic',
              props: {
                label: '下拉选项',
                name: 'options',
                rules: [
                  {
                    required: true,
                    message: '请输入组件属性',
                  },
                ],
              },
              inject: {
                targetKey: ['label', 'value']
              }
            },
          ],
          children: '添加组件配置项',
          restProps: {
            title: '添加组件配置项',
            footer: null,
            onOk: async (value: any) => {
              // console.log(value);

              Object.assign(value, {
                options: JSON.stringify(value.options, null, 2)
              })

              await handlers.createComponentConfig(value as any)
            },
          },
        },
      ],
    },
    searchCfg: {
      placeholder: '请输入要查询的组件类型',
      primaryKey: 'component_type',
    },
    dataCfg: {
      primaryKey: 'id',
      columns: [
        {
          title: '组件类型',
          dataIndex: 'component_tag',
          key: 'component_tag',
          align: 'center',
          render: (value) => <Tag color='geekblue-inverse'>{value}</Tag>
        },
        {
          title: '配置项名称',
          dataIndex: 'component_name',
          key: 'component_name',
          align: 'center',
        },
        {
          title: '配置类型',
          dataIndex: 'component_type',
          key: 'component_type',
          align: 'center',
        },

        {
          title: '组件占位符',
          dataIndex: 'placeholder',
          key: 'placeholder',
          align: 'center',
        },
        {
          title: '组件属性',
          dataIndex: 'options',
          key: 'options',
          align: 'center',
        },
      ],
    },
    actionCfg: {
      formCfg: {
        title: '修改组件配置信息',
        form: true,
        formItem: [
          {
            type: 'input',
            props: {
              label: '配置项名称',
              name: 'component_name',
              rules: [
                {
                  required: true,
                  message: '请输入配置项名称',
                },
              ],
            },
          },
          {
            type: 'input',
            props: {
              label: '配置项文本框类型',
              name: 'component_type',
              rules: [
                {
                  required: true,
                  message: '请输入配置项文本框类型',
                },
              ],
            },
          },
          {
            type: 'select',
            props: {
              label: '组件类型',
              name: 'component_tag',
              rules: [
                {
                  required: true,
                  message: '请输入组件类型',
                },
              ],
            },
            inject: {
              options: [
                {
                  value: 'text',
                  label: '普通文本'
                },
                {
                  value: 'number',
                  label: '数字'
                },
                {
                  value: 'value',
                  label: '盒子文本'
                },
                {
                  value: 'select',
                  label: '下拉列表'
                },
                {
                  value: 'color',
                  label: '着色器'
                }

              ]
            }
          },
          {
            type: 'input',
            props: {
              label: '组件占位符',
              name: 'placeholder',
              rules: [
                {
                  required: true,
                  message: '请输入组件标签',
                },
              ],
            },
          },
          {
            type: 'textarea',
            props: {
              label: '下拉选项',
              name: 'options',
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
          await handlers.updateComponentConfig(value)
        },
      },
      deleteButtonCfg: {
        onConfirm: async primaryKey => {
          await handlers.deleteComponentConfig(primaryKey)
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
