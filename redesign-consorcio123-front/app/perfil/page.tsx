"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

// ── Tipagens ──────────────────────────────────────────────────────────────
interface Processo {
    id: string;
    unidadeEnsino: string;
    curso: string;
    turno: string;
    frequenciaSemanal: string;
    status: "Em andamento" | "Concluído" | "Recusado";
}

interface SessionData {
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: { dia: string; mes: string; ano: string };
    genero: string;
    celular: string;
    email: string;
    endereco: {
        cep: string;
        bairro: string;
        rua: string;
        numero: string;
        complemento: string;
    };
    processos: Processo[];
}

// ── JSON de exemplo simulando os dados recuperados da session ───────────────
const SESSION_MOCK: SessionData = {
    nome: "Fulano Ciclano",
    cpf: "123.456.879-10",
    rg: "12.345.678-9",
    dataNascimento: { dia: "1", mes: "1", ano: "2001" },
    genero: "masculino",
    celular: "(11) 99890-6430",
    email: "fulano.ciclano@email.com",
    endereco: {
        cep: "12345-678",
        bairro: "Bairro Beltrano",
        rua: "Rua Imaginária",
        numero: "1",
        complemento: "Bloco C",
    },
    processos: [
        {
            id: "p1",
            unidadeEnsino: "UNIFESP",
            curso: "Ciência da Computação",
            turno: "Integral",
            frequenciaSemanal: "7 vezes",
            status: "Em andamento",
        },
        {
            id: "p2",
            unidadeEnsino: "UNIFESP",
            curso: "Ciência da Computação",
            turno: "Integral",
            frequenciaSemanal: "7 vezes",
            status: "Em andamento",
        },
        {
            id: "p3",
            unidadeEnsino: "FATEC",
            curso: "Análise e Desenvolvimento",
            turno: "Integral",
            frequenciaSemanal: "7 vezes",
            status: "Concluído",
        },
    ],
};

type Aba = "abrir" | "visualizar" | "editar";

function ErrorMsg({ mensagem }: { mensagem?: string }) {
    if (!mensagem) return null;
    return (
        <span role="alert" className="text-red-400 text-sm -mt-1">
            {mensagem}
        </span>
    );
}

export default function Perfil() {
    const [highContrast, setHighContrast] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState<Aba>("abrir");
    const isFirstRender = useRef(true);

    // ── Dados recuperados da "session" ───────────────────────────────────────
    const [session, setSession] = useState<SessionData | null>(null);

    useEffect(() => {
        setSession(SESSION_MOCK);
    }, []);

    // ── Estado do formulário de edição de perfil ─────────────────────────────
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [genero, setGenero] = useState("");
    const [celular, setCelular] = useState("");
    const [cep, setCep] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    // NOVO: Estado para a mensagem de sucesso de alteração
    const [perfilSucesso, setPerfilSucesso] = useState(false);

    // Preenche o formulário quando a session chega
    useEffect(() => {
        if (!session) return;
        setNome(session.nome);
        setCpf(session.cpf);
        setRg(session.rg);
        setDia(session.dataNascimento.dia);
        setMes(session.dataNascimento.mes);
        setAno(session.dataNascimento.ano);
        setGenero(session.genero);
        setCelular(session.celular);
        setCep(session.endereco.cep);
        setBairro(session.endereco.bairro);
        setRua(session.endereco.rua);
        setNumero(session.endereco.numero);
        setComplemento(session.endereco.complemento ?? "");
    }, [session]);

    // ── Estado do formulário de abertura de processo ─────────────────────────
    const [tipoInstituicao, setTipoInstituicao] = useState("");
    const [unidadeEnsino, setUnidadeEnsino] = useState("");
    const [turno, setTurno] = useState("");
    const [curso, setCurso] = useState("");
    const [frequenciaSemanal, setFrequenciaSemanal] = useState("");
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [confirmaDistancia, setConfirmaDistancia] = useState(false);
    const [processoErrors, setProcessoErrors] = useState<Record<string, string>>({});
    const [processoSucesso, setProcessoSucesso] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Formatadores ──────────────────────────────────────────────────────────
    const formatarCPF = (valor: string) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return valor.slice(0, 14);
    };

    const formatarRG = (valor: string) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1-$2");
        return valor.slice(0, 12);
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
        const el = document.getElementById("titulo-aba") ?? document.getElementById("main-content");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            el.focus();
        }
    };
    
    const irParaMenu = () => {
        const nav = document.getElementById("menu-abas");
        if (nav) {
            nav.scrollIntoView({ behavior: "smooth", block: "center" });
            const primeiroItem = nav.querySelector<HTMLElement>("button");
            if (primeiroItem) primeiroItem.focus();
            else nav.focus();
        }
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

    // Foco ao trocar de aba (evita rodar na primeira renderização)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const el = document.getElementById("titulo-aba");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [abaAtiva]);

    // ── Validações da edição de perfil ──────────────────────────────────────
    const validarPerfil = (): Record<string, string> => {
        const erros: Record<string, string> = {};
        if (!nome.trim()) erros.nome = "Nome é obrigatório";
        if (cpf.length < 14) erros.cpf = "CPF inválido";
        if (rg.length < 12) erros.rg = "RG inválido";
        if (!dia) erros.dia = "Selecione o dia";
        if (!mes) erros.mes = "Selecione o mês";
        if (!ano) erros.ano = "Selecione o ano";
        if (!genero) erros.genero = "Selecione o gênero";
        if (celular.length < 15) erros.celular = "Celular inválido";
        if (cep.length < 9) erros.cep = "CEP inválido";
        if (!bairro.trim()) erros.bairro = "Bairro é obrigatório";
        if (!rua.trim()) erros.rua = "Rua é obrigatória";
        if (!numero.trim()) erros.numero = "Número é obrigatório";
        return erros;
    };

    const focarPrimeiroCampoComErro = (erros: Record<string, string>) => {
        const ordem = [
            "nome", "cpf", "rg", "dia", "mes", "ano",
            "genero", "celular", "cep", "bairro", "rua", "numero",
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

    const handleAlterarDados = (e: React.FormEvent) => {
        e.preventDefault();
        setPerfilSucesso(false); // Reseta caso já tenha sido acionado antes
        const erros = validarPerfil();
        
        if (Object.keys(erros).length > 0) {
            setErrors(erros);
            focarPrimeiroCampoComErro(erros);
            return;
        }
        setErrors({});

        const formData = {
            nome,
            cpf,
            rg,
            dataNascimento: { dia, mes, ano },
            genero,
            celular,
            endereco: { cep, bairro, rua, numero, complemento },
        };
        
        // Ativação do aviso de sucesso após passar pelas validações
        setPerfilSucesso(true);
        setTimeout(() => setPerfilSucesso(false), 5000); // Remove aviso após 5 segundos
    };

    // ── Validações de abertura de processo ──────────────────────────────────
    const validarProcesso = (): Record<string, string> => {
        const erros: Record<string, string> = {};
        if (!tipoInstituicao) erros.tipoInstituicao = "Selecione o tipo de instituição";
        if (!unidadeEnsino.trim()) erros.unidadeEnsino = "Informe o nome da instituição";
        if (!turno) erros.turno = "Selecione o turno";
        if (!curso.trim()) erros.curso = "Informe o nome do curso";
        if (!frequenciaSemanal) erros.frequenciaSemanal = "Selecione a frequência semanal";
        if (!arquivo) erros.arquivo = "Anexe o comprovante de matrícula";
        if (!confirmaDistancia) erros.confirmaDistancia = "Confirme a distância mínima";
        return erros;
    };

    const handleAbrirProcesso = (e: React.FormEvent) => {
        e.preventDefault();
        const erros = validarProcesso();
        if (Object.keys(erros).length > 0) {
            setProcessoErrors(erros);
            setProcessoSucesso(false);
            return;
        }
        setProcessoErrors({});

        const novoProcesso = {
            tipoInstituicao,
            unidadeEnsino,
            turno,
            curso,
            frequenciaSemanal,
            arquivo: arquivo?.name,
        };
        setProcessoSucesso(true);
        setTipoInstituicao("");
        setUnidadeEnsino("");
        setTurno("");
        setCurso("");
        setFrequenciaSemanal("");
        setArquivo(null);
        setConfirmaDistancia(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setAbaAtiva("visualizar");
    };

    // ── Helpers de estilo ─────────────────────────────────────────────────────
    const inputBase = (campo: string, errosObj: Record<string, string>, extra = "") =>
        [
            "h-14 px-4 rounded-2xl outline-none focus:border-[#f69c0a] focus:border-4",
            errosObj[campo]
                ? "border-2 border-red-400"
                : highContrast
                ? "border border-white"
                : "",
            highContrast ? "bg-white text-black" : "bg-white text-black",
            extra,
        ].join(" ");

    const abas: { id: Aba; label: string }[] = [
        { id: "abrir", label: "Abrir novo processo" },
        { id: "visualizar", label: "Visualizar meus processos" },
        { id: "editar", label: "Editar Dados do Perfil" },
    ];

    const tituloAba: Record<Aba, string> = {
        abrir: "Abrir um novo processo",
        visualizar: "Meus Processos",
        editar: "Edite seus dados pessoais",
    };

    return (
        <>
        {/* ── Barra de acessibilidade ────────────────────────────────────────── */}
        <nav
            aria-label="Atalhos de acessibilidade"
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

        <Header highContrast={highContrast} showAccountActions />
        <main
            id="main-content"
            tabIndex={-1}
            className={`w-full flex flex-col items-center min-h-screen focus:outline-none
            ${highContrast ? "bg-[#212121]" : "bg-white"}`}
        >
            {/* ── Barra de escolha das abas ──────────────────────────────────── */}
            <nav
                id="menu-abas"
                tabIndex={-1}
                aria-label="Seções do perfil"
                className="w-full px-12 pt-2.5 flex justify-center items-center focus:outline-none"
            >
                {abas.map((aba) => {
                    const ativa = abaAtiva === aba.id;
                    return (
                        <button
                            key={aba.id}
                            type="button"
                            onClick={() => setAbaAtiva(aba.id)}
                            aria-current={ativa ? "page" : undefined}
                            className={`group flex-1 h-12 px-5 py-2.5 flex justify-center items-center gap-2.5 transition-colors outline-none cursor-pointer
                            focus:bg-[#f69c0a]
                            ${
                                ativa
                                ? highContrast
                                    ? "border-b-[3px] border-[#fac16d] focus:border-dashed focus:border-white"
                                    : "border-b-[3px] border-[#100b4f] focus:border-dashed"
                                : highContrast
                                    ? "border-b border-white focus:border-b-[3px] focus:border-dashed"
                                    : "border-b border-black focus:border-b-[3px] focus:border-dashed"
                            }`}
                        >
                            <span
                                className={`text-center text-2xl font-['Space_Grotesk'] group-focus:text-black
                                ${
                                    ativa
                                    ? highContrast
                                        ? "text-[#fac16d] font-bold"
                                        : "text-[#100b4f] font-bold"
                                    : highContrast
                                        ? "text-white font-normal"
                                        : "text-black font-normal"
                                }`}
                            >
                                {aba.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* ════════════════════ ABA: ABRIR NOVO PROCESSO ════════════════════ */}
            {abaAtiva === "abrir" && (
                <section
                    aria-labelledby="titulo-aba"
                    className="w-full flex justify-center py-12"
                >
                    <article
                        className={`w-full max-w-[520px] p-12 rounded-[10px] flex flex-col gap-7
                        ${highContrast ? "bg-black border border-white" : "bg-[#100b4f]"}`}
                    >
                        <h1
                            id="titulo-aba"
                            tabIndex={-1}
                            className="self-stretch text-center text-2xl font-medium text-white font-['Space_Grotesk'] focus:outline-none"
                        >
                            {tituloAba.abrir}
                        </h1>

                        <form onSubmit={handleAbrirProcesso} className="flex flex-col gap-5">
                            <p className="flex flex-col gap-2">
                                <label htmlFor="tipoInstituicao" className="text-white text-lg font-medium">
                                    Tipo de Instituição
                                </label>
                                <select
                                    id="tipoInstituicao"
                                    value={tipoInstituicao}
                                    onChange={(e) => setTipoInstituicao(e.target.value)}
                                    className={inputBase("tipoInstituicao", processoErrors)}
                                >
                                    <option value="" disabled>Selecione o tipo de instituição</option>
                                    <option value="publica">Pública</option>
                                    <option value="privada">Privada</option>
                                </select>
                                <ErrorMsg mensagem={processoErrors.tipoInstituicao} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label htmlFor="unidadeEnsino" className="text-white text-lg font-medium">
                                    Unidade de Ensino
                                </label>
                                <input
                                    id="unidadeEnsino"
                                    type="text"
                                    value={unidadeEnsino}
                                    onChange={(e) => setUnidadeEnsino(e.target.value)}
                                    placeholder="Nome da instituição"
                                    className={inputBase("unidadeEnsino", processoErrors)}
                                />
                                <ErrorMsg mensagem={processoErrors.unidadeEnsino} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label htmlFor="turno" className="text-white text-lg font-medium">
                                    Turno
                                </label>
                                <select
                                    id="turno"
                                    value={turno}
                                    onChange={(e) => setTurno(e.target.value)}
                                    className={inputBase("turno", processoErrors)}
                                >
                                    <option value="" disabled>Selecione o turno</option>
                                    <option value="matutino">Matutino</option>
                                    <option value="vespertino">Vespertino</option>
                                    <option value="noturno">Noturno</option>
                                    <option value="integral">Integral</option>
                                </select>
                                <ErrorMsg mensagem={processoErrors.turno} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label htmlFor="curso" className="text-white text-lg font-medium">
                                    Curso
                                </label>
                                <input
                                    id="curso"
                                    type="text"
                                    value={curso}
                                    onChange={(e) => setCurso(e.target.value)}
                                    placeholder="Nome do curso"
                                    className={inputBase("curso", processoErrors)}
                                />
                                <ErrorMsg mensagem={processoErrors.curso} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label htmlFor="frequenciaSemanal" className="text-white text-lg font-medium">
                                    Frequência semanal
                                </label>
                                <select
                                    id="frequenciaSemanal"
                                    value={frequenciaSemanal}
                                    onChange={(e) => setFrequenciaSemanal(e.target.value)}
                                    className={inputBase("frequenciaSemanal", processoErrors)}
                                >
                                    <option value="" disabled>Quantas vezes por semana</option>
                                    {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
                                        <option key={n} value={n}>{n} {n === 1 ? "vez" : "vezes"}</option>
                                    ))}
                                </select>
                                <ErrorMsg mensagem={processoErrors.frequenciaSemanal} />
                            </p>

                            <fieldset className="flex flex-col gap-2">
                                <legend className="sr-only">Confirmação de distância e comprovante</legend>

                                <label className="flex items-start gap-3 text-white text-sm">
                                    <input
                                        type="checkbox"
                                        checked={confirmaDistancia}
                                        onChange={(e) => setConfirmaDistancia(e.target.checked)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                setConfirmaDistancia((prev) => !prev);
                                            }
                                        }}
                                        className="mt-1 w-5 h-5 focus:outline-none focus:ring-2 focus:ring-[#f69c0a]"
                                    />
                                    <span>
                                        Confirmo que minha unidade de ensino está a 1 Km ou mais da minha residência
                                    </span>
                                </label>
                                <ErrorMsg mensagem={processoErrors.confirmaDistancia} />

                                <label
                                    htmlFor="arquivo"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                    className={`mt-2 h-28 rounded-2xl flex flex-row justify-center items-center gap-2 cursor-pointer text-center px-4 focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#f69c0a]
                                    ${
                                        highContrast
                                            ? "bg-white text-black border border-white"
                                            : "bg-white text-[#100b4f]"
                                    }
                                    ${processoErrors.arquivo ? "border-2 border-red-400" : ""}`}
                                >
                                    <Image
                                        src="/download-perfil.svg"
                                        alt="Ícone de upload de arquivo"
                                        width={48}
                                        height={48}
                                        className={`rounded-2xl p-2 ${highContrast ? "bg-black" : "bg-[#100b4f]"}`}
                                    />
                                    <span className="text-sm font-medium">
                                        {arquivo ? arquivo.name : "Clique ou arraste seu comprovante de matrícula, em PDF, até aqui."}
                                    </span>
                                    <input
                                        ref={fileInputRef}
                                        id="arquivo"
                                        type="file"
                                        tabIndex={-1}
                                        className="sr-only"
                                        onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
                                    />
                                </label>
                                <ErrorMsg mensagem={processoErrors.arquivo} />
                            </fieldset>

                            <button
                                type="submit"
                                className={`self-center mt-2 px-6 py-3 rounded-[10px] cursor-pointer text-lg font-medium transition-colors outline-none
                                ${
                                highContrast
                                    ? "border-2 border-white text-white hover:bg-[#f69c0a] hover:border-none hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-none"
                                    : "bg-[#fac16d] text-black hover:bg-[#f69c0a] focus:bg-[#f69c0a] focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#f69c0a]"
                                }`}
                            >
                                Abrir novo processo
                            </button>
                        </form>
                    </article>
                </section>
            )}

            {/* ═══════════════════ ABA: VISUALIZAR MEUS PROCESSOS ═══════════════ */}
            {abaAtiva === "visualizar" && (
                <section
                    aria-labelledby="titulo-aba"
                    className="w-full p-12 flex flex-col items-center gap-3.5"
                >
                    <h1
                        id="titulo-aba"
                        tabIndex={-1}
                        className={`self-stretch text-center text-2xl font-medium font-['Space_Grotesk'] focus:outline-none ${highContrast ? "text-white" : "text-black"}`}
                    >
                        {tituloAba.visualizar}
                    </h1>

                    {session && session.processos.length > 0 ? (
                        <figure className="w-full overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <caption className="sr-only">
                                    Lista dos processos de passe estudantil solicitados
                                </caption>
                                <thead>
                                    <tr className={`border-b ${
                                        highContrast ? "border-white" : "border-zinc-300"
                                    }`}>
                                        {["Unidade de Ensino", "Curso", "Turno", "Frequência semanal", "Status"].map((coluna) => (
                                            <th
                                                key={coluna}
                                                scope="col"
                                                className="py-3 px-4 font-medium text-lg font-['Space_Grotesk'] whitespace-nowrap"
                                            >
                                                <span className={highContrast ? "text-white" : "text-black"}>
                                                    {coluna}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {session.processos.map((processo) => {
                                        const corLinha = highContrast ? "text-white" : "text-black";
                                        return (
                                            <tr
                                                key={processo.id}
                                                className={`border-b ${
                                                    highContrast ? "border-zinc-700" : "border-zinc-200"
                                                } hover:bg-[#f69c0a] hover:text-black transition-colors ${corLinha}`}
                                            >
                                                <td className="py-3 px-4 text-sm font-['Space_Grotesk']">
                                                    {processo.unidadeEnsino}
                                                </td>
                                                <td className="py-3 px-4 text-sm font-['Space_Grotesk']">
                                                    {processo.curso}
                                                </td>
                                                <td className="py-3 px-4 text-sm font-['Space_Grotesk']">
                                                    {processo.turno}
                                                </td>
                                                <td className="py-3 px-4 text-sm font-['Space_Grotesk']">
                                                    {processo.frequenciaSemanal}
                                                </td>
                                                <td className="py-3 px-4 text-sm font-['Space_Grotesk']">
                                                    {processo.status}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </figure>
                    ) : (
                        <section
                            aria-label="Nenhum processo encontrado"
                            className="self-stretch flex flex-col justify-center items-center gap-3"
                        >
                            <p
                                className={`text-center text-base font-normal font-['Space_Grotesk'] ${highContrast ? "text-white" : "text-black"}`}
                            >
                                Nenhum processo encontrado. <br /> Clique no botão abaixo para criar um processo para solicitar seu passe estudantil.
                            </p>
                            <button
                                type="button"
                                onClick={() => setAbaAtiva("abrir")}
                                className={`h-12 px-5 py-2.5 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer
                                text-2xl font-normal font-['Space_Grotesk'] transition-colors outline-none focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-[#f69c0a]
                                ${
                                highContrast
                                    ? "outline outline-2 outline-offset-[-2px] outline-white text-white hover:bg-white hover:text-black"
                                    : "outline outline-2 outline-offset-[-2px] outline-black text-black hover:bg-black hover:text-white"
                                }`}
                            >
                                Crie um novo processo
                            </button>
                        </section>
                    )}
                </section>
            )}

            {/* ═══════════════════ ABA: EDITAR DADOS DO PERFIL ══════════════════ */}
            {abaAtiva === "editar" && (
                <section
                    aria-labelledby="titulo-aba"
                    className="self-stretch px-12 pt-12 pb-7 flex flex-col gap-5"
                >
                    <h1
                        id="titulo-aba"
                        tabIndex={-1}
                        className={`text-2xl font-medium font-['Space_Grotesk'] focus:outline-none ${highContrast ? "text-white" : "text-black"}`}
                    >
                        {tituloAba.editar}
                    </h1>

                    <form onSubmit={handleAlterarDados} className="flex flex-col gap-7">
                        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <legend className="sr-only">Dados pessoais</legend>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="nome"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    Nome completo
                                </label>
                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Nome completo"
                                    className={inputBase("nome", errors, highContrast ? "" : "border border-zinc-300")}
                                />
                                <ErrorMsg mensagem={errors.nome} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="cpf"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    CPF
                                </label>
                                <input
                                    id="cpf"
                                    type="text"
                                    value={cpf}
                                    onChange={(e) => setCpf(formatarCPF(e.target.value))}
                                    placeholder="000.000.000-00"
                                    maxLength={14}
                                    className={inputBase("cpf", errors, highContrast ? "" : "border border-zinc-300")}
                                />
                                <ErrorMsg mensagem={errors.cpf} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="rg"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    RG
                                </label>
                                <input
                                    id="rg"
                                    type="text"
                                    value={rg}
                                    onChange={(e) => setRg(formatarRG(e.target.value))}
                                    placeholder="00.000.000-0"
                                    maxLength={12}
                                    className={inputBase("rg", errors, highContrast ? "" : "border border-zinc-300")}
                                />
                                <ErrorMsg mensagem={errors.rg} />
                            </p>

                            <fieldset className="flex flex-col gap-2">
                                <legend
                                    className={`text-lg font-medium mb-1 ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    Data de nascimento
                                </legend>
                                <div className="grid grid-cols-3 gap-4">
                                    <p className="flex flex-col gap-1">
                                        <select
                                            id="dia"
                                            name="dia"
                                            value={dia}
                                            onChange={(e) => setDia(e.target.value)}
                                            className={inputBase("dia", errors, highContrast ? "" : "border border-zinc-300")}
                                        >
                                            <option value="" disabled>Dia</option>
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <ErrorMsg mensagem={errors.dia} />
                                    </p>

                                    <p className="flex flex-col gap-1">
                                        <select
                                            id="mes"
                                            name="mes"
                                            value={mes}
                                            onChange={(e) => setMes(e.target.value)}
                                            className={inputBase("mes", errors, highContrast ? "" : "border border-zinc-300")}
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
                                    </p>

                                    <p className="flex flex-col gap-1">
                                        <select
                                            id="ano"
                                            name="ano"
                                            value={ano}
                                            onChange={(e) => setAno(e.target.value)}
                                            className={inputBase("ano", errors, highContrast ? "" : "border border-zinc-300")}
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
                                    </p>
                                </div>
                            </fieldset>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="genero"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    Gênero
                                </label>
                                <select
                                    id="genero"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    className={inputBase("genero", errors, highContrast ? "" : "border border-zinc-300")}
                                >
                                    <option value="" disabled>Selecione seu gênero</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="nao-binario">Não binário</option>
                                    <option value="prefiro-nao-informar">Prefiro não informar</option>
                                    <option value="outro">Outro</option>
                                </select>
                                <ErrorMsg mensagem={errors.genero} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="celular"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    Celular
                                </label>
                                <input
                                    id="celular"
                                    type="tel"
                                    value={celular}
                                    onChange={(e) => setCelular(formatarCelular(e.target.value))}
                                    placeholder="(XX) 00000-0000"
                                    maxLength={15}
                                    className={inputBase("celular", errors, highContrast ? "" : "border border-zinc-300")}
                                />
                                <ErrorMsg mensagem={errors.celular} />
                            </p>
                        </fieldset>

                        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                            <legend className="sr-only">Informações de endereço</legend>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="cep"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    CEP
                                </label>
                                <input
                                    id="cep"
                                    type="text"
                                    value={cep}
                                    onChange={(e) => setCep(formatarCEP(e.target.value))}
                                    placeholder="00000-000"
                                    maxLength={9}
                                    className={inputBase("cep", errors, highContrast ? "" : "border border-zinc-300")}
                                />
                                <ErrorMsg mensagem={errors.cep} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="bairro"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    Bairro
                                </label>
                                <input
                                    id="bairro"
                                    type="text"
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                    placeholder="Vila/Bairro"
                                    className={inputBase("bairro", errors, highContrast ? "" : "border border-zinc-300")}
                                />
                                <ErrorMsg mensagem={errors.bairro} />
                            </p>

                            <p className="flex flex-col gap-2">
                                <label
                                    htmlFor="rua"
                                    className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                >
                                    Rua
                                </label>
                                <input
                                    id="rua"
                                    type="text"
                                    value={rua}
                                    onChange={(e) => setRua(e.target.value)}
                                    placeholder="Rua/Avenida"
                                    className={inputBase("rua", errors, highContrast ? "" : "border border-zinc-300")}
                                />
                                <ErrorMsg mensagem={errors.rua} />
                            </p>

                            <fieldset className="grid grid-cols-[120px_1fr] gap-6">
                                <legend className="sr-only">Número e Complemento</legend>

                                <p className="flex flex-col gap-2">
                                    <label
                                        htmlFor="numero"
                                        className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                    >
                                        Número
                                    </label>
                                    <input
                                        id="numero"
                                        type="text"
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                        placeholder="Número"
                                        className={inputBase("numero", errors, highContrast ? "" : "border border-zinc-300")}
                                    />
                                    <ErrorMsg mensagem={errors.numero} />
                                </p>

                                <p className="flex flex-col gap-2">
                                    <label
                                        htmlFor="complemento"
                                        className={`text-lg font-medium ${highContrast ? "text-white" : "text-black"}`}
                                    >
                                        Complemento
                                        <span className="font-light">(Opcional)</span>
                                    </label>
                                    <input
                                        id="complemento"
                                        type="text"
                                        value={complemento}
                                        onChange={(e) => setComplemento(e.target.value)}
                                        placeholder="Bloco, apartamento"
                                        className={inputBase("complemento", errors, highContrast ? "" : "border border-zinc-300")}
                                    />
                                </p>
                            </fieldset>
                        </fieldset>

                        <p className="self-stretch pt-2.5 pb-5 flex flex-col justify-center items-center gap-2.5">
                            {/* NOVO: Feedback visual e acessível de sucesso */}
                            {perfilSucesso && (
                                <span 
                                    role="status" 
                                    aria-live="polite" 
                                    className={`text-center font-bold text-lg mb-2 ${highContrast ? "text-[#fac16d]" : "text-green-700"}`}
                                >
                                    Dados da conta alterados com sucesso!
                                </span>
                            )}
                            <button
                                type="submit"
                                className={`h-12 px-5 py-2.5 rounded-[10px] flex justify-center items-center gap-2.5
                                    text-2xl font-normal font-['Space_Grotesk'] transition-colors outline-none cursor-pointer
                                    ${
                                    highContrast
                                        ? "border-2 border-white text-white hover:bg-[#f69c0a] hover:border-none hover:text-black focus:bg-[#f69c0a] focus:text-black focus:border-none"
                                        : "bg-[#fac16d] text-black hover:bg-[#f69c0a] focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-[#f69c0a]"
                                    }`}
                            >
                                Alterar dados da conta
                            </button>
                        </p>
                    </form>
                </section>
            )}
        </main>

        <Footer highContrast={highContrast} />
        </>
    );
}