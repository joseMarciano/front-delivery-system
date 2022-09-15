import { AspectRatio, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { icon } from 'leaflet'
import truckPopUp from '../../../assets/truck.png'
import { SockJs } from "../../../configs/WebSocket"
import { useEffect, useState } from "react"
import { Order } from ".."

type ModalProps = {
    order: Order,
    isOpen: boolean,
    onClose: () => void
}
const customMarker = icon({
    iconUrl: truckPopUp,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
})

export function ModalOrderMapping({ isOpen, onClose, order }: ModalProps) {

    const [cordinates, setCordinates] = useState({
        latitude: null as any as number,
        longitude: null as any as number
    })


    useEffect(() => {
        const webSocketClient = SockJs.getInstance()
        webSocketClient.subscribe(`/topic/orders/${order.id}/coordinates/updated`, (message) => {
            if (!message) return
            debugger
            const jsonBody = JSON.parse(message.body as string)
            setCordinates({
                latitude: parseFloat(jsonBody.latitude),
                longitude: parseFloat(jsonBody.longitude)
            })
        })
    }, [])


    return (
        <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Mapping a Order - {order.description}</ModalHeader>
                <ModalCloseButton />
                <ModalBody  >

                    <AspectRatio maxW={'1000px'} margin="0 auto">
                        {(cordinates.latitude && cordinates.longitude) ?
                            <MapContainer center={[cordinates.latitude, cordinates.longitude]} zoom={10} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker icon={customMarker} position={[cordinates.latitude, cordinates.longitude]}>
                                    <Popup >
                                        {`Order ${order.description} is going 🎉 `}
                                    </Popup>
                                </Marker>

                            </MapContainer>
                            : <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        }
                    </AspectRatio>
                    {/* { (!cordinates.latitude || !cordinates.longitude) &&
                            <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                          />
                        } */}
                </ModalBody>
                <ModalFooter>
                    <Button mr={2} variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}