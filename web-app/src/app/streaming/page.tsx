import { ROUTES } from "@/config/routes";
import { STREAMING_COPY } from "@/config/content";

export const metadata = {
  title: "Streaming | LusoTown",
  description: STREAMING_COPY.hero.subtitle,
};

export default function StreamingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {STREAMING_COPY.hero.title}
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              {STREAMING_COPY.hero.subtitle}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href={ROUTES.streaming}
                className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                {STREAMING_COPY.hero.ctaPrimary}
              </a>
              <a
                href={ROUTES.about}
                className="inline-flex items-center gap-2 bg-white border text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                {STREAMING_COPY.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-width">
          <ul className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {STREAMING_COPY.features.map((f) => (
              <li
                key={f}
                className="bg-white p-6 rounded-2xl shadow-lg border border-secondary-100 text-center"
              >
                <span className="text-secondary-800 font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
