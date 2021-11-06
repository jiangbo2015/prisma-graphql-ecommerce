import React, { ChangeEvent, useState } from 'react'
import {
    Button,
    FormControl,
    InputLabel,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
    TextFieldProps,
    SelectChangeEvent,
    SelectProps,
} from '@mui/material'
import { useCollectionList } from 'src/graphql/Collection'
import { ProductModalProps } from 'types'

const CommonTextField = (props: TextFieldProps) => (
    <TextField
        margin="normal"
        required
        fullWidth
        size="small"
        variant="outlined"
        {...props}
    />
)

export default function FormDialog({
    open,
    handleClose,
    handleCreate,
    handleUpdate,
    editData,
}: ProductModalProps) {
    const { data: collectionsData } = useCollectionList()

    const [fields, setFields] = useState(editData || {})
    const handleSubmit = (e: React.FormEvent) => {
        fields.price = Number(fields.price)
        e.preventDefault()
        if (editData.id) {
            handleUpdate(fields)
        } else {
            handleCreate(fields)
        }
    }

    const handleFields =
        (type: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        <CommonTextField
                            autoFocus
                            label="Title"
                            value={fields.title}
                            onChange={handleFields('title')}
                        />
                        <CommonTextField
                            label="Description"
                            multiline
                            minRows={3}
                            value={fields.description}
                            onChange={handleFields('description')}
                        />
                        <CommonTextField
                            label="Price"
                            type="number"
                            value={fields.price}
                            onChange={handleFields('price')}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Collection</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fields.collectionId}
                                placeholder="please select collection"
                                size="small"
                                onChange={
                                    handleFields(
                                        'collectionId'
                                    ) as SelectProps['onChange']
                                }
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
                        <CommonTextField
                            label="Image"
                            value={fields.image}
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
