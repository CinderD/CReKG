const visConfigDefault = {
    //any flat change on the object for the network is now under visConfig and uses the config from vis-network

    physics:{  // fun to play with, 变成会抖动的模样
        enabled: false, //决定是否是common vis(所有node在边缘一圈)
        barnesHut: {
            theta: 0.5,
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0
        },
        forceAtlas2Based: {
            theta: 0.5,
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 0
        },
        repulsion: {
            centralGravity: 0.2,
            springLength: 200,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09
        },
        hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 100,
            springConstant: 0.01,
            nodeDistance: 120,
            damping: 0.09,
            avoidOverlap: 0
        },
        maxVelocity: 50,
        minVelocity: 0.1,
        solver: 'barnesHut',
        stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true,
        wind: { x: 0, y: 0 }
    },
    // manipulation: { // not really understand how it works
    //     enabled: false,
    //     initiallyActive: false,
    //     addNode: true,
    //     addEdge: true,
    //     editNode: undefined,
    //     editEdge: true,
    //     deleteNode: true,
    //     deleteEdge: true,
    //     controlNodeStyle:{
    //     // all node options are valid.
    //     }
    // },
    nodes: {
        shadow: true,
        font: {
            size: 14, // px
            face: 'arial',
            ital: {
                color: '#343434',
                size: 14, // px
                face: 'arial',
                vadjust: 0,
                mod: 'italic',
            },
        },
        fixed: false,
    },
    edges: {
        arrows: {
            to: {enabled: true},
            // from: {enabled: true}
        },
        // shadow: true,
        smooth: true,

    },
    layout: {
        randomSeed: undefined,
        // improvedLayout:true, // 要不要build-in的cluster algorithm去减少一些nodes

        //Kamada Kawai algorithm for initial layout. For networks larger than 100 nodes,
        //clustering will be performed automatically to reduce the amount of nodes
        //This can greatly improve the stabilization times.
        clusterThreshold: 150,
        hierarchical: {
            enabled:false,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed, 后者是按照A->B的模式分层
            shakeTowards: 'leaves'  // roots, leaves
        }
    },
    interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: true, // This can greatly speed up responsiveness on dragging, improving user experience
        hideEdgesOnZoom: true, // This can greatly speed up responsiveness on zooming, improving user experience.
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: {x: 10, y: 10, zoom: 0.02},
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: true, // 长按，支持多重选择
        navigationButtons: true, // 可以被css
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300, // 对应title，title可以被css优化
        zoomSpeed: 1,
        zoomView: true
    },

}
const visConfigCLuster = {
    //any flat change on the object for the network is now under visConfig and uses the config from vis-network

    physics:{  // fun to play with, 变成会抖动的模样
        enabled: false, //决定是否是common vis(所有node在边缘一圈)
        barnesHut: {
            theta: 0.5,
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0
        },
        forceAtlas2Based: {
            theta: 0.5,
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 0
        },
        repulsion: {
            centralGravity: 0.2,
            springLength: 200,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09
        },
        hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 100,
            springConstant: 0.01,
            nodeDistance: 120,
            damping: 0.09,
            avoidOverlap: 0
        },
        maxVelocity: 50,
        minVelocity: 0.1,
        solver: 'barnesHut',
        stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true,
        wind: { x: 0, y: 0 }
    },
    nodes: {
        shadow: true,
        font: {
            size: 14, // px
            face: 'arial',
            ital: {
                color: '#343434',
                size: 14, // px
                face: 'arial',
                vadjust: 0,
                mod: 'italic',
            },
        },
        fixed: false,
    },
    edges: {
        arrows: {
            to: {enabled: true},
            // from: {enabled: true}
        },
        // shadow: true,
        smooth: true,

    },
    layout: {
        randomSeed: undefined,
        improvedLayout:true, // 要不要build-in的cluster algorithm去减少一些nodes

        //Kamada Kawai algorithm for initial layout. For networks larger than 100 nodes,
        //clustering will be performed automatically to reduce the amount of nodes
        //This can greatly improve the stabilization times.
        clusterThreshold: 150,
        hierarchical: {
            enabled:false,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed, 后者是按照A->B的模式分层
            shakeTowards: 'leaves'  // roots, leaves
        }
    },
    interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: true, // This can greatly speed up responsiveness on dragging, improving user experience
        hideEdgesOnZoom: true, // This can greatly speed up responsiveness on zooming, improving user experience.
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: {x: 10, y: 10, zoom: 0.02},
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: true, // 长按，支持多重选择
        navigationButtons: true, // 可以被css
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300, // 对应title，title可以被css优化
        zoomSpeed: 1,
        zoomView: true
    },
}
const visConfigHier = {
    // the subgraph will be present as a hierarchical mode
    physics:{
        enabled: false
    },
    nodes: {
        shadow: true,
        font: {
            size: 14, // px
            face: 'arial',
            ital: {
                color: '#343434',
                size: 14, // px
                face: 'arial',
                vadjust: 0,
                mod: 'italic',
            },
        },
        fixed: false,
    },
    edges: {
        arrows: {
            to: {enabled: true},
            // from: {enabled: true}
        },
        shadow: true,
        label: "name",
        // smooth: true,

    },
    layout: {
        randomSeed: undefined,
        // improvedLayout:true, // 要不要build-in的cluster algorithm去减少一些nodes

        //Kamada Kawai algorithm for initial layout. For networks larger than 100 nodes,
        //clustering will be performed automatically to reduce the amount of nodes
        //This can greatly improve the stabilization times.
        clusterThreshold: 150,
        hierarchical: {
            enabled:true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed, 后者是按照A->B的模式分层
            shakeTowards: 'leaves'  // roots, leaves
        }
    },
    interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: true, // This can greatly speed up responsiveness on dragging, improving user experience
        hideEdgesOnZoom: true, // This can greatly speed up responsiveness on zooming, improving user experience.
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: {x: 10, y: 10, zoom: 0.02},
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: true, // 长按，支持多重选择
        navigationButtons: true, // 可以被css
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300, // 对应title，title可以被css优化
        zoomSpeed: 1,
        zoomView: true
    },

}
const visConfigPhysics = {
    //physics = true! orignial layout

    physics:{  // fun to play with, 变成会抖动的模样
        enabled: true, //决定是否是common vis(所有node在边缘一圈)
        barnesHut: {
            theta: 0.5,
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0
        },
        forceAtlas2Based: {
            theta: 0.5,
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 0
        },
        repulsion: {
            centralGravity: 0.2,
            springLength: 200,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09
        },
        hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 100,
            springConstant: 0.01,
            nodeDistance: 120,
            damping: 0.09,
            avoidOverlap: 0
        },
        maxVelocity: 50,
        minVelocity: 0.1,
        solver: 'barnesHut',
        stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true,
        wind: { x: 0, y: 0 }
    },

    nodes: {
        shadow: true,
        font: {
            size: 14, // px
            face: 'arial',
            ital: {
                color: '#343434',
                size: 14, // px
                face: 'arial',
                vadjust: 0,
                mod: 'italic',
            },
        },
        fixed: false,
    },
    edges: {
        arrows: {
            to: {enabled: true},
            // from: {enabled: true}
        },
        // shadow: true,
        smooth: true,

    },
    layout: {
        randomSeed: undefined,
        // improvedLayout:true, // 要不要build-in的cluster algorithm去减少一些nodes

        //Kamada Kawai algorithm for initial layout. For networks larger than 100 nodes,
        //clustering will be performed automatically to reduce the amount of nodes
        //This can greatly improve the stabilization times.
        clusterThreshold: 150,
        hierarchical: {
            enabled:false,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed, 后者是按照A->B的模式分层
            shakeTowards: 'leaves'  // roots, leaves
        }
    },
    interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: true, // This can greatly speed up responsiveness on dragging, improving user experience
        hideEdgesOnZoom: true, // This can greatly speed up responsiveness on zooming, improving user experience.
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: {x: 10, y: 10, zoom: 0.02},
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: true, // 长按，支持多重选择
        navigationButtons: true, // 可以被css
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300, // 对应title，title可以被css优化
        zoomSpeed: 1,
        zoomView: true
    },

}

export {visConfigDefault, visConfigHier, visConfigPhysics, visConfigCLuster}