import { Tabs } from "flowbite-react"
import { useEffect, useState } from "react";
import { URL } from "../../constants/URL";
import { App } from "./App";

type scriptProp = {
    selectedScriptC: string;
    setResultC: React.Dispatch<React.SetStateAction<string>>;
    setSelectedScriptC: React.Dispatch<React.SetStateAction<string>>;
    setScriptsListC: React.Dispatch<React.SetStateAction<string>>;
}

export const Scripts = (props: scriptProp) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL + '/apps');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data);
        };
        if (items.length === 0) {
            fetchData();
        }
    }, [items]);

    return (
        <div className="flex rounded-2xl p-2 border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col">
            <Tabs aria-label="Default tabs" style="default">
                {
                    items.map((item, index) => {
                        return (
                            <Tabs.Item title={item} key={index} className="p-2">
                                <App
                                    name={item}
                                    selectedScriptCA={props.selectedScriptC}
                                    setResultCA={props.setResultC}
                                    setSelectedScriptCA={props.setSelectedScriptC}
                                    setScriptsListCA={props.setScriptsListC} />
                            </Tabs.Item>
                        )
                    })
                }
            </Tabs>
        </div>
    )
}