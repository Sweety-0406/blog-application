import ClientOnly from "../components/ClientOnly"
import AboutClient from "./aboutClient"


const AboutPage = async ()=>{
    return (
        <ClientOnly>
            <AboutClient/>
        </ClientOnly>
    )
}


export default AboutPage