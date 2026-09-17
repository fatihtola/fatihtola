import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  UserCheck, 
  LogOut, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  actionReason?: string | null;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  actionReason
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const trimmed = password.trim();
      const normalized = trimmed.toLowerCase();
      if (trimmed === 'Ft12345' || normalized === 'ft12345') {
        onLogin();
        setPassword('');
        setError('');
        onClose();
      } else {
        setError('Girdiğiniz şifre hatalı. Lütfen yönetici şifrenizi kontrol ediniz.');
      }
      setIsSubmitting(false);
    }, 200);
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          id="close-admin-login-modal"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            {isAdmin ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              {isAdmin ? 'Yönetici Hesabı Aktif' : 'Yönetici / Eğitmen Girişi'}
            </h4>
            <p className="text-xs text-slate-400">
              {isAdmin 
                ? 'Eğitmen Fatih TOLA olarak yetkilendirildiniz.' 
                : 'İçerik yönetimi ve katılımcı takibi için yetki doğrulama'}
            </p>
          </div>
        </div>

        {typeof actionReason === 'string' && actionReason.trim().length > 0 && !isAdmin && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{actionReason}</span>
          </div>
        )}

        {isAdmin ? (
          /* Already Logged In State */
          <div className="space-y-4 pt-1">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                <UserCheck className="w-4 h-4" />
                <span>Giriş Yapıldı: Fatih TOLA</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yönetici oturumunuz açık. Katılımcı öğretmen listeleri, haftalık katılım çizelgeleri ve yeni müfredat içeriği ekleme izinleriniz etkindir.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Pencereyi Kapat
              </button>
              <button
                id="admin-logout-btn"
                type="button"
                onClick={handleLogoutClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Eğitmen / Yönetici</span>
                <span className="text-[10px] text-blue-400 font-normal">Koordinatör</span>
              </label>
              <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-semibold text-white">Fatih TOLA</span>
                <span className="text-[11px] text-slate-400">fatihtola@gmail.com</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password-input" className="text-xs font-semibold text-slate-300 block">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Yönetici şifrenizi giriniz..."
                  className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 border border-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
              <div className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                <span>Hızlı Bilgi</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Yönetici girişi sonrasında; 10 grubun öğretmen listesi ve haftalık katılım/yoklama çizelgeleri görünür hale gelir, yeni atölye içeriği ekleme yetkisi açılır.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Vazgeç
              </button>
              <button
                id="submit-admin-login-btn"
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Doğrulanıyor...' : 'Giriş Yap'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
