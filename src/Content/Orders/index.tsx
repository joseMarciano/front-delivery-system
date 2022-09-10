import { Badge, Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { GoPlus } from 'react-icons/go'
import { HiRefresh } from 'react-icons/hi'
import httpClient from '../../configs/axios'
import { ModalOrder } from "./create/ModalOrder"

const basePath = 'orders'

type StatusOrder = 'CREATED' | 'DELIVERED' | 'IN_PROGRESS'

type Order = {
    id: string,
    description: string,
    statusOrder: StatusOrder,
    deliveredAt: string,
}

export function Orders() {
    const { isOpen, onClose, onOpen } = useDisclosure({ id: 'order-modal' })
    const [isSearching, setIsSearching] = useState(false)
    const [orders, setOrder] = useState<Order[]>([])



    const onCloseProxy = () => {
        onClose()
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
                <Button onClick={onOpen} isLoading={isSearching} colorScheme={'green'} leftIcon={<GoPlus />}>Order</Button>
                <Button onClick={refresh} isLoading={isSearching} colorScheme={'blue'} leftIcon={<HiRefresh />}>Refresh</Button>
            </Flex>

            <TableContainer mt={5}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Identifier</Th>
                            <Th>Description</Th>
                            <Th>statusOrder</Th>
                            <Th>Delivered at</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.description}</Td>
                                <Td> <BadgeStatusOrder keyOrder={order.statusOrder} /></Td>
                                <Td>{order.deliveredAt}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
        <ModalOrder isOpen={isOpen} onClose={onCloseProxy} />
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