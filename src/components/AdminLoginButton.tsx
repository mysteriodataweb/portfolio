import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, LogOut } from "lucide-react";

export default function AdminLoginButton() {
  const { isAdmin, isLoading, login, logout } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoading) return null;

  if (isAdmin) {
    return (
      <button
        onClick={logout}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#6B6B6B] hover:text-foreground hover:bg-foreground/5 transition-all"
      >
        <LogOut size={14} /> Admin
      </button>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      setShowForm(false);
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowForm(!showForm)}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#6B6B6B] hover:text-foreground hover:bg-foreground/5 transition-all"
      >
        <LogIn size={14} /> Admin
      </button>

      {showForm && (
        <div className="absolute right-0 top-full mt-3 w-72 p-5 rounded-2xl bg-background border border-border shadow-xl z-50">
          <form onSubmit={handleLogin} className="space-y-3">
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Input
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-10 text-sm rounded-full border-border"
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 text-sm rounded-full border-border"
            />
            <Button
              type="submit"
              size="sm"
              className="w-full rounded-full bg-foreground text-white hover:bg-foreground/90"
            >
              Se connecter
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
