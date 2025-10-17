import MindMapViewer from "../components/MindMapViewer";
import sample from "../../data/sample-mindmap.json";

/**
 * Demo route/page — drop this into your app router or open directly.
 * Example (React Router): <Route path="/mindmap-demo" element={<MindMapDemo />} />
 */
export default function MindMapDemo() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MindMapViewer
        nodes={sample.nodes}
        edges={sample.edges}
        config={{ initialZoom: 1, layout: "default", showLabels: true }}
        onNodeClick={(node) => {
          console.log("Node clicked:", node);
        }}
      />
    </div>
  );
}
