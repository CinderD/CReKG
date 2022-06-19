const NeoVis = require("neovis.js")
const labels ={
  
    Business_Related_Terms: { // everything that is directly on this object gets mapped from the neo4j node
        // full properties list can be found at https://visjs.github.io/vis-network/docs/network/nodes.html

        label: "label", // puts the property `name` from the neo4j node and puts it onto the label property of vis.js's node
        value: "pagerank",
        name:   "name",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { // everything here will be copied directly to the vis.js's node object
                shape: "dot",
                borderWidth:1.5,
                name:'name',
                label: "label", 
                size: "pagerank",
                color:{
                    border:'rgb(187,83,71)',
                    background: 'rgb(198,121,114)',
                    highlight:{

                        borderWidth:3,
                        border:'black'
                    },
                },
                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },

            },
            
            
            // here you put node properties that aren't mapped directly from the neo4j node
            cypher: { // everything here will map to the vis.js node object from a cypher query (like sizeCypher worked but for every property)
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                label: "MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
  
            },
            function: { // everything here will map function thats gets the neo4j node properties to a vis.js node property

                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => { // 节点中显示的label文字，用于截取
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                    
                }

            },

        }
    },
    
    GPE: { // everything that is directly on this object gets mapped from the neo4j node

        label: "label", // puts the property `name` from the neo4j node and puts it onto the label property of vis.js's node
        value: "pagerank",
        name:   "name",

        group: "community",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { // everything here will be copied directly to the vis.js's node object
                shape: "dot",
                borderWidth:1.5,
                label: "label", 
                name:"name",
                size: "pagerank",
                color:{
                    border:'rgb(207,161,58)',
                    background: 'rgb(247,194,104)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },
                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                    // color: "#333333"
                },
            },
            
            
            cypher: { // everything here will map to the vis.js node object from a cypher query (like sizeCypher worked but for every property)
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                label: "MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",

            },
            
            function: { 

                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => { 
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`

                    return label.substring(0, 10) + '...'
            
                }
            },
        }
    },


    Contract_Categories: { 

        label: "label",
        name:"name", 
        value: "pagerank",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",
                color:{
                    border:'rgb(116,179,109)',
                    background: 'rgb(155,201,152)',
                    highlight:{
                        borderWidth:3,
                        border:'black'
                    },
                },
                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },
            },
            

            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },

            function: { 
                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => { 
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                }
            },
        }
    },
    General: { 
        label: "label",
        name:"name", 
        value: "pagerank",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",
                color:{
                    border:'rgb(155,104,58)',
                    background: 'rgb(246,203,69)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },


                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },
            },
            

            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },
            function: { 
                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => {
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                    
                }
            },
        }
    },
    Legal_Related_Practitioner: { 
        label: "label",
        name:"name", 
        value: "pagerank",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",
                color:{

                    border:'rgb(212,119,111)',
                    background: 'rgb(238,125,115)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },


                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },
            },
            

            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },

            function: { 
                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => {
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'      
                }
            },
        }
    },
    Legal_Related_Terms: { 
        label: "label",
        name:"name", 
        value: "pagerank",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",

                color:{
                    border:'rgb(116,179,109)',
                    background: 'rgb(155,201,152)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },


                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },
            },
            

            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },

            function: { 
                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => { 
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                    
                }
            },
        }
    },
    ORG: { 
        label: "label",
        name:"name", 
        value: "pagerank",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",

                color:{

                    border:'rgb(75,132,227)',
                    background: 'rgb(159,194,247)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },


                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },
            },
            

            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },
            function: { 
                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => { 
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                    
                }
            },
        }
    },
    PERSON: { 
        label: "label",
        name:"name", 
        value: "pagerank",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",

                color:{
                    border:'rgb(45,96,26)',
                    background: 'rgb(101,218,121)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },


                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },
            },
            
            

            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },

            function: { 
                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => { 
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                    
                }
            },
        }
    },
    Product: { 
        label: "label",
        name:"name", 
        value: "pagerank",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",

                color:{

                    border:'rgb(116,179,109)',
                    background: 'rgb(155,201,152)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },


                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },
            },
            
            
            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },

            function: { 

                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => { 
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                    
                }

            },

        }
    },
    State_or_Counrty: { 

        label: "label",
        name:"name", 
        value: "pagerank",

        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {

            static: { 
                shape: "dot",
                borderWidth:1.5,
                label: "label",
                name:"name", 
                size: "pagerank",

                color:{
                    border:'rgb(207,161,58)',
                    background: 'rgb(247,197,104)',
                    highlight:{

                        borderWidth:3,
                        border:'black'

                    },
                },
                font: {
                    size: 12,
                    color:'#343434',
                    strokeWidth:1.5
                },

            },
            

            cypher: { 
                value: "MATCH (n) WHERE id(n) = $id RETURN n.pagerank",
                name: "MATCH (n) WHERE id(n) = $id RETURN n.name",
                label:"MATCH (n) WHERE id(n) = $id RETURN labels(n)[0]",
            },
            function: { 

                title: (nodes)=> NeoVis.objectToTitleHtml(nodes,["label","name", "pagerank"]),
                label: node => {
                    const label = `${node.properties.title ? node.properties.title : node.properties.name}`
                    return label.substring(0, 10) + '...'
                    
                }
            },

        }
    }
}
const relations = {
    Relation: { // same as node but mapped from neo4j relationship to vis.js edge
        // full properties list can be found at https://visjs.github.io/vis-network/docs/network/edges.html
        value: "weight",
        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {// here you put edge properties that aren't mapped directly from the neo4j relationship
 
            function: { // same as label advance function
                title: NeoVis.objectToTitleHtml, // putting caption on the title,
            },
            static: {

                color:{
                    color: 'rgb(173,178,187)',
                    opacity: 10,
                    highlight: 'black'
                },
            } 
        }
    }
}
const relationsWithLabel = {
    Relation: { // same as node but mapped from neo4j relationship to vis.js edge

        value: "weight",
        label: "name", 

        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
            function: { 
                title: NeoVis.objectToTitleHtml, // putting caption on the title,
            },
            static: {

                color: {
                    color: 'rgb(173,178,187)',
                    opacity: 10,
                    highlight: 'black'

                },
            }
        }
    }
}

export {labels, relations, relationsWithLabel} ;
