import {Box, makeStyles, Paper, useTheme, withTheme} from '@material-ui/core'
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import clsx from 'clsx';
import moment from 'moment';
import {formatFloat} from '../../util/Utils'
import PageLayout from "../Layout/PageLayout";

const data = [{time: 1627306371, gs: 4, accuracy: 10, forwardTrigger: 90, reverseTrigger: 75},
  {time: 1627307564, gs: 2, accuracy: 7, forwardTrigger: 80, reverseTrigger: 20},
  {time: 1627308678, gs: 3, accuracy: 8, forwardTrigger: 60, reverseTrigger: 80},
  {time: 1627309865, gs: 1, accuracy: 12, forwardTrigger: 50, reverseTrigger: 90},
]

const useStyles = makeStyles(theme => ({
  page: {
    height: '100%',
  },
  title: {
    fontSize: '36px',
    fontWeight: 600,
    color: 'white',
    padding: 4,
    marginBottom: 12,
    backgroundColor: theme.palette.secondary.dark,
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px'
    },
  },
  tileContainer: {
    width: '80%',
    margin: 'auto',
  },
  tile: {
    backgroundColor: theme.palette.primary.main,
    margin: 8,
  },
  tileTitle: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 500,
    marginLeft: 4,
    marginRight: 4,
    padding: 8,
    borderBottomColor: 'white',
    borderBottomStyle: 'solid',
  },
  tileRow: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 400,
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
  },
  tileBorder: {
    borderBottomColor: 'white',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  tileRowTitle: {
    width: '40%',
  },
  chartContainer: {
    height: '100%',
    paddingTop: '16px',
  },
  chartTitle: {
    color: 'black',
    fontSize: '18px',
    fontWeight: 500,
    paddingTop: 8,
    paddingBottom: 8,
    margin: 8,
    backgroundColor: theme.palette.primary.dark,
  }
}))

const renderTimeTick = (tickItem: moment.MomentInput) => {
  return moment(tickItem).format('MM:SS')
}

const TrialData = () => {
  const classes = useStyles();
  const theme = useTheme();

  function buildTrialData() {
    return <Box display='block' className={classes.page}>
      <Box display='flex' flexGrow={1} justifyContent='center' className={classes.title}>Trial Data</Box>
      <Box>
        <Paper elevation={4}>
          <Box display='flex' className={classes.tileContainer} justifyContent='center'>
            <Box className={classes.tile} display='flex' flexDirection='column' flexGrow={1}>
              <Box display='flex' justifyContent='center' className={classes.tileTitle}>Rankings</Box>
              <Box display='flex' flexDirection='column'>
                <Box display='flex' className={clsx(classes.tileRow, classes.tileBorder)}>
                  <Box display='flex' justifyContent='flex-start' className={classes.tileRowTitle}>Overall:</Box>
                  <Box display='flex' justifyContent='flex-start'>3</Box>
                </Box>
                <Box display='flex' className={clsx(classes.tileRow, classes.tileBorder)}>
                  <Box display='flex' justifyContent='flex-start' className={classes.tileRowTitle}>Heat:</Box>
                  <Box display='flex' justifyContent='flex-start'>1</Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.tile} display='flex' flexDirection='column' flexGrow={1}>
              <Box display='flex' justifyContent='center' className={classes.tileTitle}>Times</Box>
              <Box display='flex' flexDirection='column'>
                <Box display='flex' className={clsx(classes.tileRow, classes.tileBorder)}>
                  <Box display='flex' justifyContent='flex-start' className={classes.tileRowTitle}>Lap 1:</Box>
                  <Box display='flex' justifyContent='flex-start'>{formatFloat(30.659)}</Box>
                </Box>
                <Box display='flex' className={clsx(classes.tileRow, classes.tileBorder)}>
                  <Box display='flex' justifyContent='flex-start' className={classes.tileRowTitle}>Lap 2:</Box>
                  <Box display='flex' justifyContent='flex-start'>{formatFloat(29.453)}</Box>
                </Box>
                <Box display='flex' className={classes.tileRow}>
                  <Box display='flex' justifyContent='flex-start' className={classes.tileRowTitle}>Overall:</Box>
                  <Box display='flex' justifyContent='flex-start'>{formatFloat(60.112)}</Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.tile} display='flex' flexDirection='column' flexGrow={1}>
              <Box display='flex' justifyContent='center' className={classes.tileTitle}>Other</Box>
              <Box display='flex' flexDirection='column'>
                <Box display='flex' className={clsx(classes.tileRow, classes.tileBorder)}>
                  <Box display='flex' justifyContent='flex-start' className={classes.tileRowTitle}>Line Accuracy:</Box>
                  <Box>20</Box>
                </Box>
                <Box display='flex' className={clsx(classes.tileRow, classes.tileBorder)}>
                  <Box display='flex' justifyContent='flex-start' className={classes.tileRowTitle}>Hits:</Box>
                  <Box display='flex' justifyContent='flex-start'>5</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box className={classes.chartContainer}>
        <Paper elevation={4}>
          <Box display='flex'>
            <Box display='flex' flexGrow={1} flexDirection='column'>
              <Box display='flex' justifyContent='center' className={classes.chartTitle}>Line Accuracy</Box>
              <Box display='flex' justifyContent='center'>
                <ResponsiveContainer width='90%' height={225}>
                  <LineChart data={data}>
                    <Line name='Accuracy' type='monotone' dataKey='accuracy' stroke={theme.palette.primary.main}/>
                    <CartesianGrid stroke='#ccc'/>
                    <XAxis dataKey='time' tickFormatter={renderTimeTick}/>
                    <YAxis/>
                    <Tooltip labelFormatter={value => renderTimeTick(value)}/>
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            <Box display='flex' flexGrow={1} flexDirection='column'>
              <Box display='flex' justifyContent='center' className={classes.chartTitle}>Triggers</Box>
              <Box display='flex' justifyContent='center'>
                <ResponsiveContainer width='90%' height={225}>
                  <LineChart data={data}>
                    <Line name='Forward' type='monotone' dataKey='forwardTrigger' stroke={theme.palette.primary.main}/>
                    <Line name='Reverse' type='monotone' dataKey='reverseTrigger' stroke={theme.palette.secondary.dark}/>
                    <CartesianGrid stroke='#ccc'/>
                    <XAxis dataKey='time' tickFormatter={renderTimeTick}/>
                    <YAxis/>
                    <Legend/>
                    <Tooltip labelFormatter={value => renderTimeTick(value)}/>
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            <Box display='flex' flexGrow={1} flexDirection='column'>
              <Box display='flex' justifyContent='center' className={classes.chartTitle}>G Forces</Box>
              <Box display='flex' justifyContent='center'>
                <ResponsiveContainer width='90%' height={225}>
                  <LineChart data={data}>
                    <Line name='G Force' type='monotone' dataKey='gs' stroke={theme.palette.primary.main}/>
                    <CartesianGrid stroke='#ccc'/>
                    <XAxis dataKey='time' tickFormatter={renderTimeTick}/>
                    <YAxis/>
                    <Tooltip labelFormatter={value => renderTimeTick(value)}/>
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  }

  const WrappedTrialData = PageLayout(buildTrialData)

  return <WrappedTrialData/>
}

export default withTheme(TrialData)