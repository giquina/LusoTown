"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  AcademicCapIcon,
  CurrencyPoundIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  ComputerDesktopIcon,
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import LearningModuleFramework, {
  LearningModule,
} from "../../../components/academy/LearningModuleFramework";
// Using local page-defined module shape; no external types import

const studentSupportModule = {
  id: "student-support",
  title: "Student Support",
  titlePortuguese: "Apoio ao Estudante",
  description:
    "Comprehensive support system for Portuguese students in UK universities",
  descriptionPortuguese:
    "Sistema abrangente de apoio para estudantes portugueses em universidades do Reino Unido",
  difficulty: "Beginner",
  estimatedTime: 25,
  category: "education",
  categoryPortuguese: "educação",
  icon: AcademicCapIcon,
  prerequisites: [],
  prerequisitesPortuguese: [],
  learningObjectives: [],
  learningObjectivesPortuguese: [],
  practicalExercises: [],
  resources: [],
  steps: [
    {
      id: "university-partnerships",
      title: "University Partnership Network",
      titlePortuguese: "Rede de Parcerias Universitárias",
      content: `
        <p>LusoTown has established partnerships with 8 leading UK universities to provide dedicated support for Portuguese-speaking students. Our network ensures you have access to cultural familiarity and language support throughout your academic journey.</p>
        
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p><strong>University Partner Network:</strong></p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>King's College London (340+ Portuguese students)</li>
            <li>Imperial College London (280+ Portuguese students)</li>
            <li>University College London (250+ Portuguese students)</li>
            <li>London School of Economics (190+ Portuguese students)</li>
            <li>University of Edinburgh (160+ Portuguese students)</li>
            <li>University of Manchester (140+ Portuguese students)</li>
            <li>University of Warwick (120+ Portuguese students)</li>
            <li>University of Birmingham (95+ Portuguese students)</li>
          </ul>
        </div>
        
        <h4>Partnership Benefits</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Academic Support:</strong> Portuguese-speaking tutors and study groups</li>
          <li><strong>Cultural Integration:</strong> Events connecting Portuguese students across universities</li>
          <li><strong>Career Services:</strong> Job placement support with Portuguese connections</li>
          <li><strong>Mental Health:</strong> Counselors who understand Portuguese cultural context</li>
          <li><strong>Financial Aid:</strong> Guidance on scholarships for Portuguese nationals</li>
        </ul>
        
        <div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
          <p><strong>Important Note:</strong> All student support services are independent of our transport offerings. If students need transportation for university visits, campus tours, or moving to accommodation, our professional transport service is available separately upon request.</p>
        </div>
      `,
      contentPortuguese: `
        <p>A LusoTown estabeleceu parcerias com 8 universidades líderes do Reino Unido para fornecer apoio dedicado a estudantes de língua portuguesa. A nossa rede garante que tenha acesso à familiaridade cultural e apoio linguístico ao longo da sua jornada académica.</p>
        
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p><strong>Rede de Parceiros Universitários:</strong></p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>King's College London (340+ estudantes portugueses)</li>
            <li>Imperial College London (280+ estudantes portugueses)</li>
            <li>University College London (250+ estudantes portugueses)</li>
            <li>London School of Economics (190+ estudantes portugueses)</li>
            <li>University of Edinburgh (160+ estudantes portugueses)</li>
            <li>University of Manchester (140+ estudantes portugueses)</li>
            <li>University of Warwick (120+ estudantes portugueses)</li>
            <li>University of Birmingham (95+ estudantes portugueses)</li>
          </ul>
        </div>
        
        <h4>Benefícios das Parcerias</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Apoio Académico:</strong> Tutores e grupos de estudo de língua portuguesa</li>
          <li><strong>Integração Cultural:</strong> Eventos conectando estudantes portugueses de universidades</li>
          <li><strong>Serviços de Carreira:</strong> Apoio na colocação profissional com conexões portuguesas</li>
          <li><strong>Saúde Mental:</strong> Conselheiros que compreendem o contexto cultural português</li>
          <li><strong>Ajuda Financeira:</strong> Orientação sobre bolsas para nacionais portugueses</li>
        </ul>
        
        <div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
          <p><strong>Nota Importante:</strong> Todos os serviços de apoio estudantil são independentes das nossas ofertas de transporte. Se os estudantes precisarem de transporte para visitas universitárias, tours no campus, ou mudança para alojamento, o nosso serviço de transporte profissional está disponível separadamente mediante solicitação.</p>
        </div>
      `,
      icon: BuildingOfficeIcon,
      estimatedTime: 8,
      interactiveElements: [
        {
          type: "checklist",
          title: "University Partnership Checklist",
          titlePortuguese: "Lista de Verificação de Parcerias Universitárias",
          items: [
            {
              text: "Connect with Portuguese student societies at your university",
              textPortuguese:
                "Conectar-se com associações de estudantes portugueses na sua universidade",
            },
            {
              text: "Register for Portuguese-speaking academic support services",
              textPortuguese:
                "Registar-se para serviços de apoio académico em português",
            },
            {
              text: "Join cross-university Portuguese student events",
              textPortuguese:
                "Juntar-se a eventos de estudantes portugueses inter-universitários",
            },
            {
              text: "Access career services with Portuguese network connections",
              textPortuguese:
                "Aceder a serviços de carreira com conexões da rede portuguesa",
            },
          ],
        },
      ],
    },
    {
      id: "financial-support",
      title: "Financial Support & Scholarships",
      titlePortuguese: "Apoio Financeiro e Bolsas",
      content: `
        <p>Navigate the complex landscape of UK university funding with dedicated support for Portuguese students. We help you access scholarships, understand student finance, and manage costs effectively.</p>
        
        <h4>Portuguese Student Scholarships (2025)</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800">Camões Scholarship</h5>
            <p class="text-sm text-green-700">Up to £15,000/year for Portuguese nationals studying in the UK</p>
            <p class="text-xs text-green-600 mt-2">Application deadline: March 2025</p>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800">Lusitania Foundation Grant</h5>
            <p class="text-sm text-blue-700">£8,000/year for Portuguese students in STEM fields</p>
            <p class="text-xs text-blue-600 mt-2">Application deadline: February 2025</p>
          </div>
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800">Portuguese Heritage Award</h5>
            <p class="text-sm text-purple-700">£5,000 one-time grant for cultural studies</p>
            <p class="text-xs text-purple-600 mt-2">Application deadline: April 2025</p>
          </div>
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800">Atlantic Bridge Scholarship</h5>
            <p class="text-sm text-orange-700">£12,000/year for business and economics</p>
            <p class="text-xs text-orange-600 mt-2">Application deadline: January 2025</p>
          </div>
        </div>
        
        <h4>Financial Planning Support</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Budgeting Workshops:</strong> Monthly sessions in Portuguese on managing student finances</li>
          <li><strong>Part-time Work Guidance:</strong> Understanding UK work regulations for students</li>
          <li><strong>Banking Support:</strong> Help opening UK bank accounts with Portuguese documentation</li>
          <li><strong>Emergency Fund:</strong> LusoTown community emergency assistance for urgent needs</li>
          <li><strong>Tax Guidance:</strong> Understanding UK tax obligations for Portuguese students</li>
        </ul>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
          <p><strong>Special Benefit:</strong> LusoTown student members receive 50% discount on annual membership (£12.50/year instead of £25), including access to all community events and professional networking opportunities.</p>
        </div>
      `,
      contentPortuguese: `
        <p>Navegue pelo complexo panorama de financiamento universitário do Reino Unido com apoio dedicado para estudantes portugueses. Ajudamo-lo a aceder a bolsas, compreender o financiamento estudantil e gerir custos eficazmente.</p>
        
        <h4>Bolsas para Estudantes Portugueses (2025)</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800">Bolsa Camões</h5>
            <p class="text-sm text-green-700">Até £15.000/ano para nacionais portugueses a estudar no Reino Unido</p>
            <p class="text-xs text-green-600 mt-2">Prazo de candidatura: Março 2025</p>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800">Bolsa Fundação Lusitania</h5>
            <p class="text-sm text-blue-700">£8.000/ano para estudantes portugueses em áreas STEM</p>
            <p class="text-xs text-blue-600 mt-2">Prazo de candidatura: Fevereiro 2025</p>
          </div>
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800">Prémio Herança Portuguesa</h5>
            <p class="text-sm text-purple-700">£5.000 bolsa única para estudos culturais</p>
            <p class="text-xs text-purple-600 mt-2">Prazo de candidatura: Abril 2025</p>
          </div>
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800">Bolsa Atlantic Bridge</h5>
            <p class="text-sm text-orange-700">£12.000/ano para negócios e economia</p>
            <p class="text-xs text-orange-600 mt-2">Prazo de candidatura: Janeiro 2025</p>
          </div>
        </div>
        
        <h4>Apoio ao Planeamento Financeiro</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Workshops de Orçamentação:</strong> Sessões mensais em português sobre gestão de finanças estudantis</li>
          <li><strong>Orientação sobre Trabalho Part-time:</strong> Compreender regulamentações de trabalho do Reino Unido para estudantes</li>
          <li><strong>Apoio Bancário:</strong> Ajuda na abertura de contas bancárias do Reino Unido com documentação portuguesa</li>
          <li><strong>Fundo de Emergência:</strong> Assistência de emergência da comunidade LusoTown para necessidades urgentes</li>
          <li><strong>Orientação Fiscal:</strong> Compreender obrigações fiscais do Reino Unido para estudantes portugueses</li>
        </ul>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
          <p><strong>Benefício Especial:</strong> Membros estudantes da LusoTown recebem 50% de desconto na membresía anual (£12,50/ano em vez de £25), incluindo acesso a todos os eventos comunitários e oportunidades de networking profissional.</p>
        </div>
      `,
      icon: CurrencyPoundIcon,
      estimatedTime: 7,
      interactiveElements: [
        {
          type: "checklist",
          title: "Financial Planning Checklist",
          titlePortuguese: "Lista de Verificação de Planeamento Financeiro",
          items: [
            {
              text: "Research and apply for Portuguese-specific scholarships",
              textPortuguese:
                "Pesquisar e candidatar-se a bolsas específicas para portugueses",
            },
            {
              text: "Open UK bank account with Portuguese documentation support",
              textPortuguese:
                "Abrir conta bancária do Reino Unido com apoio de documentação portuguesa",
            },
            {
              text: "Attend monthly budgeting workshops in Portuguese",
              textPortuguese:
                "Participar em workshops mensais de orçamentação em português",
            },
            {
              text: "Register for LusoTown student discount membership",
              textPortuguese:
                "Registar-se para a membresía com desconto estudantil da LusoTown",
            },
          ],
        },
      ],
    },
    {
      id: "academic-integration",
      title: "Academic Integration & Support",
      titlePortuguese: "Integração e Apoio Académico",
      content: `
        <p>Thrive academically with culturally-aware support systems designed specifically for Portuguese students navigating UK higher education.</p>
        
        <h4>Academic Support Services</h4>
        <div class="space-y-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <BookOpenIcon class="h-5 w-5" />
              Portuguese Study Groups
            </h5>
            <p class="text-sm text-blue-700 mt-2">Subject-specific study groups led by advanced Portuguese students and tutors across all major universities.</p>
            <ul class="text-xs text-blue-600 mt-2 list-disc list-inside">
              <li>Weekly sessions for challenging subjects</li>
              <li>Exam preparation workshops</li>
              <li>Assignment guidance and feedback</li>
            </ul>
          </div>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <ComputerDesktopIcon class="h-5 w-5" />
              Technology Support
            </h5>
            <p class="text-sm text-green-700 mt-2">Technical assistance for UK university systems, software, and digital learning platforms.</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>University portal navigation</li>
              <li>Digital library access</li>
              <li>Online learning platform setup</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800 flex items-center gap-2">
              <ChatBubbleLeftEllipsisIcon class="h-5 w-5" />
              Language Bridge Support
            </h5>
            <p class="text-sm text-purple-700 mt-2">Academic English support while maintaining Portuguese cultural identity and communication style.</p>
            <ul class="text-xs text-purple-600 mt-2 list-disc list-inside">
              <li>Academic writing workshops</li>
              <li>Presentation skills development</li>
              <li>Research methodology guidance</li>
            </ul>
          </div>
        </div>
        
        <h4>Mentorship Program</h4>
        <p>Connect with Portuguese professionals and senior students who understand your academic and cultural journey:</p>
        <ul class="list-disc list-inside space-y-2 mt-3">
          <li><strong>Academic Mentors:</strong> Portuguese postgraduate students and academics</li>
          <li><strong>Professional Mentors:</strong> Portuguese professionals working in your field of study</li>
          <li><strong>Peer Mentors:</strong> Portuguese students one year ahead in your program</li>
          <li><strong>Cultural Mentors:</strong> Long-term Portuguese residents who can guide UK integration</li>
        </ul>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p><strong>Special Feature:</strong> All academic support includes cultural sensitivity - mentors understand Portuguese learning styles, family expectations, and communication preferences.</p>
        </div>
      `,
      contentPortuguese: `
        <p>Prospere academicamente com sistemas de apoio culturalmente conscientes, especificamente concebidos para estudantes portugueses que navegam no ensino superior do Reino Unido.</p>
        
        <h4>Serviços de Apoio Académico</h4>
        <div class="space-y-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <BookOpenIcon class="h-5 w-5" />
              Grupos de Estudo Portugueses
            </h5>
            <p class="text-sm text-blue-700 mt-2">Grupos de estudo específicos por matéria liderados por estudantes portugueses avançados e tutores em todas as universidades principais.</p>
            <ul class="text-xs text-blue-600 mt-2 list-disc list-inside">
              <li>Sessões semanais para disciplinas desafiadoras</li>
              <li>Workshops de preparação para exames</li>
              <li>Orientação e feedback de trabalhos</li>
            </ul>
          </div>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <ComputerDesktopIcon class="h-5 w-5" />
              Apoio Tecnológico
            </h5>
            <p class="text-sm text-green-700 mt-2">Assistência técnica para sistemas universitários do Reino Unido, software e plataformas de aprendizagem digital.</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>Navegação no portal universitário</li>
              <li>Acesso à biblioteca digital</li>
              <li>Configuração de plataforma de aprendizagem online</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800 flex items-center gap-2">
              <ChatBubbleLeftEllipsisIcon class="h-5 w-5" />
              Apoio Ponte Linguística
            </h5>
            <p class="text-sm text-purple-700 mt-2">Apoio ao inglês académico mantendo a identidade cultural portuguesa e estilo de comunicação.</p>
            <ul class="text-xs text-purple-600 mt-2 list-disc list-inside">
              <li>Workshops de escrita académica</li>
              <li>Desenvolvimento de competências de apresentação</li>
              <li>Orientação de metodologia de investigação</li>
            </ul>
          </div>
        </div>
        
        <h4>Programa de Mentoria</h4>
        <p>Conecte-se com profissionais portugueses e estudantes seniores que compreendem a sua jornada académica e cultural:</p>
        <ul class="list-disc list-inside space-y-2 mt-3">
          <li><strong>Mentores Académicos:</strong> Estudantes de pós-graduação e académicos portugueses</li>
          <li><strong>Mentores Profissionais:</strong> Profissionais portugueses a trabalhar na sua área de estudo</li>
          <li><strong>Mentores Pares:</strong> Estudantes portugueses um ano à frente no seu programa</li>
          <li><strong>Mentores Culturais:</strong> Residentes portugueses de longa duração que podem orientar a integração no Reino Unido</li>
        </ul>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p><strong>Funcionalidade Especial:</strong> Todo o apoio académico inclui sensibilidade cultural - os mentores compreendem estilos de aprendizagem portugueses, expectativas familiares e preferências de comunicação.</p>
        </div>
      `,
      icon: BookOpenIcon,
      estimatedTime: 6,
      interactiveElements: [
        {
          type: "decision-tree",
          title: "Find Your Academic Support",
          titlePortuguese: "Encontre o Seu Apoio Académico",
          question: "What type of academic support do you need most?",
          questionPortuguese: "Que tipo de apoio académico mais precisa?",
          options: [
            {
              text: "Study groups for specific subjects",
              textPortuguese: "Grupos de estudo para disciplinas específicas",
              result:
                "Join Portuguese study groups in your field - available for engineering, business, medicine, humanities, and more.",
              resultPortuguese:
                "Junte-se a grupos de estudo portugueses na sua área - disponível para engenharia, negócios, medicina, humanidades e mais.",
            },
            {
              text: "Academic writing and English support",
              textPortuguese: "Apoio à escrita académica e inglês",
              result:
                "Access Language Bridge Support with specialized academic English coaching.",
              resultPortuguese:
                "Aceda ao Apoio Ponte Linguística com coaching especializado em inglês académico.",
            },
            {
              text: "Mentorship and career guidance",
              textPortuguese: "Mentoria e orientação de carreira",
              result:
                "Connect with Portuguese professionals and academic mentors in your field.",
              resultPortuguese:
                "Conecte-se com profissionais portugueses e mentores académicos na sua área.",
            },
          ],
        },
      ],
    },
    {
      id: "community-connection",
      title: "Student Community & Social Integration",
      titlePortuguese: "Comunidade Estudantil e Integração Social",
      content: `
        <p>Build lasting friendships and professional networks with fellow Portuguese students across London and the UK. Our community events are designed to create meaningful connections while celebrating Portuguese culture.</p>
        
        <h4>Student-Specific Events</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <h5 class="font-semibold text-pink-800 flex items-center gap-2">
              <HeartIcon class="h-4 w-4" />
              Weekly Coffee Meetups
            </h5>
            <p class="text-sm text-pink-700">Every Tuesday at Portuguese cafés in Stockwell and Camden</p>
            <p class="text-xs text-pink-600 mt-1">Free for LusoTown student members</p>
          </div>
          
          <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h5 class="font-semibold text-indigo-800 flex items-center gap-2">
              <UserGroupIcon class="h-4 w-4" />
              Study Sessions
            </h5>
            <p class="text-sm text-indigo-700">Group study sessions at London libraries with Portuguese students</p>
            <p class="text-xs text-indigo-600 mt-1">Organized by subject and university</p>
          </div>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <MapPinIcon class="h-4 w-4" />
              Cultural Walks
            </h5>
            <p class="text-sm text-green-700">Monthly walks exploring Portuguese history in London</p>
            <p class="text-xs text-green-600 mt-1">Guided tours in Portuguese and English</p>
          </div>
          
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800 flex items-center gap-2">
              <ClockIcon class="h-4 w-4" />
              Weekend Socials
            </h5>
            <p class="text-sm text-orange-700">Saturday evening gatherings at Portuguese restaurants</p>
            <p class="text-xs text-orange-600 mt-1">Networking with students and young professionals</p>
          </div>
        </div>
        
        <h4>Digital Community Platform</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Student WhatsApp Groups:</strong> University-specific groups for quick communication</li>
          <li><strong>Portuguese Study Buddy Matching:</strong> Connect with students in similar programs</li>
          <li><strong>Accommodation Sharing:</strong> Find Portuguese roommates and housing opportunities</li>
          <li><strong>Event Calendar:</strong> Never miss Portuguese student events across London</li>
          <li><strong>Resource Sharing:</strong> Share textbooks, notes, and study materials</li>
        </ul>
        
        <h4>Professional Development</h4>
        <p>Prepare for your career while building Portuguese professional networks:</p>
        <ul class="list-disc list-inside space-y-2 mt-3">
          <li><strong>CV Workshops:</strong> UK CV formatting with Portuguese perspective</li>
          <li><strong>Interview Practice:</strong> Mock interviews with Portuguese professionals</li>
          <li><strong>Networking Events:</strong> Connect with Portuguese employers and recruitment agencies</li>
          <li><strong>Internship Opportunities:</strong> Access to Portuguese businesses offering student placements</li>
          <li><strong>Graduate Programs:</strong> Information sessions about Portuguese companies hiring in the UK</li>
        </ul>
        
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p><strong>Success Story:</strong> "Through LusoTown's student network, I connected with 3 other Portuguese engineering students at Imperial. We formed a study group, shared accommodation, and now we all have graduate jobs lined up with Portuguese connections!" - Maria Santos, Imperial College London</p>
        </div>
      `,
      contentPortuguese: `
        <p>Construa amizades duradouras e redes profissionais com estudantes portugueses em Londres e no Reino Unido. Os nossos eventos comunitários são concebidos para criar conexões significativas enquanto celebram a cultura portuguesa.</p>
        
        <h4>Eventos Específicos para Estudantes</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <h5 class="font-semibold text-pink-800 flex items-center gap-2">
              <HeartIcon class="h-4 w-4" />
              Encontros Semanais de Café
            </h5>
            <p class="text-sm text-pink-700">Todas as terças-feiras em cafés portugueses em Stockwell e Camden</p>
            <p class="text-xs text-pink-600 mt-1">Grátis para membros estudantes da LusoTown</p>
          </div>
          
          <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h5 class="font-semibold text-indigo-800 flex items-center gap-2">
              <UserGroupIcon class="h-4 w-4" />
              Sessões de Estudo
            </h5>
            <p class="text-sm text-indigo-700">Sessões de estudo em grupo em bibliotecas de Londres com estudantes portugueses</p>
            <p class="text-xs text-indigo-600 mt-1">Organizadas por disciplina e universidade</p>
          </div>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <MapPinIcon class="h-4 w-4" />
              Caminhadas Culturais
            </h5>
            <p class="text-sm text-green-700">Caminhadas mensais explorando a história portuguesa em Londres</p>
            <p class="text-xs text-green-600 mt-1">Visitas guiadas em português e inglês</p>
          </div>
          
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800 flex items-center gap-2">
              <ClockIcon class="h-4 w-4" />
              Sociais de Fim de Semana
            </h5>
            <p class="text-sm text-orange-700">Encontros de sábado à noite em restaurantes portugueses</p>
            <p class="text-xs text-orange-600 mt-1">Networking com estudantes e jovens profissionais</p>
          </div>
        </div>
        
        <h4>Plataforma Digital da Comunidade</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Grupos WhatsApp de Estudantes:</strong> Grupos específicos por universidade para comunicação rápida</li>
          <li><strong>Emparelhamento de Companheiros de Estudo Portugueses:</strong> Conecte-se com estudantes em programas similares</li>
          <li><strong>Partilha de Alojamento:</strong> Encontre colegas de quarto portugueses e oportunidades de habitação</li>
          <li><strong>Calendário de Eventos:</strong> Nunca perca eventos de estudantes portugueses em Londres</li>
          <li><strong>Partilha de Recursos:</strong> Partilhe livros didáticos, notas e materiais de estudo</li>
        </ul>
        
        <h4>Desenvolvimento Profissional</h4>
        <p>Prepare-se para a sua carreira enquanto constrói redes profissionais portuguesas:</p>
        <ul class="list-disc list-inside space-y-2 mt-3">
          <li><strong>Workshops de CV:</strong> Formatação de CV do Reino Unido com perspetiva portuguesa</li>
          <li><strong>Prática de Entrevistas:</strong> Entrevistas simuladas com profissionais portugueses</li>
          <li><strong>Eventos de Networking:</strong> Conecte-se com empregadores portugueses e agências de recrutamento</li>
          <li><strong>Oportunidades de Estágio:</strong> Acesso a empresas portuguesas oferecendo estágios estudantis</li>
          <li><strong>Programas de Graduados:</strong> Sessões informativas sobre empresas portuguesas que contratam no Reino Unido</li>
        </ul>
        
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p><strong>História de Sucesso:</strong> "Através da rede estudantil da LusoTown, conectei-me com 3 outros estudantes portugueses de engenharia no Imperial. Formámos um grupo de estudo, partilhámos alojamento, e agora todos temos empregos de graduação garantidos com conexões portuguesas!" - Maria Santos, Imperial College London</p>
        </div>
      `,
      icon: UserGroupIcon,
      estimatedTime: 4,
      interactiveElements: [
        {
          type: "checklist",
          title: "Community Integration Checklist",
          titlePortuguese: "Lista de Verificação de Integração Comunitária",
          items: [
            {
              text: "Join weekly coffee meetups with Portuguese students",
              textPortuguese:
                "Juntar-se aos encontros semanais de café com estudantes portugueses",
            },
            {
              text: "Connect with university-specific WhatsApp groups",
              textPortuguese:
                "Conectar-se com grupos WhatsApp específicos da universidade",
            },
            {
              text: "Attend monthly cultural walks and events",
              textPortuguese:
                "Participar em caminhadas culturais e eventos mensais",
            },
            {
              text: "Participate in professional development workshops",
              textPortuguese:
                "Participar em workshops de desenvolvimento profissional",
            },
            {
              text: "Find Portuguese study buddies and accommodation sharing",
              textPortuguese:
                "Encontrar companheiros de estudo portugueses e partilha de alojamento",
            },
          ],
        },
      ],
    },
  ],
};

export default function StudentSupportPage() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // basic handlers to satisfy component contract
  const handleStepComplete = (stepId: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev : [...prev, stepId]
    );
  };
  const handleComplete = () => {
    // no-op for now
  };

  return (
    <LearningModuleFramework
      module={studentSupportModule as unknown as LearningModule}
      onComplete={handleComplete}
      onStepComplete={handleStepComplete}
      completedSteps={completedSteps}
    />
  );
}
