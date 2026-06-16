
interface FooterProps {
  highContrast: boolean;
}

export default function Footer({ highContrast }: FooterProps) {
  return (
    <footer
      className={`w-full px-12 py-6 flex justify-end items-center mt-auto
      ${highContrast ? "bg-black" : "bg-[#e2e3e6]"}`}
    >
      <p
        className={`text-sm font-medium
        ${highContrast ? "text-white" : "text-[#100b4f]"}`}
      >
        Consórcio 123 - Telefone: 0800 772 7730 / (012) 3923-5780
      </p>
    </footer>
  );
}