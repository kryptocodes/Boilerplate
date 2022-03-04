import react from 'react'
import { Badge, Box, Button, Grid, GridItem, Heading, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'


const Tasks = () => {
    const [ modal, setModal ] = useState(false)
	const [discordModal, setDiscordModal] = useState(false)
	const [tasks, setTasks] = useState({
		login: false,
		follow: false,
		retweet: false,
		discord: false,
		discord_server:false
	})

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
        <>
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
        </>

    )
}

export default Tasks