import type { NextPage } from 'next'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { walletConnect } from '../src/components/MetamaskProvider'
import { LazyAuth } from 'lazyauth'
import { Badge, Box, Button, Grid, GridItem, Heading, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PortisConnector } from '@web3-react/portis-connector'

const Home: NextPage = () => {
	
	const { active, account, library: provider, activate, deactivate, connector, chainId } = useWeb3React()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [ isLoading, setIsLoading ] = useState(false)
	//@ts-ignore
	const [ modal, setModal ] = useState(false)
	const [discordModal, setDiscordModal] = useState(false)
	const [tasks, setTasks] = useState({
		login: false,
		follow: false,
		retweet: false,
		discord: false,
		discord_server:false
	})

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
			onClose()
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
			onClose()
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
			onClose()
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

	const LoginTwitter = async () => {
		localStorage.setItem('twitter',"true")
		setTasks({
			...tasks,
			login: true
		})
	}

	const ModalPop = () => (
		<Modal isOpen={modal} onClose={() => setModal(false)}>
		<ModalOverlay />
		<ModalContent>
			<ModalBody>
					{
					
						<Stack>
							<Text>Follow this Twitter handle</Text>
							<Text>If you have already followed click on the check</Text>
							<Grid templateColumns='repeat(2, 1fr)' gap={1}>
								<GridItem>
								<Button onClick={() => { setTasks({...tasks,follow:true}) 
									setModal(false)}}>Check</Button>
								</GridItem>
								<GridItem>
								<Button onClick={() => window.open("https://twitter.com/dehidden_?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor","_blank")}>Open</Button>
								</GridItem>
							</Grid>
						</Stack>
					}
			</ModalBody>
		</ModalContent>
	</Modal>
	)

	const DiscordModalPop = () => (
		<Modal isOpen={discordModal} onClose={() => setDiscordModal(false)}>
		<ModalOverlay />
		<ModalContent>
			<ModalBody>
					{
					
						<Stack>
							<Text>Join this Discord server</Text>
							<Text>If you have already joined the server</Text>
							<Grid templateColumns='repeat(2, 1fr)' gap={1}>
								<GridItem>
								<Button onClick={() => { setTasks({...tasks,discord_server:true}) 
									setDiscordModal(false)}}>Check</Button>
								</GridItem>
								<GridItem>
								<Button onClick={() => window.open("https://discord.com/invite/EkbDZw2F","_blank")}>Open</Button>
								</GridItem>
							</Grid>
						</Stack>
					}
			</ModalBody>
		</ModalContent>
	</Modal>
	)

	return(
		<Box background={'transparent'}>
			<HStack background={'transparent'} justify={'space-between'} px={{ base: 8, md: 8 }} py={{ base: 4, md: 8 }}>
				<Heading>BoilerPlate</Heading>
				{
					active ? <Badge colorScheme={'green'}>CONNECTED</Badge> :
					<Button onClick={onOpen}>Connect Wallet</Button>
				}
			</HStack>
			<VStack background={'transparent'}>
				{!active && <Text align='center'>You are not connected</Text>}
				{
					active && account && 
					<VStack>
						<Text>You are connected as <strong>{account.slice(0,9)}...{account.slice(-9)}</strong></Text>
						<Text>Network Id: <strong>{chainId}</strong></Text>
						<Text>Tasks</Text>
						<Stack>
							<Button colorScheme={tasks?.login ? 'green' : 'gray'} onClick={() => setTasks({...tasks,login:true})}>{tasks?.login ? "Connected" : "Connect your twitter"}</Button>
							{tasks?.login && 
							<Button colorScheme={tasks?.follow ? 'green' : 'gray'} onClick={() => setModal(true)}>{tasks?.follow ? "Followed" : "Follow"}</Button>
						}
						<Button colorScheme={tasks?.discord ? 'blue' : 'gray'} onClick={() => setTasks({...tasks,discord:true})}>{tasks?.discord ? "Connected" : "Connect your Discord"}</Button>
						{tasks?.discord && 
							<Button colorScheme={tasks?.discord_server ? 'green' : 'gray'} onClick={() => setDiscordModal(true)}>{tasks?.discord_server ? "Joined" : "Join the server"}</Button>
						}
						</Stack>

						{
							// @ts-ignore
							connector && connector.walletConnectProvider !== undefined &&
							<Button onClick={removeWalletconnect}>Disconnect</Button>
						}
					</VStack>
				}
			</VStack>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
							{
								isLoading ? <Text>Loading...</Text> :
								<Stack>
									<Button  onClick={connectBrowser} isLoading={isLoading}>Metamask</Button>
									<Button onClick={connectMobile} isLoading={isLoading}>Mobile (Rainbow, Trust)</Button>
									<Button onClick={connectPortis}>Portis</Button>
								</Stack>
							}
					</ModalBody>
				</ModalContent>
			</Modal>
			<ModalPop/>
			<DiscordModalPop/>
		</Box>
	)
}

export default Home