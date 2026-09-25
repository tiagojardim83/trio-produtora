import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-cream">
      <p className="text-display text-8xl text-trio-red">404</p>
      <p className="mt-4 text-lg text-cream/70">Essa página não existe.</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-trio-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream"
      >
        Voltar para o início
      </Link>
    </main>
  );
};

export default NotFound;
