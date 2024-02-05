import BaseContentLayout, {
  CfgProps,
} from '@/layout/BaseContentLayout'

import { handlers } from '@/shared'

export default function AdminLibrary() {
  async function getData() {
    return await handlers.getAllLibrary()
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
                label: '组件库名称',
                name: 'library_name',
                rules: [
                  {
                    required: true,
                    message: '请输入组件库名称',
                  },
                ],
              },
            },
            {
              type: 'input',
              props: {
                label: '版本号',
                name: 'version',
                rules: [
                  {
                    required: true,
                    message: '请输入版本号',
                  },
                ],
              },
            },
          ],
          children: '添加组件库信息',
          restProps: {
            title: '添加组件库信息',
            footer: null,
            onOk: async (value: any) => {
              await handlers.addLibrary(value as any)
            },
          },
        },
      ],
    },
    searchCfg: {
      placeholder: '请输入要查询的组件类型',
      primaryKey: 'library_name',
    },
    dataCfg: {
      primaryKey: 'library_id',
      columns: [
        {
          title: '组件库id',
          dataIndex: 'library_id',
          key: 'library_id',
          align: 'center',
        },
        {
          title: '组件库名称',
          dataIndex: 'library_name',
          key: 'library_name',
          align: 'center',
        },
        {
          title: '组件库版本',
          dataIndex: 'version',
          key: 'version',
          align: 'center',
        },
      ],
    },
    actionCfg: {
      formCfg: {
        title: '修改组件库信息',
        form: true,
        formItem: [
          {
            type: 'input',
            props: {
              label: '组件库名称',
              name: 'library_name',
              rules: [
                {
                  required: true,
                  message: '请输入组件库名称',
                },
              ],
            },
          },
          {
            type: 'input',
            props: {
              label: '版本号',
              name: 'version',
              rules: [
                {
                  required: true,
                  message: '请输入版本号',
                },
              ],
            },
          },
        ],
        footer: null,
        onOk: async value => {
          await handlers.updateLibrary(value)
        },
      },
      deleteButtonCfg: {
        onConfirm: async primaryKey => {
          await handlers.deleteLibrary(primaryKey)
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
