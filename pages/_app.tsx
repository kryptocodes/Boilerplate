import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import MetamaskProvider from '../src/components/MetamaskProvider'
import { ChakraProvider } from '@chakra-ui/react'

const getLibrary = (
  provider: ExternalProvider | JsonRpcFetchFunc
) => {
  return new Web3Provider(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </MetamaskProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
