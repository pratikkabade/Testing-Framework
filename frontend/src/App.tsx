import { useState } from "react";
import { Badge, Button } from 'flowbite-react';
import { Refs } from "./constants/List";
import { Replace } from "./functions/Replacements";
import { ServerCheck } from "./hooks/ServerCheck";

function App() {
  const [data, setData] = useState('NA')

  const fetchData = async (id: string) => {
    const res = await fetch('http://localhost:5000/' + id)
    const values = await res.json()
    setData(values[0])
  }

  return (
    <div className="flex flex-col align-middle justify-center items-center">
      <div className="flex flex-row w-4/5 justify-center">
        <Button className="m-3" disabled>SCCD</Button>
        <Button className="m-3">Netcool</Button>
      </div>


      <div className="w-full p-10 justify-center items-center">
        <div className="bg-red-50 p-10 justify-center rounded-xl flex flex-row">
          {
            Refs.map((i) => {
              return (
                <Button className="m-2" color={'yellow'} key={i.name}
                  onClick={() => {
                    Replace()
                    setData('running')
                    fetchData(i.id)
                  }}>
                  {i.name}
                </Button>
              )
            })
          }
        </div>

        <div className="border-2 border-slate-400 bg-slate-100 p-10 my-5 rounded-xl justify-center hidden" id="loader">
          <Badge size="xl" color="warning">
            Running
          </Badge>
        </div>

        <div className="border-2 border-slate-400 bg-slate-100 p-10 my-5 rounded-xl justify-center items-center text-center" id="output">
          <ServerCheck d={data} />
        </div>
      </div>

    </div>
  )
}

export default App
