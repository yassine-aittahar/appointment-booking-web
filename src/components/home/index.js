import React from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import AlarmIcon from '@material-ui/icons/AlarmAdd'
import { useStyles } from './drawer.css'
import Appointment from '../appointment/appointment.container'
import TimeSlotsComponent from '../timeslots'
import store from '../../store'

export default function MiniDrawer() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [menu, setMenu] = React.useState(0)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {menu === 0 ? 'Appointments' : 'Define Available Time Slots'}{' '}
          </Typography>
          <div className={classes.grow} />
          <Button
            color="inherit"
            onClick={() => {
              store.dispatch.auth.logout()
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => setMenu(0)}>
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>

          <ListItem button onClick={() => setMenu(1)}>
            <ListItemIcon>
              <AlarmIcon />
            </ListItemIcon>
            <ListItemText primary="Time Slots" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {menu === 0 && <Appointment />}
        {menu === 1 && <TimeSlotsComponent />}
      </main>
    </div>
  )
}
