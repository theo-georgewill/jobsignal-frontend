import KanbanBoard from "@/components/applications/KanbanBoard";

export default function ApplicationsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Applications
        </h1>

        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">
          Add Application
        </button>
      </div>

      <div>
        <input
          placeholder="Search applications..."
          className="w-full md:w-80 px-4 py-2 rounded-xl border border-slate-300"
        />
      </div>

      <KanbanBoard />
    </div>
  );
}