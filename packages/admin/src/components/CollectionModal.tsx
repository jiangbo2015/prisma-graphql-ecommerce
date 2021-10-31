import React, { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogProps,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { CollectionBaseInput } from 'src/__generated__/globalTypes'

type ModalProps = {
    open: boolean
    editData: CollectionBaseInput & { id?: number }
    handleClose: DialogProps['onClose']
    handleConfirm: Function
    handleConfirmUpdate: Function
}

type ErrorProps = {
    [P in keyof any]: boolean
}

export default function FormDialog({
    open,
    handleClose,
    handleConfirm,
    handleConfirmUpdate,
    editData,
}: ModalProps) {
    const [title, setTitle] = useState(editData.title || '')
    const [description, setDescription] = useState(editData.description || '')
    const [errors, setErrors] = useState<ErrorProps>({
        title: false,
        description: false,
    })
    const handleSubmit = () => {
        if (!title || !description) {
            setErrors({
                title: Boolean(title),
                description: Boolean(description),
            })
            return
        }

        if (editData.id) {
            handleConfirmUpdate(editData.id, {
                title,
                description,
            })
            return
        }

        handleConfirm({
            title,
            description,
        })
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
                    <form action="">
                        <TextField
                            autoFocus
                            error={errors['title']}
                            margin="dense"
                            label="Title"
                            value={title}
                            required
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            label="Description"
                            value={description}
                            error={errors['description']}
                            required={false}
                            fullWidth
                            multiline
                            minRows={3}
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose as React.MouseEventHandler}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
