import { DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue } from '../Leaderboard/LeaderboardValue'
import { HeaderProps, RenderHeader, SecondaryTitle, PrimaryTitle } from '../Leaderboard/LeaderboardHeader'
import { Box } from '@material-ui/core'
import { formatFloat } from '../../util/Utils'
import Leaderboard, {leaderboardComponent} from '../Leaderboard/Leaderboard'
import PageLayout from "../Layout/PageLayout";

function createData(position: number, driver: string, lap1Overall: string, lap1Trap: string, lap2Overall: string, lap2Trap: string, total: string, trial: number, heat: number) {
    return { position, driver, lap1Overall, lap1Trap, lap2Overall, lap2Trap, total, trial, heat }
}

const rows = [
    createData(1, 'John Doe', formatFloat(30.659), formatFloat(5.236), formatFloat(29.453), formatFloat(6.12), formatFloat(60.112), 1, 1),
    createData(2, 'Jane Smith', formatFloat(31.630), formatFloat(4.652), formatFloat(28.539), formatFloat(5.459), formatFloat(60.169), 2, 1),
]

const renderHeader: RenderHeader = (row) => {
    const header: JSX.Element[] = []

    if (row === 0) {
        header.push(leaderboardComponent(<PrimaryTitle rowSpan={2} width='5%' />))
        header.push(leaderboardComponent(<PrimaryTitle rowSpan={2} width='40%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>))
        header.push(leaderboardComponent(<PrimaryTitle colSpan={2} align='center' title='Lap 1' />))
        header.push(leaderboardComponent(<PrimaryTitle colSpan={2} align='center' title='Lap 2' />))
        header.push(leaderboardComponent(<PrimaryTitle rowSpan={2} align='center' title='Time' />))
    } else {
        header.push(leaderboardComponent(<SecondaryTitle  align='center' width='10%' title='Overall'/>))
        header.push(leaderboardComponent(<SecondaryTitle  align='center' width='10%' title='Speed Trap'/>))
        header.push(leaderboardComponent(<SecondaryTitle  align='center' width='10%' title='Overall'/>))
        header.push(leaderboardComponent(<SecondaryTitle  align='center' width='10%' title='Speed Trap'/>))
    }

    return header
}

const renderDetail: RenderDetail = (row) => {
    const detail: JSX.Element[] = []

    detail.push(leaderboardComponent(<PositionValue data={row.position} justify='right' />))
    detail.push(leaderboardComponent(<PrimaryValue data={row.driver} />))
    detail.push(leaderboardComponent(<SecondaryValue data={row.lap1Overall} justify='right' />))
    detail.push(leaderboardComponent(<SecondaryValue data={row.lap1Trap} justify='right' />))
    detail.push(leaderboardComponent(<SecondaryValue data={row.lap2Overall} justify='right' />))
    detail.push(leaderboardComponent(<SecondaryValue data={row.lap2Trap} justify='right' />))
    detail.push(leaderboardComponent(<TotalValue data={row.total} justify='right' />))

    return detail
}

const TimeTrial = () => {
    const header: HeaderProps = {
        nRows: 2,
        renderHeader: renderHeader
    }

    const detail: DetailProps = {
        rows: rows,
        renderDetail: renderDetail
    }

    function buildLeaderboard() {
        return <Box display='block'>
            <Leaderboard title='Line Accuracy' detail={detail} header={header}/>
        </Box>
    }

    const WrappedTimeTrial = PageLayout(buildLeaderboard)

    return <WrappedTimeTrial/>
}

export default TimeTrial