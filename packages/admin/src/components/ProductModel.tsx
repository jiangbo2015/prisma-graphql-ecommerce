import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, FormControl, InputLabel } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import {
    ProductCreateInput,
    ProductUpdateInput,
} from '../__generated__/globalTypes'
import { GET_ALL_COLLECTIONS } from '../graphql/Collection'
import { AllCollections } from 'src/__generated__/AllCollections'

type ModalProps = {
    open: boolean
    editData: ProductUpdateInput | null
    handleClose: DialogProps['onClose']
    handleConfirm: Function
    handleConfirmUpdate: Function
}

export default function FormDialog({
    open,
    handleClose,
    handleConfirm,
    handleConfirmUpdate,
    editData,
}: ModalProps) {
    const { data: collectionsData } =
        useQuery<AllCollections>(GET_ALL_COLLECTIONS)

    const [fields, setFields] = useState(editData || ({} as ProductUpdateInput))
    const handleSubmit = (e: React.FormEvent) => {
        fields.price = Number(fields.price)
        e.preventDefault()
        if (editData) {
            handleConfirmUpdate({
                ...fields,
                id: editData.id,
            })
            return
        }

        handleConfirm(fields)
    }

    // select is not a normal select element, should be care about
    const handleFields =
        (type: keyof ProductCreateInput) =>
        (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
            setFields({
                ...fields,
                [type]: e.target.value,
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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            value={fields.title}
                            required
                            fullWidth
                            onChange={handleFields('title')}
                        />
                        <TextField
                            margin="dense"
                            label="Slug"
                            value={fields.slug}
                            required
                            fullWidth
                            onChange={handleFields('slug')}
                        />
                        <TextField
                            margin="dense"
                            label="Price"
                            type="number"
                            value={fields.price}
                            required
                            fullWidth
                            onChange={handleFields('price')}
                        />
                        <FormControl fullWidth required>
                            <InputLabel>Collection</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fields.collectionId}
                                placeholder="please select collection"
                                onChange={handleFields('collectionId')}
                            >
                                {collectionsData?.allCollections?.map(
                                    (item) => (
                                        <MenuItem value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            label="Image"
                            value={fields.image}
                            required
                            fullWidth
                            onChange={handleFields('image')}
                        />
                        <DialogActions>
                            <Button
                                onClick={handleClose as React.MouseEventHandler}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
