import Image from "next/image";

interface TeamMember {
    name: string;
    image: string;
}

interface Project {
    id: string;
    name: string;
    client: string;
    status: 'In Progress' | 'Completed' | 'On Hold';
    team: TeamMember[];
    deadline: string;
    budget: string;
}

const statusClasses = {
    'In Progress': 'bg-primary/10 text-primary',
    'Completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'On Hold': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Website Redesign',
        client: 'Starlight Corp',
        status: 'In Progress',
        team: [
            { name: 'Alice', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRrueQNMgDJvJnTojrTWrKVfECuR-hTPnTHVS02Syq-CMK7_ItRAPkFtJyRz8AJZLuhKRdAxlHyTG03uap9zrgYwI57a4e3sQpjpiPEk2NDP0EybbcdftBBstuE-64pEa-Hd6KoNf9TeG6D_C-5ahKZr7f2AZcoBvXSg288UBqN47j06qn6ckuyIl_sxBpMk-v6p4JpBxoY-YKoUdcod1MUmc5bBdCBGTf3py-Yf7K8j_MP_GDVkDemGdVR8Ds5Q-f6T6jmm7yqGM' },
            { name: 'Bob', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJedqtZOUJ_qIAhmQluOXRYS7gMAflI_V4QmzYu1zdgD3brnCGtIGRS2uMk2d0eewmkiwrx2QxKwwQf8NIgVE4MyCihM3oREXkM4qwXQR93TwJAO8n8jlvJSxIN1AUmT0vxn4gW8-qNER8Yoxdc-x0sHtzIyAUMNc0dR22PySMFqs_zguTji8ED0Yp-Sb1FDz0yIn-pRxTIxQEpZBPbRnnLeZg6hOTeys4dyTJ-efU9jTAPM7MC2VIWR9uvHGDzmy5EG3iWJk1F6E' },
            { name: 'Charlie', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFOx1UovNJUCSW_aXZEhD6JhoxAZLhewQG9dBJ3alPeiE65yEo2cESC9kXV5OU4yqj1VDNCQTyTgePIXNJpXSI6D12e6N50kmusje51zzn-_4HgfQeNp1Zl4i4VdOmal7aNxfL8Ro7V1ukn_7YGr4346q6uV6tB5AK1zWh1eJ36FnV7h9QatGQhJmaSX6o_y9TBcelotWReXGdz8Zu4Ka2rkSOsHAWrBQkMHIp7dqEkKIsZ6DRxiXApuGJk_zbgVz9wcqOaUlK0Hk' },
        ],
        deadline: 'Oct 12, 2023',
        budget: '$12,000',
    },
    {
        id: '2',
        name: 'Mobile App Beta',
        client: 'TechPulse Inc',
        status: 'Completed',
        team: [
            { name: 'David', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5uTLeDzqA9lnnMvEGTJgppFYjDEYOqGX0AdnjaEQZBEKZFRZOohxTvuvP6HVNvbrjG-9K2N6A6gz9yb0UiKP7mz8_n1xfcCIo05UNv_GAuIK3VvSu11y_T1kKmyWRgTa-45CAcUnWiCOTJcMYNnWvcechHxKXXbBiFuBwYGRuOFDDVWxgQbuSnRvrESuFIW9BJqNWiYpds32_75jvza1O9JYNd3eRMDdntDCQVBD7i_9qUQ0-D9RgYAt-BWMcblkXQWgSLxqqjXc' },
            { name: 'Eve', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGctHn0bWpUdWjgoJUyl6jaU2s0vXMf8uhvl3jnGoiYy98WIEjaM2NVvRi2CTK_L84Y81EGpkG9020iafSlAts22uMrBGboDXDTl2PSxZvOoX1jm8n6Nrb_xM5Xs76l9fwmRlWbdA-B0L0B7aoUBu2N6Ngw1GI47WPheF_G9sGImRGtqPMEqbm6OtkzQmDKi2bKanpqdzBz4uxwaQluEwHgWusRYRiVv83LZSF2-f8cw_DzSrw39NprqfBMhs5giPe_mH7cI-QWbg' },
        ],
        deadline: 'Sep 28, 2023',
        budget: '$8,500',
    },
    {
        id: '3',
        name: 'SEO Optimization',
        client: 'GreenLeaf Retail',
        status: 'On Hold',
        team: [
            { name: 'Frank', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDE8wujkMBjh9laFTlndDy7Ty91esMx-2CqEd_ok107uLSeIeMu0OKUu2tweXdqbimldUjjNitVvcfDkJt83US-hxGwSSDklISnFvKtclnRL2p7g9IiuSn74O2y1onHZlhHHxSJA5d12XyAW7G_jppRmT7PCUlS1IF2kr3Au-l87LP9eII54qRydeUQsRO-WqmTsPJhORmWu_QBAW9yXlhfGs-MGntxXJmFBHgnmrsjcDeRVAK0TKXkm4DF3Dgg8IGUdbPhS0IiJg' },
        ],
        deadline: 'Nov 05, 2023',
        budget: '$3,200',
    },
    {
        id: '4',
        name: 'Infrastructure Audit',
        client: 'Nexa Cloud',
        status: 'In Progress',
        team: [
            { name: 'Grace', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE77Oiw7jBPGxynCs9xyrG8C4-Oj1caALfOJDI49XCcyAMl1KiPRXnu9bZYJT2BmupXul_pmebPubgxMKIJyNeL5fVt6zqOBMJEE6nG1MYEr5DRDuICLM7O8ssgFKXp7H_Dw0cimAgs8mZaEDULJRSVXxWFKwaUvMh023oEuOUfrn20NGWG6HMZYCkqRjOsB46kO3nhGmz7PE8yDg-pOQzoMA_xXMsTdSJYfdqPLTqui4lzAQ5d1CYVIbcgO5_MgOz2B3nO1AwQRk' },
            { name: 'Hank', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPJkGDmO4NwmmCL_keezUB4Cf0WkRtgr4RS088HW2NZe-PqOrZWMXqwqsu1AttqmPAOnRuoWPY-JMl6h1FvbugByoBtbS4PVPz13EbMW3HO38O3np37t3U2E3pBu1QZ5jpwwXUPQtb_LPCgdombg0G_nQmJlDZJj0K3d_ID2VDqY9aH_QRk9nmyZreM0pnmd7HlLAwAToZ_v6XC4B7KURt1V4h7rABfaiKISwuGPj1Aw2iOeszVyr6DuJlq4fFjoZKdsRcxkMxsUE' },
        ],
        deadline: 'Oct 24, 2023',
        budget: '$15,400',
    },
];

export function ProjectTable() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white placeholder-slate-400"
                        placeholder="Search projects..."
                        type="text"
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-2 pl-4 pr-10 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                        <option>All Status</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>On Hold</option>
                    </select>
                    <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-icons text-slate-500">filter_list</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                            <th className="px-6 py-4">Project Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Team</th>
                            <th className="px-6 py-4">Deadline</th>
                            <th className="px-6 py-4 text-right">Budget</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mockProjects.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900 dark:text-white">{project.name}</span>
                                        <span className="text-xs text-slate-500">{project.client}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[project.status]}`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex -space-x-2">
                                        {project.team.map((member) => (
                                            <Image
                                                key={member.name}
                                                alt={member.name}
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200"
                                                src={member.image}
                                                width={32}
                                                height={32}
                                            />
                                        ))}
                                        {project.team.length > 3 && (
                                            <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                                +{project.team.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{project.deadline}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{project.budget}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                        <span className="material-icons">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-sm text-slate-500">Showing 1 to {mockProjects.length} of 24 projects</span>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">Next</button>
                </div>
            </div>
        </div>
    );
}
