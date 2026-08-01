import { useState, useEffect, useCallback, useRef } from "react";

const LOGO_SRC =
  "data:image/png;base64,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";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import {
  LayoutGrid,
  Users,
  UserCircle2,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  Gauge,
  Sparkles,
  Hash,
  Wallet,
  ThumbsUp,
  AlertTriangle,
  MapPin,
  Star,
  Maximize2,
  Calendar,
  Filter as FilterIcon,
  Image as ImageIcon,
  Flag,
} from "lucide-react";

const FILTER_OPTIONS = {
  dateRange: ["Today", "Last 2 Days", "Last 7 Days", "Last 30 Days"],
  serviceCategory: ["AC", "Refrigerator", "Washing Machine", "Microwave"],
  state: ["Delhi", "Uttar Pradesh", "Haryana", "Maharashtra"],
  city: ["Firozabad", "Gurgaon", "Noida", "Pune"],
};

function mockDashboardData(filters) {
  return {
    company: "Abc Pvt Ltd",
    stats: [
      {
        key: "speed",
        icon: Gauge,
        label: "Speed",
        sub: "Avg resp time",
        value: "4.1h",
        change: 5,
      },
      {
        key: "quality",
        icon: Sparkles,
        label: "Quality",
        sub: "Happy Code",
        value: 45,
        change: 5,
      },
      {
        key: "quantity",
        icon: Hash,
        label: "Quantity",
        sub: "Closed calls (Day 0-2)",
        value: 250,
        change: null,
      },
      {
        key: "revenue",
        icon: Wallet,
        label: "Revenue",
        sub: null,
        value: "₹1,20,000",
        change: 8,
      },
    ],
    nps: { promotersPct: 25.5, detractorsPct: 3.5 },
    attention: { repeatBookings: 25, reVisit: 5, escalation: 10 },
    jobsOverview: {
      total: 120,
      new: 25,
      assigned: 45,
      completed: 30,
      cancelled: 15,
      partsPending: 5,
    },
    techniciansStatus: { active: 80, newAdded: 15, inactive: 65, blocked: 10 },
    speedTrend: [
      { label: "Today", hours: 3 },
      { label: "20th", hours: 5 },
      { label: "19th", hours: 8 },
      { label: "18th", hours: 6 },
      { label: "17th", hours: 5 },
    ],
    topLocations: [
      { name: "New Delhi", count: 11, x: 54, y: 22 },
      { name: "Gurgaon", count: 5, x: 82, y: 14 },
      { name: "Pune", count: 12, x: 20, y: 44 },
      { name: "Kolkata", count: 10, x: 62, y: 60 },
      { name: "Bangalore", count: 8, x: 38, y: 84 },
    ],
    accountStatus: {
      availableBalance: "₹1,32,500",
      totalSpent: "₹1,32,500",
      jobsDone: 180,
      perUnitCost: "₹1,560",
    },
    callStatusDetails: [
      { day: "Mon", pending: 40, partPending: 30, closed: 55, cancelled: 15 },
      { day: "Tue", pending: 55, partPending: 25, closed: 60, cancelled: 20 },
      { day: "Wed", pending: 45, partPending: 35, closed: 100, cancelled: 25 },
      { day: "Thu", pending: 70, partPending: 40, closed: 85, cancelled: 30 },
      { day: "Fri", pending: 50, partPending: 20, closed: 65, cancelled: 15 },
      { day: "Sat", pending: 60, partPending: 30, closed: 50, cancelled: 20 },
      { day: "Sun", pending: 35, partPending: 15, closed: 40, cancelled: 10 },
    ],
    topTechnicians: [
      {
        id: "INA293",
        rating: 4,
        jobCount: 10,
        location: "Sector 58, Gurugram",
      },
      {
        id: "INA294",
        rating: 4,
        jobCount: 10,
        location: "Sector 58, Gurugram",
      },
    ],
    activeStates: {
      activeCities: 24,
      activePincodes: 950,
      opportunityMissed: 20,
    },
    _filters: filters,
  };
}

async function fetchDashboardData(filters) {
  await new Promise((r) => setTimeout(r, 300));
  return mockDashboardData(filters);
}

const T = {
  sidebar: "#0d4f52",
  sidebarActive: "#12666a",
  teal: "#12797d",
  tealDark: "#0d5a5e",
  tealDarker: "#0a4548",
  bg: "#eef3f5",
  border: "#e7edf0",
  text: "#22313a",
  subtext: "#8a99a1",
  green: "#2fa876",
  red: "#e2554f",
  amber: "#f0a93b",
  blue: "#4a86d6",
};

const PIE_JOBS = [T.teal, T.amber, T.green, T.red, "#f2c94c"];
const PIE_TECH = [T.teal, T.amber, T.green, T.red];
const inr = (n) =>
  typeof n === "string" ? n : "₹" + Number(n).toLocaleString("en-IN");

function Select({ icon: Icon, name, label, value, options, onChange }) {
  return (
    <div
      className="flex items-center gap-1.5 pl-3 pr-2 py-2 rounded-lg border bg-white text-sm relative"
      style={{ borderColor: T.border }}
    >
      {Icon && <Icon size={14} style={{ color: T.teal }} />}
      {label && (
        <span className="text-gray-500 shrink-0 whitespace-nowrap">
          {label}:
        </span>
      )}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="bg-transparent outline-none appearance-none pr-5 font-semibold cursor-pointer"
        style={{ color: T.text }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="text-gray-400 pointer-events-none absolute right-2"
      />
    </div>
  );
}

function Card({ title, icon: Icon, expandable, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-xl border p-4 flex flex-col h-full ${className}`}
      style={{ borderColor: T.border }}
    >
      {title && (
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div
            className="flex items-center gap-2 text-[13px] font-semibold"
            style={{ color: T.text }}
          >
            {Icon && <Icon size={14} style={{ color: T.teal }} />}
            {title}
          </div>
          {expandable && (
            <Maximize2 size={12} className="text-gray-400 cursor-pointer" />
          )}
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  );
}

function Dot({ color, label, value }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] whitespace-nowrap">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: color }}
      />
      <span className="text-gray-500 truncate">{label}</span>
      {value !== undefined && (
        <span className="font-semibold" style={{ color: T.text }}>
          {value}
        </span>
      )}
    </div>
  );
}

function useTailwindCDN() {
  useEffect(() => {
    if (document.getElementById("tailwind-cdn-script")) return;
    const script = document.createElement("script");
    script.id = "tailwind-cdn-script";
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }, []);
}

function App() {
  useTailwindCDN();
  const [filters, setFilters] = useState({
    dateRange: "Last 2 Days",
    serviceCategory: "AC",
    state: "Delhi",
    city: "Firozabad",
  });
  const [pendingFilters, setPendingFilters] = useState(filters);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const techListRef = useRef(null);
  const [techThumb, setTechThumb] = useState({ top: 0, height: 100 });

  const updateTechThumb = useCallback(() => {
    const el = techListRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight) {
      setTechThumb({ top: 0, height: 100 });
      return;
    }
    const height = Math.max((clientHeight / scrollHeight) * 100, 12);
    const top =
      (scrollTop / (scrollHeight - clientHeight)) * (100 - height);
    setTechThumb({ top, height });
  }, []);

  const loadData = useCallback(async (f) => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetchDashboardData(f));
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(filters);
  }, [filters, loadData]);

  const handleSelect = (name, value) =>
    setPendingFilters((p) => ({ ...p, [name]: value }));
  const applyFilters = () => setFilters(pendingFilters);

  const navItems = [
    { label: "Dashboard", icon: LayoutGrid },
    { label: "Technicians", icon: Users },
    { label: "Customers", icon: UserCircle2 },
    { label: "Notifications", icon: Bell },
    { label: "Settings", icon: Settings },
  ];

  const q = searchQuery.trim().toLowerCase();
  const filteredTechnicians = !data
    ? []
    : !q
      ? data.topTechnicians
      : data.topTechnicians.filter(
          (t) =>
            t.id.toLowerCase().includes(q) ||
            t.location.toLowerCase().includes(q),
        );

  useEffect(() => {
    updateTechThumb();
  }, [filteredTechnicians.length, updateTechThumb]);
  const filteredLocations = !data
    ? []
    : !q
      ? data.topLocations
      : data.topLocations.filter((l) => l.name.toLowerCase().includes(q));

  return (
    <div
      className="w-full min-h-screen flex"
      style={{ background: T.bg, fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {}
      <aside
        className="w-56 flex flex-col shrink-0"
        style={{ background: T.sidebar }}
      >
        <div className="flex items-center px-5 py-5">
          <button
            type="button"
            onClick={() => {
              setActiveNav("Dashboard");
              setSearchQuery("");
            }}
            aria-label="Go to Dashboard"
            className="cursor-pointer bg-transparent border-0 p-0 leading-none transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
          >
            <img
              src={LOGO_SRC}
              alt="OniT logo"
              className="h-14 w-auto object-contain pointer-events-none"
            />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const active = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? T.sidebarActive : "transparent",
                  color: active ? "#fff" : "#a9c4c5",
                }}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-3 pb-5">
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
            style={{ color: "#a9c4c5" }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {}
      <main className="flex-1 overflow-x-hidden flex flex-col">
        {}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ background: T.teal }}
        >
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-4 relative">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sm">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="outline-none bg-transparent text-gray-700 placeholder-gray-400 w-32 sm:w-44"
              />
            </div>
            <div
              className="px-4 py-2 rounded-full bg-white text-sm font-medium"
              style={{ color: T.text }}
            >
              {data?.company || "—"}
            </div>
          </div>
        </div>

        <div className="p-5">
          {}
          <div
            className="flex flex-wrap items-center gap-2.5 mb-6 bg-white rounded-xl border p-3"
            style={{ borderColor: T.border }}
          >
            <Select
              icon={Calendar}
              name="dateRange"
              value={pendingFilters.dateRange}
              options={FILTER_OPTIONS.dateRange}
              onChange={handleSelect}
            />
            <Select
              icon={UserCircle2}
              name="serviceCategory"
              label="Service Category"
              value={pendingFilters.serviceCategory}
              options={FILTER_OPTIONS.serviceCategory}
              onChange={handleSelect}
            />
            <Select
              icon={MapPin}
              name="state"
              label="State"
              value={pendingFilters.state}
              options={FILTER_OPTIONS.state}
              onChange={handleSelect}
            />
            <Select
              icon={MapPin}
              name="city"
              label="City"
              value={pendingFilters.city}
              options={FILTER_OPTIONS.city}
              onChange={handleSelect}
            />
            <button
              onClick={applyFilters}
              className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white shrink-0 hover:opacity-90"
              style={{ background: T.teal }}
            >
              <FilterIcon size={14} />
              Filter <ChevronDown size={14} />
            </button>
          </div>

          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-lg text-sm"
              style={{ background: "#fdecea", color: T.red }}
            >
              Couldn't load dashboard data: {error}
            </div>
          )}

          {!data ? (
            <div className="grid place-items-center py-24 text-gray-400 text-sm">
              Loading dashboard…
            </div>
          ) : (
            <div
              className={
                loading
                  ? "opacity-50 pointer-events-none transition-opacity"
                  : "transition-opacity"
              }
            >
              {}
              <div className="flex gap-3 mb-4 overflow-x-auto">
                {data.stats.map((s) => (
                  <Card key={s.key} className="flex-1 min-w-[140px]">
                    <div
                      className="flex items-center gap-1.5 text-xs font-medium mb-1"
                      style={{ color: T.text }}
                    >
                      <s.icon size={13} style={{ color: T.teal }} />
                      {s.label}
                    </div>
                    {s.sub && (
                      <div className="text-[10px] text-gray-400 mb-1">
                        {(() => {
                          const m = s.sub.match(/^(.*?)(\(.*\))$/);
                          return m ? (
                            <>
                              {m[1]}
                              <span style={{ color: T.teal }}>{m[2]}</span>
                            </>
                          ) : (
                            s.sub
                          );
                        })()}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5 mt-auto">
                      <span
                        className="text-lg font-bold"
                        style={{ color: T.text }}
                      >
                        {s.value}
                      </span>
                      {s.change != null && (
                        <span
                          className="text-[11px] font-semibold"
                          style={{ color: s.change >= 0 ? T.green : T.red }}
                        >
                          {s.change >= 0 ? "+" : ""}
                          {s.change}%
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
                <Card className="flex-1 min-w-[150px]">
                  <div
                    className="flex items-center gap-1.5 text-xs font-medium mb-2"
                    style={{ color: T.text }}
                  >
                    <ThumbsUp size={13} style={{ color: T.teal }} /> NPS
                  </div>
                  <div className="flex gap-4 text-sm mt-auto">
                    <div>
                      <span className="text-gray-400 text-[10px] block">
                        Promoters
                      </span>
                      <span className="font-bold" style={{ color: T.green }}>
                        {data.nps.promotersPct}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">
                        Detectors
                      </span>
                      <span className="font-bold" style={{ color: T.red }}>
                        {data.nps.detractorsPct}%
                      </span>
                    </div>
                  </div>
                </Card>
                <Card className="flex-1 min-w-[170px]">
                  <div
                    className="flex items-center gap-1.5 text-xs font-medium mb-2"
                    style={{ color: T.text }}
                  >
                    <AlertTriangle size={13} style={{ color: T.teal }} />{" "}
                    Attention
                  </div>
                  <div className="flex gap-3 text-sm mt-auto">
                    <div>
                      <span className="text-gray-400 text-[10px] block">
                        Repeat Bookings
                      </span>
                      <span className="font-bold">
                        {data.attention.repeatBookings}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">
                        Re-visit
                      </span>
                      <span className="font-bold" style={{ color: T.amber }}>
                        {data.attention.reVisit}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">
                        Escalation
                      </span>
                      <span className="font-bold" style={{ color: T.red }}>
                        {data.attention.escalation}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {}
              <div
                className="grid grid-cols-4 gap-4 mb-4 items-stretch"
                style={{ gridAutoRows: "1fr" }}
              >
                <Card title="Jobs Overview" icon={LayoutGrid} expandable>
                  <div className="flex items-center gap-3 flex-1 min-h-0">
                    <div style={{ width: 96, height: 96, flexShrink: 0 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "New", value: data.jobsOverview.new },
                              {
                                name: "Assigned",
                                value: data.jobsOverview.assigned,
                              },
                              {
                                name: "Completed",
                                value: data.jobsOverview.completed,
                              },
                              {
                                name: "Cancelled",
                                value: data.jobsOverview.cancelled,
                              },
                              {
                                name: "Parts Pending",
                                value: data.jobsOverview.partsPending,
                              },
                            ]}
                            dataKey="value"
                            innerRadius={28}
                            outerRadius={46}
                            paddingAngle={2}
                          >
                            {PIE_JOBS.map((c, i) => (
                              <Cell key={i} fill={c} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs text-gray-400">
                      Total Jobs
                      <div
                        className="text-lg font-bold"
                        style={{ color: T.text }}
                      >
                        {data.jobsOverview.total}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 shrink-0">
                    <Dot
                      color={PIE_JOBS[0]}
                      label="New"
                      value={data.jobsOverview.new}
                    />
                    <Dot
                      color={PIE_JOBS[1]}
                      label="Assigned"
                      value={data.jobsOverview.assigned}
                    />
                    <Dot
                      color={PIE_JOBS[2]}
                      label="Completed"
                      value={data.jobsOverview.completed}
                    />
                    <Dot
                      color={PIE_JOBS[3]}
                      label="Cancelled"
                      value={data.jobsOverview.cancelled}
                    />
                    <Dot
                      color={PIE_JOBS[4]}
                      label="Parts Pending"
                      value={data.jobsOverview.partsPending}
                    />
                  </div>
                </Card>

                <Card title="Technicians Status" icon={Users} expandable>
                  <div className="flex-1 min-h-0" style={{ minHeight: 96 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Active",
                              value: data.techniciansStatus.active,
                            },
                            {
                              name: "New added",
                              value: data.techniciansStatus.newAdded,
                            },
                            {
                              name: "Inactive",
                              value: data.techniciansStatus.inactive,
                            },
                            {
                              name: "Blocked",
                              value: data.techniciansStatus.blocked,
                            },
                          ]}
                          dataKey="value"
                          innerRadius={0}
                          outerRadius={46}
                          paddingAngle={1}
                          labelLine={false}
                          label={({ value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                            const RAD = Math.PI / 180;
                            const r = innerRadius + (outerRadius - innerRadius) * 0.62;
                            const x = cx + r * Math.cos(-midAngle * RAD);
                            const y = cy + r * Math.sin(-midAngle * RAD);
                            return (
                              <text
                                x={x}
                                y={y}
                                fill="#fff"
                                fontSize={11}
                                fontWeight={700}
                                textAnchor="middle"
                                dominantBaseline="central"
                              >
                                {value}
                              </text>
                            );
                          }}
                        >
                          {PIE_TECH.map((c, i) => (
                            <Cell key={i} fill={c} stroke="#fff" strokeWidth={1} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 shrink-0">
                    <Dot color={PIE_TECH[0]} label="Active" />
                    <Dot color={PIE_TECH[1]} label="New added" />
                    <Dot color={PIE_TECH[2]} label="Inactive" />
                    <Dot color={PIE_TECH[3]} label="Blocked" />
                  </div>
                </Card>

                <Card title="Analyze Speed (Same day closure)" expandable>
                  <div className="flex-1 min-h-0" style={{ minHeight: 96 }}>
                    <ResponsiveContainer>
                      <LineChart
                        data={data.speedTrend}
                        margin={{ left: -20, top: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={T.border}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 10 }}
                          stroke={T.subtext}
                        />
                        <YAxis tick={{ fontSize: 10 }} stroke={T.subtext} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="hours"
                          stroke={T.blue}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-1.5 shrink-0">
                    <Dot color={T.blue} label="Avg time in hour" />
                  </div>
                </Card>

                <Card title="Top 5 Locations" icon={MapPin} expandable>
                  <div
                    className="flex-1 min-h-0 rounded-lg relative overflow-hidden"
                    style={{
                      background: "#eef2ee",
                      minHeight: 96,
                    }}
                  >
                    {}
                    <svg
                      viewBox="0 0 300 180"
                      preserveAspectRatio="xMidYMid slice"
                      className="absolute inset-0 w-full h-full"
                    >
                      <rect width="300" height="180" fill="#eef2ee" />
                      {}
                      <ellipse cx="60" cy="40" rx="55" ry="30" fill="#dcebe0" />
                      <ellipse
                        cx="220"
                        cy="30"
                        rx="60"
                        ry="26"
                        fill="#dfeee2"
                      />
                      <ellipse
                        cx="40"
                        cy="130"
                        rx="50"
                        ry="34"
                        fill="#dcebe0"
                      />
                      <ellipse
                        cx="190"
                        cy="120"
                        rx="70"
                        ry="40"
                        fill="#e2eee3"
                      />
                      <ellipse
                        cx="150"
                        cy="70"
                        rx="90"
                        ry="45"
                        fill="#e6efe6"
                        opacity="0.6"
                      />
                      {}
                      <path
                        d="M0 60 C 60 40, 120 90, 180 55 S 260 20, 300 45"
                        fill="none"
                        stroke="#cfd9d4"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 0 C 50 60, 30 120, 70 180"
                        fill="none"
                        stroke="#cfd9d4"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M110 0 C 130 50, 100 100, 140 180"
                        fill="none"
                        stroke="#cfd9d4"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M0 120 C 80 110, 160 150, 300 110"
                        fill="none"
                        stroke="#cfd9d4"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M220 0 C 200 60, 240 100, 210 180"
                        fill="none"
                        stroke="#cfd9d4"
                        strokeWidth="1.5"
                      />
                    </svg>

                    {data.topLocations.map((loc) => {
                      const matched = filteredLocations.some(
                        (l) => l.name === loc.name,
                      );
                      return (
                        <div
                          key={loc.name}
                          className="absolute flex flex-col items-center transition-opacity"
                          style={{
                            left: `${loc.x}%`,
                            top: `${loc.y}%`,
                            transform: "translate(-50%,-50%)",
                            opacity: matched ? 1 : 0.25,
                          }}
                          title={`${loc.name}: ${loc.count} jobs`}
                        >
                          <div
                            className="flex items-center justify-center rounded-full text-white text-[9px] font-bold shrink-0"
                            style={{
                              width: 20,
                              height: 20,
                              background: T.blue,
                              border: "2px solid #fff",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                            }}
                          >
                            {String(loc.count).padStart(2, "0")}
                          </div>
                          <div
                            className="text-[9px] font-semibold whitespace-nowrap mt-0.5"
                            style={{
                              color: T.text,
                              textShadow:
                                "0 1px 2px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.9)",
                            }}
                          >
                            {loc.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1.5 shrink-0 truncate">
                    {q
                      ? filteredLocations.length
                        ? filteredLocations.map((l) => l.name).join(" · ")
                        : "No locations match your search"
                      : data.topLocations.map((l) => l.name).join(" · ")}
                  </div>
                </Card>
              </div>

              {}
              <div className="grid grid-cols-4 gap-4 items-stretch">
                <Card title="Account Status" icon={Wallet} expandable>
                  <div
                    className="rounded-xl p-4 flex-1 flex flex-col justify-center mb-3"
                    style={{ background: T.teal }}
                  >
                    <span className="text-white/70 text-xs">
                      Available Balance
                    </span>
                    <span className="text-white text-2xl font-bold mt-0.5">
                      {inr(data.accountStatus.availableBalance)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] shrink-0">
                    <div
                      className="rounded-lg border py-2 px-1"
                      style={{ borderColor: "#000" }}
                    >
                      <div className="flex items-center justify-center gap-1 text-gray-400">
                        <ImageIcon size={11} />
                        Total Spent
                      </div>
                      <div
                        className="font-bold mt-0.5"
                        style={{ color: T.text }}
                      >
                        {inr(data.accountStatus.totalSpent)}
                      </div>
                    </div>
                    <div
                      className="rounded-lg border py-2 px-1"
                      style={{ borderColor: "#000" }}
                    >
                      <div className="flex items-center justify-center gap-1 text-gray-400">
                        <Flag size={11} />
                        Job Done
                      </div>
                      <div
                        className="font-bold mt-0.5"
                        style={{ color: T.text }}
                      >
                        {data.accountStatus.jobsDone}
                      </div>
                    </div>
                    <div
                      className="rounded-lg border py-2 px-1"
                      style={{ borderColor: "#000" }}
                    >
                      <div className="flex items-center justify-center gap-1 text-gray-400">
                        <Wallet size={11} />
                        Per Unit Cost
                      </div>
                      <div
                        className="font-bold mt-0.5"
                        style={{ color: T.text }}
                      >
                        {inr(data.accountStatus.perUnitCost)}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card
                  title="Call Status Details"
                  expandable
                  className="col-span-2"
                >
                  <div className="flex-1 min-h-0" style={{ minHeight: 160 }}>
                    <ResponsiveContainer>
                      <BarChart data={data.callStatusDetails} barGap={2}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={T.border}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          tick={{ fontSize: 11 }}
                          stroke={T.subtext}
                        />
                        <YAxis tick={{ fontSize: 11 }} stroke={T.subtext} />
                        <Tooltip />
                        <Bar
                          dataKey="pending"
                          fill={T.amber}
                          radius={[2, 2, 0, 0]}
                        />
                        <Bar
                          dataKey="partPending"
                          fill={T.teal}
                          radius={[2, 2, 0, 0]}
                        />
                        <Bar
                          dataKey="closed"
                          fill={T.green}
                          radius={[2, 2, 0, 0]}
                        />
                        <Bar
                          dataKey="cancelled"
                          fill={T.red}
                          radius={[2, 2, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 shrink-0">
                    <Dot color={T.amber} label="Pending calls" />
                    <Dot color={T.teal} label="Part Pending" />
                    <Dot color={T.green} label="Closed calls" />
                    <Dot color={T.red} label="Cancelled calls" />
                  </div>
                </Card>

                <div className="flex flex-col gap-4 h-full">
                  <Card title="Top 5 Technicians" expandable>
                    <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                    <div className="flex gap-2 items-stretch">
                      <div
                        ref={techListRef}
                        onScroll={updateTechThumb}
                        className="space-y-2 flex-1 overflow-y-auto pr-1 no-scrollbar"
                        style={{ maxHeight: 140, scrollbarWidth: "none" }}
                      >
                        {filteredTechnicians.length === 0 && (
                          <div className="text-xs text-gray-400 py-2">
                            No technicians match your search
                          </div>
                        )}
                        {filteredTechnicians.map((t) => (
                          <div
                            key={t.id}
                            className="rounded-lg p-2.5 text-white text-xs"
                            style={{ background: T.tealDarker }}
                          >
                            <div className="flex items-center justify-between font-semibold">
                              <span>{t.id}</span>
                              <span className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={9}
                                    fill={i < t.rating ? "#f2c94c" : "none"}
                                    stroke="#f2c94c"
                                  />
                                ))}
                              </span>
                            </div>
                            <div className="text-white/60 mt-0.5">
                              Job count · {t.jobCount}
                            </div>
                            <div className="text-white/60">
                              Location - {t.location}
                            </div>
                          </div>
                        ))}
                      </div>
                      {}
                      <div
                        className="relative w-1.5 rounded-full shrink-0"
                        style={{ background: "#e7edf0" }}
                      >
                        <div
                          className="absolute left-0 w-1.5 rounded-full transition-[top,height]"
                          style={{
                            top: `${techThumb.top}%`,
                            height: `${techThumb.height}%`,
                            background: T.teal,
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                  <Card title="Active States" expandable>
                    <div
                      className="rounded-lg p-2 text-white text-xs mb-2 flex items-center justify-between"
                      style={{ background: T.teal }}
                    >
                      Active Cities{" "}
                      <span className="font-bold">
                        {data.activeStates.activeCities}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[11px]">
                      <div
                        className="flex-1 rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-400">Active Pincodes</div>
                        <div className="font-bold" style={{ color: T.text }}>
                          {data.activeStates.activePincodes}
                        </div>
                      </div>
                      <div
                        className="flex-1 rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-400">Opportunity Missed</div>
                        <div className="font-bold" style={{ color: T.red }}>
                          {data.activeStates.opportunityMissed}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;