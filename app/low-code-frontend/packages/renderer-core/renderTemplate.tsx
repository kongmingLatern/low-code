import { FunctionComponent } from "react";
import React from "react";
import { RenderAdapter } from "./renderAdapter";
import classNames from "classnames";

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
      const renderAdapter = new RenderAdapter(i.type, i.value, {
        props: i.props,
        style: {
          ...i.style,
          position: 'absolute',
        }
      })
      const child = React.Children.only(
        renderAdapter.handler({
          img: {
            preview: true,
            onClick: e => {
              e.stopPropagation()
            },
          },
        })
      )

      const ElementChildren = () =>
        React.cloneElement(child, {
          ...child.props,
          className: classNames(
            child.props.className,
          ),
          style: {}
        })
      return <div className="absolute" style={child.props.style} key={index}>
        <ElementChildren />
      </div>
    })}
  </div>;
}

export {
  RenderTemplate
};