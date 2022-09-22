import React, { ReactElement } from 'react'
import { Button, Grid, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'

import styles from '../styles.module.scss'

const Filters = (): ReactElement<any, any> | null => {
  const [sortBy, setSortBy] = React.useState<string | undefined>()
  const [status, setStatus] = React.useState<string | undefined>()
  const [market, setMarket] = React.useState<string | undefined>()

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
          label="Search landings"
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
            <MenuItem value="last_updated">Last updated</MenuItem>
            <MenuItem value="alias">Landing alias</MenuItem>
            <MenuItem value="name">Landing name</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl>
          <InputLabel className={styles.inputLabel}>Status</InputLabel>
          <Select
            label="Status"
            value={status}
            onChange={(event) => { setStatus(event.target.value) }}
            size="small"
            sx={{ width: 200 }}>
            <MenuItem value="">-</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl>
          <InputLabel className={styles.inputLabel}>Market</InputLabel>
          <Select
            label="Market"
            value={market}
            onChange={(event) => { setMarket(event.target.value) }}
            size="small"
            sx={{ width: 200 }}>
            <MenuItem value="">-</MenuItem>
            <MenuItem value="US">US</MenuItem>
            <MenuItem value="ES">ES</MenuItem>
            <MenuItem value="CA">CA</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <Button variant="contained" size="small">Search</Button>
      </Grid>

      <Grid item>
        <Button variant="text" size="small">Reset all</Button>
      </Grid>

    </Grid>
  )
}

export default Filters
