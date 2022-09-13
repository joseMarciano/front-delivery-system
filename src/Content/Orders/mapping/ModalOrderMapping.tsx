import { AspectRatio, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import {icon} from 'leaflet'
import truckPopUp from  '../../../assets/truck.png'

type ModalProps = {
    isOpen: boolean,
    onClose: () => void
}
const customMarker = icon({
    iconUrl: truckPopUp,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });

export function ModalOrderMapping({ isOpen, onClose }: ModalProps) {
    return (
        <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Mapping a Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody  >
                    <AspectRatio maxW={'1000px'}>
                        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker icon={customMarker} position={[51.505, -0.09]}>
                                <Popup />                                   
                            </Marker>
                        </MapContainer>
                    </AspectRatio>
                </ModalBody>
                <ModalFooter>
                    <Button mr={2} variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}