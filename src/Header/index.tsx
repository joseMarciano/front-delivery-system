import { Box, Flex, Heading, Icon } from "@chakra-ui/react"
import { ReactElement, ReactNode } from "react"
import { GoPackage } from "react-icons/go"



export function Header(): ReactElement {

    return <Flex align={'center'} justify={'center'}  p={5} as="header">
        <Heading display={'flex'} alignItems={'center'} justifyContent={'space-between'}>Order manager <Icon ml={3} as={GoPackage} /></Heading>
    </Flex>
}