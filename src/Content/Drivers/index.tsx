import { Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { GoPlus } from 'react-icons/go'
import { HiRefresh } from 'react-icons/hi'

export function Drivers() {


    return <Box>
        <Flex justifyContent={'space-between'}>
            <Button colorScheme={'green'} leftIcon={<GoPlus />}>Driver</Button>
            <Button colorScheme={'blue'} leftIcon={<HiRefresh />}>Refresh</Button>
        </Flex>
        
        <TableContainer mt={5}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Identifier</Th>
                        <Th>Name</Th>
                        <Th>Created at </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>28fde6f5-ff5b-41b5-8cae-780444f0fa95</Td>
                        <Td>John</Td>
                        <Td>24/05/2022</Td>
                    </Tr>
                    <Tr>
                        <Td>28fde6f5-ff5b-41b5-8cae-780444f0fa95</Td>
                        <Td>John</Td>
                        <Td>24/05/2022</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
}