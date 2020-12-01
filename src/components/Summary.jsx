import React from "react"
import { Descriptions, Space } from "antd"
import ChangeTag from "./ChangeTag"

export const toUsd = (value) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 6,
  }).format(value)
}

const Summary = (props) => {
  return (
    <Descriptions column={1} bordered size="small">
      <Descriptions.Item label="Price">{toUsd(props.price)}</Descriptions.Item>
      <Descriptions.Item label="Market Cap">
        {toUsd(props.marketCap)}
      </Descriptions.Item>
      <Descriptions.Item label="Trading Volume">
        {toUsd(props.tradingVolume)}
      </Descriptions.Item>
      <Descriptions.Item label="24 Low / 24 High">
        {toUsd(props.low24)} / {toUsd(props.high24)}
      </Descriptions.Item>
      <Descriptions.Item label="Market Cap Rank">
        #{props.rank}
      </Descriptions.Item>
      <Descriptions.Item label="All-Time High">
        <Space>
          {toUsd(props.ath)}
          <ChangeTag change={props.athChange} />
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="All-Time Low">
        <Space>
          {toUsd(props.atl)}
          <ChangeTag change={props.atlChange} />
        </Space>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default Summary
