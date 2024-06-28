import { useEffect, useState } from "react";
import { Status } from "../visuals/Status";
import { SingleRunButton } from "../visuals/SingleRunButton";
import { MultipleRunButton } from "../visuals/MultipleRunButton";
import { SCCDScriptList } from "../../constants/List";
import { URL } from "../../constants/URL";

type SCCDscriptProp = {
    selectedScriptCS: string;
    setResultCS: React.Dispatch<React.SetStateAction<string>>;
    setSelectedScriptCS: React.Dispatch<React.SetStateAction<string>>;
    setScriptsListCS: React.Dispatch<React.SetStateAction<string>>;
}

export const SCCD = (props: SCCDscriptProp) => {
    const [data, setData] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [total, setTotal] = useState(0)
    const [showFailed, setShowFailed] = useState(false)

    useEffect(() => {
        setTotal(SCCDScriptList.length)
        let newData = [];
        for (let i of SCCDScriptList) {
            newData.push(i.id + '|' + 'not_ran');
        }
        setData(newData);
    }, []);

    // count total of passed scripts
    const passed = data.filter(i => i.includes('True')).length

    return (
        <>
            <div className="flex flex-row justify-end mb-5">
                {
                    <label className={passed !== 0 ? 'slide-up' : 'opacity-0'}>
                        <input type="checkbox" name="show-failed" id="show-failed" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 2xl:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
                            onChange={() => {
                                setShowFailed(!showFailed)
                            }} />
                        Show failed only
                    </label>
                }
            </div>
            <div className="scrl w-full">
                {
                    SCCDScriptList
                        .filter(i => showFailed ? !data[parseInt(i.id)].includes('True') : true)
                        .map((i) => {
                            return (
                                <div className={`flex w-full items-center justify-between shadow-sm border-2 p-2 my-1 text-left font-medium text-gray-600 rounded-2xl hover:bg-gray-100 cursor-default + ${props.selectedScriptCS === 'SCCD|' + i.id + '|' + i.name ? 'border-gray-600 text-black' : ''}`}
                                    key={i.name}
                                    onClick={() => {
                                        props.setScriptsListCS(i.details.join('|'))
                                        props.setResultCS(data[parseInt(i.id)].split('|')[1])
                                        props.setSelectedScriptCS('SCCD|' + i.id + '|' + i.name)
                                    }}
                                >
                                    <div>
                                        {/* <Spinner color="warning" className="mr-5" /> */}
                                        <div className="flex flex-row items-center">
                                            <Status data={data[parseInt(i.id)]} id={i.id} />
                                            <div className="flex flex-col">
                                                <b className="text-lg">Script {parseInt(i.id) + 1}</b>{i.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        onClick={async () => {
                                            const index = parseInt(i.id)
                                            const newData = [...data]
                                            newData[index] = i.id + '|' + 'Running'
                                            setData(newData)

                                            props.setResultCS('0')
                                            const res = await fetch(URL + '/SCCD/' + i.id)
                                            const values = await res.json()
                                            const newData2 = [...data]
                                            newData2[index] = i.id + '|' + values[0]
                                            setData(newData2)
                                        }}>
                                        <SingleRunButton data={data[parseInt(i.id)]} id={i.id} />
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            <div className="flex flex-row justify-end p-2">
                <div className="flex flex-row justify-end items-center">
                    <span className="mr-2 bg-slate-100 p-1 px-2.5 rounded-2xl cursor-default"><b>{passed}/{total}</b> cases passed</span>
                    <div
                        onClick={async () => {
                            setIsRunning(true)
                            for (let i of SCCDScriptList) {
                                const index = parseInt(i.id)

                                setData(prevData => {
                                    let newData = [...prevData];
                                    newData[index] = i.id + '|' + 'Running';
                                    return newData;
                                });

                                props.setResultCS('0')
                                const res = await fetch(URL + '/SCCD/' + i.id)
                                const values = await res.json()

                                setData(prevData => {
                                    let newData = [...prevData];
                                    newData[index] = i.id + '|' + values[0];
                                    return newData;
                                });
                            }
                            setIsRunning(false)
                        }}
                    >
                        <MultipleRunButton data={isRunning} />
                    </div>
                </div>
            </div>
        </>
    )
}
