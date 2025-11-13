export default function LanguageSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-lg bg-white dark:bg-gray-800"
    >
      <option value="en">English</option>
      <option value="uk">Українська</option>
      <option value="auto">Auto</option>
    </select>
  );
}