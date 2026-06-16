import Image from 'next/image';
import Link from 'next/link';   

export default function Header() {
    return (
       <header className="w-full h-24 px-12 py-4 bg-[#100b4f] flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 rounded-md focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#fac16d]">
          <Image src="/bus-front.png" alt="Logo do Consórcio 123 em formado de onibus" width={48} height={48} />
          <span className="text-[#fac16d] text-2xl font-bold">Consórcio 123</span>
        </Link>
      </header>
  );
}