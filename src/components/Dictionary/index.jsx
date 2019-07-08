import React, { useState } from 'react';
// Layout
import { Layout, Icon, Input } from 'antd';
import { DICTIONARY_DATA } from '../../constants';
import ReactTable from 'react-table';
import './index.css';

const { Content } = Layout;

const Dictionary = React.memo(() => {
  const [filterText, setFilterText] = useState('');

  const coinColumns = [
    {
      Header: '',
      accessor: 'prefix',
      Cell: row => <span style={{ textAlign: 'left' }}>{row.value}</span>,
      width: '100'
    },
    {
      Header: 'Term',
      id: 'name',
      accessor: 'name',
      Cell: row => <span style={{ textAlign: 'left' }}>{row.value}</span>,
      width: '250'
    },
    {
      Header: 'Definition',
      id: 'definition',
      accessor: 'definition',
      Cell: row => <span style={{ textAlign: 'left' }}>{row.value}</span>,
      width: '100%'
    },
    {
      Header: 'Update TIme',
      id: 'updatetime',
      accessor: 'updatetime',
      Cell: row => <span style={{ textAlign: 'left' }}>{row.value}</span>,
      width: '200'
    }
  ];
  const searchOnChange = value => setFilterText(value);
  const searched = value =>
    DICTIONARY_DATA.filter(
      column =>
        column.name.toLowerCase().includes(value.toLowerCase()) ||
        column.definition.toLowerCase().includes(value.toLowerCase())
    );

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 30,
        background: '#fff',
        minHeight: 280
      }}
    >
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
            <span style={{ fontSize: '14pt' }}>DICTIONARY</span>
          </div>
          <div
            className="col-sm-6 "
            style={{
              justifyContent: 'flex-end',
              padding: 0,
              width: '100%',
              display: 'flex'
            }}
          >
            <Input
              placeholder="Search..."
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              style={{
                borderRadius: '4px',
                height: '30px',
                width: '250px',
                marginRight: '20px'
              }}
              onChange={event => searchOnChange(event.target.value)}
            />
          </div>
        </div>

        <div
          className="row"
          style={{
            width: '100%',
            display: 'flex',
            padding: 0,
            margin: 0,
            paddingBottom: '10px'
          }}
        >
          <span style={{ fontSize: '12pt' }}>
            The Following section is intended to describe the key metrics and parameters in use with DTRA’s Intelligence
            Platform, in order to provide a holistic analysis of the crypto markets
          </span>
        </div>
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
          <span style={{ fontSize: '10pt', fontWeight: 'bold' }}>Results({searched(filterText).length})</span>
        </div>
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
          <ReactTable
            data={searched(filterText)}
            className="dictionaryTable -striped -highlight"
            columns={coinColumns}
            showPagination={false}
            defaultSorted={[
              {
                id: 'prefix',
                desc: false
              }
            ]}
            defaultPageSize={12}
            pageSize={searched(filterText).length}
          />
        </div>
      </div>
    </Content>
  );
});

export default Dictionary;
