import React, { useState, useEffect } from "react"
// common custom components
import { Layout } from "antd"
// custom hook
import { useLocalCoins, numberWithCommasDecimals, removeSymbol } from "../../utils"
import { numbericSort } from "../../helpers"
// react-table
import ReactTable from "react-table"
import CustomTableHeader from "../CustomTableHeader"
import Img from "react-image"

import "./index.css"

const { Content } = Layout
import loading from "../../static/loading.gif"

const LbitCoins = () => {  
  
  const [coins, toCoins] = useState([])  
  const fetched = useLocalCoins()

  useEffect(() => {
    toCoins(fetched)
  }, [fetched])

  // sort coins by mc_rank
  coins.sort((a, b) => a.mc_rank - b.mc_rank)

  const coinColumns = [
    {
      Header: () => <CustomTableHeader title={"Name"} />,
      accessor: "lb_currency_name",
      Cell: row => 
        <div className="tablehead">
          <Img src={row.original.img_url} width="20px" height="20px" />
            {removeSymbol(row.row.lb_currency_name)}
        </div>,
      width: "16%"
    },{
      Header: () => <CustomTableHeader title={"Tx (24h avg)"} />,
      accessor: "lb_avg_daily_tx_size",
      Cell: row => <span>${numberWithCommasDecimals(row.row.lb_avg_daily_tx_size)}</span>,
      sortMethod: (a, b) => a - b,
      width: "8%"
    },{
      Header: () => <CustomTableHeader title={"Tx (30d avg)"} />,
      accessor: "lb_avg_30d_tx_size",
      Cell: row => <span>${numberWithCommasDecimals(row.row.lb_avg_30d_tx_size)}</span>,
      sortMethod: (a, b) => a - b,
      width: "8%"
    },{
      Header: () => <CustomTableHeader title={"Volume (30d)"} />,
      accessor: "lb_tot_30d_tx_size",
      Cell: row => <span>${numberWithCommasDecimals(row.row.lb_tot_30d_tx_size)}</span>,
      sortMethod: (a, b) => a - b,
      width: "8%"
    },{
      Header: () => <CustomTableHeader title={"Volume change (30d)"} />,
      accessor: "lb_change_30d_tx_size",
      Cell: row => 
        <span style={{ color: row.row.lb_change_30d_tx_size >= 0 ? "green" : "red" }}>
          {numberWithCommasDecimals(row.row.lb_change_30d_tx_size, 2)}%
        </span>,
      sortMethod: (a, b) => a - b,
      width: "8%"
    },{
      Header: () => <CustomTableHeader title={"Price (weighted avg)"} />,
      accessor: "lb_weighted_avg_price",
      Cell: row => <span>${numberWithCommasDecimals(row.row.lb_weighted_avg_price)}</span>,
      sortMethod: (a, b) => a - b,
      width: "8%"
    },{
      Header: () => <CustomTableHeader title={"Premium / Discount"} />,
      accessor: "lb_premium",
      Cell: row => <span style={{ color: row.row.lb_premium >= 0 ? "green" : "red" }}>
            {numberWithCommasDecimals(row.row.lb_premium, 2)}%
          </span>,
      sortMethod: (a, b) => a - b,
      width: "8%"
    },{
      Header: () => <CustomTableHeader title={"Volatility (30d)"} />,
      accessor: "lb_volatility_30_days",
      Cell: row => 
        <span>{numberWithCommasDecimals(row.row.lb_volatility_30_days, 2)}</span>,
      sortMethod: (a, b) => a - b,
      width: "8%"
    }
  ]
 
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 30,
        background: "#fff",
        minHeight: 280,
        alignItems: "right"
      }}
    >
      {coins.length > 0 ? (
        <div>
          <div
            className="row"
            style={{ width: "100%", display: "flex", padding: 0, margin: 0 }}
          >
            <div
              className="col-sm-6 "
              style={{ textAlign: "left", width: "100%", padding: '0px', marginBottom: '10px' }}
            >
              <span style={{ fontSize: "14pt" }}>
                Localbitcoins transactions by country
              </span>
            </div>            
          </div>          
          <ReactTable
            data={coins.sort(numbericSort("lb_tot_30d_tx_size"))}
            columns={coinColumns}
            showPagination={false}
            className="lbitcoinTable"
            loading={coins.length > 0 ? false : true}
            rowKey={coin => coin.lb_tot_30d_tx_size}
            defaultPageSize={coins.length}
          />
        </div>
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          <span>
            <img src={loading} width="20" height="20" />
            Loading...
          </span>
        </div>
      )}
    </Content>
  )
}

export default LbitCoins