import React, { useEffect, useState, useRef, useMemo } from "react"
import config from "config"
import { Layout } from "antd"
import ReactTable from "react-table"
import CustomTableHeader from "../CustomTableHeader"
import { useListCoins } from "../../utils"
import Img from "react-image"
import { GROUPED_DEFAULT_FIELDS, GROUPED_TOTAL_FIELDS, FULL_COLUMNS } from "../../constants"
import { authHeader, authRefresh, dynamicSort } from "../../helpers"
import { TokenChecker } from "./TokenChecker"
import { FieldChecker } from "./FieldChecker"
import loading from "../../static/loading.gif"
import "./index.css"

const { Content } = Layout

const colFields = [
  {
    Header: "Fields",
    accessor: "section"
  }
]

const Comparison = React.memo(() => {
  const SHOW_LIMIT = 15
  const [allCoins, setAllCoins] = useState([])
  const [compared, setCompare] = useState([])
  const [sleep, setSleep] = useState(null)
  const [checkStateOfToken, setCheckStateOfToken] = useState([])
  const [checkStateOfField, setCheckStateOfField] = useState([])
  const [currentPage, onPageChange] = useState(0)
  const [dynaColumn, setDynaColumn] = useState([])
  const [loadingContent, setLoadingContent] = useState(true)

  const originCol = useRef([
    {
      className: "column-icon",
      Header: () => <CustomTableHeader title={"Name"} />,
      accessor: "coin_title",
      Cell: row => (
        <div className="comptablehead">
          <Img src={row.original.img_url} width="20px" height="20px" />
          &nbsp;&nbsp;{row.value}
        </div>
      ),
      sortMethod: (a, b) => {
        return a.localeCompare(b)
      },
      width: "15%"
    }
  ])
  const rowsField = useRef([])
  const fetchedAll = useListCoins(false)
  const fetchedDefault = useListCoins(true)

  const onChangeToken = (coin_id, checked) => {
    let reps = []
    if (coin_id == "token_all") {
      reps = checkStateOfToken.map(e => ({
        coin_id: e.coin_id,
        checked: checked
      }))
    } else {
      reps = checkStateOfToken.map(e => ({
        coin_id: e.coin_id,
        checked: e.coin_id == coin_id ? checked : e.checked
      }))
    }
    setCheckStateOfToken(reps)
  }
  const onChangeField = (field, checked) => {
    let reps = []
    if (checked == true) {
      if (checkStateOfField.filter(e => e.checked == true).length > SHOW_LIMIT) {
        reps = [...checkStateOfField]
        alert("Max show fields are limited up to 15.")
      } else {
        reps = checkStateOfField.map(e => ({
          field: e.field,
          checked: e.field == field ? checked : e.checked
        }))
        FULL_COLUMNS.forEach(e => {
          if (e.accessor == field) originCol.current.push(e)
        })
      }
    } else {
      reps = checkStateOfField.map(e => ({
        field: e.field,
        checked: e.field == field ? checked : e.checked
      }))
      originCol.current = originCol.current.filter(e => e.accessor != field)
    }
    setCheckStateOfField(reps)
  }
  const colToken = [
    {
      id: "checkbox_token",
      accessor: "",
      filterable: false,
      Cell: row =>
        row && (
          <TokenChecker
            coin_id={row.original.coin_id}
            init={checkStateOfToken.filter(e => e.coin_id == row.original.coin_id)[0].checked}
            onChange={onChangeToken}
          />
        ),
      Header: ({ data }) =>
        data && (
          <TokenChecker
            coin_id={"token_all"}
            init={checkStateOfToken.filter(e => e.checked == false).length < 1}
            onChange={onChangeToken}
          />
        ),
      sortable: false,
      width: 45
    },
    {
      Header: "Name",
      accessor: "img_url",
      Cell: row =>
        row && (          
            <div className="comptablehead">
              <Img src={row.original.img_url} width="20px" height="20px" />
              &nbsp;&nbsp;{row.original.coin_title}
            </div>
        ),
      filterMethod: (filter, row) =>
        row.checkbox_token.coin_title.toLowerCase().includes(filter.value.toLowerCase()) ||
        row.checkbox_token.coin_symbol.toLowerCase().includes(filter.value.toLowerCase()),
      width: "60%"
    },
    {
      Header: "Symbol",
      accessor: "coin_symbol",
      width: "40%",
      filterable: false
    }
  ]

  useEffect(() => {
    FULL_COLUMNS.forEach((e, i) => {
      if (i > 1) {
        //except for icon and coin name
        rowsField.current.push({
          key: i - 1,
          name: e.label,
          field: e.accessor,
          checked: GROUPED_DEFAULT_FIELDS.includes(e.accessor)
        })
        if (GROUPED_DEFAULT_FIELDS.includes(e.accessor)) {
          originCol.current.push({ ...e })
        }
      }
    })
    setCheckStateOfField(rowsField.current)
  }, [])

  useEffect(
    () => {
      setAllCoins(fetchedAll)
      let rep_checks = []
      fetchedAll.forEach(e => {
        let checked = false
        fetchedDefault.forEach(f => {
          if (e.coin_id == f.coin_id) checked = true
        })
        rep_checks.push({
          coin_id: e.coin_id,
          checked: checked
        })
      })
      setCheckStateOfToken(rep_checks)
    },
    [fetchedAll, fetchedDefault]
  )

  useEffect(
    () => {
      setLoadingContent(true)
      if (sleep) clearTimeout(sleep)
      setSleep(
        setTimeout(() => {
          const formatted = checkStateOfToken.filter(s => s.checked).map(e => e.coin_id)
          const uri = `${config.apiUrl}/get_assets_params`
          const options = {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({ assets: formatted })
          }
          fetch(uri, options)
            .then(response => {
              if (response.ok) return response.json()
              return authRefresh({ uri: uri, opts: options })
            })
            .then(data => {
              data.map(val => {
                val.img_url = "https://cryptocompare.com" + val.img_url
                return val
              })
              setCompare(data)
              setLoadingContent(false)
            })
        }, 500)
      )
      return () => {
        clearTimeout(sleep)
      }
    },
    [checkStateOfToken]
  )

  useEffect(() => setLoadingContent(false), [compared.length])

  useEffect(
    () => {
      const rep = [...originCol.current]
      setDynaColumn(rep)
    },
    [checkStateOfField]
  )

  const tableToken = useMemo(
    () => (
      <ReactTable
        data={allCoins.sort(dynamicSort("full_name"))}
        columns={colToken}
        style={{ height: "440px" }}
        loading={allCoins.length > 0 ? false : true}
        rowKey={coin => coin.coin_id}
        sortable={false}
        resizable={false}
        filterable
        showPageSizeOptions={false}
        showPagination={false}
        defaultPageSize={allCoins.length}
        onPageChange={page => onPageChange(page)}
      />
    ),
    [allCoins, checkStateOfToken]
  )

  return (
    <Content
      style={{
        margin: "24px 16px",
        background: "#fff",
        minHeight: 280
      }}
    >
      {allCoins.length > 0 && compared.length > 0 ? (
        <div
          className="tableGroup"
          style={{
            margin: "24px 16px",
            padding: "20px",
            paddingTop: "0px",
            background: "#fff",
            justifyContent: "space-around"
          }}
        >
          <div className="row" style={{ paddingBottom: "10px" }}>
            <span style={{ fontSize: "14pt" }}>COMPARISON TOOL</span>
          </div>
          <div className="row" style={{ padding: "20px 0px 0px 0px" }}>
            <div className="col-md-6 col-lg-6" style={{ marginBottom: "30px", padding: "0px 20px 0px 0px" }}>
              {" "}
              {tableToken}
            </div>
            <div className=" col-md-6 col-lg-6" style={{ padding: 0 }}>
              {" "}
              <ReactTable
                data={GROUPED_TOTAL_FIELDS}
                columns={colFields}
                PageSize={GROUPED_TOTAL_FIELDS.length}
                defaultPageSize={GROUPED_TOTAL_FIELDS.length}
                showPagination={false}
                className="-striped -highlight"
                SubComponent={row =>
                  row.original.fields.map((e, k) => (
                    <FieldChecker
                      key={k}
                      field={e.field}
                      init={
                        checkStateOfField.filter(u => u.field == e.field)[0]
                          ? checkStateOfField.filter(u => u.field == e.field)[0].checked
                          : false
                      }
                      label={e.label}
                      onChangeHandler={onChangeField}
                    />
                  ))
                }
                style={{ height: "440px" }}
              />
            </div>
          </div>
          <div className="row">
            <span style={{ fontSize: "12pt", fontWeight: "bold" }}>Result</span>
          </div>
          <div
            className="row"
            style={{
              marginTop: "20px",
              justifyContent: "center",
              textAlign: "center",
              height: "500px",
              overflowY: "scroll"
            }}
          >
            <ReactTable
              className="compTable"
              data={compared}
              columns={dynaColumn}
              loading={loadingContent}
              sortable={true}
              resizable={true}
              pageSize={compared.length + 1}
              showPagination={false}
              minRows={1}
            />
          </div>
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
})

export default Comparison