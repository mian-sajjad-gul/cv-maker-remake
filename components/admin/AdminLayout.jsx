import { getAdminDashboardStats } from "@/lib/supabase/admin";

import { AdminShellClient } from "./AdminShellClient";

export async function AdminLayout({ activeTab = "overview", children }) {
  const stats = await getAdminDashboardStats();
  const adminEmail = process.env.ADMIN_EMAIL;

  return (
    <AdminShellClient
      activeTab={activeTab}
      stats={stats}
      adminEmail={adminEmail}
    >
      {children}
    </AdminShellClient>
  );
}
