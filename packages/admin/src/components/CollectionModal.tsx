import React from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { CollectionInput } from 'src/__generated__/globalTypes'
import { CollectionModalProps } from 'types'
import { useForm } from 'react-hook-form'

export default function CollectionModal({
    open,
    handleClose,
    handleCreate,
    handleUpdate,
    editData,
}: CollectionModalProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CollectionInput>({
        defaultValues: editData,
    })

    const handleUpsert = (data: CollectionInput) => {
        if (!data.title || !data.description) {
            return
        }

        if (editData.id) {
            handleUpdate(data)
        } else {
            handleCreate(data)
        }
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Collection Add</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        required
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        {...register('title', {
                            required: 'please input title',
                        })}
                    />
                    <TextField
                        margin="normal"
                        label="Description"
                        fullWidth
                        multiline
                        minRows={3}
                        variant="outlined"
                        {...register('description')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose as React.MouseEventHandler}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit(handleUpsert)}
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
