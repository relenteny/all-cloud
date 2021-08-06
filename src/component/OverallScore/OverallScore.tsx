import {DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue} from '../Leaderboard/LeaderboardValue'
import {HeaderProps, PrimaryTitle, RenderHeader, SecondaryTitle} from '../Leaderboard/LeaderboardHeader'
import {Box} from '@material-ui/core'
import Leaderboard, {leaderboardComponent} from '../Leaderboard/Leaderboard'
import PageLayout from "../Layout/PageLayout";
import React, {useEffect, useState} from "react";
import {formatFloat} from "../../util/Utils";

function createData(position: number, driver: string, total: string, averageLineAccuracy: string, averageSpeedTrap: string, reactionTime: string, hits: number, score: string, trial: number, heat: number) {
  return {position, driver, total, averageLineAccuracy, averageSpeedTrap, reactionTime, hits, score, trial, heat}
}

const renderHeader: RenderHeader = (row, breakpoint) => {
  const header: JSX.Element[] = []

  header.push(leaderboardComponent(<PrimaryTitle width='5%'/>))
  if (!/xs/.test(breakpoint)) {
    header.push(leaderboardComponent(<PrimaryTitle width='40%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Total Trial Time'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Line Accuracy'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Speed Trap Time'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Reaction Time'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Hits'/>))
    header.push(leaderboardComponent(<PrimaryTitle align='center' title='Overall Score'/>))
  } else {
    header.push(leaderboardComponent(<PrimaryTitle width='30%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>))
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

  const header: HeaderProps = {
    nRows: 1,
    renderHeader: renderHeader
  }

  const detail: DetailProps = {
    rows: rows,
    renderDetail: renderDetail
  }

  const fetchData = () => {
    fetch('https://backend-dev.gsop.com/overall', {
      method: "GET",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      const rows: any[] = data
      let position: number = 1
      const result: any[] = []
      rows.map((row: any) => {
        const data = row.Data

        const trial = data[0].ScalarValue
        const driver = data[1].ScalarValue
        const total = data[2].ScalarValue
        const averageLineAccuracy = data[3].ScalarValue
        const averageSpeedTrap = data[4].ScalarValue
        const reactionTime = data[5].ScalarValue
        const hits = data[6].ScalarValue
        const score = data[7].ScalarValue

        result.push(createData(position++, driver, formatFloat(total), formatFloat(averageLineAccuracy, 2), formatFloat(averageSpeedTrap), formatFloat(reactionTime), hits, formatFloat(score), trial, 0))
        return true
      })
      setRows(result)
    })
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  function buildLeaderboard() {
    return <Box display='block'>
      <Leaderboard title='Overall Score' detail={detail} header={header}/>
    </Box>
  }

  const WrappedOverallScore = PageLayout(buildLeaderboard)

  return <WrappedOverallScore/>
}

export default OverallScore