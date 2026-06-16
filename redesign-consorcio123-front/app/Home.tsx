"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function HomeClient() {
  const [highContrast, setHighContrast] = useState(false);

  const toggleContrast = () => {
    setHighContrast((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "3") {
        toggleContrast();
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
        ${highContrast ? "bg-[#1e1e1e]" : "bg-[#e2e3e6]"}`}
      >
        <button
          className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors
          ${
            highContrast
              ? "text-white hover:bg-white hover:text-black"
              : "text-black hover:bg-[#100b4f] hover:text-white"
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
          className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors
          ${
            highContrast
              ? "text-white hover:bg-white hover:text-black"
              : "text-black hover:bg-[#100b4f] hover:text-white"
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
          className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors
          ${
            highContrast
              ? "text-white hover:bg-white hover:text-black"
              : "text-black hover:bg-[#100b4f] hover:text-white"
          }`}
        >
          <strong
            className={`w-6 h-6 rounded flex items-center justify-center text-sm font-bold
            ${highContrast ? "bg-white text-black" : "bg-[#fac16d] text-black"}`}
          >
            3
          </strong>
          <span className="text-sm font-medium">
            {highContrast ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}
          </span>
        </button>
      </nav>

      <Header highContrast={highContrast} />

      <main
        className={`w-full min-h-screen flex flex-col justify-start items-center overflow-x-hidden font-['Space_Grotesk']
        ${highContrast ? "bg-[#1e1e1e]" : "bg-white"}`}
      >
        <section className="w-full flex-1 max-w-[1200px] px-8 py-20 flex justify-between items-center gap-12">
          <article className="w-full max-w-md flex flex-col items-start gap-8">
            <h1
              className={`text-[40px] leading-tight font-medium
              ${highContrast ? "text-white" : "text-black"}`}
            >
              Sistema de Passe Estudantil
            </h1>

            <p
              className={`text-lg font-normal
              ${highContrast ? "text-white" : "text-black"}`}
            >
              Acesse sua conta ou realize seu cadastro para solicitar o passe
              estudantil.
            </p>

            <nav className="flex justify-start items-center gap-6">
              <button
                className={`px-6 py-3 rounded-lg text-xl font-medium transition-colors
                ${
                  highContrast
                    ? "border border-white text-white hover:bg-white hover:text-black"
                    : "bg-[#fac16d] text-black hover:bg-[#100b4f] hover:text-white"
                }`}
              >
                Criar conta
              </button>

              <button
                className={`px-6 py-3 rounded-lg text-xl font-medium transition-colors
                ${
                  highContrast
                    ? "border border-white text-white hover:bg-white hover:text-black"
                    : "bg-[#fac16d] text-black hover:bg-[#100b4f] hover:text-white"
                }`}
              >
                Acessar conta
              </button>
            </nav>
          </article>

          <figure className="flex-1 flex justify-center items-center">
            <Image
              src={
                highContrast
                  ? "/estudante-home-contraste.png"
                  : "/estudante-home.png"
              }
              alt="Ilustração de um estudante sentado em uma pilha de livros mexendo no notebook"
              width={500}
              height={300}
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </figure>
        </section>

        <section className="w-full max-w-[1200px] px-8 pb-24 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              img: "/card-home.png",
              imgContrast: "/card-home-contraste.png",
              title: "1. Faça o seu cadastro",
              text: "Crie sua conta com CPF e dados escolares.",
            },
            {
              img: "/documento-home.png",
              imgContrast: "/documento-home-contraste.png",
              title: "2. Envie os documentos",
              text: "Anexe RG, comprovante e declaração escolar.",
            },
            {
              img: "/relogio-home.png",
              imgContrast: "/relogio-home-contraste.png",
              title: "3. Aguarde a análise",
              text: "Acompanhe o status do seu pedido diretamente pelo sistema.",
            },
            {
              img: "/onibus-home.png",
              imgContrast: "/onibus-home-contraste.png",
              title: "4. Receba seu passe",
              text: "Após a aprovação, retire e utilize seu benefício.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className={`p-6 rounded-[10px] flex flex-col justify-start items-center text-center gap-4
              ${
                highContrast
                  ? "bg-black border border-white"
                  : "bg-[#fac16d]"
              }`}
            >
              <Image
                src={highContrast ? card.imgContrast : card.img}
                alt={card.title}
                width={64}
                height={64}
              />

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