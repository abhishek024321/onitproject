import { useState } from "react";
import { Star, Phone, CalendarCheck, Check, ShieldCheck, ShieldAlert, BadgeCheck, XCircle, Award } from "lucide-react";
import { T } from "../constants/theme";
import heroBanner from "../assets/mobile_banner.png";

export function TechnicianRow({ technician }) {
  const { id, rating, jobCount, location, phone, kyc, certified, certifiedFor, skills } = technician;
  const [revealed, setRevealed] = useState(false);
  const [booked, setBooked] = useState(false);
  const kycVerified = kyc === "verified";

  return (
    <div
      className="rounded-lg overflow-hidden text-white text-[16px] flex"
      style={{ background: T.tealDarker }}
    >
      <img
        src={heroBanner}
        alt={id}
        className="hidden sm:block sm:w-28 shrink-0 self-stretch object-contain"
        style={{ background: T.tealDarker }}
      />

      <div className="flex-1 min-w-0 p-2.5">
        <div className="flex items-center justify-between font-bold">
          <span>{id}</span>
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={9}
                fill={i < rating ? "#f2c94c" : "none"}
                stroke="#f2c94c"
              />
            ))}
          </span>
        </div>
        <div className="text-white/60 mt-0.5">Job count · {jobCount}</div>
        <div className="text-white/60">Location - {location}</div>

        <div className="flex items-center gap-1.5 flex-wrap mt-1">
          <span
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[13px] font-bold"
            style={{
              background: certified ? "rgba(47,168,118,0.18)" : "rgba(226,85,79,0.18)",
              color: certified ? T.green : T.red,
            }}
          >
            {certified ? <BadgeCheck size={9} /> : <XCircle size={9} />}
            {certified ? "Certified" : "Not Certified"}
          </span>
          <span
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[13px] font-bold"
            style={{
              background: kycVerified ? "rgba(47,168,118,0.18)" : "rgba(226,85,79,0.18)",
              color: kycVerified ? T.green : T.red,
            }}
          >
            {kycVerified ? <ShieldCheck size={9} /> : <ShieldAlert size={9} />}
            {kycVerified ? "KYC Verified" : "KYC Pending"}
          </span>
        </div>

        {certified && certifiedFor && (
          <div className="flex items-center gap-1 mt-1 text-[13px] text-white/80 font-semibold">
            <Award size={11} style={{ color: "#f2c94c" }} />
            Certified For: {certifiedFor}
          </div>
        )}

        {skills?.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-1.5 py-0.5 rounded-md text-[12px] font-bold text-white/85"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <a
            href={revealed ? `tel:${phone}` : undefined}
            onClick={(e) => {
              if (!revealed) {
                e.preventDefault();
                setRevealed(true);
              }
            }}
            className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[16px] font-bold px-2 py-1 rounded-md transition-colors"
          >
            <Phone size={10} />
            {revealed ? phone : "View Number"}
          </a>
          <button
            type="button"
            onClick={() => setBooked(true)}
            disabled={booked}
            className="inline-flex items-center gap-1 text-white text-[16px] font-bold px-2 py-1 rounded-md transition-colors disabled:cursor-default"
            style={{ background: booked ? T.green : T.blue }}
          >
            {booked ? <Check size={10} /> : <CalendarCheck size={10} />}
            {booked ? "Requested" : "Book Service"}
          </button>
        </div>
      </div>
    </div>
  );
}