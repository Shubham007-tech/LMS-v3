import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {

    const data = useLoaderData()
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     fetch('https://api.github.com/users/Shubham007-tech')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("data", data)
    //             setData(data)
    //         })
    //     }
    //     , [])




    return (
        <div>
            Github user {data.login}
            <img src={data.avatar_url} alt="User Avatar" />
        </div>
    )
}

export const basicInfo = async () => {
    const res = await fetch('https://api.github.com/users/Shubham007-tech')
    return res.json()
}

export default Github