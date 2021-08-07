import {DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue} from '../Leaderboard/LeaderboardValue'
import {HeaderProps, PrimaryTitle, RenderHeader, SecondaryTitle} from '../Leaderboard/LeaderboardHeader'
import {Box} from '@material-ui/core'
import {formatFloat} from '../../util/Utils'
import Leaderboard, {leaderboardComponent} from '../Leaderboard/Leaderboard'
import PageLayout from "../Layout/PageLayout";
import {useEffect, useState} from "react";

function createData(position: number, driver: string, reactionTime: string, lap1Overall: string, lap1Trap: string, lap2Overall: string, lap2Trap: string, total: string, trial: number, heat: number) {
  return {position, driver, reactionTime, lap1Overall, lap1Trap, lap2Overall, lap2Trap, total, trial, heat}
}

const renderHeader: RenderHeader = (row, breakpoint) => {
  const header: JSX.Element[] = []

  if (row === 0) {
    header.push(leaderboardComponent(<PrimaryTitle rowSpan={2} width='5%'/>))
    if (!/xs/.test(breakpoint)) {
      header.push(leaderboardComponent(<PrimaryTitle rowSpan={2} width='40%' title='Driver'
                                                     additionalStyling={{paddingLeft: '12px'}}/>))
    } else {
      header.push(leaderboardComponent(<PrimaryTitle width='30%' title='Driver'
                                                     additionalStyling={{paddingLeft: '12px'}}/>))
    }
    if (!/xs/.test(breakpoint)) {
      header.push(leaderboardComponent(<SecondaryTitle rowSpan={2} align='center' title='Reaction'/>))
      header.push(leaderboardComponent(<SecondaryTitle colSpan={2} align='center' title='Lap 1'/>))
      header.push(leaderboardComponent(<SecondaryTitle colSpan={2} align='center' title='Lap 2'/>))
      header.push(leaderboardComponent(<PrimaryTitle rowSpan={2} align='center' title='Time'/>))
    } else {
      header.push(leaderboardComponent(<SecondaryTitle align='center' title='Reaction'/>))
      header.push(leaderboardComponent(<SecondaryTitle align='center' title='Lap 1'/>))
      header.push(leaderboardComponent(<SecondaryTitle align='center' title='Lap 2'/>))
      header.push(leaderboardComponent(<PrimaryTitle align='center' title='Time'/>))
    }
  } else {
    if (!/xs/.test(breakpoint)) {
      header.push(leaderboardComponent(<SecondaryTitle align='center' width='10%' title='Overall'/>))
      header.push(leaderboardComponent(<SecondaryTitle align='center' width='10%' title='Speed Trap'/>))
      header.push(leaderboardComponent(<SecondaryTitle align='center' width='10%' title='Overall'/>))
      header.push(leaderboardComponent(<SecondaryTitle align='center' width='10%' title='Speed Trap'/>))
    }
  }

  return header
}

const renderDetail: RenderDetail = (row, breakpoint) => {
  const detail: JSX.Element[] = []

  detail.push(leaderboardComponent(<PositionValue data={row.position} justify='right'/>))
  detail.push(leaderboardComponent(<PrimaryValue data={row.driver}/>))
  detail.push(leaderboardComponent(<SecondaryValue data={row.reactionTime} justify='right'/>))
  detail.push(leaderboardComponent(<SecondaryValue data={row.lap1Overall} justify='right'/>))
  if (!/xs/.test(breakpoint)) {
    detail.push(leaderboardComponent(<SecondaryValue data={row.lap1Trap} justify='right'/>))
  }
  detail.push(leaderboardComponent(<SecondaryValue data={row.lap2Overall} justify='right'/>))
  if (!/xs/.test(breakpoint)) {
    detail.push(leaderboardComponent(<SecondaryValue data={row.lap2Trap} justify='right'/>))
  }
  detail.push(leaderboardComponent(<TotalValue data={row.total} justify='right'/>))

  return detail
}

const TimeTrial = () => {

  const [rows, setRows] = useState<Array<any>>([])

  const header: HeaderProps = {
    nRows: 2,
    renderHeader: renderHeader
  }

  const detail: DetailProps = {
    rows: rows,
    renderDetail: renderDetail
  }

  const fetchData = () => {
    fetch('https://backend-dev.gsop.com/timetrial', {
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
        const reactionTime = data[2].ScalarValue
        const lap1Time = data[3].ScalarValue
        const lap1Trap = data[4].ScalarValue
        const lap2Time = data[5].ScalarValue
        const lap2Trap = data[6].ScalarValue
        const total = data[7].ScalarValue

        result.push(createData(position++, driver, formatFloat(reactionTime), formatFloat(lap1Time), formatFloat(lap1Trap), formatFloat(lap2Time), formatFloat(lap2Trap), formatFloat(total), trial, 0))
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
      <Leaderboard title='Line Accuracy' detail={detail} header={header}/>
    </Box>
  }

  const WrappedTimeTrial = PageLayout(buildLeaderboard)

  return <WrappedTimeTrial/>
}

export default TimeTrial