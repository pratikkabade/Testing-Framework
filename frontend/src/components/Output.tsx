import { Badge } from "flowbite-react"

export const Output = (data: any) => {
    console.log(data.d)
    return (
        <div>
            {
                data.d === 'NA' ?
                    <div className="flex flex-row justify-center items-center">
                        <Badge size="xl" color="info">
                            Run the Test
                        </Badge>
                    </div>
                    :
                    data.d === 'True' ?
                        <Badge size="xl" color="green">
                            Passed
                        </Badge>
                        :
                        data.d === 'False' ?
                            <Badge size="xl" color="red">
                                Failed
                            </Badge>
                            :
                            <Badge size="xl" color="dark">
                                Something went wrong! Check the backend
                            </Badge>

            }
        </div>
    )
}