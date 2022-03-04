import axios from 'axios'
const REDIRECT_URL = ''

export const Follow = () => (
    axios.get("API").then(res => {
    })
    .catch(err => {
        console.log(err)
    })
)

export const Disccord = () => (
    axios.get("Discord API").then(res => {
    })
    .catch(err => {
        console.log(err)
    })
)