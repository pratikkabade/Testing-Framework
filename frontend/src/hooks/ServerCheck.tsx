import { useEffect, useState } from "react";
import { Output } from "../components/Output";
import { Badge } from "flowbite-react";

export const ServerCheck = (data: any) => {
    const [status, setStatus] = useState('NA')
    
    const fetchstatus = async () => {
        const res = await fetch('http://localhost:5000/')
        const values = await res.json()
        setStatus(values.response)
    }

    useEffect(() => {
        fetchstatus()
    }, [])

    return (
        <>
            {
                status === '200' ?
                    <Output d={data.d} />
                    :
                    <div className="flex flex-row justify-center items-center">
                        <Badge size="xl" color="blue">
                            Please Check the Server!
                        </Badge>
                    </div>
            }
        </>
    )
}