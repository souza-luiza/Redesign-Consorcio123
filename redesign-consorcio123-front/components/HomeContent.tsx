'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export default function HomeContent() {
  const { highContrast } = useTheme();

  return (
    <>
      {/* Seção Hero */}
      <main className={`w-full flex-1 max-w-[1200px] px-8 py-20 flex justify-between items-center gap-12 transition-colors duration-300 ${
        highContrast ? 'text-white' : 'text-black'
      }`}>
        <section className="w-full max-w-md flex flex-col items-start gap-8">
          <h1 className="text-[40px] leading-tight font-medium">Sistema de Passe Estudantil</h1>
          <p className="text-lg font-normal">
            Acesse sua conta ou realize seu cadastro para solicitar o passe estudantil.
          </p>
          <nav className="flex justify-start items-center gap-6">
            <Link href="/cadastro1" className={`px-6 py-3 rounded-lg text-xl font-medium transition-colors duration-300 focus:outline-dashed focus:outline-2 focus:outline-offset-2 ${
              highContrast 
                ? 'bg-white text-black hover:bg-[#fac16d] focus:outline-white' 
                : 'bg-[#fac16d] text-black hover:bg-[#100b4f] hover:text-white focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white'
            }`}>
              Criar conta
            </Link>
            <Link href="/login" className={`px-6 py-3 rounded-lg text-xl font-medium transition-colors duration-300 focus:outline-dashed focus:outline-2 focus:outline-offset-2 ${
              highContrast 
                ? 'bg-white text-black hover:bg-[#fac16d] focus:outline-white' 
                : 'bg-[#fac16d] text-black hover:bg-[#100b4f] hover:text-white focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white'
            }`}>
              Acessar conta
            </Link>
          </nav>
        </section>

        {/* Ilustração */}
        <figure className="flex-1 flex justify-center items-center">
          <Image
            src="/estudante-home.png" 
            alt="Ilustração de um estudante sentado em uma pilha de livros mexendo no notebook" 
            className="w-full max-w-[500px] h-auto object-contain"
            width={500}
            height={300}
          />
        </figure>
      </main>

      {/* Cards de Passos */}
      <section className="w-full max-w-[1200px] px-8 pb-24 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Card 1 */}
        <article className={`p-6 rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm transition-colors duration-300 ${
          highContrast 
            ? 'bg-black border-2 border-white text-white' 
            : 'bg-[#fac16d] text-black'
        }`}>
          <Image src="/card-home.png" alt="Ícone de um cartão de identificação" width={64} height={64} />
          <h3 className="text-lg font-bold">1. Faça o seu cadastro</h3>
          <p className="text-sm">Crie sua conta com CPF e dados escolares.</p>
        </article>

        {/* Card 2 */}
        <article className={`p-6 rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm transition-colors duration-300 ${
          highContrast 
            ? 'bg-black border-2 border-white text-white' 
            : 'bg-[#fac16d] text-black'
        }`}>
          <Image src="/documento-home.png" alt="Ícone de documentos" width={64} height={64}/>
          <h3 className="text-lg font-bold">2. Envie os documentos</h3>
          <p className="text-sm">Anexe RG, comprovante e declaração escolar.</p>
        </article>

        {/* Card 3 */}
        <article className={`p-6 rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm transition-colors duration-300 ${
          highContrast 
            ? 'bg-black border-2 border-white text-white' 
            : 'bg-[#fac16d] text-black'
        }`}>
          <Image src="/relogio-home.png" alt="Ícone de um relógio" width={64} height={64} />
          <h3 className="text-lg font-bold">3. Aguarde a análise</h3>
          <p className="text-sm">Acompanhe o status do seu pedido diretamente pelo sistema.</p>
        </article>

        {/* Card 4 */}
        <article className={`p-6 rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm transition-colors duration-300 ${
          highContrast 
            ? 'bg-black border-2 border-white text-white' 
            : 'bg-[#fac16d] text-black'
        }`}>
          <Image src="/onibus-home.png" alt="Ícone de um passe estudantil" width={64} height={64} />
          <h3 className="text-lg font-bold">4. Receba seu passe</h3>
          <p className="text-sm">Após a aprovação, retire e utilize seu benefício.</p>
        </article>
      </section>
    </>
  );
}
