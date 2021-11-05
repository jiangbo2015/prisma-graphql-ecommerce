import { DialogProps } from '@mui/material'
import { ProductInput } from 'src/__generated__/globalTypes'
import { CollectionInput } from 'src/__generated__/globalTypes'

export type CommonModalProps<T> = {
    open: boolean
    editData: T
    handleClose: DialogProps['onClose']
    handleCreate: (value: T) => void
    handleUpdate: (value: T) => void
}

export type CollectionModalProps = CommonModalProps<CollectionInput>

export type ProductModalProps = CommonModalProps<ProductInput>
