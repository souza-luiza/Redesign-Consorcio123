import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col justify-start items-center overflow-x-hidden font-['Space_Grotesk']">
      {/* Seção Hero */}
      <section className="w-full flex-1 max-w-[1200px] px-8 py-20 flex justify-between items-center gap-12">
        <article className="w-full max-w-md flex flex-col items-start gap-8">
          <h1 className="text-black text-[40px] leading-tight font-medium">Sistema de Passe Estudantil</h1>
          <p className="text-black text-lg font-normal">
            Acesse sua conta ou realize seu cadastro para solicitar o passe estudantil.
          </p>
          <nav className="flex justify-start items-center gap-6">
            <button className="px-6 py-3 bg-[#fac16d] rounded-lg text-black text-xl font-medium hover:bg-[#100b4f] hover:text-white focus:bg-[#100b4f] focus:text-white transition-colors focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f]">
              Criar conta
            </button>
            <button className="px-6 py-3 bg-[#fac16d] rounded-lg text-black text-xl font-medium hover:bg-[#100b4f] hover:text-white focus:bg-[#100b4f] focus:text-white transition-colors focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f]">
              Acessar conta
            </button>
          </nav>
        </article>

        {/* Ilustração (Substituindo as divs abstratas por um placeholder semântico) */}
        <figure className="flex-1 flex justify-center items-center">
          <Image
            src="/estudante-home.png" 
            alt="Ilustração de um estudante sentado em uma pilha de livros mexendo no notebook" 
            className="w-full max-w-[500px] h-auto object-contain"
            width={500}
            height={300}
          />
        </figure>
      </section>

      {/* Cards de Passos */}
      <section className="w-full max-w-[1200px] px-8 pb-24 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Card 1 */}
        <article className="p-6 bg-[#fac16d] rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm">
          <Image src="/card-home.png" alt="Ícone de um cartão de identificação" width={64} height={64} />
          <h3 className="text-black text-lg font-bold">1. Faça o seu cadastro</h3>
          <p className="text-black text-sm">Crie sua conta com CPF e dados escolares.</p>
        </article>

        {/* Card 2 */}
        <article className="p-6 bg-[#fac16d] rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm">
          <Image src="/documento-home.png" alt="Ícone de documentos" width={64} height={64}/>
          <h3 className="text-black text-lg font-bold">2. Envie os documentos</h3>
          <p className="text-black text-sm">Anexe RG, comprovante e declaração escolar.</p>
        </article>

        {/* Card 3 */}
        <article className="p-6 bg-[#fac16d] rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm">
          <Image src="/relogio-home.png" alt="Ícone de um relógio" width={64} height={64} />
          <h3 className="text-black text-lg font-bold">3. Aguarde a análise</h3>
          <p className="text-black text-sm">Acompanhe o status do seu pedido diretamente pelo sistema.</p>
        </article>

        {/* Card 4 */}
        <article className="p-6 bg-[#fac16d] rounded-[10px] flex flex-col justify-start items-center text-center gap-4 shadow-sm">
          <Image src="/onibus-home.png" alt="Ícone de um passe estudantil" width={64} height={64} />
          <h3 className="text-black text-lg font-bold">4. Receba seu passe</h3>
          <p className="text-black text-sm">Após a aprovação, retire e utilize seu benefício.</p>
        </article>
      </section>
    </main>
  );
}
