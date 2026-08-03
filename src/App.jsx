import "./App.css";
import { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import {
  LayoutGrid,
  Users,
  UserCircle2,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  AlertTriangle,
  MapPin,
  Star,
  Calendar,
  Filter as FilterIcon,
  Image as ImageIcon,
  Flag,
  ThumbsUp,
  Wallet,
} from "lucide-react";

import { LOGO_SRC } from "./constants/logo";
import { FILTER_OPTIONS } from "./constants/filters";
import { T, HC_BASE, PIE_JOBS, PIE_TECH } from "./constants/theme";
import { inr } from "./utils/format";
import { fetchDashboardData } from "./utils/mockData";
import { LocationsMap } from "./components/LocationsMap";
import { useTailwindCDN } from "./hooks/useTailwindCDN";
import { Select } from "./components/Select";
import { CustomDateRangeExtra } from "./components/CustomDateRangeExtra";
import { Card } from "./components/Card";
import { ExpandedCardModal } from "./components/ExpandedCardModal";
import { Dot } from "./components/Dot";
import { TechnicianRow } from "./components/TechnicianRow";
import { CallStatusDetailsCard } from "./components/CallStatusDetailsCard";

function App() {
  useTailwindCDN();
  const [tailwindReady, setTailwindReady] = useState(false);
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
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();
    const check = () => {
      if (cancelled) return;
      const ready =
        typeof window !== "undefined" &&
        (window.tailwind || document.querySelector('style[data-tailwind], style[id^="__tw"]'));
      if (ready || Date.now() - start > 4000) {
        setTailwindReady(true);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
    return () => {
      cancelled = true;
    };
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

  const filteredLocations = !data
    ? []
    : !q
      ? data.topLocations
      : data.topLocations.filter((l) => l.name.toLowerCase().includes(q));

  if (!tailwindReady) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#0d4f52",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <img
          src={LOGO_SRC}
          alt="OniT logo"
          style={{ height: 56, width: "auto", objectFit: "contain" }}
        />
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.25)",
            borderTopColor: "#ffffff",
            animation: "onit-spin 0.8s linear infinite",
          }}
        />
        <div style={{ color: "#ffffff", fontSize: 14, fontWeight: 700 }}>
          Loading dashboard…
        </div>
        <style>{`@keyframes onit-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen grid"
      style={{
        background: "linear-gradient(180deg, #4fa8d6 0%, #8fcbe6 18%, #c9e6f2 38%, #eaf5f9 62%, #f6fafb 100%)",
        fontFamily: "Inter, system-ui, sans-serif",
        gridTemplateColumns: "22rem 1fr",
      }}
    >
      {}
      <aside
        className="flex flex-col shrink-0 sticky top-0 h-screen self-start"
        style={{
          background: `linear-gradient(180deg, ${T.teal} 0%, ${T.sidebar} 45%, ${T.sidebar} 100%)`,
        }}
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
              className="h-24 w-auto object-contain pointer-events-none"
            />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-4 mt-4">
          {navItems.map((item) => {
            const active = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className="w-full flex items-center gap-4 px-4 py-5 rounded-lg text-[22px] font-bold transition-colors"
                style={{
                  background: active ? T.sidebarActive : "transparent",
                  color: active ? "#fff" : "#a9c4c5",
                }}
              >
                <item.icon size={25} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-3 pb-14">
          <button
            className="w-full flex items-center gap-4 px-4 py-5 rounded-lg text-[22px] font-bold"
            style={{ color: "#a9c4c5" }}
          >
            <LogOut size={25} />
            Logout
          </button>
        </div>
      </aside>

      {}
      <main className="min-w-0 overflow-x-hidden flex flex-col h-full">
        {}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0 sticky top-0 z-10"
          style={{ background: T.teal }}
        >
          <h1 className="text-[23px] font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-4 relative">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[16px]">
              <Search size={20} className="text-gray-800 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="outline-none bg-transparent text-gray-700 placeholder-gray-400 w-32 sm:w-44 font-bold"
              />
            </div>
            <div
              className="px-4 py-2 rounded-full bg-white text-[16px] font-bold"
              style={{ color: T.text }}
            >
              {data?.company || "—"}
            </div>
          </div>
        </div>

        <div className="p-5 flex-1 min-h-0 h-full flex flex-col">
          <div
            className="flex flex-nowrap items-center gap-9 mb-6 bg-white rounded-xl border shadow-sm p-4"
            style={{ borderColor: T.cardBorder }}
          >
            <Select
              icon={Calendar}
              name="dateRange"
              value={pendingFilters.dateRange}
              options={FILTER_OPTIONS.dateRange}
              onChange={handleSelect}
              extra={(close) => (
                <CustomDateRangeExtra
                  onApply={(v) => handleSelect("dateRange", v)}
                  close={close}
                />
              )}
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
              className="flex items-center gap-2.5 px-7 py-[22px] rounded-full text-[19px] font-bold text-white shrink-0 hover:opacity-90 ml-auto"
              style={{ background: T.teal }}
            >
              <FilterIcon size={18} />
              Filter <ChevronDown size={18} />
            </button>
          </div>

          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-lg text-[16px]"
              style={{ background: "#fdecea", color: T.red }}
            >
              Couldn't load dashboard data: {error}
            </div>
          )}

          {!data ? (
            <div className="grid place-items-center py-24 text-gray-800 text-[16px] font-bold">
              Loading dashboard…
            </div>
          ) : (
            <div
              className={
                (loading
                  ? "opacity-50 pointer-events-none transition-opacity"
                  : "transition-opacity") + " flex flex-col flex-1 min-h-0"
              }
            >
              {}
              <div className="flex items-stretch gap-3 mb-6 mt-3 overflow-x-auto">
                {data.stats.map((s) => (
                  <Card key={s.key} className="flex-1 min-w-[140px] min-h-[120px] py-2">
                    <div
                      className="flex items-center gap-1.5 text-[16px] font-bold mb-1"
                      style={{ color: T.text }}
                    >
                      <s.icon size={13} style={{ color: T.teal }} />
                      {s.label}
                    </div>
                    <div className="text-[16px] text-gray-800 mb-1 min-h-[14px] font-bold">
                      {s.sub &&
                        (() => {
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
                    <div className="flex items-baseline gap-1.5 mt-auto">
                      <span
                        className="text-[20px] font-bold"
                        style={{ color: T.text }}
                      >
                        {s.value}
                      </span>
                      {s.change != null && (
                        <span
                          className="text-[17px] font-bold"
                          style={{ color: s.change >= 0 ? T.green : T.red }}
                        >
                          {s.change >= 0 ? "+" : ""}
                          {s.change}%
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
                <Card className="flex-1 min-w-[150px] min-h-[120px] py-2">
                  <div
                    className="flex items-center gap-1.5 text-[16px] font-bold mb-2"
                    style={{ color: T.text }}
                  >
                    <ThumbsUp size={13} style={{ color: T.teal }} /> NPS
                  </div>
                  <div className="flex gap-4 text-[16px] mt-auto">
                    <div>
                      <span className="text-gray-800 text-[16px] block font-bold">
                        Promoters
                      </span>
                      <span className="font-bold" style={{ color: T.green }}>
                        {data.nps.promotersPct}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-800 text-[16px] block font-bold">
                        Detectors
                      </span>
                      <span className="font-bold" style={{ color: T.red }}>
                        {data.nps.detractorsPct}%
                      </span>
                    </div>
                  </div>
                </Card>
                <Card className="flex-1 min-w-[170px] min-h-[120px] py-2">
                  <div
                    className="flex items-center gap-1.5 text-[16px] font-bold mb-2"
                    style={{ color: T.text }}
                  >
                    <AlertTriangle size={13} style={{ color: T.teal }} />{" "}
                    Attention
                  </div>
                  <div className="flex gap-3 text-[16px] mt-auto">
                    <div>
                      <span className="text-gray-800 text-[16px] block font-bold">
                        Repeat Bookings
                      </span>
                      <span className="font-bold">
                        {data.attention.repeatBookings}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-800 text-[16px] block font-bold">
                        Re-visit
                      </span>
                      <span className="font-bold" style={{ color: T.amber }}>
                        {data.attention.reVisit}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-800 text-[16px] block font-bold">
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
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6 items-stretch"
                style={{ gridAutoRows: "1fr" }}
              >
                <Card title="Jobs Overview" icon={LayoutGrid} expandable onExpand={setExpandedCard}>
                  <div className="flex-1 flex items-center justify-center min-h-0" style={{ minHeight: 320 }}>
                    <div style={{ width: 320, height: 320, position: "relative" }}>
                      <HighchartsReact
                        highcharts={Highcharts}
                        containerProps={{ style: { width: "100%", height: "100%" } }}
                        options={{
                          ...HC_BASE,
                          chart: { type: "pie", backgroundColor: "transparent", margin: [0, 0, 0, 0] },
                          tooltip: {
                            pointFormat: "{point.name}: <b>{point.y}</b>",
                          },
                          plotOptions: {
                            pie: {
                              innerSize: "61%",
                              borderWidth: 2,
                              borderColor: "#fff",
                              dataLabels: { enabled: false },
                            },
                          },
                          series: [
                            {
                              data: [
                                { name: "New", y: data.jobsOverview.new, color: PIE_JOBS[0] },
                                { name: "Assigned", y: data.jobsOverview.assigned, color: PIE_JOBS[1] },
                                { name: "Completed", y: data.jobsOverview.completed, color: PIE_JOBS[2] },
                                { name: "Cancelled", y: data.jobsOverview.cancelled, color: PIE_JOBS[3] },
                                { name: "Parts Pending", y: data.jobsOverview.partsPending, color: PIE_JOBS[4] },
                              ],
                            },
                          ],
                        }}
                      />
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                      >
                        <div className="text-[19px] text-gray-800 leading-tight font-bold">
                          Total Jobs
                        </div>
                        <div
                          className="text-[36px] font-bold leading-tight"
                          style={{ color: T.text }}
                        >
                          {data.jobsOverview.total}
                        </div>
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

                <Card title="Technicians Status" icon={Users} expandable onExpand={setExpandedCard}>
                  <div className="flex-1 min-h-0" style={{ minHeight: 96 }}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      containerProps={{ style: { width: "100%", height: "100%" } }}
                      options={{
                        ...HC_BASE,
                        chart: { type: "pie", backgroundColor: "transparent" },
                        tooltip: {
                          pointFormat: "{point.name}: <b>{point.y}</b>",
                        },
                        plotOptions: {
                          pie: {
                            borderWidth: 1,
                            borderColor: "#fff",
                            dataLabels: {
                              enabled: true,
                              distance: -18,
                              format: "{point.y}",
                              style: {
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "16px",
                                textOutline: "none",
                              },
                            },
                          },
                        },
                        series: [
                          {
                            data: [
                              { name: "Active", y: data.techniciansStatus.active, color: PIE_TECH[0] },
                              { name: "New added", y: data.techniciansStatus.newAdded, color: PIE_TECH[1] },
                              { name: "Inactive", y: data.techniciansStatus.inactive, color: PIE_TECH[2] },
                              { name: "Blocked", y: data.techniciansStatus.blocked, color: PIE_TECH[3] },
                            ],
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 shrink-0">
                    <Dot color={PIE_TECH[0]} label="Active" />
                    <Dot color={PIE_TECH[1]} label="New added" />
                    <Dot color={PIE_TECH[2]} label="Inactive" />
                    <Dot color={PIE_TECH[3]} label="Blocked" />
                  </div>
                </Card>

                <Card title="Analyze Speed (Same day closure)" expandable onExpand={setExpandedCard}>
                  <div className="flex-1 min-h-0" style={{ minHeight: 140 }}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      containerProps={{ style: { width: "100%", height: "100%" } }}
                      options={{
                        ...HC_BASE,
                        chart: {
                          type: "areaspline",
                          backgroundColor: "transparent",
                          spacing: [28, 8, 8, 0],
                        },
                        xAxis: {
                          categories: data.speedTrend.map((d) => d.label),
                          lineColor: T.border,
                          tickColor: T.border,
                          labels: { style: { fontSize: "14px", fontWeight: "700", color: "#1f2937" } },
                        },
                        yAxis: {
                          title: { text: "Hours", style: { fontSize: "13px", fontWeight: "700", color: "#1f2937" } },
                          min: 0,
                          max: 12,
                          tickInterval: 3,
                          gridLineDashStyle: "Dash",
                          gridLineColor: T.border,
                          labels: { style: { fontSize: "14px", fontWeight: "700", color: "#1f2937" } },
                        },
                        legend: { enabled: false },
                        tooltip: {
                          formatter: function () {
                            return `<b>${this.x}</b><br/>Avg time: ${this.y}h<br/>Closure rate: ${this.point.pct}%`;
                          },
                        },
                        plotOptions: {
                          areaspline: {
                            fillColor: {
                              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                              stops: [
                                [0, "rgba(74, 134, 214, 0.35)"],
                                [1, "rgba(74, 134, 214, 0)"],
                              ],
                            },
                            lineWidth: 2,
                            marker: {
                              enabled: true,
                              radius: 5,
                              fillColor: "#ffffff",
                              lineWidth: 2,
                              lineColor: T.blue,
                            },
                            dataLabels: {
                              enabled: true,
                              format: "{point.pct}%",
                              y: -14,
                              style: {
                                fontSize: "15px",
                                fontWeight: "800",
                                color: "#1f2937",
                                textOutline: "none",
                              },
                            },
                          },
                        },
                        series: [
                          {
                            name: "Avg time in hour",
                            data: data.speedTrend.map((d) => ({ y: d.hours, pct: d.pct })),
                            color: T.blue,
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className="mt-1.5 shrink-0 flex justify-center">
                    <Dot color={T.blue} label="Avg time in hour" />
                  </div>
                </Card>

                <Card
                  title="Top 5 Locations"
                  icon={MapPin}
                  expandable
                  onExpand={setExpandedCard}
                  expandedContent={
                    <LocationsMap
                      points={data.topLocations}
                      matchedNames={filteredLocations.map((l) => l.name)}
                      height={480}
                    />
                  }
                >
                  <div className="flex-1 min-h-0 rounded-lg relative overflow-hidden" style={{ minHeight: 96 }}>
                    <LocationsMap
                      points={data.topLocations}
                      matchedNames={filteredLocations.map((l) => l.name)}
                    />
                  </div>
                  <div className="text-[17px] text-gray-800 mt-1.5 shrink-0 truncate font-bold">
                    {q
                      ? filteredLocations.length
                        ? filteredLocations.map((l) => l.name).join(" · ")
                        : "No locations match your search"
                      : data.topLocations.map((l) => l.name).join(" · ")}
                  </div>
                </Card>
              </div>

              {}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch content-stretch flex-1 min-h-[220px]">
                <Card title="Account Status" icon={Wallet} expandable onExpand={setExpandedCard}>
                  <div
                    className="rounded-xl p-4 flex flex-col justify-center mb-3"
                    style={{ background: T.teal, minHeight: 280, height: 280 }}
                  >
                    <span className="text-white/70 text-[16px] font-bold">
                      Available Balance
                    </span>
                    <span className="text-white text-[27px] font-bold mt-0.5">
                      {inr(data.accountStatus.availableBalance)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-[17px] flex-1 min-h-0">
                    <div
                      className="rounded-lg border-2 px-2 flex flex-col items-center justify-center gap-2"
                      style={{ borderColor: "#000" }}
                    >
                      <div className="flex items-center justify-center gap-1.5 text-gray-800 font-bold text-[16px]">
                        <ImageIcon size={16} />
                        Total Spent
                      </div>
                      <div
                        className="font-bold text-[19px]"
                        style={{ color: T.text }}
                      >
                        {inr(data.accountStatus.totalSpent)}
                      </div>
                    </div>
                    <div
                      className="rounded-lg border-2 px-2 flex flex-col items-center justify-center gap-2"
                      style={{ borderColor: "#000" }}
                    >
                      <div className="flex items-center justify-center gap-1.5 text-gray-800 font-bold text-[16px]">
                        <Flag size={16} />
                        Job Done
                      </div>
                      <div
                        className="font-bold text-[19px]"
                        style={{ color: T.text }}
                      >
                        {data.accountStatus.jobsDone}
                      </div>
                    </div>
                    <div
                      className="rounded-lg border-2 px-2 flex flex-col items-center justify-center gap-2"
                      style={{ borderColor: "#000" }}
                    >
                      <div className="flex items-center justify-center gap-1.5 text-gray-800 font-bold text-[16px]">
                        <Wallet size={16} />
                        Per Unit Cost
                      </div>
                      <div
                        className="font-bold text-[19px]"
                        style={{ color: T.text }}
                      >
                        {inr(data.accountStatus.perUnitCost)}
                      </div>
                    </div>
                  </div>
                </Card>

                <CallStatusDetailsCard data={data} onExpand={setExpandedCard} />

                <div className="flex flex-col gap-5 h-full">
                  <Card
                    title="Top 5 Technicians"
                    expandable
                    onExpand={setExpandedCard}
                    expandedContent={
                      <div className="tech-scroll space-y-2 pr-1">
                        {filteredTechnicians.length === 0 && (
                          <div className="text-[16px] text-gray-800 py-2 font-bold">
                            No technicians match your search
                          </div>
                        )}
                        {filteredTechnicians.map((t) => (
                          <TechnicianRow key={t.id} technician={t} />
                        ))}
                      </div>
                    }
                  >
                    <style>{`
                      .tech-scroll::-webkit-scrollbar { width: 6px; }
                      .tech-scroll::-webkit-scrollbar-track { background: #e7edf0; border-radius: 9999px; }
                      .tech-scroll::-webkit-scrollbar-thumb { background: ${T.teal}; border-radius: 9999px; }
                    `}</style>
                    <div
                      className="tech-scroll space-y-2 overflow-y-auto pr-1"
                      style={{ maxHeight: 220, scrollbarWidth: "thin", scrollbarColor: `${T.teal} #e7edf0` }}
                    >
                      {filteredTechnicians.length === 0 && (
                        <div className="text-[16px] text-gray-800 py-2 font-bold">
                          No technicians match your search
                        </div>
                      )}
                      {filteredTechnicians.map((t) => (
                        <TechnicianRow key={t.id} technician={t} />
                      ))}
                    </div>
                  </Card>
                  <Card title="Active States" expandable onExpand={setExpandedCard}>
                    <div
                      className="rounded-lg p-2 text-white text-[16px] mb-2 flex items-center justify-between"
                      style={{ background: T.teal }}
                    >
                      Active Cities{" "}
                      <span className="font-bold">
                        {data.activeStates.activeCities}
                      </span>
                    </div>
                    <div className="flex gap-2 text-[17px]">
                      <div
                        className="flex-1 rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-800 font-bold">Active Pincodes</div>
                        <div className="font-bold" style={{ color: T.text }}>
                          {data.activeStates.activePincodes}
                        </div>
                      </div>
                      <div
                        className="flex-1 rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-800 font-bold">Opportunity Missed</div>
                        <div className="font-bold" style={{ color: T.red }}>
                          {data.activeStates.opportunityMissed}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[17px] mt-2">
                      <div
                        className="rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-800 font-bold">Previous Balance</div>
                        <div className="font-bold" style={{ color: T.text }}>
                          {data.activeStates.previousBalance != null
                            ? inr(data.activeStates.previousBalance)
                            : "—"}
                        </div>
                      </div>
                      <div
                        className="rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-800 font-bold">Upcoming Balance</div>
                        <div className="font-bold" style={{ color: T.green }}>
                          {data.activeStates.comingBalance != null
                            ? inr(data.activeStates.comingBalance)
                            : "—"}
                        </div>
                      </div>
                      <div
                        className="rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-800 font-bold">On Hold</div>
                        <div className="font-bold" style={{ color: T.amber }}>
                          {data.activeStates.onHold != null
                            ? inr(data.activeStates.onHold)
                            : "—"}
                        </div>
                      </div>
                      <div
                        className="rounded-lg p-2 bg-gray-50 text-center border"
                        style={{ borderColor: "#000" }}
                      >
                        <div className="text-gray-800 font-bold">Available Balance</div>
                        <div className="font-bold" style={{ color: T.text }}>
                          {inr(data.accountStatus.availableBalance)}
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
      <ExpandedCardModal
        card={expandedCard}
        onClose={() => setExpandedCard(null)}
      />
    </div>
  );
}


export default App;