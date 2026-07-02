"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Login() {
  const [highContrast, setHighContrast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para os inputs e validação
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const router = useRouter();

  const toggleContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(""); // Limpa o erro antes de validar novamente

    // Validação de campos vazios
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }

    // Validação simples de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Por favor, insira um e-mail válido.");
      return;
    }

    // Validação simples de tamanho de senha (exemplo: mínimo 6 caracteres)
    if (password.length < 6) {
      setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Se passar por todas as validações, redireciona
    router.push("/perfil");
  };

  const irParaMenu = () => {
    const menus = document.getElementById("email");

    if (menus) {
      menus.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      menus.textContent = ""; // Limpa o conteúdo do menu para evitar confusão
      (menus as HTMLElement).focus();
      
    }
  };

  const irParaConteudo = () => {
    const conteudo = document.getElementById("main-content");

    if (conteudo) {
      conteudo.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

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

        if (event.key === "1") {
          irParaConteudo();
        }

        if (event.key === "2") {
          irParaMenu();
        }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? "bg-[#212121]" : "bg-white"}`}>
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
        className="flex-grow flex items-center justify-center py-12 px-4 outline-none"
      >
        <section
          aria-labelledby="main-titulo"
          className={`w-full max-w-[440px] p-10 rounded-xl flex flex-col gap-8 shadow-sm ${
            highContrast ? "bg-[#0a0a0a]" : "bg-[#100b4f]"
          }`}
        >
          <h1 id="main-titulo" className="text-white text-center text-xl font-medium">
            Acessar sua conta
          </h1>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Mensagem de Erro */}
            {errorMsg && (
              <div
                className={`p-3 rounded-md text-sm font-medium text-center ${
                  highContrast ? "bg-[#e65100] text-white" : "bg-[#e65100] text-white"
                }`}
                role="alert"
              >
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white text-sm font-medium">
                E-mail
              </label>
              <input
                type="email"
                id="email"
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
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className={`w-full px-4 py-3 pr-12 bg-white rounded-md text-sm text-black outline-none transition-shadow ${
                    highContrast
                      ? "focus:ring-4 focus:ring-[#fac16d]"
                      : "focus:ring-4 focus:ring-[#e65100]"
                  }`}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors cursor-pointer ${
                    highContrast
                      ? "text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                      : "text-gray-600 hover:text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                  }`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`mt-2 mx-auto px-8 py-2.5 rounded-md font-medium text-sm outline-none transition-all cursor-pointer ${
                highContrast
                  ? "bg-transparent text-white border hover:bg-[#f69c0a] hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-[#f69c0a]"
                  : "bg-[#fac16d] text-black border border-transparent hover:bg-[#f69c0a] focus:ring-4 focus:ring-[#e65100]"
              }`}
            >
              Entrar na conta
            </button>
          </form>

          <div className="flex flex-col items-center gap-6 mt-2">
            <a
              href="/recuperar-senha"
              className={`group inline-block outline-none rounded cursor-pointer ${
                highContrast
                  ? "focus:outline-dashed focus:outline-2 focus:outline-[#fac16d] focus:outline-offset-2"
                  : "focus:outline-dashed focus:outline-2 focus:outline-white focus:outline-offset-2"
              }`}
            >
              <span className="inline-block text-white font-bold text-xs transition-transform transform group-hover:scale-110">
                Esqueceu a senha?
              </span>
            </a>

            <p className="text-white text-xs">
              Não tem uma conta?{" "}
              <a
                href="/cadastro"
                className={`group inline-block outline-none rounded cursor-pointer px-1 ${
                  highContrast
                    ? "focus:outline-dashed focus:outline-2 focus:outline-[#fac16d] focus:outline-offset-2"
                    : "focus:outline-dashed focus:outline-2 focus:outline-white focus:outline-offset-2"
                }`}
              >
                <span className="inline-block font-bold transition-transform transform group-hover:scale-110 px-1">
                  Cadastre-se
                </span>
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer highContrast={highContrast} />
    </div>
  );
}