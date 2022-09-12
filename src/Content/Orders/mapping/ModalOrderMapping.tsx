import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

type ModalProps = {
    isOpen: boolean,
    onClose: () => void
}


export function ModalOrderMapping({ isOpen, onClose }: ModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Mapping a Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    MODAL BODY
                </ModalBody>
                <ModalFooter>
                    <Button mr={2} variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}