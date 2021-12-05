import {
    Card,
    CardContent,
    Typography,
    InputAdornment,
    Box,
    TextField,
    Button,
} from '@mui/material'
import { useForm } from 'react-hook-form'

import AccountCircle from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import { useHistory } from 'react-router-dom'

import { useLogin } from 'src/graphql/User'
import { UserLoginInput } from 'src/__generated__/globalTypes'

export default function InputWithIcon() {
    const { mutate, data, loading } = useLogin()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<UserLoginInput>()

    const history = useHistory()

    if (data?.login) {
        localStorage.token = data.login.token
        localStorage.email = data.login.email
        history.push('/collection')
    }

    const handleLogin = (data: UserLoginInput) => {
        mutate({
            variables: {
                data,
            },
        })
    }

    return (
        <Box
            display={'flex'}
            height={'100vh'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
                backgroundImage: ({ palette }) => {
                    return `linear-gradient(45deg, ${palette.primary?.main}, ${palette.secondary?.main})`
                },
            }}
        >
            <Card
                sx={{
                    maxWidth: 'sm',
                    p: 3,
                    mx: [3, 0],
                }}
            >
                <CardContent>
                    <Typography gutterBottom variant="h4" align="center">
                        Login
                    </Typography>

                    <TextField
                        label="Email"
                        type="email"
                        sx={{ mt: 4 }}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        {...register('email', {
                            required: 'please input email',
                        })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        sx={{ mt: 4 }}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        {...register('password', {
                            required: 'please input password',
                        })}
                    />
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(handleLogin)}
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
