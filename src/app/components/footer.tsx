export default function Footer() {
  return (
    <footer className="bg-[#447e7f] flex flex-row justify-between items-center h-10 px-10 text-white">
      <p>copyright @ {new Date().getFullYear()}</p>
      <p>
        Made with ❤️ and ☕️ by:{" "}
        <a
          href="https://www.linkedin.com/in/jean-camacho-126126212/"
          target="_blank"
          className="text-blue-300 hover:text-blue-400 hover:underline"
        >
          Jean Camacho
        </a>
      </p>
    </footer>
  );
}
