export default function Tabs({ active, setActive }) {
  return (
    <div className="flex gap-6 border-b text-sm sm:text-base">
      {["formatted", "original"].map(tab => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-3 capitalize transition ${
            active === tab
              ? "border-b-2 border-black font-semibold text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {tab} article
        </button>
      ))}
    </div>
  );
}
