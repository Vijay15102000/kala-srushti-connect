import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { Users, UtensilsCrossed, MapPin, LogOut, Plus, Pencil, Trash2 } from 'lucide-react';

type Tab = 'users' | 'dishes' | 'places';

interface DishItem {
  id: string;
  name: string;
  region: string;
  type: string;
}

interface PlaceItem {
  id: string;
  name: string;
  location: string;
  type: string;
}

interface UserItem {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

// Placeholder data shown when no backend data
const placeholderDishes: DishItem[] = [
  { id: '1', name: 'Masala Dosa', region: 'Udupi', type: 'Breakfast' },
  { id: '2', name: 'Bisi Bele Bath', region: 'Bangalore', type: 'Main Course' },
  { id: '3', name: 'Mysore Pak', region: 'Mysore', type: 'Dessert' },
];

const placeholderPlaces: PlaceItem[] = [
  { id: '1', name: 'MTR', location: 'Bangalore', type: 'Restaurant' },
  { id: '2', name: 'Vidyarthi Bhavan', location: 'Bangalore', type: 'Restaurant' },
  { id: '3', name: 'Mitra Samaj', location: 'Udupi', type: 'Restaurant' },
];

const placeholderUsers: UserItem[] = [
  { id: '1', email: 'admin@example.com', role: 'admin', createdAt: '2025-01-01' },
  { id: '2', email: 'user@example.com', role: 'user', createdAt: '2025-03-15' },
];

export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('dishes');

  // TODO: Replace with API calls to your backend
  const [dishes, setDishes] = useState<DishItem[]>(placeholderDishes);
  const [places, setPlaces] = useState<PlaceItem[]>(placeholderPlaces);
  const [users] = useState<UserItem[]>(placeholderUsers);

  // Modal states
  const [showDishForm, setShowDishForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [editingDish, setEditingDish] = useState<DishItem | null>(null);
  const [editingPlace, setEditingPlace] = useState<PlaceItem | null>(null);

  // Form states
  const [dishForm, setDishForm] = useState({ name: '', region: '', type: '' });
  const [placeForm, setPlaceForm] = useState({ name: '', location: '', type: '' });

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground font-body">You need admin privileges to view this page.</p>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-body">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddDish = () => {
    if (!dishForm.name) return;
    if (editingDish) {
      setDishes(prev => prev.map(d => d.id === editingDish.id ? { ...d, ...dishForm } : d));
      setEditingDish(null);
    } else {
      // TODO: POST to your backend API
      setDishes(prev => [...prev, { id: Date.now().toString(), ...dishForm }]);
    }
    setDishForm({ name: '', region: '', type: '' });
    setShowDishForm(false);
  };

  const handleAddPlace = () => {
    if (!placeForm.name) return;
    if (editingPlace) {
      setPlaces(prev => prev.map(p => p.id === editingPlace.id ? { ...p, ...placeForm } : p));
      setEditingPlace(null);
    } else {
      // TODO: POST to your backend API
      setPlaces(prev => [...prev, { id: Date.now().toString(), ...placeForm }]);
    }
    setPlaceForm({ name: '', location: '', type: '' });
    setShowPlaceForm(false);
  };

  const deleteDish = (id: string) => {
    // TODO: DELETE from your backend API
    setDishes(prev => prev.filter(d => d.id !== id));
  };

  const deletePlace = (id: string) => {
    // TODO: DELETE from your backend API
    setPlaces(prev => prev.filter(p => p.id !== id));
  };

  const tabs: { key: Tab; label: string; icon: typeof Users }[] = [
    { key: 'dishes', label: 'Dishes', icon: UtensilsCrossed },
    { key: 'places', label: 'Places', icon: MapPin },
    { key: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground font-body">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="text-sm px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-body">
              Back to Site
            </button>
            <button onClick={() => { logout(); navigate('/'); }} className="text-sm px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity font-body flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-medium transition-colors ${
                tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Dishes Tab */}
        {tab === 'dishes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-lg font-semibold text-foreground">Manage Dishes</h2>
              <button onClick={() => { setEditingDish(null); setDishForm({ name: '', region: '', type: '' }); setShowDishForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-body hover:opacity-90">
                <Plus size={16} /> Add Dish
              </button>
            </div>

            {showDishForm && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h3 className="font-heading font-semibold text-foreground">{editingDish ? 'Edit Dish' : 'Add New Dish'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input placeholder="Dish name" value={dishForm.name} onChange={e => setDishForm(p => ({ ...p, name: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Region" value={dishForm.region} onChange={e => setDishForm(p => ({ ...p, region: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Type (e.g. Breakfast)" value={dishForm.type} onChange={e => setDishForm(p => ({ ...p, type: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddDish} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body">Save</button>
                  <button onClick={() => { setShowDishForm(false); setEditingDish(null); }} className="px-4 py-2 border border-border rounded-lg text-sm font-body text-muted-foreground">Cancel</button>
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Region</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Type</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground font-body">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dishes.map(d => (
                    <tr key={d.id} className="border-t border-border">
                      <td className="px-4 py-3 text-sm text-foreground font-body">{d.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-body">{d.region}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-body">{d.type}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => { setEditingDish(d); setDishForm({ name: d.name, region: d.region, type: d.type }); setShowDishForm(true); }} className="text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
                        <button onClick={() => deleteDish(d.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Places Tab */}
        {tab === 'places' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-lg font-semibold text-foreground">Manage Places</h2>
              <button onClick={() => { setEditingPlace(null); setPlaceForm({ name: '', location: '', type: '' }); setShowPlaceForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-body hover:opacity-90">
                <Plus size={16} /> Add Place
              </button>
            </div>

            {showPlaceForm && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h3 className="font-heading font-semibold text-foreground">{editingPlace ? 'Edit Place' : 'Add New Place'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input placeholder="Place name" value={placeForm.name} onChange={e => setPlaceForm(p => ({ ...p, name: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Location" value={placeForm.location} onChange={e => setPlaceForm(p => ({ ...p, location: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Type (e.g. Restaurant)" value={placeForm.type} onChange={e => setPlaceForm(p => ({ ...p, type: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddPlace} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body">Save</button>
                  <button onClick={() => { setShowPlaceForm(false); setEditingPlace(null); }} className="px-4 py-2 border border-border rounded-lg text-sm font-body text-muted-foreground">Cancel</button>
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Location</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Type</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground font-body">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {places.map(p => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="px-4 py-3 text-sm text-foreground font-body">{p.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-body">{p.location}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-body">{p.type}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => { setEditingPlace(p); setPlaceForm({ name: p.name, location: p.location, type: p.type }); setShowPlaceForm(true); }} className="text-muted-foreground hover:text-foreground"><Pencil size={14} /></button>
                        <button onClick={() => deletePlace(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">All Users</h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Role</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-t border-border">
                      <td className="px-4 py-3 text-sm text-foreground font-body">{u.email}</td>
                      <td className="px-4 py-3 text-sm font-body">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-body">{u.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
