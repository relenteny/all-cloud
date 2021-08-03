import React from 'react'
import { makeStyles, TableCellProps, TableCell, Box, TableRowProps, TableRow, TableBody } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'

export interface RenderDetail {
    (row: any): JSX.Element[]
}

export interface DetailProps extends TableRowProps {
    renderDetail: RenderDetail
    rows: any[]
}

export interface RowProps extends DetailProps {
    index: number
}

interface ValueProps extends TableCellProps {
    data: any
    justify?: string
}

const useStyles = makeStyles(theme => ({
    cell: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 12,
        paddingBottom: 0,
        border: 0,
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
    secondaryValue: {
        fontSize: '18px',
        fontWeight: 400,
    },
    valueRow: {
        background: 'transparent',
        '&:hover': {
            cursor: 'pointer',
        }
    },
}))

const getValueJustification = (justification?: string) => {
    if (justification) {
        switch (justification) {
            case 'right':
                return 'flex-end'
            case 'center':
                return 'center'
        }

        return 'flex-start'
    }
}

export const PositionValue = (valueProps: ValueProps) => {
    const classes = useStyles()

    return <TableCell className={classes.cell}>
        <Box display='flex' alignItems='center' justifyContent={getValueJustification(valueProps.justify)} className={clsx(classes.valueContainer, classes.positionContainer)}>{valueProps.data}</Box>
    </TableCell>
}

export const TotalValue = (valueProps: ValueProps) => {
    const classes = useStyles()

    return <TableCell className={classes.cell}>
        <Box display='flex' alignItems='center' justifyContent={getValueJustification(valueProps.justify)} className={clsx(classes.valueContainer, classes.totalContainer)}>{valueProps.data}</Box>
    </TableCell>

}

export const PrimaryValue = (valueProps: ValueProps) => {
    const classes = useStyles()

    return <TableCell className={classes.cell}>
        <Box display='flex' alignItems='center' justifyContent={getValueJustification(valueProps.justify)} className={classes.valueContainer}>{valueProps.data}</Box>
    </TableCell>
}

export const SecondaryValue = (valueProps: ValueProps) => {
    const classes = useStyles()

    return <TableCell className={classes.cell}>
        <Box display='flex' alignItems='center' justifyContent={getValueJustification(valueProps.justify)} className={clsx(classes.valueContainer, classes.secondaryValue)}>{valueProps.data}</Box>
    </TableCell>
}

export const DetailRow = (rowProps: RowProps) => {
    const classes = useStyles()
    const history = useHistory()

    const row = rowProps.rows[rowProps.index]

    return <TableRow className={classes.valueRow} onClick={() => history.push('/trial-data/' + row.heat + '/' + row.trial)}>
        {rowProps.renderDetail(row)}
    </TableRow>
}

export const LeaderBoardDetail = (detailProps: DetailProps) => {
    return <TableBody>
        {detailProps.rows.map((row, index) => (
            <DetailRow {...detailProps} index={index} />
        ))}
    </TableBody>
}