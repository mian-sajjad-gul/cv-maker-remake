import { getAdminDashboardStats } from "@/lib/supabase/admin";
import { DEFAULT_ADMIN_EMAIL } from "@/lib/adminAuth";
import { AdminShellClient } from "./AdminShellClient";

export async function AdminLayout({ activeTab = "overview", children }) {
  const stats = await getAdminDashboardStats();
  const adminEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL || "admin@cvpair.com";

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
