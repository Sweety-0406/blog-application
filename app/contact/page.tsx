import getCurrentUser from "../action/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import ContactClient from "./ContactClient"


const ContactPage = async ()=>{
    const currentUser = await getCurrentUser()

    return(
        <ClientOnly>
            <ContactClient currentUser = {currentUser} />
        </ClientOnly>
    )
}

export default ContactPage