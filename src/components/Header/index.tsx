import { ReactElement } from 'react'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import styles from './styles.module.scss'

interface Props {
  title: string
  button?: React.ReactNode | null
}

const Header = ({ title, button }: Props): ReactElement => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={styles.header}>

      <Grid item xs={6} sm={6} md={4}>
        <Typography variant="h6">
          {title}
        </Typography>
      </Grid>
      <Grid item sx={{ display: { sx: 'none' } }}>
        {button}
      </Grid>
    </Grid>

  )
}

export default Header
