export default function BarraAcessibilidade() {
    return (
       <nav className="w-full px-12 py-2.5 bg-[#e2e3e6] flex justify-start items-center gap-6">
        <button className="flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors text-black hover:bg-[#100b4f] hover:text-white active:bg-[#100b4f] focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white">
          <strong className="w-6 h-6 bg-[#fac16d] rounded flex items-center justify-center text-black text-sm font-bold">1</strong>
          <span className="text-sm font-medium">Ir para o conteúdo</span>
        </button>
        <button className="flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors text-black hover:bg-[#100b4f] hover:text-white active:bg-[#100b4f] focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white">
          <strong className="w-6 h-6 bg-[#fac16d] rounded flex items-center justify-center text-black text-sm font-bold">2</strong>
          <span className="text-sm font-medium">Ir para o menu</span>
        </button>
        <button className="flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors text-black hover:bg-[#100b4f] hover:text-white active:bg-[#100b4f]  focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#100b4f] focus:bg-[#100b4f] focus:text-white">
          <strong className="w-6 h-6 bg-[#fac16d] rounded flex items-center justify-center text-black text-sm font-bold">3</strong>
          <span className="text-sm font-medium">Ativar Alto Contraste</span>
        </button>
      </nav>
  );
}