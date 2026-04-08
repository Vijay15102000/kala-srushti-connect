import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '@/contexts/RecipesContext';
import { Users, UtensilsCrossed, MapPin, LogOut, Plus, Pencil, Trash2 } from 'lucide-react';
import type { Recipe, RecipeStep } from '@/lib/data';

type Tab = 'users' | 'dishes' | 'places';

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

const REGIONS = [
  { value: 'coastal', label: 'Coastal Karnataka Food' },
  { value: 'central', label: 'Central Karnataka Food' },
  { value: 'north', label: 'North Karnataka Food' },
  { value: 'south', label: 'South Karnataka Food' },
];

const FOOD_TYPES = [
  { value: 'veg', label: 'Vegetarian' },
  { value: 'nonveg', label: 'Non-Vegetarian' },
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

interface StepForm {
  instructionEn: string;
  instructionKn: string;
  timeMinutes: number;
}

interface DishForm {
  name: string;
  nameKn: string;
  region: string;
  foodType: string;
  origin: string;
  description: string;
  descriptionKn: string;
  time: string;
  image: string;
  steps: StepForm[];
}

const emptyStep: StepForm = { instructionEn: '', instructionKn: '', timeMinutes: 5 };
const emptyDishForm: DishForm = { name: '', nameKn: '', region: '', foodType: '', origin: '', description: '', descriptionKn: '', time: '', image: '', steps: [{ ...emptyStep }] };

export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { allRecipes, addRecipe, removeRecipe } = useRecipes();
  const [tab, setTab] = useState<Tab>('dishes');

  const [places, setPlaces] = useState<PlaceItem[]>(placeholderPlaces);
  const [users] = useState<UserItem[]>(placeholderUsers);

  const [showDishForm, setShowDishForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [editingPlace, setEditingPlace] = useState<PlaceItem | null>(null);

  const [dishForm, setDishForm] = useState<DishForm>(emptyDishForm);
  const [placeForm, setPlaceForm] = useState({ name: '', location: '', type: '' });

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground font-body">You need admin privileges to view this page.</p>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-body">Go Home</button>
        </div>
      </div>
    );
  }

  const handleAddDish = () => {
    if (!dishForm.name) { toast.error('Please enter dish name'); return; }
    if (!dishForm.region) { toast.error('Please select a region'); return; }
    if (!dishForm.foodType) { toast.error('Please select veg or non-veg'); return; }
    if (dishForm.steps.length === 0 || !dishForm.steps[0].instructionEn) { toast.error('Please add at least one step'); return; }
    const newRecipe: Recipe = {
      id: Date.now(),
      name: { en: dishForm.name, kn: dishForm.nameKn || dishForm.name },
      time: dishForm.time || '30 min',
      image: dishForm.image || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600',
      video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
      category: dishForm.foodType as Recipe['category'],
      origin: dishForm.origin || 'Karnataka, India',
      description: { en: dishForm.description || dishForm.name, kn: dishForm.descriptionKn || dishForm.nameKn || dishForm.name },
      steps: dishForm.steps.filter(s => s.instructionEn).map(s => ({
        instruction: { en: s.instructionEn, kn: s.instructionKn || s.instructionEn },
        timeMinutes: s.timeMinutes || 5,
      })),
    };
    addRecipe(newRecipe);
    setDishForm(emptyDishForm);
    setShowDishForm(false);
    toast.success('Dish added successfully!');
  };

  const handleAddPlace = () => {
    if (!placeForm.name) return;
    if (editingPlace) {
      setPlaces(prev => prev.map(p => p.id === editingPlace.id ? { ...p, ...placeForm } : p));
      setEditingPlace(null);
    } else {
      setPlaces(prev => [...prev, { id: Date.now().toString(), ...placeForm }]);
    }
    setPlaceForm({ name: '', location: '', type: '' });
    setShowPlaceForm(false);
  };

  const deletePlace = (id: string) => setPlaces(prev => prev.filter(p => p.id !== id));

  const tabs: { key: Tab; label: string; icon: typeof Users }[] = [
    { key: 'dishes', label: 'Dishes', icon: UtensilsCrossed },
    { key: 'places', label: 'Places', icon: MapPin },
    { key: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground font-body">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="text-sm px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-body">Back to Site</button>
            <button onClick={() => { logout(); navigate('/'); }} className="text-sm px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity font-body flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
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
              <button onClick={() => { setDishForm(emptyDishForm); setShowDishForm(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-body hover:opacity-90">
                <Plus size={16} /> Add Dish
              </button>
            </div>

            {showDishForm && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h3 className="font-heading font-semibold text-foreground">Add New Dish</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="Dish name (English)" value={dishForm.name} onChange={e => setDishForm(p => ({ ...p, name: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Dish name (Kannada)" value={dishForm.nameKn} onChange={e => setDishForm(p => ({ ...p, nameKn: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <select value={dishForm.region} onChange={e => setDishForm(p => ({ ...p, region: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm">
                    <option value="">Select Region</option>
                    {REGIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  {dishForm.region && (
                    <select value={dishForm.foodType} onChange={e => setDishForm(p => ({ ...p, foodType: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm">
                      <option value="">Veg or Non-Veg?</option>
                      {FOOD_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                  )}
                  <input placeholder="Origin place (e.g. Udupi, Karnataka)" value={dishForm.origin} onChange={e => setDishForm(p => ({ ...p, origin: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Cooking time (e.g. 30 min)" value={dishForm.time} onChange={e => setDishForm(p => ({ ...p, time: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Image URL (optional)" value={dishForm.image} onChange={e => setDishForm(p => ({ ...p, image: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm col-span-full" />
                  <input placeholder="Description (English)" value={dishForm.description} onChange={e => setDishForm(p => ({ ...p, description: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                  <input placeholder="Description (Kannada)" value={dishForm.descriptionKn} onChange={e => setDishForm(p => ({ ...p, descriptionKn: e.target.value }))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddDish} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body">Save</button>
                  <button onClick={() => setShowDishForm(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-body text-muted-foreground">Cancel</button>
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Category</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground font-body">Origin</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground font-body">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allRecipes.map(d => (
                    <tr key={d.id} className="border-t border-border">
                      <td className="px-4 py-3 text-sm text-foreground font-body">{d.name.en}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-body capitalize">{d.category}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-body">{d.origin}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => removeRecipe(d.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
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
