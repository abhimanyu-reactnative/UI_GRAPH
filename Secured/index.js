import { Graph, DomHelpers } from '@maxgraph/core';

console.log(Graph,"Graph")
const container = document.getElementById('graphContainer');
// Ensure the container exists before trying to create a graph
if (!container) {
    console.error('Graph container not found! Make sure an element with id "graphContainer" exists in your HTML.');
} else {
    const graph = new Graph(container);
 
    // Optional settings
    graph.setConnectable(true);
    graph.setPanning(true);
    graph.setTooltips(true);
    graph.setEnabled(true);
 
    // Apply translation (e.g., shift graph by 50px right and 30px down)
    // TEMPORARILY COMMENT THIS OUT FOR INITIAL DEBUGGING to ensure graph is not pushed off-screen
    // graph.getView().translate = { x: 600, y: 200 };
 
    // Define styles (ensure these styles are defined or imported elsewhere if not standard)
    const stylesheet = graph.getStylesheet();
    console.log(stylesheet); // This will show default stylesheet
 
    // Orthogonal edge
    stylesheet.putCellStyle('OrthogonalEdge', {
        edgeStyle: 'orthogonalEdgeStyle',
        strokeColor:"#b9647d",
    });
 
    // Curved edge
    stylesheet.putCellStyle('CurvedEdge', {
        edgeStyle: 'curvedEdgeStyle',
        strokeColor: 'blue',
    });
 
    // Segmented edge
    stylesheet.putCellStyle('SegmentEdge', {
        edgeStyle: 'segmentEdgeStyle',
        strokeColor: 'green',
    });
 
    const model = graph.getDataModel();
    const parent = graph.getDefaultParent();
 
    model.beginUpdate();
    try {
        // Add vertices with applied styles
        // NOTE: The styles 'StartStyle', 'StepStyle', 'EllipseStyle', 'RhombusStyle', 'DecisionStyle', 'EndStyle'
        // are not defined in your provided index.js. You'll need to define these with stylesheet.putCellStyle()
        // for them to have an effect, otherwise maxGraph will use default styles.
        const v1 = graph.insertVertex(parent, null, 'Start', 40, 40, 100, 40 /*, 'StartStyle'*/);
        const v2 = graph.insertVertex(parent, null, 'Step A', 200, 40, 100, 40 /*, 'StepStyle'*/);
        const v3 = graph.insertVertex(parent, null, 'Step B', 200, 120, 100, 40 /*, 'EllipseStyle'*/);
        const v4 = graph.insertVertex(parent, null, 'Step C', 200, 200, 100, 40 /*, 'RhombusStyle'*/);
        const v5 = graph.insertVertex(parent, null, 'Decision', 360, 120, 100, 40 /*, 'DecisionStyle'*/);
        const v6 = graph.insertVertex(parent, null, 'End', 520, 120, 100, 40 /*, 'EndStyle'*/);
        const v7 = graph.insertVertex(parent, null, 'Extra A', 360, 40, 100, 40 /*, 'StepStyle'*/);
        const v8 = graph.insertVertex(parent, null, 'Extra B', 360, 200, 100, 40 /*, 'EllipseStyle'*/);
 
        // Add edges with different connector styles
        graph.insertEdge(parent, null, 'Next', v1, v2, 'edgeStyle=orthogonalEdgeStyle;strokeColor=#b9647d');
        graph.insertEdge(parent, null, '', v2, v3, 'edgeStyle=curvedEdgeStyle;strokeColor=blue');
        graph.insertEdge(parent, null, '', v3, v4, 'edgeStyle=orthogonalEdgeStyle;strokeColor=red');
        graph.insertEdge(parent, null, 'Check', v3, v5, 'edgeStyle=segmentEdgeStyle;strokeColor=green');
        graph.insertEdge(parent, null, 'Finish', v5, v6, 'edgeStyle=curvedEdgeStyle;strokeColor=purple');
        graph.insertEdge(parent, null, 'Branch A', v2, v7, 'edgeStyle=orthogonalEdgeStyle;strokeColor=orange');
        graph.insertEdge(parent, null, 'Branch B', v4, v8, 'edgeStyle=curvedEdgeStyle;strokeColor=gray');
 
    } finally {
        model.endUpdate();
    }
}