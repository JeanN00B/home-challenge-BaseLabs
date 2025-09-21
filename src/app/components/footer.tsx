export default function Footer() {
  return (
    <footer className="bg-yellow-100 flex flex-row justify-between items-center h-10 px-10">
      <p>copyright @ {new Date().getFullYear()}</p>
      <p>
        Made with ❤️ and ☕️ by:{" "}
        <a
          href="https://www.linkedin.com/in/jean-camacho-126126212/"
          target="_blank"
          className="text-blue-600"
        >
          Jean Camacho
        </a>
      </p>
    </footer>
  );
}
