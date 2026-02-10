import { StatCard } from "@/components/layouts/dashboard/StatCard";
import { ProjectTable } from "@/features/projects";

export default async function DashboardPage() {


  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Projects"
          value="24"
          icon="folder_open"
          trend={{
            value: "12%",
            isUp: true,
            description: "increase from last month",
          }}
        />
        <StatCard
          label="Active Deadlines"
          value="7"
          icon="event_note"
          iconColorClass="text-orange-600 dark:text-orange-400"
          iconBgClass="bg-orange-100 dark:bg-orange-900/30"
          trend={{
            value: "3",
            isUp: false,
            description: "projects due this week",
          }}
        />
        <StatCard
          label="Remaining Budget"
          value="$42,850"
          icon="account_balance_wallet"
          iconColorClass="text-emerald-600 dark:text-emerald-400"
          iconBgClass="bg-emerald-100 dark:bg-emerald-900/30"
          progress={{
            current: 68,
            total: 100,
            description: "68% of total budget used",
          }}
        />
      </div>

      {/* Projects Table */}
      <ProjectTable />
    </div>
  )
}