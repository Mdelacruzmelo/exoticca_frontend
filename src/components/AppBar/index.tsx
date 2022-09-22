import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import { ReactElement } from 'react'
import { useAppDispatch } from 'hooks'
import { toggle } from 'store/sliceDrawer'

const drawerWidth = 240

interface Props {
  children: JSX.Element
}

const CustomAppBar = ({ children }: Props): ReactElement => {
  const dispatch = useAppDispatch()

  return (

    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => { dispatch(toggle()) }}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>

  )
}

export default CustomAppBar
