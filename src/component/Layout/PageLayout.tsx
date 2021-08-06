import React from "react";
import {Box, makeStyles, Paper} from '@material-ui/core'
import Header from "./Header";

const useStyles = makeStyles(theme => ({
  pageLayout: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  paper: {
    padding: '16px',
    width: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(255, 255, 255, .85)',
    [theme.breakpoints.down('sm')]: {
      padding: '8px'
    },
  }
}))


const PageLayout = <P extends object>(Component: React.ComponentType<P>) => {
  const classes = useStyles()

  return (props: P) => (<Box className={classes.pageLayout}>
        <Paper elevation={4} className={classes.paper}>
          <Header/>
          <Component {...props as P}/>
        </Paper>
      </Box>
  )
}

export default PageLayout