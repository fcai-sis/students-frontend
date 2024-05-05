type TextInputFieldProps = {
  placeholder: string,
  obscure?: boolean
};

export default function TextInputField({ placeholder, obscure }: TextInputFieldProps) {
  return (
    <input
      className="placeholder:text-slate-500 text-slate-800 border border-slate-300 p-4 rounded-lg bg-slate-50 transition-all duration-300 outline-none focus:border-slate-600 focus:shadow-sm focus:ring-2 focus:ring-blue-600 focus:ring-opacity-100"
      placeholder={placeholder}
      type={obscure ? "password" : "text"}
    />
  );
}
