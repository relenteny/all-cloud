import {Box, makeStyles, Table, TableContainer, withWidth} from '@material-ui/core'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {DetailProps, LeaderBoardDetail} from './LeaderboardValue'
import {HeaderProps, LeaderboardHeader} from './LeaderboardHeader'

const useStyles = makeStyles(theme => ({
  leaderboard: {
    backgroundColor: 'transparent',
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
      fontSize: '20px'
    },
  },
}))

interface LeaderBoardConfiguration extends RouteComponentProps {
  title: string
  width: string
  detail: DetailProps
  header: HeaderProps
}

export const Leaderboard = (configuration: LeaderBoardConfiguration) => {
  const classes = useStyles()
  const breakpoint = configuration.width

  return <Box display='block'>
    <Box display='block' className={classes.leaderboard}>
      <Box display='flex' flexGrow={1} justifyContent='center' className={classes.title}>{configuration.title}</Box>
      <TableContainer>
        <Table>
          <LeaderboardHeader {...configuration.header} breakpoint={breakpoint} />
          <LeaderBoardDetail {...configuration.detail} breakpoint={breakpoint}/>
        </Table>
      </TableContainer>
    </Box>
  </Box>
}

export default withRouter(withWidth()(Leaderboard))
