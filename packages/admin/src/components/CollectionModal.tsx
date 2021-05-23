import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

type ModalProps = {
    open: boolean
    handleClose: DialogProps['onClose']
    handleConfirm: Function
}

type ValueProps = {
    name: string
    slug: string
}

type ErrorProps = {
    [P in keyof ValueProps]: boolean
}

export default function FormDialog({ open, handleClose, handleConfirm }: ModalProps) {
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [errors, setErrors] = useState<ErrorProps>({
        name: false,
        slug: false,
    })
    const handleSubmit = () => {
        if (!name || !slug) {
            setErrors({
                name: Boolean(name),
                slug: Boolean(slug),
            })
            return
        }

        handleConfirm({
            name,
            slug,
        })
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Collection Add</DialogTitle>
                <DialogContent>
                    <form action="">
                        <TextField
                            autoFocus
                            error={errors['name']}
                            margin="dense"
                            label="Name"
                            value={name}
                            required
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Slug"
                            value={slug}
                            error={errors['name']}
                            required
                            fullWidth
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose as React.MouseEventHandler} color="primary">
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
