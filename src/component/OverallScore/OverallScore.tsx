import React from 'react'
import {DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue} from '../Leaderboard/LeaderboardValue'
import {HeaderProps, PrimaryTitle, RenderHeader, SecondaryTitle} from '../Leaderboard/LeaderboardHeader'
import {Box} from '@material-ui/core'
import {formatFloat} from '../../util/Utils'
import Leaderboard from '../Leaderboard/Leaderboard'

function createData(position: number, driver: string, total: string, averageLineAccuracy: string, averageSpeedTrap: string, reactionTime: string, hits: number, score: string, trial: number, heat: number) {
  return {position, driver, total, averageLineAccuracy, averageSpeedTrap, reactionTime, hits, score, trial, heat}
}

const rows = [
  createData(1, 'John Doe', formatFloat(30.659), formatFloat(5.236, 2), formatFloat(9.453), formatFloat(0.975), 1534, formatFloat(60.112), 1, 1),
  createData(2, 'Jane Smith', formatFloat(31.630), formatFloat(4.652, 2), formatFloat(8.539), formatFloat(5.459), 8, formatFloat(60.169), 2, 1),
]

const renderHeader: RenderHeader = () => {
  const header: JSX.Element[] = []

  header.push(<PrimaryTitle width='5%'/>)
  header.push(<PrimaryTitle width='40%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>)
  header.push(<SecondaryTitle align='center' title='Total Trial Time'/>)
  header.push(<SecondaryTitle align='center' title='Average Line Accuracy'/>)
  header.push(<SecondaryTitle align='center' title='Average Speed Trap Time'/>)
  header.push(<SecondaryTitle align='center' title='Reaction Time'/>)
  header.push(<SecondaryTitle align='center' title='Hits'/>)
  header.push(<PrimaryTitle align='center' title='Overall Score'/>)

  return header
}

const renderDetail: RenderDetail = (row: any) => {
  const detail: JSX.Element[] = []

  detail.push(<PositionValue data={row.position} justify='right'/>)
  detail.push(<PrimaryValue data={row.driver}/>)
  detail.push(<SecondaryValue data={row.total} justify='right'/>)
  detail.push(<SecondaryValue data={row.averageLineAccuracy + '%'} justify='right'/>)
  detail.push(<SecondaryValue data={row.averageSpeedTrap} justify='right'/>)
  detail.push(<SecondaryValue data={row.reactionTime} justify='right'/>)
  detail.push(<SecondaryValue data={row.hits} justify='right'/>)
  detail.push(<TotalValue data={row.score} justify='right'/>)

  return detail
}

const OverallScore = () => {
  const header: HeaderProps = {
    nRows: 1,
    renderHeader: renderHeader
  }

  const detail: DetailProps = {
    rows: rows,
    renderDetail: renderDetail
  }

  return <Box display='block'>
    <Leaderboard title='Overall Leaderboard' detail={detail} header={header}/>
  </Box>
}

export default OverallScore