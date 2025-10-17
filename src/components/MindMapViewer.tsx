import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange
} from "reactflow";
import "reactflow/dist/style.css";
import "../styles/mindmap.css";
import MindMapNode from "./MindMapNode";

export type MindMapConfig = {
  initialZoom?: number;
  layout?: "dagre" | "force" | "default";
  showLabels?: boolean;
};

export type MindMapViewerProps = {
  nodes?: Node<any>[];
  edges?: Edge[];
  config?: MindMapConfig;
  onNodeClick?: (node: Node<any>) => void;
};

const nodeTypes = { mindmapNode: MindMapNode };

function MindMapViewerInner({
  nodes: initialNodes = [],
  edges: initialEdges = [],
  onNodeClick
}: Omit<MindMapViewerProps, 'config'>) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => setNodes(initialNodes), [initialNodes]);
  useEffect(() => setEdges(initialEdges), [initialEdges]);

  // Node / Edge state handlers (React Flow pattern)
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);
  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  // Node click
  const handleNodeClick = useCallback(
    (_evt: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      onNodeClick?.(node);
    },
    [onNodeClick]
  );

  // Keyboard handlers
  const { setViewport, getViewport } = useReactFlow();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const vp = getViewport();
      if (["+", "="].includes(e.key)) {
        e.preventDefault();
        setViewport({ x: vp.x, y: vp.y, zoom: Math.min(2.5, vp.zoom * 1.2) }, { duration: 0 });
      } else if (["-","_"].includes(e.key)) {
        e.preventDefault();
        setViewport({ x: vp.x, y: vp.y, zoom: Math.max(0.1, vp.zoom / 1.2) }, { duration: 0 });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setViewport({ ...vp, x: vp.x + 100 }, { duration: 0 });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setViewport({ ...vp, x: vp.x - 100 }, { duration: 0 });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setViewport({ ...vp, y: vp.y + 100 }, { duration: 0 });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setViewport({ ...vp, y: vp.y - 100 }, { duration: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setViewport, getViewport]);

  // Expand/collapse helper (simple flag-based children show/hide)
  const toggleCollapse = useCallback((nodeId: string) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          return { ...n, data: { ...n.data, collapsed: !n.data?.collapsed } };
        }
        return n;
      })
    );
  }, []);

  const visibleNodes = useMemo(() => {
    // hide nodes where their ancestor is collapsed (simple approach)
    const collapsedParents = new Set<string>();
    nodes.forEach((n) => {
      if (n.data?.collapsed && n.data?.childrenIds) {
        n.data.childrenIds.forEach((cid: string) => collapsedParents.add(cid));
      }
    });
    return nodes.filter((n) => !collapsedParents.has(n.id));
  }, [nodes]);

  return (
    <div className="mindmap-container">
      <div className="mindmap-canvas" role="region" aria-label="Mind map viewer">
        <ReactFlow
          nodes={visibleNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2.5}
          onNodeClick={handleNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll
          zoomOnScroll
          panOnDrag
          zoomOnPinch
          attributionPosition="bottom-left"
        >
          <Background />
          <MiniMap nodeStrokeColor={(n) => (n.data?.collapsed ? "#ff0072" : "#0047ff")} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <aside className="mindmap-sidepanel" aria-live="polite">
        {selectedNode ? (
          <div className="node-details">
            <h3>{selectedNode.data?.label}</h3>
            <div className="node-meta">{selectedNode.data?.details}</div>
            <div className="node-actions">
              <button onClick={() => toggleCollapse(selectedNode.id)}>
                {selectedNode.data?.collapsed ? "Expand children" : "Collapse children"}
              </button>
              <button onClick={() => setSelectedNode(null)}>Close</button>
            </div>
          </div>
        ) : (
          <div className="node-placeholder">Click a node to see details</div>
        )}
      </aside>
    </div>
  );
}

export default function MindMapViewer({
  nodes: initialNodes = [],
  edges: initialEdges = [],
  onNodeClick
}: MindMapViewerProps) {

  return (
    <ReactFlowProvider>
      <MindMapViewerInner 
        nodes={initialNodes}
        edges={initialEdges}
        onNodeClick={onNodeClick}
      />
    </ReactFlowProvider>
  );
}
