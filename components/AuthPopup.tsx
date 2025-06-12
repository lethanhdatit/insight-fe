"use client";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

export default function AuthPopup({
  mode,
  onClose,
  onSuccess,
  dictionary,
}: {
  mode: "login" | "register";
  onClose: () => void;
  onSuccess: () => void;
  dictionary: any;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const t = dictionary.auth;

  const validate = () => {
    if (!username.trim() || !password) {
      setError(t.errorRequired);
      return false;
    }
    if (username.length < 3) {
      setError(t.errorUsernameLength);
      return false;
    }
    if (/\s/.test(username)) {
      setError(t.errorUsernameSpace);
      return false;
    }
    if (password.length < 6) {
      setError(t.errorPasswordLength);
      return false;
    }
    if (mode === "register" && password !== password2) {
      setError(t.errorPasswordRepeat);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setError(data.error);
    else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center min-h-screen overflow-y-auto pt-16">
      {loading && <LoadingOverlay />}
      <form className="bg-white p-6 rounded shadow min-w-[300px]" onSubmit={handleSubmit}>
        <h2 className="font-bold mb-2">{mode === "login" ? t.login : t.register}</h2>
        <input
          className="ancient-input w-full mb-2"
          placeholder={t.username}
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          className="ancient-input w-full mb-2"
          type="password"
          placeholder={t.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        {mode === "register" && (
          <input
            className="ancient-input w-full mb-2"
            type="password"
            placeholder={t.passwordRepeat}
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            disabled={loading}
          />
        )}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="flex gap-2">
          <button type="submit" className="ancient-button flex-1" disabled={loading}>
            {mode === "login" ? t.login : t.register}
          </button>
          <button type="button" className="ancient-button flex-1 bg-gray-200" onClick={onClose} disabled={loading}>
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}