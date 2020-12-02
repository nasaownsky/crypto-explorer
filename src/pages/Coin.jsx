import React from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { Spin, Row, Col, Space, Select, message } from "antd"

import { setCoin, setChart } from "../redux/actions/coin"
import { ChangeTag, Chart, Summary, Converter, toUsd } from "../components"
import { Page404 } from "./index"

const { Option } = Select

const Coin = (props) => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [day, setDay] = React.useState("7")

  const dispatch = useDispatch()
  const { coin, chart } = useSelector(({ coin }) => {
    return {
      coin: coin.coin,
      chart: coin.chart,
    }
  })

  const api = `https://api.coingecko.com/api/v3/coins/${props.match.params.id}`

  React.useEffect(() => {
    async function getCoin() {
      try {
        const { data } = await axios.get(`${api}?localization=false`)
        dispatch(setCoin(data))
        setLoading(false)
      } catch (error) {
        setError(error.response.data.error)
      }
    }
    async function getChart() {
      try {
        const { data } = await axios.get(
          `${api}/market_chart?vs_currency=usd&days=${day}`
        )
        dispatch(
          setChart(data.prices.map(([date, price]) => ({ date, price })))
        )
      } catch (error) {
        message.error(error.response.data.error)
      }
    }

    getCoin()
    getChart()
  }, [api, day, dispatch])

  return error ? (
    <Page404 title={error} />
  ) : (
    <Spin spinning={loading}>
      <div className="coin">
        {loading === false && (
          <>
            <span className="text-secondary">
              Last updated: {new Date(coin.last_updated).toLocaleString()}
            </span>
            <h1>
              <Space align="center">
                <img
                  width="50px"
                  src={coin.image.large}
                  alt={`${coin.name} icon`}
                />
                {coin.name}
                <span>[{coin.symbol.toUpperCase()}]</span>
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
              <Col flex="1 1 350px">
                <h3>Converter</h3>
                <Converter
                  price={coin.market_data.current_price.usd}
                  coin={coin.symbol}
                />
                <br />
                <h3>Summary</h3>
                <Summary
                  data={[
                    {
                      label: "Price",
                      payload: <b>{toUsd(coin.market_data.current_price.usd)}</b>,
                    },
                    {
                      label: "Market Cap",
                      payload: toUsd(coin.market_data.market_cap.usd),
                    },
                    {
                      label: "Market Cap Rank",
                      payload: <>#{coin.market_data.market_cap_rank}</>,
                    },
                    {
                      label: "Trading Volume",
                      payload: toUsd(coin.market_data.total_volume.usd),
                    },
                    {
                      label: "24 Low / 24 High",
                      payload: (
                        <Space>
                          {toUsd(coin.market_data.low_24h.usd)}/
                          {toUsd(coin.market_data.high_24h.usd)}
                        </Space>
                      ),
                    },
                    {
                      label: "All-Time High",
                      payload: (
                        <Space>
                          {toUsd(coin.market_data.ath.usd)}
                          <ChangeTag
                            change={coin.market_data.ath_change_percentage.usd}
                          />
                        </Space>
                      ),
                    },
                    {
                      label: "All-Time Low",
                      payload: (
                        <Space>
                          {toUsd(coin.market_data.atl.usd)}
                          <ChangeTag
                            change={coin.market_data.atl_change_percentage.usd}
                          />
                        </Space>
                      ),
                    },
                    {
                      label: "Official Site",
                      payload: (
                        <a href={coin.links.homepage[0]}>
                          {coin.links.homepage[0]}
                        </a>
                      ),
                    },
                  ]}
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
