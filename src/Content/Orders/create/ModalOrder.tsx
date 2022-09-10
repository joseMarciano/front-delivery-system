import { useEffect, useState } from "react"
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import httpClient from '../../../configs/axios'
import { Driver } from "../../Drivers"

type ModalProps = {
    isOpen: boolean,
    onClose: () => void
}

const basePath = 'orders'
const basePathDrivers = 'drivers'

export function ModalOrder({ isOpen, onClose }: ModalProps) {
    const [isSaving, setIsSaving] = useState(false)
    const toast = useToast()
    const [driversOptions, setDriversOptions] = useState<Driver[]>([])

    const [description, setDescription] = useState('')
    const [driverId, setDriverId] = useState('')
    const [destiny, setDestiny] = useState('')


    const fillDriversList = (drivers: Driver[]) => setDriversOptions(drivers)

    const findDriversSelect = async () => {
        const response = await httpClient.get<Driver[]>(basePathDrivers)
        fillDriversList(response.data)
    }

    const disableSaveButton = (): boolean => {
        return description.length < 1 || !driverId || !destiny
    }

    const resetStates = () => {
        setDescription('')
        setDriverId('')
        setDestiny('')
    }

    const save = async () => {
        try {
            if (description.length > 255) return toast({ status: 'error', description: 'Description must be less than 255' })
            setIsSaving(true)
            await httpClient.post(basePath, { destiny, description, driverId })
            resetStates()
            toast({ status: 'success', description: 'Driver saved' })
            onClose()
        } catch (error) {
            toast({ status: 'error', description: 'Internal server error' })
        } finally {
            setIsSaving(false)
        }
    }

    useEffect(() => {
        findDriversSelect()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adding a Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <Select placeholder='Select a destiny' value={destiny} onChange={(e) => setDestiny(e.target.value)}>
                            <option value="destiny-1">Destiny 1</option>
                            <option value="destiny-2">Destiny 2</option>
                        </Select>

                        <Select placeholder='Select a driver' value={driverId} onChange={(e) => setDriverId(e.target.value)}>
                            {driversOptions.map((driver) => (
                                <option key={driver.id} value={driver.id}>{driver.name}</option>
                            ))}
                        </Select>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={isSaving} variant='ghost' onClick={onClose}>Cancel</Button>
                    <Button isLoading={isSaving} disabled={disableSaveButton()} onClick={save} colorScheme='blue'>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}