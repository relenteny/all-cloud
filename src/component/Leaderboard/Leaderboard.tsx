import React from 'react'
import { Box, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom'
import clsx from 'clsx';
import { formatFloat } from '../../util/Utils'

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
    tableHeadingRow: {
        padding: 4,
        backgroundColor: theme.palette.primary.dark,
        border: 'none'
    },
    tableHeadingCell: {
        padding: 4,
        border: 'none'
    },
    tableCell: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 6,
        paddingBottom: 6,
        border: 0,
    },
    heading: {
        fontSize: '24px',
        fontWeight: 600,
        color: 'black',
    },
    secondaryHeading: {
        fontSize: '16px',
        fontWeight: 400,
    },
    driverHeading: {
        paddingLeft: 12,
    },
    driverRow: {
        background: 'transparent',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    firstDriverRow: {
        paddingTop: 12,
    },
    valueContainer: {
        height: '42px',
        borderLeftStyle: 'solid',
        borderLeftWidth: 2,
        paddingLeft: 12,
        paddingRight: 12,
        fontSize: '24px',
        fontWeight: 600,
        color: 'white',
        backgroundColor: theme.palette.primary.main,
    },
    positionContainer: {
        borderLeftWidth: 0,
    },
    totalContainer: {
        backgroundColor: theme.palette.secondary.light,
    },
    lapValue: {
        fontSize: '18px',
        fontWeight: 400,
    },
}))

function createData(position: number, driver: string, lap1Overall: string, lap1Trap: string, lap2Overall: string, lap2Trap: string, total: string) {
    return { position, driver, lap1Overall, lap1Trap, lap2Overall, lap2Trap, total };
}

const rows = [
    createData(1, 'John Doe', formatFloat(30.659), formatFloat(5.236), formatFloat(29.453), formatFloat(6.12), formatFloat(60.112)),
    createData(2, 'Jane Smith', formatFloat(31.630), formatFloat(4.652), formatFloat(28.539), formatFloat(5.459), formatFloat(60.169)),
];

interface LeaderBoardConfiguration extends RouteComponentProps {
    title: string
}

const Leaderboard = (configuration: LeaderBoardConfiguration) => {
    const classes = useStyles();
    const history = useHistory();

    return <Box display='block'>
        <Box display='flex'>Header</Box>
        <Box display='block' className={classes.leaderboard}>
            <Box display='flex' flexGrow={1} justifyContent='center' className={classes.title}>{configuration.title}</Box>
            <TableContainer component={Box}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.tableHeadingRow}>
                            <TableCell rowSpan={2} width='5%' className={classes.tableHeadingCell}></TableCell>
                            <TableCell rowSpan={2} width='40%' className={classes.tableHeadingCell}>
                                <Box className={clsx(classes.heading, classes.driverHeading)}>Driver</Box>
                            </TableCell>
                            <TableCell colSpan={2} align='center' className={classes.tableHeadingCell}>
                                <Box className={classes.heading}>Lap 1</Box>
                            </TableCell>
                            <TableCell colSpan={2} align='center' className={classes.tableHeadingCell}>
                                <Box className={classes.heading}>Lap 2</Box>
                            </TableCell>
                            <TableCell rowSpan={2} align='center' className={classes.tableHeadingCell}>
                                <Box className={classes.heading}>Time</Box>
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.tableHeadingRow}>
                            <TableCell align='center' width='10%' className={classes.tableHeadingCell}>
                                <Box className={clsx(classes.heading, classes.secondaryHeading)}>Overall</Box>
                            </TableCell>
                            <TableCell align='center' width='10%' className={classes.tableHeadingCell}>
                                <Box className={clsx(classes.heading, classes.secondaryHeading)}>Speed Trap</Box>
                            </TableCell>
                            <TableCell align='center' width='10%' className={classes.tableHeadingCell}>
                                <Box className={clsx(classes.heading, classes.secondaryHeading)}>Overall</Box>
                            </TableCell>
                            <TableCell align='center' width='10%' className={classes.tableHeadingCell}>
                                <Box className={clsx(classes.heading, classes.secondaryHeading)}>Speed Trap</Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow component={Box} className={classes.driverRow} onClick={() => history.push('/trial-data')}>
                                <TableCell className={index > 0 ? classes.tableCell : clsx(classes.tableCell, classes.firstDriverRow)}>
                                    <Box display='flex' alignItems='center' className={clsx(classes.valueContainer, classes.positionContainer)}>{row.position}</Box>
                                </TableCell>
                                <TableCell className={index > 0 ? classes.tableCell : clsx(classes.tableCell, classes.firstDriverRow)}>
                                    <Box display='flex' alignItems='center' className={classes.valueContainer}>{row.driver}</Box>
                                </TableCell>
                                <TableCell component={Box} className={index > 0 ? classes.tableCell : clsx(classes.tableCell, classes.firstDriverRow)}>
                                    <Box display='flex' justifyContent='flex-end' className={classes.valueContainer}>
                                        <Box display='flex' alignItems='center' className={classes.lapValue}>{row.lap1Overall}</Box>
                                    </Box>
                                </TableCell>
                                <TableCell className={index > 0 ? classes.tableCell : clsx(classes.tableCell, classes.firstDriverRow)}>
                                    <Box display='flex' justifyContent='flex-end' className={classes.valueContainer}>
                                        <Box display='flex' alignItems='center' className={classes.lapValue}>{row.lap1Trap}</Box>
                                    </Box>
                                </TableCell>
                                <TableCell className={index > 0 ? classes.tableCell : clsx(classes.tableCell, classes.firstDriverRow)}>
                                    <Box display='flex' justifyContent='flex-end' className={classes.valueContainer}>
                                        <Box display='flex' alignItems='center' className={classes.lapValue}>{row.lap2Overall}</Box>
                                    </Box>
                                </TableCell>
                                <TableCell className={index > 0 ? classes.tableCell : clsx(classes.tableCell, classes.firstDriverRow)}>
                                    <Box display='flex' justifyContent='flex-end' className={classes.valueContainer}>
                                        <Box display='flex' alignItems='center' className={classes.lapValue}>{row.lap2Trap}</Box>
                                    </Box>
                                </TableCell>
                                <TableCell className={index > 0 ? classes.tableCell : clsx(classes.tableCell, classes.firstDriverRow)}>
                                    <Box display='flex' justifyContent='flex-end' alignItems='center' className={clsx(classes.valueContainer, classes.totalContainer)}>{row.total}</Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <Box display='flex'>Footer</Box>
    </Box>
}

export default withRouter(Leaderboard)