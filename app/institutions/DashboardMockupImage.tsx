'use client';

export default function DashboardMockupImage() {
    return (
        <img
            src="/assets/dashboard-mock.png"
            alt="CodeVarsity Admin Dashboard"
            className="rounded-xl border border-white/10 w-full h-auto bg-[#f8fafc] object-cover"
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                <div class="bg-gray-50 rounded-xl border border-gray-200 p-6 h-80 flex flex-col">
                    <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                        <div class="font-bold text-gray-800">Institute Dashboard</div>
                        <div class="w-8 h-8 bg-blue-100 rounded-full"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div class="bg-white p-4 rounded border border-gray-100 shadow-sm"><div class="text-xs text-gray-500 mb-1">Total Groups</div><div class="text-2xl font-bold text-blue-600">12</div></div>
                        <div class="bg-white p-4 rounded border border-gray-100 shadow-sm"><div class="text-xs text-gray-500 mb-1">Active Students</div><div class="text-2xl font-bold text-green-600">340</div></div>
                        <div class="bg-white p-4 rounded border border-gray-100 shadow-sm"><div class="text-xs text-gray-500 mb-1">Pending</div><div class="text-2xl font-bold text-yellow-600">5</div></div>
                    </div>
                    <div class="flex-1 bg-white rounded border border-gray-100 shadow-sm p-4">
                        <div class="h-4 bg-gray-100 w-1/4 rounded mb-4"></div>
                        <div class="space-y-2">
                            <div class="h-8 bg-gray-50 rounded w-full"></div>
                            <div class="h-8 bg-gray-50 rounded w-full"></div>
                            <div class="h-8 bg-gray-50 rounded w-full"></div>
                        </div>
                    </div>
                </div>
                `;
            }}
        />
    );
}
