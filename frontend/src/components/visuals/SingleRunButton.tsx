import { Button } from "flowbite-react"

export const SingleRunButton = (data: any) => {
    return (
        <>
            {
                data.data === data.id + '|' + 'Running' ?
                    <Button
                        color={'warning'}
                        disabled
                        className="bg-yellow-700">
                        Running
                    </Button>
                    :
                    data.data === data.id + '|' + 'True' ?
                        <Button
                        color={'green'}>
                            Re-Run
                        </Button>
                        :
                        data.data === data.id + '|' + 'not_ran' ?
                            <Button
                                color={'blue'}>
                                Run
                            </Button>
                            :
                            <Button
                                color={'failure'}>
                                Re-Run
                            </Button>
            }
        </>
    )
}