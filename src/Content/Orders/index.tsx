import { Badge, Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { GoPlus } from 'react-icons/go'
import { HiRefresh } from 'react-icons/hi'

export function Orders() {


    return <Box>
        <Flex justifyContent={'space-between'}>
            <Button colorScheme={'green'} leftIcon={<GoPlus />}>Order</Button>
            <Button colorScheme={'blue'} leftIcon={<HiRefresh />}>Refresh</Button>
        </Flex>
        
        <TableContainer mt={5}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Identifier</Th>
                        <Th>Description</Th>
                        <Th>Situation</Th>
                        <Th>Delivered at</Th>
                        <Th>Created at</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>28fde6f5-ff5b-41b5-8cae-780444f0fa95</Td>
                        <Td>Package 1</Td>
                        <Td><Badge variant={'solid'} colorScheme={'green'}>Delivered</Badge></Td>
                        <Td>24/05/2023</Td>
                        <Td>24/05/2022</Td>
                    </Tr>
                    <Tr>
                        <Td>28fde6f5-ff5b-41b5-8cae-780444f0fa95</Td>
                        <Td>Package 2</Td>
                        <Td><Badge colorScheme={'blue'}>In progress</Badge></Td>
                        <Td></Td>
                        <Td>24/05/2022</Td>
                    </Tr>
                    <Tr>
                        <Td>28fde6f5-ff5b-41b5-8cae-780444f0fa95</Td>
                        <Td>Package 3</Td>
                        <Td><Badge colorScheme={'orange'}>Created</Badge></Td>
                        <Td></Td>
                        <Td>24/05/2022</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
}