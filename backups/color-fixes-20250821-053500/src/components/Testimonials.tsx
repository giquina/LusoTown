'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t('testimonials.quote1', 'The live workshops have been a game-changer for my career. I connected with so many amazing professionals!'),
      author: 'Miguel Santos',
      role: t('testimonials.role1', 'Software Engineer'),
    },
    {
      quote: t('testimonials.quote2', 'I feel so much more connected to my roots thanks to the cultural events. It truly feels like a piece of home.'),
      author: 'Ana Sofia',
      role: t('testimonials.role2', 'Marketing Manager'),
    },
    {
      quote: t('testimonials.quote3', 'As a creator, LusoTown has given me a platform to share my passion for Portuguese cuisine with a dedicated audience.'),
      author: 'João Ferreira',
      role: t('testimonials.role3', 'Chef & Creator'),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('testimonials.title', 'From Our Community')}</h2>
          <p className="mt-4 text-lg text-gray-600">{t('testimonials.subtitle', 'See what our members are saying about LusoTown Live.')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 italic mb-6">“{testimonial.quote}”</blockquote>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
