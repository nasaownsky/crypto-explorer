import React from "react"
import { Input } from "antd"
import { SwapOutlined } from "@ant-design/icons"

const Converter = (props) => {
  const [usd, setUsd] = React.useState(props.price)
  const [crypto, setCrypto] = React.useState(1)
  const [action, setAction] = React.useState(true)

  const calcUsd = (amount) => {
    setCrypto(amount)
    let result = amount * props.price
    setUsd(result)
    setAction(true)
  }

  const calcCrypto = (amount) => {
    setUsd(amount)
    let result = amount / props.price
    setCrypto(result)
    setAction(false)
  }

  const revert = () => {
    if (action) {
      setUsd(crypto)
      calcCrypto(crypto)
      setAction(false)
    }
    if (!action) {
      setCrypto(usd)
      calcUsd(usd)
      setAction(true)
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      <Input
        size="large"
        prefix={props.coin.toUpperCase()}
        value={crypto}
        defaultValue={1}
        onChange={(e) => calcUsd(e.target.value)}
        type="number"
        min={0}
        allowClear
        inputMode="numeric"
      />
      <SwapOutlined
        style={{ padding: 10, fontSize: 16, color: "#1890FF" }}
        onClick={revert}
      />
      <Input
        size="large"
        prefix="$"
        value={usd}
        onChange={(e) => calcCrypto(e.target.value)}
        type="number"
        min={0}
        allowClear
        inputMode="numeric"
      />
    </div>
  )
}

export default Converter
