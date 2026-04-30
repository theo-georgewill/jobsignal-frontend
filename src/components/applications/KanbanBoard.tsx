import { useState } from "react";
import { Kanban } from "react-kanban-kit";
import type { BoardData } from "react-kanban-kit";

const initialBoard: BoardData = {
  root: {
    id: "root",
    title: "Applications",
    parentId: null,
    children: ["saved", "applied", "interview"],
    totalChildrenCount: 3,
  },

  saved: {
    id: "saved",
    title: "Saved",
    parentId: "root",
    children: ["1", "2"],
    totalChildrenCount: 2,
  },

  applied: {
    id: "applied",
    title: "Applied",
    parentId: "root",
    children: ["3"],
    totalChildrenCount: 1,
  },

  interview: {
    id: "interview",
    title: "Interview",
    parentId: "root",
    children: ["4"],
    totalChildrenCount: 1,
  },

  "1": {
    id: "1",
    title: "Stripe",
    parentId: "saved",
    children: [],
    totalChildrenCount: 0,
    type: "job",
    content: {
      role: "Frontend Engineer",
      location: "Remote",
    },
  },

  "2": {
    id: "2",
    title: "Notion",
    parentId: "saved",
    children: [],
    totalChildrenCount: 0,
    type: "job",
    content: {
      role: "Product Manager",
      location: "Remote",
    },
  },

  "3": {
    id: "3",
    title: "Meta",
    parentId: "applied",
    children: [],
    totalChildrenCount: 0,
    type: "job",
    content: {
      role: "Product Designer",
      location: "London",
    },
  },

  "4": {
    id: "4",
    title: "Shopify",
    parentId: "interview",
    children: [],
    totalChildrenCount: 0,
    type: "job",
    content: {
      role: "Growth Analyst",
      location: "Remote",
    },
  },
};

const configMap = {
  job: {
    render: ({ data }: any) => (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-slate-900">
          {data.title}
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          {data.content.role}
        </p>

        <p className="mt-3 text-xs text-slate-500">
          {data.content.location}
        </p>
      </div>
    ),
    isDraggable: true,
  },
};

export default function KanbanBoard() {
  const [board, setBoard] = useState<BoardData>(initialBoard);

  const handleCardMove = ({
    cardId,
    fromColumnId,
    toColumnId,
    position,
  }: any) => {
    const next: BoardData = structuredClone(board);

    next[fromColumnId].children =
      next[fromColumnId].children.filter(
        (id) => id !== cardId
      );

    next[toColumnId].children.splice(position, 0, cardId);

    next[cardId].parentId = toColumnId;

    next[fromColumnId].totalChildrenCount =
      next[fromColumnId].children.length;

    next[toColumnId].totalChildrenCount =
      next[toColumnId].children.length;

    setBoard(next);
  };

  return (
    <div className="rounded-3xl bg-slate-50 p-6">
      <Kanban
        dataSource={board}
        configMap={configMap}
        onCardMove={handleCardMove}
        rootClassName="flex gap-5 overflow-x-auto pb-4"
        columnWrapperClassName={() =>
          "min-w-[320px] rounded-2xl bg-slate-100 p-4"
        }
      />
    </div>
  );
}