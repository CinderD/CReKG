import {labels, relations, relationsWithLabel} from "./KGconfig";
import {visConfigDefault, visConfigPhysics, visConfigHier, visConfigCLuster} from "./visConfig";
const NeoVis = require("neovis.js")

function GetFullKgConfig(visConfig){ 
    // the configuration for the Full KG display (actually 500 nodes, the full KG is too large and will consume a lot of time)
    var fullKGConfig ={
        neo4j:{
            serverUrl:"bolt://localhost:7687",
            serverUser:"neo4j",
            serverPassword:"LKG",
        },
        containerId:"viz",
        initialCypher: "MATCH (n)-[r:Relation]->(m) RETURN * LIMIT 500 ", // delete LIMIT 500 to show full KG
        consoleDebug: true,
        labels: labels,
        relationships: relations,
        visConfig: visConfig,
    }
    return fullKGConfig
}

// functions to draw each kind of KG visualization
function drawFullCircleKG(){
    var fullKGConfig = GetFullKgConfig(visConfigDefault)
    var viz = new NeoVis.default(fullKGConfig);
    viz.render();
}

function drawFullClusterKG(){
    var fullKGConfig = GetFullKgConfig(visConfigCLuster)
    var viz = new NeoVis.default(fullKGConfig);
    viz.render();
}

function drawFullPhysicsKG(){
    var fullKGConfig = GetFullKgConfig(visConfigPhysics)
    var viz = new NeoVis.default(fullKGConfig);
    viz.render();
}

function drawFullHierKG(){
    var fullKGConfig = GetFullKgConfig(visConfigHier)
    var viz = new NeoVis.default(fullKGConfig);
    viz.render();
}
export {drawFullCircleKG, drawFullPhysicsKG, drawFullHierKG, drawFullClusterKG};