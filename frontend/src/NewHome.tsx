import { useState } from "react";
import { NavbarLayout } from "./components/layout/NavbarLayout";
import { Output } from "./components/Output";
import './styles/App.css'
import './styles/Animations.css'
import { ServerCheck } from "./components/layout/ServerCheck";
import { Scripts } from "./components/scripts/Scripts";

function NewHome() {
  const [result, setResult] = useState('0');
  const [selectedScript, setSelectedScript] = useState('')
  const [scriptsList, setScriptsList] = useState('NA');

  return (
    <>
      <NavbarLayout />
      <div className="mt-10">
        <div className="flex flex-row flex-grow justify-around max-lg:items-center max-lg:flex-col">
          <div className="w-6/12 max-lg:w-3/4 bg-white rounded-2xl h-full">
            <Scripts
              selectedScriptC={selectedScript}              
              setResultC={setResult}
              setSelectedScriptC={setSelectedScript}
              setScriptsListC={setScriptsList} />
          </div>
          <div className="w-3/12 max-lg:mt-8 max-lg:w-3/4 bg-white rounded-2xl">
            <Output
              resultC={result}
              selectedScriptC={selectedScript}
              scriptsListC={scriptsList} />
          </div>
        </div>
        <ServerCheck />
      </div>
    </>
  )
}

export default NewHome
