import React from 'react'
import Styles from './App.module.scss'

import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { walletConnect } from './components/MetamaskProvider'
import { LazyAuth } from 'lazyauth'
import { useEffect, useState } from 'react'
import { PortisConnector } from '@web3-react/portis-connector'

export default function App() {
  const { active, account, library: provider, activate, deactivate, connector, chainId } = useWeb3React()
	const [ isLoading, setIsLoading ] = useState(false)

	const injected = new InjectedConnector({
		supportedChainIds: [1, 137, 80001]
	})

	const portis = new PortisConnector({
		dAppId: 'efa76be7-71f3-4b3f-a49a-5cccae6dfaf7',
		networks: [1, 137, 80001]
	})

	const connectBrowser = async () => {
		setIsLoading(true)
		try {
			await activate(injected)
		
		}
		catch(err) {
			console.log(err)
		}
		setIsLoading(false)
	}

	const connectMobile = async () => {
		setIsLoading(true)
		try {
			await activate(walletConnect)
		
		}
		catch(err) {
			console.log(err)
		}
		setIsLoading(false)
	}

	const connectPortis = async () => {
		setIsLoading(true)
		try {
			await activate(portis)
		
		}
		catch (err) {
			console.log(err)
		}
		setIsLoading(false)
	}
	const removeWalletconnect = async () => {
		localStorage.removeItem('walletconnect')
		window.location.reload()
	}
  return (
    <>
   <div className={Styles?.container}>
  <div className={Styles?.interior}>
    <a className={Styles?.btn} href="#open-modal">👋 Connect Wallet</a>
    {
					active && account && 
					<div>
						<p>You are connected as <strong>{account.slice(0,9)}...{account.slice(-9)}</strong></p>
						<p>Network Id: <strong>{chainId}</strong></p>
						{
							// @ts-ignore
							connector && connector.walletConnectProvider !== undefined &&
							<button onClick={removeWalletconnect}>Disconnect</button>
						}
					</div>
				}
  </div>
</div>
<div id="open-modal" className={Styles?.modalWindow}>
  <div>
    <a href="#" title="Close" className={Styles?.modalClose}>Close</a>
    {/* <h1>Voilà!</h1>
    <div>A CSS-only modal based on the :target pseudo-class. Hope you find it helpful.</div>
    <div><small>Check out</small></div>
    <a href="https://aminoeditor.com" target="_blank">👉 Amino: Live CSS Editor for Chrome</a> */}
    <div className={Styles?.modalContent}>
    <button  onClick={connectBrowser}>Meta Mask</button>
    <br/>
    <button  onClick={connectMobile}>Wallet Connect</button>
    </div>
    </div>
</div>
</>
  )
}
