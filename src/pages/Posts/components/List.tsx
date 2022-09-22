/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect, ReactElement } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditIcon from '@mui/icons-material/Edit'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { useAppDispatch, useAppSelector } from 'hooks'
import { setUsers } from 'store/sliceUsers'
import { fetchUsers } from 'services/users'
import { useQuery } from '@tanstack/react-query'

import styles from '../styles.module.scss'
import { fetchPosts } from 'services/posts'
import { Post } from 'types'

interface Column {
  id: 'id' | 'userId' | 'title' | 'body' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => React.ReactNode
}

const List = (): ReactElement => {
  const rowsPerPage = 10
  const [page, setPage] = useState(0)

  const dispatch = useAppDispatch()
  const usersList = useAppSelector(state => state.users.list)
  const { data: users, isLoading: isLoadingUsers, isError } = useQuery(['users'], fetchUsers)
  const { data: posts } = useQuery(['posts'], async () => await fetchPosts(page))

  useEffect(() => {
    if (users && !isLoadingUsers) {
      dispatch(setUsers(users))
    }
  }, [users])

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage)
  }

  const rows = posts
    ? posts.map(({ id, userId, title, body }: Post) => {
      return {
        id,
        userId,
        title,
        body,
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
    })
    : []
  console.log('~ rows', rows)

  const columns: readonly Column[] = [
    {
      id: 'userId',
      label: 'Author',
      minWidth: 120,
      format: (value: number) => {
        const results = usersList.filter(user => {
          return user.id === value
        })
        if (results.length > 0) {
          return (
            <div>
              {results[0].username}
            </div>
          )
        }
        return null
      }
    },
    { id: 'title', label: 'Post title', minWidth: 170 },
    {
      id: 'body',
      label: 'Content',
      minWidth: 300,
      format: (value: string) => (
        <Typography>
          {value.substring(0, 100)}...
        </Typography>
      )
    },
    { id: 'actions', label: 'Actions', minWidth: 100 }
  ]

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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {rows && rows.map((post: Post) => {
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
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
}

export default List
