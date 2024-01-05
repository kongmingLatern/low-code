import { Fragment, FunctionComponent } from "react";

import { RenderAdapter } from "./renderAdapter";

interface RenderTemplateProps {
  element: {
    type: any
    props: Record<string, any>
    style: Record<string, any>
    value: string
  }[]
}

const RenderTemplate: FunctionComponent<RenderTemplateProps> = (props) => {
  const { element } = props

  return <div className="relative">
    {element?.map((i, index) => {
      const adapter = new RenderAdapter(i.type, i.value, {
        props: i.props,
        style: {
          ...i.style,
          position: 'absolute',
        }
      })
      return <Fragment key={index}>{adapter.handler()}</Fragment>
    })}
  </div>;
}

export {
  RenderTemplate
};