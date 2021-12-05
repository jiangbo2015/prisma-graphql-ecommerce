import React from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
} from '@mui/material'
import { useCollectionList } from 'src/graphql/Collection'
import { ProductModalProps } from 'types'
import { RegisterOptions, useForm } from 'react-hook-form'
import { ProductInput } from 'src/__generated__/globalTypes'

const datas: {
    label: string
    name: keyof ProductInput
    rule: RegisterOptions
}[] = [
    {
        label: 'Title',
        name: 'title',
        rule: { required: 'please input product title' },
    },
    {
        label: 'Description',
        name: 'description',
        rule: { required: 'please input product description' },
    },
    {
        label: 'Price',
        name: 'price',
        rule: { required: 'please input product price' },
    },
    {
        label: 'Collection',
        name: 'collectionId',
        rule: { required: 'please select product collection' },
    },
    {
        label: 'Image',
        name: 'image',
        rule: { required: 'please input product image http link' },
    },
]

export default function FormDialog({
    open,
    handleClose,
    handleCreate,
    handleUpdate,
    editData,
}: ProductModalProps) {
    const { data: collectionsData } = useCollectionList()

    const handleUpsert = (data: ProductInput) => {
        console.log(data)
        if (editData.id) {
            handleUpdate(data)
        } else {
            handleCreate(data)
        }
    }

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ProductInput>({
        defaultValues: editData,
    })

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Product Add</DialogTitle>
                <DialogContent>
                    <form>
                        {datas.map((x) => (
                            <TextField
                                margin="normal"
                                label={x.label}
                                required
                                fullWidth
                                {...(x.name === 'collectionId' && {
                                    select: true,
                                    defaultValue: editData.collectionId,
                                })}
                                size="small"
                                variant="outlined"
                                error={!!errors[x.name]}
                                helperText={errors[x.name]?.message}
                                key={x.name}
                                {...register(x.name, x.rule)}
                            >
                                {x.name === 'collectionId' &&
                                    collectionsData?.collectionList?.map(
                                        (item) => (
                                            <MenuItem value={item.id}>
                                                {item.title}
                                            </MenuItem>
                                        )
                                    )}
                            </TextField>
                        ))}

                        <DialogActions>
                            <Button
                                onClick={handleClose as React.MouseEventHandler}
                                color="primary"
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
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
