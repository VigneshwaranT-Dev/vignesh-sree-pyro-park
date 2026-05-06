import { useState } from "react";
import AuthInput from "./AuthInput";
import { useAuth } from "../../context/AuthContext";

type Props = {
  onSuccess: () => void;
};

const LoginForm = ({ onSuccess }: Props) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>

        <p className="text-sm text-gray-400 mt-2">
          Login to continue your festive shopping experience
        </p>
      </div>

      <div className="space-y-5">
        <AuthInput
          label="Mobile Number"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="
            w-full
            h-[50px]
            rounded-xl
            bg-gradient-to-r from-orange-500 to-orange-600
            hover:from-orange-400 hover:to-orange-500
            text-white
            font-medium
            shadow-[0_0_20px_rgba(255,115,0,0.35)]
            transition-all duration-300
          "
          onClick={() => {
            login(mobile, password);

            setMobile("");
            setPassword("");

            onSuccess();
          }}
        >
          Login
        </button>

        <button
          className="
            w-full
            h-[48px]
            rounded-xl
            border border-white/10
            bg-white/5
            hover:bg-white/10
            text-sm text-gray-300
            transition
          "
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
