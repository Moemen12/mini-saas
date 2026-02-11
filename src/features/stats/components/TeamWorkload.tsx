interface TeamMember {
    id: string;
    name: string;
    email: string;
    projectCount: number;
    activeCount: number;
}

export function TeamWorkload({ members }: Readonly<{
    members: TeamMember[]
}>) {
    return (
        <div className="bg-white dark:bg-slate-900 px-3 py-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Team Workload</h3>
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-500">
                    {members.length} Members
                </span>
            </div>

            <div className="space-y-4">
                {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                {member.name[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{member.name}</p>
                                <p className="text-xs text-slate-500">{member.activeCount} active projects</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{member.projectCount}</span>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Total</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}