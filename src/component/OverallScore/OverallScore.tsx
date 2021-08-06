import {DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue} from '../Leaderboard/LeaderboardValue'
import {HeaderProps, RenderHeader, SecondaryTitle, PrimaryTitle} from '../Leaderboard/LeaderboardHeader'
import {Box} from '@material-ui/core'
import {formatFloat} from '../../util/Utils'
import Leaderboard, {leaderboardComponent} from '../Leaderboard/Leaderboard'
import PageLayout from "../Layout/PageLayout";
import {useEffect, useState} from "react";
import React from 'react'

function createData(position: number, driver: string, total: string, averageLineAccuracy: string, averageSpeedTrap: string, reactionTime: string, hits: number, score: string, trial: number, heat: number) {
  return {position, driver, total, averageLineAccuracy, averageSpeedTrap, reactionTime, hits, score, trial, heat}
}

const demoRows = [
  createData(1, 'John Doe', formatFloat(30.659), formatFloat(5.236, 2), formatFloat(9.453), formatFloat(0.975), 1534, formatFloat(60.112), 1, 1),
  createData(2, 'Jane Smith', formatFloat(31.630), formatFloat(4.652, 2), formatFloat(8.539), formatFloat(5.459), 8, formatFloat(60.169), 2, 1),
]

const renderHeader: RenderHeader = (row, breakpoint: string) => {
  const header: JSX.Element[] = []

  header.push(leaderboardComponent(<PrimaryTitle width='5%'/>))
  header.push(leaderboardComponent(<PrimaryTitle width='40%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>))
  if (!/xs/.test(breakpoint)) {
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Total Trial Time'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Line Accuracy'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Speed Trap Time'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Reaction Time'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Hits'/>))
    header.push(leaderboardComponent(<PrimaryTitle align='center' title='Overall Score'/>))
  } else {
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Time'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Accuracy'/>))
    header.push(leaderboardComponent(<PrimaryTitle align='center' title='Score'/>))
  }

  return header
}

const renderDetail: RenderDetail = (row, breakpoint) => {
  const detail: JSX.Element[] = []

  detail.push(leaderboardComponent(<PositionValue data={row.position} justify='right'/>))
  detail.push(leaderboardComponent(<PrimaryValue data={row.driver}/>))
  detail.push(leaderboardComponent(<SecondaryValue data={row.total} justify='right'/>))
  detail.push(leaderboardComponent(<SecondaryValue data={row.averageLineAccuracy + '%'} justify='right'/>))
  if (!/xs/.test(breakpoint)) {
    detail.push(leaderboardComponent(<SecondaryValue data={row.averageSpeedTrap} justify='right'/>))
    detail.push(leaderboardComponent(<SecondaryValue data={row.reactionTime} justify='right'/>))
    detail.push(leaderboardComponent(<SecondaryValue data={row.hits} justify='right'/>))
  }
  detail.push(leaderboardComponent(<TotalValue data={row.score} justify='right'/>))

  return detail
}

const OverallScore = () => {

  const [rows, setRows] = useState<Array<any>>([])

  useEffect(() => {
    //setRows(demoRows)
    fetch('https://backend-dev.gsop.com/overall', {
      method: "GET",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => setRows(data));
  }, []);


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
      <Leaderboard title='Overall Score' detail={detail} header={header}/>
    </Box>
  }

  const WrappedOverallScore = PageLayout(buildLeaderboard)

  return <WrappedOverallScore/>
}

export default OverallScore