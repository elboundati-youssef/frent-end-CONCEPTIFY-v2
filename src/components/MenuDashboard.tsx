import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FolderPlus, Users, LogOut, Briefcase, X } from "lucide-react";

// On définit le type des props reçues
interface MenuDashboardProps {
  activeTab: string;
  handleTabChange: (tab: any) => void;
  handleLogout: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MenuDashboard = ({ activeTab, handleTabChange, handleLogout, isMobileMenuOpen, setIsMobileMenuOpen }: MenuDashboardProps) => {
  return (
    <>
      {/* OVERLAY SOMBRE SUR MOBILE : Clique à côté pour fermer le menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* LA BARRE LATÉRALE */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#111] md:bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0
      `}>
        {/* En-tête du menu */}
        <div className="p-4 md:p-6 flex justify-between items-center border-b border-white/5">
          <Link to="/" className="flex items-center"> 
            <img src="/img/Conceptify_logo-01.png" alt="Conceptify Logo" className="h-8 md:h-10 w-auto object-contain" />
          </Link>
          {/* Bouton pour fermer (X) visible uniquement sur mobile */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-400 hover:text-white p-1">
            <X size={24} />
          </button>
        </div>

        <div className="px-6 hidden md:block pt-4 pb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Administration</p>
        </div>
        
        {/* Liens de navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => handleTabChange("portfolio")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "portfolio" ? "bg-white/10 text-white border border-white/20" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><Briefcase size={18} /> Portfolios</button>
          <button onClick={() => handleTabChange("reference")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "reference" ? "bg-[#6f42c1]/20 text-[#6f42c1] border border-[#6f42c1]/30" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><LayoutDashboard size={18} /> Références</button>
          <button onClick={() => handleTabChange("project")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "project" ? "bg-[#0dcaf0]/20 text-[#0dcaf0] border border-[#0dcaf0]/30" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><FolderPlus size={18} /> Projets</button>
          <button onClick={() => handleTabChange("contacts")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "contacts" ? "bg-white/10 text-white border border-white/20" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><Users size={18} /> Contacts</button>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"><LogOut size={18} /> Déconnexion</button>
        </div>
      </aside>
    </>
  );
};

export default MenuDashboard;