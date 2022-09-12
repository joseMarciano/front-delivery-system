import { Badge, Box, Button, Flex, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { GoPlus } from 'react-icons/go'
import { HiRefresh } from 'react-icons/hi'
import { FiMapPin } from 'react-icons/fi'
import { FaMapMarkerAlt } from 'react-icons/fa'
import httpClient from '../../configs/axios'
import { ModalOrder } from "./create/ModalOrder"
import { ModalOrderMapping } from "./mapping/ModalOrderMapping"

const basePath = 'orders'

type StatusOrder = 'CREATED' | 'DELIVERED' | 'IN_PROGRESS'

type Order = {
    id: string,
    description: string,
    statusOrder: StatusOrder,
    deliveredAt: string,
}

export function Orders() {
    const orderModalDisclosure = useDisclosure()
    const mappingModalDisclosure = useDisclosure()

    const [isSearching, setIsSearching] = useState(false)
    const [orders, setOrder] = useState<Order[]>([])
  
    const onCloseOrderModalProxy = () => {
        orderModalDisclosure.onClose()
        refresh()
    }
    const onCloseOrderModalMappingProxy = () => {
        mappingModalDisclosure.onClose()
        refresh()
    }

    const fillOrdersList = (orders: Order[]) => {
        setOrder(orders.map(buildOrder))

        function buildOrder({ id, description, statusOrder, deliveredAt }: Order): Order {
            const dateFormater = new Intl.DateTimeFormat('pt-BR')
            return {
                id,
                description,
                statusOrder,
                deliveredAt: deliveredAt && dateFormater.format(new Date(deliveredAt))
            }
        }
    }

    const refresh = async () => {
        try {
            setIsSearching(true)
            const response = await httpClient.get<Order[]>(basePath)
            fillOrdersList(response.data)
        } finally {
            setIsSearching(false)
        }
    }

    useEffect(() => { refresh() }, [])

    return <>
        <Box>
            <Flex justifyContent={'space-between'}>
                <Button onClick={orderModalDisclosure.onOpen} isLoading={isSearching} colorScheme={'green'} leftIcon={<GoPlus />}>Order</Button>
                <Button onClick={refresh} isLoading={isSearching} colorScheme={'blue'} leftIcon={<HiRefresh />}>Refresh</Button>
            </Flex>

            <TableContainer mt={5}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Identifier</Th>
                            <Th>Description</Th>
                            <Th>Status</Th>
                            <Th>Delivered at</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.description}</Td>
                                <Td> <BadgeStatusOrder keyOrder={order.statusOrder} /></Td>
                                <Td>{order.deliveredAt}</Td>
                                <Td>
                                    { order.statusOrder !== 'IN_PROGRESS' 
                                    ? <Icon  cursor={'pointer'} color={'gray'} boxSize={6} as={FiMapPin} />
                                    : <Icon onClick={mappingModalDisclosure.onOpen}  cursor={'pointer'} color={'gray'} boxSize={6} as={FaMapMarkerAlt} />
                                    }
                                   
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
        <ModalOrder isOpen={orderModalDisclosure.isOpen} onClose={onCloseOrderModalProxy} />
        <ModalOrderMapping isOpen={mappingModalDisclosure.isOpen} onClose={onCloseOrderModalMappingProxy} />
    </>
}


type BadgeStatusOrderProps = {
    keyOrder?: StatusOrder
}
function BadgeStatusOrder({ keyOrder }: BadgeStatusOrderProps) {


    const statusOrders = {
        CREATED: {
            colorScheme: 'orange',
            description: 'Created'
        },
        IN_PROGRESS: {
            colorScheme: 'blue',
            description: 'In progress'
        },
        DELIVERED: {
            colorScheme: 'green',
            description: 'Delivered'
        }
    }

    return <>
        {keyOrder && <Badge variant={'solid'} colorScheme={statusOrders[keyOrder].colorScheme}>{statusOrders[keyOrder].description}</Badge>}
    </>
}