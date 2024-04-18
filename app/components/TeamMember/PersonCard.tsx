'use client'

interface PersonInfoProps{
    name:string,
    age:string,
    image?:string,
    role:string
}

const PersonInfo:React.FC<PersonInfoProps> = ({
    name,
    age,
    image,
    role
})=>{
    return(
        <div className="
            border-2
            border-sky-700
            rounded-xl
            w-full
            md:w-[220px]
            xl:w-[250px]
            p-2
            bg-sky-50
            mb-3
            
        ">
          <div className="group cursor-pointer">
            <img className="rounded-full mx-auto h-36 w-36 border-[1px] border-sky-700 group-hover:scale-110
                     transition" src={image} alt="image" />
          </div>
          <div className="font-bold border-[1px] border-sky-700 rounded-3xl mt-2 pl-2 bg-sky-100">
            About 
          </div>
          <div className="pl-2">
            <div>
                <span className="font-semibold">Name: </span> {name}
            </div>
            <div>
                <span className="font-semibold">Age: </span> {age}
            </div>
            <div>
                <span className="font-semibold">Role: </span> {role}
            </div>
            <div className="hidden sm:block">
                <span className="font-semibold">Description: </span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium aut  perferendi suscipit itaque asperiores  cupiditate, doloribus !
            </div>
          </div>
        </div>
    )
}

export default PersonInfo