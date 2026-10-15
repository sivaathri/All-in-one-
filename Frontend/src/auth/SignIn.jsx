import React, { useState, useRef, useEffect } from 'react';
import { Phone, ArrowRight, ArrowLeft, ShieldCheck, RefreshCw, Mail, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';
import authApi from '../services/authApi';

// Circular Indian Flag Component matching the user's exact design
export function RoundIndiaFlag({ className = "w-5.5 h-5.5" }) {
  return (
    <svg className={`${className} rounded-full shrink-0 shadow-2xs overflow-hidden select-none`} viewBox="0 0 32 32" fill="none">
      <defs>
        <clipPath id="india-flag-circle-clip">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#india-flag-circle-clip)">
        {/* Saffron / Orange Top */}
        <rect width="32" height="10.66" fill="#F47920" />
        {/* White Middle */}
        <rect y="10.66" width="32" height="10.68" fill="#FFFFFF" />
        {/* Green Bottom */}
        <rect y="21.34" width="32" height="10.66" fill="#0B8043" />
        {/* Ashoka Chakra */}
        <circle cx="16" cy="16" r="3.4" stroke="#000080" strokeWidth="0.8" fill="none" />
        <circle cx="16" cy="16" r="0.75" fill="#000080" />
        {/* Chakra Spokes */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="16"
            y1="16"
            x2={16 + 3.4 * Math.cos((deg * Math.PI) / 180)}
            y2={16 + 3.4 * Math.sin((deg * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="0.4"
          />
        ))}
      </g>
    </svg>
  );
}

const COUNTRIES = [
  { code: '+91', name: 'India', flag: '🇮🇳', isIndia: true },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
];

export default function SignIn({ 
  onSuccess = () => {}, 
  onSwitchToSignUp = () => {},
  isSubmitting = false
}) {
  // Method: 'otp' (default) or 'password'
  const [method, setMethod] = useState('otp');

  // OTP flow states
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password fallback states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Refs for 6 OTP input boxes & country dropdown
  const otpRefs = useRef([]);
  const countryDropdownRef = useRef(null);

  // Click outside listener for country dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
    }
    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  // Handle phone input formatting (digits only, max 10)
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(val);
    if (error) setError('');
  };

  // Step 1: Request Sign-in OTP via Backend API
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const fullIdentifier = `${countryCode}${phoneNumber}`;
      const res = await authApi.requestSignInOtp({ identifier: fullIdentifier });

      const serverOtp = res.data?.devOtp || '';
      if (serverOtp) {
        setGeneratedOtp(serverOtp);
      }

      console.log('--------------------------------------------------');
      console.log('%c🔑 TRIPVERSE SIGN IN: OTP REQUESTED', 'color: #0F766E; font-size: 14px; font-weight: bold;');
      console.log(`📱 Mobile: ${fullIdentifier}`);
      if (serverOtp) {
        console.log(`🔢 Sign-In OTP: %c${serverOtp}`, 'color: #EA580C; font-size: 18px; font-weight: bold;');
      }
      console.log('--------------------------------------------------');

      setLoading(false);
      setStep('otp');
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (apiErr) {
      setLoading(false);
      setError(apiErr.message || 'Failed to request sign-in code.');
    }
  };

  // Step 2: Handle OTP input typing
  const handleOtpDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (error) setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setOtp(newOtp);
    if (error) setError('');
    const nextEmpty = newOtp.findIndex((d) => !d);
    if (nextEmpty !== -1) {
      otpRefs.current[nextEmpty]?.focus();
    } else {
      otpRefs.current[5]?.focus();
    }
  };

  // Resend OTP via Backend API
  const handleResendOtp = async () => {
    if (!canResend) return;
    setLoading(true);
    setError('');

    try {
      const fullIdentifier = `${countryCode}${phoneNumber}`;
      const res = await authApi.resendOtp({ identifier: fullIdentifier, type: 'mobile' });
      const newOtp = res.data?.devOtp || '';
      if (newOtp) setGeneratedOtp(newOtp);

      setLoading(false);
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to resend code.');
    }
  };

  // Step 2: Verify OTP and Sign in via Backend API
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP code');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const fullIdentifier = `${countryCode}${phoneNumber}`;
      const res = await authApi.verifySignInOtp({
        identifier: fullIdentifier,
        otp: enteredOtp
      });

      // Persist session token and user profile
      if (res.data?.token) {
        localStorage.setItem('tripverse_token', res.data.token);
      }
      if (res.data?.user) {
        localStorage.setItem('tripverse_user', JSON.stringify(res.data.user));
      }

      setLoading(false);
      onSuccess({ 
        token: res.data?.token,
        user: res.data?.user,
        phone: fullIdentifier,
        authType: 'mobile-otp'
      });
    } catch (apiErr) {
      setLoading(false);
      setError(apiErr.message || 'Verification failed. Please check the code.');
    }
  };

  // Password login fallback
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ email: emailInput, authType: 'email-password' });
    }, 900);
  };

  // Social login handler
  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ provider, authType: 'social' });
    }, 800);
  };

  return (
    <div className="flex flex-col gap-5 animate-form-slide text-left">
      {/* Heading */}
      {method === 'otp' && step === 'phone' && (
        <div className="text-center flex flex-col gap-1.5">
          <h2 className="text-[28px] font-bold text-[#0D233A] leading-tight tracking-tight">
            Sign In with Mobile
          </h2>
          <p className="text-[14px] font-semibold text-slate-400">
            We will send a 6-digit verification code to your number
          </p>
        </div>
      )}

      {method === 'otp' && step === 'otp' && (
        <div className="text-center flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center mb-1 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-[26px] font-bold text-[#0D233A] leading-tight tracking-tight">
            Verify Mobile Number
          </h2>
          <p className="text-[13.5px] font-semibold text-slate-400 max-w-[320px]">
            Enter the 6-digit code sent to{' '}
            <span className="text-slate-800 font-bold">{countryCode} {phoneNumber}</span>
            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setError('');
              }}
              className="ml-2 text-[#0F766E] hover:underline font-bold text-[12px] cursor-pointer inline-flex items-center gap-0.5"
            >
              Edit
            </button>
          </p>
        </div>
      )}

      {method === 'password' && (
        <div className="text-center flex flex-col gap-1.5">
          <h2 className="text-[28px] font-bold text-[#0D233A] leading-tight tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-[14px] font-semibold text-slate-400">
            Sign in with your email and password
          </p>
        </div>
      )}

      {/* ERROR MESSAGE DISPLAY */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
          <span>{error}</span>
        </div>
      )}

      {/* METHOD 1: OTP FLOW */}
      {method === 'otp' && (
        <>
          {/* STEP 1: Enter Phone Number */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="flex items-center rounded-2xl border border-slate-200/90 bg-white shadow-xs focus-within:border-[#0F766E] focus-within:ring-4 focus-within:ring-[#0F766E]/10 transition-all duration-300">
                    {/* Country Selector: Circular Flag + Code + Chevron (matches user design exactly) */}
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="flex items-center gap-2 pl-3.5 pr-2.5 py-3 hover:bg-slate-50/80 rounded-l-2xl select-none cursor-pointer outline-none transition-colors border-r border-slate-100 shrink-0"
                    >
                      {selectedCountry.isIndia ? (
                        <RoundIndiaFlag className="w-6 h-6" />
                      ) : (
                        <span className="text-xl leading-none">{selectedCountry.flag}</span>
                      )}
                      <span className="text-[15px] font-bold text-[#0D233A] tracking-tight">
                        {selectedCountry.code}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 stroke-[2.5] ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      required
                      autoFocus
                      maxLength={selectedCountry.code === '+91' ? 10 : 15}
                      placeholder="Enter mobile number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="w-full bg-transparent px-3.5 py-3.5 text-[15px] font-semibold text-slate-800 placeholder-slate-400 outline-none tracking-wide"
                    />
                  </div>

                  {/* Country Dropdown Popup */}
                  {isCountryDropdownOpen && (
                    <div
                      ref={countryDropdownRef}
                      className="absolute top-[calc(100%+6px)] left-0 z-40 w-72 bg-white rounded-2xl shadow-xl border border-slate-150 p-2 animate-form-slide max-h-56 overflow-y-auto no-scrollbar"
                    >
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                        Select Country
                      </div>
                      <div className="flex flex-col gap-0.5 mt-1">
                        {COUNTRIES.map((country) => (
                          <button
                            key={country.name}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(country);
                              setCountryCode(country.code);
                              setIsCountryDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs font-semibold cursor-pointer transition-colors ${
                              selectedCountry.code === country.code && selectedCountry.name === country.name
                                ? 'bg-teal-50 text-[#0F766E]'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {country.isIndia ? (
                                <RoundIndiaFlag className="w-5 h-5" />
                              ) : (
                                <span className="text-base leading-none">{country.flag}</span>
                              )}
                              <span>{country.name}</span>
                            </div>
                            <span className="font-bold text-slate-400">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Get OTP Button */}
              <button
                type="submit"
                disabled={loading || phoneNumber.length < 10 || isSubmitting}
                className="w-full mt-2 rounded-2xl bg-[#0F766E] hover:bg-[#0c625c] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3.5 text-[15px] font-bold shadow-md shadow-teal-800/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Get OTP</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </>
                )}
              </button>

              {/* Password Option Toggle */}
              {/* <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMethod('password');
                    setError('');
                  }}
                  className="text-[13px] font-bold text-[#0F766E] hover:underline cursor-pointer"
                >
                  Sign in with Password instead
                </button>
              </div> */}
            </form>
          )}

          {/* STEP 2: Enter 6-digit OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              {/* 6 OTP Digit Boxes */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 py-2" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-9 h-11 sm:w-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 border-slate-200 bg-white text-center text-lg sm:text-xl font-bold text-slate-800 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/15 transition-all duration-200 shadow-xs"
                  />
                ))}
              </div>

              {/* Helper Demo Hint */}
              <div className="text-center">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[12px] font-semibold text-[#0F766E] shadow-2xs">
                  💡 OTP logged in browser console (F12) &bull; Code: <strong className="text-orange-600 font-bold tracking-wider">{generatedOtp || '123456'}</strong>
                </span>
              </div>

              {/* Resend Timer / Action */}
              <div className="flex items-center justify-between px-1 text-[13px]">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setError('');
                  }}
                  className="flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change number</span>
                </button>

                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="flex items-center gap-1 font-bold text-[#0F766E] hover:underline cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend OTP</span>
                  </button>
                ) : (
                  <span className="font-semibold text-slate-400">
                    Resend OTP in <span className="text-[#0F766E] font-bold">{timer}s</span>
                  </span>
                )}
              </div>

              {/* Verify & Sign In Button */}
              <button
                type="submit"
                disabled={loading || otp.join('').length < 6 || isSubmitting}
                className="w-full mt-2 rounded-2xl bg-[#0F766E] hover:bg-[#0c625c] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3.5 text-[15px] font-bold shadow-md shadow-teal-800/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Verifying OTP...</span>
                  </>
                ) : (
                  <span>Verify & Sign In</span>
                )}
              </button>
            </form>
          )}
        </>
      )}

      {/* METHOD 2: EMAIL & PASSWORD FALLBACK */}
      {method === 'password' && (
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          {/* Email input */}
          <div className="relative flex items-center">
            <Mail className="absolute left-4.5 h-5 w-5 text-slate-400" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
            />
          </div>

          {/* Password input */}
          <div className="relative flex items-center">
            <Lock className="absolute left-4.5 h-5 w-5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
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
          <div className="flex items-center justify-between px-1">
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
            {loading ? (
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

          {/* Switch back to Mobile OTP */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setMethod('otp');
                setStep('phone');
                setError('');
              }}
              className="text-[13px] font-bold text-[#0F766E] hover:underline cursor-pointer"
            >
              Sign in with Mobile Number OTP
            </button>
          </div>
        </form>
      )}

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
