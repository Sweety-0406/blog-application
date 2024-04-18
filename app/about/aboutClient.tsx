'use client'

import Container from "../components/Container"
import Heading from "../components/Heading"
import TeamMemberInfo from "../components/TeamMember/TeamMemberInfo"
import HistoryPage from "./HistoryPage"

const AboutClient=()=>{
    return(
        <Container>
            <div className="mb-4 font-bold text-3xl text-center text-sky-500">
                Welcome To Our Company Side
            </div>
            <div className="border-[1px] border-sky-500"></div>
            <TeamMemberInfo />
            <div className="border-[1px] border-sky-500 mt-4"></div>
            <div className="my-4">
                <Heading
                 title="History of our company"
                 subtitle="About what we done before, how reached there "
                 center
                 />
            </div>
            <div>
                <HistoryPage />
            </div>
            <div className="mt-6 text-center -mb-16 border-2 border-black rounded-full p-2 text-white bg-black">
            <footer>
                <p>&copy; {new Date().getFullYear()} Blogifier. All rights reserved.</p>
            </footer>
            </div>
        </Container>
    )
}

export default AboutClient