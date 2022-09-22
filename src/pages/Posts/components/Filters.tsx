/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, ReactElement } from 'react'
import { Button, Grid, InputLabel, MenuItem, TextField, Select, FormControl } from '@mui/material'
import styles from '../styles.module.scss'
import { useAppDispatch, useAppSelector } from 'hooks'
import { User } from 'types'
import { setPostFilter } from 'store/slicePosts'

const Filters = (): ReactElement<any, any> | null => {
  const dispatch = useAppDispatch()
  const usersList = useAppSelector(state => state.users.list)
  const [authorId, setAuthorId] = useState<number | null>(null)
  const [title, setTitle] = useState<string | null>(null)

  return (

    <Grid
      sx={{ pl: 0, pt: 0, p: 2 }}
      container
      spacing={2}
      direction="row"
      alignItems="center"
      className={styles.filtersContainer}>

      <Grid item>
        <TextField
          value={title}
          label="Search posts"
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
          onChange={(event) => {
            setTitle(event.target.value || null)
          }}
        />
      </Grid>

      <Grid item>
        <FormControl>
          <InputLabel className={styles.inputLabel}>Author</InputLabel>
          <Select
            label="Author"
            value={authorId}
            onChange={(event) => { setAuthorId(event.target.value ? +(event.target.value) : null) }}
            size="small"
            sx={{ width: 200 }}>
            {usersList &&
            usersList.length > 0 &&
            usersList.map((user: User) => {
              return (
                <MenuItem
                  key={user.id}
                  value={user.id}>
                  {user.username}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setPostFilter({ title, authorId }))
          }} >
          Search
        </Button>
      </Grid>

      <Grid item>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            setAuthorId(null)
            setTitle('')
            dispatch(setPostFilter({ title: null, authorId: null }))
          }}>
          Reset all
        </Button>
      </Grid>

    </Grid>
  )
}

export default Filters
