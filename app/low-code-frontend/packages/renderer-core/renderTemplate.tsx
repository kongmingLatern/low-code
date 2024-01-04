import { Fragment, FunctionComponent } from "react";

import { ELEMENT_TYPE } from "@/shared";
import { RenderAdapter } from "./renderAdapter";

interface RenderTemplateProps {
  element: {
    type: ELEMENT_TYPE
    props: Record<string, any>
    style: Record<string, any>
    value: string
  }[]
}

const RenderTemplate: FunctionComponent<RenderTemplateProps> = (props) => {
  const { element } = props

  return <div className="relative">
    {element.map((i, index) => {
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

export default RenderTemplate;