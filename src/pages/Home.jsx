import React from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Table, message } from "antd"

import { ChangeTag, toUsd } from "../components"
import { setCoins, setPage } from "../redux/actions/coins"

const Home = () => {
  const [loading, setLoading] = React.useState(true)

  const dispatch = useDispatch()
  const { items, page } = useSelector(({ coins }) => {
    return {
      items: coins.items,
      page: coins.page,
    }
  })

  const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`

  React.useEffect(() => {
    async function getCoins() {
      try {
        const { data } = await axios.get(api)
        dispatch(setCoins(data))
        setLoading(false)
      } catch (error) {
        message.error(error.response.data.error)
      }
    }
    getCoins()
  }, [api, dispatch])

  const handlePagination = (current) => {
    setLoading(true)
    dispatch(setPage(current))
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  let sortDirections = ["ascend", "descend", "ascend"]

  const columns = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
      defaultSortOrder: "ascend",
      align: "center",
      sorter: (a, b) => a.market_cap_rank - b.market_cap_rank,
      sortDirections: sortDirections,
    },
    {
      dataIndex: "image",
      render: (image, data) => (
        <img width="20px" src={image} alt={`${data.name} icon`} />
      ),
      width: "40px",
      align: "right",
      colSpan: 0,
    },

    {
      title: "Coin",
      dataIndex: "name",
      render: (coin, data) => (
        <Link to={`/coins/${data.id}`}>
          <b>{coin}</b>
        </Link>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: sortDirections,
      colSpan: 2,
    },
    {
      title: "Price",
      dataIndex: "current_price",
      render: (price) => <span>{toUsd(price)}</span>,
      sorter: (a, b) => a.current_price - b.current_price,
      sortDirections: sortDirections,
    },
    {
      title: "1h",
      dataIndex: "price_change_percentage_1h_in_currency",
      render: (change) => <ChangeTag change={change} />,
      align: "center",
      sorter: (a, b) =>
        a.price_change_percentage_1h_in_currency -
        b.price_change_percentage_1h_in_currency,
      sortDirections: sortDirections,
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h_in_currency",
      align: "center",
      render: (change) => <ChangeTag change={change} />,
      sorter: (a, b) =>
        a.price_change_percentage_24h_in_currency -
        b.price_change_percentage_24h_in_currency,
      sortDirections: sortDirections,
    },
    {
      title: "7d",
      dataIndex: "price_change_percentage_7d_in_currency",
      align: "center",
      render: (change) => <ChangeTag change={change} />,
      sorter: (a, b) =>
        a.price_change_percentage_7d_in_currency -
        b.price_change_percentage_7d_in_currency,
      sortDirections: sortDirections,
    },
  ]

  return (
    <>
      <Table
        size="middle"
        title={() => (
          <>
            Coins in order of Market Capitalization. Powered by{" "}
            <a
              href="https://www.coingecko.com/en/api"
              target="_blank"
              rel="noreferrer"
            >
              Coingecko API
            </a>
          </>
        )}
        columns={columns}
        rowKey={(data) => data.id}
        dataSource={items}
        loading={loading}
        pagination={{
          showSizeChanger: false,
          current: page,
          pageSize: 100,
          total: 6100,
          onChange: (current) => handlePagination(current),
        }}
        sticky
        scroll={{ x: 400 }}
      />
    </>
  )
}

export default Home
