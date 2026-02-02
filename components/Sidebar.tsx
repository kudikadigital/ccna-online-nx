import { 
  Users, LayoutDashboard, CheckCircle, DollarSign, ShieldCheck 
} from "lucide-react";
import LogoutBtn from "@/components/ui/Logout";
import Link from "next/link";

export function Sidebar() {
  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Todos os Leads", icon: Users },
    { href: "/admin/registred", label: "Inscritos Confirmados", icon: CheckCircle },
    { href: "/admin/payments", label: "Pagamentos", icon: DollarSign },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#0d1117] flex flex-col fixed h-full z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <span className="font-black tracking-tighter italic">INEFOR ADMIN</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl font-bold text-sm transition-all"
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-800">
        <LogoutBtn />
      </div>
    </aside>
  );
}