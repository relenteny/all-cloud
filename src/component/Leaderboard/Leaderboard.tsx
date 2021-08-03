import React from 'react'
import { Box, makeStyles, Table, TableContainer } from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { DetailProps, LeaderBoardDetail } from './LeaderboardValue'
import { LeaderboardHeader, HeaderProps } from './LeaderboardHeader'

const useStyles = makeStyles(theme => ({
    leaderboard: {
        backgroundColor: theme.palette.primary.light,
    },
    title: {
        fontSize: '36px',
        fontWeight: 600,
        color: 'white',
        padding: 4,
        marginBottom: 12,
        backgroundColor: theme.palette.secondary.dark,
        border: 'none'
    },
}))

interface LeaderBoardConfiguration extends RouteComponentProps {
    title: string
    detail: DetailProps
    header: HeaderProps
}

export const Leaderboard = (configuration: LeaderBoardConfiguration) => {
    const classes = useStyles()

    return <Box display='block'>
        <Box display='flex'>Header</Box>
        <Box display='block' className={classes.leaderboard}>
            <Box display='flex' flexGrow={1} justifyContent='center' className={classes.title}>{configuration.title}</Box>
            <TableContainer component={Box}>
                <Table>
                    <LeaderboardHeader {...configuration.header}/>
                    <LeaderBoardDetail {...configuration.detail}/>
                </Table>
            </TableContainer>
        </Box>
        <Box display='flex'>Footer</Box>
    </Box>
}

export default withRouter(Leaderboard)