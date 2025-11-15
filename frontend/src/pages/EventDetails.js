// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import {
//   Calendar,
//   MapPin,
//   User,
//   ArrowLeft,
//   CheckCircle,
//   Lock,
// } from "lucide-react";
// import { isAuthenticated, getUserRole } from "@/utils/auth";
// import { toast, Toaster } from "sonner";
// import RegisterModal from "@/components/RegisterModal";

// const EventDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     date: "",
//     description: "",
//     category: "",
//     image: "",
//     location: "",
//     organizer: "",
//     department: "",
//   });

//   // ✅ Fetch event details directly by ID
//   const fetchEvent = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/events/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch event");
//       const data = await res.json();
//       setEvent(data);
//       setFormData({
//         name: data.name || data.title || "",
//         date: data.date || "",
//         description: data.description || "",
//         category: data.category || "",
//         image: data.image || "",
//         location: data.location || "",
//         organizer: data.organizer || "",
//         department: data.department || "",
//       });
//     } catch (err) {
//       console.error("Error fetching event:", err);
//       toast.error("Failed to fetch event details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Initialization
//   useEffect(() => {
//     setIsLoggedIn(isAuthenticated());
//     setUserRole(getUserRole());
//     setIsVisible(true);
//     fetchEvent();
//   }, [id]);

//   // ✅ Handle input changes (edit modal)
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Save edits to backend
//   const handleEditSave = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/events/${event._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const updated = await res.json();
//         setEvent(updated);
//         setShowEditModal(false);
//         toast.success("Event updated successfully!");
//       } else {
//         toast.error("Failed to update event.");
//       }
//     } catch (err) {
//       console.error("Error updating event:", err);
//       toast.error("Error updating event.");
//     }
//   };

//   // ✅ Delete event
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;

//     try {
//       const res = await fetch(`${API_BASE_URL}/events/${event._id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         toast.success("Event deleted successfully!");
//         navigate("/events");
//       } else {
//         toast.error("Failed to delete event.");
//       }
//     } catch (err) {
//       console.error("Error deleting event:", err);
//       toast.error("Error deleting event.");
//     }
//   };

//   // ✅ Register button handler
//   const handleRegister = () => {
//     if (!isLoggedIn) {
//       toast.error("Please login to register for events");
//       return;
//     }
//     if (userRole === "Student") {
//       setShowRegisterModal(true);
//     } else {
//       toast.info("Only students can register for events");
//     }
//   };

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
//         Loading event details...
//       </div>
//     );
//   }

//   // ✅ Access restriction for guests
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen gradient-bg">
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center px-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             className="glass-card p-12 text-center max-w-md"
//           >
//             <div className="mb-6 flex justify-center">
//               <div className="p-4 bg-yellow-400/20 rounded-full">
//                 <Lock className="text-yellow-400" size={48} />
//               </div>
//             </div>
//             <h2 className="text-3xl font-bold mb-4">Access Restricted</h2>
//             <p className="text-gray-300 mb-8 leading-relaxed">
//               Please login as Student or Organizer to view event details.
//             </p>
//             <button
//               onClick={() => navigate("/events")}
//               className="btn-secondary"
//             >
//               Back to Events
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="min-h-screen gradient-bg flex items-center justify-center">
//         <p className="text-2xl text-gray-400">Event not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen gradient-bg">
//       <Toaster position="top-right" richColors />
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative h-[60vh] overflow-hidden">
//         <motion.div
//           initial={{ scale: 1.2, opacity: 0 }}
//           animate={{ scale: isVisible ? 1 : 1.2, opacity: isVisible ? 1 : 0 }}
//           transition={{ duration: 1 }}
//           className="absolute inset-0"
//         >
//           <img
//             src={
//               event.image ||
//               "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
//             }
//             alt={event.name}
//             className="w-full h-full object-cover"
//             style={{ filter: "brightness(0.4)" }}
//           />
//         </motion.div>

//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           onClick={() => navigate("/events")}
//           className="absolute top-24 left-8 glass-card px-4 py-2 flex items-center gap-2"
//         >
//           <ArrowLeft size={20} />
//           <span>Back to Events</span>
//         </motion.button>

//         <div className="absolute bottom-0 p-8 w-full text-center text-white">
//           <h1 className="text-5xl font-bold">{event.name}</h1>
//           <p className="text-gray-300 mt-2">{event.category}</p>
//         </div>
//       </section>

//       {/* Event Info Section */}
//       <section className="py-16 px-4">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 glass-card p-8">
//             <h2 className="text-3xl font-bold mb-4">About This Event</h2>
//             <p className="text-gray-300 mb-6">{event.description}</p>

//             {event.highlights?.length > 0 && (
//               <>
//                 <h3 className="text-2xl font-semibold mb-4 mt-8">
//                   Event Highlights
//                 </h3>
//                 <ul className="space-y-3">
//                   {event.highlights.map((h, i) => (
//                     <li key={i} className="flex items-start gap-3">
//                       <CheckCircle
//                         className="text-yellow-400 flex-shrink-0 mt-1"
//                         size={20}
//                       />
//                       <span className="text-gray-300">{h}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="glass-card p-8">
//             <h3 className="text-2xl font-bold mb-6">Event Details</h3>
//             <div className="space-y-4">
//               <p>
//                 <Calendar className="inline text-yellow-400 mr-2" size={20} />
//                 {new Date(event.date).toLocaleDateString()}
//               </p>
//               <p>
//                 <MapPin className="inline text-yellow-400 mr-2" size={20} />
//                 {event.location}
//               </p>
//               <p>
//                 <User className="inline text-yellow-400 mr-2" size={20} />
//                 {event.organizer}
//               </p>
//             </div>

//             {userRole === "Student" && (
//               <button
//                 onClick={handleRegister}
//                 className="w-full mt-8 btn-primary"
//               >
//                 Register Now
//               </button>
//             )}

//             {userRole === "Organizer" && (
//               <div className="mt-8 space-y-4 text-center">
//                 <p className="text-sm text-blue-300">
//                   You are viewing this as an Organizer
//                 </p>
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={() => setShowEditModal(true)}
//                     className="btn-secondary"
//                   >
//                     ✏️ Edit
//                   </button>
//                   <button onClick={handleDelete} className="btn-danger">
//                     🗑️ Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="glass-card p-8 w-full max-w-lg">
//             <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
//             <div className="space-y-4">
//               {Object.keys(formData).map((field) => (
//                 <div key={field}>
//                   <label className="block text-gray-300 mb-1 capitalize">
//                     {field}
//                   </label>
//                   <input
//                     type="text"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="btn-secondary"
//               >
//                 Cancel
//               </button>
//               <button onClick={handleEditSave} className="btn-primary">
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Register Modal */}
//       <RegisterModal
//         isOpen={showRegisterModal}
//         onClose={() => setShowRegisterModal(false)}
//         eventId={id}
//       />

//       <Footer />
//     </div>
//   );
// };

// export default EventDetails;










import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  MapPin,
  User,
  ArrowLeft,
  CheckCircle,
  Lock,
} from "lucide-react";
import { isAuthenticated, getUserRole } from "@/utils/auth";
import { toast, Toaster } from "sonner";
import RegisterModal from "@/components/RegisterModal";
import API_BASE_URL from "@/config/api";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    category: "",
    image: "",
    location: "",
    organizer: "",
    department: "",
  });

  // ✅ Fetch event details directly by ID
  const fetchEvent = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/${id}`);
      if (!res.ok) throw new Error("Failed to fetch event");
      const data = await res.json();
      setEvent(data);
      setFormData({
        name: data.name || data.title || "",
        date: data.date || "",
        description: data.description || "",
        category: data.category || "",
        image: data.image || "",
        location: data.location || "",
        organizer: data.organizer || "",
        department: data.department || "",
      });
    } catch (err) {
      console.error("Error fetching event:", err);
      toast.error("Failed to fetch event details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initialization
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setUserRole(getUserRole());
    setIsVisible(true);
    fetchEvent();
  }, [id]);

  // ✅ Handle input changes (edit modal)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save edits to backend
  const handleEditSave = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/${event._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setEvent(updated);
        setShowEditModal(false);
        toast.success("Event updated successfully!");
      } else {
        toast.error("Failed to update event.");
      }
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Error updating event.");
    }
  };

  // ✅ Delete event
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/events/${event._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Event deleted successfully!");
        navigate("/events");
      } else {
        toast.error("Failed to delete event.");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Error deleting event.");
    }
  };

  // ✅ Register button handler
  const handleRegister = () => {
    if (!isLoggedIn) {
      toast.error("Please login to register for events");
      return;
    }
    if (userRole === "Student") {
      setShowRegisterModal(true);
    } else {
      toast.info("Only students can register for events");
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
        Loading event details...
      </div>
    );
  }

  // ✅ Access restriction for guests
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 text-center max-w-md"
          >
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-yellow-400/20 rounded-full">
                <Lock className="text-yellow-400" size={48} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Access Restricted</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Please login as Student or Organizer to view event details.
            </p>
            <button
              onClick={() => navigate("/events")}
              className="btn-secondary"
            >
              Back to Events
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <p className="text-2xl text-gray-400">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Toaster position="top-right" richColors />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 1.2, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={
              event.image ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            }
            alt={event.name}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4)" }}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => navigate("/events")}
          className="absolute top-24 left-8 glass-card px-4 py-2 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Events</span>
        </motion.button>

        <div className="absolute bottom-0 p-8 w-full text-center text-white">
          <h1 className="text-5xl font-bold">{event.name}</h1>
          <p className="text-gray-300 mt-2">{event.category}</p>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-8">
            <h2 className="text-3xl font-bold mb-4">About This Event</h2>
            <p className="text-gray-300 mb-6">{event.description}</p>

            {event.highlights?.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  Event Highlights
                </h3>
                <ul className="space-y-3">
                  {event.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        className="text-yellow-400 flex-shrink-0 mt-1"
                        size={20}
                      />
                      <span className="text-gray-300">{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">Event Details</h3>
            <div className="space-y-4">
              <p>
                <Calendar className="inline text-yellow-400 mr-2" size={20} />
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <MapPin className="inline text-yellow-400 mr-2" size={20} />
                {event.location}
              </p>
              <p>
                <User className="inline text-yellow-400 mr-2" size={20} />
                {event.organizer}
              </p>
            </div>

            {userRole === "Student" && (
              <button
                onClick={handleRegister}
                className="w-full mt-8 btn-primary"
              >
                Register Now
              </button>
            )}

            {userRole === "Organizer" && (
              <div className="mt-8 space-y-4 text-center">
                <p className="text-sm text-blue-300">
                  You are viewing this as an Organizer
                </p>
                <div className="flex gap-3 justify-center mt-4">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="btn-secondary btn-small"
                  >
                    ✏️ Edit
                  </button>
                  <button onClick={handleDelete} className="btn-danger btn-small">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass-card p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
            <div className="space-y-4">
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  <label className="block text-gray-300 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-secondary btn-small"
              >
                Cancel
              </button>
              <button onClick={handleEditSave} className="btn-primary btn-small">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        eventId={id}
      />

      <Footer />
    </div>
  );
};

export default EventDetails;
