import React, { useState } from 'react'
import {
    Button,
    FormControl,
    InputLabel,
    TextField,
    Dialog,
    DialogProps,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
} from '@mui/material'

import { omit } from 'lodash'
import { ProductBaseInput } from 'src/__generated__/globalTypes'
import { useCollectionList } from 'src/graphql/Collection'

type ModalProps = {
    open: boolean
    editData: ProductBaseInput & { id?: number; collectionId?: number }
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
    const { data: collectionsData } = useCollectionList()

    const [fields, setFields] = useState(editData || {})
    const handleSubmit = (e: React.FormEvent) => {
        fields.price = Number(fields.price)
        e.preventDefault()
        if (editData.id) {
            handleConfirmUpdate(
                editData.id,
                fields.collectionId,
                omit(fields, ['collectionId', 'id', '__typename'])
            )
            return
        }

        handleConfirm(omit(fields, 'collectionId'), fields.collectionId)
    }

    // select is not a normal select element, should be care about
    const handleFields =
        (type: any) =>
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
                <DialogTitle id="form-dialog-title">Product Add</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            value={fields.title}
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handleFields('title')}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            multiline
                            minRows={3}
                            value={fields.description}
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handleFields('description')}
                        />
                        <TextField
                            margin="dense"
                            label="Price"
                            type="number"
                            value={fields.price}
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handleFields('price')}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Collection</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fields.collectionId}
                                placeholder="please select collection"
                                // onChange={handleFields('collectionId')}
                                variant="outlined"
                            >
                                {collectionsData?.collectionList?.map(
                                    (item) => (
                                        <MenuItem value={item.id}>
                                            {item.title}
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
                            variant="outlined"
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
