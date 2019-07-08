import React, { useState, useEffect } from "react";
import { Layout } from "antd";
// custom hook
import {
  useAllCoins,
  numberWithExpressive,
  numberWithCommasDecimals
} from "../../utils";

// react-table
import ReactTable from "react-table";
import Select from "react-select";
import Img from "react-image";
import CustomTableHeader from "../CustomTableHeader";
import loading from "../../static/loading.gif";
import "./index.css";

const { Content } = Layout;
const options = [
  { value: "0", label: "USD" },
  { value: "1", label: "BTC" },
  { value: "2", label: "ETH" }
];

const CryptoAssets = () => {
  const currency_sign = ["$", "Ƀ", "Ξ"];
  const currency_letter = ["usd", "btc", "eth"];
  const currency_upper_letter = ["USD", "BTC", "ETH"];

  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("0");
  const fetched = useAllCoins();

  useEffect(() => {
    setCoins(fetched.filter(coin => coin.mc_rank));
  }, [fetched]);

  // sort coins by mc_rank
  coins.sort((first, second) => first.mc_rank - second.mc_rank);

  const coinColumns = [
    {
      Header: () => <CustomTableHeader title={"#"} />,
      accessor: "mc_rank",
      sortMethod: (first, second) => first - second,
      width: "40"
    },
    {
      Header: () => <CustomTableHeader title={"Name"} />,
      accessor: "coin_title",
      Cell: row => (
        <div className="tablehead">
          <Img src={row.original.img_url} width="20px" height="20px" />
          {row.row.coin_title}
        </div>
      ),
      width: "16%"
    },
    {
      Header: () => <CustomTableHeader title={"Marketcap"} />,
      accessor: "market_cap_" + currency_letter[Number(currency)],
      Cell: row => (
        <span>
          {currency === "0"
            ? currency_sign[Number(currency)] +
              numberWithCommasDecimals(row.value)
            : numberWithCommasDecimals(row.value) +
              currency_sign[Number(currency)]}
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: "8%"
    },
    {
      Header: () => <CustomTableHeader title={"Price"} />,
      accessor: "asset_price_" + currency_letter[currency],
      Cell: row => (
        <span>
          {currency === "0"
            ? currency_sign[currency] + numberWithExpressive(row.value)
            : numberWithExpressive(row.value) + currency_sign[currency]}
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: "8%"
    },
    {
      Header: () => <CustomTableHeader title={"Volume (24h)"} />,
      accessor: "volume_24_" + currency_letter[currency],
      Cell: row => (
        <span style={{ color: "blue" }}>
          {currency === "0"
            ? currency_sign[currency] + numberWithCommasDecimals(row.value)
            : numberWithCommasDecimals(row.value) + currency_sign[currency]}
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: "8%"
    },
    {
      Header: () => (
        <CustomTableHeader title={"Supply Ratio (Current / Total) "} />
      ),
      accessor: "supply_ratio",
      Cell: row => <span>{numberWithCommasDecimals(row.value, 2)}%</span>,
      sortMethod: (first, second) => first - second,
      width: "13%"
    },
    {
      Header: () => (
        <CustomTableHeader
          title={"ATH / ATL (" + currency_upper_letter[currency] + ") Position"}
        />
      ),
      accessor: "min_max_position_" + currency_letter[currency],
      Cell: row => <span>{numberWithCommasDecimals(row.value, 6)}</span>,
      sortMethod: (first, second) => first - second,
      width: "7%"
    },
    {
      Header: () => <CustomTableHeader title={"Buy / Sell Support 5%"} />,
      accessor: "buy_div_sell_5",
      Cell: row => <span>{numberWithCommasDecimals(row.value, 2)}%</span>,
      sortMethod: (first, second) => first - second,
      width: "8%"
    },
    {
      Header: () => <CustomTableHeader title={"Price Change (24h)"} />,
      accessor: "price_change_24_" + currency_letter[currency],
      Cell: row => (
        <span
          style={{
            color: numberWithCommasDecimals(row.value, 2) >= 0 ? "green" : "red"
          }}
        >
          {numberWithCommasDecimals(row.value, 2)}%
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: "6%"
    },
    {
      Header: () => <CustomTableHeader title={"Volume Change (24h)"} />,
      accessor: "volume_change_24_usd",
      Cell: row => (
        <span
          style={{
            color: numberWithCommasDecimals(row.value, 2) >= 0 ? "green" : "red"
          }}
        >
          {numberWithCommasDecimals(row.value, 2)}%
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: "6%"
    },
    {
      Header: () => <CustomTableHeader title={"Market Momentum (7d)"} />,
      accessor: "market_momentum",
      Cell: row => (
        <span style={{ fontWeight: "bold" }}>
          {numberWithCommasDecimals(row.value, 6)}
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: "8%"
    },
    {
      Header: () => <CustomTableHeader title={"Volatility (30d)"} />,
      accessor: "volatility_30_" + currency_letter[currency],
      Cell: row => <span>{numberWithCommasDecimals(row.value, 2)}</span>,
      sortMethod: (first, second) => first - second,
      width: "3%"
    }
  ];
  const changeCurrencyUnit = currency => setCurrency(currency.value);

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
              style={{ textAlign: "left", width: "100%", padding: "0px" }}
            >
              <span style={{ fontSize: "14pt" }}>
                Top selected crypto-assets by DTRA team
              </span>
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
              <Select
                className="Selector"
                value={currency.value}
                isSearchable={false}
                onChange={currency => changeCurrencyUnit(currency)}
                options={options}
                placeholder={"USD"}
              />
            </div>
          </div>
          <ReactTable
            data={coins}
            columns={coinColumns}
            showPagination={false}
            className="assetTable"
            loading={coins.length > 0 ? false : true}
            rowKey={coin => coin.coin_id}
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
  );
};

export default CryptoAssets;
