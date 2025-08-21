"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  PlayIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  CheckCircleIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  TrophyIcon,
  CertificateIcon,
  HeartIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  CurrencyPoundIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  PlayIcon as PlayIconSolid
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";

interface Course {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'native';
  price: number;
  originalPrice?: number;
  duration: string;
  durationEn: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  instructor: string;
  instructorBio: string;
  instructorBioEn: string;
  features: string[];
  featuresEn: string[];
  category: string;
  featured: boolean;
  certificationIncluded: boolean;
  completionRate: number;
}

interface LearningPath {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  courses: string[];
  totalHours: number;
  price: number;
  discount: number;
  level: string;
  levelEn: string;
}

const courses: Course[] = [
  {
    id: 'portuguese-foundations',
    title: 'Fundações do Português',
    titleEn: 'Portuguese Foundations',
    description: 'Curso completo para iniciantes absolutos. Aprenda gramática, vocabulário essencial e pronúncia correta.',
    descriptionEn: 'Complete course for absolute beginners. Learn grammar, essential vocabulary, and correct pronunciation.',
    level: 'beginner',
    price: 149.99,
    originalPrice: 199.99,
    duration: '12 semanas',
    durationEn: '12 weeks',
    lessons: 48,
    students: 2456,
    rating: 4.9,
    reviews: 334,
    instructor: 'Professora Maria Santos',
    instructorBio: 'Mestre em Linguística pela Universidade de Lisboa, 15 anos de experiência no ensino',
    instructorBioEn: 'Master in Linguistics from University of Lisbon, 15 years teaching experience',
    features: [
      'Vídeo-aulas interativas',
      'Exercícios práticos diários',
      'Conversação com nativos',
      'Material didático incluído',
      'Certificado de conclusão',
      'Acesso vitalício'
    ],
    featuresEn: [
      'Interactive video lessons',
      'Daily practical exercises',
      'Conversation with natives',
      'Course materials included',
      'Completion certificate',
      'Lifetime access'
    ],
    category: 'general',
    featured: true,
    certificationIncluded: true,
    completionRate: 87
  },
  {
    id: 'business-portuguese',
    title: 'Português Empresarial',
    titleEn: 'Business Portuguese',
    description: 'Domine o português profissional. Ideal para negócios, apresentações e networking empresarial.',
    descriptionEn: 'Master professional Portuguese. Ideal for business, presentations, and corporate networking.',
    level: 'intermediate',
    price: 299.99,
    duration: '8 semanas',
    durationEn: '8 weeks',
    lessons: 32,
    students: 1234,
    rating: 4.8,
    reviews: 187,
    instructor: 'Dr. João Pereira',
    instructorBio: 'PhD em Negócios Internacionais, consultor para empresas portuguesas no Reino Unido',
    instructorBioEn: 'PhD in International Business, consultant for Portuguese companies in the UK',
    features: [
      'Vocabulário empresarial especializado',
      'Simulações de reuniões',
      'Apresentações profissionais',
      'Networking em português',
      'Certificação profissional',
      'Mentorias individuais'
    ],
    featuresEn: [
      'Specialized business vocabulary',
      'Meeting simulations',
      'Professional presentations',
      'Portuguese networking',
      'Professional certification',
      'Individual mentoring'
    ],
    category: 'business',
    featured: true,
    certificationIncluded: true,
    completionRate: 92
  },
  {
    id: 'cultural-immersion',
    title: 'Imersão Cultural Portuguesa',
    titleEn: 'Portuguese Cultural Immersion',
    description: 'Aprenda português através da cultura. Explore tradições, história e costumes dos países lusófonos.',
    descriptionEn: 'Learn Portuguese through culture. Explore traditions, history, and customs of Portuguese-speaking countries.',
    level: 'intermediate',
    price: 199.99,
    duration: '10 semanas',
    durationEn: '10 weeks',
    lessons: 40,
    students: 987,
    rating: 4.9,
    reviews: 156,
    instructor: 'Ana Rodrigues',
    instructorBio: 'Especialista em Estudos Culturais Lusófonos, autora de 3 livros sobre cultura portuguesa',
    instructorBioEn: 'Specialist in Lusophone Cultural Studies, author of 3 books on Portuguese culture',
    features: [
      'Exploração de tradições culturais',
      'História dos países lusófonos',
      'Culinária tradicional portuguesa',
      'Música e literatura',
      'Eventos culturais virtuais',
      'Projeto cultural final'
    ],
    featuresEn: [
      'Cultural traditions exploration',
      'History of Portuguese-speaking countries',
      'Traditional Portuguese cuisine',
      'Music and literature',
      'Virtual cultural events',
      'Final cultural project'
    ],
    category: 'cultural',
    featured: false,
    certificationIncluded: true,
    completionRate: 89
  }
];

const learningPaths: LearningPath[] = [
  {
    id: 'complete-fluency',
    name: 'Fluência Completa',
    nameEn: 'Complete Fluency',
    description: 'Do zero à fluência completa. Percurso estruturado de 6 meses para dominar o português.',
    descriptionEn: 'From zero to complete fluency. Structured 6-month path to master Portuguese.',
    courses: ['portuguese-foundations', 'cultural-immersion', 'business-portuguese'],
    totalHours: 120,
    price: 499.99,
    discount: 25,
    level: 'Iniciante a Avançado',
    levelEn: 'Beginner to Advanced'
  },
  {
    id: 'professional-path',
    name: 'Percurso Profissional',
    nameEn: 'Professional Path',
    description: 'Especialização em português empresarial. Perfeito para profissionais e empresários.',
    descriptionEn: 'Specialization in business Portuguese. Perfect for professionals and entrepreneurs.',
    courses: ['portuguese-foundations', 'business-portuguese'],
    totalHours: 80,
    price: 349.99,
    discount: 20,
    level: 'Iniciante a Intermédio',
    levelEn: 'Beginner to Intermediate'
  }
];

export default function PortugueseLanguageLearning() {
  const { language } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showRevenue, setShowRevenue] = useState(false);
  const [activeTab, setActiveTab] = useState<'courses' | 'paths' | 'live'>('courses');

  const isPortuguese = language === 'pt';

  // Revenue calculations
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const avgCoursePrice = courses.reduce((sum, course) => sum + course.price, 0) / courses.length;
  const monthlyRevenue = totalStudents * 0.15 * avgCoursePrice; // 15% monthly completion rate
  const annualProjection = monthlyRevenue * 12 * 1.3; // 30% growth

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-primary-600 text-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium mb-8">
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              {isPortuguese ? 'Academia de Português LusoTown' : 'LusoTown Portuguese Academy'}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {isPortuguese 
                ? 'Aprenda Português com Especialistas Nativos'
                : 'Learn Portuguese with Native Experts'
              }
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {isPortuguese
                ? 'A plataforma mais completa de ensino de português. Cursos estruturados, professores certificados e imersão cultural autêntica.'
                : 'The most complete Portuguese learning platform. Structured courses, certified teachers, and authentic cultural immersion.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-accent-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/95 transition-all">
                {isPortuguese ? 'Começar Gratuitamente' : 'Start Free Trial'}
              </button>
              
              <button 
                onClick={() => setShowRevenue(!showRevenue)}
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
              >
                {isPortuguese ? 'Analytics Educacionais' : 'Educational Analytics'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Analytics Dashboard */}
      {showRevenue && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="py-12 bg-gray-900 text-white"
        >
          <div className="container-width">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isPortuguese ? 'Dashboard Educacional - Monetização' : 'Educational Dashboard - Monetization'}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CurrencyPoundIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Receita Mensal' : 'Monthly Revenue'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">£{monthlyRevenue.toLocaleString()}</p>
                <p className="text-green-100 text-sm">
                  {isPortuguese ? '+35% crescimento' : '+35% growth'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UserGroupIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Estudantes Ativos' : 'Active Students'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">{totalStudents.toLocaleString()}</p>
                <p className="text-blue-100 text-sm">{isPortuguese ? '+250 este mês' : '+250 this month'}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrophyIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Taxa Conclusão' : 'Completion Rate'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">89%</p>
                <p className="text-purple-100 text-sm">{isPortuguese ? 'Acima da média' : 'Above average'}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CertificateIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Certificados Emitidos' : 'Certificates Issued'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">1,847</p>
                <p className="text-orange-100 text-sm">{isPortuguese ? '+125 este mês' : '+125 this month'}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {isPortuguese ? 'Projeção Anual (2025)' : 'Annual Projection (2025)'}
              </h3>
              <p className="text-4xl font-bold mb-2">
                £{annualProjection.toLocaleString()}
              </p>
              <p className="text-white/80">
                {isPortuguese 
                  ? 'Baseado em 30% de crescimento na demanda por ensino de português'
                  : 'Based on 30% growth in Portuguese language learning demand'
                }
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container-width">
          <div className="flex justify-center space-x-8">
            {[
              { id: 'courses', label: isPortuguese ? 'Cursos' : 'Courses', icon: BookOpenIcon },
              { id: 'paths', label: isPortuguese ? 'Percursos' : 'Learning Paths', icon: TrophyIcon },
              { id: 'live', label: isPortuguese ? 'Aulas ao Vivo' : 'Live Classes', icon: PlayIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <section className="py-16">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {isPortuguese ? 'Cursos de Português' : 'Portuguese Courses'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Cursos estruturados por níveis, com certificação internacional e professores nativos qualificados'
                  : 'Structured courses by levels, with international certification and qualified native teachers'
                }
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${
                    course.featured 
                      ? 'border-accent-200 ring-4 ring-accent-50' 
                      : 'border-gray-100'
                  }`}
                >
                  {course.featured && (
                    <div className="bg-accent-500 text-white text-center py-2 px-4 text-sm font-bold">
                      {isPortuguese ? '( MAIS POPULAR' : '( MOST POPULAR'}
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {isPortuguese ? course.title : course.titleEn}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                            course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            course.level === 'advanced' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {course.level === 'beginner' ? (isPortuguese ? 'Iniciante' : 'Beginner') :
                             course.level === 'intermediate' ? (isPortuguese ? 'Intermédio' : 'Intermediate') :
                             course.level === 'advanced' ? (isPortuguese ? 'Avançado' : 'Advanced') :
                             (isPortuguese ? 'Nativo' : 'Native')}
                          </span>
                          
                          {course.certificationIncluded && (
                            <div className="flex items-center gap-1 text-accent-600">
                              <CertificateIcon className="w-4 h-4" />
                              <span className="text-xs font-medium">
                                {isPortuguese ? 'Certificado' : 'Certificate'}
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4">
                          {isPortuguese ? course.description : course.descriptionEn}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <ClockIcon className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{isPortuguese ? course.duration : course.durationEn}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpenIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{course.lessons} {isPortuguese ? 'aulas' : 'lessons'}</span>
                            </div>
                          </div>

                          <div className="text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <StarIconSolid className="w-4 h-4 text-yellow-500" />
                              <span className="font-bold">{course.rating}</span>
                              <span className="text-gray-600">({course.reviews})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserGroupIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{course.students.toLocaleString()} {isPortuguese ? 'alunos' : 'students'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            {isPortuguese ? 'O que inclui:' : 'What you get:'}
                          </h4>
                          <div className="space-y-2">
                            {(isPortuguese ? course.features : course.featuresEn).slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                              <AcademicCapIcon className="w-5 h-5 text-accent-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{course.instructor}</h5>
                              <p className="text-sm text-gray-600">
                                {isPortuguese ? course.instructorBio : course.instructorBioEn}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-gray-900">
                                £{course.price}
                              </span>
                              {course.originalPrice && (
                                <span className="text-xl text-gray-500 line-through">
                                  £{course.originalPrice}
                                </span>
                              )}
                            </div>
                            {course.originalPrice && (
                              <div className="text-sm text-green-600 font-medium">
                                {Math.round((1 - course.price / course.originalPrice) * 100)}% {isPortuguese ? 'desconto' : 'off'}
                              </div>
                            )}
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {isPortuguese ? 'Taxa de conclusão:' : 'Completion rate:'}
                            </div>
                            <div className="text-2xl font-bold text-accent-600">
                              {course.completionRate}%
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <button 
                            onClick={() => setSelectedCourse(course)}
                            className="w-full bg-accent-500 text-white py-4 rounded-xl font-semibold hover:bg-accent-600 transition-colors"
                          >
                            {isPortuguese ? 'Inscrever-se Agora' : 'Enroll Now'}
                          </button>
                          
                          <button className="w-full border border-accent-200 text-accent-600 py-3 rounded-xl font-semibold hover:bg-accent-50 transition-colors">
                            {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Learning Paths Tab */}
      {activeTab === 'paths' && (
        <section className="py-16">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {isPortuguese ? 'Percursos de Aprendizagem' : 'Learning Paths'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Programas estruturados que combinam múltiplos cursos para objetivos específicos de aprendizagem'
                  : 'Structured programs that combine multiple courses for specific learning objectives'
                }
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {learningPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {isPortuguese ? path.name : path.nameEn}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {isPortuguese ? path.description : path.descriptionEn}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-accent-100 px-3 py-1 rounded-full">
                        <span className="text-accent-800 font-medium text-sm">
                          {isPortuguese ? path.level : path.levelEn}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-sm">{path.totalHours}h {isPortuguese ? 'totais' : 'total'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {isPortuguese ? 'Cursos incluídos:' : 'Courses included:'}
                    </h4>
                    <div className="space-y-2">
                      {path.courses.map((courseId) => {
                        const course = courses.find(c => c.id === courseId);
                        return course && (
                          <div key={courseId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <BookOpenIcon className="w-5 h-5 text-accent-600" />
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">
                                {isPortuguese ? course.title : course.titleEn}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {course.lessons} {isPortuguese ? 'aulas' : 'lessons'} " {isPortuguese ? course.duration : course.durationEn}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                          £{path.price}
                        </span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-bold">
                          {path.discount}% {isPortuguese ? 'desconto' : 'off'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {isPortuguese 
                          ? `Em vez de £${path.courses.reduce((sum, courseId) => {
                              const course = courses.find(c => c.id === courseId);
                              return sum + (course?.price || 0);
                            }, 0)}`
                          : `Instead of £${path.courses.reduce((sum, courseId) => {
                              const course = courses.find(c => c.id === courseId);
                              return sum + (course?.price || 0);
                            }, 0)}`
                        }
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-accent-500 text-white py-4 rounded-xl font-semibold hover:bg-accent-600 transition-colors">
                      {isPortuguese ? 'Começar Percurso' : 'Start Path'}
                    </button>
                    
                    <button className="w-full border border-accent-200 text-accent-600 py-3 rounded-xl font-semibold hover:bg-accent-50 transition-colors">
                      {isPortuguese ? 'Ver Cursos' : 'View Courses'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live Classes Tab */}
      {activeTab === 'live' && (
        <section className="py-16">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {isPortuguese ? 'Aulas ao Vivo' : 'Live Classes'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Interaja ao vivo com professores nativos e outros estudantes em tempo real'
                  : 'Interact live with native teachers and other students in real time'
                }
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <PlayIconSolid className="w-24 h-24 mx-auto mb-6 text-accent-500" />
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Aulas ao Vivo - Em Breve!' : 'Live Classes - Coming Soon!'}
              </h3>
              
              <p className="text-gray-600 mb-8">
                {isPortuguese
                  ? 'Estamos a desenvolver uma experiência única de aulas ao vivo com professores nativos. Registe o seu interesse para ser notificado quando lançarmos.'
                  : "We're developing a unique live class experience with native teachers. Register your interest to be notified when we launch."
                }
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-3 text-accent-500" />
                  <h4 className="font-semibold mb-2">
                    {isPortuguese ? 'Interação em Tempo Real' : 'Real-time Interaction'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? 'Conversação direta com professores e colegas'
                      : 'Direct conversation with teachers and peers'
                    }
                  </p>
                </div>

                <div className="text-center">
                  <GlobeAltIcon className="w-12 h-12 mx-auto mb-3 text-accent-500" />
                  <h4 className="font-semibold mb-2">
                    {isPortuguese ? 'Acesso Global' : 'Global Access'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? 'Participe de qualquer lugar do mundo'
                      : 'Join from anywhere in the world'
                    }
                  </p>
                </div>

                <div className="text-center">
                  <MicrophoneIcon className="w-12 h-12 mx-auto mb-3 text-accent-500" />
                  <h4 className="font-semibold mb-2">
                    {isPortuguese ? 'Prática de Pronúncia' : 'Pronunciation Practice'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? 'Correção instantânea da pronúncia'
                      : 'Instant pronunciation correction'
                    }
                  </p>
                </div>
              </div>

              <button className="bg-accent-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-600 transition-colors">
                {isPortuguese ? 'Registar Interesse' : 'Register Interest'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-primary-600 text-white">
        <div className="container-width text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {isPortuguese 
                ? 'Comece a Sua Jornada no Português Hoje'
                : 'Start Your Portuguese Journey Today'
              }
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Junte-se a milhares de estudantes que já dominam o português com os nossos cursos especializados.'
                : 'Join thousands of students who already master Portuguese with our specialized courses.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-accent-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/95 transition-all">
                {isPortuguese ? 'Começar Gratuitamente' : 'Start Free Trial'}
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                {isPortuguese ? 'Falar com Conselheiro' : 'Speak to Advisor'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}