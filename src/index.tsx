import 'leaflet/dist/leaflet.css'
import './assets/styles/leaflet.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
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
