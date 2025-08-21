'use client';

import { ROUTES } from '@/config';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Star, Camera, MessageCircle, Map, Gift } from 'lucide-react';
import LearningModuleFramework, { LearningModule, LearningStep } from '@/components/academy/LearningModuleFramework';
import { useLanguage } from '@/context/LanguageContext';

export default function DatingMatchingModule() {
  const { language } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const isPortuguese = language === 'pt';

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lusotown-academy-dating-matching-progress');
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
      localStorage.setItem('lusotown-academy-dating-matching-progress', JSON.stringify({
        completedSteps: newCompleted,
        lastAccess: Date.now()
      }));
    }
  };

  const handleModuleComplete = () => {
    // Module completion logic
    console.log('Dating & Matching module completed!');
  };

  // Define the learning module structure
  const datingMatchingModule: LearningModule = {
    id: 'dating-matching',
    title: 'Dating & Matching',
    titlePortuguese: 'Encontros e Compatibilidade',
    description: 'Learn how to connect with Portuguese speakers for meaningful relationships in London',
    descriptionPortuguese: 'Aprenda como conectar-se com falantes de português para relacionamentos significativos em Londres',
    difficulty: 'Beginner',
    estimatedTime: 20,
    icon: Heart,
    category: 'Social',
    categoryPortuguese: 'Social',
    prerequisites: [],
    prerequisitesPortuguese: [],
    learningObjectives: [
      'Understand how the Portuguese matching system works',
      'Create an attractive and authentic profile',
      'Navigate cultural conversation starters safely',
      'Use premium features effectively',
      'Maintain safety while dating'
    ],
    learningObjectivesPortuguese: [
      'Entender como funciona o sistema de compatibilidade português',
      'Criar um perfil atraente e autêntico',
      'Navegar conversas culturais com segurança',
      'Usar funcionalidades premium efetivamente',
      'Manter segurança durante encontros'
    ],
    steps: [
      {
        id: 'introduction-to-matching',
        title: 'Introduction to Portuguese Matching',
        titlePortuguese: 'Introdução à Compatibilidade Portuguesa',
        type: 'introduction',
        estimatedTime: 3,
        content: `
          <p>Welcome to LusoTown's dating and matching system, designed specifically for Portuguese speakers in London!</p>
          
          <p>Our platform connects you with other Portuguese speakers based on:</p>
          <ul>
            <li><strong>Cultural Compatibility:</strong> Shared Portuguese heritage, traditions, and values</li>
            <li><strong>Location Proximity:</strong> Other Portuguese speakers near you in London</li>
            <li><strong>Lifestyle Alignment:</strong> Similar interests, career goals, and life stages</li>
            <li><strong>Language Preference:</strong> Comfort level with Portuguese vs English communication</li>
          </ul>
          
          <p>Unlike generic dating apps, we understand the unique experience of being Portuguese in London - from missing <em>saudade</em> to finding someone who appreciates a proper <em>pastel de nata</em>.</p>
        `,
        contentPortuguese: `
          <p>Bem-vindo ao sistema de encontros e compatibilidade da LusoTown, desenhado especificamente para falantes de português em Londres!</p>
          
          <p>A nossa plataforma conecta-o com outros falantes de português baseado em:</p>
          <ul>
            <li><strong>Compatibilidade Cultural:</strong> Herança portuguesa partilhada, tradições e valores</li>
            <li><strong>Proximidade de Localização:</strong> Outros falantes de português perto de si em Londres</li>
            <li><strong>Alinhamento de Estilo de Vida:</strong> Interesses similares, objetivos de carreira e fases da vida</li>
            <li><strong>Preferência de Idioma:</strong> Nível de conforto com comunicação em português vs inglês</li>
          </ul>
          
          <p>Ao contrário de apps de encontros genéricos, entendemos a experiência única de ser português em Londres - desde sentir <em>saudade</em> até encontrar alguém que aprecia um verdadeiro <em>pastel de nata</em>.</p>
        `,
        tips: [
          'Start with a free account to explore the platform',
          'Be authentic about your Portuguese background - it\'s what makes you unique here',
          'Don\'t rush - meaningful connections take time to develop'
        ],
        tipsPortuguese: [
          'Comece com uma conta gratuita para explorar a plataforma',
          'Seja autêntico sobre a sua origem portuguesa - é o que o torna único aqui',
          'Não se apresse - conexões significativas levam tempo para se desenvolver'
        ]
      },
      {
        id: 'profile-creation',
        title: 'Creating Your Authentic Portuguese Profile',
        titlePortuguese: 'Criando o Seu Perfil Português Autêntico',
        type: 'tutorial',
        estimatedTime: 5,
        content: `
          <p>Your profile is your first impression. Here's how to make it authentically Portuguese and appealing:</p>
          
          <h3>Essential Profile Elements:</h3>
          <ol>
            <li><strong>Profile Photos:</strong>
              <ul>
                <li>Main photo: Clear face shot with genuine smile</li>
                <li>Cultural photo: You enjoying Portuguese food, events, or locations</li>
                <li>London photo: You exploring London (shows you're established here)</li>
                <li>Hobby photo: Your interests and lifestyle</li>
              </ul>
            </li>
            
            <li><strong>About Me Section:</strong>
              <ul>
                <li>Mention your Portuguese region (Norte, Centro, Sul, Ilhas, or Diaspora)</li>
                <li>Share how long you've been in London</li>
                <li>Include what you miss most about Portugal</li>
                <li>Mention your favorite Portuguese traditions you maintain in London</li>
              </ul>
            </li>
            
            <li><strong>What I'm Looking For:</strong>
              <ul>
                <li>Be specific about relationship goals</li>
                <li>Mention if Portuguese cultural connection is important</li>
                <li>Share ideal date activities (Portuguese restaurant? Museum? Hyde Park?)</li>
              </ul>
            </li>
          </ol>
          
          <h3>Portuguese Cultural Touches:</h3>
          <p>Stand out by including:</p>
          <ul>
            <li>Your favorite Portuguese dish to cook</li>
            <li>Portuguese music you love (Fado? Modern Portuguese artists?)</li>
            <li>Portuguese locations you'd love to visit together</li>
            <li>Portuguese expressions that make you laugh</li>
          </ul>
        `,
        contentPortuguese: `
          <p>O seu perfil é a sua primeira impressão. Aqui está como torná-lo autenticamente português e atrativo:</p>
          
          <h3>Elementos Essenciais do Perfil:</h3>
          <ol>
            <li><strong>Fotos do Perfil:</strong>
              <ul>
                <li>Foto principal: Foto clara do rosto com sorriso genuíno</li>
                <li>Foto cultural: Você a desfrutar comida, eventos ou locais portugueses</li>
                <li>Foto de Londres: Você explorando Londres (mostra que está estabelecido aqui)</li>
                <li>Foto de hobby: Seus interesses e estilo de vida</li>
              </ul>
            </li>
            
            <li><strong>Secção Sobre Mim:</strong>
              <ul>
                <li>Mencione a sua região portuguesa (Norte, Centro, Sul, Ilhas, ou Diáspora)</li>
                <li>Partilhe há quanto tempo está em Londres</li>
                <li>Inclua o que mais sente falta de Portugal</li>
                <li>Mencione as suas tradições portuguesas favoritas que mantém em Londres</li>
              </ul>
            </li>
            
            <li><strong>O Que Procuro:</strong>
              <ul>
                <li>Seja específico sobre objetivos de relacionamento</li>
                <li>Mencione se a conexão cultural portuguesa é importante</li>
                <li>Partilhe atividades ideais para encontros (restaurante português? Museu? Hyde Park?)</li>
              </ul>
            </li>
          </ol>
          
          <h3>Toques Culturais Portugueses:</h3>
          <p>Destaque-se incluindo:</p>
          <ul>
            <li>O seu prato português favorito para cozinhar</li>
            <li>Música portuguesa que adora (Fado? Artistas portugueses modernos?)</li>
            <li>Locais portugueses que adoraria visitar juntos</li>
            <li>Expressões portuguesas que o fazem rir</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Upload 3-4 high-quality photos', textPortuguese: 'Carregar 3-4 fotos de alta qualidade' },
              { text: 'Write authentic "About Me" section', textPortuguese: 'Escrever secção "Sobre Mim" autêntica' },
              { text: 'Include Portuguese cultural elements', textPortuguese: 'Incluir elementos culturais portugueses' },
              { text: 'Specify what you\'re looking for', textPortuguese: 'Especificar o que procura' },
              { text: 'Review and edit for authenticity', textPortuguese: 'Rever e editar para autenticidade' }
            ]
          }
        },
        tips: [
          'Use recent photos (within last 6 months)',
          'Avoid group photos as your main image',
          'Write in the language you prefer for dating (Portuguese or English)',
          'Be honest about your Portuguese language fluency level'
        ],
        tipsPortuguese: [
          'Use fotos recentes (dos últimos 6 meses)',
          'Evite fotos de grupo como imagem principal',
          'Escreva no idioma que prefere para encontros (português ou inglês)',
          'Seja honesto sobre o seu nível de fluência em português'
        ]
      },
      {
        id: 'understanding-matching-algorithm',
        title: 'How Our Portuguese Matching Algorithm Works',
        titlePortuguese: 'Como Funciona o Nosso Algoritmo de Compatibilidade Português',
        type: 'tutorial',
        estimatedTime: 4,
        content: `
          <p>Understanding how matches are made helps you optimize your experience and connect with the most compatible Portuguese speakers.</p>
          
          <h3>Our Matching Factors:</h3>
          
          <h4>1. Cultural Compatibility (40%)</h4>
          <ul>
            <li><strong>Portuguese Heritage:</strong> Regional connections, family traditions</li>
            <li><strong>Language Comfort:</strong> Preference for Portuguese vs English in relationships</li>
            <li><strong>Cultural Values:</strong> Family importance, traditional vs modern outlook</li>
            <li><strong>Portuguese Community Involvement:</strong> How active you are in Portuguese events</li>
          </ul>
          
          <h4>2. Location & Lifestyle (30%)</h4>
          <ul>
            <li><strong>London Area:</strong> Distance between your locations</li>
            <li><strong>Work Schedule:</strong> When you're available for dates</li>
            <li><strong>Social Preferences:</strong> Quiet cafés vs busy Portuguese restaurants</li>
            <li><strong>Future Plans:</strong> Staying in London vs eventual return to Portugal</li>
          </ul>
          
          <h4>3. Personal Interests (20%)</h4>
          <ul>
            <li><strong>Hobbies:</strong> Shared activities you both enjoy</li>
            <li><strong>Entertainment:</strong> Portuguese cinema, fado music, British culture</li>
            <li><strong>Food Preferences:</strong> Portuguese cuisine enthusiasm level</li>
            <li><strong>Travel Style:</strong> Exploring London vs visiting Portugal</li>
          </ul>
          
          <h4>4. Relationship Goals (10%)</h4>
          <ul>
            <li><strong>Commitment Level:</strong> Casual dating vs serious relationship</li>
            <li><strong>Timeline:</strong> Taking it slow vs moving quickly</li>
            <li><strong>Future Vision:</strong> Family goals, career priorities</li>
          </ul>
          
          <h3>Improving Your Match Quality:</h3>
          <p>The more complete your profile, the better your matches become. Answer all cultural preference questions and be specific about your Portuguese background.</p>
        `,
        contentPortuguese: `
          <p>Entender como os matches são feitos ajuda-o a otimizar a sua experiência e conectar-se com os falantes de português mais compatíveis.</p>
          
          <h3>Os Nossos Fatores de Compatibilidade:</h3>
          
          <h4>1. Compatibilidade Cultural (40%)</h4>
          <ul>
            <li><strong>Herança Portuguesa:</strong> Conexões regionais, tradições familiares</li>
            <li><strong>Conforto com Idioma:</strong> Preferência por português vs inglês em relacionamentos</li>
            <li><strong>Valores Culturais:</strong> Importância da família, perspetiva tradicional vs moderna</li>
            <li><strong>Envolvimento na Comunidade Portuguesa:</strong> Quão ativo é em eventos portugueses</li>
          </ul>
          
          <h4>2. Localização e Estilo de Vida (30%)</h4>
          <ul>
            <li><strong>Área de Londres:</strong> Distância entre as vossas localizações</li>
            <li><strong>Horário de Trabalho:</strong> Quando está disponível para encontros</li>
            <li><strong>Preferências Sociais:</strong> Cafés tranquilos vs restaurantes portugueses movimentados</li>
            <li><strong>Planos Futuros:</strong> Ficar em Londres vs eventual regresso a Portugal</li>
          </ul>
          
          <h4>3. Interesses Pessoais (20%)</h4>
          <ul>
            <li><strong>Hobbies:</strong> Atividades partilhadas que ambos desfrutam</li>
            <li><strong>Entretenimento:</strong> Cinema português, música fado, cultura britânica</li>
            <li><strong>Preferências Alimentares:</strong> Nível de entusiasmo pela culinária portuguesa</li>
            <li><strong>Estilo de Viagem:</strong> Explorar Londres vs visitar Portugal</li>
          </ul>
          
          <h4>4. Objetivos de Relacionamento (10%)</h4>
          <ul>
            <li><strong>Nível de Compromisso:</strong> Encontros casuais vs relacionamento sério</li>
            <li><strong>Cronograma:</strong> Ir devagar vs avançar rapidamente</li>
            <li><strong>Visão Futura:</strong> Objetivos familiares, prioridades de carreira</li>
          </ul>
          
          <h3>Melhorando a Qualidade dos Seus Matches:</h3>
          <p>Quanto mais completo for o seu perfil, melhores se tornam os seus matches. Responda a todas as questões de preferências culturais e seja específico sobre a sua origem portuguesa.</p>
        `,
        tips: [
          'Complete all profile sections for better matching',
          'Update your preferences as you learn what you want',
          'Be open to matches slightly outside your initial criteria'
        ],
        tipsPortuguese: [
          'Complete todas as secções do perfil para melhor compatibilidade',
          'Atualize as suas preferências conforme aprende o que quer',
          'Esteja aberto a matches ligeiramente fora dos seus critérios iniciais'
        ]
      },
      {
        id: 'cultural-conversation-starters',
        title: 'Portuguese Cultural Conversation Starters',
        titlePortuguese: 'Iniciadores de Conversa Cultural Portuguesa',
        type: 'interactive',
        estimatedTime: 4,
        content: `
          <p>Starting conversations with fellow Portuguese speakers can be exciting! Here are culturally relevant conversation starters that create genuine connections:</p>
          
          <h3>Food & Tradition Starters:</h3>
          <ul>
            <li>"What's the Portuguese dish you miss most that you can't find in London?"</li>
            <li>"Do you have a secret spot for good bifana in London?"</li>
            <li>"What Portuguese tradition do you still maintain here?"</li>
            <li>"Pastel de nata from which bakery in London comes closest to home?"</li>
          </ul>
          
          <h3>Location & Heritage Starters:</h3>
          <ul>
            <li>"Which part of Portugal are you from? I'd love to hear about it!"</li>
            <li>"What made you choose London over other cities?"</li>
            <li>"Do you have family still in Portugal you visit regularly?"</li>
            <li>"What's the most Portuguese thing about your London flat?"</li>
          </ul>
          
          <h3>Music & Culture Starters:</h3>
          <ul>
            <li>"Are you into fado, or more modern Portuguese music?"</li>
            <li>"Have you been to any Portuguese events in London lately?"</li>
            <li>"What Portuguese movie would you recommend I watch?"</li>
            <li>"Do you speak Portuguese at home, or mix with English?"</li>
          </ul>
          
          <h3>London Life Starters:</h3>
          <ul>
            <li>"What's your favorite London neighborhood that reminds you of Portugal?"</li>
            <li>"Have you found any good Portuguese community spots here?"</li>
            <li>"What's been your biggest London culture shock as a Portuguese person?"</li>
            <li>"Do you prefer English breakfast or a proper Portuguese coffee and pastry?"</li>
          </ul>
          
          <h3>What to Avoid Early On:</h3>
          <ul>
            <li>Personal financial details</li>
            <li>Past relationship drama</li>
            <li>Controversial political topics</li>
            <li>Overly personal family issues</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Iniciar conversas com outros falantes de português pode ser emocionante! Aqui estão iniciadores de conversa culturalmente relevantes que criam conexões genuínas:</p>
          
          <h3>Iniciadores de Comida e Tradição:</h3>
          <ul>
            <li>"Qual é o prato português de que mais sentes falta que não consegues encontrar em Londres?"</li>
            <li>"Tens algum lugar secreto para uma boa bifana em Londres?"</li>
            <li>"Que tradição portuguesa ainda manténs aqui?"</li>
            <li>"Pastel de nata de que pastelaria em Londres chega mais perto de casa?"</li>
          </ul>
          
          <h3>Iniciadores de Localização e Herança:</h3>
          <ul>
            <li>"De que parte de Portugal és? Adorava ouvir falar sobre isso!"</li>
            <li>"O que te fez escolher Londres em vez de outras cidades?"</li>
            <li>"Tens família ainda em Portugal que visitas regularmente?"</li>
            <li>"Qual é a coisa mais portuguesa no teu apartamento em Londres?"</li>
          </ul>
          
          <h3>Iniciadores de Música e Cultura:</h3>
          <ul>
            <li>"Gostas de fado, ou mais de música portuguesa moderna?"</li>
            <li>"Foste a algum evento português em Londres ultimamente?"</li>
            <li>"Que filme português me recomendarias ver?"</li>
            <li>"Falas português em casa, ou misturas com inglês?"</li>
          </ul>
          
          <h3>Iniciadores de Vida em Londres:</h3>
          <ul>
            <li>"Qual é o teu bairro favorito de Londres que te lembra Portugal?"</li>
            <li>"Encontraste algum bom local da comunidade portuguesa aqui?"</li>
            <li>"Qual foi o teu maior choque cultural de Londres como português?"</li>
            <li>"Preferes pequeno-almoço inglês ou um café e pastel português a sério?"</li>
          </ul>
          
          <h3>O Que Evitar No Início:</h3>
          <ul>
            <li>Detalhes financeiros pessoais</li>
            <li>Drama de relacionamentos passados</li>
            <li>Tópicos políticos controversos</li>
            <li>Questões familiares demasiado pessoais</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Practice 3 food-related conversation starters', textPortuguese: 'Praticar 3 iniciadores de conversa relacionados com comida' },
              { text: 'Prepare your own Portuguese heritage story', textPortuguese: 'Preparar a sua própria história de herança portuguesa' },
              { text: 'Think of 2 London-Portugal comparison topics', textPortuguese: 'Pensar em 2 tópicos de comparação Londres-Portugal' },
              { text: 'List your favorite Portuguese cultural elements to share', textPortuguese: 'Listar os seus elementos culturais portugueses favoritos para partilhar' }
            ]
          }
        },
        tips: [
          'Be genuinely curious about their Portuguese experience',
          'Share your own stories to create reciprocal conversation',
          'Use Portuguese phrases naturally if you both speak it',
          'Ask follow-up questions to show real interest'
        ],
        tipsPortuguese: [
          'Seja genuinamente curioso sobre a experiência portuguesa deles',
          'Partilhe as suas próprias histórias para criar conversa recíproca',
          'Use frases portuguesas naturalmente se ambos a falam',
          'Faça perguntas de seguimento para mostrar interesse real'
        ]
      },
      {
        id: 'safety-and-meeting',
        title: 'Safe Dating in London\'s Portuguese Community',
        titlePortuguese: 'Encontros Seguros na Comunidade Portuguesa de Londres',
        type: 'tutorial',
        estimatedTime: 4,
        content: `
          <p>Safety is paramount when meeting someone new, even within our close Portuguese community. Here's how to date safely while building genuine connections:</p>
          
          <h3>Before Meeting In Person:</h3>
          <ol>
            <li><strong>Verify Their Profile:</strong>
              <ul>
                <li>Check if they have multiple photos that look consistent</li>
                <li>Look for Portuguese cultural references that seem authentic</li>
                <li>Notice if their Portuguese language use feels natural</li>
                <li>Video chat before meeting to confirm identity</li>
              </ul>
            </li>
            
            <li><strong>Safe Communication:</strong>
              <ul>
                <li>Keep conversations on the platform initially</li>
                <li>Don't share personal information (address, workplace) too quickly</li>
                <li>Use your Portuguese instincts - trust your gut feelings</li>
                <li>Ask mutual friends in the community if they know them</li>
              </ul>
            </li>
          </ol>
          
          <h3>First Date Safety Tips:</h3>
          <ol>
            <li><strong>Choose Public Portuguese Venues:</strong>
              <ul>
                <li>Meet at popular Portuguese restaurants or cafés in London</li>
                <li>Consider Portuguese community events as casual meeting spots</li>
                <li>Stay in areas you know well with good transport links</li>
                <li>Avoid isolated locations, even if they seem romantic</li>
              </ul>
            </li>
            
            <li><strong>Tell Someone Your Plans:</strong>
              <ul>
                <li>Share date details with a trusted friend or family member</li>
                <li>Set up check-in times during your date</li>
                <li>Have a backup plan for getting home safely</li>
                <li>Keep your phone charged and accessible</li>
              </ul>
            </li>
          </ol>
          
          <h3>Red Flags to Watch For:</h3>
          <ul>
            <li><strong>Cultural Red Flags:</strong> Exaggerated Portuguese stories, inconsistent cultural knowledge</li>
            <li><strong>Behavioral Red Flags:</strong> Pressure to meet immediately, asking for money, avoiding video calls</li>
            <li><strong>Communication Red Flags:</strong> Overly romantic language too quickly, deflecting personal questions</li>
          </ul>
          
          <h3>Portuguese Community Resources:</h3>
          <p>Leverage our community for safer dating:</p>
          <ul>
            <li>Join Portuguese community groups on social media for references</li>
            <li>Attend Portuguese community events to meet people organically</li>
            <li>Ask other Portuguese friends about good dating venues</li>
            <li>Use the Portuguese network for informal background checks</li>
          </ul>
          
          <h3>If Something Feels Wrong:</h3>
          <ul>
            <li>Trust your instincts immediately</li>
            <li>Have an exit strategy prepared</li>
            <li>Don't worry about being polite if you feel unsafe</li>
            <li>Report concerning behavior to the platform</li>
          </ul>
        `,
        contentPortuguese: `
          <p>A segurança é fundamental ao conhecer alguém novo, mesmo dentro da nossa comunidade portuguesa próxima. Aqui está como namorar com segurança enquanto constrói conexões genuínas:</p>
          
          <h3>Antes de Se Encontrar Pessoalmente:</h3>
          <ol>
            <li><strong>Verificar o Perfil Deles:</strong>
              <ul>
                <li>Verificar se têm várias fotos que parecem consistentes</li>
                <li>Procurar referências culturais portuguesas que pareçam autênticas</li>
                <li>Notar se o uso da língua portuguesa parece natural</li>
                <li>Videochamada antes de se encontrar para confirmar identidade</li>
              </ul>
            </li>
            
            <li><strong>Comunicação Segura:</strong>
              <ul>
                <li>Manter conversas na plataforma inicialmente</li>
                <li>Não partilhar informações pessoais (morada, local de trabalho) muito rapidamente</li>
                <li>Usar os seus instintos portugueses - confiar nos seus pressentimentos</li>
                <li>Perguntar a amigos mútuos na comunidade se os conhecem</li>
              </ul>
            </li>
          </ol>
          
          <h3>Dicas de Segurança para Primeiro Encontro:</h3>
          <ol>
            <li><strong>Escolher Locais Portugueses Públicos:</strong>
              <ul>
                <li>Encontrar-se em restaurantes ou cafés portugueses populares em Londres</li>
                <li>Considerar eventos da comunidade portuguesa como locais casuais de encontro</li>
                <li>Ficar em áreas que conhece bem com boas ligações de transporte</li>
                <li>Evitar locais isolados, mesmo que pareçam românticos</li>
              </ul>
            </li>
            
            <li><strong>Contar a Alguém os Seus Planos:</strong>
              <ul>
                <li>Partilhar detalhes do encontro com um amigo de confiança ou familiar</li>
                <li>Definir horários de contacto durante o encontro</li>
                <li>Ter um plano de backup para chegar a casa em segurança</li>
                <li>Manter o telemóvel carregado e acessível</li>
              </ul>
            </li>
          </ol>
          
          <h3>Sinais de Alerta a Observar:</h3>
          <ul>
            <li><strong>Sinais Culturais:</strong> Histórias portuguesas exageradas, conhecimento cultural inconsistente</li>
            <li><strong>Sinais Comportamentais:</strong> Pressão para se encontrar imediatamente, pedir dinheiro, evitar videochamadas</li>
            <li><strong>Sinais de Comunicação:</strong> Linguagem excessivamente romântica muito rapidamente, desviar questões pessoais</li>
          </ul>
          
          <h3>Recursos da Comunidade Portuguesa:</h3>
          <p>Aproveitar a nossa comunidade para encontros mais seguros:</p>
          <ul>
            <li>Juntar-se a grupos da comunidade portuguesa nas redes sociais para referências</li>
            <li>Participar em eventos da comunidade portuguesa para conhecer pessoas organicamente</li>
            <li>Perguntar a outros amigos portugueses sobre bons locais para encontros</li>
            <li>Usar a rede portuguesa para verificações informais de antecedentes</li>
          </ul>
          
          <h3>Se Algo Parece Errado:</h3>
          <ul>
            <li>Confiar nos seus instintos imediatamente</li>
            <li>Ter uma estratégia de saída preparada</li>
            <li>Não se preocupar em ser educado se se sentir inseguro</li>
            <li>Reportar comportamento preocupante à plataforma</li>
          </ul>
        `,
        warnings: [
          'Never share your home address on first meetings',
          'Always meet in public places for first few dates',
          'Trust your Portuguese community instincts about people',
          'Don\'t feel pressured to continue if something feels off'
        ],
        warningsPortuguese: [
          'Nunca partilhe a sua morada em primeiros encontros',
          'Sempre se encontre em locais públicos nos primeiros encontros',
          'Confie nos seus instintos da comunidade portuguesa sobre pessoas',
          'Não se sinta pressionado a continuar se algo parece estranho'
        ]
      }
    ],
    practicalExercises: [],
    resources: [
      {
        title: 'Portuguese Restaurants in London Guide',
        titlePortuguese: 'Guia de Restaurantes Portugueses em Londres',
        url: '/guides/portuguese-restaurants-london',
        type: 'guide'
      },
      {
        title: 'Safe Dating Checklist',
        titlePortuguese: 'Lista de Verificação de Encontros Seguros',
        url: '/downloads/safe-dating-checklist.pdf',
        type: 'download'
      },
      {
        title: 'Portuguese Community Events Calendar',
        titlePortuguese: 'Calendário de Eventos da Comunidade Portuguesa',
        url: ROUTES.events,
        type: 'external'
      }
    ]
  };

  return (
    <LearningModuleFramework
      module={datingMatchingModule}
      onComplete={handleModuleComplete}
      onStepComplete={handleStepComplete}
      completedSteps={completedSteps}
      showProgress={true}
    />
  );
}