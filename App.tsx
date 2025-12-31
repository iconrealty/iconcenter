import React, { useState, useEffect, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { AppLink, User } from './types';
import { INITIAL_APPS } from './constants';
import { Plus, X, Pencil, LogIn, Check, Search, Lock } from 'lucide-react';

// --- Helper Components ---

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLoginClick, 
  onLogoutClick 
}) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">app</div>
          <h1 className="text-base font-semibold tracking-wide text-gray-900 uppercase">Icon Realty Partners</h1>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-xs text-gray-500 hidden sm:block">Welcome back</span>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-300 transition-colors" title={user.name}>
                {user.initials}
              </div>
              <button 
                onClick={onLogoutClick}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                Log Out
              </button>
            </>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              <LogIn className="w-4 h-4" /> Admin Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

interface AppCardProps {
  app: AppLink;
  isEditing: boolean;
  onDelete: (id: string) => void;
  onEdit: (app: AppLink) => void;
}

const AppCard: React.FC<AppCardProps> = ({ 
  app, 
  isEditing, 
  onDelete, 
  onEdit 
}) => {
  // Dynamically resolve icon from Lucide library
  const IconComponent = (LucideIcons as any)[app.icon] || LucideIcons.LayoutGrid;

  const handleClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.preventDefault();
      onEdit(app);
    }
  };

  return (
    <div className={`relative group ${isEditing ? 'cursor-pointer animate-wobble' : ''}`}>
      {isEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(app.id);
          }}
          className="absolute -top-2 -left-2 z-10 bg-gray-400 text-white rounded-full p-1 hover:bg-red-500 transition-colors shadow-sm"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      
      <a 
        href={isEditing ? undefined : app.url} 
        onClick={handleClick}
        target={isEditing ? undefined : "_blank"}
        rel={isEditing ? undefined : "noopener noreferrer"}
        className={`block h-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 
          hover:shadow-lg hover:-translate-y-1 
          active:bg-gray-900 active:border-gray-900 active:scale-95 active:shadow-none active:translate-y-0
          transition-all duration-200 ease-out active:duration-0
          flex flex-col items-center justify-center text-center aspect-square
          group/card cursor-pointer select-none`}
      >
        <div className="mb-3 p-3 rounded-2xl text-gray-700 transition-all duration-200 
          group-hover/card:bg-gray-900 group-hover/card:text-white 
          group-active/card:text-white group-active/card:bg-gray-900
          active:duration-0">
          <IconComponent className="w-8 h-8" />
        </div>
        <h3 className="text-gray-900 font-semibold text-base mb-1 group-active/card:text-white transition-colors duration-200 active:duration-0">{app.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-[150px] line-clamp-2 group-active/card:text-gray-300 transition-colors duration-200 active:duration-0">{app.description}</p>
      </a>
    </div>
  );
};

interface AddCardProps {
  onClick: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group h-full w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-4 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 flex flex-col items-center justify-center aspect-square"
    >
      <div className="mb-2 text-gray-400 group-hover:text-blue-500 transition-colors">
        <Plus className="w-10 h-10" />
      </div>
      <span className="text-base font-medium text-gray-400 group-hover:text-blue-500">Add App</span>
    </button>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  // State
  const [apps, setApps] = useState<AppLink[]>(() => {
    const saved = localStorage.getItem('icon_app_center_data');
    return saved ? JSON.parse(saved) : INITIAL_APPS;
  });
  const [user, setUser] = useState<User | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState<Partial<AppLink>>({});
  
  // Icon Picker State
  const [iconSearch, setIconSearch] = useState('');
  
  // Login Form State
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Persist Data
  useEffect(() => {
    localStorage.setItem('icon_app_center_data', JSON.stringify(apps));
  }, [apps]);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPass === 'admin') { // Mock password
      setUser({ name: 'Tim Manager', initials: 'TM', role: 'admin' });
      setIsLoginOpen(false);
      setLoginPass('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsEditingMode(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this app?')) {
      setApps(prev => prev.filter(app => app.id !== id));
    }
  };

  const handleSaveApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentApp.title || !currentApp.url) return;

    if (currentApp.id) {
      // Edit existing
      setApps(prev => prev.map(a => a.id === currentApp.id ? { ...a, ...currentApp } as AppLink : a));
    } else {
      // Add new
      const newApp: AppLink = {
        id: Date.now().toString(),
        title: currentApp.title || '',
        description: currentApp.description || '',
        url: currentApp.url || '',
        icon: currentApp.icon || 'LayoutGrid'
      };
      setApps(prev => [...prev, newApp]);
    }
    setIsAppModalOpen(false);
    setCurrentApp({});
    setIconSearch(''); // Reset icon search
  };

  const openEditModal = (app: AppLink) => {
    setCurrentApp(app);
    setIconSearch('');
    setIsAppModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentApp({ icon: 'LayoutGrid', url: 'https://' });
    setIconSearch('');
    setIsAppModalOpen(true);
  };

  // Filter apps for main grid
  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter icons for modal
  const iconList = useMemo(() => {
    const allIcons = Object.keys(LucideIcons).filter(key => {
      // Filter out non-component exports if any (basic check for PascalCase)
      return /^[A-Z]/.test(key) && key !== 'createLucideIcon' && key !== 'default';
    });
    
    if (!iconSearch) {
      // If no search, show a subset or popular ones, or just the first N
      // For now, let's just show a good chunk, or maybe sort alphabetical
      return allIcons.slice(0, 48); 
    }

    return allIcons.filter(name => 
      name.toLowerCase().includes(iconSearch.toLowerCase())
    ).slice(0, 60); // Limit results for performance
  }, [iconSearch]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#F5F5F7]">
      <Header 
        user={user} 
        onLoginClick={() => setIsLoginOpen(true)} 
        onLogoutClick={handleLogout} 
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 lg:px-8 py-12">
        
        {/* Title Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Icon App Center</h2>
          </div>

          <div className="flex items-center gap-4">
             {/* Search */}
             <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Search apps..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Admin Controls */}
            {user?.role === 'admin' && (
              <button
                onClick={() => setIsEditingMode(!isEditingMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm border ${
                  isEditingMode 
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {isEditingMode ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                {isEditingMode ? 'Done Editing' : 'Edit Apps'}
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredApps.map(app => (
            <AppCard 
              key={app.id} 
              app={app} 
              isEditing={isEditingMode}
              onDelete={handleDelete}
              onEdit={openEditModal}
            />
          ))}
          
          {/* Add Button (Only visible in Edit Mode) */}
          {isEditingMode && (
            <div className="animate-in fade-in duration-300">
              <AddCard onClick={openAddModal} />
            </div>
          )}
        </div>

        {filteredApps.length === 0 && !isEditingMode && (
          <div className="text-center py-20">
            <p className="text-gray-400">No apps found matching your search.</p>
          </div>
        )}
      </main>

      {/* --- Modals --- */}

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Admin Login">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${loginError ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter password (use 'admin')"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                autoFocus
              />
              <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            {loginError && <p className="text-xs text-red-500 mt-1">Incorrect password. Try 'admin'.</p>}
          </div>
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-black transition-colors font-medium"
          >
            Sign In
          </button>
        </form>
      </Modal>

      {/* Add/Edit App Modal */}
      <Modal 
        isOpen={isAppModalOpen} 
        onClose={() => setIsAppModalOpen(false)} 
        title={currentApp.id ? "Edit App" : "Add New App"}
      >
        <form onSubmit={handleSaveApp} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">App Title</label>
            <input 
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={currentApp.title || ''}
              onChange={e => setCurrentApp({...currentApp, title: e.target.value})}
              placeholder="e.g. Marketing Hub"
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Description</label>
            <input 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={currentApp.description || ''}
              onChange={e => setCurrentApp({...currentApp, description: e.target.value})}
              placeholder="Short subtitle"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">URL</label>
            <input 
              required
              type="url"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-blue-600"
              value={currentApp.url || ''}
              onChange={e => setCurrentApp({...currentApp, url: e.target.value})}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Icon</label>
            
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full pl-8 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Search icons (e.g. Home, User, Mail)..."
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 border border-gray-100 rounded-lg bg-gray-50/50">
              {iconList.map((iconName) => {
                const IconComp = (LucideIcons as any)[iconName];
                const isSelected = currentApp.icon === iconName;
                if (!IconComp) return null;

                return (
                  <button
                    key={iconName}
                    type="button"
                    title={iconName}
                    onClick={() => setCurrentApp({...currentApp, icon: iconName})}
                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' 
                        : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </button>
                )
              })}
              {iconList.length === 0 && (
                <div className="col-span-6 text-center py-4 text-xs text-gray-400">
                  No icons found.
                </div>
              )}
            </div>
            <div className="text-[10px] text-gray-400 mt-1 text-right">
              {iconSearch ? `Found matches` : `Showing top results`}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => setIsAppModalOpen(false)}
              className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
            >
              {currentApp.id ? "Save Changes" : "Create App"}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default App;