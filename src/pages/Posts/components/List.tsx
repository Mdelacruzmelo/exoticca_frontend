/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect, ReactElement } from 'react'

import {
  Alert,
  AlertTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  CircularProgress
} from '@mui/material'

import { useAppDispatch, useAppSelector } from 'hooks'
import { setUsers } from 'store/sliceUsers'
import { fetchUsers } from 'services/users'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from 'services/posts'
import { Post } from 'types'
import { getPostColumns, getPostRows } from '../utils'
import { LIMIT_PAGE } from 'const'
import DataNotFound from './DataNotFound'
import styles from '../styles.module.scss'

const List = (): ReactElement => {
  // Local state
  const [page, setPage] = useState(0)

  // Global state
  const dispatch = useAppDispatch()
  const usersList = useAppSelector(state => state.users.list)
  const postFilter = useAppSelector(state => state.posts.filter)

  // React query
  const { data: users, isLoading: isLoadingUsers, isError } = useQuery(['users'], fetchUsers)
  const { data: posts } = useQuery(['posts', postFilter], async () => await fetchPosts(postFilter))

  useEffect(() => {
    if (users && !isLoadingUsers) {
      dispatch(setUsers(users))
    }
  }, [users])

  const rows = getPostRows(posts)
  const columns = getPostColumns(usersList)

  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        There was an error trying to load the data
      </Alert>
    )
  }

  if (isLoadingUsers) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
      <TableContainer sx={{ maxHeight: 640 }}>

        <Table stickyHeader aria-label="sticky table" className={styles.table}>
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
            {!isLoadingUsers && rows.length === 0 && (
              <Box sx={{ display: 'flex' }}>
                <DataNotFound />
              </Box>
            )
            }
            {rows && (rows.slice(page * LIMIT_PAGE, page * LIMIT_PAGE + LIMIT_PAGE)).map((post: Post) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={post.id}>
                  {columns.map((column) => {
                    const value = post[column.id]
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
        rowsPerPage={LIMIT_PAGE}
        page={page}
        onPageChange={(_: unknown, newPage: number): void => {
          setPage(newPage)
        }}
      />
    </Paper>
  )
}

export default List
