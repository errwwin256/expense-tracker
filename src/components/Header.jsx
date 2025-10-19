export default function Header() {
  return (
    <header className="w-full bg-retroBlue text-retroDark font-bold text-3xl md:text-4xl shadow-md retro-glow flex flex-col sm:flex-row items-center justify-center py-6 px-4 text-center">
      <img
        src={`${import.meta.env.BASE_URL}pav.jpg`}
        alt="Retro Logo"
        className="w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-0 sm:mr-4 rounded-full border-4 border-retroDark shadow-lg 
                   ring-4 ring-pink-200 ring-offset-2 ring-offset-retroBlue transition-transform duration-300 hover:scale-105"
      />
      <span>Retro Expense Tracker</span>
    </header>
  );
}
