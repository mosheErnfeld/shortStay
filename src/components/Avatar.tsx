interface AvatarProps {
    src: string | null | undefined
}

const Avatar : React.FC<AvatarProps> = ({src}) => {
    return (
        <img src={src || '/images/placeholder.png'} alt="avatar" className="rounded-full" height={30} width={30}/>
    )
}


export default Avatar