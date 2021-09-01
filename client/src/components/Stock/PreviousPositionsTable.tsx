import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Card from '@material-ui/core/Card'
import { DataGrid } from '@mui/x-data-grid';
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

  const columns = [
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
      field: 'finalPositionSize',
      headerName: 'Final Position Size',
      width: 150,
    },
    {
      field: 'initialPositionSize',
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
      field: 'initialPositionSize',
      headerName: 'Initial Position Size',
      width: 150,
    },
    {
      field: 'finalPositionSize',
      headerName: 'Final Position Size',
      width: 150,
    },
    {
      field: 'entryDate',
      headerName: 'Entry Date',
      width: 150
    },
    {
      field: 'exitDate',
      headerName: 'Exit Date',
      width: 150,
    },
    {
      field: 'instrumentType',
      headerName: 'Instrument Type',
      width: 150,
    }];

  setContent(
    <DataGrid style={{ height: 400 }} rows={stockPositions} columns={columns} />
  );

  return render();
}
