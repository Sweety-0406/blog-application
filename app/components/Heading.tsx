'use client';

interface HeadingProps{
    title:String,
    subtitle?:String,
    center?:boolean,
    color?:boolean
}
const Heading:React.FC<HeadingProps>=({
    title,
    subtitle,
    center,
    color
})=>{
    return (
        <div className={center?'text-center':'text-start'}>
            <div className="text-xl font-bold">
                {title}
            </div>
            <div className={`
             font-light
             ${color? "text-sky-600 font-semibold" : "placeholder: text-neutral-500 mt-2"}
             `}>
                 {subtitle}
            </div>
        </div>
    )
}

export default Heading;