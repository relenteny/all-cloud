import { Box, Paper, makeStyles } from '@material-ui/core'
import IconMenu from '../IconMenu/IconMenu'
import LogoButton from "../Button/LogoButton";

const useStyles = makeStyles(theme => ({
    landingPage: {
        backgroundImage: "url('image/page-bg.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        overflow: 'auto',
    },
    headerRow: {
        height: '100px',
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

    return <Box display='flex' justifyContent='center' alignItems='center' className={classes.landingPage}>
        <Paper elevation={5}>
            <Box className={classes.headerRow} flexDirection='row'>
                <Box display='flex' flexGrow={1} height='100%' justifyContent='center'>
                    <LogoButton/>
                </Box>
            </Box>
            <Box flexDirection='row' pt={4} pb={4}>
                <IconMenu />
            </Box>
        </Paper>
    </Box>
}

export default LandingPage