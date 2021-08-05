import { Box, makeStyles, TableCell, TableCellProps, TableHead, TableRow, TableRowProps } from '@material-ui/core';
import clsx from 'clsx'

export interface RenderHeader {
    (row: number, breakpoint: string): JSX.Element[]
}

export interface HeaderProps extends TableRowProps {
    nRows: number
    renderHeader: RenderHeader
    breakpoint?: string
}

interface LeaderboardTitleProps extends TableCellProps {
    title?: string
    additionalStyling?: any
    breakpoint?: string
}

const useStyles = makeStyles(theme => ({
    row: {
        padding: 4,
        backgroundColor: theme.palette.primary.dark,
        border: 'none'
    },
    primaryTitle: {
        fontSize: '24px',
        fontWeight: 600,
        color: 'black',
        border: 'none',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
            fontWeight: 400,
        },
    },
    secondaryTitle: {
        fontSize: '16px',
        fontWeight: 400,
        border: 'none',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        },
    },
    headingCell: {
        padding: 4,
        border: 'none',
    },
}))

export const LeaderboardHeader = (headerProps: HeaderProps) => {
    const classes = useStyles()
    const elements: JSX.Element[] = []

    for (let r = 0; r < headerProps.nRows; r++) {
        elements.push(
            <TableRow className={classes.row}>
                {headerProps.renderHeader(r, headerProps.breakpoint ? headerProps.breakpoint : 'xl')}
            </TableRow>
        )
    }

    return <TableHead>
        {elements}
    </TableHead>
}

export const PrimaryTitle = (titleProps: LeaderboardTitleProps) => {
    const classes = useStyles()

    let additionalStyling = titleProps.additionalStyling;
    if(!additionalStyling) {
        additionalStyling = {}
    }

    const addedStyles = makeStyles({
        root: {
            ...additionalStyling,
        },
    })

    return <TableCell {...titleProps} className={classes.headingCell}>
        {titleProps.title !== undefined &&
            <Box className={clsx(classes.primaryTitle, addedStyles().root)}>{titleProps.title}</Box>
        }
    </TableCell>
}

export const SecondaryTitle = (titleProps: LeaderboardTitleProps) => {
    const classes = useStyles()

    return <TableCell {...titleProps} className={classes.headingCell}>
        {titleProps.title !== undefined &&
            <Box className={classes.secondaryTitle}>{titleProps.title}</Box>
        }
    </TableCell>
}
