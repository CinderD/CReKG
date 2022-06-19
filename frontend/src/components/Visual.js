import {EyeOutlined, SearchOutlined, CaretDownOutlined}  from "@ant-design/icons";
import {drawFullCircleKG,drawFullPhysicsKG,drawFullHierKG,drawFullClusterKG} from "./VisualHelper/DrawKG";
import {Collapse} from "./SearchHelper/Collapse";
import React, {useState} from "react";
import {visConfigCLuster, visConfigDefault, visConfigHier, visConfigPhysics} from "./VisualHelper/visConfig";
import {GetSearchConfig} from "./SearchHelper/Search";

const NeoVis = require("neovis.js")

function Visual(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('')
    const [mode, setMode] = useState("circle")

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // do searching for the input word according to the chosen visualization type
    function searchInBox() {
        var elementToSearch = text
        var searchBoxConfig
        switch(mode){
            case "circle":
                searchBoxConfig = GetSearchConfig(elementToSearch,visConfigDefault)
                break;
            case "cluster":
                searchBoxConfig = GetSearchConfig(elementToSearch,visConfigCLuster)
                break;
            case "hierarchical":
                searchBoxConfig = GetSearchConfig(elementToSearch,visConfigHier)
                break;
            case "physics":
                searchBoxConfig = GetSearchConfig(elementToSearch,visConfigPhysics)
                break;
            default:
                searchBoxConfig = GetSearchConfig(elementToSearch,visConfigDefault)
                console.log('default')
                break;
        }
        var vizSearch = new NeoVis.default(searchBoxConfig);
        vizSearch.render();
    }

    return (
        <div className="flex bg-[#f2f2f2] h-full w-full h-full absolute">
            <div className="block basis-1/4 grow-0 shrink-0 max-w-[25%] px-4 mt-3.5 ">
                <div className="flex flex-col rounded-md bg-white mt-3 ">
                    <div className="flex flex-row px-5 border-b-[1px] border-[#979797]/[0.1] rounded ">
                        <button className="" onClick={searchInBox}><SearchOutlined /></button>
                        <div className="flex grow shrink basis-0 w-full">
                            <input type="text" className="py-5 pl-2 w-full outline-0 text-xs mt-2" placeholder="Search... Please capitalize the first letter"
                                    value={text} onChange={(event) => setText(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="border-b-[1px] border-[#979797]/[0.1] py-3 rounded">
                        <span className="pl-8" >Keywords Suggestions</span>
                        <span className="float-right pt-1 pr-2">
                            <CaretDownOutlined className="" onClick={handleToggle}/>
                        </span>
                    </div>
                    <Collapse isOpen={isOpen} >
                        <div className="flex flex-row justify-evenly border-b-[1px] border-[#979797]/[0.1] py-3">
                            <span>Payment</span><span>Governing Law</span><span>Provision</span>
                        </div>
                        <div className="flex flex-row justify-evenly border-b-[1px] border-[#979797]/[0.1] py-3">
                            <span>Obligation</span><span>Disclosure</span><span>Disclaimer</span>
                        </div>
                        <div className="flex flex-row justify-evenly border-b-[1px] border-[#979797]/[0.1] py-3">
                            <span>Dispute</span><span>Payment</span><span>Sale</span>
                        </div>

                    </Collapse>

                    <div className="py-4 w-full rounded">
                        <span className="pl-8">
                            Current View Mode :
                        </span>
                        <select className="pl-2"   value={mode} onChange={(event) => setMode(event.target.value)}>
                            <option value="circle">circlal</option>
                            <option value="cluster">cluster</option>
                            <option value="hierarchical">hierarchicy</option>
                            <option value="physics">physics</option>
                        </select>
                    </div>

                    <div className="bg-[#f2f2f2] py-8 w-full">

                    </div>

                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick={drawFullCircleKG}
                    >
                        <div className="mr-2.5"><EyeOutlined /></div>
                        <div className="ml-2.5">View Knowledge Graph (Circle)</div>
                    </button>

                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick={drawFullHierKG}
                    >
                        <div className="mr-2.5"><EyeOutlined/></div>
                        <div className="ml-2.5">View Knowledge Graph (HRCHY)</div>
                    </button>

                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick={drawFullClusterKG}
                    >
                        <div className="mr-2.5"><EyeOutlined/></div>
                        <div className="ml-2.5">View Knowledge Graph (Cluster)</div>
                    </button>

                    <button
                        className="flex hover:text-sky-500 flex-row align-middle items-center px-3.5 py-4 border-[#979797]/[0.1] border-b-[1px]"
                        onClick={drawFullPhysicsKG}
                    >
                        <div className="mr-2.5"><EyeOutlined/></div>
                        <div className="ml-2.5">View Knowledge Graph (Physics)</div>
                    </button>
                </div>
            </div>
            <div className="block basis-3/4 grow-0 shrink-0 max-w-[75%] px-4 container" id="viz">
            </div>
        </div>
    );
}

export default Visual;
