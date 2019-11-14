import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  addPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    margin: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  chip: {
    margin: theme.spacing(1)
  }
}))
