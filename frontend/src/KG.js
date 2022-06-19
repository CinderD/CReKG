import NeoVis from './neovis_2/neovis.js';
import React from "react";

// a trail old file, show be useless 
function draw(){
    var oldConfig ={
        neo4j:{
            serverUrl:"bolt://localhost:11003",
            serverUser:"neo4j",
            serverPassword:"LCKG",
        },
        containerId:"viz",
        initialCypher: "MATCH (n)-[r:Edge]->(m) RETURN * LIMIT 100",
        consoleDebug: true,
        
        labels: {

            Entity: {

                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    cypher: { 
                        value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                        label: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                        group: "MATCH (n) WHERE id(n) = $id RETURN n.community",
    
                    },

                    function: { 
                        title: (props) => NeoVis.objectToTitleHtml(props, ["name", "pagerank","community"]),
                    },
                    static: { 
                        shape: "dot",
                        borderWidth:1.5,


                        font: {
                            size: 15,
                            color:'#343434',
                            strokeWidth:2.5
                        },
                    }
                }
            }
        },
        relationships: {
            Edge: { // same as node but mapped from neo4j relationship to vis.js edge
                // full properties list can be found at https://visjs.github.io/vis-network/docs/network/edges.html
                value: "wight",
                // the default is now without caption
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {// here you put edge properties that aren't mapped directly from the neo4j relationship
                    // cypher: {}, // same as label advance cypher
                    function: { // same as label advance function
                        title: NeoVis.objectToTitleHtml // putting caption on the title
                    },
                    static: {
                        color:'#a6abb5'
                    } // same as label advance static
                }
            }
        },
    



        visConfig: {
            edges: {
                arrows: {
                    to: {enabled: true}
                }
            },
        },

    }

    var viz = new NeoVis.default(oldConfig);
    viz.render();
    console.log(viz);
}


class KnowledgeGraph extends React.Component {
  render() {
    return (
        <body onload="draw()">
            <form role="search" id="form">
                <input type="search" id="query" name="q" placeholder="Search..." aria-label="Search through site content" />
                <button>
                <svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
                </button>
            </form>
        <script src="../js/query.js"></script>

        <div id="viz"></div>
        </body>
    );
  }
}

export default KnowledgeGraph;