import { useState } from "react";
import { NavbarLayout } from "./components/layout/NavbarLayout";
import './styles/App.css'
import './styles/Animations.css'
import { ServerCheck } from "./components/layout/ServerCheck";
import { Scripts } from "./components/scripts/Scripts";
import { Output } from "./components/output/Output";

function NewHome() {
  const [result, setResult] = useState('0');
  const [selectedScript, setSelectedScript] = useState('')
  const [scriptsList, setScriptsList] = useState('NA');
  const [serverIsRunning, setServerIsRunning] = useState(false);

  return (
    <div>
      <NavbarLayout />
      <ServerCheck setServerIsRunningC={setServerIsRunning} />
      {
        serverIsRunning ?
          <div className="mt-10 fade-in2">
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
          </div>
          :
          <div className="bg-pink-100 h-screen animate-pulse top-0 left-0 w-screen fixed -z-10">

          </div>
      }
    </div>
  )
}

export default NewHome
