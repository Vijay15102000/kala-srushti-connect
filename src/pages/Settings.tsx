import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, Save, Trash2 } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [ttsApiKey, setTtsApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tts_api_key');
    if (stored) setTtsApiKey(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem('tts_api_key', ttsApiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    localStorage.removeItem('tts_api_key');
    setTtsApiKey('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-heading text-xl font-bold text-foreground">Settings</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <Key size={18} /> API Keys
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Add your API keys here to enable premium features like high-quality text-to-speech voices.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground font-body">Text-to-Speech API Key (e.g. ElevenLabs)</label>
            <input
              type="password"
              value={ttsApiKey}
              onChange={e => setTtsApiKey(e.target.value)}
              placeholder="Enter your TTS API key..."
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm"
            />
            <p className="text-xs text-muted-foreground font-body">
              Currently using browser's built-in speech synthesis. Add an API key to upgrade to premium voices.
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body hover:opacity-90 transition-opacity">
              <Save size={14} /> {saved ? 'Saved!' : 'Save'}
            </button>
            {ttsApiKey && (
              <button onClick={handleClear} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-body text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={14} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
