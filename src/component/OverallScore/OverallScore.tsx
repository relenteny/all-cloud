import React from 'react'
import { DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue } from '../Leaderboard/LeaderboardValue'
import { HeaderProps, PrimaryTitle, RenderHeader, SecondaryTitle } from '../Leaderboard/LeaderboardHeader'
import { Box } from '@material-ui/core'
import { formatFloat } from '../../util/Utils'
import Leaderboard from '../Leaderboard/Leaderboard'

function createData(position: number, driver: string, lap1Overall: string, lap1Trap: string, lap2Overall: string, lap2Trap: string, total: string, trial: number, heat: number) {
    return { position, driver, lap1Overall, lap1Trap, lap2Overall, lap2Trap, total, trial, heat }
}

const rows = [
    createData(1, 'John Doe', formatFloat(30.659), formatFloat(5.236), formatFloat(29.453), formatFloat(6.12), formatFloat(60.112), 1, 1),
    createData(2, 'Jane Smith', formatFloat(31.630), formatFloat(4.652), formatFloat(28.539), formatFloat(5.459), formatFloat(60.169), 2, 1),
]

const renderHeader: RenderHeader = (row: number) => {
    const header: JSX.Element[] = []

    if (row === 0) {
        header.push(<PrimaryTitle rowSpan={2} width='5%' />)
        header.push(<PrimaryTitle rowSpan={2} width='40%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>)
        header.push(<PrimaryTitle colSpan={2} align='center' title='Lap 1' />)
        header.push(<PrimaryTitle colSpan={2} align='center' title='Lap 2' />)
        header.push(<PrimaryTitle rowSpan={2} align='center' title='Time' />)
    } else {
        header.push(<SecondaryTitle  align='center' width='10%' title='Overall'/>)
        header.push(<SecondaryTitle  align='center' width='10%' title='Speed Trap'/>)
        header.push(<SecondaryTitle  align='center' width='10%' title='Overall'/>)
        header.push(<SecondaryTitle  align='center' width='10%' title='Speed Trap'/>)
    }

    return header
}

const renderDetail: RenderDetail = (row: any) => {
    const detail: JSX.Element[] = []

    detail.push(<PositionValue data={row.position} justify='right' />)
    detail.push(<PrimaryValue data={row.driver} />)
    detail.push(<SecondaryValue data={row.lap1Overall} justify='right' />)
    detail.push(<SecondaryValue data={row.lap1Trap} justify='right' />)
    detail.push(<SecondaryValue data={row.lap2Overall} justify='right' />)
    detail.push(<SecondaryValue data={row.lap2Trap} justify='right' />)
    detail.push(<TotalValue data={row.total} justify='right' />)

    return detail
}

/*
                        <LbHeadingRow>
                            <LbHeadingCell rowSpan={2} width='5%' />
                            <LbHeadingCell rowSpan={2} width='40%'>
                                <LbInitialHeadingValue>Driver</LbInitialHeadingValue>
                            </LbHeadingCell>
                            <LbHeadingCell colSpan={2} align='center'>
                                <LbHeadingValue>Lap 1</LbHeadingValue>
                            </LbHeadingCell>
                            <LbHeadingCell colSpan={2} align='center'>
                                <LbHeadingValue>Lap 2</LbHeadingValue>
                            </LbHeadingCell>
                            <LbHeadingCell rowSpan={2} align='center'>
                                <LbHeadingValue>Time</LbHeadingValue>
                            </LbHeadingCell>

                        </LbHeadingRow>
                        <LbHeadingRow>
                            <LbHeadingCell align='center' width='10%'>
                                <LbSecondaryHeadingValue>Overall</LbSecondaryHeadingValue>
                            </LbHeadingCell>
                            <LbHeadingCell align='center' width='10%'>
                                <LbSecondaryHeadingValue>Speed Trap</LbSecondaryHeadingValue>
                            </LbHeadingCell>
                            <LbHeadingCell align='center' width='10%'>
                                <LbSecondaryHeadingValue>Overall</LbSecondaryHeadingValue>
                            </LbHeadingCell>
                            <LbHeadingCell align='center' width='10%'>
                                <LbSecondaryHeadingValue>Speed Trap</LbSecondaryHeadingValue>
                            </LbHeadingCell>
                        </LbHeadingRow>
*/

const OverallScore = () => {
    const header: HeaderProps = {
        nRows: 2,
        renderHeader: renderHeader
    }

    const detail: DetailProps = {
        rows: rows,
        renderDetail: renderDetail
    }

    return <Box display='block'>
        <Leaderboard title='Overall Score' detail={detail} header={header}/>
    </Box>
}

export default OverallScore