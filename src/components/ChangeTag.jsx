import React from "react"
import { Tag } from "antd"

const ChangeTag = ({ change }) => {
  return change !== null ? (
    <Tag color={change.toFixed(1) < 0 ? "red" : "green"}>
      {change.toFixed(1)}%
    </Tag>
  ) : (
    <span>--</span>
  )
}

export default ChangeTag
