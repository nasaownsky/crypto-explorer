import React from "react"
import axios from "axios"
import { Descriptions, Spin, Tag, Row, Col } from "antd"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts"
import moment from 'moment';
import Page404 from "./404"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

export const Coin = (props) => {
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
        `https://api.coingecko.com/api/v3/coins/${props.match.params.id}/market_chart?vs_currency=usd&days=10`
      )
      .then(({ data }) => {
        setChart(data)
      })
  }, [])

//   console.log(chart)
//   const formatXAxis = (tickItem) => {
//     return moment(tickItem).format("D MMM").toString()
//   }

  return error ? (
    <Page404 title={error} />
  ) : (
    <Spin spinning={loading}>
      <div className="coin">
        {loading === false && (
          <>
            <h1>{coin.name}</h1>
            <Row gutter={20}>
              <Col flex="1 1 600px">
                <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
              </Col>
              <Col flex="1 1 300px">
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label={`Price`}>
                    ${coin.market_data.current_price.usd}
                  </Descriptions.Item>
                  <Descriptions.Item label={`Market Cap`}>
                    ${coin.market_data.market_cap.usd}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trading Volume">
                    ${coin.market_data.total_volume.usd}
                  </Descriptions.Item>
                  <Descriptions.Item label="24 Low / 24 High">
                    ${coin.market_data.low_24h.usd} / $
                    {coin.market_data.high_24h.usd}
                  </Descriptions.Item>
                  <Descriptions.Item label="Market Cap Rank">
                    #{coin.market_data.market_cap_rank}
                  </Descriptions.Item>
                  <Descriptions.Item label="All-Time High">
                    ${coin.market_data.ath.usd}&nbsp;
                    <Tag
                      color={
                        coin.market_data.ath_change_percentage.usd.toFixed(1) <
                        0
                          ? "red"
                          : "green"
                      }
                    >
                      {coin.market_data.ath_change_percentage.usd.toFixed(1)}%
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="All-Time Low">
                    ${coin.market_data.atl.usd}&nbsp;
                    <Tag
                      color={
                        coin.market_data.atl_change_percentage.usd.toFixed(1) <
                        0
                          ? "red"
                          : "green"
                      }
                    >
                      {coin.market_data.atl_change_percentage.usd.toFixed(1)}%
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <br />
            <ResponsiveContainer minWidth={400}  aspect={2}>
              <LineChart
                data={chart.prices}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={0}
                //   tickFormatter={formatXAxis}
                />
                <YAxis unit="$" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={1}
                  stroke="#1890FF"
                  fill="#1890FF"
                  name="Price"
                  unit="$"
                  dot={false}
                />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </Spin>
  )
}

export default Coin
