import { FormEvent, ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Activity, AlertTriangle, BarChart3, Boxes, CalendarDays, ChevronDown, ClipboardList,
  Gauge, LayoutDashboard, LogOut, Menu, Package, Settings, Truck, Users,
} from "lucide-react";
import { apiRequest, clearAccessToken, getAccessToken, login } from "./services/api";

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Equipamentos", path: "/equipamentos", icon: Truck },
  { label: "Ordens de Serviço", path: "/ordens-servico", icon: ClipboardList },
  { label: "Preventivas", path: "/preventivas", icon: CalendarDays },
  { label: "Estoque de Peças", path: "/estoque", icon: Boxes },
  { label: "Fornecedores", path: "/fornecedores", icon: Package },
  { label: "Relatórios", path: "/relatorios", icon: BarChart3 },
];

function Protected({ children }: { children: ReactElement }) {
  return getAccessToken() ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const current = navigation.find(item => item.path === location.pathname)?.label ?? "Sistema";
  const navigate = useNavigate();

  function logout() {
    clearAccessToken();
    navigate("/login");
  }

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Gauge size={22}/></div><div><strong>Fleet Manager</strong><span>MANUTENÇÃO DE FROTAS</span></div></div>
      <div className="workspace-label">ESPAÇO DE TRABALHO</div>
      <nav className="navigation">{navigation.map(({label,path,icon:Icon})=><NavLink key={path} to={path} end={path==="/"} className={({isActive})=>`nav-item ${isActive?"active":""}`} onClick={()=>setSidebarOpen(false)}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom">
        <NavLink to="/usuarios" className="nav-item"><Users size={18}/><span>Usuários</span></NavLink>
        <NavLink to="/configuracoes" className="nav-item"><Settings size={18}/><span>Configurações</span></NavLink>
        <button className="nav-item logout-button" onClick={logout}><LogOut size={18}/><span>Sair do sistema</span></button>
        <div className="profile"><div className="avatar">FM</div><div><strong>Ambiente operacional</strong><span>Conta autenticada</span></div><ChevronDown size={16}/></div>
      </div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" aria-label="Abrir menu" onClick={()=>setSidebarOpen(!sidebarOpen)}><Menu size={21}/></button><div className="breadcrumb">Visão geral <span>/</span> <strong>{current}</strong></div><div className="topbar-right"><span className="environment"><i/> API conectada por sessão</span><div className="top-avatar">FM</div></div></header>
      <Outlet/>
    </main>
  </div>;
}

function DashboardPage() {
  const metrics = [
    {label:"Equipamentos na frota",icon:Truck,tone:"blue"},
    {label:"Disponibilidade",icon:Activity,tone:"green"},
    {label:"OS em aberto",icon:ClipboardList,tone:"amber"},
    {label:"Equipamentos parados",icon:AlertTriangle,tone:"red"},
  ];
  return <section className="page">
    <div className="page-heading"><div><div className="eyebrow">CENTRAL DE OPERAÇÕES</div><h1>Dashboard</h1><p>Acompanhe a operação e a manutenção da sua frota.</p></div><div className="date-chip"><CalendarDays size={16}/> Indicadores alimentados pela API</div></div>
    <div className="notice"><AlertTriangle size={18}/><div><strong>Base operacional pronta para receber dados</strong><span>Os indicadores aparecem como N/D até que existam registros válidos. O sistema não apresenta números fictícios como resultados reais.</span></div></div>
    <div className="section-title"><div><h2>Resumo da frota</h2><p>Indicadores atualizados conforme os registros operacionais.</p></div></div>
    <div className="metrics-grid">{metrics.map(({label,icon:Icon,tone})=><article className="metric-card" key={label}><div className="metric-top"><span>{label}</span><div className={`metric-icon ${tone}`}><Icon size={19}/></div></div><div className="metric-value">N/D</div><div className="metric-note">Aguardando dados registrados</div></article>)}</div>
    <div className="dashboard-grid"><article className="panel chart-panel"><div className="panel-heading"><div><h3>Custos de manutenção</h3><p>Evolução mensal de custos</p></div><BarChart3 size={19}/></div><EmptyState title="Sem dados para exibir" description="Os gráficos serão habilitados após o registro de ordens de serviço e custos."/></article><article className="panel"><div className="panel-heading"><div><h3>Ordens de serviço</h3><p>Acompanhamento por status</p></div><ClipboardList size={19}/></div><EmptyState title="Nenhuma OS cadastrada" description="As ordens de serviço aparecerão aqui."/></article></div>
    <footer>Fleet Maintenance Manager <span>•</span> Versão de desenvolvimento 0.2.0</footer>
  </section>;
}

function EmptyState({title,description}:{title:string;description:string}) {
  return <div className="empty-chart"><div className="empty-icon"><Activity size={24}/></div><strong>{title}</strong><span>{description}</span></div>;
}

type Equipment = {id:number;internalCode:string;name:string;brand?:string;model?:string;status:string;location?:string};
type EquipmentPageResponse = {content:Equipment[];totalElements:number;totalPages:number;number:number};

function EquipmentPage() {
  const [items,setItems]=useState<Equipment[]>([]);
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [showForm,setShowForm]=useState(false);
  const [name,setName]=useState("");
  const [type,setType]=useState("");
  const [brand,setBrand]=useState("");
  const [saving,setSaving]=useState(false);

  async function load() {
    setLoading(true);setError("");
    try { const result=await apiRequest<EquipmentPageResponse>(`/equipment?search=${encodeURIComponent(search)}&page=0&size=50`);setItems(result.content); }
    catch(e){setError(e instanceof Error?e.message:"Falha ao carregar equipamentos");}
    finally{setLoading(false);}
  }
  useEffect(()=>{void load();},[]);
  async function submit(e:FormEvent) {
    e.preventDefault();setSaving(true);setError("");
    try { await apiRequest<Equipment>("/equipment",{method:"POST",body:JSON.stringify({name,equipmentType:type||null,brand:brand||null})});setName("");setType("");setBrand("");setShowForm(false);await load(); }
    catch(err){setError(err instanceof Error?err.message:"Falha ao cadastrar equipamento");}
    finally{setSaving(false);}
  }
  return <section className="page">
    <div className="page-heading"><div><div className="eyebrow">GESTÃO DE ATIVOS</div><h1>Equipamentos</h1><p>Cadastre, consulte e acompanhe os ativos da frota.</p></div><button className="primary-button" onClick={()=>setShowForm(!showForm)}>+ Novo equipamento</button></div>
    {error&&<div className="error-banner">{error}</div>}
    {showForm&&<form className="panel equipment-form" onSubmit={submit}><h2>Novo equipamento</h2><div className="form-grid"><label>Nome / identificação<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Retroescavadeira 01"/></label><label>Tipo<input value={type} onChange={e=>setType(e.target.value)} placeholder="Ex.: Retroescavadeira"/></label><label>Marca<input value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Fabricante"/></label></div><div className="form-actions"><button type="button" className="secondary-button" onClick={()=>setShowForm(false)}>Cancelar</button><button className="primary-button" disabled={saving}>{saving?"Salvando...":"Salvar equipamento"}</button></div></form>}
    <div className="panel table-panel"><div className="table-toolbar"><div><h2>Cadastro da frota</h2><p>Dados consultados diretamente na API.</p></div><div className="search-box"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar equipamento..."/><button onClick={()=>void load()}>Buscar</button></div></div>
    {loading?<div className="empty-activity">Carregando equipamentos...</div>:items.length===0?<EmptyState title="Nenhum equipamento encontrado" description="Cadastre o primeiro equipamento para iniciar o histórico da frota."/>:<div className="table-scroll"><table><thead><tr><th>Código</th><th>Equipamento</th><th>Marca / modelo</th><th>Localização</th><th>Status</th></tr></thead><tbody>{items.map(item=><tr key={item.id}><td>{item.internalCode}</td><td><strong>{item.name}</strong></td><td>{[item.brand,item.model].filter(Boolean).join(" ")||"—"}</td><td>{item.location||"—"}</td><td><span className="status-pill">{item.status}</span></td></tr>)}</tbody></table></div>}
    </div>
  </section>;
}

const modules:Record<string,{title:string;description:string;next:string}> = {
  "/ordens-servico":{title:"Ordens de Serviço",description:"Abertura, diagnóstico, execução, custos e histórico das intervenções.",next:"Módulo previsto para a próxima etapa de implementação."},
  "/preventivas":{title:"Planejamento Preventivo",description:"Planos por equipamento, periodicidade por data e horímetro, checklists e alertas.",next:"Estrutura de dados prevista; fluxo operacional será implementado em seguida."},
  "/estoque":{title:"Estoque de Peças",description:"Cadastro de materiais, entradas, saídas vinculadas às OS e inventário.",next:"Estrutura de dados prevista; movimentações transacionais serão implementadas em seguida."},
  "/fornecedores":{title:"Fornecedores e Serviços",description:"Cadastro de fornecedores, contatos, serviços terceirizados e documentos.",next:"Módulo previsto para a próxima etapa de implementação."},
  "/relatorios":{title:"Relatórios e Indicadores",description:"Custos, disponibilidade, MTBF, MTTR, consumo e exportações.",next:"Indicadores serão habilitados quando houver dados operacionais válidos."},
  "/usuarios":{title:"Usuários e permissões",description:"Administração de contas e perfis de acesso.",next:"Autenticação JWT e perfis básicos estão preparados no backend; gestão de usuários será adicionada."},
  "/configuracoes":{title:"Configurações",description:"Parâmetros gerais, unidades, centros de custo e preferências.",next:"Configurações avançadas serão incluídas nas próximas entregas."},
};
function ModulePage({path}:{path:string}) {
 const item=modules[path];
 return <section className="page"><div className="page-heading"><div><div className="eyebrow">MÓDULO DO SISTEMA</div><h1>{item.title}</h1><p>{item.description}</p></div></div><div className="panel module-placeholder"><div className="empty-icon"><Gauge size={24}/></div><h2>Base preparada</h2><p>{item.next}</p><span>Esta tela ainda não executa operações de negócio.</span></div></section>;
}

function LoginPage() {
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);const navigate=useNavigate();
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");try{await login(email,password);navigate("/");}catch{setError("Não foi possível autenticar. Confira usuário, senha e disponibilidade da API.");}finally{setBusy(false);}}
 return <div className="login-screen"><form className="login-card" onSubmit={submit}><div className="brand-mark login-mark"><Gauge size={25}/></div><div className="eyebrow">FLEET MAINTENANCE MANAGER</div><h1>Acesse sua conta</h1><p>Entre para gerenciar sua frota e manutenção.</p>{error&&<div className="error-banner">{error}</div>}<label>E-mail<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username"/></label><label>Senha<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/></label><button className="primary-button" disabled={busy}>{busy?"Entrando...":"Entrar"}</button><small>O administrador inicial é configurado pelas variáveis de ambiente do backend.</small></form></div>;
}

export default function App() {
 return <BrowserRouter><Routes><Route path="/login" element={getAccessToken()?<Navigate to="/" replace/>:<LoginPage/>}/><Route element={<Protected><AppLayout/></Protected>}><Route index element={<DashboardPage/>}/><Route path="equipamentos" element={<EquipmentPage/>}/>{Object.keys(modules).map(path=><Route key={path} path={path.slice(1)} element={<ModulePage path={path}/>}/>)}</Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes></BrowserRouter>;
}
