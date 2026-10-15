import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';

export default function SignUp({ 
  onSuccess = () => {}, 
  onSwitchToSignIn = () => {},
  isSubmitting = false 
}) {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput !== confirmPasswordInput) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ name: nameInput, email: emailInput, phone: phoneInput });
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
          Create Account
        </h2>
        <p className="text-[14px] font-semibold text-slate-400">
          Join TripVerse and start exploring
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* Name input */}
        <div className="relative flex items-center">
          <User className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'name' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
          <input
            type="text"
            required
            placeholder="Full Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
            className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
          />
        </div>

        {/* Email input */}
        <div className="relative flex items-center">
          <Mail className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
          />
        </div>

        {/* Phone input */}
        <div className="relative flex items-center">
          <Phone className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'phone' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
          <input
            type="tel"
            required
            placeholder="Phone Number"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            onFocus={() => setFocusedInput('phone')}
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
            placeholder="Create Password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              if (passwordError) setPasswordError('');
            }}
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

        {/* Confirm Password input */}
        <div className="relative flex items-center">
          <Lock className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'confirmPassword' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            required
            placeholder="Confirm Password"
            value={confirmPasswordInput}
            onChange={(e) => {
              setConfirmPasswordInput(e.target.value);
              if (passwordError) setPasswordError('');
            }}
            onFocus={() => setFocusedInput('confirmPassword')}
            onBlur={() => setFocusedInput(null)}
            className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-12 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {passwordError && (
          <p className="text-xs font-bold text-red-500 px-1">{passwordError}</p>
        )}

        {/* Terms check */}
        <div 
          onClick={() => setAgreeTerms(!agreeTerms)}
          className="flex items-start gap-2.5 cursor-pointer select-none group mt-1 px-1"
        >
          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all mt-0.5 ${
            agreeTerms 
              ? 'bg-[#0F766E] border-[#0F766E] text-white shadow-xs' 
              : 'border-slate-300 group-hover:border-slate-400 bg-white'
          }`}>
            {agreeTerms && (
              <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span className="text-[13px] font-semibold text-slate-500 leading-normal text-left">
            I agree to the <span className="text-[#0F766E] hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-[#0F766E] hover:underline cursor-pointer">Privacy Policy</span>
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || isSubmitting || !agreeTerms}
          className="w-full mt-2 rounded-2xl bg-[#0F766E] hover:bg-[#0c625c] disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-3.5 text-[15px] font-bold shadow-md shadow-teal-800/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading || isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Creating account...</span>
            </>
          ) : (
            <span>Get Started</span>
          )}
        </button>
      </form>

      {/* Or continue with */}
      <div className="flex items-center gap-3 px-1">
        <span className="h-[1px] bg-slate-200 flex-1"></span>
        <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">or continue with</span>
        <span className="h-[1px] bg-slate-200 flex-1"></span>
      </div>

      {/* Social Button: Google only */}
      <div className="px-1">
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white py-3 text-[14px] font-bold text-slate-700 hover:shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Switch to Sign In */}
      <div className="text-center pb-2">
        <span className="text-[14px] font-semibold text-slate-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-[#0F766E] font-bold hover:underline cursor-pointer transition-colors"
          >
            Sign In
          </button>
        </span>
      </div>
    </div>
  );
}
