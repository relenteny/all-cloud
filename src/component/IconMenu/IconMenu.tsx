import { useHistory, withRouter } from 'react-router-dom'
import { Box, Grid, IconButton, makeStyles } from '@material-ui/core'
import TimerTwoToneIcon from '@material-ui/icons/TimerTwoTone';
import CompassCalibrationTwoToneIcon from '@material-ui/icons/CompassCalibrationTwoTone';
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone';
import ViewQuiltTwoToneIcon from '@material-ui/icons/ViewQuiltTwoTone';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.secondary.main,
        fontSize: '64px',
    },
    iconContainer: {
        '&:hover $icon': {
            color: theme.palette.secondary.light,
        }
    },
    title: {
        fontWeight: 600,
        fontSize: 24,
    },
    separatorRow: {
        paddingTop: 16,
        paddingBottom: 16,
    }
}))

const IconMenu = () => {
    const classes = useStyles();
    const history = useHistory();

    return <Box display='block'>
        <Box flexDirection='row'>
            <Grid container>
                <Grid className={classes.title} item xs={12}>
                    Leaderboards
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.iconContainer} onClick={() => history.push('/overall-score')}>
                        <BallotTwoToneIcon className={classes.icon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.iconContainer} onClick={() => history.push('/line-accuracy')}>
                        <CompassCalibrationTwoToneIcon className={classes.icon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.iconContainer} onClick={() => history.push('/time-trial')}>
                        <TimerTwoToneIcon className={classes.icon}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    Overall Score
                </Grid>
                <Grid item xs={4}>
                    Line Accuracy
                </Grid>
                <Grid item xs={4}>
                    Time Trial
                </Grid>
            </Grid>
        </Box>

        <Box className={classes.separatorRow} flexDirection='row'/>

        <Box flexDirection='row'>
            <Grid container>
                <Grid className={classes.title} item xs={12}>
                    Details
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.iconContainer} onClick={() => history.push('/trial-data')}>
                        <ViewQuiltTwoToneIcon className={classes.icon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.iconContainer}>
                        <AssessmentTwoToneIcon className={classes.icon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.iconContainer}>
                        <SearchTwoToneIcon className={classes.icon}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    Trial Data
                </Grid>
                <Grid item xs={4}>
                    Current Heat
                </Grid>
                <Grid item xs={4}>
                    Data Query
                </Grid>
            </Grid>
        </Box>
    </Box>
}

export default withRouter(IconMenu)