type DirectoryMember = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  registered_business_name?: string | null;
  nzbn?: string | null;
  trading_name?: string | null;
  website?: string | null;
  business_email?: string | null;
  business_phone?: string | null;
  address?: string | null;
  description?: string | null;
  category?: string | null;
  logo_url?: string | null;
};

function getDisplayName(member: DirectoryMember) {
  const fullName = `${member.first_name || ""} ${member.last_name || ""}`.trim();
  if (fullName) return fullName;
  return member.registered_business_name || member.trading_name || "NZSME Member";
}

function getDisplayBusiness(member: DirectoryMember) {
  return (
    member.registered_business_name ||
    member.trading_name ||
    "Business details coming soon"
  );
}

function getShortDescription(text?: string | null) {
  if (!text) return "Profile details will be updated soon.";
  const clean = text.trim();
  if (clean.length <= 140) return clean;
  return `${clean.slice(0, 140)}...`;
}

function normaliseUrl(url?: string | null) {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) return trimmed;
  return `https://${trimmed}`;
}

export default function DirectoryCard({ member }: { member: DirectoryMember }) {
  const displayName = getDisplayName(member);
  const displayBusiness = getDisplayBusiness(member);
  const shortDescription = getShortDescription(member.description);
  const website = normaliseUrl(member.website);
  const contactEmail = member.business_email || member.email || "";
  const contactPhone = member.business_phone || member.phone || "";
  const category = member.category || "Other";

  // 🔥 SAFER LOGO HANDLING
  const logo =
    member.logo_url && member.logo_url.trim() !== ""
      ? member.logo_url
      : "https://bcalplmfxbvbbfbsoceo.supabase.co/storage/v1/object/public/logos/default-logo.png";

  return (
    <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">

      {/* TOP SECTION */}
      <div className="space-y-4">

        {/* HEADER */}
        <div className="flex items-start gap-4">

          {/* LOGO */}
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
            <img
              src={logo}
              alt={displayBusiness}
              className="w-full h-full object-contain p-3"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://bcalplmfxbvbbfbsoceo.supabase.co/storage/v1/object/public/logos/default-logo.png";
              }}
            />
          </div>

          {/* TEXT */}
          <div className="flex-1 min-w-0">

            {/* CATEGORY */}
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 px-2 py-1 rounded-md max-w-full truncate">
              {category}
            </span>

            {/* BUSINESS NAME */}
            <h3 className="mt-2 text-lg font-semibold text-slate-900 leading-snug group-hover:text-blue-700 transition">
              {displayBusiness}
            </h3>

            {/* PERSON */}
            <p className="text-sm text-slate-500">
              {displayName}
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-700 leading-relaxed min-h-[72px]">
          {shortDescription}
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-700">

        {website && (
          <p>
            <span className="text-slate-500">Website:</span>{" "}
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {member.website}
            </a>
          </p>
        )}

        {contactEmail && (
          <p>
            <span className="text-slate-500">Email:</span>{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-blue-600 hover:underline break-all"
            >
              {contactEmail}
            </a>
          </p>
        )}

        {contactPhone && (
          <p>
            <span className="text-slate-500">Phone:</span>{" "}
            <a
              href={`tel:${contactPhone.replace(/\s+/g, "")}`}
              className="text-blue-600 hover:underline"
            >
              {contactPhone}
            </a>
          </p>
        )}

        {member.address && (
          <p>
            <span className="text-slate-500">Location:</span>{" "}
            {member.address}
          </p>
        )}

        {member.nzbn && (
          <p>
            <span className="text-slate-500">NZBN:</span>{" "}
            {member.nzbn}
          </p>
        )}
      </div>
    </div>
  );
}