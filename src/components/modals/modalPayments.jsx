import { ModalWrapper } from "./wrapperModal"

export const ModalPayments = ({
    visible,
    onClose,
    children
}) => {
    return (
        <ModalWrapper
            visible={visible}
            onClose={onClose}
            maxWidth={600}
        >
            <div className={`style-modal-payment`}>
                <div className="style-payment">
                    {children}
                </div>
            </div>
        </ModalWrapper>
    )
}