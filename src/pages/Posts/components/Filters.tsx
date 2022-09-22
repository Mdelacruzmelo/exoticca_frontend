/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactElement } from 'react'
import { Button, Grid, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'

import styles from '../styles.module.scss'
import { useQuery } from '@tanstack/react-query'

const Filters = (): ReactElement<any, any> | null => {
  const [sortBy, setSortBy] = React.useState<string | undefined>()

  const fetchData = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=10&page=0'
    )
    return await response.json()
  }

  const { data } = useQuery(['posts'], fetchData, { staleTime: 2000 })
  console.log('~ data', data)

  return (

    <Grid
      sx={{ pl: 0, pt: 0 }}
      container
      spacing={2}
      direction="row"
      alignItems="center"
      className={styles.filtersContainer}>

      <Grid item>
        <TextField
          label="Search posts"
          variant="outlined"
          size="small"
          sx={{ width: 200 }}/>
      </Grid>

      <Grid item>
        <FormControl>
          <InputLabel className={styles.inputLabel}>Sort by</InputLabel>
          <Select
            label="sortBy"
            value={sortBy}
            onChange={(event) => { setSortBy(event.target.value) }}
            size="small"
            sx={{ width: 200 }}>
            <MenuItem value="">-</MenuItem>
            <MenuItem value="title">title</MenuItem>
            <MenuItem value="user">user</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <Button variant="contained">Search</Button>
      </Grid>

      <Grid item>
        <Button variant="text" size="small">Reset all</Button>
      </Grid>

    </Grid>
  )
}

export default Filters
