"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function CadastroForms() {

  const [highContrast, setHighContrast] = useState(false);

  const toggleContrast = () => {
    const novoValor = !highContrast;
    setHighContrast(novoValor); 
    localStorage.setItem('alto-contraste', String(novoValor));
  }
  
  useEffect(() => {
    const storage = localStorage.getItem('alto-contraste') === 'true';
    setHighContrast(storage);
  }, []);

  const irParaMenu = () => {
    const criarConta = document.getElementById("menu");

    if (criarConta) {
      criarConta.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      (criarConta as HTMLElement).focus();
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
      if (event.key === "1") {
        irParaConteudo();
      }

      if (event.key === "2") {
        irParaMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
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
        className={`w-full min-h-screen flex flex-col justify-start items-center overflow-x-hidden font-['Space_Grotesk']
        ${highContrast ? "bg-[#212121]" : "bg-white"}`}
      >
        <div className="w-full flex-1 max-w-[1200px] px-8 py-20 flex justify-between items-center gap-12">
          <section aria-labelledby="main-title main-description" className="w-full max-w-md flex flex-col items-start gap-8">
            <h1
              id="main-title"
              className={`text-[40px] leading-tight font-medium
              ${highContrast ? "text-white" : "text-black"}`}
            >
              Sistema de Passe Estudantil
            </h1>

            <p
              id="main-description"
              className={`text-lg font-normal
              ${highContrast ? "text-white" : "text-black"}`}
            >
              Acesse sua conta ou realize seu cadastro para solicitar o passe
              estudantil.
            </p>

            <nav className="flex justify-start items-center gap-6">
              <button
                id="menu"
                onClick={() => (window.location.href = "cadastro")}
                className={`px-6 py-3 rounded-lg text-xl font-medium transition-colors cursor-pointer
                ${
                  highContrast
                    ? "border text-white hover:bg-[#f69c0a] hover:text-black focus:outline-none focus:bg-[#f69c0a] focus:border-[#f69c0a] focus:text-black"
                    : "bg-[#fac16d] text-black hover:bg-[#100b4f] hover:text-white focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white"
                }`}
              >
                Criar conta
              </button>

              <button
                  onClick={() => (window.location.href = "login")}
                  className={`px-6 py-3 rounded-lg text-xl font-medium transition-colors cursor-pointer
                  ${
                    highContrast
                      ? "border text-white hover:bg-[#f69c0a] hover:text-black focus:outline-none focus:bg-[#f69c0a] focus:border-[#f69c0a] focus:text-black"
                      : "bg-[#fac16d] text-black hover:bg-[#100b4f] hover:text-white focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white"
                }`}
              >
                Acessar conta
              </button>
            </nav>
          </section>

          <figure className="flex-1 flex justify-center items-center">
            <Image
              src={
                highContrast
                  ? "/estudante-home-contraste.png"
                  : "/estudante-home.png"
              }
              alt="Ilustração de um estudante sentado em uma pilha de livros mexendo no notebook"
              width={350}
              height={200}
              className="object-contain"
            />
          </figure>
        </div>

        <section className="w-full max-w-[1200px] px-8 pb-24 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              img: "/card-home.png",
              imgContrast: "/card-home-contraste.svg",
              title: "1. Faça o seu cadastro",
              text: "Crie sua conta com seus dados pessoais.",
            },
            {
              img: "/documento-home.png",
              imgContrast: "/documento-home-contraste.svg",
              title: "2. Envie os documentos",
              text: "Coloque seus dados escolares e anexe a declaração escolar.",
            },
            {
              img: "/relogio-home.png",
              imgContrast: "/relogio-home-contraste.svg",
              title: "3. Aguarde a análise",
              text: "Acompanhe o status do seu pedido diretamente pelo sistema.",
            },
            {
              img: "/onibus-home.png",
              imgContrast: "/onibus-home-contraste.svg",
              title: "4. Receba seu passe",
              text: "Após a aprovação, retire e utilize seu benefício.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className={`p-6 rounded-[10px] flex flex-col justify-start items-center text-center gap-4 cursor-pointer
              ${
                highContrast
                  ? "bg-black border border-white"
                  : "bg-[#fac16d]"
              }`}
            >
              <figure className="w-16 h-16 flex justify-center items-center">
                <Image
                  src={highContrast ? card.imgContrast : card.img}
                  alt={card.title}
                  width={64}
                  height={64}
                  objectFit="contain"
                />
              </figure>

              <h3
                className={`text-lg font-bold
                ${highContrast ? "text-white" : "text-black"}`}
              >
                {card.title}
              </h3>

              <p
                className={`text-sm
                ${highContrast ? "text-white" : "text-black"}`}
              >
                {card.text}
              </p>
            </article>
          ))}
        </section>
      </main>

      <Footer highContrast={highContrast} />
    </>
  );
}