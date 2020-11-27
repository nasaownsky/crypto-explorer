import React from "react"
import axios from "axios"
import { Descriptions, Spin, Tag, Row, Col, Space, Input } from "antd"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts"
import moment from "moment"
import Page404 from "./404"

const Coin = (props) => {
  const [coin, setCoin] = React.useState([])
  const [chart, setChart] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${props.match.params.id}?localization=false`
      )
      .then(({ data }) => {
        setCoin(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.response.data.error)
      })
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${props.match.params.id}/market_chart?vs_currency=usd&days=7`
      )
      .then(({ data }) => {
        setChart(data.prices.map(([date, price]) => ({ date, price })))
      })
  }, [])

  const toUsd = (value) => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 6,
    }).format(value)
  }

  //   const calculate = (amount) => {

  //   }

  return error ? (
    <Page404 title={error} />
  ) : (
    <Spin spinning={loading}>
      <div className="coin">
        {loading === false && (
          <>
            <h1>
              <Space align="center">
                <img width="50px" src={coin.image.large} />
                {coin.name}
                <span>({coin.symbol.toUpperCase()})</span>
              </Space>
            </h1>
            <Row gutter={[20, 20]}>
              <Col flex="1 1 65%">
                <h3>Price chart</h3>
                <ResponsiveContainer width="100%" aspect={2}>
                  <LineChart data={chart}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(tickItem) =>
                        moment(tickItem).format("DD MMM")
                      }
                      interval="preserveStart"
                      minTickGap={50}
                    />
                    <YAxis
                      tickFormatter={(tickItem) => toUsd(tickItem)}
                      axisLine={false}
                      tickLine={false}
                      mirror={true}
                      domain={["dataMin", "auto"]}
                      tickCount={7}
                    />
                    <Tooltip
                      labelFormatter={(date) =>
                        moment(date).format("ddd DD MMM YYYY hh:mm:ss")
                      }
                      formatter={(price) => toUsd(price)}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#1890FF"
                      fill="#1890FF"
                      name="Price"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Col>
              <Col flex="1 1 300px">
                <h3>Converter</h3>
                <div style={{ textAlign: "center" }}>
                  <Input
                    size="large"
                    prefix={coin.symbol.toUpperCase()}
                    defaultValue={coin.market_data.current_price.usd}
                    type="number"
                  />
                  ⇌
                  <Input
                    size="large"
                    prefix="$"
                    defaultValue={1}
                    type="number"
                  />
                </div>
                <br />
                <h3>Summary</h3>
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label={`Price`}>
                    {toUsd(coin.market_data.current_price.usd)}
                  </Descriptions.Item>
                  <Descriptions.Item label={`Market Cap`}>
                    {toUsd(coin.market_data.market_cap.usd)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trading Volume">
                    {toUsd(coin.market_data.total_volume.usd)}
                  </Descriptions.Item>
                  <Descriptions.Item label="24 Low / 24 High">
                    {toUsd(coin.market_data.low_24h.usd)} /{" "}
                    {toUsd(coin.market_data.high_24h.usd)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Market Cap Rank">
                    #{coin.market_data.market_cap_rank}
                  </Descriptions.Item>
                  <Descriptions.Item label="All-Time High">
                    <Space>
                      {toUsd(coin.market_data.ath.usd)}
                      <Tag
                        color={
                          coin.market_data.ath_change_percentage.usd.toFixed(
                            1
                          ) < 0
                            ? "red"
                            : "green"
                        }
                      >
                        {coin.market_data.ath_change_percentage.usd.toFixed(1)}%
                      </Tag>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="All-Time Low">
                    <Space>
                      {toUsd(coin.market_data.atl.usd)}
                      <Tag
                        color={
                          coin.market_data.atl_change_percentage.usd.toFixed(
                            1
                          ) < 0
                            ? "red"
                            : "green"
                        }
                      >
                        {coin.market_data.atl_change_percentage.usd.toFixed(1)}%
                      </Tag>
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <h3>Description</h3>
            <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
          </>
        )}
      </div>
    </Spin>
  )
}

export default Coin
