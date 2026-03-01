import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { LayoutDashboard, PlusCircle, FolderPlus, Users, LogOut, Check, Trash2, Pencil, ArrowLeft, Image as ImageIcon } from "lucide-react";

type Tab = "reference" | "project" | "contacts";
type ViewMode = "list" | "create" | "edit";

// --- Mock Data ---
const initialReferences = [
  { id: 1, title: "Investorama", order: 1, instagram: "@investorama", website: "https://investorama.com", portfolio: "real-estate", image: "https://picsum.photos/seed/inv/100/100" },
  { id: 2, title: "Conceptify", order: 2, instagram: "@conceptify", website: "https://conceptify.ma", portfolio: "corporate", image: "https://picsum.photos/seed/con/100/100" },
  { id: 3, title: "Lumina Events", order: 3, instagram: "@lumina", website: "https://lumina.com", portfolio: "events", image: "https://picsum.photos/seed/lum/100/100" },
];

const initialProjects = [
  { id: 1, title: "Campagne Été 2026", order: 1, reference: "investorama", portfolio: "real-estate", type: "video", image: "https://picsum.photos/seed/p1/100/100" },
  { id: 2, title: "Rebranding Corporate", order: 2, reference: "conceptify", portfolio: "corporate", type: "image", image: "https://picsum.photos/seed/p2/100/100" },
  { id: 3, title: "Festival des Lumières", order: 3, reference: "lumina", portfolio: "events", type: "video", image: "https://picsum.photos/seed/p3/100/100" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("reference");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [references, setReferences] = useState(initialReferences);
  const [projects, setProjects] = useState(initialProjects);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setViewMode("list");
    setEditingId(null);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setViewMode("edit");
  };

  const handleDelete = (id: number, type: "reference" | "project") => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      if (type === "reference") {
        setReferences(references.filter((r) => r.id !== id));
      } else {
        setProjects(projects.filter((p) => p.id !== id));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row font-sans text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-10">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-2xl font-display font-bold tracking-tighter">
            CONCEPTIFY<span className="text-[#0dcaf0]">.</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Administration</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => handleTabChange("reference")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === "reference"
                ? "bg-[#6f42c1]/20 text-[#6f42c1] border border-[#6f42c1]/30"
                : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            <LayoutDashboard size={18} />
            Références
          </button>
          <button
            onClick={() => handleTabChange("project")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === "project"
                ? "bg-[#0dcaf0]/20 text-[#0dcaf0] border border-[#0dcaf0]/30"
                : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            <FolderPlus size={18} />
            Projets
          </button>
          <button
            onClick={() => handleTabChange("contacts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === "contacts"
                ? "bg-white/10 text-white border border-white/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            <Users size={18} />
            Contacts
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link
            to="/login"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6f42c1]/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          key={`${activeTab}-${viewMode}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          {activeTab === "reference" && (
            <>
              {viewMode === "list" && (
                <ListView
                  title="Références"
                  items={references}
                  onAdd={() => setViewMode("create")}
                  onEdit={handleEdit}
                  onDelete={(id) => handleDelete(id, "reference")}
                  color="#6f42c1"
                />
              )}
              {(viewMode === "create" || viewMode === "edit") && (
                <ReferenceForm
                  mode={viewMode}
                  item={viewMode === "edit" ? references.find((r) => r.id === editingId) : null}
                  onBack={() => setViewMode("list")}
                />
              )}
            </>
          )}

          {activeTab === "project" && (
            <>
              {viewMode === "list" && (
                <ListView
                  title="Projets"
                  items={projects}
                  onAdd={() => setViewMode("create")}
                  onEdit={handleEdit}
                  onDelete={(id) => handleDelete(id, "project")}
                  color="#0dcaf0"
                />
              )}
              {(viewMode === "create" || viewMode === "edit") && (
                <ProjectForm
                  mode={viewMode}
                  item={viewMode === "edit" ? projects.find((p) => p.id === editingId) : null}
                  onBack={() => setViewMode("list")}
                />
              )}
            </>
          )}

          {activeTab === "contacts" && <ContactsList />}
        </motion.div>
      </main>
    </div>
  );
};

// --- Components ---

const ListView = ({ title, items, onAdd, onEdit, onDelete, color }: any) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
        style={{ backgroundColor: color }}
      >
        <PlusCircle size={18} />
        Ajouter
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-gray-400 text-sm">
            <th className="pb-4 font-medium pl-4 w-16">Image</th>
            <th className="pb-4 font-medium">Titre</th>
            <th className="pb-4 font-medium">Portfolio / Catégorie</th>
            <th className="pb-4 font-medium text-right pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
              <td className="py-4 pl-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <ImageIcon size={20} className="text-gray-500" />
                  )}
                </div>
              </td>
              <td className="py-4 font-medium text-white">{item.title}</td>
              <td className="py-4 text-gray-400 text-sm capitalize">{item.portfolio}</td>
              <td className="py-4 pr-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(item.id)}
                    className="p-2 text-gray-400 hover:text-[#0dcaf0] hover:bg-[#0dcaf0]/10 rounded-lg transition-colors"
                    title="Éditer"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-gray-500">
                Aucun élément trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const ReferenceForm = ({ mode, item, onBack }: any) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium"
    >
      <ArrowLeft size={16} />
      Retour à la liste
    </button>

    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
      <PlusCircle className="text-[#6f42c1]" />
      {mode === "edit" ? `Modifier ${item?.title || ""}` : "Créer une Référence"}
    </h2>
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input defaultValue={item?.title} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" placeholder="Nom de la référence" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Numéro d'ordre</label>
          <input defaultValue={item?.order} type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" placeholder="Ex: 1" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image</label>
          <input type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Logo</label>
          <input type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
          <input defaultValue={item?.instagram} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" placeholder="@username" />
          <p className="text-xs text-gray-500 mt-2">PNG &lt; 1MB</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
          <input defaultValue={item?.website} type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio (Optional)</label>
        <select defaultValue={item?.portfolio || ""} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6f42c1] transition-all appearance-none">
          <option value="" className="bg-[#0a0a0a]">None</option>
          <option value="real-estate" className="bg-[#0a0a0a]">Real Estate</option>
          <option value="corporate" className="bg-[#0a0a0a]">Corporate</option>
          <option value="events" className="bg-[#0a0a0a]">Events</option>
        </select>
      </div>

      <div className="pt-4">
        <button className="bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-medium py-3 px-8 rounded-xl transition-colors w-full md:w-auto">
          {mode === "edit" ? "Mettre à jour" : "Créer"}
        </button>
      </div>
    </form>
  </div>
);

const ProjectForm = ({ mode, item, onBack }: any) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium"
    >
      <ArrowLeft size={16} />
      Retour à la liste
    </button>

    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
      <FolderPlus className="text-[#0dcaf0]" />
      {mode === "edit" ? `Modifier ${item?.title || ""}` : "Créer un Projet"}
    </h2>
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input defaultValue={item?.title} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0dcaf0] transition-all" placeholder="Nom du projet" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
          <input defaultValue={item?.order} type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0dcaf0] transition-all" placeholder="Ex: 1" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image</label>
          <input type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Media URL</label>
          <input defaultValue={item?.mediaUrl} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0dcaf0] transition-all" placeholder="URL de la vidéo ou image" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Reference</label>
          <select defaultValue={item?.reference || "investorama"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none">
            <option value="investorama" className="bg-[#0a0a0a]">Investorama</option>
            <option value="conceptify" className="bg-[#0a0a0a]">Conceptify</option>
            <option value="lumina" className="bg-[#0a0a0a]">Lumina</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio</label>
          <select defaultValue={item?.portfolio || "real-estate"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none">
            <option value="real-estate" className="bg-[#0a0a0a]">Real Estate</option>
            <option value="corporate" className="bg-[#0a0a0a]">Corporate</option>
            <option value="events" className="bg-[#0a0a0a]">Events</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
          <select defaultValue={item?.type || "video"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none">
            <option value="video" className="bg-[#0a0a0a]">Video</option>
            <option value="image" className="bg-[#0a0a0a]">Image</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button className="bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-medium py-3 px-8 rounded-xl transition-colors w-full md:w-auto">
          {mode === "edit" ? "Mettre à jour" : "Créer"}
        </button>
      </div>
    </form>
  </div>
);

const ContactsList = () => {
  const fakeContacts = [
    { id: 1, name: "Jean Dupont", email: "jean@example.com", message: "Bonjour, je souhaite un devis pour une vidéo.", date: "01 Mar 2026", read: false },
    { id: 2, name: "Alice Martin", email: "alice@example.com", message: "Avez-vous des disponibilités ce mois-ci ?", date: "28 Fév 2026", read: true },
    { id: 3, name: "Marc Dubois", email: "marc@example.com", message: "Super portfolio, j'aimerais collaborer.", date: "25 Fév 2026", read: true },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
        <Users className="text-white" />
        Messages Reçus
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-sm">
              <th className="pb-4 font-medium pl-4">Nom</th>
              <th className="pb-4 font-medium">Email</th>
              <th className="pb-4 font-medium">Message</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fakeContacts.map((contact) => (
              <tr key={contact.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${!contact.read ? 'bg-white/[0.02]' : ''}`}>
                <td className="py-4 pl-4">
                  <div className="flex items-center gap-3">
                    {!contact.read && <div className="w-2 h-2 rounded-full bg-[#0dcaf0]" />}
                    <span className={`font-medium ${!contact.read ? 'text-white' : 'text-gray-300'}`}>{contact.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-400 text-sm">{contact.email}</td>
                <td className="py-4 text-gray-300 text-sm max-w-xs truncate pr-4">{contact.message}</td>
                <td className="py-4 text-gray-400 text-sm whitespace-nowrap">{contact.date}</td>
                <td className="py-4 pr-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-[#0dcaf0] hover:bg-[#0dcaf0]/10 rounded-lg transition-colors" title="Marquer comme lu">
                      <Check size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Supprimer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
