"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Eye, EyeOff } from "lucide-react";

function ErrorMsg({ mensagem }: { mensagem?: string }) {
    if (!mensagem) return null;
    return (
        <span role="alert" className="text-red-400 text-sm -mt-1">
        {mensagem}
        </span>
    );
}

export default function Cadastro() {
    const [highContrast, setHighContrast] = useState(false);
    const [etapa, setEtapa] = useState(1);
    const isFirstRender = useRef(true);

    // ── Etapa 1 ──────────────────────────────────────────────────────────────
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [genero, setGenero] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // ── Etapa 2 ──────────────────────────────────────────────────────────────
    const [cep, setCep] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [aceiteTermos, setAceiteTermos] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    // ── Formatadores ──────────────────────────────────────────────────────────
    const formatarCPF = (valor: string) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return valor.slice(0, 14);
    };

    const formatarRG = (valor: string) => {
        let limpo = valor.replace(/[\.-]/g, "");
        limpo = limpo.replace(/[^0-9a-zA-Z]/g, "");
        
        if (/[a-zA-Z]/.test(limpo.slice(0, -1))) {
            limpo = limpo.replace(/[a-zA-Z]/g, "");
        }
        
        let v = limpo.toUpperCase();
        v = v.replace(/(\d{2})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})([0-9A-Z])/, "$1-$2");
        return v.slice(0, 12);
    };

    const formatarCelular = (valor: string) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        return valor.slice(0, 15);
    };

    const formatarCEP = (valor: string) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        return valor.slice(0, 9);
    };

    // ── Alto contraste ────────────────────────────────────────────────────────
    const toggleContrast = () => setHighContrast((prev) => !prev);

    // ── Navegação rápida (barra de acessibilidade) ────────────────────────────
    const irParaConteudo = () => {
        const el = document.getElementById("main-content");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            el.focus();
        }
    };

    const irParaMenu = () => {
        const el = document.getElementById("nome");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus();
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const id = etapa === 1 ? "nome" : "cep";
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus();
        }
    }, [etapa]);

    // ── Lógica Dinâmica de Dias do Mês ─────────────────────────────────────────
    const anoParaCalculo = ano ? parseInt(ano, 10) : 2024;
    const diasNoMes = mes ? new Date(anoParaCalculo, parseInt(mes, 10), 0).getDate() : 31;

    useEffect(() => {
        if (dia && parseInt(dia, 10) > diasNoMes) {
            setDia("");
        }
    }, [mes, ano, diasNoMes, dia]);


    // ── Validações ─────────────────────────────────────────────────────────────
    const validarEtapa1 = (): Record<string, string> => {
        const erros: Record<string, string> = {};
        if (!nome.trim()) erros.nome = "Por favor, preencha o seu nome completo.";
        
        if (cpf.length < 14) {
            erros.cpf = "O CPF está incompleto. Preencha os 11 números exigidos.";
        } else {
            const c = cpf.replace(/\D/g, "");
            if (/^(\d)\1{10}$/.test(c)) {
                erros.cpf = "CPF inválido. Não utilize sequências de números repetidos.";
            } else {
                let s = 0;
                for (let i = 0; i < 9; i++) s += parseInt(c[i]) * (10 - i);
                let r = (s * 10) % 11;
                if (r === 10 || r === 11) r = 0;
                if (r !== parseInt(c[9])) {
                    erros.cpf = "O CPF informado é inválido. Verifique os números digitados.";
                } else {
                    s = 0;
                    for (let i = 0; i < 10; i++) s += parseInt(c[i]) * (11 - i);
                    r = (s * 10) % 11;
                    if (r === 10 || r === 11) r = 0;
                    if (r !== parseInt(c[10])) erros.cpf = "O CPF informado é inválido. Verifique os números digitados.";
                }
            }
        }

        if (rg.length < 12) erros.rg = "O RG está incompleto. Verifique se você digitou todos os caracteres.";
        if (!dia) erros.dia = "Por favor, selecione o dia do seu nascimento.";
        if (!mes) erros.mes = "Por favor, selecione o mês do seu nascimento.";
        if (!ano) erros.ano = "Por favor, selecione o ano do seu nascimento.";

        if (dia && mes && ano) {
            const d = parseInt(dia, 10);
            const m = parseInt(mes, 10) - 1;
            const a = parseInt(ano, 10);
            const dataTeste = new Date(a, m, d);
            if (dataTeste.getFullYear() !== a || dataTeste.getMonth() !== m || dataTeste.getDate() !== d) {
                erros.dia = "A data selecionada é inválida. Este dia não existe no mês/ano que você escolheu.";
            }
        }

        if (!genero) erros.genero = "Por favor, selecione uma opção de gênero válida.";
        if (celular.length < 15) erros.celular = "O número de celular está incompleto. O formato correto é (XX) XXXXX-XXXX.";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            erros.email = "E-mail com formato inválido. Utilize um padrão válido, como 'exemplo@email.com'.";
        if (senha.length < 6) erros.senha = "A senha é muito curta. Ela deve conter no mínimo 6 caracteres para ser segura.";
        if (senha !== confirmarSenha) erros.confirmarSenha = "A confirmação falhou. As senhas digitadas não são iguais.";
        return erros;
    };

    const validarEtapa2 = (): Record<string, string> => {
        const erros: Record<string, string> = {};
        if (cep.length < 9) erros.cep = "O CEP está incompleto. Ele deve conter exatamente 8 números.";
        if (!bairro.trim()) erros.bairro = "Por favor, informe o nome do seu bairro.";
        if (!rua.trim()) erros.rua = "Por favor, informe o nome da sua rua ou avenida.";
        if (!numero.trim()) erros.numero = "Por favor, informe o número da sua residência.";
        if (!aceiteTermos) erros.aceiteTermos = "É obrigatório ler e concordar com o Termo de Adesão e Responsabilidade para continuar.";
        return erros;
    };

    // ── Validação em tempo real (OnBlur) ────────────────────────────────────────
    const handleBlur = (campo: string) => {
        const erros = etapa === 1 ? validarEtapa1() : validarEtapa2();
        setErrors((prev) => ({ ...prev, [campo]: erros[campo] || "" }));
    };

    const focarPrimeiroCampoComErro = (erros: Record<string, string>) => {
        const ordem = [
            "nome", "cpf", "rg", "dia", "mes", "ano",
            "genero", "celular", "email", "senha", "confirmarSenha",
            "cep", "bairro", "rua", "numero",
        ];
        for (const campo of ordem) {
            if (erros[campo]) {
                const el =
                    (document.getElementById(campo) as HTMLElement) ||
                    (document.querySelector(`[name="${campo}"]`) as HTMLElement);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    el.focus();
                    break;
                }
            }
        }
    };

    const handleProximoPasso = () => {
        const erros = validarEtapa1();
        if (Object.keys(erros).length > 0) {
            setErrors(erros);
            focarPrimeiroCampoComErro(erros);
            return;
        }
        setErrors({});
        setEtapa(2);
    };

    const handleVoltar = () => {
        setErrors({});
        setEtapa(1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const erros = validarEtapa2();
        if (Object.keys(erros).length > 0) {
            setErrors(erros);
            focarPrimeiroCampoComErro(erros);
            return;
        }

        const formData = {
            nome,
            cpf,
            rg,
            dataNascimento: { dia, mes, ano },
            genero,
            celular,
            email,
            senha,
            endereco: { cep, bairro, rua, numero, complemento },
            aceiteTermos,
        };

        window.location.href = "/";
        console.log("Dados do formulário:", formData);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const elementoAtivo = document.activeElement;
            const estaDigitando =
                elementoAtivo instanceof HTMLInputElement ||
                elementoAtivo instanceof HTMLTextAreaElement ||
                elementoAtivo instanceof HTMLSelectElement;

            if (estaDigitando) return;

            if (event.key === "1") irParaConteudo();
            if (event.key === "2") irParaMenu();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const inputBase = (campo: string, extra = "") =>
        [
            "h-14 px-4 rounded-2xl outline-none focus:border-[#f69c0a] focus:border-4",
            errors[campo]
                ? "border-2 border-red-400"
                : highContrast
                ? "border border-white"
                : "",
            highContrast ? "bg-black text-white" : "bg-white text-black",
            extra,
        ].join(" ");

    return (
        <>
        <nav
            className={`w-full px-12 py-2.5 flex justify-start items-center gap-6
            ${highContrast ? "bg-[#212121]" : "bg-[#e2e3e6]"}`}
        >
            <button
                onClick={irParaConteudo}
                className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors
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
                className={`flex justify-start items-center gap-2.5 px-2 py-1 rounded-md transition-colors
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
                    ${highContrast ? "bg-white" : "bg-[#fac16d]"}`}
                >
                    <img
                        src={highContrast ? "/altocontraste2.png" : "/altocontraste1.png"}
                        alt=""
                        className="w-5 h-5 object-contain"
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
            className={`w-full flex justify-center py-10 px-4
            ${highContrast ? "bg-[#212121]" : "bg-white"}`}
        >
            <section
                aria-labelledby="titulo-cadastro"
                className={`w-full max-w-[650px] p-12 rounded-[10px] flex flex-col gap-6
                ${highContrast ? "bg-black border border-white" : "bg-[#100b4f]"}`}
            >
                <form onSubmit={handleSubmit}>
                    {etapa === 1 ? (
                    <section className="flex flex-col gap-5">
                        <header className="flex flex-col items-center gap-2">
                            <h1 id="titulo-cadastro" className="text-white text-3xl font-medium">
                                Criar sua conta
                            </h1>
                            <p className="text-white text-base">Dados pessoais</p>
                            <div aria-hidden="true" className="flex items-center gap-2">
                                <div className="w-5 h-2 bg-[#fac16d] rounded-full" />
                                <div className="w-3 h-2 bg-zinc-300 rounded-full" />
                            </div>
                        </header>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome" className="text-white text-lg font-medium">
                                Nome completo
                            </label>
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => {
                                    setNome(e.target.value);
                                    setErrors((prev) => ({ ...prev, nome: "" }));
                                }}
                                onBlur={() => handleBlur("nome")}
                                placeholder="Nome completo"
                                className={inputBase("nome")}
                            />
                            <ErrorMsg mensagem={errors.nome} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="cpf" className="text-white text-lg font-medium">
                                CPF
                            </label>
                            <input
                                id="cpf"
                                type="text"
                                value={cpf}
                                onChange={(e) => {
                                    setCpf(formatarCPF(e.target.value));
                                    setErrors((prev) => ({ ...prev, cpf: "" }));
                                }}
                                onBlur={() => handleBlur("cpf")}
                                placeholder="000.000.000-00"
                                maxLength={14}
                                className={inputBase("cpf")}
                            />
                            <ErrorMsg mensagem={errors.cpf} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="rg" className="text-white text-lg font-medium">
                                RG
                            </label>
                            <input
                                id="rg"
                                type="text"
                                value={rg}
                                onChange={(e) => {
                                    setRg(formatarRG(e.target.value));
                                    setErrors((prev) => ({ ...prev, rg: "" }));
                                }}
                                onBlur={() => handleBlur("rg")}
                                placeholder="00.000.000-0"
                                maxLength={12}
                                className={inputBase("rg")}
                            />
                            <ErrorMsg mensagem={errors.rg} />
                        </div>

                        <fieldset className="flex flex-col gap-2">
                            <legend className="text-white text-lg font-medium mb-2">
                                Data de nascimento
                            </legend>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1">
                                    <select
                                        id="dia"
                                        name="dia"
                                        value={dia}
                                        onChange={(e) => {
                                            setDia(e.target.value);
                                            setErrors((prev) => ({ ...prev, dia: "" }));
                                        }}
                                        onBlur={() => handleBlur("dia")}
                                        className={inputBase("dia")}
                                    >
                                        <option value="" disabled>Dia</option>
                                        {Array.from({ length: diasNoMes }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <ErrorMsg mensagem={errors.dia} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <select
                                        id="mes"
                                        name="mes"
                                        value={mes}
                                        onChange={(e) => {
                                            setMes(e.target.value);
                                            setErrors((prev) => ({ ...prev, mes: "" }));
                                        }}
                                        onBlur={() => handleBlur("mes")}
                                        className={inputBase("mes")}
                                    >
                                        <option value="" disabled>Mês</option>
                                        <option value="1">Janeiro</option>
                                        <option value="2">Fevereiro</option>
                                        <option value="3">Março</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Maio</option>
                                        <option value="6">Junho</option>
                                        <option value="7">Julho</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Setembro</option>
                                        <option value="10">Outubro</option>
                                        <option value="11">Novembro</option>
                                        <option value="12">Dezembro</option>
                                    </select>
                                    <ErrorMsg mensagem={errors.mes} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <select
                                        id="ano"
                                        name="ano"
                                        value={ano}
                                        onChange={(e) => {
                                            setAno(e.target.value);
                                            setErrors((prev) => ({ ...prev, ano: "" }));
                                        }}
                                        onBlur={() => handleBlur("ano")}
                                        className={inputBase("ano")}
                                    >
                                        <option value="" disabled>Ano</option>
                                        {Array.from(
                                            { length: 100 },
                                            (_, i) => new Date().getFullYear() - i
                                        ).map((a) => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                    <ErrorMsg mensagem={errors.ano} />
                                </div>
                            </div>
                        </fieldset>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="genero" className="text-white text-lg font-medium">
                                Gênero
                            </label>
                            <select
                                id="genero"
                                value={genero}
                                onChange={(e) => {
                                    setGenero(e.target.value);
                                    setErrors((prev) => ({ ...prev, genero: "" }));
                                }}
                                onBlur={() => handleBlur("genero")}
                                className={inputBase("genero")}
                            >
                                <option value="" disabled>Selecione seu gênero</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="nao-binario">Não binário</option>
                                <option value="prefiro-nao-informar">Prefiro não informar</option>
                                <option value="outro">Outro</option>
                            </select>
                            <ErrorMsg mensagem={errors.genero} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="celular" className="text-white text-lg font-medium">
                                Celular
                            </label>
                            <input
                                id="celular"
                                type="tel"
                                value={celular}
                                onChange={(e) => {
                                    setCelular(formatarCelular(e.target.value));
                                    setErrors((prev) => ({ ...prev, celular: "" }));
                                }}
                                onBlur={() => handleBlur("celular")}
                                placeholder="(XX) 00000-0000"
                                maxLength={15}
                                className={inputBase("celular")}
                            />
                            <ErrorMsg mensagem={errors.celular} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-white text-lg font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((prev) => ({ ...prev, email: "" }));
                                }}
                                onBlur={() => handleBlur("email")}
                                placeholder="seu@email.com"
                                className={inputBase("email")}
                            />
                            <ErrorMsg mensagem={errors.email} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="senha" className="text-white text-lg font-medium">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    value={senha}
                                    onChange={(e) => {
                                        setSenha(e.target.value);
                                        setErrors((prev) => ({ ...prev, senha: "" }));
                                    }}
                                    onBlur={() => handleBlur("senha")}
                                    placeholder="Senha"
                                    className={`${inputBase("senha")} pr-12 w-full`}
                                />
                                <button
                                    type="button"
                                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                    aria-pressed={mostrarSenha}
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors ${
                                        highContrast
                                            ? "text-white focus:outline-dashed focus:outline-2 focus:outline-[#f69c0a]"
                                            : "text-gray-600 hover:text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                                    }`}
                                >
                                    {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <ErrorMsg mensagem={errors.senha} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmarSenha" className="text-white text-lg font-medium">
                                Confirme a senha
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmarSenha"
                                    type={mostrarConfirmarSenha ? "text" : "password"}
                                    value={confirmarSenha}
                                    onChange={(e) => {
                                        setConfirmarSenha(e.target.value);
                                        setErrors((prev) => ({ ...prev, confirmarSenha: "" }));
                                    }}
                                    onBlur={() => handleBlur("confirmarSenha")}
                                    placeholder="Confirme sua senha"
                                    className={`${inputBase("confirmarSenha")} pr-12 w-full`}
                                />
                                <button
                                    type="button"
                                    aria-label={mostrarConfirmarSenha ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                                    aria-pressed={mostrarConfirmarSenha}
                                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors ${
                                        highContrast
                                            ? "text-white focus:outline-dashed focus:outline-2 focus:outline-[#f69c0a]"
                                            : "text-gray-600 hover:text-black focus:outline-dashed focus:outline-2 focus:outline-[#100b4f]"
                                    }`}
                                >
                                    {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <ErrorMsg mensagem={errors.confirmarSenha} />
                        </div>

                        <button
                            type="button"
                            onClick={handleProximoPasso}
                            className={`self-center mt-2 px-6 py-3 rounded-[10px]
                            text-lg font-medium transition-colors outline-none
                            ${
                            highContrast
                                ? "bg-white text-black hover:bg-[#f69c0a] focus:bg-[#f69c0a]"
                                : "bg-[#fac16d] text-black hover:bg-[#f69c0a] focus:bg-[#f69c0a]"
                            }`}
                        >
                            Próximo Passo
                        </button>

                        <p className="text-center text-white">
                            Já tem uma conta?{" "}
                            <a
                                href="/login"
                                className="font-semibold underline focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#f69c0a]"
                            >
                                Faça login
                            </a>
                        </p>
                    </section>
                    ) : (
                    <section className="flex flex-col gap-5">
                        <header className="flex flex-col items-center gap-2">
                            <h2 className="text-white text-3xl font-medium">
                                Criar sua conta
                            </h2>
                            <p className="text-white text-base">Informações de endereço</p>
                            <div aria-hidden="true" className="flex items-center gap-2">
                                <div className="w-3 h-2 bg-zinc-300 rounded-full" />
                                <div className="w-5 h-2 bg-[#fac16d] rounded-full" />
                            </div>
                        </header>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="cep" className="text-white text-lg font-medium">
                                CEP
                            </label>
                            <input
                                id="cep"
                                type="text"
                                value={cep}
                                onChange={(e) => {
                                    setCep(formatarCEP(e.target.value));
                                    setErrors((prev) => ({ ...prev, cep: "" }));
                                }}
                                onBlur={() => handleBlur("cep")}
                                placeholder="00000-000"
                                maxLength={9}
                                className={`${inputBase("cep")} w-44`}
                            />
                            <ErrorMsg mensagem={errors.cep} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="bairro" className="text-white text-lg font-medium">
                                Bairro
                            </label>
                            <input
                                id="bairro"
                                type="text"
                                value={bairro}
                                onChange={(e) => {
                                    setBairro(e.target.value);
                                    setErrors((prev) => ({ ...prev, bairro: "" }));
                                }}
                                onBlur={() => handleBlur("bairro")}
                                placeholder="Vila/Bairro"
                                className={inputBase("bairro")}
                            />
                            <ErrorMsg mensagem={errors.bairro} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="rua" className="text-white text-lg font-medium">
                                Rua
                            </label>
                            <input
                                id="rua"
                                type="text"
                                value={rua}
                                onChange={(e) => {
                                    setRua(e.target.value);
                                    setErrors((prev) => ({ ...prev, rua: "" }));
                                }}
                                onBlur={() => handleBlur("rua")}
                                placeholder="Rua/Avenida"
                                className={inputBase("rua")}
                            />
                            <ErrorMsg mensagem={errors.rua} />
                        </div>

                        <div className="grid grid-cols-[120px_1fr] gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="numero" className="text-white text-lg font-medium">
                                    Número
                                </label>
                                <input
                                    id="numero"
                                    type="number"
                                    value={numero}
                                    onChange={(e) => {
                                        setNumero(e.target.value);
                                        setErrors((prev) => ({ ...prev, numero: "" }));
                                    }}
                                    onBlur={() => handleBlur("numero")}
                                    placeholder="Número"
                                    className={inputBase("numero")}
                                />
                                <ErrorMsg mensagem={errors.numero} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="complemento" className="text-white text-lg font-medium">
                                    Complemento
                                    <span className="font-light ml-1">(Opcional)</span>
                                </label>
                                <input
                                    id="complemento"
                                    type="text"
                                    value={complemento}
                                    onChange={(e) => setComplemento(e.target.value)}
                                    onBlur={() => handleBlur("complemento")}
                                    placeholder="Bloco, apartamento"
                                    className={inputBase("complemento")}
                                />
                            </div>
                        </div>

                        <fieldset className="flex flex-col gap-3">
                            <legend className="text-white text-lg font-medium">
                                Termo de Adesão e Responsabilidade
                            </legend>
                            <p className="text-white text-sm leading-relaxed">
                                Reconheço que o cartão de estudante é de uso exclusivo do titular.
                                <br />
                                Não é possível emprestá-lo, vendê-lo ou transferi-lo para terceiros.
                                <br />
                                Estou ciente de que:
                                <br />
                                Na primeira infração, o benefício será suspenso por 5 dias.
                                <br />
                                Em caso de reincidência, a suspensão será de 30 dias.
                            </p>

                            <label className="flex items-start gap-3 text-white">
                                <input
                                    type="checkbox"
                                    checked={aceiteTermos}
                                    onChange={(e) => {
                                        setAceiteTermos(e.target.checked);
                                        setErrors((prev) => ({ ...prev, aceiteTermos: "" }));
                                    }}
                                    onBlur={() => handleBlur("aceiteTermos")}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            setAceiteTermos((prev) => !prev);
                                        }
                                    }}
                                    className="mt-1 w-5 h-5 focus:outline-none focus:ring-2 focus:ring-[#f69c0a]"
                                />
                                <span>Li e concordo com o Termo de Adesão e Responsabilidade.</span>
                            </label>
                            <ErrorMsg mensagem={errors.aceiteTermos} />
                        </fieldset>

                        <div className="flex justify-center gap-10 mt-4">
                            <button
                                type="button"
                                onClick={handleVoltar}
                                className="px-6 py-3 rounded-[10px] border-2 border-white text-white
                                hover:bg-white hover:text-black
                                focus:bg-[#f69c0a] focus:outline-none focus:border-[#f69c0a] focus:text-black
                                transition-colors"
                            >
                                Voltar
                            </button>

                            <button
                                type="submit"
                                className={`px-6 py-3 rounded-[10px] text-black transition-colors
                                focus:bg-[#f69c0a] focus:outline-none
                                ${highContrast ? "bg-white hover:bg-[#f69c0a]" : "bg-[#fac16d] hover:bg-[#f69c0a]"}`}
                            >
                                Criar a conta
                            </button>
                        </div>

                        <p className="text-center text-white">
                            Já tem uma conta?{" "}
                            <a
                                href="/login"
                                className="font-semibold underline focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#f69c0a]"
                            >
                                Faça login
                            </a>
                        </p>
                    </section>
                    )}
                </form>
            </section>
        </main>

        <Footer highContrast={highContrast} />
        </>
    );
}