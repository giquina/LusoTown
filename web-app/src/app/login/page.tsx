"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  HeartIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  StarIcon,
  ShieldCheckIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { authService } from "@/lib/auth";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import SocialLogin from "@/components/SocialLogin";
import { ROUTES } from "@/config/routes";
import { TEST_DISPLAY_CONFIG } from "@/config/credentials";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { language, t } = useLanguage();
  const { subscriptionRequired } = useSubscription();

  const isPortuguese = language === "pt";

  useEffect(() => {
    // Redirect if already authenticated
    if (authService.isAuthenticated()) {
      router.push(ROUTES.dashboard);
    }
  }, [router]);

  // Real-time email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(
        isPortuguese
          ? "Por favor, insira um endereço de email válido"
          : "Please enter a valid email address"
      );
    } else {
      setEmailError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (name === "email") {
      validateEmail(value);
    }

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError(
        isPortuguese
          ? "Por favor, preencha todos os campos"
          : "Please fill in all fields"
      );
      setIsLoading(false);
      return;
    }

    try {
      const result = await authService.login(
        formData.email.trim(),
        formData.password
      );

      if (result.success) {
        // Redirect based on user role
        if (result.user?.role === "admin") {
          router.push(ROUTES.admin);
        } else {
          router.push(ROUTES.dashboard);
        }
      } else {
        setError(
          result.error || (isPortuguese ? "Erro no login" : "Login failed")
        );
      }
    } catch (error) {
      setError(
        isPortuguese
          ? "Ocorreu um erro inesperado. Tente novamente."
          : "An unexpected error occurred. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials
  const testCredentials = {
    email: 'demo@lusotown.com',
    password: 'LusoTown2025!',
  };

  const fillTestCredentials = () => {
    setFormData(testCredentials);
  };

  const loadingMessages = isPortuguese
    ? [
        "Bem-vindo de volta à comunidade...",
        "Conectando ao seu calendário social...",
        "Preparando o seu espaço português...",
      ]
    : [
        "Welcome back to your community...",
        "Connecting to your social calendar...",
        "Preparing your Lusophone network...",
      ];

  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading, loadingMessages.length]);

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen">
          <div className="container-width w-full">
            {/* Centered Login Layout */}
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
              >
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center shadow-lg">
                      <HeartIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      LusoTown
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {isPortuguese
                      ? "Entre na sua conta"
                      : "Sign in to your account"}
                  </p>

                  {/* Social Proof */}
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <UsersIcon className="h-4 w-4" />
                      <span>750+ {isPortuguese ? "Membros" : "Members"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>London & United Kingdom</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckBadgeIcon className="h-4 w-4 text-green-500" />
                      <span>{isPortuguese ? "Verificado" : "Verified"}</span>
                    </div>
                  </div>
                </div>

                {/* Test Credentials Helper */}
                <div className="mb-6 p-4 bg-gradient-to-r from-accent-50 to-coral-50 border border-accent-200 rounded-xl">
                  <h3 className="text-sm font-semibold text-accent-900 mb-2">
                    {isPortuguese ? "Experimentar a Demo" : "Try Demo"}
                  </h3>
                  <p className="text-xs text-accent-700 mb-3">
                    {isPortuguese
                      ? "Use estas credenciais para explorar a plataforma:"
                      : "Use these credentials to explore the platform:"}
                  </p>
                  <div className="bg-white p-3 rounded-lg mb-3 border">
                    <div className="text-xs text-gray-600 mb-1">
                      Email:{" "}
                      <span className="font-mono text-gray-900">
                        {testCredentials.email}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Password:{" "}
                      <span className="font-mono text-gray-900">
                        {testCredentials.password}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={fillTestCredentials}
                    type="button"
                    className="block w-full text-center p-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    {isPortuguese
                      ? "Preencher Automaticamente"
                      : "Auto-Fill Credentials"}
                  </button>
                </div>

                {/* New to LusoTown Helper */}
                <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl">
                  <h3 className="text-sm font-semibold text-primary-900 mb-2">
                    {isPortuguese ? "Novo na LusoTown?" : "New to LusoTown?"}
                  </h3>
                  <p className="text-xs text-primary-700 mb-3">
                    {isPortuguese
                      ? "Preencha o seu calendário social com falantes de português em Londres."
                      : "Fill your social calendar with Portuguese speakers in London."}
                  </p>
                  <a
                    href={ROUTES.signup}
                    className="block w-full text-center p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all text-sm font-semibold shadow-md hover:shadow-lg"
                  >
                    {isPortuguese ? "Juntar à Rede →" : "Join Our Network →"}
                  </a>
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {isPortuguese ? "Email" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        emailError
                          ? "border-red-300 focus:ring-red-400"
                          : formData.email && !emailError
                          ? "border-green-300 focus:ring-green-400"
                          : "border-gray-300 focus:ring-primary-400"
                      }`}
                      placeholder={
                        isPortuguese ? "seu@email.com" : "your@email.com"
                      }
                      disabled={isLoading}
                      autoFocus
                      required
                    />
                    {emailError && (
                      <p className="mt-1 text-sm text-red-600">{emailError}</p>
                    )}
                    {formData.email && !emailError && (
                      <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                        <CheckBadgeIcon className="h-4 w-4" />
                        {isPortuguese ? "Email válido" : "Valid email address"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {isPortuguese ? "Palavra-passe" : "Password"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                        placeholder={
                          isPortuguese
                            ? "Introduza a sua palavra-passe"
                            : "Enter your password"
                        }
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded"
                        disabled={isLoading}
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {isPortuguese ? "Lembrar-me" : "Remember me"}
                      </label>
                    </div>

                    <a
                      href={ROUTES.forgotPassword}
                      className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                    >
                      {isPortuguese
                        ? "Esqueceu a palavra-passe?"
                        : "Forgot password?"}
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary luxury-btn-primary luxury-touch-target w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all min-h-[56px] sm:min-h-[60px]"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>{loadingMessages[loadingMessageIndex]}</span>
                      </div>
                    ) : isPortuguese ? (
                      "Entrar em Casa"
                    ) : (
                      "Welcome Home"
                    )}
                  </button>
                </form>

                {/* Social Login & Alternative Options */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {/* Social Login Buttons */}
                  <div className="mb-6">
                    <SocialLogin mode="login" />
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-gray-600 text-sm">
                      {isPortuguese
                        ? "Não tem conta?"
                        : "Don't have an account?"}{" "}
                      <a
                        href={ROUTES.signup}
                        className="text-primary-500 hover:text-primary-600 font-semibold"
                      >
                        {isPortuguese ? "Juntar à Família" : "Join Our Family"}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Terms & Privacy */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-center text-xs text-gray-500 leading-relaxed">
                    {isPortuguese
                      ? "Ao entrar, concorda com os nossos"
                      : "By signing in, you agree to our"}{" "}
                    <a
                      href={ROUTES.terms}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      {isPortuguese ? "Termos de Serviço" : "Terms of Service"}
                    </a>{" "}
                    {isPortuguese ? "e" : "and"}{" "}
                    <a
                      href={ROUTES.privacy}
                      className="text-primary-500 hover:text-primary-600"
                    >
                      {isPortuguese
                        ? "Política de Privacidade"
                        : "Privacy Policy"}
                    </a>
                  </p>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <CheckBadgeIcon className="w-4 h-4 text-secondary-500" />
                    <span className="text-xs text-secondary-600 font-medium">
                      {isPortuguese
                        ? "Comunidade Segura & Verificada"
                        : "Safe & Verified Community"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
