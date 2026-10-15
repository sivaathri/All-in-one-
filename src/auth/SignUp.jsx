import React, { useState, useRef, useEffect } from 'react';
import { Mail, User, Phone, ChevronDown, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { RoundIndiaFlag } from './SignIn';

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

export default function SignUp({ 
  onSuccess = () => {}, 
  onSwitchToSignIn = () => {},
  isSubmitting = false 
}) {
  // Step: 'form' | 'verify'
  const [step, setStep] = useState('form');

  // Form input states
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // OTP Verification states
  const [phoneOtp, setPhoneOtp] = useState(['', '', '', '', '', '']);
  const [emailOtp, setEmailOtp] = useState(['', '', '', '', '', '']);
  const [generatedPhoneOtp, setGeneratedPhoneOtp] = useState('');
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('');
  const [phoneTimer, setPhoneTimer] = useState(30);
  const [emailTimer, setEmailTimer] = useState(30);
  const [canResendPhone, setCanResendPhone] = useState(false);
  const [canResendEmail, setCanResendEmail] = useState(false);

  // Loading & error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Refs
  const countryDropdownRef = useRef(null);
  const phoneOtpRefs = useRef([]);
  const emailOtpRefs = useRef([]);

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

  // Timers countdown for Phone & Email OTPs
  useEffect(() => {
    let phoneInterval = null;
    let emailInterval = null;

    if (step === 'verify') {
      if (phoneTimer > 0) {
        phoneInterval = setInterval(() => {
          setPhoneTimer((prev) => prev - 1);
        }, 1000);
      } else {
        setCanResendPhone(true);
      }

      if (emailTimer > 0) {
        emailInterval = setInterval(() => {
          setEmailTimer((prev) => prev - 1);
        }, 1000);
      } else {
        setCanResendEmail(true);
      }
    }

    return () => {
      if (phoneInterval) clearInterval(phoneInterval);
      if (emailInterval) clearInterval(emailInterval);
    };
  }, [step, phoneTimer, emailTimer]);

  // Step 1: Handle initial form submission & generate both OTPs
  const handleProceedToVerification = (e) => {
    e.preventDefault();

    if (!nameInput.trim()) {
      setError('Please enter your full name');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    if (phoneInput.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setError('');
    setLoading(true);

    // Generate random 6-digit OTP for Phone and Email
    const newPhoneOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newEmailOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedPhoneOtp(newPhoneOtp);
    setGeneratedEmailOtp(newEmailOtp);

    // Prominently console log both generated OTPs
    console.log('====================================================');
    console.log('%c🔑 TRIPVERSE SIGN UP: DUAL OTP VERIFICATION', 'color: #0F766E; font-size: 15px; font-weight: bold;');
    console.log(`📱 Mobile Number: ${selectedCountry.code} ${phoneInput}`);
    console.log(`📲 Mobile OTP:    %c${newPhoneOtp}`, 'color: #EA580C; font-size: 16px; font-weight: bold; background: #FFF7ED; padding: 2px 8px; border-radius: 4px; border: 1px solid #FDBA74;');
    console.log(`✉️ Email Address: ${emailInput}`);
    console.log(`📧 Email OTP:     %c${newEmailOtp}`, 'color: #2563EB; font-size: 16px; font-weight: bold; background: #EFF6FF; padding: 2px 8px; border-radius: 4px; border: 1px solid #BFDBFE;');
    console.log('====================================================');

    setTimeout(() => {
      setLoading(false);
      setStep('verify');
      setPhoneOtp(['', '', '', '', '', '']);
      setEmailOtp(['', '', '', '', '', '']);
      setPhoneTimer(30);
      setEmailTimer(30);
      setCanResendPhone(false);
      setCanResendEmail(false);
      // Auto-focus first input
      setTimeout(() => {
        phoneOtpRefs.current[0]?.focus();
      }, 100);
    }, 700);
  };

  // Resend Mobile OTP
  const handleResendPhoneOtp = () => {
    if (!canResendPhone) return;
    const newPhoneOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPhoneOtp(newPhoneOtp);
    setPhoneTimer(30);
    setCanResendPhone(false);
    setPhoneOtp(['', '', '', '', '', '']);
    console.log('%c📲 RESENT MOBILE OTP: %c' + newPhoneOtp, 'color: #0F766E; font-weight: bold;', 'color: #EA580C; font-weight: bold; background: #FFF7ED; padding: 2px 6px;');
    phoneOtpRefs.current[0]?.focus();
  };

  // Resend Email OTP
  const handleResendEmailOtp = () => {
    if (!canResendEmail) return;
    const newEmailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedEmailOtp(newEmailOtp);
    setEmailTimer(30);
    setCanResendEmail(false);
    setEmailOtp(['', '', '', '', '', '']);
    console.log('%c📧 RESENT EMAIL OTP: %c' + newEmailOtp, 'color: #0F766E; font-weight: bold;', 'color: #2563EB; font-weight: bold; background: #EFF6FF; padding: 2px 6px;');
    emailOtpRefs.current[0]?.focus();
  };

  // Handle Mobile OTP digit change
  const handlePhoneOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...phoneOtp];
    newOtp[index] = value.slice(-1);
    setPhoneOtp(newOtp);
    if (error) setError('');
    if (value && index < 5) {
      phoneOtpRefs.current[index + 1]?.focus();
    } else if (value && index === 5) {
      emailOtpRefs.current[0]?.focus();
    }
  };

  // Handle Email OTP digit change
  const handleEmailOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...emailOtp];
    newOtp[index] = value.slice(-1);
    setEmailOtp(newOtp);
    if (error) setError('');
    if (value && index < 5) {
      emailOtpRefs.current[index + 1]?.focus();
    }
  };

  // Backspace handling
  const handlePhoneKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !phoneOtp[index] && index > 0) {
      phoneOtpRefs.current[index - 1]?.focus();
    }
  };

  const handleEmailKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !emailOtp[index] && index > 0) {
      emailOtpRefs.current[index - 1]?.focus();
    }
  };

  // Paste handling for Mobile OTP
  const handlePhonePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...phoneOtp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setPhoneOtp(newOtp);
    if (error) setError('');
    emailOtpRefs.current[0]?.focus();
  };

  // Paste handling for Email OTP
  const handleEmailPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = [...emailOtp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setEmailOtp(newOtp);
    if (error) setError('');
  };

  // Step 2: Verify both OTPs and complete registration
  const handleVerifyBothOtps = (e) => {
    e.preventDefault();
    const enteredPhone = phoneOtp.join('');
    const enteredEmail = emailOtp.join('');

    if (enteredPhone.length !== 6) {
      setError('Please enter the 6-digit Mobile OTP');
      return;
    }
    if (enteredEmail.length !== 6) {
      setError('Please enter the 6-digit Email OTP');
      return;
    }

    // Validate phone OTP (allows generated or demo 123456)
    if (generatedPhoneOtp && enteredPhone !== generatedPhoneOtp && enteredPhone !== '123456') {
      setError(`Invalid Mobile OTP code. Check console (F12) for: ${generatedPhoneOtp}`);
      return;
    }

    // Validate email OTP (allows generated or demo 123456)
    if (generatedEmailOtp && enteredEmail !== generatedEmailOtp && enteredEmail !== '123456') {
      setError(`Invalid Email OTP code. Check console (F12) for: ${generatedEmailOtp}`);
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSuccess({
        name: nameInput,
        email: emailInput,
        phone: `${selectedCountry.code} ${phoneInput}`,
        authType: 'dual-otp-signup'
      });
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ provider, authType: 'social' });
    }, 800);
  };

  const isPhoneFilled = phoneOtp.join('').length === 6;
  const isEmailFilled = emailOtp.join('').length === 6;

  return (
    <div className="flex flex-col gap-5 animate-form-slide text-left">
      {/* ================= STEP 1: REGISTRATION FORM ================= */}
      {step === 'form' && (
        <>
          {/* Heading */}
          <div className="text-center flex flex-col gap-1.5">
            <h2 className="text-[28px] font-bold text-[#0D233A] leading-tight tracking-tight">
              Create Account
            </h2>
            <p className="text-[14px] font-semibold text-slate-400">
              Join TripVerse and start exploring
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleProceedToVerification} className="flex flex-col gap-3.5">
            {/* Full Name input */}
            <div className="relative flex items-center">
              <User className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'name' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
              <input
                type="text"
                required
                placeholder="Full Name"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (error) setError('');
                }}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
              />
            </div>

            {/* Email Address input */}
            <div className="relative flex items-center">
              <Mail className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#0F766E]' : 'text-slate-400'}`} />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (error) setError('');
                }}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 transition-all duration-300 shadow-xs"
              />
            </div>

            {/* Mobile Number with Circular Flag Dropdown */}
            <div className="relative">
              <div className="flex items-center rounded-2xl border border-slate-200/90 bg-white shadow-xs focus-within:border-[#0F766E] focus-within:ring-4 focus-within:ring-[#0F766E]/10 transition-all duration-300">
                {/* Country Selector Button */}
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

                {/* Mobile Input */}
                <input
                  type="tel"
                  required
                  maxLength={selectedCountry.code === '+91' ? 10 : 15}
                  placeholder="Mobile Number"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10));
                    if (error) setError('');
                  }}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
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

            {/* Terms check */}
            <div 
              onClick={() => {
                setAgreeTerms(!agreeTerms);
                if (error) setError('');
              }}
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
              disabled={loading || isSubmitting || !agreeTerms || !nameInput || !emailInput || phoneInput.length < 10}
              className="w-full mt-2 rounded-2xl bg-[#0F766E] hover:bg-[#0c625c] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3.5 text-[15px] font-bold shadow-md shadow-teal-800/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending verification codes...</span>
                </>
              ) : (
                <>
                  <span>Get Started &bull; Verify with OTP</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
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
        </>
      )}

      {/* ================= STEP 2: DUAL OTP VERIFICATION ================= */}
      {step === 'verify' && (
        <form onSubmit={handleVerifyBothOtps} className="flex flex-col gap-4 text-left animate-form-slide">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 text-[#0F766E] flex items-center justify-center mb-0.5 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-[25px] font-bold text-[#0D233A] leading-tight tracking-tight">
              Verify Email & Mobile
            </h2>
            <p className="text-[13px] font-semibold text-slate-400 max-w-[340px]">
              Enter the 6-digit verification codes sent to your phone and email
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          {/* SECTION 1: MOBILE OTP */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/40 p-3.5 flex flex-col gap-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-100/60 text-[#0F766E] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                    <span>Mobile OTP</span>
                    {isPhoneFilled && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                    )}
                  </div>
                  <div className="text-[11.5px] font-medium text-slate-400">
                    {selectedCountry.code} {phoneInput}
                  </div>
                </div>
              </div>

              {/* Resend Phone Timer / Action */}
              <div className="text-right">
                {canResendPhone ? (
                  <button
                    type="button"
                    onClick={handleResendPhoneOtp}
                    className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                ) : (
                  <span className="text-[11.5px] font-semibold text-slate-400">
                    Resend in <strong className="text-[#0F766E]">{phoneTimer}s</strong>
                  </span>
                )}
              </div>
            </div>

            {/* 6 Input Boxes for Phone */}
            <div className="flex items-center justify-center gap-2" onPaste={handlePhonePaste}>
              {phoneOtp.map((digit, index) => (
                <input
                  key={`phone-${index}`}
                  ref={(el) => (phoneOtpRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePhoneOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handlePhoneKeyDown(index, e)}
                  className="w-10 h-12 sm:w-11 sm:h-12.5 rounded-xl border-2 border-slate-200 bg-white text-center text-lg font-bold text-slate-800 outline-none focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/15 transition-all shadow-2xs"
                />
              ))}
            </div>
          </div>

          {/* SECTION 2: EMAIL OTP */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/40 p-3.5 flex flex-col gap-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100/60 text-blue-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                    <span>Email OTP</span>
                    {isEmailFilled && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                    )}
                  </div>
                  <div className="text-[11.5px] font-medium text-slate-400 max-w-[190px] truncate">
                    {emailInput}
                  </div>
                </div>
              </div>

              {/* Resend Email Timer / Action */}
              <div className="text-right">
                {canResendEmail ? (
                  <button
                    type="button"
                    onClick={handleResendEmailOtp}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                ) : (
                  <span className="text-[11.5px] font-semibold text-slate-400">
                    Resend in <strong className="text-blue-600">{emailTimer}s</strong>
                  </span>
                )}
              </div>
            </div>

            {/* 6 Input Boxes for Email */}
            <div className="flex items-center justify-center gap-2" onPaste={handleEmailPaste}>
              {emailOtp.map((digit, index) => (
                <input
                  key={`email-${index}`}
                  ref={(el) => (emailOtpRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleEmailOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleEmailKeyDown(index, e)}
                  className="w-10 h-12 sm:w-11 sm:h-12.5 rounded-xl border-2 border-slate-200 bg-white text-center text-lg font-bold text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15 transition-all shadow-2xs"
                />
              ))}
            </div>
          </div>

          {/* Console / Demo Badge */}
          <div className="text-center">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[11.5px] font-semibold text-[#0F766E] shadow-2xs">
              💡 Codes in Console (F12) &bull; Mobile: <strong className="text-orange-600">{generatedPhoneOtp || '123456'}</strong> &bull; Email: <strong className="text-blue-600">{generatedEmailOtp || '123456'}</strong>
            </span>
          </div>

          {/* Verify & Complete Button */}
          <button
            type="submit"
            disabled={loading || !isPhoneFilled || !isEmailFilled || isSubmitting}
            className="w-full mt-1 rounded-2xl bg-[#0F766E] hover:bg-[#0c625c] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3.5 text-[15px] font-bold shadow-md shadow-teal-800/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying codes...</span>
              </>
            ) : (
              <span>Verify & Complete Registration</span>
            )}
          </button>

          {/* Back to Edit Button */}
          <div className="text-center pt-0.5">
            <button
              type="button"
              onClick={() => {
                setStep('form');
                setError('');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to edit details</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
