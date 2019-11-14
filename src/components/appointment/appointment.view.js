import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import DoneIcon from '@material-ui/icons/Done'

import { useStyles } from './appointment.css'

AppointmentView.propTypes = {
  paging: PropTypes.shape({
    count: PropTypes.number,
    data: PropTypes.array,
    limit: PropTypes.number
  }),
  onChangePage: PropTypes.func,
  onActionClick: PropTypes.func
}

export default function AppointmentView(props) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [pending, setPending] = React.useState(true)
  const [rejected, setRejected] = React.useState(true)
  const [accepted, setAccepted] = React.useState(true)

  React.useEffect(() => {
    console.log(pending, accepted, rejected)

    const status = []
    if (pending) status.push('pending')
    if (rejected) status.push('rejected')
    if (accepted) status.push('accepted')

    onChangePage(page, status)
  }, [pending, rejected, accepted, page])

  const { data, count, limit } = props.paging
  const { onChangePage, onActionClick } = props
  const formatedData = createRows(data)

  const rowsPerPage = limit

  const columns = [
    { id: 'id', label: 'ID', minWidth: 200 },
    {
      id: 'buyer',
      label: 'Buyer',
      minWidth: 200,
      format: b => {
        return b.name + ' - ' + b.email
      }
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 100,
      format: d => {
        var date = new Date(d)
        return (
          date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
        )
      }
    },
    {
      id: 'timeslot',
      label: 'Time Slot',
      minWidth: 120
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 120,
      align: 'center',
      format: (value, id) => formatAction(value, id)
    }
  ]

  function createRows(data) {
    const formatedData = []
    data.forEach(appointment => {
      const { _id, buyer, date, timeslot, status } = appointment
      formatedData.push({
        id: _id,
        buyer,
        date,
        timeslot,
        status,
        action:
          status === 'rejected'
            ? ['accept']
            : status === 'accepted'
            ? ['reject']
            : ['accept', 'reject']
      })
    })
    return formatedData
  }

  function formatAction(value, id) {
    console.log('formatAction', value, id)
    return value.map((action, index) => {
      const color = action === 'reject' ? 'secondary' : 'primary'
      const status =
        action === 'reject'
          ? 'rejected'
          : action === 'accept'
          ? 'accepted'
          : 'pending'
      return (
        <Button
          key={index}
          variant="contained"
          color={color}
          className={classes.button}
          onClick={() => onActionClick(status, id)}
        >
          {action}
        </Button>
      )
    })
  }

  function handleChangePage(_event, newPage) {
    setPage(newPage)
  }

  function renderStatus() {
    return (
      <div>
        <Chip
          avatar={
            pending ? (
              <Avatar>
                <DoneIcon />
              </Avatar>
            ) : null
          }
          variant={pending ? 'default' : 'outlined'}
          color="primary"
          label="pending"
          onClick={e => {
            setPending(!pending)
          }}
          className={classes.chip}
        />

        <Chip
          avatar={
            accepted ? (
              <Avatar>
                <DoneIcon />
              </Avatar>
            ) : null
          }
          variant={accepted ? 'default' : 'outlined'}
          color="primary"
          label="accepted"
          onClick={e => {
            setAccepted(!accepted)
          }}
          className={classes.chip}
        />
        <Chip
          avatar={
            rejected ? (
              <Avatar>
                <DoneIcon />
              </Avatar>
            ) : null
          }
          variant={rejected ? 'default' : 'outlined'}
          color="primary"
          label="rejected"
          onClick={e => {
            setRejected(!rejected)
          }}
          className={classes.chip}
        />
      </div>
    )
  }

  return (
    <Paper className={classes.root}>
      {renderStatus()}
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formatedData.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value, row.id) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={handleChangePage}
      />
    </Paper>
  )
}
