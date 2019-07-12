import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useStableCoins, numberWithCommasDecimals, numbericSort } from '../../../utils';
import ReactTable from 'react-table';
import { CustomTableHeader } from '../../Others';
import Img from 'react-image';
import loading from '../../../static/loading.gif';
import './index.css';

const { Content } = Layout;

export const StableCoins = () => {
  const [coins, toCoins] = useState([]);
  const fetched = useStableCoins();

  useEffect(() => {
    toCoins(fetched);
  }, [fetched]);

  // sort coins by mc_rank
  coins.sort((first, second) => first.mc_rank - second.mc_rank);

  const coinColumns = [
    {
      Header: () => <CustomTableHeader title={'Name'} />,
      accessor: 'stc_tcoin_title',
      Cell: row => (
        <div className="tablehead">
          <Img src={row.original.img_url} width="20px" height="20px" />
          {row.row.stc_tcoin_title}
        </div>
      ),
      width: '150'
    },
    {
      Header: () => <CustomTableHeader title={'Marketcap'} />,
      accessor: 'stc_marketcap_usd',
      Cell: row => <span>${numberWithCommasDecimals(row.row.stc_marketcap_usd)}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Price'} />,
      accessor: 'stc_current_usd',
      Cell: row => <span>${numberWithCommasDecimals(row.row.stc_current_usd, 2)}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Use Case'} />,
      accessor: 'stc_use_case',
      Cell: row => <span>{row.row.stc_use_case}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Collateral'} />,
      accessor: 'stc_collateral',
      Cell: row => <span>{row.row.stc_collateral}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Platform/Blockchain'} />,
      accessor: 'stc_platform',
      Cell: row => <span>{row.row.stc_platform}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Launch Year'} />,
      accessor: 'stc_launch_year',
      Cell: row => <span>{numberWithCommasDecimals(row.row.stc_launch_year, 2)}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Volume 24 Hr/%'} />,
      accessor: 'stc_day_volume_change_usd',
      Cell: row => (
        <span
          style={{
            color: row.row.stc_day_volume_change_usd >= 0 ? 'green' : 'red'
          }}
        >
          {numberWithCommasDecimals(row.row.stc_day_volume_change_usd, 2)}%
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Volume 30D/%'} />,
      accessor: 'stc_30_day_volume_change_usd',
      Cell: row => (
        <span
          style={{
            color: row.row.stc_30_day_volume_change_usd >= 0 ? 'green' : 'red'
          }}
        >
          {numberWithCommasDecimals(row.row.stc_30_day_volume_change_usd, 2)}%
        </span>
      ),
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Volatility (30D)'} />,
      accessor: 'stc_volatility_30_usd',
      Cell: row => <span>{numberWithCommasDecimals(row.row.stc_volatility_30_usd, 2)}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Number of Pairs'} />,
      accessor: 'stc_num_of_pairs',
      Cell: row => <span>{numberWithCommasDecimals(row.row.stc_num_of_pairs, 6)}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    },
    {
      Header: () => <CustomTableHeader title={'Traded Exchanges'} />,
      accessor: 'stc_traded_exchanges',
      Cell: row => <span>{numberWithCommasDecimals(row.row.stc_traded_exchanges, 6)}</span>,
      sortMethod: (first, second) => first - second,
      width: '8%'
    }
  ];

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 30,
        background: '#fff',
        minHeight: 280,
        alignItems: 'right'
      }}
    >
      {coins.length > 0 ? (
        <div>
          <div
            className="row"
            style={{
              width: '100%',
              display: 'flex',
              padding: 0,
              margin: 0,
              paddingBottom: '20px'
            }}
          >
            <div className="col-sm-6 " style={{ textAlign: 'left', width: '100%', padding: '0px' }}>
              <span style={{ fontSize: '14pt' }}>STABLECOINS</span>
            </div>
          </div>
          <ReactTable
            data={coins.sort(numbericSort('stc_marketcap_usd'))}
            columns={coinColumns}
            showPagination={false}
            className="stableTable"
            loading={coins.length > 0 ? false : true}
            rowKey={coin => coin.coin_id}
            defaultPageSize={coins.length}
          />
        </div>
      ) : (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <span>
            <img src={loading} width="20" height="20" />
            Loading...
          </span>
        </div>
      )}
    </Content>
  );
};

