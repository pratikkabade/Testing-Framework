import { Tabs } from "flowbite-react"
import { Netcool } from "./Netcool"
import { SCCD } from "./SCCD";

type scriptProp = {
    selectedScriptC: string;
    setResultC: React.Dispatch<React.SetStateAction<string>>;
    setSelectedScriptC: React.Dispatch<React.SetStateAction<string>>;
    setScriptsListC: React.Dispatch<React.SetStateAction<string>>;
}

export const Scripts = (props: scriptProp) => {
    return (
        <div className="flex rounded-2xl p-2 border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col">
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item title="SCCD">
                    <SCCD
                        selectedScriptCS={props.selectedScriptC}
                        setResultCS={props.setResultC}
                        setSelectedScriptCS={props.setSelectedScriptC}
                        setScriptsListCS={props.setScriptsListC} />
                </Tabs.Item>
                <Tabs.Item active title="Netcool">
                    <Netcool
                        selectedScriptCN={props.selectedScriptC}
                        setResultCN={props.setResultC}
                        setSelectedScriptCN={props.setSelectedScriptC}
                        setScriptsListCN={props.setScriptsListC} />
                </Tabs.Item>
            </Tabs>
        </div>
    )
}