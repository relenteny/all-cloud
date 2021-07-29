import React from 'react'
import { Box, Paper, makeStyles } from '@material-ui/core'
import IconMenu from '../IconMenu/IconMenu'
import SisLogo from '../../image/sis-logo.png'

const useStyles = makeStyles(theme => ({
    headerRow: {
        padding: 4,
        borderBottomStyle: 'solid',
        borderBottom: 2,
        borderBottomColor: theme.palette.primary.light,
    },
    menuRow: {
        paddingTop: 4,
        paddingBottom: 4,
    },
}))

const LandingPage = () => {
    const classes = useStyles();

    return <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <Paper elevation={5}>
            <Box className={classes.headerRow} flexDirection='row'>
                <Box display='flex'>
                    <img src={SisLogo} alt=''/>
                </Box>
            </Box>
            <Box flexDirection='row' pt={4} pb={4}>
                <IconMenu />
            </Box>
            <Box flexDirection='row'>
                Footer
            </Box>
        </Paper>
    </Box>
}

export default LandingPage