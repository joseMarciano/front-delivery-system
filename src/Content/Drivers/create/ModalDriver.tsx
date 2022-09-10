import { useState } from "react"
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import httpClient from '../../../configs/axios'

type ModalProps = {
    isOpen: boolean,
    onClose: () => void
}

const basePath = 'drivers'

export function ModalDriver({ isOpen, onClose }: ModalProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [name, setName] = useState('')
    const toast = useToast()

    const save = async () => {
        try {
            if (name.length > 255) return toast({ status: 'error', description: 'Name must be less than 255' })
            setIsSaving(true)
            await httpClient.post(basePath, { name })
            setName('')
            toast({ status: 'success', description: 'Driver saved' })
            onClose()
        } catch (error) {
            toast({ status: 'error', description: 'Internal server error' })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adding a Driver</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={isSaving}  variant='ghost' onClick={onClose}>Cancel</Button>
                    <Button isLoading={isSaving} onClick={save} disabled={name.length < 3} colorScheme='blue'>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}