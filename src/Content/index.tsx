import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Drivers } from "./Drivers"

const TABS = [
    {
        key: 'DRIVER',
        description: 'Drivers',
        Template: Drivers
    },
    {
        key: 'ORDER',
        description: 'Orders',
        Template: () => <>Teste2</>
    }
]

export function Content() {

    return <Box shadow={'1'} maxWidth={'80vw'} margin="0 auto">
        <Tabs isFitted >
            <TabList mb='1em'>{TABS.map(({description}) => <Tab>{description}</Tab>)}</TabList>
            <TabPanels>{TABS.map(({Template}) => <TabPanel><Template/></TabPanel>)}</TabPanels>
        </Tabs>
    </Box>
}