import React, { FormEvent, useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogProps,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { CollectionInput } from 'src/__generated__/globalTypes'
import { CollectionModalProps } from 'types'

export default function CollectionModal({
    open,
    handleClose,
    handleCreate,
    handleUpdate,
    editData,
}: CollectionModalProps) {
    const [data, setData] = useState(editData)

    const handleChange = (field: keyof CollectionInput) => (e) => {
        setData({
            ...data,
            [field]: e.target.value,
        })
    }

    const handleSubmit = (e: FormEvent) => {
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
                    <form action="" onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            value={data.title}
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handleChange('title')}
                        />
                        <TextField
                            margin="normal"
                            label="Description"
                            value={data.description}
                            required={false}
                            fullWidth
                            multiline
                            minRows={3}
                            variant="outlined"
                            onChange={handleChange('description')}
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
