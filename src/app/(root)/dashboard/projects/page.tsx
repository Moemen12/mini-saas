import { ProjectTable } from "@/features/projects";
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ProjectTable />
    </div>
  );
}