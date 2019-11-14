import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PropTypes from 'prop-types'
import { useStyles } from './login.css'

SignInSide.propTypes = {
  doLogin: PropTypes.func.isRequired,
  error: PropTypes.any
}

export default function SignInSide(props) {
  const classes = useStyles()
  const [remenber, setRemember] = React.useState(true)
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  const { doLogin, error } = props

  const handleOnCheck = event => {
    setRemember(event.target.checked)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = () => {
    doLogin(email, password)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />{' '}
            <TextField
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />{' '}
            <FormControlLabel
              control={
                <Checkbox
                  disabled
                  checked={remenber}
                  onChange={handleOnCheck}
                  color="primary"
                />
              }
              label="Remember me"
            />{' '}
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              {error && (
                <Typography color="secondary" align="center">
                  {error instanceof String ? error : error.message}
                </Typography>
              )}
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/yassine-aittahar">
        Yassine Ait Tahar{' '}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
