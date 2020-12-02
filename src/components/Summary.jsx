import React from "react"
import { Descriptions } from "antd"

const Summary = (props) => {
  return (
    <Descriptions column={1} bordered size="small">
      {props.data.map((item, index) => (
        <Descriptions.Item key={index} label={item.label}>{item.payload}</Descriptions.Item>
      ))}
    </Descriptions>
  )
}

export default Summary
