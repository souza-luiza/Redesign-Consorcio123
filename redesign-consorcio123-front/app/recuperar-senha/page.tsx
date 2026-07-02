"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RecuperarSenha() {
  const [highContrast, setHighContrast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Controle de etapas (1: Email, 2: Código, 3: Nova Senha)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estados para os inputs e validação
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  
  const router = useRouter();

  const toggleContrast = () => {
    const novoValor = !highContrast;
    setHighContrast(novoValor); 
    localStorage.setItem('alto-contraste', String(novoValor));
  }
  
  useEffect(() => {
    const storage = localStorage.getItem('alto-contraste') === 'true';
    setHighContrast(storage);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (currentStep === 1) {
      if (!email.trim()) {
        setErrorMsg("Por favor, preencha o campo de e-mail.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMsg("Por favor, insira um e-mail válido.");
        return;
      }
      setCurrentStep(2);
    } 
    else if (currentStep === 2) {
      if (!codigo.trim()) {
        setErrorMsg("Por favor, insira o código de recuperação.");
        return;
      }
      setCurrentStep(3);
    } 
    else if (currentStep === 3) {
      if (password.length < 6) {
        setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("As senhas não coincidem.");
        return;
      }
      router.push("/login");
    }
  };

  const irParaMenu = () => {
    let menus: HTMLElement | null = null;
    if (currentStep === 1) {
      menus = document.getElementById("email"); 
    } else if (currentStep === 2) {
      menus = document.getElementById("codigo");
    } else if (currentStep === 3) {
      menus = document.getElementById("new-password");
    }

    if (menus) {
      menus.scrollIntoView({ behavior: "smooth", block: "center" });
      menus.focus();
    }
  };

  const irParaConteudo = () => {
    const conteudo = document.getElementById("main-content");
    if (conteudo) {
      conteudo.scrollIntoView({ behavior: "smooth", block: "start" });
      conteudo.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const elementoAtivo = document.activeElement;
      const estaDigitando =
        elementoAtivo instanceof HTMLInputElement ||
        elementoAtivo instanceof HTMLTextAreaElement ||
        elementoAtivo instanceof HTMLSelectElement;

      if (estaDigitando) return;

      if (event.key === "1") irParaConteudo();
      if (event.key === "2") irParaMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [irParaMenu, irParaConteudo, toggleContrast]);

  // Classes Globais de Estilização
  const textPrimary = highContrast ? "text-white" : "text-black";
  const cardClass = highContrast 
    ? "bg-[#111111] text-white border border-gray-700 rounded-lg p-8 w-full max-w-lg mx-auto"
    : "bg-[#100b4f] text-white rounded-lg p-8 w-full max-w-lg mx-auto";

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? "bg-[#212121]" : "bg-white"}`}>
      {/* Navbar de Acessibilidade */}
      <nav
        className={`w-full px-12 py-2.5 flex justify-start items-center gap-6
        ${highContrast ? "bg-[#212121]" : "bg-[#e2e3e6]"}`}
      >
        <button
          onClick={irParaConteudo}
          className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors cursor-pointer
          ${
            highContrast
              ? "text-white hover:bg-white hover:text-black focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#fac16d]"
              : "text-black hover:bg-[#100b4f] hover:text-white focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white"
          }`}
        >
          <strong
            className={`w-6 h-6 rounded flex items-center justify-center text-sm font-bold
            ${highContrast ? "bg-white text-black" : "bg-[#fac16d] text-black"}`}
          >
            1
          </strong>
          <span className="text-sm font-medium">Ir para o conteúdo</span>
        </button>

        <button
          onClick={irParaMenu}
          className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors cursor-pointer
          ${
            highContrast
              ? "text-white hover:bg-white hover:text-black focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#fac16d]"
              : "text-black hover:bg-[#100b4f] hover:text-white focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white"
          }`}
        >
          <strong
            className={`w-6 h-6 rounded flex items-center justify-center text-sm font-bold
            ${highContrast ? "bg-white text-black" : "bg-[#fac16d] text-black"}`}
          >
            2
          </strong>
          <span className="text-sm font-medium">Ir para o menu</span>
        </button>

        <button
          onClick={toggleContrast}
          className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors cursor-pointer
          ${
            highContrast
              ? "text-white hover:bg-white hover:text-black focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#fac16d]"
              : "text-black hover:bg-[#100b4f] hover:text-white focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white"
          }`}
        >
          <div
            className={`w-6 h-6 rounded flex items-center justify-center
            ${highContrast ? "bg-white" : "bg-[#fac16d]"}`} // Mesma cor de fundo condicional dos números
          >
            <img
              src={highContrast ? "/altocontraste2.png" : "/altocontraste1.png"}
              alt=""
              className="w-5 h-5 object-contain" // Tamanho ajustado para caber
            />
          </div>
          <span className="text-sm font-medium">
            {highContrast ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}
          </span>
        </button>
      </nav>

      <Header highContrast={highContrast} />

      <main 
        id="main-content" 
        tabIndex={-1} 
        className="flex-1 flex flex-col items-center justify-center p-6 focus:outline-none"
      >
        {/* Stepper / Indicador de Progresso */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {currentStep === 1 && "Passo 1 de 3: Identificação."}
          {currentStep === 2 && "Passo 2 de 3: Envio do código de recuperação."}
          {currentStep === 3 && "Passo 3 de 3: Redefinição de senha."}
        </span>
        <div className="flex items-start justify-center gap-2 mb-10 w-full max-w-lg mx-auto" aria-hidden="true">
          {/* Step 1 */}
          <div className="flex flex-col items-center w-28">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 
              ${currentStep >= 1 ? (highContrast ? 'bg-[#fac16d] text-black ring-4 ring-[#fac16d]/30' : 'bg-[#100b4f] text-white ring-4 ring-[#100b4f]/20') : 'bg-[#9ca3af]'}`}>
              {currentStep > 1 ? <Check size={14} strokeWidth={3} /> : <div className={`w-2.5 h-2.5 rounded-full ${highContrast ? 'bg-black' : 'bg-white'}`} />}
            </div>
            <div className="text-center mt-3">
              <p className={`text-xs font-semibold ${textPrimary}`}>Passo 1</p>
              <p className={`text-xs ${textPrimary}`}>Identificação</p>
            </div>
          </div>

          {/* Linha 1-2 */}
          <div className={`w-16 h-[2px] mt-3 
            ${currentStep >= 2 ? (highContrast ? 'bg-[#fac16d]' : 'bg-[#100b4f]') : 'bg-[#9ca3af]'}`} />

          {/* Step 2 */}
          <div className="flex flex-col items-center w-28">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 
              ${currentStep >= 2 ? (highContrast ? 'bg-[#fac16d] text-black ring-4 ring-[#fac16d]/30' : 'bg-[#100b4f] text-white ring-4 ring-[#100b4f]/20') : 'bg-[#9ca3af]'}`}>
              {currentStep > 2 ? <Check size={14} strokeWidth={3} /> : (currentStep === 2 ? <div className={`w-2.5 h-2.5 rounded-full ${highContrast ? 'bg-black' : 'bg-white'}`} /> : null)}
            </div>
            <div className="text-center mt-3">
              <p className={`text-xs font-semibold ${textPrimary}`}>Passo 2</p>
              <p className={`text-xs ${textPrimary}`}>Envio de código</p>
            </div>
          </div>

          {/* Linha 2-3 */}
          <div className={`w-16 h-[2px] mt-3 
            ${currentStep >= 3 ? (highContrast ? 'bg-[#fac16d]' : 'bg-[#100b4f]') : 'bg-[#9ca3af]'}`} />

          {/* Step 3 */}
          <div className="flex flex-col items-center w-28">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 
              ${currentStep >= 3 ? (highContrast ? 'bg-[#fac16d] text-black ring-4 ring-[#fac16d]/30' : 'bg-[#100b4f] text-white ring-4 ring-[#100b4f]/20') : 'bg-[#9ca3af]'}`}>
              {currentStep === 3 ? <div className={`w-2.5 h-2.5 rounded-full ${highContrast ? 'bg-black' : 'bg-white'}`} /> : null}
            </div>
            <div className="text-center mt-3">
              <p className={`text-xs font-semibold ${textPrimary}`}>Passo 3</p>
              <p className={`text-xs ${textPrimary}`}>Redefinição de senha</p>
            </div>
          </div>
        </div>

        {/* Card Principal */}
        <div className={cardClass}>
          {infoMsg && (
            <div className="border bg-[#e65100] text-white p-3 rounded-md text-sm mb-6 text-center font-medium" role="alert">
              {infoMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center w-full">
            {/* ETAPA 1: Identificação */}
            {currentStep === 1 && (
              <>
                <h2 id="email-instrucao" className="text-center text-[17px] leading-snug font-medium mb-8 max-w-sm">
                  Insira seu email cadastrado para que possamos enviar o código de recuperação
                </h2>
                
                <div className="w-full mb-8">
                  <label htmlFor="email" className="block text-sm mb-2 text-left">
                    Email cadastrado
                  </label>
                  <input
                    type="email"
                    id="email"
                    aria-invalid={!!errorMsg}
                    aria-describedby={`email-instrucao ${errorMsg ? "email-error" : ""}`.trim()}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className={`w-full px-4 py-3 bg-white rounded-md text-sm text-black outline-none transition-shadow ${
                    highContrast
                        ? "focus:ring-4 focus:ring-[#fac16d]"
                        : "focus:ring-4 focus:ring-[#e65100]"
                    }`}
                    required
                  />
                  {errorMsg && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-2 text-sm text-red-500"
                    >
                      {errorMsg}
                    </p>
                  )}

                </div>
                
                <button type="submit" className={`px-10 py-2.5 rounded-md font-medium text-sm outline-none transition-all cursor-pointer ${
                        highContrast
                        ? "bg-transparent text-white border hover:bg-[#f69c0a] hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-[#f69c0a]"
                        : "bg-[#fac16d] text-black border border-transparent hover:bg-[#f69c0a] focus:ring-4 focus:ring-[#e65100]"
                    }`}>
                  Continuar
                </button>
              </>
            )}

            {/* ETAPA 2: Envio de código */}
            {currentStep === 2 && (
              <>
                <h2 className="text-center text-xl font-bold mb-4">
                  Recuperação de Senha
                </h2>
                <p id="codigo-instrucao" className="text-center text-sm mb-8 text-gray-200">
                  Um código de recuperação foi enviado para o e-mail cadastrado. <br />
                  Digite o código recebido abaixo.
                </p>
                
                <div className="w-full mb-6">
                  <label htmlFor="codigo" className="block text-sm mb-2 text-left">
                    Insira o código recebido
                  </label>
                  <input
                    type="text"
                    id="codigo"
                    aria-invalid={!!errorMsg}
                    aria-describedby={`codigo-instrucao ${errorMsg ? "codigo-error" : ""}`}
                    placeholder="12345"
                    className={`w-full px-4 py-3 bg-white rounded-md text-sm text-black outline-none transition-shadow ${
                    highContrast
                        ? "focus:ring-4 focus:ring-[#fac16d]"
                        : "focus:ring-4 focus:ring-[#e65100]"
                    }`}
                    required
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                  {errorMsg && (
                    <p
                      id="codigo-error"
                      role="alert"
                      className="mt-2 text-sm text-red-500"
                    >
                      {errorMsg}
                    </p>
                  )}
                </div>
                
                <button 
                  type="button" 
                  className={`mb-8 px-6 py-2.5 rounded-md font-medium text-sm outline-none transition-all cursor-pointer ${
                    highContrast
                        ? "bg-transparent text-white border hover:bg-[#f69c0a] hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-[#f69c0a]"
                        : "bg-[#fac16d] text-black border border-transparent hover:bg-[#f69c0a] focus:ring-4 focus:ring-[#e65100]"
                    }`}
                    onClick={() => {setInfoMsg("Um novo código foi enviado para seu email."); setErrorMsg("");}}
                        >
                  Reenviar código de recuperação
                </button>
                
                <div className="flex justify-center gap-6 w-full">
                  <button 
                    type="button" 
                    onClick={() => {setCurrentStep(1); setErrorMsg(""); setInfoMsg("");}} 
                    className={`px-8 py-2.5 rounded-md font-medium text-sm outline-none transition-all cursor-pointer ${
                        highContrast
                            ? "bg-transparent text-white border hover:bg-[#f69c0a] hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-[#f69c0a]"
                            : "bg-[#fac16d] text-black border border-transparent hover:bg-[#f69c0a] focus:ring-4 focus:ring-[#e65100]"
                        }`}
                  >
                    &larr; Voltar
                  </button>
                  <button type="submit" className={`px-8 py-2.5 rounded-md font-medium text-sm outline-none transition-all cursor-pointer ${
                        highContrast
                        ? "bg-transparent text-white border hover:bg-[#f69c0a] hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-[#f69c0a]"
                        : "bg-[#fac16d] text-black border border-transparent hover:bg-[#f69c0a] focus:ring-4 focus:ring-[#e65100]"
                    }`} onClick={() => setInfoMsg("")}>
                    Continuar
                  </button>
                </div>
              </>
            )}

            {/* ETAPA 3: Redefinição de senha */}
            {currentStep === 3 && (
              <>
                <h2 id="senha-intrucao" className="text-center text-[17px] leading-snug font-medium mb-8 max-w-sm">
                  Código aceito! Defina uma nova senha para sua conta.
                </h2>
                
                <div className="w-full mb-5 relative">
                  <label htmlFor="new-password" className="block text-sm mb-2 text-left">
                    Nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="new-password"
                      aria-invalid={!!errorMsg}
                      aria-describedby={`senha-instrucao ${errorMsg ? "password-error" : ""}`}
                      placeholder="********"
                      className={`w-full px-4 py-3 bg-white rounded-md text-sm text-black outline-none transition-shadow ${
                    highContrast
                        ? "focus:ring-4 focus:ring-[#fac16d]"
                        : "focus:ring-4 focus:ring-[#e65100]"
                    }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors cursor-pointer ${
                            highContrast
                            ? "text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                            : "text-gray-600 hover:text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                        }`}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errorMsg && (
                      <p
                        id="password-error"
                        role="alert"
                        className="mt-2 text-sm text-red-500"
                      >
                        {errorMsg}
                      </p>
                    )}
                </div>
                
                <div className="w-full mb-8 relative">
                  <label htmlFor="confirm-password" className="block text-sm mb-2 text-left">
                    Digite novamente a nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirm-password"
                      placeholder="********"
                      className={`w-full px-4 py-3 bg-white rounded-md text-sm text-black outline-none transition-shadow ${
                        highContrast
                            ? "focus:ring-4 focus:ring-[#fac16d]"
                            : "focus:ring-4 focus:ring-[#e65100]"
                    }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors cursor-pointer ${
                            highContrast
                            ? "text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                            : "text-gray-600 hover:text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                        }`}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center gap-6 w-full">
                  <button 
                    type="button" 
                    onClick={() => {setCurrentStep(2); setErrorMsg("");}} 
                    className={`px-8 py-2.5 rounded-md font-medium text-sm outline-none transition-all cursor-pointer ${
                        highContrast
                        ? "bg-transparent text-white border hover:bg-[#f69c0a] hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-[#f69c0a]"
                        : "bg-[#fac16d] text-black border border-transparent hover:bg-[#f69c0a] focus:ring-4 focus:ring-[#e65100]"
                    }`}>
                    &larr; Voltar
                  </button>
                  <button type="submit" className={`px-8 py-2.5 rounded-md font-medium text-sm outline-none transition-all cursor-pointer ${
                        highContrast
                        ? "bg-transparent text-white border hover:bg-[#f69c0a] hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-[#f69c0a]"
                        : "bg-[#fac16d] text-black border border-transparent hover:bg-[#f69c0a] focus:ring-4 focus:ring-[#e65100]"
                    }`}>
                    Confirmar
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </main>

      <Footer highContrast={highContrast} />
    </div>
  );
}