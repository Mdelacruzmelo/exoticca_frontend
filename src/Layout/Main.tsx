import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { ReactElement } from 'react'
import { CustomAppBar, CustomDrawer } from '../components'

const drawerWidth = 240

interface Props {
  children: React.ReactNode
}

const Page = ({ children }: Props): ReactElement => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <CustomAppBar>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/">
            Dashboard
          </Link>
          <Typography color="text.primary">Landing</Typography>
        </Breadcrumbs>
      </CustomAppBar>

      <CustomDrawer />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Page
