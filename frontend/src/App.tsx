import { useState } from "react";
import {
  Activity, AlertTriangle, BarChart3, Boxes, CalendarDays, ChevronDown,
  ClipboardList, Gauge, LayoutDashboard, Menu, Package, Settings, Truck, Users,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Equipamentos", icon: Truck },
  { label: "Ordens de Serviço", icon: ClipboardList, count: "12" },
  { label: "Preventivas", icon: CalendarDays },
  { label: "Estoque de Peças", icon: Boxes },
  { label: "Fornecedores", icon: Package },
  { label: "Relatórios", icon: BarChart3 },
];

const metrics = [
  { label: "Equipamentos na frota", value: "—", note: "Aguardando integração", icon: Truck, tone: "blue" },
  { label: "Disponibilidade", value: "—", note: "Sem dados operacionais", icon: Activity, tone: "green" },
  { label: "OS em aberto", value: "—", note: "Aguardando integração", icon: ClipboardList, tone: "amber" },
  { label: "Equipamentos parados", value: "—", note: "Aguardando integração", icon: AlertTriangle, tone: "red" },
];

function App() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Gauge size={22} /></div>
          <div><strong>Fleet Manager</strong><span>MANUTENÇÃO DE FROTAS</span></div>
        </div>
        <div className="workspace-label">ESPAÇO DE TRABALHO</div>
        <nav className="navigation">
          {navigation.map(({ label, icon: Icon, count }) => (
            <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => { setActive(label); setSidebarOpen(false); }}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {count && <small>{count}</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><Users size={18} /><span>Usuários</span></button>
          <button className="nav-item"><Settings size={18} /><span>Configurações</span></button>
          <div className="profile">
            <div className="avatar">HM</div>
            <div><strong>Administrador</strong><span>Gestor do sistema</span></div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Abrir menu" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu size={21} /></button>
          <div className="breadcrumb">Visão geral <span>/</span> <strong>{active}</strong></div>
          <div className="topbar-right"><span className="environment"><i /> Ambiente de desenvolvimento</span><div className="top-avatar">HM</div></div>
        </header>

        <section className="page">
          <div className="page-heading">
            <div><div className="eyebrow">CENTRAL DE OPERAÇÕES</div><h1>{active}</h1><p>Acompanhe a operação e a manutenção da sua frota.</p></div>
            <div className="date-chip"><CalendarDays size={16} /> Dados reais aparecerão após a integração da API</div>
          </div>

          <div className="notice"><AlertTriangle size={18} /><div><strong>Ambiente inicial em construção</strong><span>Os indicadores estão sem valores porque ainda não há dados operacionais cadastrados. Nenhum número demonstrativo está sendo apresentado como real.</span></div></div>

          <div className="section-title"><div><h2>Resumo da frota</h2><p>Indicadores serão atualizados pela API conforme os registros do sistema.</p></div><button className="period-button">Todo o período <ChevronDown size={15} /></button></div>

          <div className="metrics-grid">
            {metrics.map(({ label, value, note, icon: Icon, tone }) => (
              <article className="metric-card" key={label}>
                <div className="metric-top"><span>{label}</span><div className={`metric-icon ${tone}`}><Icon size={19} /></div></div>
                <div className="metric-value">{value}</div><div className="metric-note">{note}</div>
              </article>
            ))}
          </div>

          <div className="dashboard-grid">
            <article className="panel chart-panel"><div className="panel-heading"><div><h3>Custos de manutenção</h3><p>Evolução mensal de custos</p></div><BarChart3 size={19} /></div><div className="empty-chart"><div className="empty-icon"><BarChart3 size={24} /></div><strong>Sem dados para exibir</strong><span>Os gráficos serão habilitados após o registro de ordens de serviço e custos.</span></div></article>
            <article className="panel"><div className="panel-heading"><div><h3>Ordens de serviço</h3><p>Acompanhamento por status</p></div><ClipboardList size={19} /></div><div className="empty-chart compact"><div className="empty-icon"><ClipboardList size={24} /></div><strong>Nenhuma OS cadastrada</strong><span>As ordens de serviço aparecerão aqui.</span></div></article>
          </div>

          <div className="panel activity-panel"><div className="panel-heading"><div><h3>Atividade recente</h3><p>Últimos eventos registrados no sistema</p></div><Activity size={19} /></div><div className="empty-activity">Ainda não existem eventos registrados.</div></div>
          <footer>Fleet Maintenance Manager <span>•</span> Versão de desenvolvimento 0.1.0</footer>
        </section>
      </main>
    </div>
  );
}

export default App;
