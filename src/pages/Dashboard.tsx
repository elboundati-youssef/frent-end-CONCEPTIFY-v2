import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, FolderPlus, Users, LogOut, Check, Trash2, Pencil, ArrowLeft, Image as ImageIcon, Briefcase, Upload, Folder, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axios";

type Tab = "portfolio" | "reference" | "project" | "contacts";
type ViewMode = "list" | "create" | "edit" | "import" | "folder"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const hasToken = !!localStorage.getItem('token');
  
  const [activeTab, setActiveTab] = useState<Tab>("portfolio");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openFolderId, setOpenFolderId] = useState<number | null>(null);

  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [references, setReferences] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (hasToken) {
      fetchData();
    }
  }, [hasToken]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [portRes, refRes, projRes, contactRes] = await Promise.all([
        api.get('/portfolio').catch(() => ({ data: [] })),
        api.get('/reference').catch(() => ({ data: [] })),
        api.get('/project').catch(() => ({ data: [] })),
        api.get('/contacts').catch(() => ({ data: [] }))
      ]);
      
      const parseData = (res: any) => {
        if (!res || !res.data) return [];
        if (Array.isArray(res.data)) return res.data;
        if (res.data.data && Array.isArray(res.data.data)) return res.data.data;
        return [];
      };

      setPortfolios(parseData(portRes));
      setReferences(parseData(refRes));
      setProjects(parseData(projRes));
      setContacts(parseData(contactRes));
    } catch (error: any) {
      console.error("Erreur fetchData:", error);
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.reload(); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setViewMode(tab === "project" ? "folder" : "list");
    setEditingId(null);
    setOpenFolderId(null);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setViewMode("edit");
  };

  const handleDelete = async (id: number, type: Tab | 'contacts') => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        await api.delete(`/${type}/${id}`);
        fetchData();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, type: Tab) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (viewMode === "edit" && editingId) {
        formData.append('_method', 'PATCH');
        await api.post(`/${type}/${editingId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      } else {
        await api.post(`/${type}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      }
      
      fetchData();
      setViewMode(type === "project" && openFolderId === null ? "folder" : "list");
    } catch (error: any) {
      const serverError = error.response?.data?.error || error.response?.data?.message || "Erreur serveur inconnue";
      alert("Erreur : " + serverError);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImport = async (e: React.FormEvent<HTMLFormElement>, endpoint: string) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await api.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert("Importation réussie avec succès !");
      fetchData();
      setViewMode(activeTab === "project" ? "folder" : "list");
    } catch (error: any) {
      const serverError = error.response?.data?.error || error.response?.data?.message || "Erreur inconnue";
      alert("L'importation a échoué.\n" + serverError);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload(); 
    } catch (error) {
      localStorage.removeItem('token');
      window.location.reload();
    }
  };

  if (!hasToken) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-8xl md:text-[150px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center">Page introuvable</h2>
        <p className="text-gray-400 mb-10 max-w-md text-center">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#0dcaf0]/50 rounded-xl transition-all font-medium flex items-center gap-2">
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const stats = [
    { title: "Portfolios", count: portfolios.length, icon: Briefcase, color: "text-white", bg: "bg-white/10" },
    { title: "Références", count: references.length, icon: LayoutDashboard, color: "text-[#6f42c1]", bg: "bg-[#6f42c1]/20" },
    { title: "Projets", count: projects.length, icon: FolderPlus, color: "text-[#0dcaf0]", bg: "bg-[#0dcaf0]/20" },
    { title: "Messages Non Lus", count: contacts.filter(c => !c.read).length, icon: Users, color: "text-green-400", bg: "bg-green-400/20" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row font-sans text-white">
      <aside className="w-full md:w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-10">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-2xl font-display font-bold tracking-tighter">CONCEPTIFY<span className="text-[#0dcaf0]">.</span></Link>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Administration</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => handleTabChange("portfolio")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "portfolio" ? "bg-white/10 text-white border border-white/20" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><Briefcase size={18} /> Portfolios</button>
          <button onClick={() => handleTabChange("reference")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "reference" ? "bg-[#6f42c1]/20 text-[#6f42c1] border border-[#6f42c1]/30" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><LayoutDashboard size={18} /> Références</button>
          <button onClick={() => handleTabChange("project")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "project" ? "bg-[#0dcaf0]/20 text-[#0dcaf0] border border-[#0dcaf0]/30" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><FolderPlus size={18} /> Projets</button>
          <button onClick={() => handleTabChange("contacts")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === "contacts" ? "bg-white/10 text-white border border-white/20" : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"}`}><Users size={18} /> Contacts</button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"><LogOut size={18} /> Déconnexion</button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6f42c1]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
               <div className="w-8 h-8 border-4 border-[#0dcaf0] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div key={`${activeTab}-${viewMode}-${openFolderId}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              {activeTab === "portfolio" && (
                <>
                 {viewMode === "list" && <ListView title="Portfolios" items={portfolios} showId={true} onAdd={() => setViewMode("create")} onEdit={handleEdit} onDelete={(id: number) => handleDelete(id, "portfolio")} color={null} />}
                  {(viewMode === "create" || viewMode === "edit") && <PortfolioForm mode={viewMode} isUploading={isUploading} item={viewMode === "edit" ? portfolios.find((p) => p.id === editingId) : null} onBack={() => setViewMode("list")} onSubmit={(e: any) => handleSave(e, 'portfolio')} />}
                </>
              )}

              {activeTab === "reference" && (
                <>
                  {viewMode === "list" && <ListView title="Références" items={references} onAdd={() => setViewMode("create")} onImport={() => setViewMode("import")} onEdit={handleEdit} onDelete={(id: number) => handleDelete(id, "reference")} color="#6f42c1" />}
                  {(viewMode === "create" || viewMode === "edit") && <ReferenceForm mode={viewMode} isUploading={isUploading} portfolios={portfolios} item={viewMode === "edit" ? references.find((r) => r.id === editingId) : null} onBack={() => setViewMode("list")} onSubmit={(e: any) => handleSave(e, 'reference')} />}
                  {viewMode === "import" && <ReferenceImportForm isUploading={isUploading} onBack={() => setViewMode("list")} onSubmit={(e: any) => handleImport(e, '/reference/store-multiple')} />}
                </>
              )}

              {activeTab === "project" && (
                <>
                  {viewMode === "folder" && (
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <h2 className="text-2xl font-semibold flex items-center gap-3"><Folder className="text-[#0dcaf0]" /> Dossiers Clients</h2>
                        <div className="flex gap-3">
                          <button onClick={() => setViewMode("import")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:bg-white/10 bg-white/5 border border-white/10 text-white text-sm"><Upload size={16}/> Import Masse</button>
                          <button onClick={() => { setOpenFolderId(null); setViewMode("create"); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 text-sm bg-[#0dcaf0] text-black"><PlusCircle size={16}/> Ajouter Projet</button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div onClick={() => { setOpenFolderId(0); setViewMode("list"); }} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#0dcaf0]/50 hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center text-center group">
                          <Folder size={48} className="text-gray-500 mb-3 group-hover:scale-110 transition-transform" />
                          <span className="font-medium text-gray-300">Non classés</span>
                          <span className="text-xs text-gray-500 mt-1">{projects.filter(p => !p.reference_id).length} projets</span>
                        </div>
                        {references.map(ref => (
                          <div key={ref.id} onClick={() => { setOpenFolderId(ref.id); setViewMode("list"); }} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#0dcaf0]/50 hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center text-center group">
                            <Folder size={48} className="text-[#0dcaf0] mb-3 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-white">{ref.title}</span>
                            <span className="text-xs text-gray-500 mt-1">{projects.filter(p => p.reference_id == ref.id).length} projets</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {viewMode === "list" && (
                    <ListView 
                      title={`Projets: ${openFolderId === 0 ? 'Non classés' : references.find(r => r.id === openFolderId)?.title || 'Tous'}`} 
                      items={projects.filter(p => openFolderId === 0 ? !p.reference_id : p.reference_id == openFolderId)} 
                      onAdd={() => setViewMode("create")} onEdit={handleEdit} onDelete={(id: number) => handleDelete(id, "project")} color="#0dcaf0" onBack={() => { setOpenFolderId(null); setViewMode("folder"); }}
                    />
                  )}

                  {(viewMode === "create" || viewMode === "edit") && <ProjectForm mode={viewMode} isUploading={isUploading} portfolios={portfolios} references={references} item={viewMode === "edit" ? projects.find((p) => p.id === editingId) : {reference_id: openFolderId === 0 ? "" : openFolderId}} onBack={() => setViewMode(openFolderId !== null ? "list" : "folder")} onSubmit={(e: any) => handleSave(e, 'project')} />}
                  {viewMode === "import" && <ProjectImportForm isUploading={isUploading} portfolios={portfolios} references={references} defaultReference={openFolderId === 0 ? "" : openFolderId} onBack={() => setViewMode(openFolderId !== null ? "list" : "folder")} onSubmit={(e: any, type: string) => handleImport(e, type === 'video' ? '/projects/store-multiple-videos' : '/projects/store-multiple')} />}
                </>
              )}

              {activeTab === "contacts" && <ContactsList contacts={contacts} onDelete={(id: number) => handleDelete(id, 'contacts')} onUpdate={fetchData} />}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

const getImageUrl = (path: string | null | undefined) => {
  if (!path || path === "null" || path === "") return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
  return `http://localhost:8000/api/private-image/${cleanPath}`;
};

const Pagination = ({ total, itemsPerPage, currentPage, setCurrentPage }: any) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10 text-sm text-gray-400">
      <span>Page {currentPage} sur {totalPages} ({total} éléments)</span>
      <div className="flex gap-2">
        <button type="button" onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30"><ChevronLeft size={16} /></button>
        <button type="button" onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

const ListView = ({ title, items, onAdd, onImport, onEdit, onDelete, color, onBack, showId = false }: any) => {
  const safeItems = Array.isArray(items) ? items : [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => { setCurrentPage(1); }, [items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = safeItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
      {onBack && (<button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-medium"><ArrowLeft size={16} /> Retour aux dossiers</button>)}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex flex-wrap gap-3">
          {onImport && (<button onClick={onImport} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:bg-white/10 bg-white/5 border border-white/10 text-white text-sm"><Upload size={16} /> Import Masse</button>)}
          <button onClick={onAdd} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 text-sm ${!color ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'text-white'}`} style={color ? { backgroundColor: color } : {}}><PlusCircle size={16} /> Ajouter</button>
        </div>
      </div>
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead><tr className="border-b border-white/10 text-gray-400 text-sm"><th className="pb-4 font-medium pl-4 w-24">Image</th><th className="pb-4 font-medium pl-6">Titre</th><th className="pb-4 font-medium text-right pr-4">Actions</th></tr></thead>
          <tbody>
            {currentItems.map((item: any) => {
              const imgToDisplay = getImageUrl(item?.image || item?.url || item?.logo || item?.link);
              const isVideo = item?.link && String(item.link).includes('.mp4');
              return (
              <tr key={item?.id || Math.random()} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-4 pl-4">
                  <div className="w-16 h-12 rounded-lg bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-bold text-gray-500 border border-white/10 relative">
                    {imgToDisplay && !isVideo ? (<img src={imgToDisplay} alt={item?.title || "Image"} className="w-full h-full object-cover" />) : isVideo ? (<span className="text-[10px] uppercase text-[#0dcaf0] border border-[#0dcaf0] px-1 rounded">VID</span>) : (<ImageIcon size={20} className="text-gray-600" />)}
                  </div>
                </td>
               <td className="py-4 pl-6 font-medium text-white">
  {item?.title || "Sans Titre"}
  {showId && item?.id && (
    <span className="ml-3 px-2 py-0.5 bg-white/10 text-gray-400 text-xs rounded-md font-mono border border-white/10">ID: {item.id}</span>
  )}
</td>
                <td className="py-4 pr-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item.id)} className="p-2 text-gray-400 hover:text-[#0dcaf0] hover:bg-[#0dcaf0]/10 rounded-lg transition-colors"><Pencil size={18} /></button>
                    <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            )})}
            {safeItems.length === 0 && <tr><td colSpan={3} className="py-8 text-center text-gray-500">Aucun élément trouvé.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pagination total={safeItems.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

const ReferenceImportForm = ({ onBack, onSubmit, isUploading }: any) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
    <button type="button" onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium"><ArrowLeft size={16} /> Retour</button>
    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3"><Upload className="text-[#6f42c1]" /> Créer Références (Import Masse)</h2>
    <form className="space-y-6" onSubmit={onSubmit}>
      <div><label className="block text-sm font-medium text-gray-300 mb-2">Fichier Excel (.xlsx, .csv)</label><input name="excel_file" type="file" required accept=".xlsx,.xls,.csv" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" /></div>
      <div><label className="block text-sm font-medium text-gray-300 mb-2">Logos (Fichier ZIP)</label><input name="logos_zip" type="file" required accept=".zip" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" /></div>
      <div><label className="block text-sm font-medium text-gray-300 mb-2">Images Principales (Fichier ZIP - Optionnel)</label><input name="images_zip" type="file" accept=".zip" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" /></div>
      <div className="pt-4"><button type="submit" disabled={isUploading} className={`bg-[#6f42c1] text-white font-medium py-3 px-8 rounded-xl w-full md:w-auto transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5a32a3]'}`}>{isUploading ? "Importation en cours..." : "Importer les Références"}</button></div>
    </form>
  </div>
);

const ProjectImportForm = ({ portfolios, references, defaultReference, onBack, onSubmit, isUploading }: any) => {
  const [importType, setImportType] = useState('image');
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium"><ArrowLeft size={16} /> Retour</button>
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3"><Upload className="text-[#0dcaf0]" /> Créer Projets (Import Masse)</h2>
      <form className="space-y-6" onSubmit={(e) => onSubmit(e, importType)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Type d'importation</label>
            <select value={importType} onChange={(e) => setImportType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none">
              <option value="image" className="bg-[#0a0a0a]">Images (JPG, PNG)</option>
              <option value="video" className="bg-[#0a0a0a]">Vidéos (MP4)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Reference (Optionnel)</label>
            <select name="reference" defaultValue={defaultReference || ""} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none">
              <option value="" className="bg-[#0a0a0a]">Aucune référence</option>
              {references?.map((r: any) => (<option key={r.id} value={r.id} className="bg-[#0a0a0a]">{r.title}</option>))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Titre de base (ex: TAYBA)</label><input name="title" type="text" placeholder="Ex: TAYBA" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0dcaf0] transition-all" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Portfolio (Obligatoire)</label><select name="portfolio" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none"><option value="" className="bg-[#0a0a0a]">Sélectionnez...</option>{portfolios?.map((p: any) => (<option key={p.id} value={p.id} className="bg-[#0a0a0a]">{p.title}</option>))}</select></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Fichier ZIP</label>
          <input name="zip_file" type="file" required accept=".zip" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
        </div>
        <div className="pt-4">
          <button type="submit" disabled={isUploading} className={`bg-[#0dcaf0] text-black font-medium py-3 px-8 rounded-xl w-full md:w-auto transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0aa3c2]'}`}>
            {isUploading ? "Traitement en cours..." : "Uploader & Traiter le ZIP"}
          </button>
        </div>
      </form>
    </div>
  );
};

const PortfolioForm = ({ mode, item, onBack, onSubmit, isUploading }: any) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 mb-8"><ArrowLeft size={16} /> Retour</button>
    <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3"><Briefcase className="text-white" /> {mode === "edit" ? `Modifier ${item?.title || ""}` : "Créer un Portfolio"}</h2>
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-300 mb-2">Titre</label><input name="title" defaultValue={item?.title} required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all" /></div>
        <div><label className="block text-sm font-medium text-gray-300 mb-2">Slogan</label><input name="slogan" defaultValue={item?.slogan} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all" /></div>
      </div>
      <div><label className="block text-sm font-medium text-gray-300 mb-2">Description</label><textarea name="description" defaultValue={item?.description} required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all" /></div>
      <div><label className="block text-sm font-medium text-gray-300 mb-2">Image de couverture</label><input name="image" type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" /></div>
      <div className="pt-4"><button type="submit" disabled={isUploading} className={`bg-white/10 border border-white/20 text-white font-medium py-3 px-8 rounded-xl w-full md:w-auto transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}>{isUploading ? "Sauvegarde..." : mode === "edit" ? "Mettre à jour" : "Créer"}</button></div>
    </form>
  </div>
);

const ReferenceForm = ({ mode, portfolios, item, onBack, onSubmit, isUploading }: any) => {
  const safePortfolios = Array.isArray(portfolios) ? portfolios : [];
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 mb-8"><ArrowLeft size={16} /> Retour</button>
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3"><LayoutDashboard className="text-[#6f42c1]" /> {mode === "edit" ? `Modifier ${item?.title || ""}` : "Créer une Référence"}</h2>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Title</label><input name="title" defaultValue={item?.title} required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Numéro d'ordre</label><input name="order" defaultValue={item?.order || 0} type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Image Principale (url)</label><input name="url" type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Logo</label><input name="logo" type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label><input name="instagram" defaultValue={item?.instagram} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Website</label><input name="website" defaultValue={item?.website} type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6f42c1] transition-all" /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-300 mb-2">Portfolio</label><select name="portfolio_id" defaultValue={item?.portfolio_id || ""} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6f42c1] transition-all appearance-none"><option value="" className="bg-[#0a0a0a]">Aucun</option>{safePortfolios.map((p: any) => (<option key={p.id} value={p.id} className="bg-[#0a0a0a]">{p.title}</option>))}</select></div>
        <div className="pt-4"><button type="submit" disabled={isUploading} className={`bg-[#6f42c1] text-white font-medium py-3 px-8 rounded-xl w-full md:w-auto transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5a32a3]'}`}>{isUploading ? "Sauvegarde..." : mode === "edit" ? "Mettre à jour" : "Créer"}</button></div>
      </form>
    </div>
  );
};

const ProjectForm = ({ mode, portfolios, references, item, onBack, onSubmit, isUploading }: any) => {
  const safeReferences = Array.isArray(references) ? references : [];
  const safePortfolios = Array.isArray(portfolios) ? portfolios : [];
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 mb-8"><ArrowLeft size={16} /> Retour</button>
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3"><FolderPlus className="text-[#0dcaf0]" /> {mode === "edit" ? `Modifier ${item?.title || ""}` : "Créer un Projet"}</h2>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Titre</label><input name="title" defaultValue={item?.title} required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0dcaf0] transition-all" /></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Ordre</label><input name="order" defaultValue={item?.order || 1} required type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0dcaf0] transition-all" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Type</label><select name="type" defaultValue={item?.type || "image"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none"><option value="image" className="bg-[#0a0a0a]">Image</option><option value="video" className="bg-[#0a0a0a]">Video</option><option value="website" className="bg-[#0a0a0a]">Website</option></select></div>
          <div><label className="block text-sm text-gray-400 mb-1 block">Média (Fichier) <span className="text-gray-500 text-xs font-normal">- Optionnel</span></label><input name="link" type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-300 mb-2">Image de couverture</label><input name="image" type="file" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Référence</label><select name="reference" defaultValue={item?.reference_id || ""} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none"><option value="" className="bg-[#0a0a0a]">Aucune référence</option>{safeReferences.map((r: any) => (<option key={r.id} value={r.id} className="bg-[#0a0a0a]">{r.title}</option>))}</select></div>
          <div><label className="block text-sm font-medium text-gray-300 mb-2">Portfolio (Obligatoire)</label><select name="portfolio" required defaultValue={item?.portfolio_id || ""} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0dcaf0] transition-all appearance-none"><option value="" className="bg-[#0a0a0a]">Sélectionnez...</option>{safePortfolios.map((p: any) => (<option key={p.id} value={p.id} className="bg-[#0a0a0a]">{p.title}</option>))}</select></div>
        </div>
        <div className="pt-4"><button type="submit" disabled={isUploading} className="bg-[#0dcaf0] text-black font-medium py-3 px-8 rounded-xl w-full md:w-auto transition-colors">{isUploading ? "Sauvegarde..." : "Sauvegarder"}</button></div>
      </form>
    </div>
  );
};

const ContactsList = ({ contacts, onDelete, onUpdate }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const handleMarkRead = async (id: number, currentReadStatus: boolean) => {
    try { await api.patch(`/contacts/${id}`, { read: !currentReadStatus }); onUpdate(); } catch (error) {}
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3"><Users className="text-white" /> Messages Reçus</h2>
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead><tr className="border-b border-white/10 text-gray-400 text-sm"><th className="pb-4 pl-4">Nom</th><th className="pb-4 pl-6">Email</th><th className="pb-4 pl-6">Message</th><th className="pb-4 pl-4">Date</th><th className="pb-4 text-right pr-4">Actions</th></tr></thead>
          <tbody>
            {currentItems.map((contact: any) => (
              <tr key={contact.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${!contact.read ? 'bg-white/[0.02]' : ''}`}>
                <td className="py-4 pl-4"><div className="flex items-center gap-3">{!contact.read && <div className="w-2 h-2 rounded-full bg-[#0dcaf0]" />}<span className={`font-medium ${!contact.read ? 'text-white' : 'text-gray-300'}`}>{contact.name}</span></div></td>
                <td className="py-4 pl-6 text-gray-400 text-sm">{contact.email}</td>
                <td className="py-4 pl-6 text-gray-300 text-sm max-w-xs truncate pr-4" title={contact.message}>{contact.message}</td>
                <td className="py-4 pl-4 text-gray-400 text-sm whitespace-nowrap">{new Date(contact.created_at).toLocaleDateString('fr-FR')}</td>
                <td className="py-4 pr-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleMarkRead(contact.id, contact.read)} className="p-2 text-gray-400 hover:text-[#0dcaf0]"><Check size={18} /></button>
                    <button onClick={() => onDelete(contact.id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-gray-500">Aucun message reçu.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pagination total={contacts.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Dashboard;