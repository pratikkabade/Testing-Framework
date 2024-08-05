import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { DownloadButton } from "../layout/DownloadButton";

type scriptProp = {
    resultC: string;
    selectedScriptC: string;
    scriptsListC: string;
}

export const Output = (props: scriptProp) => {
    const [show, setShow] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        if (props.resultC === 'True') {
            setNum(props.scriptsListC.split('|').length)
        } else if (props.resultC === 'False') {
            setNum(0)
        } else {
            setNum(parseInt(props.resultC))
        }
        setShow(false)
    }, [props.resultC, props.scriptsListC])

    const app = props.selectedScriptC.split('|')[0]
    const idSelected = props.selectedScriptC.split('|')[1]

    return (
        <>
            <div className="h-28 p-2 px-4 shadow-md border rounded-t-2xl">
                {
                    props.selectedScriptC === '' ?
                        <div className="flex flex-col text-lg text-center">
                            <b>Please select a Script</b>
                        </div>
                        :
                        <div className="flex flex-col text-lg">
                            <div>
                                <b className="text-xl">Script {parseInt(props.selectedScriptC.split('|')[1]) + 1}</b>
                                <code className="ml-2">({props.selectedScriptC.split('|')[0]})</code>
                            </div>
                            {props.selectedScriptC.split('|')[2]}
                        </div>
                }
            </div>
            <div className="scrl p-5 flex border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col">
                {
                    idSelected === undefined || Number.isNaN(num) ?
                        <p className="p-2 text-lg font-bold text-center">
                            No Data
                        </p>
                        :
                        <>
                            <div className="">
                                {
                                    num !== 0 ? show ?
                                        <div className="bg-emerald-50 p-2 rounded-lg">
                                            {
                                                props.scriptsListC.split('|')
                                                    .slice(0, num)
                                                    .map((i) => {
                                                        return (
                                                            <p key={i} className="fade-in font-mono font-medium cursor-default p-2 py-0.5 rounded-md hover:bg-emerald-100 text-emerald-700">
                                                                {i}
                                                            </p>
                                                        )
                                                    })
                                            }
                                            <p className="cursor-pointer font-semibold text-emerald-700 text-center p-2 rounded-md hover:bg-emerald-100"
                                                onClick={() => {
                                                    setShow(false)
                                                }}>
                                                Hide <b>{num}</b> passed cases
                                            </p>
                                        </div>
                                        :
                                        <p className="cursor-pointer font-semibold text-emerald-700 text-center p-2 rounded-md hover:bg-emerald-100 bg-emerald-50"
                                            onClick={() => {
                                                setShow(true)
                                            }}>
                                            Show <b>{num}</b> passed cases
                                        </p>
                                        : null
                                }
                            </div>
                            {
                                props.scriptsListC.split('|')
                                    .slice(num, num + 1)
                                    .map((i) => {
                                        return (
                                            <p key={i} className="font-mono cursor-default font-semibold text-rose-700 border-2 border-rose-700 p-2 rounded-md hover:bg-rose-100 mt-5">
                                                {i}
                                            </p>
                                        )
                                    })
                            }
                            {
                                props.scriptsListC.split('|')
                                    .slice(num + 1)
                                    .map((i) => {
                                        return (
                                            <p key={i} className="font-mono cursor-default p-2 rounded-md hover:bg-slate-100">
                                                {i}
                                            </p>
                                        )
                                    })
                            }
                        </>
                }
            </div>
            <div className="p-2 pt-8 pb-4 flex flex-row justify-between shadow-md border rounded-b-2xl">
                <Button
                    color={'light'}
                    disabled>
                    Copy
                </Button>


                <DownloadButton app={app} id={idSelected} />
            </div>
        </>
    )
}