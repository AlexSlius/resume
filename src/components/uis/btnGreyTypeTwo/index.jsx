import { CButton } from "@coreui/react"

export const BtnGreyTypeTwo = ({
    label = 'submit',
    onClick = () => { },
    disabled = false,
}) => {
    return (
        <CButton
            disabled={disabled}
            type="button"
            className='btn btn-grend-type-two btn-min-grey btn-sta-w'
            onClick={onClick}
            color="secondary"
            variant="outline"
        >{label}
        </CButton>
    )
}