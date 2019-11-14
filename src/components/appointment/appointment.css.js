import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  tableWrapper: {
    maxHeight: 500,
    overflow: 'auto'
  },
  chip: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}))
