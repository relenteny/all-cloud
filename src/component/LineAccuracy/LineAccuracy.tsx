import {DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue} from '../Leaderboard/LeaderboardValue'
import {HeaderProps,  RenderHeader, SecondaryTitle, PrimaryTitle} from '../Leaderboard/LeaderboardHeader'
import {Box} from '@material-ui/core'
import {formatFloat} from '../../util/Utils'
import Leaderboard, {leaderboardComponent} from '../Leaderboard/Leaderboard'
import PageLayout from "../Layout/PageLayout"

function createData(position: number, driver: string, hits: number, forwardTrigger: string, reverseTrigger: string, lineAccuracy: string, trial: number, heat: number) {
  return {position, driver, hits, forwardTrigger, reverseTrigger, lineAccuracy, trial, heat}
}

const rows = [
  createData(1, 'John Doe', 3, formatFloat(87.1, 2), formatFloat(67.09, 2), formatFloat(98.3, 2), 1, 1),
  createData(2, 'Jane Smith', 2, formatFloat(83.65, 2), formatFloat(73.23, 2), formatFloat(91.54, 2), 1, 1),
]

const renderHeader: RenderHeader = () => {
  const header: JSX.Element[] = []

  header.push(leaderboardComponent(<PrimaryTitle width='5%'/>))
  header.push(leaderboardComponent(<PrimaryTitle width='40%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>))
  header.push(leaderboardComponent(<SecondaryTitle align='center' width='10%' title='Hits'/>))
  header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Forward Trigger'/>))
  header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Reverse Trigger'/>))
  header.push(leaderboardComponent(<PrimaryTitle align='center' width='15%' title='Average Line Accuracy'/>))

  return header
}

const renderDetail: RenderDetail = (row: any) => {
  // noinspection DuplicatedCode
  const detail: JSX.Element[] = []

  detail.push(leaderboardComponent(<PositionValue data={row.position} justify='right'/>))
  detail.push(leaderboardComponent(<PrimaryValue data={row.driver}/>))
  detail.push(leaderboardComponent(<SecondaryValue data={row.hits} justify='right'/>))
  detail.push(leaderboardComponent(<SecondaryValue data={row.forwardTrigger + '%'} justify='right'/>))
  detail.push(leaderboardComponent(<SecondaryValue data={row.reverseTrigger + '%'} justify='right'/>))
  detail.push(leaderboardComponent(<TotalValue data={row.lineAccuracy + '%'} justify='right'/>))

  return detail
}

const LineAccuracy = () => {
  const header: HeaderProps = {
    nRows: 1,
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

  const WrappedLineAccuracy = PageLayout(buildLeaderboard)

  return <WrappedLineAccuracy/>
}

export default LineAccuracy