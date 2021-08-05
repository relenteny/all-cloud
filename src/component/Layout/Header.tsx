import {Box, Link, makeStyles} from "@material-ui/core";
import clsx from 'clsx'
import LogoButton from "../Button/LogoButton";

const useStyles = makeStyles(theme => ({
  header: {
    height: '64px',
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: '16px',
  },
  center: {
    paddingBottom: '4px',
  },
  left: {
    width: '300px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  right: {
    width: '300px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }
}))

const Header = () => {
  const classes = useStyles();

  return <Box display='flex' justifyContent='space-between' className={classes.header}>
    <Box alignItems='center' justifyContent='flex-start' className={clsx(classes.text, classes.left)}>
      <Link href={'https://www.superiorintegratedsystems.com'}>superiorintegratedsystems.com</Link>
    </Box>
    <Box display='flex' justifyContent='center' flexGrow={1} className={classes.center}>
      <LogoButton/>
    </Box>
    <Box alignItems='center' justifyContent='flex-end' className={clsx(classes.text, classes.right)}>
      <span>NI<sup style={{fontSize: '60%'}}>&reg;</sup>&nbsp;Alliance Partner</span>
    </Box>
  </Box>

}

export default Header
