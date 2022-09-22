import React from 'react'
import { Grid } from '@mui/material'
import styles from '../styles.module.scss'

const DataNotFound: React.FC = () => {
  return (
    <Grid
      sx={{ flexGrow: 1 }}
      container
      justifyContent="center">
      <Grid item className={styles.notFound}>
        Data not found
      </Grid>
    </Grid>
  )
}

export default DataNotFound
