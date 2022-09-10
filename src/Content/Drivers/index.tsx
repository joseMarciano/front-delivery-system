import httpClient from '../../configs/axios'
import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { GoPlus } from 'react-icons/go'
import { HiRefresh } from 'react-icons/hi'
import { useState } from 'react'

const basePath = 'drivers'

type Driver = {
    id: string,
    name: string
}

export function Drivers() {
    const [isSearching, setIsSearching] = useState(false)
    const [drivers, setDrivers] = useState<Driver[]>([])


    const fillDriversList = (drivers: Driver[]) => setDrivers(drivers)

    const refresh = async () => {
        try {
            setIsSearching(true)
            const response = await httpClient.get<Driver[]>(basePath)
            fillDriversList(response.data)
        } finally {
            setIsSearching(false)
        }
    }

    return <Box>
        <Flex justifyContent={'space-between'}>
            <Button isLoading={isSearching} colorScheme={'green'} leftIcon={<GoPlus />}>Driver</Button>
            <Button isLoading={isSearching} onClick={refresh} colorScheme={'blue'} leftIcon={<HiRefresh />}>Refresh</Button>
        </Flex>

        <TableContainer mt={5}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Identifier</Th>
                        <Th>Name</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {drivers.map((driver) => (
                        <Tr key={driver.id}>
                            <Td>{driver.id}</Td>
                            <Td>{driver.name}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
}