// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Download } from "lucide-react";
// import { toast } from "sonner";

// const toCSV = (rows) => {
//   if (!rows || rows.length === 0) return "";
//   const headers = [
//     "name",
//     "email",
//     "phone",
//     "college",
//     "department",
//     "year",
//     "timestamp",
//   ];
//   const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
//   const head = headers.map(esc).join(",");
//   const body = rows
//     .map((r) => headers.map((h) => esc(r[h])).join(","))
//     .join("\n");
//   return `${head}\n${body}`;
// };

// const downloadCSV = (rows, filename = "registrants.csv") => {
//   const csv = toCSV(rows);
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.setAttribute("download", filename);
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };

// const RegistrantsModal = ({ isOpen, onClose, eventId, eventTitle }) => {
//   const [loading, setLoading] = useState(true);
//   const [registrants, setRegistrants] = useState([]);

//   useEffect(() => {
//     if (!isOpen) return;
//     const load = async () => {
//       setLoading(true);
//       try {
//         // Prefer the lightweight endpoint if you added it:
//         let res = await fetch(`http://127.0.0.1:8000/events/${eventId}/registrations`);
//         if (res.status === 404) {
//           // fallback to full event in case alias isn’t present
//           res = await fetch(`http://127.0.0.1:8000/events/${eventId}`);
//           const full = await res.json();
//           setRegistrants(full.registrations || []);
//         } else {
//           const data = await res.json();
//           setRegistrants(Array.isArray(data) ? data : []);
//         }
//       } catch (e) {
//         toast.error("Failed to load registrants");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [isOpen, eventId]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
//           >
//             <div className="glass-card w-full max-w-5xl p-6 relative">
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-white"
//               >
//                 <X size={24} />
//               </button>

//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-bold">
//                   Registrants — <span className="text-yellow-400">{eventTitle}</span>
//                 </h2>
//                 <button
//                   onClick={() =>
//                     registrants.length
//                       ? downloadCSV(registrants, `${eventTitle || "event"}-registrants.csv`)
//                       : toast.info("No data to export")
//                   }
//                   className="btn-secondary flex items-center gap-2"
//                   title="Export CSV"
//                 >
//                   <Download size={18} />
//                   Export CSV
//                 </button>
//               </div>

//               {loading ? (
//                 <div className="py-16 text-center text-gray-300">Loading…</div>
//               ) : registrants.length === 0 ? (
//                 <div className="py-16 text-center text-gray-400">
//                   No students have registered yet.
//                 </div>
//               ) : (
//                 <div className="overflow-auto border border-white/10 rounded-xl">
//                   <table className="min-w-full text-left">
//                     <thead className="bg-white/5">
//                       <tr className="text-sm text-gray-300">
//                         <th className="px-4 py-3">#</th>
//                         <th className="px-4 py-3">Name</th>
//                         <th className="px-4 py-3">Email</th>
//                         <th className="px-4 py-3">Mobile</th>
//                         <th className="px-4 py-3">College</th>
//                         <th className="px-4 py-3">Dept</th>
//                         <th className="px-4 py-3">Year</th>
//                         <th className="px-4 py-3">Registered At</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {registrants.map((r, idx) => (
//                         <tr key={idx} className="border-t border-white/10 text-sm">
//                           <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
//                           <td className="px-4 py-3">{r.name || "-"}</td>
//                           <td className="px-4 py-3">{r.email || "-"}</td>
//                           <td className="px-4 py-3">{r.phone || "-"}</td>
//                           <td className="px-4 py-3">{r.college || "-"}</td>
//                           <td className="px-4 py-3">{r.department || "-"}</td>
//                           <td className="px-4 py-3">{r.year || "-"}</td>
//                           <td className="px-4 py-3">
//                             {r.timestamp
//                               ? new Date(r.timestamp).toLocaleString()
//                               : "-"}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default RegistrantsModal;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { toast } from "sonner";
import API_BASE_URL from "@/config/api";

const toCSV = (rows) => {
  if (!rows || rows.length === 0) return "";
  const headers = [
    "name",
    "email",
    "phone",
    "college",
    "department",
    "year",
    "timestamp",
  ];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = headers.map(esc).join(",");
  const body = rows
    .map((r) => headers.map((h) => esc(r[h])).join(","))
    .join("\n");
  return `${head}\n${body}`;
};

const downloadCSV = (rows, filename = "registrants.csv") => {
  const csv = toCSV(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const RegistrantsModal = ({ isOpen, onClose, eventId, eventTitle }) => {
  const [loading, setLoading] = useState(true);
  const [registrants, setRegistrants] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const load = async () => {
      setLoading(true);
      try {
        let res = await fetch(`${API_BASE_URL}/events/${eventId}/registrations`);
        if (res.status === 404) {
          res = await fetch(`${API_BASE_URL}/events/${eventId}`);
          const full = await res.json();
          setRegistrants(full.registrations || []);
        } else {
          const data = await res.json();
          setRegistrants(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        toast.error("Failed to load registrants");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isOpen, eventId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
          >
            <div className="glass-card w-full max-w-5xl p-6 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              >
                <X size={20} />
              </button>

              {/* Header with smaller Export Button */}
              <div className="flex items-center justify-between mb-4 pr-10">
                <h2 className="text-2xl font-bold">
                  Registrants —{" "}
                  <span className="text-yellow-400">{eventTitle}</span>
                </h2>

                <button
                  onClick={() =>
                    registrants.length
                      ? downloadCSV(
                          registrants,
                          `${eventTitle || "event"}-registrants.csv`
                        )
                      : toast.info("No data to export")
                  }
                  className="btn-secondary flex items-center gap-1 px-3 py-1.5 text-xs rounded-full"
                  title="Export CSV"
                >
                  <Download size={14} />
                  Export
                </button>
              </div>

              {/* Loading / Data Table */}
              {loading ? (
                <div className="py-16 text-center text-gray-300">Loading…</div>
              ) : registrants.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  No students have registered yet.
                </div>
              ) : (
                <div className="overflow-auto border border-white/10 rounded-xl">
                  <table className="min-w-full text-left">
                    <thead className="bg-white/5">
                      <tr className="text-sm text-gray-300">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Mobile</th>
                        <th className="px-4 py-3">College</th>
                        <th className="px-4 py-3">Dept</th>
                        <th className="px-4 py-3">Year</th>
                        <th className="px-4 py-3">Registered At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrants.map((r, idx) => (
                        <tr key={idx} className="border-t border-white/10 text-sm">
                          <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                          <td className="px-4 py-3">{r.name || "-"}</td>
                          <td className="px-4 py-3">{r.email || "-"}</td>
                          <td className="px-4 py-3">{r.phone || "-"}</td>
                          <td className="px-4 py-3">{r.college || "-"}</td>
                          <td className="px-4 py-3">{r.department || "-"}</td>
                          <td className="px-4 py-3">{r.year || "-"}</td>
                          <td className="px-4 py-3">
                            {r.timestamp
                              ? new Date(r.timestamp).toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrantsModal;
