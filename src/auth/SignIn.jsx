import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function SignIn({ 
  onSuccess = () => {}, 
  onSwitchToSignUp = () => {},
  isSubmitting = false
}) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ email: emailInput });
    }, 1200);
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ provider });
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 animate-form-slide text-left">
      {/* Heading */}
      <div className="text-center flex flex-col gap-1.5">
        <h2 className="text-[28px] font-bold text-[#0D233A] leading-tight tracking-tight">
          Welcome Back!
        </h2>
        <p className="text-[14px] font-semibold text-slate-400">
          Sign in to continue your journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email or Phone input */}
        <div className="relative flex items-center">
          <Mail className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
          <input
            type="text"
            required
            placeholder="Email or Phone Number"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
          />
        </div>

        {/* Password input */}
        <div className="relative flex items-center">
          <Lock className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-12 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between mt-1 px-1">
          <div 
            onClick={() => setRememberMe(!rememberMe)}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
              rememberMe 
                ? 'bg-[#0F766E] border-[#0F766E] text-white shadow-xs' 
                : 'border-slate-300 group-hover:border-slate-400 bg-white'
            }`}>
              {rememberMe && (
                <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-[13.5px] font-semibold text-slate-600">Remember me</span>
          </div>

          <a href="#forgot" className="text-[13.5px] font-bold text-[#0F766E] hover:underline transition-all">
            Forgot Password?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full mt-2 rounded-2xl bg-[#0F766E] hover:bg-[#0c625c] disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-3.5 text-[15px] font-bold shadow-md shadow-teal-800/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading || isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      {/* Or continue with */}
      <div className="flex items-center gap-3 px-1">
        <span className="h-[1px] bg-slate-200 flex-1"></span>
        <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">or continue with</span>
        <span className="h-[1px] bg-slate-200 flex-1"></span>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-3 gap-3 px-1">
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 bg-white py-2.5 text-[13px] font-bold text-slate-700 hover:shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('Facebook')}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 bg-white py-2.5 text-[13px] font-bold text-slate-700 hover:shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('Apple')}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 bg-white py-2.5 text-[13px] font-bold text-slate-700 hover:shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5 text-black shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 2.99 1.11.09 2.24-.55 3-1.43z" />
          </svg>
          Apple
        </button>
      </div>

      {/* Switch to Sign Up */}
      <div className="text-center pb-2">
        <span className="text-[14px] font-semibold text-slate-500">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-[#0F766E] font-bold hover:underline cursor-pointer transition-colors"
          >
            Sign Up
          </button>
        </span>
      </div>
    </div>
  );
}
