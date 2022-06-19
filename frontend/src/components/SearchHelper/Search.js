import $ from "jquery"
import {labels, relationsWithLabel} from "../VisualHelper/KGconfig";
import {visConfigDefault, visConfigPhysics, visConfigHier, visConfigCLuster} from "../VisualHelper/visConfig";
const NeoVis = require("neovis.js")

function GetSearchConfig(elementToSearch,visConfig){ // the configuration of the searching function
    var SearchConfig={
        neo4j:{
            serverUrl:"bolt://localhost:7687",
            serverUser:"neo4j",
            serverPassword:"LKG",
        },
        containerId:"viz",
        initialCypher: "match p=(n)-[r]-(m) where n.name =~"+ " '.*" + elementToSearch+ ".*' " + "or n.relation =~"+" '.*"+ elementToSearch+ ".*' " +
            "or r.relation =~"+" '.*"+elementToSearch+ ".*' "+ "or m.name =~"+ " '.*" + elementToSearch+ ".*' "+ "or m.relation =~"+" '.*"+ elementToSearch+ ".*' "+"return * LIMIT 100",

        consoleDebug: true,
        labels: labels,
        relationships:relationsWithLabel,
        visConfig: visConfig,
    }
    return SearchConfig
}
function clearViz(){
    var viz = document.getElementById("viz")
    var table1 = document.getElementById('table1')
    viz.innerHTML=""
    table1.style.display = '';
    // table1.style.width = '680px';
    // table1.style.height = '500px';
    // viz.style.width = "700px";
    viz.style.marginLeft = "0px";
    viz.style.borderLeftColor = "rgba(168, 166, 166, 0.178)";
  }

function searchInTable(elementToSearch) { // function to trigger searching from each keywords table cell


    console.log("Search for: ",elementToSearch)
    var searchInTableConfig
    var searchMode =  $("#searchModeselect").val()//value
    switch(searchMode){
        case 'circle':
            searchInTableConfig = GetSearchConfig(elementToSearch,visConfigDefault)
            break;
        case 'cluster':
            searchInTableConfig = GetSearchConfig(elementToSearch,visConfigCLuster)
            break;
        case 'hierarchical':
            searchInTableConfig = GetSearchConfig(elementToSearch,visConfigHier)
            break;
        case 'physics':
            searchInTableConfig = GetSearchConfig(elementToSearch,visConfigPhysics)
            break;
        default:
            searchInTableConfig = GetSearchConfig(elementToSearch,visConfigHier)
            console.log('defaulf')
            break;
    }
    var vizSearchInT = new NeoVis.default(searchInTableConfig);
    vizSearchInT.render();

    vizSearchInT.registerOnEvent("completed", ()=>{ 
                vizSearchInT["network"].on("select", ()=>{
                    var selected = vizSearchInT["network"].getSelection();
                    vizSearchInT["network"].deleteSelected()
                    console.log(selected)

                // event.nodes[0] or event.edges[0] have id of node or edge  clicked
                // you can get data of node data as viz["_nodes"][event.nodes[0]], similarly do for edges
                });

            });
    console.log("vizSearchInT")

}



export {GetSearchConfig,searchInTable,clearViz}