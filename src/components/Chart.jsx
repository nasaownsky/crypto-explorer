import React from "react"
import moment from "moment"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { toUsd } from "./index"

const Chart = (props) => {
  const formatTime = (tickItem) => {
    switch (props.period) {
      case "1":
        return moment(tickItem).format("ddd kk:mm")
      case "max":
        return moment(tickItem).format("MMM YYYY")
      default:
        return moment(tickItem).format("DD MMM")
    }
  }

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <LineChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#888" />
        <XAxis
          dataKey="date"
          tickFormatter={(tickItem) => formatTime(tickItem)}
          minTickGap={30}
        />
        <YAxis
          tickFormatter={(tickItem) => toUsd(tickItem)}
          axisLine={false}
          tickLine={false}
          mirror={true}
          domain={["dataMin", "auto"]}
          tickCount={7}
          tick={{ fill: "red" }}
        />
        <Tooltip
          labelFormatter={(date) =>
            moment(date).format("ddd DD MMM YYYY kk:mm:ss")
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
          animationBegin={50}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
