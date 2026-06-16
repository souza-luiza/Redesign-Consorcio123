import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  highContrast: boolean;
}

export default function Header({ highContrast }: HeaderProps) {
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
    </header>
  );
}