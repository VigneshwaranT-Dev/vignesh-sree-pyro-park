type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label
        className="
          block

          mb-2

          text-sm
          font-medium

          text-gray-300
        "
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full

          h-[52px]

          rounded-2xl

          border border-white/10

          bg-[#020817]

          px-4

          text-[15px]
          text-white

          outline-none

          transition-all duration-300

          placeholder:text-gray-500

          focus:border-orange-500/30
          focus:bg-[#06101f]
          focus:ring-4
          focus:ring-orange-500/5
        "
      />
    </div>
  );
};

export default AuthInput;
