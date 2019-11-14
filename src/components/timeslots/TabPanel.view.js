import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useStyles } from './TabPanel.css'
import TimeChips from './TimeChips.view.'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

TabPanelView.propTypes = {
  chips: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`
  }
}

export default function TabPanelView(props) {
  const classes = useStyles()
  const theme = useTheme()

  const { chips, onChange, tabs } = props

  console.log('chips=>', chips)

  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  function handleChangeIndex(index) {
    setValue(index)
  }

  function getChipBy(index) {
    if (chips) {
      const found = chips.filter(chip => {
        return chip.day === index
      })

      if (found && found[0]) return found[0]
    }

    return {
      day: index,
      slots: []
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="action tabs example"
        >
          {tabs.map((tab, index) => {
            return <Tab key={index} label={tab} {...a11yProps(index)} />
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {// Display days of week as tabs
        tabs.map((tab, index) => {
          return (
            <TabPanel
              key={index}
              value={value}
              index={index}
              dir={theme.direction}
            >
              {
                // Display seller time slots in chips form
                <TimeChips
                  chip={getChipBy(index)}
                  onChange={data => {
                    onChange(data)
                  }}
                />
              }
            </TabPanel>
          )
        })}
      </SwipeableViews>
    </div>
  )
}
