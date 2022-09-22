import React, { ReactElement } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import { IconButton } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditIcon from '@mui/icons-material/Edit'

interface Column {
  id: 'id' | 'alias' | 'name' | 'status' | 'market' | 'expirationDate' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => React.ReactNode
}

const columns: readonly Column[] = [
  { id: 'alias', label: 'Landing alias', minWidth: 170 },
  { id: 'name', label: 'Landing name', minWidth: 170 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    format: (value: string) => (
      <Chip
        label={value}
        size="small"
        color={value === 'active' ? 'success' : 'error'}/>
    )
  },
  { id: 'market', label: 'Market', minWidth: 100 },
  { id: 'expirationDate', label: 'Expiration date', minWidth: 200 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
]

interface Data {
  id: number
  alias: string
  name: string
  status: 'active' | 'disabled'
  market: string
  expirationDate?: string | undefined | null
  actions: JSX.Element
}

function createData (
  id: number,
  alias: string,
  name: string,
  status: 'active' | 'disabled',
  market: string,
  expirationDate: string | undefined | null
): Data {
  return {
    id,
    alias,
    name,
    status,
    market,
    expirationDate,
    actions: (
      <>
        <IconButton size="small" onClick={() => { console.log('open modal or sidepanel') }}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => { console.log('open modal or sidepanel') }}>
          <RemoveRedEyeIcon />
        </IconButton>
      </>
    )

  }
}

const rows = [
  createData(1, 'CrintianQA', 'qa', 'active', 'US', '04/02/2022 10:11:08'),
  createData(2, 'inactive', 'inactive', 'disabled', 'US', '15/03/2022 16:20:40'),
  createData(3, 'security', 'Security', 'disabled', 'US', null),
  createData(4, 'CrintianQA', 'qa', 'active', 'US', '04/02/2022 10:11:08'),
  createData(5, 'inactive', 'inactive', 'disabled', 'US', '15/03/2022 16:20:40'),
  createData(6, 'security', 'Security', 'disabled', 'US', null),
  createData(7, 'CrintianQA', 'qa', 'active', 'US', '04/02/2022 10:11:08'),
  createData(8, 'inactive', 'inactive', 'disabled', 'US', '15/03/2022 16:20:40'),
  createData(9, 'security', 'Security', 'disabled', 'US', null),
  createData(10, 'CrintianQA', 'qa', 'active', 'US', '04/02/2022 10:11:08'),
  createData(12, 'inactive', 'inactive', 'disabled', 'US', '15/03/2022 16:20:40'),
  createData(13, 'security', 'Security', 'disabled', 'US', null),
  createData(14, 'CrintianQA', 'qa', 'active', 'US', '04/02/2022 10:11:08'),
  createData(15, 'inactive', 'inactive', 'disabled', 'US', '15/03/2022 16:20:40'),
  createData(16, 'security', 'Security', 'disabled', 'US', null),
  createData(17, 'CrintianQA', 'qa', 'active', 'US', '04/02/2022 10:11:08'),
  createData(18, 'inactive', 'inactive', 'disabled', 'US', '15/03/2022 16:20:40'),
  createData(19, 'security', 'Security', 'disabled', 'US', null)
]

const List = (): ReactElement => {
  const [page, setPage] = React.useState(0)
  const rowsPerPage = 10

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(column.format != null) ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
}

export default List
