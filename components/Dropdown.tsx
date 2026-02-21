const OPTIONS = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

interface DropdownProps {
  value: number;
  onChange: (value: number) => void;
}
// [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

export default function Dropdown({value, onChange}: DropdownProps) {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="bg-surface-background-50 border border-border rounded-md p-2 text-text-body cursor-pointer focus:outline-none hover:border-border-focus"
    >
      {OPTIONS.map((num) => (
        <option 
          key={num} 
          value={num}
        >
          {num}
        </option>
      ))}
    </select>
  );
}