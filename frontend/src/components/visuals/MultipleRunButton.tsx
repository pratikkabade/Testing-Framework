import { Button } from "flowbite-react"

export const MultipleRunButton = (data: any) => {
    return (
        <>
            {
                !data.data ?
                    <Button
                        color={'blue'}
                        size={'md'}>
                        Run All
                    </Button>
                    :
                    <Button
                        color={'warning'}
                        size={'md'}
                        disabled
                        className="bg-yellow-700">
                        Running
                    </Button>
            }
        </>
    )
}