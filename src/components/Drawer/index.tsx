import React, { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useAppDispatch, useAppSelector } from 'hooks'
import { toggle } from 'store/sliceDrawer'
import Collapse from '@mui/material/Collapse'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import { ListSubheader } from '@mui/material'
import styles from './styles.module.scss'
import EventNoteIcon from '@mui/icons-material/EventNote'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import RoomServiceIcon from '@mui/icons-material/RoomService'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat'
import GroupIcon from '@mui/icons-material/Group'

const drawerWidth = 240

interface Props {
  window?: () => Window
}

const CustomDrawer = (props: Props): ReactElement<any, any> | null => {
  const { window } = props
  const dispatch = useAppDispatch()
  const mobileOpen = useAppSelector(state => state.drawer.opened)

  const [open, setOpen] = React.useState<string>('')

  const drawer = (
    <div>

      <List subheader={
        <ListSubheader className={styles.textUpper}>
          Products
        </ListSubheader>
      }>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        {/* Departures */}
        <ListItemButton onClick={() => { setOpen('departures') }}>
          <ListItemIcon>
            <FlightTakeoffIcon />
          </ListItemIcon>
          <ListItemText primary="Departures" />
          {open === 'departures' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open === 'departures'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Flights */}
        <ListItemButton onClick={() => { setOpen('flights') }}>
          <ListItemIcon>
            <AirplanemodeActiveIcon />
          </ListItemIcon>
          <ListItemText primary="Flights" />
          {open === 'flights' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open === 'flights'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>

      </List>

      <List
        subheader={
          <ListSubheader className={styles.textUpper}>
          Bookings
          </ListSubheader>
        }>

        {/* Bookings */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Flights" />
          </ListItemButton>
        </ListItem>

        {/* Carts */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Carts" />
          </ListItemButton>
        </ListItem>

        {/* Clients */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItemButton>
        </ListItem>

        {/* Wallets */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Wallets" />
          </ListItemButton>
        </ListItem>

      </List>

      <List
        subheader={
          <ListSubheader className={styles.textUpper}>
          Providers
          </ListSubheader>
        }>

        {/* Providers */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Providers" />
          </ListItemButton>
        </ListItem>

        {/* Services */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RoomServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
        </ListItem>

        {/* Groups */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItemButton>
        </ListItem>

        {/* Hotels */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AirlineSeatFlatIcon />
            </ListItemIcon>
            <ListItemText primary="Hotels" />
          </ListItemButton>
        </ListItem>

        {/* Others */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MoreHorizIcon />
            </ListItemIcon>
            <ListItemText primary="Others" />
          </ListItemButton>
        </ListItem>

      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={() => { dispatch(toggle()) }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>

  )
}

export default CustomDrawer
