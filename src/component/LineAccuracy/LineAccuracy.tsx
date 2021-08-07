import {DetailProps, PositionValue, PrimaryValue, RenderDetail, SecondaryValue, TotalValue} from '../Leaderboard/LeaderboardValue'
import {HeaderProps, PrimaryTitle, RenderHeader, SecondaryTitle} from '../Leaderboard/LeaderboardHeader'
import {Box} from '@material-ui/core'
import {formatFloat} from '../../util/Utils'
import Leaderboard, {leaderboardComponent} from '../Leaderboard/Leaderboard'
import PageLayout from "../Layout/PageLayout"
import {useEffect, useState} from "react";

function createData(position: number, driver: string, hits: number, forwardTrigger: string, reverseTrigger: string, lineAccuracy: string, trial: number, heat: number) {
  return {position, driver, hits, forwardTrigger, reverseTrigger, lineAccuracy, trial, heat}
}

const renderHeader: RenderHeader = (row, breakpoint) => {
  const header: JSX.Element[] = []

  header.push(leaderboardComponent(<PrimaryTitle width='5%'/>))
  if (!/xs/.test(breakpoint)) {
    header.push(leaderboardComponent(<PrimaryTitle width='40%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' width='10%' title='Hits'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Forward Trigger'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Average Reverse Trigger'/>))
    header.push(leaderboardComponent(<PrimaryTitle align='center' width='15%' title='Average Line Accuracy'/>))
  } else {
    header.push(leaderboardComponent(<PrimaryTitle width='30%' title='Driver' additionalStyling={{paddingLeft: '12px'}}/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' width='10%' title='Hits'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Forward'/>))
    header.push(leaderboardComponent(<SecondaryTitle align='center' title='Reverse'/>))
    header.push(leaderboardComponent(<PrimaryTitle align='center' width='15%' title='Accuracy'/>))
  }

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
    fetch('https://backend-dev.gsop.com/lineaccuracy', {
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
        const lineAccuracy = data[2].ScalarValue
        const hits = data[3].ScalarValue
        const forwardTrigger = data[4].ScalarValue
        const reverseTrigger = data[5].ScalarValue

        result.push(createData(position++, driver, hits, formatFloat(forwardTrigger, 2), formatFloat(reverseTrigger, 2), formatFloat(lineAccuracy, 2), trial, 0))
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

  const WrappedLineAccuracy = PageLayout(buildLeaderboard)

  return <WrappedLineAccuracy/>
}

export default LineAccuracy