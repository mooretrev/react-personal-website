import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useApi from '../../hooks/useApi';
import { StockPositionModel } from '../../../../api/src/model/stockPosition'

export default function PreviousPositionsTable() {
  const [stockPositions, setStockPositions] = useState<StockPositionModel[]>([]);
  const {
    setContent,
    render,
    setLoading,
    setError,
  } = useApi()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/stockpositions')
        setStockPositions(response.data)
        setLoading(false)
      }
      catch (err) {
        setError(true)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const columns: GridColDef[] = [
    {
      field: 'ticker',
      headerName: 'Ticker',
      width: 150,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
    },
    {
      field: 'gainOrLoss',
      headerName: 'P&L',
      width: 150,
    },
    {
      field: 'closed',
      headerName: 'Closed',
      width: 150,
      type: 'boolean'
    },
    {
      field: 'totalExitPrice',
      headerName: 'Final Position Size',
      width: 150,
    },
    {
      field: 'totalEntryPrice',
      headerName: 'Initial Position Size',
      width: 150,
    },
    {
      field: 'entryPrice',
      headerName: 'Entry Price',
      width: 150,
    },
    {
      field: 'exitPrice',
      headerName: 'Exit Price',
      width: 150,
    },
    {
      field: 'gainOrLoss',
      headerName: 'P&L',
      width: 150,
    },
    {
      field: 'entryDate',
      headerName: 'Entry Date',
      width: 150,
      type: 'dateTime',
    },
    {
      field: 'exitDate',
      headerName: 'Exit Date',
      width: 150,
      type: 'dateTime',
    },
    {
      field: 'instrumentType',
      headerName: 'Instrument Type',
      width: 150,
    }];

  setContent(
    <DataGrid checkboxSelection style={{ height: '85vh' }} rows={stockPositions} columns={columns} />
  );

  return render();
}
