import { Handle, Position, NodeProps } from "reactflow";

import "../styles/mindmap.css";

/**
 * Custom node renderer — accessible and keyboard-focusable.
 * data: { label, details, collapsed, childrenIds }
 */
export default function MindMapNode({ data }: NodeProps) {
  const { label, collapsed } = data || {};
  return (
    <div
      className={`mindmap-node ${collapsed ? "collapsed" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={collapsed ? "true" : "false"}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          (e.target as HTMLElement).click();
        }
      }}
      onClick={() => {
        // React Flow will surface node click to parent via onNodeClick
      }}
    >
      <div className="node-label">{label}</div>
      <div className="node-pill">{collapsed ? "+" : "-"}</div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
