import React from "react"
import axios from "axios"
import { Spin, Row, Col, Space, Select } from "antd"
import Page404 from "./404"
import Chart from "../components/Chart"
import Summary from "../components/Summary"
import Converter from "../components/Converter"

const { Option } = Select

const Coin = (props) => {
  const [coin, setCoin] = React.useState([])
  const [chart, setChart] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [day, setDay] = React.useState("7")

  React.useEffect(() => {
    async function getCoin() {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${props.match.params.id}?localization=false`
        )
        setCoin(data)
        setLoading(false)
      } catch (error) {
        console.error(setError(error.response.data.error))
      }
    }
    async function getChart() {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${props.match.params.id}/market_chart?vs_currency=usd&days=${day}`
        )
        setChart(data.prices.map(([date, price]) => ({ date, price })))
      } catch (error) {
        console.error(error.response.data.error)
      }
    }

    getCoin()
    getChart()
  }, [props.match.params.id, day])

  return error ? (
    <Page404 title={error} />
  ) : (
    <Spin spinning={loading}>
      <div className="coin">
        {loading === false && (
          <>
            <h1>
              <Space align="center">
                <img
                  width="50px"
                  src={coin.image.large}
                  alt={`${coin.name} icon`}
                />
                {coin.name}
                <span>({coin.symbol.toUpperCase()})</span>
              </Space>
            </h1>
            <Row gutter={[20, 20]}>
              <Col flex="1 1 65%">
                <h3>
                  <Space>
                    Price chart
                    <Select
                      style={{ width: 100 }}
                      size="small"
                      defaultValue={day}
                      onChange={(value) => setDay(value)}
                    >
                      <Option value="1">1 day</Option>
                      <Option value="7">7 days</Option>
                      <Option value="30">30 days</Option>
                      <Option value="max">All time</Option>
                    </Select>
                  </Space>
                </h3>
                <Chart data={chart} period={day} />
              </Col>
              <Col flex="1 1 300px">
                <h3>Converter</h3>
                <Converter
                  price={coin.market_data.current_price.usd}
                  coin={coin.symbol}
                />
                <br />
                <h3>Summary</h3>
                <Summary
                  price={coin.market_data.current_price.usd}
                  marketCap={coin.market_data.market_cap.usd}
                  tradingVolume={coin.market_data.total_volume.usd}
                  rank={coin.market_data.market_cap_rank}
                  low24={coin.market_data.low_24h.usd}
                  high24={coin.market_data.high_24h.usd}
                  ath={coin.market_data.ath.usd}
                  athChange={coin.market_data.ath_change_percentage.usd}
                  atl={coin.market_data.atl.usd}
                  atlChange={coin.market_data.atl_change_percentage.usd}
                />
              </Col>
            </Row>
            <h3>Description</h3>
            {coin.description.en ? (
              <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
            ) : (
              <p>No description available.</p>
            )}
          </>
        )}
      </div>
    </Spin>
  )
}

export default Coin
