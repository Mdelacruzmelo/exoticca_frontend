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
  { id: 'status', label: 'Status', minWidth: 100, format: (value: string) => <Chip label={value}/> },
  { id: 'market', label: 'Market', minWidth: 100 },
  { id: 'expirationDate', label: 'Expiration date', minWidth: 200 },
  { id: 'actions', label: 'Actions', minWidth: 60 }
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
    actions: (<div>
      <div>
          div
      </div>

        DIV
    </div>
    )

  }
}

const rows = [
  createData(1, 'CrintianQA', 'qa', 'disabled', 'US', '04/02/2022 10:11:08'),
  createData(2, 'inactive', 'inactive', 'disabled', 'US', '15/03/2022 16:20:40'),
  createData(3, 'security', 'Security', 'disabled', 'US', null)
]

const List = (): ReactElement => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default List
