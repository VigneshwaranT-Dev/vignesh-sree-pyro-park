import { useState } from "react";
import AuthInput from "./AuthInput";
import { useAuth } from "../../context/AuthContext";

type Props = {
  onSuccess: () => void;
};

const RegisterForm = ({ onSuccess }: Props) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">Create Account</h2>

        <p className="text-sm text-gray-400 mt-2">
          Join Vignesh Sree Pyro Park today
        </p>
      </div>

      <div className="space-y-5">
        <AuthInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            register(name, mobile, password);

            setName("");
            setMobile("");
            setPassword("");
            setConfirmPassword("");

            onSuccess();
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
