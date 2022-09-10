import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Header } from './Header'
import { Content } from './Content'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)


root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Header/>
      <Content />
    </ChakraProvider>
  </React.StrictMode>
)
