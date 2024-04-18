'use client'

import Heading from "../Heading"
import PersonInfo from "./PersonInfo"

const info = [
    {

    }
]

const TeamMemberInfo=()=>{
    return (
        <div className="mt-4">
            <Heading 
             title="Team members"
             subtitle="Some of the basic information about our tema members"
             center
            />
            <PersonInfo />
        </div>
    )
}

export default TeamMemberInfo