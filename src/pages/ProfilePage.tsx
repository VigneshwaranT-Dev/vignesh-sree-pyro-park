import { useState } from "react";

import {
  User,
  MapPin,
  Heart,
  ShoppingBag,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

import AddressesSection from "../components/profile/AddressesSection";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div
          className="
            w-full max-w-md

            rounded-3xl
            border border-white/10

            bg-[#0f172a]
            backdrop-blur-xl

            p-8 text-center
          "
        >
          <p className="text-2xl font-semibold text-white">Please Login</p>

          <p className="mt-3 text-gray-400 text-sm">
            Login to access your account and profile.
          </p>

          <button
            onClick={() => navigate("/")}
            className="
              mt-6

              h-[46px]
              px-6

              rounded-xl

              bg-gradient-to-r
              from-orange-500
              to-orange-600

              text-white
              font-medium

              shadow-[0_0_20px_rgba(255,115,0,0.35)]

              transition-all duration-300
            "
          >
            Go To Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* 🔥 SIDEBAR */}
          <div
            className="
              h-fit sticky top-24

              rounded-3xl
              border border-white/10

              bg-[#0f172a]/90
              backdrop-blur-2xl

              overflow-hidden
            "
          >
            {/* PROFILE TOP */}
            <div
              className="
                relative

                p-6

                border-b border-white/5
              "
            >
              {/* GLOW */}
              <div
                className="
                  absolute top-0 right-0
                  w-40 h-40
                  bg-orange-500/10
                  blur-[100px]
                "
              />

              <div className="relative z-10 flex items-center gap-4">
                {/* AVATAR */}
                <div
                  className="
                    h-16 w-16 rounded-2xl

                    bg-gradient-to-br
                    from-orange-400
                    to-orange-600

                    flex items-center justify-center

                    text-white
                    text-2xl
                    font-bold

                    shadow-[0_0_25px_rgba(255,115,0,0.35)]
                  "
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* INFO */}
                <div>
                  <p className="text-lg font-semibold text-white">
                    {user.name}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">{user.mobile}</p>
                </div>
              </div>
            </div>

            {/* MENU */}
            <div className="p-3">
              {/* PROFILE */}
              <button
                onClick={() => setActiveTab("profile")}
                className={`
                w-full
                h-[52px]

                flex items-center gap-3

                px-4

                rounded-2xl

                border border-transparent

                text-sm font-medium

                transition-all duration-300

                will-change-transform

                ${
                  activeTab === "profile"
                    ? `
                        bg-orange-500/10
                        border-orange-500/20
                        text-orange-300

                        shadow-[0_0_20px_rgba(255,115,0,0.08)]
                    `
                    : `
                        text-gray-300

                        hover:bg-white/5
                        hover:text-white
                    `
                }
                `}
              >
                <User size={18} />
                My Profile
              </button>

              {/* ORDERS */}
              <button
                onClick={() => setActiveTab("orders")}
                className={`
                w-full
                h-[52px]

                flex items-center gap-3

                px-4 mt-2

                rounded-2xl

                border border-transparent

                text-sm font-medium

                transition-all duration-300

                will-change-transform

                ${
                  activeTab === "orders"
                    ? `
                        bg-orange-500/10
                        border-orange-500/20
                        text-orange-300

                        shadow-[0_0_20px_rgba(255,115,0,0.08)]
                    `
                    : `
                        text-gray-300

                        hover:bg-white/5
                        hover:text-white
                    `
                }
                `}
              >
                <ShoppingBag size={18} />
                Orders
              </button>

              {/* ADDRESSES */}
              <button
                onClick={() => setActiveTab("addresses")}
                className={`
                w-full
                h-[52px]

                flex items-center gap-3

                px-4 mt-2

                rounded-2xl

                border border-transparent

                text-sm font-medium

                transition-all duration-300

                will-change-transform

                ${
                  activeTab === "addresses"
                    ? `
                        bg-orange-500/10
                        border-orange-500/20
                        text-orange-300

                        shadow-[0_0_20px_rgba(255,115,0,0.08)]
                    `
                    : `
                        text-gray-300

                        hover:bg-white/5
                        hover:text-white
                    `
                }
                `}
              >
                <MapPin size={18} />
                Addresses
              </button>

              {/* WISHLIST */}
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`
                w-full
                h-[52px]

                flex items-center gap-3

                px-4 mt-2

                rounded-2xl

                border border-transparent

                text-sm font-medium

                transition-all duration-300

                will-change-transform

                ${
                  activeTab === "wishlist"
                    ? `
                        bg-orange-500/10
                        border-orange-500/20
                        text-orange-300

                        shadow-[0_0_20px_rgba(255,115,0,0.08)]
                    `
                    : `
                        text-gray-300

                        hover:bg-white/5
                        hover:text-white
                    `
                }
                `}
              >
                <Heart size={18} />
                Wishlist
              </button>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="
                w-full
                h-[52px]

                flex items-center gap-3

                px-4 mt-2

                rounded-2xl

                border border-transparent

                text-red-400
                text-sm font-medium

                transition-all duration-300

                hover:bg-red-500/10
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* 🔥 RIGHT CONTENT */}
          <div className="space-y-6">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <>
                {/* PROFILE HERO */}
                <div
                  className="
                    relative overflow-hidden

                    rounded-3xl
                    border border-white/10

                    bg-[#0f172a]/90
                    backdrop-blur-2xl

                    p-8
                  "
                >
                  {/* GLOW */}
                  <div
                    className="
                      absolute top-0 right-0

                      w-[300px] h-[300px]

                      bg-orange-500/10
                      blur-[120px]
                    "
                  />

                  <div className="relative z-10">
                    <div
                      className="
                        inline-flex items-center gap-2

                        px-4 py-1.5

                        rounded-full

                        border border-orange-500/20
                        bg-orange-500/10

                        text-orange-300
                        text-sm
                      "
                    >
                      <ShieldCheck size={16} />
                      Verified Customer
                    </div>

                    <h1 className="mt-5 text-4xl font-bold text-white">
                      Welcome back, {user.name.split(" ")[0]}
                    </h1>

                    <p className="mt-3 text-gray-400 max-w-2xl leading-7">
                      Manage your account details, saved addresses, wishlist
                      items, and upcoming orders from your Vignesh Sree Pyro
                      Park profile dashboard.
                    </p>
                  </div>
                </div>

                {/* QUICK STATS */}
                <div className="grid sm:grid-cols-3 gap-5">
                  <div
                    className="
                      rounded-3xl
                      border border-white/10

                      bg-[#0f172a]/90
                      backdrop-blur-2xl

                      p-6
                    "
                  >
                    <p className="text-3xl font-bold text-white">
                      {wishlist.length}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">Wishlist Items</p>
                  </div>

                  <div
                    className="
                      rounded-3xl
                      border border-white/10

                      bg-[#0f172a]/90
                      backdrop-blur-2xl

                      p-6
                    "
                  >
                    <p className="text-3xl font-bold text-white">0</p>

                    <p className="mt-2 text-sm text-gray-400">Orders</p>
                  </div>

                  <div
                    className="
                      rounded-3xl
                      border border-white/10

                      bg-[#0f172a]/90
                      backdrop-blur-2xl

                      p-6
                    "
                  >
                    <p className="text-3xl font-bold text-white">0</p>

                    <p className="mt-2 text-sm text-gray-400">
                      Saved Addresses
                    </p>
                  </div>
                </div>

                {/* ACCOUNT DETAILS */}
                <div
                  className="
                    rounded-3xl
                    border border-white/10

                    bg-[#0f172a]/90
                    backdrop-blur-2xl

                    p-8
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        Account Information
                      </h2>

                      <p className="mt-2 text-sm text-gray-400">
                        Your profile and contact information
                      </p>
                    </div>

                    <button
                      className="
                        h-[42px]
                        px-5

                        rounded-xl

                        border border-orange-500/20
                        bg-orange-500/10

                        text-orange-300
                        text-sm font-medium

                        hover:bg-orange-500/15

                        transition
                      "
                    >
                      Edit Profile
                    </button>
                  </div>

                  {/* INFO GRID */}
                  <div className="grid sm:grid-cols-2 gap-5 mt-8">
                    <div>
                      <p className="text-sm text-gray-400">Full Name</p>

                      <p className="mt-2 text-white font-medium">{user.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Mobile Number</p>

                      <p className="mt-2 text-white font-medium">
                        {user.mobile}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Account Status</p>

                      <p className="mt-2 text-green-400 font-medium">Active</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Customer Type</p>

                      <p className="mt-2 text-white font-medium">
                        Retail Customer
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === "addresses" && <AddressesSection />}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div
                className="
                  rounded-3xl
                  border border-dashed border-white/10

                  bg-[#0f172a]/60

                  p-14 text-center
                "
              >
                <ShoppingBag size={50} className="mx-auto text-orange-400" />

                <h2 className="mt-5 text-2xl font-semibold text-white">
                  No Orders Yet
                </h2>

                <p className="mt-2 text-gray-400">
                  Your placed orders will appear here
                </p>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div
                className="
                  rounded-3xl
                  border border-dashed border-white/10

                  bg-[#0f172a]/60

                  p-14 text-center
                "
              >
                <Heart size={50} className="mx-auto text-orange-400" />

                <h2 className="mt-5 text-2xl font-semibold text-white">
                  Wishlist Overview
                </h2>

                <p className="mt-2 text-gray-400">
                  You currently have {wishlist.length} item(s) in wishlist
                </p>

                <button
                  onClick={() => navigate("/wishlist")}
                  className="
                    mt-6
                    h-[46px]
                    px-6
                    rounded-xl
                    bg-gradient-to-r from-orange-500 to-orange-600
                    hover:from-orange-400 hover:to-orange-500
                    text-white
                    shadow-[0_0_15px_rgba(255,115,0,0.5)]
                    transition-all duration-300
                    font-semibold
                  "
                >
                  Open Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
