import { useEffect, useState } from "react";
import { Status } from "../layout/Status";
import { SingleRunButton } from "../layout/SingleRunButton";
import { MultipleRunButton } from "../layout/MultipleRunButton";
import { URL } from "../../constants/URL";

type AppProp = {
    name:string;
    selectedScriptCA: string;
    setResultCA: React.Dispatch<React.SetStateAction<string>>;
    setSelectedScriptCA: React.Dispatch<React.SetStateAction<string>>;
    setScriptsListCA: React.Dispatch<React.SetStateAction<string>>;
}
interface ScriptData {
    id: string,
    name: string,
    details: any
}

export const App = (props: AppProp) => {
    const [data, setData] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [total, setTotal] = useState(0)
    const [showFailed, setShowFailed] = useState(false)

    const [scripts, setScripts] = useState<ScriptData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL + '/' + props.name +'/scripts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setScripts(data);
            setTotal(scripts.length)
            let newData = [];
            for (let i of scripts) {
                newData.push(i.id + '|' + 'not_ran');
            }
            setData(newData);
        };
        if (total === 0) {
            fetchData();
        }
    }, [scripts]);

    // count total of passed scripts
    const passed = data.filter(i => i.includes('True')).length

    return (
        <div>
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
            <div className="scrl w-full fade-in">
                {
                    scripts
                        .filter(i => showFailed ? !data[parseInt(i.id)].includes('True') : true)
                        .map((i) => {
                            return (
                                <div className={`flex w-full items-center justify-between shadow-sm border-2 p-2 my-1 text-left font-medium text-gray-600 rounded-2xl hover:bg-gray-100 cursor-default + ${props.selectedScriptCA === '' + props.name +'|' + i.id + '|' + i.name ? 'border-gray-600 text-black' : ''}`}
                                    key={i.name}
                                    onClick={() => {
                                        props.setScriptsListCA(i.details.join('|'))
                                        props.setResultCA(data[parseInt(i.id)].split('|')[1])
                                        props.setSelectedScriptCA('' + props.name +'|' + i.id + '|' + i.name)
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

                                            props.setResultCA('0')
                                            const res = await fetch(URL + '/' + props.name +'/' + i.id)
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
                            for (let i of scripts) {
                                const index = parseInt(i.id)

                                setData(prevData => {
                                    let newData = [...prevData];
                                    newData[index] = i.id + '|' + 'Running';
                                    return newData;
                                });

                                props.setResultCA('0')
                                const res = await fetch(URL + '/' + props.name +'/' + i.id)
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
        </div>
    )
}
