import {Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  logoButton: {
    width: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '150px'
    },
    height: 'auto',
    backgroundImage: 'url(image/sis-logo.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
}))

const LogoButton = () => {
  const classes = useStyles()

  return <Button className={classes.logoButton} onClick={() => (window.location.href='https://www.superiorintegratedsystems.com')}/>
}

export default LogoButton