'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Music, Star, Camera, MapPin, Clock, Gift } from 'lucide-react';
import LearningModuleFramework, { LearningModule, LearningStep } from '@/components/academy/LearningModuleFramework';
import { useLanguage } from '@/context/LanguageContext';

export default function CulturalEventsModule() {
  const { language } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const isPortuguese = language === 'pt';

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lusotown-academy-cultural-events-progress');
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
      localStorage.setItem('lusotown-academy-cultural-events-progress', JSON.stringify({
        completedSteps: newCompleted,
        lastAccess: Date.now()
      }));
    }
  };

  const handleModuleComplete = () => {
    // Module completion logic
  };

  // Define the learning module structure
  const culturalEventsModule: LearningModule = {
    id: 'cultural-events',
    title: 'Cultural Events',
    titlePortuguese: 'Eventos Culturais',
    description: 'Discover, attend, and organize authentic Portuguese cultural events in London',
    descriptionPortuguese: 'Descubra, participe e organize eventos culturais portugueses autênticos em Londres',
    difficulty: 'Beginner',
    estimatedTime: 22,
    icon: Calendar,
    category: 'Cultural',
    categoryPortuguese: 'Cultural',
    prerequisites: [],
    prerequisitesPortuguese: [],
    learningObjectives: [
      'Navigate London\'s Portuguese cultural events calendar',
      'Understand Portuguese cultural traditions and celebrations',
      'Connect with the Portuguese community through cultural activities',
      'Organize your own Portuguese cultural events',
      'Blend Portuguese heritage with London lifestyle'
    ],
    learningObjectivesPortuguese: [
      'Navegar no calendário de eventos culturais portugueses de Londres',
      'Compreender tradições e celebrações culturais portuguesas',
      'Conectar-se com a comunidade portuguesa através de atividades culturais',
      'Organizar os seus próprios eventos culturais portugueses',
      'Misturar herança portuguesa com estilo de vida londrino'
    ],
    steps: [
      {
        id: 'portuguese-cultural-calendar',
        title: 'Understanding the Portuguese Cultural Calendar in London',
        titlePortuguese: 'Compreendendo o Calendário Cultural Português em Londres',
        type: 'introduction',
        estimatedTime: 4,
        content: `
          <p>London's Portuguese community maintains a rich cultural calendar that celebrates our heritage while embracing our new home. Understanding this calendar helps you stay connected to your roots and build meaningful relationships.</p>
          
          <h3>Major Portuguese Cultural Events in London:</h3>
          
          <h4>Annual Celebrations:</h4>
          <ul>
            <li><strong>Portugal Day (June 10th):</strong> 
              <ul>
                <li>Camões Day celebrations across London</li>
                <li>Portuguese Embassy events</li>
                <li>Community gatherings in Portuguese neighborhoods</li>
                <li>Traditional Portuguese music and dance performances</li>
              </ul>
            </li>
            <li><strong>Festa dos Tabuleiros (varies):</strong>
              <ul>
                <li>Traditional festival celebrations</li>
                <li>Portuguese folk dancing and costumes</li>
                <li>Traditional Portuguese food experiences</li>
              </ul>
            </li>
            <li><strong>São João Festival (June 23rd):</strong>
              <ul>
                <li>Midsummer celebrations with Portuguese twist</li>
                <li>Traditional Portuguese barbecues</li>
                <li>Community bonfire gatherings</li>
              </ul>
            </li>
          </ul>
          
          <h4>Monthly Cultural Activities:</h4>
          <ul>
            <li><strong>Fado Nights:</strong> Traditional Portuguese music evenings</li>
            <li><strong>Portuguese Film Screenings:</strong> Contemporary and classic cinema</li>
            <li><strong>Cultural Workshops:</strong> Portuguese cooking, crafts, and traditions</li>
            <li><strong>Language Exchange Events:</strong> Portuguese-English conversation practice</li>
          </ul>
          
          <h4>Weekly Community Gatherings:</h4>
          <ul>
            <li><strong>Portuguese Community Centers:</strong> Regular cultural activities</li>
            <li><strong>Portuguese Churches:</strong> Cultural and religious events</li>
            <li><strong>Portuguese Restaurants:</strong> Live music and cultural nights</li>
            <li><strong>Portuguese Schools:</strong> Family-oriented cultural education</li>
          </ul>
          
          <h3>Cultural Event Categories:</h3>
          <ul>
            <li><strong>Traditional:</strong> Folk music, traditional dances, historical celebrations</li>
            <li><strong>Contemporary:</strong> Modern Portuguese art, music, and fashion</li>
            <li><strong>Culinary:</strong> Portuguese cooking classes, wine tastings, food festivals</li>
            <li><strong>Educational:</strong> History lectures, language classes, cultural workshops</li>
            <li><strong>Family:</strong> Child-friendly events that teach Portuguese culture</li>
            <li><strong>Professional:</strong> Cultural events combined with networking opportunities</li>
          </ul>
          
          <p><strong>Important Note:</strong> These events are standalone cultural experiences. If you need transportation to attend events, our professional transport service is available as a separate service that can be arranged independently.</p>
        `,
        contentPortuguese: `
          <p>A comunidade portuguesa de Londres mantém um calendário cultural rico que celebra a nossa herança enquanto abraça o nosso novo lar. Compreender este calendário ajuda-o a manter-se conectado às suas raízes e a construir relacionamentos significativos.</p>
          
          <h3>Principais Eventos Culturais Portugueses em Londres:</h3>
          
          <h4>Celebrações Anuais:</h4>
          <ul>
            <li><strong>Dia de Portugal (10 de junho):</strong> 
              <ul>
                <li>Celebrações do Dia de Camões por toda Londres</li>
                <li>Eventos da Embaixada Portuguesa</li>
                <li>Encontros comunitários em bairros portugueses</li>
                <li>Espetáculos tradicionais de música e dança portuguesa</li>
              </ul>
            </li>
            <li><strong>Festa dos Tabuleiros (varia):</strong>
              <ul>
                <li>Celebrações de festivais tradicionais</li>
                <li>Danças folclóricas portuguesas e trajes típicos</li>
                <li>Experiências gastronómicas portuguesas tradicionais</li>
              </ul>
            </li>
            <li><strong>Festival de São João (23 de junho):</strong>
              <ul>
                <li>Celebrações de meio do verão com toque português</li>
                <li>Churrascos tradicionais portugueses</li>
                <li>Encontros comunitários com fogueiras</li>
              </ul>
            </li>
          </ul>
          
          <h4>Atividades Culturais Mensais:</h4>
          <ul>
            <li><strong>Noites de Fado:</strong> Noites de música tradicional portuguesa</li>
            <li><strong>Exibições de Cinema Português:</strong> Cinema contemporâneo e clássico</li>
            <li><strong>Workshops Culturais:</strong> Culinária, artesanato e tradições portuguesas</li>
            <li><strong>Eventos de Intercâmbio Linguístico:</strong> Prática de conversação português-inglês</li>
          </ul>
          
          <h4>Encontros Comunitários Semanais:</h4>
          <ul>
            <li><strong>Centros Comunitários Portugueses:</strong> Atividades culturais regulares</li>
            <li><strong>Igrejas Portuguesas:</strong> Eventos culturais e religiosos</li>
            <li><strong>Restaurantes Portugueses:</strong> Noites de música ao vivo e culturais</li>
            <li><strong>Escolas Portuguesas:</strong> Educação cultural orientada para a família</li>
          </ul>
          
          <h3>Categorias de Eventos Culturais:</h3>
          <ul>
            <li><strong>Tradicionais:</strong> Música folclórica, danças tradicionais, celebrações históricas</li>
            <li><strong>Contemporâneos:</strong> Arte, música e moda portuguesas modernas</li>
            <li><strong>Culinários:</strong> Aulas de culinária portuguesa, degustações de vinho, festivais gastronómicos</li>
            <li><strong>Educacionais:</strong> Palestras de história, aulas de idiomas, workshops culturais</li>
            <li><strong>Familiares:</strong> Eventos adequados para crianças que ensinam cultura portuguesa</li>
            <li><strong>Profissionais:</strong> Eventos culturais combinados com oportunidades de networking</li>
          </ul>
          
          <p><strong>Nota Importante:</strong> Estes eventos são experiências culturais independentes. Se precisar de transporte para participar em eventos, o nosso serviço de transporte profissional está disponível como um serviço separado que pode ser organizado independentemente.</p>
        `,
        tips: [
          'Follow Portuguese cultural organizations on social media for event updates',
          'Start with smaller, informal events to get comfortable with the community',
          'Bring traditional Portuguese gifts to share at community events'
        ],
        tipsPortuguese: [
          'Siga organizações culturais portuguesas nas redes sociais para atualizações de eventos',
          'Comece com eventos menores e informais para se sentir confortável com a comunidade',
          'Traga presentes tradicionais portugueses para partilhar em eventos comunitários'
        ]
      },
      {
        id: 'attending-cultural-events',
        title: 'How to Attend and Enjoy Portuguese Cultural Events',
        titlePortuguese: 'Como Participar e Desfrutar de Eventos Culturais Portugueses',
        type: 'tutorial',
        estimatedTime: 5,
        content: `
          <p>Attending Portuguese cultural events is more than just showing up - it's about participating in our shared heritage and building community connections.</p>
          
          <h3>Before Attending Events:</h3>
          
          <h4>Research and Preparation:</h4>
          <ul>
            <li><strong>Event Background:</strong> Learn about the cultural significance</li>
            <li><strong>Dress Code:</strong> Understand if traditional Portuguese attire is expected</li>
            <li><strong>Language:</strong> Know if the event will be primarily in Portuguese or English</li>
            <li><strong>Registration:</strong> Check if advance booking is required</li>
            <li><strong>Transportation:</strong> Plan your journey (our professional transport service is available if needed)</li>
          </ul>
          
          <h4>Cultural Preparation:</h4>
          <ul>
            <li><strong>Learn Key Phrases:</strong> Basic Portuguese greetings and cultural expressions</li>
            <li><strong>Understand Traditions:</strong> Research the specific cultural elements being celebrated</li>
            <li><strong>Bring Contributions:</strong> Many events welcome traditional Portuguese foods to share</li>
            <li><strong>Open Mindset:</strong> Be ready to learn about different Portuguese regional traditions</li>
          </ul>
          
          <h3>During the Event:</h3>
          
          <h4>Engagement Strategies:</h4>
          <ul>
            <li><strong>Active Participation:</strong>
              <ul>
                <li>Join in traditional dances if invited</li>
                <li>Sing along to Portuguese songs you know</li>
                <li>Participate in cultural activities and workshops</li>
                <li>Ask respectful questions about traditions</li>
              </ul>
            </li>
            <li><strong>Social Connection:</strong>
              <ul>
                <li>Introduce yourself to other attendees</li>
                <li>Share your own Portuguese heritage story</li>
                <li>Exchange contact information with like-minded people</li>
                <li>Join group photos and activities</li>
              </ul>
            </li>
            <li><strong>Cultural Learning:</strong>
              <ul>
                <li>Listen to stories from older community members</li>
                <li>Learn traditional Portuguese recipes</li>
                <li>Understand the history behind celebrations</li>
                <li>Take notes on traditions you'd like to continue</li>
              </ul>
            </li>
          </ul>
          
          <h3>Event Etiquette and Cultural Sensitivity:</h3>
          
          <h4>Do's:</h4>
          <ul>
            <li><strong>Respect elders and community leaders</li>
            <li><strong>Participate in communal prayers or moments of silence</li>
            <li><strong>Compliment the organizers and volunteers</li>
            <li><strong>Share your appreciation for Portuguese culture</li>
            <li><strong>Offer to help with setup or cleanup</li>
            <li><strong>Take photos respectfully (ask permission first)</li>
          </ul>
          
          <h4>Don'ts:</h4>
          <ul>
            <li><strong>Don't appropriate traditional clothing without understanding</li>
            <li><strong>Don't interrupt cultural ceremonies or speeches</li>
            <li><strong>Don't criticize traditions or compare negatively to other cultures</li>
            <li><strong>Don't dominate conversations - listen more than you speak</li>
            <li><strong>Don't leave early during important cultural moments</li>
          </ul>
          
          <h3>Making Lasting Connections:</h3>
          
          <h4>Networking at Cultural Events:</h4>
          <ul>
            <li><strong>Quality over Quantity:</strong> Focus on 3-5 meaningful conversations</li>
            <li><strong>Cultural Bridge Building:</strong> Connect people with shared interests</li>
            <li><strong>Follow-up Opportunities:</strong> Suggest meeting for Portuguese coffee or meals</li>
            <li><strong>Community Contribution:</strong> Offer your skills for future events</li>
          </ul>
          
          <h4>Building Cultural Continuity:</h4>
          <ul>
            <li><strong>Learn Traditional Skills:</strong> Portuguese cooking, crafts, or music</li>
            <li><strong>Share with Family:</strong> Bring Portuguese culture to your children</li>
            <li><strong>Document Experiences:</strong> Take photos and notes to preserve memories</li>
            <li><strong>Plan Return Visits:</strong> Become a regular at cultural events</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Participar em eventos culturais portugueses é mais do que apenas aparecer - é sobre participar na nossa herança partilhada e construir conexões comunitárias.</p>
          
          <h3>Antes de Participar em Eventos:</h3>
          
          <h4>Pesquisa e Preparação:</h4>
          <ul>
            <li><strong>Contexto do Evento:</strong> Aprenda sobre o significado cultural</li>
            <li><strong>Código de Vestuário:</strong> Compreenda se traje tradicional português é esperado</li>
            <li><strong>Idioma:</strong> Saiba se o evento será principalmente em português ou inglês</li>
            <li><strong>Inscrição:</strong> Verifique se é necessária reserva antecipada</li>
            <li><strong>Transporte:</strong> Planeie a sua viagem (o nosso serviço de transporte profissional está disponível se necessário)</li>
          </ul>
          
          <h4>Preparação Cultural:</h4>
          <ul>
            <li><strong>Aprenda Frases Chave:</strong> Saudações básicas portuguesas e expressões culturais</li>
            <li><strong>Compreenda Tradições:</strong> Pesquise os elementos culturais específicos sendo celebrados</li>
            <li><strong>Traga Contribuições:</strong> Muitos eventos acolhem comidas tradicionais portuguesas para partilhar</li>
            <li><strong>Mentalidade Aberta:</strong> Esteja pronto para aprender sobre diferentes tradições regionais portuguesas</li>
          </ul>
          
          <h3>Durante o Evento:</h3>
          
          <h4>Estratégias de Participação:</h4>
          <ul>
            <li><strong>Participação Ativa:</strong>
              <ul>
                <li>Junte-se a danças tradicionais se convidado</li>
                <li>Cante junto a canções portuguesas que conhece</li>
                <li>Participe em atividades culturais e workshops</li>
                <li>Faça perguntas respeitosas sobre tradições</li>
              </ul>
            </li>
            <li><strong>Conexão Social:</strong>
              <ul>
                <li>Apresente-se a outros participantes</li>
                <li>Partilhe a sua própria história de herança portuguesa</li>
                <li>Troque informações de contacto com pessoas com interesses similares</li>
                <li>Junte-se a fotos de grupo e atividades</li>
              </ul>
            </li>
            <li><strong>Aprendizagem Cultural:</strong>
              <ul>
                <li>Escute histórias de membros mais velhos da comunidade</li>
                <li>Aprenda receitas tradicionais portuguesas</li>
                <li>Compreenda a história por trás das celebrações</li>
                <li>Tome notas sobre tradições que gostaria de continuar</li>
              </ul>
            </li>
          </ul>
          
          <h3>Etiqueta de Eventos e Sensibilidade Cultural:</h3>
          
          <h4>Faça:</h4>
          <ul>
            <li><strong>Respeite idosos e líderes comunitários</li>
            <li><strong>Participe em orações comunitárias ou momentos de silêncio</li>
            <li><strong>Elogie os organizadores e voluntários</li>
            <li><strong>Partilhe a sua apreciação pela cultura portuguesa</li>
            <li><strong>Ofereça-se para ajudar com preparação ou limpeza</li>
            <li><strong>Tire fotos respeitosamente (peça permissão primeiro)</li>
          </ul>
          
          <h4>Não Faça:</h4>
          <ul>
            <li><strong>Não se aproprie de vestuário tradicional sem compreensão</li>
            <li><strong>Não interrompa cerimónias culturais ou discursos</li>
            <li><strong>Não critique tradições ou compare negativamente com outras culturas</li>
            <li><strong>Não domine conversas - escute mais do que fala</li>
            <li><strong>Não saia cedo durante momentos culturais importantes</li>
          </ul>
          
          <h3>Fazendo Conexões Duradouras:</h3>
          
          <h4>Networking em Eventos Culturais:</h4>
          <ul>
            <li><strong>Qualidade sobre Quantidade:</strong> Foque em 3-5 conversas significativas</li>
            <li><strong>Construção de Pontes Culturais:</strong> Conecte pessoas com interesses partilhados</li>
            <li><strong>Oportunidades de Seguimento:</strong> Sugira encontrar-se para café ou refeições portuguesas</li>
            <li><strong>Contribuição Comunitária:</strong> Ofereça as suas competências para eventos futuros</li>
          </ul>
          
          <h4>Construindo Continuidade Cultural:</h4>
          <ul>
            <li><strong>Aprenda Competências Tradicionais:</strong> Culinária, artesanato ou música portuguesa</li>
            <li><strong>Partilhe com a Família:</strong> Traga cultura portuguesa aos seus filhos</li>
            <li><strong>Documente Experiências:</strong> Tire fotos e tome notas para preservar memórias</li>
            <li><strong>Planeie Visitas de Retorno:</strong> Torne-se um regular em eventos culturais</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Research 3 upcoming Portuguese cultural events in London', textPortuguese: 'Pesquise 3 próximos eventos culturais portugueses em Londres' },
              { text: 'Learn 5 Portuguese cultural phrases and their meanings', textPortuguese: 'Aprenda 5 frases culturais portuguesas e os seus significados' },
              { text: 'Prepare a traditional Portuguese dish to share at events', textPortuguese: 'Prepare um prato tradicional português para partilhar em eventos' },
              { text: 'Practice introducing yourself and your Portuguese heritage', textPortuguese: 'Pratique apresentar-se e a sua herança portuguesa' }
            ]
          }
        },
        tips: [
          'Arrive early to help with setup - it shows community commitment',
          'Bring business cards if the event has networking elements',
          'Dress modestly and appropriately for the cultural context'
        ],
        tipsPortuguese: [
          'Chegue cedo para ajudar com a preparação - mostra compromisso comunitário',
          'Traga cartões de visita se o evento tiver elementos de networking',
          'Vista-se modestamente e apropriadamente para o contexto cultural'
        ]
      },
      {
        id: 'traditional-celebrations',
        title: 'Understanding Portuguese Traditional Celebrations',
        titlePortuguese: 'Compreendendo Celebrações Tradicionais Portuguesas',
        type: 'tutorial',
        estimatedTime: 6,
        content: `
          <p>Portuguese traditional celebrations are rich with history, symbolism, and community spirit. Understanding these traditions helps you participate meaningfully and appreciate their cultural significance.</p>
          
          <h3>Major Portuguese Religious and Cultural Celebrations:</h3>
          
          <h4>1. Festa do Espírito Santo (Holy Spirit Festival)</h4>
          <ul>
            <li><strong>When:</strong> 50 days after Easter (Pentecost)</li>
            <li><strong>Traditions:</strong>
              <ul>
                <li>Crowning ceremony with traditional crowns</li>
                <li>Community soup (sopas) served to all</li>
                <li>Bread distribution (massa sovada)</li>
                <li>Processions and traditional music</li>
              </ul>
            </li>
            <li><strong>Cultural Significance:</strong> Represents community sharing and charity</li>
            <li><strong>London Adaptation:</strong> Portuguese community centers and churches organize scaled versions</li>
          </ul>
          
          <h4>2. Festa de São João (St. John's Festival)</h4>
          <ul>
            <li><strong>When:</strong> June 23rd-24th</li>
            <li><strong>Traditions:</strong>
              <ul>
                <li>Bonfires and fireworks</li>
                <li>Traditional Portuguese barbecues</li>
                <li>Folk dancing (rancho folclórico)</li>
                <li>Plastic hammer traditions (martelo de São João)</li>
              </ul>
            </li>
            <li><strong>Cultural Significance:</strong> Midsummer celebration of fertility and community</li>
            <li><strong>London Adaptation:</strong> Portuguese parks and venues host family-friendly versions</li>
          </ul>
          
          <h4>3. Festa dos Tabuleiros (Festival of Trays)</h4>
          <ul>
            <li><strong>Origin:</strong> Traditional Tomar festival</li>
            <li><strong>Traditions:</strong>
              <ul>
                <li>Elaborate bread and flower crowns (tabuleiros)</li>
                <li>Processions with traditional costumes</li>
                <li>Community bread blessing and distribution</li>
                <li>Traditional Portuguese folk performances</li>
              </ul>
            </li>
            <li><strong>Cultural Significance:</strong> Gratitude, abundance, and community unity</li>
            <li><strong>London Adaptation:</strong> Portuguese cultural associations recreate elements</li>
          </ul>
          
          <h4>4. Festa das Vindimas (Harvest Festival)</h4>
          <ul>
            <li><strong>When:</strong> September-October</li>
            <li><strong>Traditions:</strong>
              <ul>
                <li>Portuguese wine tastings</li>
                <li>Traditional grape stomping ceremonies</li>
                <li>Harvest blessing rituals</li>
                <li>Portuguese folk music and dancing</li>
              </ul>
            </li>
            <li><strong>Cultural Significance:</strong> Celebration of Portuguese winemaking heritage</li>
            <li><strong>London Adaptation:</strong> Portuguese restaurants and wine bars host events</li>
          </ul>
          
          <h3>Regional Celebrations in London:</h3>
          
          <h4>Madeiran Traditions:</h4>
          <ul>
            <li><strong>Festa da Flor (Flower Festival):</strong> Spring celebration with flower displays</li>
            <li><strong>Festival do Atlântico:</strong> Cultural performances and traditional crafts</li>
            <li><strong>Madeira Wine Festivals:</strong> Traditional Madeiran wine and food</li>
          </ul>
          
          <h4>Azorean Traditions:</h4>
          <ul>
            <li><strong>Festa do Senhor Santo Cristo:</strong> Religious processions and community meals</li>
            <li><strong>Sanjoaninas Festival:</strong> Summer celebrations with traditional music</li>
            <li><strong>Azorean Heritage Days:</strong> Cultural education and traditional demonstrations</li>
          </ul>
          
          <h4>Mainland Portuguese Traditions:</h4>
          <ul>
            <li><strong>Festa de Santo António (Lisbon):</strong> June celebrations with sardines and folk music</li>
            <li><strong>Festa de São Pedro (Porto):</strong> Traditional northern Portuguese celebrations</li>
            <li><strong>Festa da Ria (Aveiro):</strong> Coastal traditions and maritime celebrations</li>
          </ul>
          
          <h3>How to Participate Respectfully:</h3>
          
          <h4>Understanding Symbolism:</h4>
          <ul>
            <li><strong>Religious Elements:</strong> Respect the spiritual significance even if you're not religious</li>
            <li><strong>Food Traditions:</strong> Understand that sharing food represents community and abundance</li>
            <li><strong>Music and Dance:</strong> Traditional performances preserve cultural history</li>
            <li><strong>Clothing:</strong> Traditional dress represents regional identity and pride</li>
          </ul>
          
          <h4>Active Participation:</h4>
          <ul>
            <li><strong>Learn Traditional Songs:</strong> Participate in group singing</li>
            <li><strong>Help with Preparations:</strong> Volunteer for festival setup</li>
            <li><strong>Bring Traditional Contributions:</strong> Authentic Portuguese foods or crafts</li>
            <li><strong>Share Your Heritage:</strong> Contribute your own family traditions</li>
          </ul>
        `,
        contentPortuguese: `
          <p>As celebrações tradicionais portuguesas são ricas em história, simbolismo e espírito comunitário. Compreender estas tradições ajuda-o a participar significativamente e a apreciar o seu significado cultural.</p>
          
          <h3>Principais Celebrações Religiosas e Culturais Portuguesas:</h3>
          
          <h4>1. Festa do Espírito Santo</h4>
          <ul>
            <li><strong>Quando:</strong> 50 dias após a Páscoa (Pentecostes)</li>
            <li><strong>Tradições:</strong>
              <ul>
                <li>Cerimónia de coroação com coroas tradicionais</li>
                <li>Sopa comunitária (sopas) servida a todos</li>
                <li>Distribuição de pão (massa sovada)</li>
                <li>Procissões e música tradicional</li>
              </ul>
            </li>
            <li><strong>Significado Cultural:</strong> Representa partilha comunitária e caridade</li>
            <li><strong>Adaptação em Londres:</strong> Centros comunitários e igrejas portuguesas organizam versões adaptadas</li>
          </ul>
          
          <h4>2. Festa de São João</h4>
          <ul>
            <li><strong>Quando:</strong> 23-24 de junho</li>
            <li><strong>Tradições:</strong>
              <ul>
                <li>Fogueiras e fogo de artifício</li>
                <li>Churrascos tradicionais portugueses</li>
                <li>Danças folclóricas (rancho folclórico)</li>
                <li>Tradições do martelo de São João</li>
              </ul>
            </li>
            <li><strong>Significado Cultural:</strong> Celebração de meio do verão da fertilidade e comunidade</li>
            <li><strong>Adaptação em Londres:</strong> Parques e locais portugueses organizam versões familiares</li>
          </ul>
          
          <h4>3. Festa dos Tabuleiros</h4>
          <ul>
            <li><strong>Origem:</strong> Festival tradicional de Tomar</li>
            <li><strong>Tradições:</strong>
              <ul>
                <li>Coroas elaboradas de pão e flores (tabuleiros)</li>
                <li>Procissões com trajes tradicionais</li>
                <li>Bênção e distribuição comunitária de pão</li>
                <li>Espetáculos tradicionais portugueses</li>
              </ul>
            </li>
            <li><strong>Significado Cultural:</strong> Gratidão, abundância e unidade comunitária</li>
            <li><strong>Adaptação em Londres:</strong> Associações culturais portuguesas recriam elementos</li>
          </ul>
          
          <h4>4. Festa das Vindimas</h4>
          <ul>
            <li><strong>Quando:</strong> Setembro-outubro</li>
            <li><strong>Tradições:</strong>
              <ul>
                <li>Degustações de vinhos portugueses</li>
                <li>Cerimónias tradicionais de pisa das uvas</li>
                <li>Rituais de bênção da colheita</li>
                <li>Música e dança folclórica portuguesa</li>
              </ul>
            </li>
            <li><strong>Significado Cultural:</strong> Celebração da herança vinícola portuguesa</li>
            <li><strong>Adaptação em Londres:</strong> Restaurantes e bares de vinho portugueses organizam eventos</li>
          </ul>
          
          <h3>Celebrações Regionais em Londres:</h3>
          
          <h4>Tradições Madeirenses:</h4>
          <ul>
            <li><strong>Festa da Flor:</strong> Celebração primaveril com exposições de flores</li>
            <li><strong>Festival do Atlântico:</strong> Espetáculos culturais e artesanato tradicional</li>
            <li><strong>Festivais do Vinho da Madeira:</strong> Vinho e comida tradicionais madeirenses</li>
          </ul>
          
          <h4>Tradições Açorianas:</h4>
          <ul>
            <li><strong>Festa do Senhor Santo Cristo:</strong> Procissões religiosas e refeições comunitárias</li>
            <li><strong>Festival Sanjoaninas:</strong> Celebrações de verão com música tradicional</li>
            <li><strong>Dias do Património Açoriano:</strong> Educação cultural e demonstrações tradicionais</li>
          </ul>
          
          <h4>Tradições do Continente Português:</h4>
          <ul>
            <li><strong>Festa de Santo António (Lisboa):</strong> Celebrações de junho com sardinhas e música folclórica</li>
            <li><strong>Festa de São Pedro (Porto):</strong> Celebrações tradicionais do norte português</li>
            <li><strong>Festa da Ria (Aveiro):</strong> Tradições costeiras e celebrações marítimas</li>
          </ul>
          
          <h3>Como Participar Respeitosamente:</h3>
          
          <h4>Compreendendo o Simbolismo:</h4>
          <ul>
            <li><strong>Elementos Religiosos:</strong> Respeite o significado espiritual mesmo que não seja religioso</li>
            <li><strong>Tradições Alimentares:</strong> Compreenda que partilhar comida representa comunidade e abundância</li>
            <li><strong>Música e Dança:</strong> Espetáculos tradicionais preservam a história cultural</li>
            <li><strong>Vestuário:</strong> Traje tradicional representa identidade regional e orgulho</li>
          </ul>
          
          <h4>Participação Ativa:</h4>
          <ul>
            <li><strong>Aprenda Canções Tradicionais:</strong> Participe em canto de grupo</li>
            <li><strong>Ajude com Preparações:</strong> Voluntarie-se para preparação do festival</li>
            <li><strong>Traga Contribuições Tradicionais:</strong> Comidas ou artesanato portugueses autênticos</li>
            <li><strong>Partilhe a Sua Herança:</strong> Contribua com as suas próprias tradições familiares</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Research your family\'s regional Portuguese traditions', textPortuguese: 'Pesquise as tradições portuguesas regionais da sua família' },
              { text: 'Learn the history behind 2 major Portuguese celebrations', textPortuguese: 'Aprenda a história por trás de 2 grandes celebrações portuguesas' },
              { text: 'Find local Portuguese cultural organizations in London', textPortuguese: 'Encontre organizações culturais portuguesas locais em Londres' },
              { text: 'Practice traditional Portuguese songs or prayers', textPortuguese: 'Pratique canções ou orações tradicionais portuguesas' }
            ]
          }
        },
        tips: [
          'Ask older community members about the meanings behind traditions',
          'Take photos respectfully and ask permission for traditional ceremonies',
          'Learn about your specific regional traditions (Azores, Madeira, mainland regions)'
        ],
        tipsPortuguese: [
          'Pergunte a membros mais velhos da comunidade sobre os significados por trás das tradições',
          'Tire fotos respeitosamente e peça permissão para cerimónias tradicionais',
          'Aprenda sobre as suas tradições regionais específicas (Açores, Madeira, regiões continentais)'
        ]
      },
      {
        id: 'organizing-cultural-events',
        title: 'Organizing Your Own Portuguese Cultural Events',
        titlePortuguese: 'Organizando os Seus Próprios Eventos Culturais Portugueses',
        type: 'interactive',
        estimatedTime: 7,
        content: `
          <p>Organizing Portuguese cultural events helps preserve our heritage while building stronger community connections. Here's how to plan authentic, successful cultural gatherings.</p>
          
          <h3>Types of Events You Can Organize:</h3>
          
          <h4>1. Intimate Gatherings (10-25 people)</h4>
          <ul>
            <li><strong>Portuguese Dinner Parties:</strong>
              <ul>
                <li>Traditional Portuguese meal preparation</li>
                <li>Portuguese wine pairings</li>
                <li>Fado music background</li>
                <li>Cultural conversation topics</li>
              </ul>
            </li>
            <li><strong>Language Exchange Nights:</strong>
              <ul>
                <li>Portuguese-English conversation practice</li>
                <li>Cultural storytelling sessions</li>
                <li>Traditional Portuguese games</li>
                <li>Portuguese poetry readings</li>
              </ul>
            </li>
            <li><strong>Cooking Workshops:</strong>
              <ul>
                <li>Traditional Portuguese recipe sharing</li>
                <li>Hands-on cooking instruction</li>
                <li>Regional cuisine exploration</li>
                <li>Family recipe preservation</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Community Events (25-100 people)</h4>
          <ul>
            <li><strong>Portuguese Cultural Showcases:</strong>
              <ul>
                <li>Traditional music and dance performances</li>
                <li>Portuguese art and craft exhibitions</li>
                <li>Cultural history presentations</li>
                <li>Regional tradition demonstrations</li>
              </ul>
            </li>
            <li><strong>Seasonal Celebrations:</strong>
              <ul>
                <li>Portuguese Christmas (Natal) traditions</li>
                <li>São João summer celebrations</li>
                <li>Harvest festival adaptations</li>
                <li>Portuguese New Year (Ano Novo) customs</li>
              </ul>
            </li>
            <li><strong>Educational Workshops:</strong>
              <ul>
                <li>Portuguese history lectures</li>
                <li>Traditional craft workshops</li>
                <li>Portuguese business culture seminars</li>
                <li>Portuguese language intensive sessions</li>
              </ul>
            </li>
          </ul>
          
          <h3>Event Planning Process:</h3>
          
          <h4>1. Planning Phase (2-3 months ahead)</h4>
          <ul>
            <li><strong>Define Event Purpose and Goals:</strong>
              <ul>
                <li>Cultural education and preservation</li>
                <li>Community building and networking</li>
                <li>Celebration of Portuguese heritage</li>
                <li>Integration with London lifestyle</li>
              </ul>
            </li>
            <li><strong>Budget and Resources:</strong>
              <ul>
                <li>Venue costs (community centers, Portuguese restaurants)</li>
                <li>Food and beverage expenses</li>
                <li>Entertainment and speaker fees</li>
                <li>Decoration and cultural materials</li>
                <li>Transportation arrangements (independent professional service available)</li>
              </ul>
            </li>
            <li><strong>Cultural Authenticity:</strong>
              <ul>
                <li>Research traditional elements thoroughly</li>
                <li>Consult with Portuguese cultural experts</li>
                <li>Ensure respectful representation of traditions</li>
                <li>Include multiple Portuguese regional perspectives</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Organization Phase (1-2 months ahead)</h4>
          <ul>
            <li><strong>Venue Selection:</strong>
              <ul>
                <li>Portuguese community centers</li>
                <li>Portuguese church halls</li>
                <li>Portuguese restaurants (private events)</li>
                <li>London cultural venues</li>
                <li>Private homes for intimate gatherings</li>
              </ul>
            </li>
            <li><strong>Program Development:</strong>
              <ul>
                <li>Welcome and cultural context setting</li>
                <li>Traditional Portuguese activities</li>
                <li>Interactive cultural learning segments</li>
                <li>Social networking opportunities</li>
                <li>Closing with community bonding</li>
              </ul>
            </li>
            <li><strong>Community Engagement:</strong>
              <ul>
                <li>Partner with existing Portuguese organizations</li>
                <li>Invite Portuguese community leaders</li>
                <li>Recruit volunteers from the community</li>
                <li>Promote through Portuguese social networks</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Execution Phase (event day)</h4>
          <ul>
            <li><strong>Setup and Atmosphere:</strong>
              <ul>
                <li>Portuguese flag displays</li>
                <li>Traditional Portuguese decorations</li>
                <li>Portuguese music playlist</li>
                <li>Cultural information displays</li>
              </ul>
            </li>
            <li><strong>Cultural Program:</strong>
              <ul>
                <li>Opening with Portuguese greeting and blessing</li>
                <li>Cultural education segments</li>
                <li>Interactive traditional activities</li>
                <li>Community sharing and storytelling</li>
                <li>Group participation in Portuguese traditions</li>
              </ul>
            </li>
            <li><strong>Documentation:</strong>
              <ul>
                <li>Respectful photography of cultural moments</li>
                <li>Recording traditional songs or stories (with permission)</li>
                <li>Collecting participant feedback</li>
                <li>Creating memories for community archive</li>
              </ul>
            </li>
          </ul>
          
          <h3>Building Long-term Cultural Impact:</h3>
          
          <h4>Follow-up and Continuity:</h4>
          <ul>
            <li><strong>Community Feedback:</strong> Gather input on cultural authenticity and enjoyment</li>
            <li><strong>Relationship Building:</strong> Connect attendees for ongoing cultural activities</li>
            <li><strong>Cultural Preservation:</strong> Document traditional knowledge shared at events</li>
            <li><strong>Future Planning:</strong> Establish regular Portuguese cultural programming</li>
          </ul>
          
          <h4>Collaboration Opportunities:</h4>
          <ul>
            <li><strong>Portuguese Embassy:</strong> Support for authentic cultural programming</li>
            <li><strong>Portuguese Schools:</strong> Educational partnerships and cultural exchange</li>
            <li><strong>Portuguese Businesses:</strong> Sponsorship and authentic cultural resources</li>
            <li><strong>London Cultural Institutions:</strong> Broader cultural integration opportunities</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Organizar eventos culturais portugueses ajuda a preservar a nossa herança enquanto constrói conexões comunitárias mais fortes. Aqui está como planear encontros culturais autênticos e bem-sucedidos.</p>
          
          <h3>Tipos de Eventos que Pode Organizar:</h3>
          
          <h4>1. Encontros Íntimos (10-25 pessoas)</h4>
          <ul>
            <li><strong>Jantares Portugueses:</strong>
              <ul>
                <li>Preparação de refeições tradicionais portuguesas</li>
                <li>Harmonizações de vinhos portugueses</li>
                <li>Música fado de fundo</li>
                <li>Tópicos de conversa cultural</li>
              </ul>
            </li>
            <li><strong>Noites de Intercâmbio Linguístico:</strong>
              <ul>
                <li>Prática de conversação português-inglês</li>
                <li>Sessões de narrativa cultural</li>
                <li>Jogos tradicionais portugueses</li>
                <li>Leituras de poesia portuguesa</li>
              </ul>
            </li>
            <li><strong>Workshops de Culinária:</strong>
              <ul>
                <li>Partilha de receitas tradicionais portuguesas</li>
                <li>Instrução prática de culinária</li>
                <li>Exploração de culinária regional</li>
                <li>Preservação de receitas familiares</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Eventos Comunitários (25-100 pessoas)</h4>
          <ul>
            <li><strong>Mostras Culturais Portuguesas:</strong>
              <ul>
                <li>Espetáculos tradicionais de música e dança</li>
                <li>Exposições de arte e artesanato português</li>
                <li>Apresentações de história cultural</li>
                <li>Demonstrações de tradições regionais</li>
              </ul>
            </li>
            <li><strong>Celebrações Sazonais:</strong>
              <ul>
                <li>Tradições portuguesas de Natal</li>
                <li>Celebrações de verão de São João</li>
                <li>Adaptações de festivais de colheita</li>
                <li>Costumes portugueses de Ano Novo</li>
              </ul>
            </li>
            <li><strong>Workshops Educacionais:</strong>
              <ul>
                <li>Palestras de história portuguesa</li>
                <li>Workshops de artesanato tradicional</li>
                <li>Seminários de cultura empresarial portuguesa</li>
                <li>Sessões intensivas de língua portuguesa</li>
              </ul>
            </li>
          </ul>
          
          <h3>Processo de Planeamento de Eventos:</h3>
          
          <h4>1. Fase de Planeamento (2-3 meses antes)</h4>
          <ul>
            <li><strong>Definir Propósito e Objetivos do Evento:</strong>
              <ul>
                <li>Educação e preservação cultural</li>
                <li>Construção comunitária e networking</li>
                <li>Celebração da herança portuguesa</li>
                <li>Integração com estilo de vida londrino</li>
              </ul>
            </li>
            <li><strong>Orçamento e Recursos:</strong>
              <ul>
                <li>Custos de local (centros comunitários, restaurantes portugueses)</li>
                <li>Despesas de comida e bebida</li>
                <li>Taxas de entretenimento e oradores</li>
                <li>Decoração e materiais culturais</li>
                <li>Arranjos de transporte (serviço profissional independente disponível)</li>
              </ul>
            </li>
            <li><strong>Autenticidade Cultural:</strong>
              <ul>
                <li>Pesquisar elementos tradicionais minuciosamente</li>
                <li>Consultar especialistas culturais portugueses</li>
                <li>Assegurar representação respeitosa das tradições</li>
                <li>Incluir múltiplas perspetivas regionais portuguesas</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Fase de Organização (1-2 meses antes)</h4>
          <ul>
            <li><strong>Seleção de Local:</strong>
              <ul>
                <li>Centros comunitários portugueses</li>
                <li>Salões de igrejas portuguesas</li>
                <li>Restaurantes portugueses (eventos privados)</li>
                <li>Locais culturais de Londres</li>
                <li>Casas privadas para encontros íntimos</li>
              </ul>
            </li>
            <li><strong>Desenvolvimento do Programa:</strong>
              <ul>
                <li>Boas-vindas e estabelecimento de contexto cultural</li>
                <li>Atividades tradicionais portuguesas</li>
                <li>Segmentos interativos de aprendizagem cultural</li>
                <li>Oportunidades de networking social</li>
                <li>Encerramento com união comunitária</li>
              </ul>
            </li>
            <li><strong>Envolvimento Comunitário:</strong>
              <ul>
                <li>Parceria com organizações portuguesas existentes</li>
                <li>Convidar líderes da comunidade portuguesa</li>
                <li>Recrutar voluntários da comunidade</li>
                <li>Promover através de redes sociais portuguesas</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Fase de Execução (dia do evento)</h4>
          <ul>
            <li><strong>Preparação e Atmosfera:</strong>
              <ul>
                <li>Exposições da bandeira portuguesa</li>
                <li>Decorações tradicionais portuguesas</li>
                <li>Playlist de música portuguesa</li>
                <li>Exposições de informação cultural</li>
              </ul>
            </li>
            <li><strong>Programa Cultural:</strong>
              <ul>
                <li>Abertura com saudação e bênção portuguesa</li>
                <li>Segmentos de educação cultural</li>
                <li>Atividades tradicionais interativas</li>
                <li>Partilha comunitária e narrativa</li>
                <li>Participação em grupo em tradições portuguesas</li>
              </ul>
            </li>
            <li><strong>Documentação:</strong>
              <ul>
                <li>Fotografia respeitosa de momentos culturais</li>
                <li>Gravação de canções ou histórias tradicionais (com permissão)</li>
                <li>Recolha de feedback dos participantes</li>
                <li>Criação de memórias para arquivo comunitário</li>
              </ul>
            </li>
          </ul>
          
          <h3>Construindo Impacto Cultural a Longo Prazo:</h3>
          
          <h4>Seguimento e Continuidade:</h4>
          <ul>
            <li><strong>Feedback Comunitário:</strong> Recolher input sobre autenticidade cultural e prazer</li>
            <li><strong>Construção de Relacionamentos:</strong> Conectar participantes para atividades culturais contínuas</li>
            <li><strong>Preservação Cultural:</strong> Documentar conhecimento tradicional partilhado em eventos</li>
            <li><strong>Planeamento Futuro:</strong> Estabelecer programação cultural portuguesa regular</li>
          </ul>
          
          <h4>Oportunidades de Colaboração:</h4>
          <ul>
            <li><strong>Embaixada Portuguesa:</strong> Apoio para programação cultural autêntica</li>
            <li><strong>Escolas Portuguesas:</strong> Parcerias educacionais e intercâmbio cultural</li>
            <li><strong>Empresas Portuguesas:</strong> Patrocínio e recursos culturais autênticos</li>
            <li><strong>Instituições Culturais de Londres:</strong> Oportunidades de integração cultural mais ampla</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Choose a specific Portuguese tradition to celebrate', textPortuguese: 'Escolha uma tradição portuguesa específica para celebrar' },
              { text: 'Create a detailed event planning timeline', textPortuguese: 'Crie um cronograma detalhado de planeamento de eventos' },
              { text: 'Research authentic Portuguese decorations and materials', textPortuguese: 'Pesquise decorações e materiais portugueses autênticos' },
              { text: 'Develop a list of traditional Portuguese activities for your event', textPortuguese: 'Desenvolva uma lista de atividades tradicionais portuguesas para o seu evento' },
              { text: 'Connect with local Portuguese community organizations', textPortuguese: 'Conecte-se com organizações da comunidade portuguesa local' }
            ]
          }
        },
        tips: [
          'Start small with intimate gatherings before organizing larger events',
          'Always have backup plans for outdoor Portuguese celebrations in London weather',
          'Create bilingual materials to accommodate different comfort levels with Portuguese'
        ],
        tipsPortuguese: [
          'Comece pequeno com encontros íntimos antes de organizar eventos maiores',
          'Tenha sempre planos de backup para celebrações portuguesas ao ar livre no clima de Londres',
          'Crie materiais bilingues para acomodar diferentes níveis de conforto com português'
        ]
      }
    ],
    practicalExercises: [],
    resources: [
      {
        title: 'Portuguese Cultural Calendar London',
        titlePortuguese: 'Calendário Cultural Português Londres',
        url: '/cultural-events/calendar',
        type: 'guide'
      },
      {
        title: 'Traditional Portuguese Recipe Collection',
        titlePortuguese: 'Coleção de Receitas Tradicionais Portuguesas',
        url: '/downloads/portuguese-recipes.pdf',
        type: 'download'
      },
      {
        title: 'Portuguese Cultural Event Planning Checklist',
        titlePortuguese: 'Lista de Verificação de Planeamento de Eventos Culturais Portugueses',
        url: '/downloads/cultural-event-planning.pdf',
        type: 'download'
      },
      {
        title: 'London Portuguese Community Directory',
        titlePortuguese: 'Diretório da Comunidade Portuguesa de Londres',
        url: '/community/portuguese-organizations',
        type: 'external'
      }
    ]
  };

  return (
    <LearningModuleFramework
      module={culturalEventsModule}
      onComplete={handleModuleComplete}
      onStepComplete={handleStepComplete}
      completedSteps={completedSteps}
      showProgress={true}
    />
  );
}