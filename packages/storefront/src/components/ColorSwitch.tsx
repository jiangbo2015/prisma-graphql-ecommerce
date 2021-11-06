import { RadioGroup, FormControlLabel, Radio } from '@mui/material'

export default function ColorSwitch() {
    return (
        <RadioGroup row>
            {['red', 'blue', 'green'].map((x) => (
                <FormControlLabel
                    value={x}
                    key={x}
                    label=""
                    control={
                        <Radio
                            size="small"
                            sx={{
                                color: x,
                                bgcolor: x,
                                borderRadius: '50%',
                                '&.Mui-checked': {
                                    color: x,
                                    border: '3px solid #fff',
                                    boxShadow: `0 0 0 3px ${x}`,
                                    transform: 'scale(1.1)',
                                },
                                '&:hover': {
                                    bgcolor: x,
                                },
                            }}
                        />
                    }
                />
            ))}
        </RadioGroup>
    )
}
