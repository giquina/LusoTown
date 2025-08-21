"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import LearningModuleFramework, {
  LearningModule,
  LearningStep,
} from "@/components/academy/LearningModuleFramework";
import { useLanguage } from "@/context/LanguageContext";

export default function BusinessNetworkingModule() {
  const { language } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const isPortuguese = language === "pt";

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(
      "lusotown-academy-business-networking-progress"
    );
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedSteps(progress.completedSteps || []);
    }
  }, []);

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      const newCompleted = [...completedSteps, stepId];
      setCompletedSteps(newCompleted);

      // Save to localStorage
      localStorage.setItem(
        "lusotown-academy-business-networking-progress",
        JSON.stringify({
          completedSteps: newCompleted,
          lastAccess: Date.now(),
        })
      );
    }
  };

  const handleModuleComplete = () => {
    // Module completion logic
  };

  // Define the learning module structure
  const businessNetworkingModule: LearningModule = {
    id: "business-networking",
    title: "Business Networking",
    titlePortuguese: "Networking Empresarial",
    description:
      "Master professional networking within the Portuguese business community in London",
    descriptionPortuguese:
      "Domine o networking profissional dentro da comunidade empresarial portuguesa em Londres",
    difficulty: "Intermediate",
    estimatedTime: 25,
    icon: Briefcase,
    category: "Professional",
    categoryPortuguese: "Profissional",
    prerequisites: [],
    prerequisitesPortuguese: [],
    learningObjectives: [
      "Build meaningful professional connections with Portuguese entrepreneurs",
      "Navigate business etiquette in bilingual environments",
      "Leverage cultural heritage for business advantages",
      "Create lasting partnerships and collaborations",
      "Develop your personal brand within the Portuguese community",
    ],
    learningObjectivesPortuguese: [
      "Construir conexões profissionais significativas com empreendedores portugueses",
      "Navegar etiqueta empresarial em ambientes bilingues",
      "Aproveitar herança cultural para vantagens empresariais",
      "Criar parcerias e colaborações duradouras",
      "Desenvolver sua marca pessoal dentro da comunidade portuguesa",
    ],
    steps: [
      {
        id: "introduction-portuguese-business",
        title: "Portuguese Business Landscape in London",
        titlePortuguese: "Panorama Empresarial Português em Londres",
        type: "introduction",
        estimatedTime: 4,
        content: `
          <p>Welcome to the Portuguese business community in London - one of the most dynamic and interconnected networks in the city!</p>
          
          <p>Our business ecosystem spans multiple industries and offers unique advantages:</p>
          
          <h3>Key Industry Sectors:</h3>
          <ul>
            <li><strong>Financial Services:</strong> Portuguese professionals in banking, fintech, and investment</li>
            <li><strong>Technology & Innovation:</strong> Portuguese tech entrepreneurs and developers</li>
            <li><strong>Hospitality & Tourism:</strong> Restaurants, hotels, and travel services</li>
            <li><strong>Healthcare & Life Sciences:</strong> Medical professionals and researchers</li>
            <li><strong>Creative Industries:</strong> Design, marketing, and digital agencies</li>
            <li><strong>Import/Export:</strong> Trade connections between UK, Portugal, and Brazil</li>
          </ul>
          
          <h3>Business Community Advantages:</h3>
          <ul>
            <li><strong>Cultural Understanding:</strong> Shared values and communication styles</li>
            <li><strong>Language Benefits:</strong> Bilingual capabilities and international perspective</li>
            <li><strong>Trust Networks:</strong> Strong reputation-based business relationships</li>
            <li><strong>Market Access:</strong> Connections to Portuguese-speaking markets worldwide</li>
          </ul>
          
          <p>Understanding these foundations will help you navigate and contribute to our thriving business community.</p>
        `,
        contentPortuguese: `
          <p>Bem-vindo à comunidade empresarial portuguesa em Londres - uma das redes mais dinâmicas e interconectadas da cidade!</p>
          
          <p>O nosso ecossistema empresarial abrange múltiplas indústrias e oferece vantagens únicas:</p>
          
          <h3>Sectores Industriais Principais:</h3>
          <ul>
            <li><strong>Serviços Financeiros:</strong> Profissionais portugueses em banca, fintech e investimento</li>
            <li><strong>Tecnologia e Inovação:</strong> Empreendedores e programadores portugueses de tecnologia</li>
            <li><strong>Hotelaria e Turismo:</strong> Restaurantes, hotéis e serviços de viagem</li>
            <li><strong>Saúde e Ciências da Vida:</strong> Profissionais médicos e investigadores</li>
            <li><strong>Indústrias Criativas:</strong> Design, marketing e agências digitais</li>
            <li><strong>Importação/Exportação:</strong> Conexões comerciais entre Reino Unido, Portugal e Brasil</li>
          </ul>
          
          <h3>Vantagens da Comunidade Empresarial:</h3>
          <ul>
            <li><strong>Compreensão Cultural:</strong> Valores partilhados e estilos de comunicação</li>
            <li><strong>Benefícios Linguísticos:</strong> Capacidades bilingues e perspetiva internacional</li>
            <li><strong>Redes de Confiança:</strong> Relacionamentos empresariais baseados em reputação forte</li>
            <li><strong>Acesso ao Mercado:</strong> Conexões com mercados lusófonos mundialmente</li>
          </ul>
          
          <p>Compreender estas fundações ajudá-lo-á a navegar e contribuir para a nossa próspera comunidade empresarial.</p>
        `,
        tips: [
          "Start by observing existing business interactions at Portuguese events",
          "Research successful Portuguese business owners in your industry",
          "Understand the blend of British business formality with Portuguese warmth",
        ],
        tipsPortuguese: [
          "Comece por observar interações empresariais existentes em eventos portugueses",
          "Pesquise empresários portugueses bem-sucedidos na sua indústria",
          "Compreenda a mistura de formalidade empresarial britânica com cordialidade portuguesa",
        ],
      },
      {
        id: "building-professional-relationships",
        title: "Building Authentic Professional Relationships",
        titlePortuguese: "Construindo Relacionamentos Profissionais Autênticos",
        type: "tutorial",
        estimatedTime: 6,
        content: `
          <p>Portuguese business culture emphasizes genuine relationships over transactional interactions. Here's how to build lasting professional connections:</p>
          
          <h3>The Portuguese Approach to Business Relationships:</h3>
          
          <h4>1. Personal Connection First</h4>
          <ul>
            <li><strong>Family and Background:</strong> Share your Portuguese heritage story</li>
            <li><strong>Regional Pride:</strong> Discuss your connection to specific Portuguese regions</li>
            <li><strong>London Experience:</strong> Exchange stories about settling in London</li>
            <li><strong>Cultural Interests:</strong> Mention Portuguese traditions you maintain</li>
          </ul>
          
          <h4>2. Professional Credibility Building</h4>
          <ul>
            <li><strong>Expertise Sharing:</strong> Offer genuine value and insights</li>
            <li><strong>Success Stories:</strong> Share achievements without boasting</li>
            <li><strong>Challenge Solutions:</strong> Discuss how you've overcome business obstacles</li>
            <li><strong>Industry Knowledge:</strong> Demonstrate understanding of both UK and Portuguese markets</li>
          </ul>
          
          <h4>3. Long-term Relationship Mindset</h4>
          <ul>
            <li><strong>Patience:</strong> Don't rush into business propositions</li>
            <li><strong>Consistency:</strong> Regular, meaningful contact over time</li>
            <li><strong>Reciprocity:</strong> Always look for ways to help others first</li>
            <li><strong>Community Contribution:</strong> Support Portuguese community initiatives</li>
          </ul>
          
          <h3>Conversation Starters for Professional Settings:</h3>
          <ul>
            <li>"What brought you from Portugal to London in your career?"</li>
            <li>"How has your Portuguese background influenced your business approach?"</li>
            <li>"What opportunities do you see in connecting UK and Portuguese markets?"</li>
            <li>"Which Portuguese business traditions do you maintain in London?"</li>
          </ul>
        `,
        contentPortuguese: `
          <p>A cultura empresarial portuguesa enfatiza relacionamentos genuínos sobre interações transacionais. Aqui está como construir conexões profissionais duradouras:</p>
          
          <h3>A Abordagem Portuguesa aos Relacionamentos Empresariais:</h3>
          
          <h4>1. Conexão Pessoal Primeiro</h4>
          <ul>
            <li><strong>Família e Origem:</strong> Partilhe a sua história de herança portuguesa</li>
            <li><strong>Orgulho Regional:</strong> Discuta a sua conexão com regiões portuguesas específicas</li>
            <li><strong>Experiência em Londres:</strong> Troque histórias sobre estabelecer-se em Londres</li>
            <li><strong>Interesses Culturais:</strong> Mencione tradições portuguesas que mantém</li>
          </ul>
          
          <h4>2. Construção de Credibilidade Profissional</h4>
          <ul>
            <li><strong>Partilha de Expertise:</strong> Ofereça valor genuíno e insights</li>
            <li><strong>Histórias de Sucesso:</strong> Partilhe conquistas sem se gabar</li>
            <li><strong>Soluções de Desafios:</strong> Discuta como superou obstáculos empresariais</li>
            <li><strong>Conhecimento da Indústria:</strong> Demonstre compreensão dos mercados do Reino Unido e Portugal</li>
          </ul>
          
          <h4>3. Mentalidade de Relacionamento a Longo Prazo</h4>
          <ul>
            <li><strong>Paciência:</strong> Não se apresse em proposições empresariais</li>
            <li><strong>Consistência:</strong> Contacto regular e significativo ao longo do tempo</li>
            <li><strong>Reciprocidade:</strong> Procure sempre formas de ajudar outros primeiro</li>
            <li><strong>Contribuição Comunitária:</strong> Apoie iniciativas da comunidade portuguesa</li>
          </ul>
          
          <h3>Iniciadores de Conversa para Ambientes Profissionais:</h3>
          <ul>
            <li>"O que o trouxe de Portugal para Londres na sua carreira?"</li>
            <li>"Como a sua origem portuguesa influenciou a sua abordagem empresarial?"</li>
            <li>"Que oportunidades vê em conectar os mercados do Reino Unido e Portugal?"</li>
            <li>"Que tradições empresariais portuguesas mantém em Londres?"</li>
          </ul>
        `,
        interactive: {
          type: "checklist",
          data: {
            items: [
              {
                text: "Prepare your Portuguese heritage story",
                textPortuguese: "Prepare a sua história de herança portuguesa",
              },
              {
                text: "Research 3 Portuguese business leaders in London",
                textPortuguese:
                  "Pesquise 3 líderes empresariais portugueses em Londres",
              },
              {
                text: "Practice professional introduction in both English and Portuguese",
                textPortuguese:
                  "Pratique apresentação profissional em inglês e português",
              },
              {
                text: "Identify ways you can contribute to the Portuguese business community",
                textPortuguese:
                  "Identifique formas de contribuir para a comunidade empresarial portuguesa",
              },
            ],
          },
        },
        tips: [
          "Always follow up within 48 hours after meeting someone new",
          "Connect on LinkedIn with a personalized message referencing your conversation",
          'Offer specific help or resources rather than generic "let me know if I can help"',
        ],
        tipsPortuguese: [
          "Sempre faça seguimento dentro de 48 horas após conhecer alguém novo",
          "Conecte no LinkedIn com uma mensagem personalizada referenciando a sua conversa",
          'Ofereça ajuda específica ou recursos em vez de genérico "me diga se posso ajudar"',
        ],
      },
      {
        id: "networking-events-strategies",
        title: "Mastering Portuguese Business Events",
        titlePortuguese: "Dominando Eventos Empresariais Portugueses",
        type: "tutorial",
        estimatedTime: 5,
        content: `
          <p>Portuguese business events blend professional networking with cultural celebration. Here's how to maximize your impact:</p>
          
          <h3>Types of Portuguese Business Events:</h3>
          
          <h4>1. Chamber of Commerce Events</h4>
          <ul>
            <li><strong>Format:</strong> Formal presentations followed by networking</li>
            <li><strong>Dress Code:</strong> Business formal</li>
            <li><strong>Focus:</strong> Trade opportunities and economic partnerships</li>
            <li><strong>Strategy:</strong> Prepare industry-specific insights to share</li>
          </ul>
          
          <h4>2. Portuguese Restaurant Business Dinners</h4>
          <ul>
            <li><strong>Format:</strong> Intimate dinners with 8-12 professionals</li>
            <li><strong>Atmosphere:</strong> Relaxed but purposeful</li>
            <li><strong>Cultural Element:</strong> Traditional Portuguese cuisine</li>
            <li><strong>Strategy:</strong> Focus on building personal connections</li>
          </ul>
          
          <h4>3. Industry-Specific Meetups</h4>
          <ul>
            <li><strong>Tech Talks:</strong> Portuguese technology professionals</li>
            <li><strong>Finance Forums:</strong> Banking and investment discussions</li>
            <li><strong>Creative Showcases:</strong> Portuguese artists and designers</li>
            <li><strong>Strategy:</strong> Demonstrate expertise while learning from others</li>
          </ul>
          
          <h4>4. Cultural Events with Business Elements</h4>
          <ul>
            <li><strong>Portuguese National Day celebrations</li>
            <li><strong>Fado nights with business networking</li>
            <li><strong>Portuguese wine tastings</li>
            <li><strong>Strategy:</strong> Balance cultural appreciation with professional goals</li>
          </ul>
          
          <h3>Event Success Strategies:</h3>
          
          <h4>Before the Event:</h4>
          <ul>
            <li>Research attendees and speakers in advance</li>
            <li>Prepare 3-4 conversation topics relevant to Portuguese business</li>
            <li>Set specific goals (e.g., meet 5 new people, learn about 2 industries)</li>
            <li>Prepare business cards with both English and Portuguese contact details</li>
          </ul>
          
          <h4>During the Event:</h4>
          <ul>
            <li>Arrive early to help with setup (shows community commitment)</li>
            <li>Listen actively and ask thoughtful questions</li>
            <li>Share your expertise generously</li>
            <li>Exchange contact information meaningfully</li>
            <li>Take notes on conversations for follow-up</li>
          </ul>
          
          <h4>After the Event:</h4>
          <ul>
            <li>Follow up within 24-48 hours</li>
            <li>Reference specific conversation points</li>
            <li>Offer promised resources or introductions</li>
            <li>Connect on professional social media platforms</li>
            <li>Suggest one-on-one coffee meetings for deeper connections</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Eventos empresariais portugueses misturam networking profissional com celebração cultural. Aqui está como maximizar o seu impacto:</p>
          
          <h3>Tipos de Eventos Empresariais Portugueses:</h3>
          
          <h4>1. Eventos da Câmara de Comércio</h4>
          <ul>
            <li><strong>Formato:</strong> Apresentações formais seguidas de networking</li>
            <li><strong>Código de Vestuário:</strong> Empresarial formal</li>
            <li><strong>Foco:</strong> Oportunidades comerciais e parcerias económicas</li>
            <li><strong>Estratégia:</strong> Prepare insights específicos da indústria para partilhar</li>
          </ul>
          
          <h4>2. Jantares Empresariais em Restaurantes Portugueses</h4>
          <ul>
            <li><strong>Formato:</strong> Jantares íntimos com 8-12 profissionais</li>
            <li><strong>Atmosfera:</strong> Relaxada mas com propósito</li>
            <li><strong>Elemento Cultural:</strong> Culinária tradicional portuguesa</li>
            <li><strong>Estratégia:</strong> Foque em construir conexões pessoais</li>
          </ul>
          
          <h4>3. Encontros Específicos da Indústria</h4>
          <ul>
            <li><strong>Palestras de Tecnologia:</strong> Profissionais portugueses de tecnologia</li>
            <li><strong>Fóruns Financeiros:</strong> Discussões de banca e investimento</li>
            <li><strong>Mostras Criativas:</strong> Artistas e designers portugueses</li>
            <li><strong>Estratégia:</strong> Demonstre expertise enquanto aprende com outros</li>
          </ul>
          
          <h4>4. Eventos Culturais com Elementos Empresariais</h4>
          <ul>
            <li><strong>Celebrações do Dia Nacional Português</li>
            <li><strong>Noites de fado com networking empresarial</li>
            <li><strong>Degustações de vinhos portugueses</li>
            <li><strong>Estratégia:</strong> Equilibre apreciação cultural com objetivos profissionais</li>
          </ul>
          
          <h3>Estratégias de Sucesso em Eventos:</h3>
          
          <h4>Antes do Evento:</h4>
          <ul>
            <li>Pesquise participantes e oradores antecipadamente</li>
            <li>Prepare 3-4 tópicos de conversa relevantes para negócios portugueses</li>
            <li>Defina objetivos específicos (ex: conhecer 5 pessoas novas, aprender sobre 2 indústrias)</li>
            <li>Prepare cartões de visita com detalhes de contacto em inglês e português</li>
          </ul>
          
          <h4>Durante o Evento:</h4>
          <ul>
            <li>Chegue cedo para ajudar com a preparação (mostra compromisso comunitário)</li>
            <li>Escute ativamente e faça perguntas reflexivas</li>
            <li>Partilhe a sua expertise generosamente</li>
            <li>Troque informações de contacto significativamente</li>
            <li>Tome notas sobre conversas para seguimento</li>
          </ul>
          
          <h4>Após o Evento:</h4>
          <ul>
            <li>Faça seguimento dentro de 24-48 horas</li>
            <li>Referencie pontos específicos da conversa</li>
            <li>Ofereça recursos prometidos ou apresentações</li>
            <li>Conecte em plataformas de redes sociais profissionais</li>
            <li>Sugira encontros individuais para café para conexões mais profundas</li>
          </ul>
        `,
        interactive: {
          type: "checklist",
          data: {
            items: [
              {
                text: "Research upcoming Portuguese business events in London",
                textPortuguese:
                  "Pesquise próximos eventos empresariais portugueses em Londres",
              },
              {
                text: "Prepare your 30-second elevator pitch in both languages",
                textPortuguese:
                  "Prepare o seu pitch de elevador de 30 segundos em ambos os idiomas",
              },
              {
                text: "Design business cards with Portuguese cultural elements",
                textPortuguese:
                  "Desenhe cartões de visita com elementos culturais portugueses",
              },
              {
                text: "Practice active listening techniques",
                textPortuguese: "Pratique técnicas de escuta ativa",
              },
            ],
          },
        },
        tips: [
          "Dress slightly more formally than expected - Portuguese business culture values presentation",
          "Learn key business phrases in Portuguese even if the event is primarily in English",
          "Bring small Portuguese gifts (like pastéis de nata) to memorable first meetings",
        ],
        tipsPortuguese: [
          "Vista-se ligeiramente mais formal do que esperado - a cultura empresarial portuguesa valoriza a apresentação",
          "Aprenda frases empresariais chave em português mesmo que o evento seja principalmente em inglês",
          "Traga pequenos presentes portugueses (como pastéis de nata) para primeiros encontros memoráveis",
        ],
      },
      {
        id: "leveraging-cultural-heritage",
        title: "Leveraging Your Portuguese Heritage in Business",
        titlePortuguese: "Aproveitando a Sua Herança Portuguesa nos Negócios",
        type: "interactive",
        estimatedTime: 5,
        content: `
          <p>Your Portuguese heritage is a significant business asset in London's diverse market. Here's how to leverage it effectively:</p>
          
          <h3>Cultural Assets for Business Success:</h3>
          
          <h4>1. Language and Communication Advantages</h4>
          <ul>
            <li><strong>Multilingual Skills:</strong> Portuguese, English, often Spanish</li>
            <li><strong>Global Market Access:</strong> 260+ million Portuguese speakers worldwide</li>
            <li><strong>Cultural Bridge:</strong> Understanding Latin and Southern European markets</li>
            <li><strong>Business Application:</strong> International partnerships, customer service, market expansion</li>
          </ul>
          
          <h4>2. Portuguese Business Values</h4>
          <ul>
            <li><strong>Relationship-First Approach:</strong> Long-term partnerships over quick profits</li>
            <li><strong>Family Business Ethics:</strong> Loyalty, trust, and personal accountability</li>
            <li><strong>Work-Life Integration:</strong> Balanced approach to business success</li>
            <li><strong>Community Support:</strong> Mutual assistance and collaboration</li>
          </ul>
          
          <h4>3. Industry-Specific Opportunities</h4>
          <ul>
            <li><strong>Tourism & Hospitality:</strong> Authentic Portuguese experiences in London</li>
            <li><strong>Import/Export:</strong> Unique products from Portugal and Portuguese-speaking countries</li>
            <li><strong>Financial Services:</strong> Cross-border banking and investment</li>
            <li><strong>Technology:</strong> Bridge between European and Latin American markets</li>
            <li><strong>Creative Industries:</strong> Portuguese design, arts, and media</li>
          </ul>
          
          <h3>Practical Applications:</h3>
          
          <h4>In Client Relationships:</h4>
          <ul>
            <li>Offer bilingual services and materials</li>
            <li>Understand cultural nuances in business communication</li>
            <li>Provide insights into Portuguese and Latin markets</li>
            <li>Create authentic cultural experiences</li>
          </ul>
          
          <h4>In Team Building:</h4>
          <ul>
            <li>Introduce Portuguese team-building concepts</li>
            <li>Share cross-cultural perspectives in problem-solving</li>
            <li>Organize Portuguese-themed team events</li>
            <li>Mentor other Portuguese professionals</li>
          </ul>
          
          <h4>In Business Development:</h4>
          <ul>
            <li>Identify partnership opportunities with Portuguese companies</li>
            <li>Develop products/services for Portuguese community needs</li>
            <li>Create authentic marketing for Portuguese audiences</li>
            <li>Build bridges between British and Portuguese business practices</li>
          </ul>
          
          <h3>Success Stories Examples:</h3>
          <ul>
            <li><strong>Tech Entrepreneur:</strong> Created UK-Portugal startup accelerator</li>
            <li><strong>Restaurant Owner:</strong> Authentic Portuguese cuisine with business networking events</li>
            <li><strong>Financial Advisor:</strong> Specialized in Portugal-UK property investment</li>
            <li><strong>Marketing Agency:</strong> Focus on European market entry for British companies</li>
          </ul>
        `,
        contentPortuguese: `
          <p>A sua herança portuguesa é um ativo empresarial significativo no mercado diverso de Londres. Aqui está como aproveitá-la efetivamente:</p>
          
          <h3>Ativos Culturais para Sucesso Empresarial:</h3>
          
          <h4>1. Vantagens de Idioma e Comunicação</h4>
          <ul>
            <li><strong>Competências Multilíngues:</strong> Português, inglês, frequentemente espanhol</li>
            <li><strong>Acesso a Mercado Global:</strong> 260+ milhões de falantes de português mundialmente</li>
            <li><strong>Ponte Cultural:</strong> Compreensão dos mercados latinos e do sul da Europa</li>
            <li><strong>Aplicação Empresarial:</strong> Parcerias internacionais, atendimento ao cliente, expansão de mercado</li>
          </ul>
          
          <h4>2. Valores Empresariais Portugueses</h4>
          <ul>
            <li><strong>Abordagem Relacionamento-Primeiro:</strong> Parcerias de longo prazo sobre lucros rápidos</li>
            <li><strong>Ética de Negócios Familiares:</strong> Lealdade, confiança e responsabilidade pessoal</li>
            <li><strong>Integração Trabalho-Vida:</strong> Abordagem equilibrada ao sucesso empresarial</li>
            <li><strong>Apoio Comunitário:</strong> Assistência mútua e colaboração</li>
          </ul>
          
          <h4>3. Oportunidades Específicas da Indústria</h4>
          <ul>
            <li><strong>Turismo e Hotelaria:</strong> Experiências portuguesas autênticas em Londres</li>
            <li><strong>Importação/Exportação:</strong> Produtos únicos de Portugal e países lusófonos</li>
            <li><strong>Serviços Financeiros:</strong> Banca e investimento transfronteiriço</li>
            <li><strong>Tecnologia:</strong> Ponte entre mercados europeus e latino-americanos</li>
            <li><strong>Indústrias Criativas:</strong> Design, artes e media portugueses</li>
          </ul>
          
          <h3>Aplicações Práticas:</h3>
          
          <h4>Em Relacionamentos com Clientes:</h4>
          <ul>
            <li>Ofereça serviços e materiais bilingues</li>
            <li>Compreenda nuances culturais na comunicação empresarial</li>
            <li>Forneça insights sobre mercados portugueses e latinos</li>
            <li>Crie experiências culturais autênticas</li>
          </ul>
          
          <h4>Na Construção de Equipas:</h4>
          <ul>
            <li>Introduza conceitos portugueses de construção de equipas</li>
            <li>Partilhe perspetivas interculturais na resolução de problemas</li>
            <li>Organize eventos de equipa com tema português</li>
            <li>Mentorize outros profissionais portugueses</li>
          </ul>
          
          <h4>No Desenvolvimento de Negócios:</h4>
          <ul>
            <li>Identifique oportunidades de parceria com empresas portuguesas</li>
            <li>Desenvolva produtos/serviços para necessidades da comunidade portuguesa</li>
            <li>Crie marketing autêntico para audiências portuguesas</li>
            <li>Construa pontes entre práticas empresariais britânicas e portuguesas</li>
          </ul>
          
          <h3>Exemplos de Histórias de Sucesso:</h3>
          <ul>
            <li><strong>Empreendedor de Tecnologia:</strong> Criou aceleradora de startups Reino Unido-Portugal</li>
            <li><strong>Dono de Restaurante:</strong> Culinária portuguesa autêntica com eventos de networking empresarial</li>
            <li><strong>Consultor Financeiro:</strong> Especializado em investimento imobiliário Portugal-Reino Unido</li>
            <li><strong>Agência de Marketing:</strong> Foco na entrada no mercado europeu para empresas britânicas</li>
          </ul>
        `,
        interactive: {
          type: "checklist",
          data: {
            items: [
              {
                text: "List your Portuguese cultural strengths and how they apply to business",
                textPortuguese:
                  "Liste as suas forças culturais portuguesas e como se aplicam aos negócios",
              },
              {
                text: "Identify potential Portuguese business partnerships in your industry",
                textPortuguese:
                  "Identifique potenciais parcerias empresariais portuguesas na sua indústria",
              },
              {
                text: "Research Portuguese market opportunities for your business",
                textPortuguese:
                  "Pesquise oportunidades de mercado português para o seu negócio",
              },
              {
                text: "Plan ways to incorporate Portuguese elements into your professional brand",
                textPortuguese:
                  "Planeie formas de incorporar elementos portugueses na sua marca profissional",
              },
            ],
          },
        },
        tips: [
          "Be proud but not overwhelming about your heritage - let it enhance rather than define your professional identity",
          "Stay updated on Portuguese economic and cultural news to provide current insights",
          "Consider obtaining dual citizenship if eligible for enhanced business opportunities",
        ],
        tipsPortuguese: [
          "Seja orgulhoso mas não avassalador sobre a sua herança - deixe-a melhorar em vez de definir a sua identidade profissional",
          "Mantenha-se atualizado sobre notícias económicas e culturais portuguesas para fornecer insights atuais",
          "Considere obter dupla cidadania se elegível para oportunidades empresariais melhoradas",
        ],
      },
      {
        id: "digital-networking-and-follow-up",
        title: "Digital Networking and Relationship Maintenance",
        titlePortuguese: "Networking Digital e Manutenção de Relacionamentos",
        type: "tutorial",
        estimatedTime: 5,
        content: `
          <p>In today's hybrid business environment, digital networking is essential for maintaining and growing your Portuguese professional network.</p>
          
          <h3>Digital Platforms for Portuguese Business Networking:</h3>
          
          <h4>1. LinkedIn Strategy</h4>
          <ul>
            <li><strong>Profile Optimization:</strong>
              <ul>
                <li>Include Portuguese language skills</li>
                <li>Mention Portuguese business experience</li>
                <li>Use Portuguese flag in your location</li>
                <li>Write summary in both English and Portuguese</li>
              </ul>
            </li>
            <li><strong>Content Strategy:</strong>
              <ul>
                <li>Share insights about Portuguese business culture</li>
                <li>Comment thoughtfully on Portuguese professionals' posts</li>
                <li>Write articles about cross-cultural business</li>
                <li>Share success stories from the Portuguese community</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. WhatsApp Business Groups</h4>
          <ul>
            <li><strong>Portuguese Business London groups</li>
            <li><strong>Industry-specific Portuguese professional groups</li>
            <li><strong>Chamber of Commerce communication channels</li>
            <li><strong>Best Practices:</strong>
              <ul>
                <li>Contribute valuable content, not just promotions</li>
                <li>Respect group rules and cultural norms</li>
                <li>Use appropriate language (Portuguese vs English)</li>
                <li>Network privately before posting business proposals</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Portuguese Business Forums and Communities</h4>
          <ul>
            <li><strong>LusoTown Business Network</li>
            <li><strong>Portuguese Chamber of Commerce online platforms</li>
            <li><strong>Facebook business groups</li>
            <li><strong>Discord servers for Portuguese entrepreneurs</li>
          </ul>
          
          <h3>Follow-Up Systems and Relationship Maintenance:</h3>
          
          <h4>1. The 48-Hour Rule</h4>
          <ul>
            <li><strong>Immediate Follow-up Template:</strong>
              <br>Subject: Great meeting you at [Event Name] - [Your Name]
              <br>Message: Reference specific conversation point + offer value + suggest next step</li>
            <li><strong>Portuguese Touch:</strong> Include a Portuguese greeting or cultural reference</li>
          </ul>
          
          <h4>2. Monthly Relationship Review</h4>
          <ul>
            <li><strong>Review contacts from the past month</li>
            <li><strong>Categorize relationships:</strong>
              <ul>
                <li>Hot prospects (immediate business potential)</li>
                <li>Warm connections (developing relationships)</li>
                <li>Long-term relationships (industry contacts)</li>
                <li>Mentors and advisors</li>
              </ul>
            </li>
            <li><strong>Schedule appropriate follow-ups for each category</li>
          </ul>
          
          <h4>3. Value-First Communication</h4>
          <ul>
            <li><strong>Industry News:</strong> Share relevant Portuguese business news</li>
            <li><strong>Introductions:</strong> Connect your contacts with each other</li>
            <li><strong>Resources:</strong> Send useful tools, articles, or opportunities</li>
            <li><strong>Cultural Events:</strong> Invite connections to Portuguese business events</li>
          </ul>
          
          <h3>Digital Etiquette for Portuguese Professionals:</h3>
          
          <h4>Communication Style:</h4>
          <ul>
            <li><strong>Warmth:</strong> Maintain Portuguese friendliness even in digital communication</li>
            <li><strong>Respect:</strong> Use appropriate titles and formal language initially</li>
            <li><strong>Personal Touch:</strong> Reference personal details from previous conversations</li>
            <li><strong>Cultural Sensitivity:</strong> Be aware of Portuguese holidays and customs</li>
          </ul>
          
          <h4>Response Timing:</h4>
          <ul>
            <li><strong>WhatsApp:</strong> Within 4-6 hours during business days</li>
            <li><strong>LinkedIn:</strong> Within 24-48 hours</li>
            <li><strong>Email:</strong> Within 24 hours for business inquiries</li>
            <li><strong>Cultural Note:</strong> Portuguese business culture values prompt responses</li>
          </ul>
        `,
        contentPortuguese: `
          <p>No ambiente empresarial híbrido de hoje, o networking digital é essencial para manter e fazer crescer a sua rede profissional portuguesa.</p>
          
          <h3>Plataformas Digitais para Networking Empresarial Português:</h3>
          
          <h4>1. Estratégia LinkedIn</h4>
          <ul>
            <li><strong>Otimização de Perfil:</strong>
              <ul>
                <li>Inclua competências em língua portuguesa</li>
                <li>Mencione experiência empresarial portuguesa</li>
                <li>Use bandeira portuguesa na sua localização</li>
                <li>Escreva resumo em inglês e português</li>
              </ul>
            </li>
            <li><strong>Estratégia de Conteúdo:</strong>
              <ul>
                <li>Partilhe insights sobre cultura empresarial portuguesa</li>
                <li>Comente reflexivamente em posts de profissionais portugueses</li>
                <li>Escreva artigos sobre negócios interculturais</li>
                <li>Partilhe histórias de sucesso da comunidade portuguesa</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Grupos WhatsApp Business</h4>
          <ul>
            <li><strong>Grupos Portuguese Business London</li>
            <li><strong>Grupos profissionais portugueses específicos da indústria</li>
            <li><strong>Canais de comunicação da Câmara de Comércio</li>
            <li><strong>Melhores Práticas:</strong>
              <ul>
                <li>Contribua com conteúdo valioso, não apenas promoções</li>
                <li>Respeite regras do grupo e normas culturais</li>
                <li>Use idioma apropriado (português vs inglês)</li>
                <li>Faça networking privadamente antes de postar propostas empresariais</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Fóruns e Comunidades Empresariais Portugueses</h4>
          <ul>
            <li><strong>Rede Empresarial LusoTown</li>
            <li><strong>Plataformas online da Câmara de Comércio Portuguesa</li>
            <li><strong>Grupos empresariais do Facebook</li>
            <li><strong>Servidores Discord para empreendedores portugueses</li>
          </ul>
          
          <h3>Sistemas de Seguimento e Manutenção de Relacionamentos:</h3>
          
          <h4>1. A Regra das 48 Horas</h4>
          <ul>
            <li><strong>Modelo de Seguimento Imediato:</strong>
              <br>Assunto: Foi ótimo conhecê-lo em [Nome do Evento] - [Seu Nome]
              <br>Mensagem: Referencie ponto específico da conversa + ofereça valor + sugira próximo passo</li>
            <li><strong>Toque Português:</strong> Inclua uma saudação portuguesa ou referência cultural</li>
          </ul>
          
          <h4>2. Revisão Mensal de Relacionamentos</h4>
          <ul>
            <li><strong>Revise contactos do mês passado</li>
            <li><strong>Categorize relacionamentos:</strong>
              <ul>
                <li>Prospects quentes (potencial empresarial imediato)</li>
                <li>Conexões mornas (relacionamentos em desenvolvimento)</li>
                <li>Relacionamentos de longo prazo (contactos da indústria)</li>
                <li>Mentores e conselheiros</li>
              </ul>
            </li>
            <li><strong>Programe seguimentos apropriados para cada categoria</li>
          </ul>
          
          <h4>3. Comunicação Valor-Primeiro</h4>
          <ul>
            <li><strong>Notícias da Indústria:</strong> Partilhe notícias empresariais portuguesas relevantes</li>
            <li><strong>Apresentações:</strong> Conecte os seus contactos uns com os outros</li>
            <li><strong>Recursos:</strong> Envie ferramentas úteis, artigos ou oportunidades</li>
            <li><strong>Eventos Culturais:</strong> Convide conexões para eventos empresariais portugueses</li>
          </ul>
          
          <h3>Etiqueta Digital para Profissionais Portugueses:</h3>
          
          <h4>Estilo de Comunicação:</h4>
          <ul>
            <li><strong>Cordialidade:</strong> Mantenha a simpatia portuguesa mesmo na comunicação digital</li>
            <li><strong>Respeito:</strong> Use títulos apropriados e linguagem formal inicialmente</li>
            <li><strong>Toque Pessoal:</strong> Referencie detalhes pessoais de conversas anteriores</li>
            <li><strong>Sensibilidade Cultural:</strong> Esteja ciente de feriados e costumes portugueses</li>
          </ul>
          
          <h4>Tempo de Resposta:</h4>
          <ul>
            <li><strong>WhatsApp:</strong> Dentro de 4-6 horas durante dias úteis</li>
            <li><strong>LinkedIn:</strong> Dentro de 24-48 horas</li>
            <li><strong>Email:</strong> Dentro de 24 horas para consultas empresariais</li>
            <li><strong>Nota Cultural:</strong> A cultura empresarial portuguesa valoriza respostas prontas</li>
          </ul>
        `,
        interactive: {
          type: "checklist",
          data: {
            items: [
              {
                text: "Optimize your LinkedIn profile with Portuguese business elements",
                textPortuguese:
                  "Otimize o seu perfil LinkedIn com elementos empresariais portugueses",
              },
              {
                text: "Join 3 Portuguese business WhatsApp or LinkedIn groups",
                textPortuguese:
                  "Junte-se a 3 grupos empresariais portugueses no WhatsApp ou LinkedIn",
              },
              {
                text: "Create a contact management system for follow-ups",
                textPortuguese:
                  "Crie um sistema de gestão de contactos para seguimentos",
              },
              {
                text: "Schedule monthly relationship review in your calendar",
                textPortuguese:
                  "Agende revisão mensal de relacionamentos no seu calendário",
              },
            ],
          },
        },
        warnings: [
          "Never add people to WhatsApp groups without permission",
          "Avoid over-posting on professional platforms - quality over quantity",
          "Respect privacy settings and professional boundaries",
          "Don't mix personal and business communication unless appropriate",
        ],
        warningsPortuguese: [
          "Nunca adicione pessoas a grupos WhatsApp sem permissão",
          "Evite postar demais em plataformas profissionais - qualidade sobre quantidade",
          "Respeite configurações de privacidade e limites profissionais",
          "Não misture comunicação pessoal e empresarial a menos que apropriado",
        ],
      },
    ],
    practicalExercises: [],
    resources: [
      {
        title: "Portuguese Chamber of Commerce UK Events",
        titlePortuguese: "Eventos da Câmara de Comércio Portuguesa Reino Unido",
        url: "/business-networking/chamber-events",
        type: "external",
      },
      {
        title: "Business Networking Email Templates",
        titlePortuguese: "Modelos de Email para Networking Empresarial",
        url: "/downloads/business-networking-templates.pdf",
        type: "download",
      },
      {
        title: "Portuguese Business Etiquette Guide",
        titlePortuguese: "Guia de Etiqueta Empresarial Portuguesa",
        url: "/guides/portuguese-business-etiquette",
        type: "guide",
      },
      {
        title: "LinkedIn Optimization Checklist",
        titlePortuguese: "Lista de Verificação de Otimização LinkedIn",
        url: "/downloads/linkedin-optimization-checklist.pdf",
        type: "download",
      },
    ],
  };

  return (
    <LearningModuleFramework
      module={businessNetworkingModule}
      onComplete={handleModuleComplete}
      onStepComplete={handleStepComplete}
      completedSteps={completedSteps}
      showProgress={true}
    />
  );
}
