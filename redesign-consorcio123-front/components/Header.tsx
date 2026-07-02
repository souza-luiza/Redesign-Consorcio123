import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  highContrast: boolean;
  showAccountActions?: boolean;
  onSair?: () => void;
}

export default function Header({
  highContrast,
  showAccountActions = false,
  onSair,
}: HeaderProps) {
  const handleSair = () => {
    if (onSair) {
      onSair();
      return;
    }
    // Comportamento padrão: limpa a sessão e redireciona para o login
    window.location.href = "/login";
  };

  return (
    <header
      className={`w-full h-24 px-12 py-4 flex justify-between items-center
      ${highContrast ? "bg-black" : "bg-[#100b4f]"}`}
    >
      <Link
        href="/"
        className={`flex items-center gap-4 rounded-md
        ${highContrast ? "focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#fac16d]" : "focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#fac16d]"}`}
      >
        <Image
          src={
            highContrast
              ? "/bus-front-contraste.svg"
              : "/bus-front.png"
          }
          alt="Logo do Consórcio 123 em formato de ônibus"
          width={48}
          height={48}
        />

        <span
          className={`text-2xl font-bold
          ${highContrast ? "text-white" : "text-[#fac16d]"}`}
        >
          Consórcio 123
        </span>
      </Link>

      {showAccountActions && (
        <nav aria-label="Ações da conta" className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSair}
            className={`h-12 px-5 py-2.5 rounded-[10px] flex justify-center items-center text-lg font-medium transition-colors outline-none cursor-pointer
            ${
              highContrast
                ? "border-2 border-white text-white hover:bg-[#f69c0a] hover:border-none hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-none"
                : "bg-[#fac16d] text-black hover:bg-[#f69c0a] focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-white"
            }`}
          >
            Sair da conta
          </button>
        </nav>
      )}
    </header>
  );
}