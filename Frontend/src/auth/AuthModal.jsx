import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import becameBg from '../assets/becameBG.png';

export default function AuthModal({
  isOpen = false,
  onClose = () => {},
  initialTab = 'login',
  onSuccess = () => {}
}) {
  const [authTab, setAuthTab] = useState(initialTab);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setAuthTab(initialTab);
    setIsSuccess(false);
  }, [initialTab, isOpen]);

  // Handle clicking outside the modal box
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAuthSuccess = (userData) => {
    setSuccessUser(userData);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onSuccess(userData);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes formSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes successCheck {
          0% { transform: scale(0.6); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-backdrop {
          animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-box {
          animation: modalScaleIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-form-slide {
          animation: formSlide 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-success-check {
          animation: successCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-modal-backdrop">
        <div
          ref={modalRef}
          className="bg-white rounded-[32px] border border-slate-100 shadow-2xl w-full max-w-[460px] flex flex-col relative overflow-hidden max-h-[92vh] animate-modal-box"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 p-1.5 transition-all cursor-pointer z-20"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>

          {isSuccess ? (
            /* Success confirmation view */
            <div className="p-6 sm:p-8 flex flex-col items-center justify-center py-12 pb-8 gap-4 text-center animate-success-check">
              <div className="h-20 w-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0F766E] shadow-inner">
                <svg className="w-10 h-10 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <h3 className="text-2xl font-black text-slate-900">Success!</h3>
                <p className="text-[14px] font-semibold text-slate-500">
                  {authTab === 'login' ? 'Successfully signed in.' : 'Your account has been created.'}
                </p>
                <p className="text-[12px] font-medium text-slate-400 mt-0.5">Preparing your TripVerse journey...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Scrollable Form Content */}
              <div className="p-6 sm:p-8 pb-4 flex flex-col gap-6 overflow-y-auto no-scrollbar flex-1">
                {/* Brand Logo Header */}
                <div className="flex items-center gap-2.5 justify-center mt-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22C9 28 27 28 29 22" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M9.5 23L5.5 20L5 25" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M26.5 23L30.5 20L31 25" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18 5C13.5 5 10 8.5 10 13C10 19.5 18 27 18 27C18 27 26 19.5 26 13C26 8.5 22.5 5 18 5Z" fill="white" stroke="#EA580C" strokeWidth="2.5" strokeLinejoin="round" />
                      <circle cx="18" cy="13" r="2.8" fill="#0F766E" />
                    </svg>
                    <span className="text-[24px] font-extrabold tracking-tight text-[#0F766E]">
                      TripVerse
                    </span>
                  </div>
                </div>

                {/* Form Content */}
                {authTab === 'login' ? (
                  <SignIn
                    onSuccess={handleAuthSuccess}
                    onSwitchToSignUp={() => setAuthTab('register')}
                  />
                ) : (
                  <SignUp
                    onSuccess={handleAuthSuccess}
                    onSwitchToSignIn={() => setAuthTab('login')}
                  />
                )}
              </div>

              {/* Bottom Illustration Banner - Full edge-to-edge flush with zero white gaps */}
              <div className="w-full shrink-0 border-t border-slate-100/60 bg-[#F4F9F6] overflow-hidden flex justify-center items-end leading-none">
                <img 
                  src={becameBg} 
                  alt="TripVerse Illustration" 
                  className="w-full h-[125px] sm:h-[135px] object-cover object-bottom select-none pointer-events-none block" 
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
