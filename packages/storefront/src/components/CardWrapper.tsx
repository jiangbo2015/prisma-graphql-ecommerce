import { Box } from '@mui/material'
import { BoxProps } from '@mui/system'

export default function CardWrapper(props: BoxProps) {
    return (
        <Box
            width={'100%'}
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: ({ palette }) =>
                    `linear-gradient(45deg, ${palette.primary.main}, ${palette.secondary.main})`,
            }}
            {...props}
        />
    )
}
