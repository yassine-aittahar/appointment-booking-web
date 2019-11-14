import React from 'react'
import Chip from '@material-ui/core/Chip'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from './TimeChips.css'

TimeChips.propTypes = {
  chip: PropTypes.shape({
    slots: PropTypes.arrayOf(PropTypes.string).isRequired,
    day: PropTypes.number.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

export default function TimeChips(props) {
  const classes = useStyles()
  const { chip, onChange } = props
  const [time, setTime] = React.useState('')
  const handleDelete = chipToDelete => () => {
    chip.slots = chip.slots.filter(s => s !== chipToDelete)
    onChange(chip)
  }

  const handleAdd = () => {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
    if (time && time.match(regex)) {
      if (chip.slots.indexOf(time) > -1) {
        alert(time + ' Exisits')
      } else {
        chip.slots.push(time)
        onChange(chip)
      }
    } else {
      alert('Add valid time slot HH:MM')
    }
  }

  function handleChange(event, newData) {
    setTime(event.target.value)
  }

  function keyDown(event) {
    if (event.keyCode === 13) {
      console.log('value', event.target.value)
      handleAdd()
    }
  }

  return (
    <div>
      {chip &&
        chip.slots &&
        chip.slots.sort().map((d, index) => {
          return (
            <Chip
              color="secondary"
              size="medium"
              key={index}
              label={d}
              onDelete={handleDelete(d)}
              className={classes.chip}
            />
          )
        })}

      <Paper className={classes.addPaper}>
        <InputBase
          onKeyDown={keyDown}
          inputProps={{ pattern: '[0-23]:[0-59]' }}
          className={classes.input}
          value={time}
          onChange={handleChange}
          placeholder="HH:MM"
        />
        <IconButton className={classes.iconButton} onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
