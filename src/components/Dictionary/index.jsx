import React, { useState } from "react"
// Layout
import { Layout, Icon, Input } from "antd"
// react-table
import ReactTable from "react-table"
import "./index.css"

const { Content } = Layout

const Dictionary = React.memo(() => {
  const [filterText, setFilterText] = useState("")

  const datas = [
    {
      prefix: "M",
      name: "Market Momentum",
      definition:
        "Measures growth, phase and discounts results by historical volatility",
      updatetime: "10 minutes",
      key: "1"
    },
    {
      prefix: "T",
      name: "Token Total supply",
      definition: "Sum of all issued token",
      key: "2"
    },
    {
      prefix: "T",
      name: "Token Circulating Supply",
      definition: "Number of tokens that are publicly available in the market",
      key: "3"
    },
    {
      prefix: "M",
      name: "Marketcap",
      definition:
        "Total trading value of a given token- calculated by multiply the circulating supply of the token by the current price",
      key: "4"
    },
    {
      prefix: "P",
      name: "Price (Symbol)",
      definition: "Asset price of a selected symbol",
      updatetime: "10 minutes",
      key: "5"
    },
    {
      prefix: "P",
      name: "Price change (Symbol)(24h)",
      definition: "Price change in the last 24 hrs in a specific symbol",
      key: "6"
    },
    {
      prefix: "V",
      name: "Volume  (Symbol)(24h)",
      definition:
        "Total volume in the last 24 hours nominated in a specific symbol",
      key: "7"
    },
    {
      prefix: "V",
      name: "Volume change (24h)",
      definition:
        "The volume change in the last 24 hours % in a selected symbol",
      key: "8"
    },
    {
      prefix: "T",
      name: "Twitter list",
      definition:
        "Number of Twitter users that added a specific token to their list",
      key: "9"
    },
    {
      prefix: "T",
      name: "Twitter favorites",
      definition: "Number of Twitter users highlighted a token as  favorite",
      key: "10"
    },
    {
      prefix: "T",
      name: "Twitter following",
      definition: "Number of Twitter users that are followed by a token",
      key: "11"
    },
    {
      prefix: "T",
      name: "Twitter status",
      definition: "Number of tweets for a specific token",
      key: "12"
    },
    {
      prefix: "T",
      name: "Twitter followers",
      definition: "Number of Twitter followers of a specific token",
      key: "13"
    },
    {
      prefix: "R",
      name: "Reddit active users",
      definition: "Number of active users",
      key: "14"
    },
    {
      prefix: "G",
      name: "Github Closed issues",
      definition:
        "Number of Github closed issues for a specific Github repository",
      key: "15"
    },
    {
      prefix: "G",
      name: "Github Open pull issues",
      definition:
        "Number of Github open pull issues for a specific Github repository",
      key: "16"
    },
    {
      prefix: "G",
      name: "Github Closed pull issues",
      definition:
        "Number of Github closed pull issues for a specific Github repository",
      key: "17"
    },
    {
      prefix: "G",
      name: "Github Forks",
      definition: "Number of Github forks for a specific Github repository",
      key: "18"
    },
    {
      prefix: "G",
      name: "Github Subscribers",
      definition:
        "Number of Github subscribers for a specific Github repository",
      key: "19"
    },
    {
      prefix: "G",
      name: "Github Stars",
      definition: "Number of Github stars for a specific repository",
      key: "20"
    },
    {
      prefix: "V",
      name: "Volatilty (x) days (symbol)",
      definition:
        "Standard deviation of price from the mean over a period of x days in a specific symbol",
      key: "21"
    },
    {
      prefix: "A",
      name: "ATH (Symbol)",
      definition: "All-time high of an asset nominated in a specific symbol",
      key: "22"
    },
    {
      prefix: "D",
      name: "Days since ATH (Symbol)",
      definition:
        "Number of days that passed since All-time high in a specific symbol",
      key: "23"
    },
    {
      prefix: "C",
      name: "Current Price/ATH (Symbol)",
      definition:
        "Current price/All-time high price nominated in a specific symbol",
      key: "24"
    },
    {
      prefix: "A",
      name: "ATL (Symbol)",
      definition: "All-time low price in a specific symbol",
      updatetime: "10 minutes",
      key: "25"
    },
    {
      prefix: "D",
      name: "Days since ATL (Symbol)",
      definition:
        "Number of days that passed since All-time low in a specific symbol",
      key: "26"
    },
    {
      prefix: "A",
      name: "ATL/Current Price (Symbol)",
      definition: "All-time low/current price nominated in a specific symbol",
      key: "27"
    },
    {
      prefix: "W",
      name: "Weekly Price change % (Symbol)",
      definition: "Price change over the last 7 days in a specific symbol",
      key: "28"
    },
    {
      prefix: "M",
      name: "Mayer Multiple (Symbol)",
      definition:
        "Average price of the last 200 days/current price in a specific symbol",
      key: "29"
    },
    {
      prefix: "D",
      name:
        "(X)days price ratio (Symbol) Last 30d price avg / Past 30d price avg",
      definition:
        "Average price of the last (x) days in a specific symbol/ the average price of the prior (x) days in a specific symbol",
      key: "30"
    },
    {
      prefix: "S",
      name: "Buy Support (x)%",
      definition:
        "Sum of all buy orders to a distance of x% from the highest bid price",
      key: "31"
    },
    {
      prefix: "S",
      name: "Sell Support (x)%",
      definition:
        "Sum of all sell orders to a distance of x% from the lowest bid price",
      key: "32"
    },
    {
      prefix: "B",
      name: "Buy (x)%/Sell (x)%",
      definition:
        "(Sum of buy order at x% from highest bid)/ (Sum of sell orders at x% from lowest bid)",
      key: "33"
    },
    {
      prefix: "B",
      name: "Buy Support 10% / Marketcap",
      definition:
        "(Sum of buy order at 10% from the highest bid)/(Sum of sell orders at 10% from the lowest bid)",
      key: "34"
    },
    {
      prefix: "B",
      name: "(Buy 10%/Sell 10%)^2 * (Buy 10%/Marketcap)",
      definition:
        "Liquidity indicator takes into consideration both (buy/sell-ratio) and (actual buy-support with respect to asset's marketcap)",
      key: "35"
    },
    {
      prefix: "B",
      name: "(Buy 10%-Sell 10%) / (Buy 10%+Sell 10%)",
      definition:
        "Liquidity indicator that represent: support-differences with respect to the average-support",
      key: "36"
    },
    {
      prefix: "A",
      name: "ATH/ATL Position",
      definition:
        "An indication of the relative position of the current price vs All-time high and All-time low: if the position is near 0, price is closer to All-time low, if the position is near 1, the price is closer to All-time high",
      key: "37"
    },
    {
      prefix: "C",
      name: "Current supply/Total supply",
      definition:
        "Current token issuance out of all the tokens that will be generated(minted)",
      key: "38"
    },
    {
      prefix: "A",
      name: "Tx (24h avg)",
      definition:
        "The average size of transactions made in Localbitcoins for a specific FIAT currency,at the last traded day. Transaction size is converted to USD)",
          key: "39"
    },
    {
      prefix: "A",
      name: "Tx (30d avg)",
      definition:
        "The average size of transactions made in Localbitcoins for a specific FIAT currency,at the last 30 days. Transaction size is converted to USD",
      key: "40"
    },
    {
      prefix: "V",
      name: "Volume (30d) - Localbitcoins",
      definition:
        "The total size of transactions made in localbitcoins for a specific FIAT currency,at the last 30 days. Transaction size is converted to USD",
      key: "41"
    },
    {
      prefix: "V",
      name: "Volume change (30d) - Localbitcoins",
      definition:
        "The change in total volume(%) of localbitcoinss transactions for a specific FIAT currency, of the last 30 days compared to 30 days prior.",
      key: "42"
    },
    {
      prefix: "P",
      name: "Price (weighted avg)",
      definition:
        "The weighted average price of last 10 transactions made in localbitcoins for a specific FIAT currency in the last 72 hours, weights are transaction volume",
      key: "43"
    },
    {
      prefix: "P",
      name: "Premium / Discount",
      definition:
        "Premium and discount represent the ratio of weighted average price compared to current bitcoin spot price",
      key: "44"
    },
    {
      prefix: "V",
      name: "Volatility (last 30 days) - Localbitcoins",
      definition:
        "Current token issuance out of all the tokens that will be generated(minted)",
      key: "45"
    }
  ]

  const coinColumns = [
    {
      Header: "",
      accessor: "prefix",
      Cell: row => <span style={{ textAlign: "left" }}>{row.value}</span>,
      width: "100"
    },
    {
      Header: "Term",
      id: "name",
      accessor: "name",
      Cell: row => <span style={{ textAlign: "left" }}>{row.value}</span>,
      width: "250"
    },
    {
      Header: "Definition",
      id: "definition",
      accessor: "definition",
      Cell: row => <span style={{ textAlign: "left" }}>{row.value}</span>,
      width: "100%"
    },
    {
      Header: "Update TIme",
      id: "updatetime",
      accessor: "updatetime",
      Cell: row => <span style={{ textAlign: "left" }}>{row.value}</span>,
      width: "200"
    }
  ]
  const searchOnChange = value => setFilterText(value)
  const searched = value =>
    datas.filter(
      d =>
        d.name.toLowerCase().includes(value.toLowerCase()) ||
        d.definition.toLowerCase().includes(value.toLowerCase())
    )

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 30,
        background: "#fff",
        minHeight: 280
      }}
    >
      <div>
        <div
          className="row"
          style={{
            width: "100%",
            display: "flex",
            padding: 0,
            margin: 0,
            paddingBottom: "20px"
          }}
        >
          <div
            className="col-sm-6 "
            style={{ textAlign: "left", width: "100%", padding: "0px" }}
          >
            <span style={{ fontSize: "14pt" }}>DICTIONARY</span>
          </div>
          <div
            className="col-sm-6 "
            style={{
              justifyContent: "flex-end",
              padding: 0,
              width: "100%",
              display: "flex"
            }}
          >
            <Input
              placeholder="Search..."
              prefix={
                <Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              style={{
                borderRadius: "4px",
                height: "30px",
                width: "250px",
                marginRight: "20px"
              }}
              onChange={e => searchOnChange(e.target.value)}
            />
          </div>
        </div>

  
        <div
          className="row"
          style={{
            width: "100%",
            display: "flex",
            padding: 0,
            margin: 0,
            paddingBottom: "10px"
          }}
        >
          <span style={{ fontSize: "12pt" }}>
            The Following section is intended to describe the key metrics and
            parameters in use with DTRA’s Intelligence Platform, in order to
            provide a holistic analysis of the crypto markets
          </span>
        </div>
        <div
          className="row"
          style={{
            width: "100%",
            display: "flex",
            padding: 0,
            margin: 0,
            paddingBottom: "20px"
          }}
        >
          <span style={{ fontSize: "10pt", fontWeight: "bold" }}>
            Results({searched(filterText).length})
          </span>
        </div>
        <div
          className="row"
          style={{
            width: "100%",
            display: "flex",
            padding: 0,
            margin: 0,
            paddingBottom: "20px"
          }}
        >
          <ReactTable
            data={searched(filterText)}
            className="dictionaryTable -striped -highlight"
            columns={coinColumns}
            showPagination={false}
            defaultSorted={[
              {
                id: "prefix",
                desc: false
              }
            ]}
            defaultPageSize={12}
            pageSize={searched(filterText).length}
          />
        </div>
      </div>
    </Content>
  )
})

export default Dictionary