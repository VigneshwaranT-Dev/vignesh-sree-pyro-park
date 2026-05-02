import { Phone, Mail, MapPin } from "lucide-react";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

function Footer() {
  return (
    <footer className="relative bg-[#020617] text-gray-300 rounded-xl mx-4 mt-10 overflow-hidden mb-4 border border-[#1e293b]">

      {/* 🔥 SUBTLE GRID OVERLAY */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:220px_220px]" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-10 grid md:grid-cols-[2fr_1fr_1fr] gap-10 text-center md:text-left">

        {/* 🔹 LEFT */}
        <div>
          <img
            src="/assets/logo/app-logo.png"
            alt="Sree Vignesh Pyro Park"
            className="h-32 md:h-40 mx-auto md:mx-0 mb-4"
          />

          <p className="text-sm text-gray-400 max-w-[420px] mx-auto md:mx-0 leading-relaxed">
            Sree Vignesh Pyro Park is a trusted direct factory outlet for
            premium festive crackers, sparklers, sky shots, and gift boxes.
            We deliver quality fireworks at the best value for your celebrations.
          </p>

          {/* 🔥 SOCIAL */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            {[BsFacebook, BsInstagram, BsWhatsapp].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full bg-[#0f172a] flex items-center justify-center
                border border-[#1e293b] hover:border-orange-500 hover:text-orange-400 transition"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 CENTER */}
        <div className="md:mt-10">
          <h4 className="text-white font-semibold mb-4 text-sm md:text-base">
            Site Map
          </h4>

          <ul className="space-y-3 text-sm text-gray-400">
            {["Home", "Shop", "Categories", "Offers", "Contact Us"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-orange-400 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 RIGHT */}
        <div className="md:mt-10">
          <h4 className="text-white font-semibold mb-4 text-sm md:text-base">
            Contact
          </h4>

          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MapPin size={16} className="text-orange-400" />
              Sivakasi, Tamil Nadu, India
            </li>

            <li className="flex items-center justify-center md:justify-start gap-2">
              <Phone size={16} className="text-orange-400" />
              +91 98765 43210
            </li>

            <li className="flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} className="text-orange-400" />
              support@sreevigneshpyropark.com
            </li>
          </ul>
        </div>
      </div>

      {/* 🔥 SAFETY SECTION */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 mt-6 mb-8">
        <h5 className="text-white font-semibold text-sm mb-2">
          Safety Guidelines:
        </h5>

        <p className="text-gray-400 text-sm leading-relaxed max-w-[1000px]">
          Fireworks should always be handled with care and used according to instructions.
          Store crackers in a cool, dry place away from heat sources. Use only in open areas
          under adult supervision. Keep away from children and never reuse damaged items.
          Celebrate responsibly — your safety is our priority.
        </p>
      </div>

      {/* 🔥 BOTTOM BAR */}
      <div className="bg-[#0f172a] border-t border-[#1e293b] text-gray-400 text-center py-3 text-xs md:text-sm">
        © 2026 Sree Vignesh Pyro Park. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;