import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { triggerId: "", triggerName: "", triggerImg: "" },
    type: "trigger",
  },
  {
    id: "2",
    position: { x: 100, y: 300 },
    data: { actionId: "", actionName: "", actionImg: "", metadata: "" },
    type: "action",
  },
];

export const initialEdges: Edge[] = [
  {
    id: "ed-1",
    source: "1",
    target: "2",
  },
];
