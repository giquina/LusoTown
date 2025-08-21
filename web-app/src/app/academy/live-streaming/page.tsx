'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Users, DollarSign, Settings, Mic, Camera, Monitor, Wifi } from 'lucide-react';
import LearningModuleFramework, { LearningModule, LearningStep } from '@/components/academy/LearningModuleFramework';
import { useLanguage } from '@/context/LanguageContext';
import { EXTERNAL_SERVICES } from '@/config/cdn';

export default function LiveStreamingModule() {
  const { language } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const isPortuguese = language === 'pt';

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lusotown-academy-live-streaming-progress');
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
      localStorage.setItem('lusotown-academy-live-streaming-progress', JSON.stringify({
        completedSteps: newCompleted,
        lastAccess: Date.now()
      }));
    }
  };

  const handleModuleComplete = () => {
    // Module completion logic
    console.log('Live Streaming module completed!');
  };

  // Define the learning module structure
  const liveStreamingModule: LearningModule = {
    id: 'live-streaming',
    title: 'Live Streaming',
    titlePortuguese: 'Transmissão Ao Vivo',
    description: 'Master Portuguese streaming platform, build your audience, and turn your passion into profit',
    descriptionPortuguese: 'Domine a plataforma de streaming portuguesa, construa a sua audiência e monetize o seu conteúdo cultural',
    difficulty: 'Intermediate',
    estimatedTime: 35,
    icon: Video,
    category: 'Content',
    categoryPortuguese: 'Conteúdo',
    prerequisites: ['Basic understanding of Portuguese culture', 'Comfort with technology'],
    prerequisitesPortuguese: ['Compreensão básica da cultura portuguesa', 'Conforto com tecnologia'],
    learningObjectives: [
      'Set up professional Portuguese streaming setup',
      'Create engaging cultural content for Portuguese audience',
      'Use Portuguese emotes and community features',
      'Build and grow your Portuguese-speaking audience',
      'Monetize through LusoTown revenue sharing program',
      'Navigate streaming best practices and community guidelines'
    ],
    learningObjectivesPortuguese: [
      'Configurar setup profissional de streaming português',
      'Criar conteúdo cultural envolvente para audiência portuguesa',
      'Usar emotes portugueses e funcionalidades comunitárias',
      'Construir e aumentar a sua audiência de falantes de português',
      'Monetizar através do programa de partilha de receitas da LusoTown',
      'Navegar melhores práticas de streaming e diretrizes comunitárias'
    ],
    steps: [
      {
        id: 'streaming-platform-overview',
        title: 'Portuguese Streaming Platform Overview',
        titlePortuguese: 'Visão Geral da Plataforma de Streaming Portuguesa',
        type: 'introduction',
        estimatedTime: 5,
        content: `
          <p>Welcome to LusoTown TV - the premier Portuguese streaming platform in London! Our platform is specifically designed for Portuguese streamers to connect with the diaspora community and earn immediate income.</p>
          
          <h3>What Makes LusoTown Streaming Special:</h3>
          <ul>
            <li><strong>Portuguese-First Community:</strong> Your audience understands your cultural references, language nuances, and shared experiences</li>
            <li><strong>Cultural Emotes System:</strong> Express yourself with Portuguese-specific emotes like :saudade:, :festa:, :futebol:, :pastelnata:</li>
            <li><strong>Revenue Sharing (85/15):</strong> Keep 85% of your earnings - industry-leading rates for creators</li>
            <li><strong>Multi-Platform Integration:</strong> Simultaneously stream to YouTube, Twitch, and TikTok</li>
            <li><strong>London Portuguese Events:</strong> Integrate with local Portuguese community events and venues</li>
          </ul>
          
          <h3>Content Categories That Thrive:</h3>
          <ol>
            <li><strong>Portuguese Culture & Heritage:</strong> Fado nights, traditional cooking, cultural storytelling</li>
            <li><strong>Business & Professional:</strong> Technology workshops in Portuguese, startup discussions, professional development</li>
            <li><strong>Gaming in Portuguese:</strong> FIFA tournaments, Portuguese gaming community</li>
            <li><strong>London Portuguese Life:</strong> Community vlogs, restaurant reviews, cultural events coverage</li>
            <li><strong>Educational Content:</strong> Portuguese language lessons, cultural education, history</li>
          </ol>
          
          <h3>Streaming Tiers Available:</h3>
          <ul>
            <li><strong>Creator Starter (£19/month):</strong> Basic RTMP, Portuguese emotes, community chat</li>
            <li><strong>Professional Creator (£49/month):</strong> Multi-stream, revenue sharing, custom overlays</li>
            <li><strong>Enterprise Creator (£199/month):</strong> White-label platform, dedicated channel, API access</li>
          </ul>
          
          <p>Our platform serves over 12,500 monthly viewers with 180+ active Portuguese streamers generating £45K+ in monthly revenue.</p>
        `,
        contentPortuguese: `
          <p>Bem-vindo à LusoTown TV - a principal plataforma de streaming portuguesa em Londres! A nossa plataforma é especificamente desenhada para criadores de conteúdo portugueses se conectarem com a comunidade da diáspora.</p>
          
          <h3>O Que Torna o Streaming da LusoTown Especial:</h3>
          <ul>
            <li><strong>Comunidade Portuguesa Primeiro:</strong> A sua audiência entende as suas referências culturais, nuances linguísticas e experiências partilhadas</li>
            <li><strong>Sistema de Emotes Culturais:</strong> Expresse-se com emotes específicos portugueses como :saudade:, :festa:, :futebol:, :pastelnata:</li>
            <li><strong>Partilha de Receitas (85/15):</strong> Mantenha 85% dos seus ganhos - taxas líderes da indústria para criadores</li>
            <li><strong>Integração Multi-Plataforma:</strong> Transmita simultaneamente para YouTube, Twitch e TikTok</li>
            <li><strong>Eventos Portugueses de Londres:</strong> Integre com eventos e locais da comunidade portuguesa local</li>
          </ul>
          
          <h3>Categorias de Conteúdo Que Prosperam:</h3>
          <ol>
            <li><strong>Cultura e Herança Portuguesa:</strong> Noites de fado, culinária tradicional, storytelling cultural</li>
            <li><strong>Negócios e Profissional:</strong> Workshops de IA em português, discussões de startups, desenvolvimento profissional</li>
            <li><strong>Gaming em Português:</strong> Torneios FIFA, comunidade de gaming portuguesa</li>
            <li><strong>Vida Portuguesa em Londres:</strong> Vlogs comunitários, reviews de restaurantes, cobertura de eventos culturais</li>
            <li><strong>Conteúdo Educacional:</strong> Lições de língua portuguesa, educação cultural, história</li>
          </ol>
          
          <h3>Níveis de Streaming Disponíveis:</h3>
          <ul>
            <li><strong>Criador Iniciante (£19/mês):</strong> RTMP básico, emotes portugueses, chat comunitário</li>
            <li><strong>Criador Profissional (£49/mês):</strong> Multi-stream, partilha de receitas, overlays personalizados</li>
            <li><strong>Criador Empresarial (£199/mês):</strong> Plataforma white-label, canal dedicado, acesso API</li>
          </ul>
          
          <p>A nossa plataforma serve mais de 12.500 visualizadores mensais com 180+ streamers portugueses ativos gerando £45K+ em receita mensal.</p>
        `,
        tips: [
          'Start with Creator Starter tier to test the platform before upgrading',
          'Focus on one content category initially to build your niche audience',
          'Engage with other Portuguese streamers to build community connections'
        ],
        tipsPortuguese: [
          'Comece com o nível Criador Iniciante para testar a plataforma antes de upgradar',
          'Foque numa categoria de conteúdo inicialmente para construir a sua audiência de nicho',
          'Envolva-se com outros streamers portugueses para construir conexões comunitárias'
        ]
      },
      {
        id: 'technical-setup',
        title: 'Technical Setup & Equipment for Portuguese Streaming',
        titlePortuguese: 'Configuração Técnica e Equipamento para Streaming Português',
        type: 'tutorial',
        estimatedTime: 8,
        content: `
          <p>Setting up professional streaming equipment ensures your Portuguese content looks and sounds great for your audience.</p>
          
          <h3>Essential Equipment Checklist:</h3>
          
          <h4>1. Camera Setup (Budget: £100-500)</h4>
          <ul>
            <li><strong>Beginner:</strong> Webcam (Logitech C920/C922) - £80-120</li>
            <li><strong>Intermediate:</strong> DSLR/Mirrorless camera + capture card - £300-500</li>
            <li><strong>Professional:</strong> Professional camcorder + multi-camera setup - £500+</li>
          </ul>
          
          <h4>2. Audio Equipment (Critical for Portuguese Content)</h4>
          <ul>
            <li><strong>Microphone:</strong> USB microphone (Blue Yeti/Audio-Technica AT2020USB+) - £100-200</li>
            <li><strong>Audio Interface:</strong> For XLR microphones (Focusrite Scarlett Solo) - £100</li>
            <li><strong>Headphones:</strong> Monitoring headphones (Sony MDR-7506) - £80</li>
            <li><strong>Acoustic Treatment:</strong> Foam panels for better Portuguese pronunciation clarity - £50</li>
          </ul>
          
          <h4>3. Lighting for Portuguese Cultural Content</h4>
          <ul>
            <li><strong>Ring Light:</strong> For face-focused content (interviews, cooking) - £50-100</li>
            <li><strong>Softbox Setup:</strong> For professional look - £150-300</li>
            <li><strong>Background Lighting:</strong> LED strips for Portuguese flag colors or cultural ambiance - £30-80</li>
          </ul>
          
          <h4>4. Streaming Software Configuration</h4>
          <ul>
            <li><strong>OBS Studio (Free):</strong> Professional open-source streaming software</li>
            <li><strong>Streamlabs OBS:</strong> User-friendly alternative with built-in features</li>
            <li><strong>XSplit (Paid):</strong> Professional option with advanced features</li>
          </ul>
          
          <h3>LusoTown RTMP Configuration:</h3>
          <p>To connect to our Portuguese streaming platform:</p>
          <ol>
            <li><strong>RTMP URL:</strong> rtmp://stream.lusotown.com/live/</li>
            <li><strong>Stream Key:</strong> Provided in your creator dashboard</li>
            <li><strong>Video Settings:</strong> 1920x1080, 30fps (recommended for Portuguese content)</li>
            <li><strong>Audio Settings:</strong> 44.1kHz, 128kbps (important for clear Portuguese speech)</li>
            <li><strong>Bitrate:</strong> 3000-5000 kbps (depending on your internet connection)</li>
          </ol>
          
          <h3>Portuguese Cultural Setup Ideas:</h3>
          <ul>
            <li><strong>Background:</strong> Portuguese flag, azulejo tiles, or Portuguese books</li>
            <li><strong>Props:</strong> Portuguese guitar for music content, traditional pottery</li>
            <li><strong>Food Setup:</strong> Kitchen area for Portuguese cooking streams</li>
            <li><strong>Gaming Setup:</strong> Portuguese football jerseys, Portuguese gaming peripherals</li>
          </ul>
          
          <h3>Internet Requirements:</h3>
          <ul>
            <li><strong>Minimum Upload Speed:</strong> 5 Mbps for 720p streaming</li>
            <li><strong>Recommended:</strong> 10+ Mbps for 1080p streaming</li>
            <li><strong>Stability:</strong> Wired ethernet connection preferred over WiFi</li>
            <li><strong>Backup:</strong> Mobile hotspot for emergency streaming</li>
          </ul>
          
          <h3>Mobile Streaming Setup (Streamlabs Mobile):</h3>
          <p>For Portuguese community events and on-the-go content:</p>
          <ul>
            <li>Download Streamlabs Mobile app</li>
            <li>Configure LusoTown RTMP settings</li>
            <li>Use phone tripod for stable footage</li>
            <li>External microphone for better audio quality</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Configurar equipamento profissional de streaming garante que o seu conteúdo português pareça e soe excelente para a sua audiência.</p>
          
          <h3>Lista de Verificação de Equipamento Essencial:</h3>
          
          <h4>1. Configuração de Câmara (Orçamento: £100-500)</h4>
          <ul>
            <li><strong>Iniciante:</strong> Webcam (Logitech C920/C922) - £80-120</li>
            <li><strong>Intermédio:</strong> Câmara DSLR/Mirrorless + placa de captura - £300-500</li>
            <li><strong>Profissional:</strong> Filmadora profissional + setup multi-câmara - £500+</li>
          </ul>
          
          <h4>2. Equipamento de Áudio (Crítico para Conteúdo Português)</h4>
          <ul>
            <li><strong>Microfone:</strong> Microfone USB (Blue Yeti/Audio-Technica AT2020USB+) - £100-200</li>
            <li><strong>Interface de Áudio:</strong> Para microfones XLR (Focusrite Scarlett Solo) - £100</li>
            <li><strong>Auscultadores:</strong> Auscultadores de monitorização (Sony MDR-7506) - £80</li>
            <li><strong>Tratamento Acústico:</strong> Painéis de espuma para melhor clareza de pronúncia portuguesa - £50</li>
          </ul>
          
          <h4>3. Iluminação para Conteúdo Cultural Português</h4>
          <ul>
            <li><strong>Ring Light:</strong> Para conteúdo focado no rosto (entrevistas, culinária) - £50-100</li>
            <li><strong>Setup Softbox:</strong> Para look profissional - £150-300</li>
            <li><strong>Iluminação de Fundo:</strong> Tiras LED para cores da bandeira portuguesa ou ambiente cultural - £30-80</li>
          </ul>
          
          <h4>4. Configuração de Software de Streaming</h4>
          <ul>
            <li><strong>OBS Studio (Grátis):</strong> Software profissional de streaming open-source</li>
            <li><strong>Streamlabs OBS:</strong> Alternativa user-friendly com funcionalidades integradas</li>
            <li><strong>XSplit (Pago):</strong> Opção profissional com funcionalidades avançadas</li>
          </ul>
          
          <h3>Configuração RTMP da LusoTown:</h3>
          <p>Para conectar à nossa plataforma de streaming portuguesa:</p>
          <ol>
            <li><strong>URL RTMP:</strong> rtmp://stream.lusotown.com/live/</li>
            <li><strong>Chave de Stream:</strong> Fornecida no seu dashboard de criador</li>
            <li><strong>Configurações de Vídeo:</strong> 1920x1080, 30fps (recomendado para conteúdo português)</li>
            <li><strong>Configurações de Áudio:</strong> 44.1kHz, 128kbps (importante para fala portuguesa clara)</li>
            <li><strong>Bitrate:</strong> 3000-5000 kbps (dependendo da sua conexão de internet)</li>
          </ol>
          
          <h3>Ideias de Setup Cultural Português:</h3>
          <ul>
            <li><strong>Fundo:</strong> Bandeira portuguesa, azulejos, ou livros portugueses</li>
            <li><strong>Adereços:</strong> Guitarra portuguesa para conteúdo musical, cerâmica tradicional</li>
            <li><strong>Setup de Comida:</strong> Área de cozinha para streams de culinária portuguesa</li>
            <li><strong>Setup de Gaming:</strong> Camisolas de futebol português, periféricos de gaming portugueses</li>
          </ul>
          
          <h3>Requisitos de Internet:</h3>
          <ul>
            <li><strong>Velocidade Mínima de Upload:</strong> 5 Mbps para streaming 720p</li>
            <li><strong>Recomendado:</strong> 10+ Mbps para streaming 1080p</li>
            <li><strong>Estabilidade:</strong> Conexão ethernet com fios preferida sobre WiFi</li>
            <li><strong>Backup:</strong> Hotspot móvel para streaming de emergência</li>
          </ul>
          
          <h3>Setup de Streaming Móvel (Streamlabs Mobile):</h3>
          <p>Para eventos da comunidade portuguesa e conteúdo em movimento:</p>
          <ul>
            <li>Descarregar app Streamlabs Mobile</li>
            <li>Configurar definições RTMP da LusoTown</li>
            <li>Usar tripé de telemóvel para filmagem estável</li>
            <li>Microfone externo para melhor qualidade de áudio</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Test your internet upload speed', textPortuguese: 'Testar a velocidade de upload da sua internet' },
              { text: 'Set up streaming software (OBS/Streamlabs)', textPortuguese: 'Configurar software de streaming (OBS/Streamlabs)' },
              { text: 'Configure RTMP settings for LusoTown', textPortuguese: 'Configurar definições RTMP para LusoTown' },
              { text: 'Test audio quality in Portuguese', textPortuguese: 'Testar qualidade de áudio em português' },
              { text: 'Set up cultural background/props', textPortuguese: 'Configurar fundo/adereços culturais' },
              { text: 'Do a test stream to check everything works', textPortuguese: 'Fazer um stream de teste para verificar se tudo funciona' }
            ]
          }
        },
        tips: [
          'Invest in good audio first - viewers forgive poor video but not poor audio',
          'Test your setup thoroughly before your first live stream',
          'Have backup equipment ready in case of technical failures',
          'Practice speaking clearly in Portuguese for better audience engagement'
        ],
        tipsPortuguese: [
          'Invista primeiro em bom áudio - espectadores perdoam vídeo pobre mas não áudio pobre',
          'Teste bem o seu setup antes do seu primeiro stream ao vivo',
          'Tenha equipamento de backup pronto em caso de falhas técnicas',
          'Pratique falar claramente em português para melhor envolvimento da audiência'
        ]
      },
      {
        id: 'content-creation-strategies',
        title: 'Portuguese Content Creation Strategies',
        titlePortuguese: 'Estratégias de Criação de Conteúdo Português',
        type: 'tutorial',
        estimatedTime: 10,
        content: `
          <p>Creating engaging Portuguese content requires understanding your diaspora audience and their unique interests in London.</p>
          
          <h3>Content Pillars for Portuguese Streamers:</h3>
          
          <h4>1. Cultural Heritage Content (40% of content)</h4>
          <ul>
            <li><strong>Traditional Cooking Streams:</strong>
              <ul>
                <li>Bacalhau recipes with London-available ingredients</li>
                <li>Pastéis de nata making tutorials</li>
                <li>Portuguese Christmas/Easter traditions</li>
                <li>Regional specialties (Northern vs Southern Portugal)</li>
              </ul>
            </li>
            <li><strong>Music and Arts:</strong>
              <ul>
                <li>Fado nights with guitar lessons</li>
                <li>Portuguese folk music sessions</li>
                <li>Portuguese poetry readings</li>
                <li>Traditional craft demonstrations</li>
              </ul>
            </li>
            <li><strong>Language and Education:</strong>
              <ul>
                <li>Portuguese language lessons for children of diaspora</li>
                <li>Portuguese history storytelling</li>
                <li>Cultural etiquette and traditions explanation</li>
                <li>Regional dialects and expressions</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. London Portuguese Life (30% of content)</h4>
          <ul>
            <li><strong>Community Spotlights:</strong>
              <ul>
                <li>Portuguese business owner interviews</li>
                <li>Community event coverage</li>
                <li>Portuguese student experiences in London universities</li>
                <li>Success stories of Portuguese professionals</li>
              </ul>
            </li>
            <li><strong>London Through Portuguese Eyes:</strong>
              <ul>
                <li>Portuguese restaurant reviews and hidden gems</li>
                <li>Comparing London neighborhoods to Portuguese cities</li>
                <li>Navigating British systems as a Portuguese speaker</li>
                <li>Cultural shock moments and adaptations</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Professional Development (20% of content)</h4>
          <ul>
            <li><strong>Career Growth in London:</strong>
              <ul>
                <li>CV writing tips for Portuguese professionals</li>
                <li>Interview preparation in English vs Portuguese contexts</li>
                <li>Networking strategies in London's Portuguese community</li>
                <li>Industry-specific guidance (tech, finance, healthcare)</li>
              </ul>
            </li>
            <li><strong>Business and Entrepreneurship:</strong>
              <ul>
                <li>Starting a business in the UK as a Portuguese speaker</li>
                <li>Portuguese market insights and opportunities</li>
                <li>Cross-cultural business communication</li>
                <li>Technology trends affecting Portuguese businesses</li>
              </ul>
            </li>
          </ul>
          
          <h4>4. Entertainment and Gaming (10% of content)</h4>
          <ul>
            <li><strong>Portuguese Gaming Community:</strong>
              <ul>
                <li>FIFA tournaments with Portuguese teams</li>
                <li>Gaming in Portuguese language</li>
                <li>Portuguese esports scene coverage</li>
                <li>Gaming nostalgia from Portugal</li>
              </ul>
            </li>
          </ul>
          
          <h3>Audience Engagement Strategies:</h3>
          
          <h4>Portuguese Cultural Emotes Usage:</h4>
          <ul>
            <li><strong>:saudade:</strong> When discussing missing Portugal or family</li>
            <li><strong>:festa:</strong> For celebrations and happy moments</li>
            <li><strong>:futebol:</strong> During football discussions or celebrations</li>
            <li><strong>:pastelnata:</strong> Food content or comfort moments</li>
            <li><strong>:fado:</strong> Emotional or nostalgic content</li>
            <li><strong>:codfish:</strong> Traditional cooking or cultural pride</li>
          </ul>
          
          <h4>Interactive Elements:</h4>
          <ul>
            <li><strong>Portuguese Polls:</strong> "Norte vs Sul cuisine preferences"</li>
            <li><strong>Cultural Quizzes:</strong> Portuguese history, geography, traditions</li>
            <li><strong>Story Sharing:</strong> Viewer immigration stories and experiences</li>
            <li><strong>Recipe Exchanges:</strong> Family recipes from different Portuguese regions</li>
            <li><strong>Language Games:</strong> Portuguese word associations, pronunciation challenges</li>
          </ul>
          
          <h3>Content Calendar Planning:</h3>
          
          <h4>Weekly Schedule Suggestions:</h4>
          <ul>
            <li><strong>Monday:</strong> "Portuguese Monday" - cultural content, traditions</li>
            <li><strong>Wednesday:</strong> "London Life Wednesday" - community, lifestyle</li>
            <li><strong>Friday:</strong> "Professional Friday" - career, business, skills</li>
            <li><strong>Weekend:</strong> Entertainment, gaming, casual community interaction</li>
          </ul>
          
          <h4>Seasonal Content Ideas:</h4>
          <ul>
            <li><strong>Portuguese National Day (June 10):</strong> Historical documentaries, cultural celebrations</li>
            <li><strong>Festa de São João (June 24):</strong> Traditional celebrations, food preparation</li>
            <li><strong>Christmas in Portugal vs London:</strong> Tradition comparisons, recipe sharing</li>
            <li><strong>Portuguese Football Season:</strong> Match viewing parties, team discussions</li>
          </ul>
          
          <h3>Collaboration Opportunities:</h3>
          <ul>
            <li><strong>Other Portuguese Streamers:</strong> Joint cooking sessions, cultural discussions</li>
            <li><strong>Portuguese Businesses in London:</strong> Restaurant features, product reviews</li>
            <li><strong>Portuguese Cultural Organizations:</strong> Event coverage, educational content</li>
            <li><strong>Cross-Cultural Content:</strong> British-Portuguese cultural exchanges</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Criar conteúdo português envolvente requer entender a sua audiência da diáspora e os seus interesses únicos em Londres.</p>
          
          <h3>Pilares de Conteúdo para Streamers Portugueses:</h3>
          
          <h4>1. Conteúdo de Herança Cultural (40% do conteúdo)</h4>
          <ul>
            <li><strong>Streams de Culinária Tradicional:</strong>
              <ul>
                <li>Receitas de bacalhau com ingredientes disponíveis em Londres</li>
                <li>Tutoriais de fazer pastéis de nata</li>
                <li>Tradições portuguesas de Natal/Páscoa</li>
                <li>Especialidades regionais (Norte vs Sul de Portugal)</li>
              </ul>
            </li>
            <li><strong>Música e Artes:</strong>
              <ul>
                <li>Noites de fado com lições de guitarra</li>
                <li>Sessões de música folk portuguesa</li>
                <li>Leituras de poesia portuguesa</li>
                <li>Demonstrações de artesanato tradicional</li>
              </ul>
            </li>
            <li><strong>Idioma e Educação:</strong>
              <ul>
                <li>Lições de língua portuguesa para filhos da diáspora</li>
                <li>Storytelling de história portuguesa</li>
                <li>Explicação de etiqueta cultural e tradições</li>
                <li>Dialetos regionais e expressões</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Vida Portuguesa em Londres (30% do conteúdo)</h4>
          <ul>
            <li><strong>Destaques da Comunidade:</strong>
              <ul>
                <li>Entrevistas com proprietários de negócios portugueses</li>
                <li>Cobertura de eventos comunitários</li>
                <li>Experiências de estudantes portugueses nas universidades de Londres</li>
                <li>Histórias de sucesso de profissionais portugueses</li>
              </ul>
            </li>
            <li><strong>Londres Através de Olhos Portugueses:</strong>
              <ul>
                <li>Reviews de restaurantes portugueses e joias escondidas</li>
                <li>Comparar bairros de Londres com cidades portuguesas</li>
                <li>Navegar sistemas britânicos como falante de português</li>
                <li>Momentos de choque cultural e adaptações</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Desenvolvimento Profissional (20% do conteúdo)</h4>
          <ul>
            <li><strong>Crescimento de Carreira em Londres:</strong>
              <ul>
                <li>Dicas de escrita de CV para profissionais portugueses</li>
                <li>Preparação de entrevistas em contextos ingleses vs portugueses</li>
                <li>Estratégias de networking na comunidade portuguesa de Londres</li>
                <li>Orientação específica da indústria (tech, finanças, saúde)</li>
              </ul>
            </li>
            <li><strong>Negócios e Empreendedorismo:</strong>
              <ul>
                <li>Começar um negócio no Reino Unido como falante de português</li>
                <li>Insights do mercado português e oportunidades</li>
                <li>Comunicação empresarial intercultural</li>
                <li>Tendências tecnológicas afetando negócios portugueses</li>
              </ul>
            </li>
          </ul>
          
          <h4>4. Entretenimento e Gaming (10% do conteúdo)</h4>
          <ul>
            <li><strong>Comunidade de Gaming Portuguesa:</strong>
              <ul>
                <li>Torneios FIFA com equipas portuguesas</li>
                <li>Gaming em língua portuguesa</li>
                <li>Cobertura da cena de esports portuguesa</li>
                <li>Nostalgia de gaming de Portugal</li>
              </ul>
            </li>
          </ul>
          
          <h3>Estratégias de Envolvimento da Audiência:</h3>
          
          <h4>Uso de Emotes Culturais Portugueses:</h4>
          <ul>
            <li><strong>:saudade:</strong> Ao discutir sentir falta de Portugal ou família</li>
            <li><strong>:festa:</strong> Para celebrações e momentos felizes</li>
            <li><strong>:futebol:</strong> Durante discussões de futebol ou celebrações</li>
            <li><strong>:pastelnata:</strong> Conteúdo de comida ou momentos de conforto</li>
            <li><strong>:fado:</strong> Conteúdo emocional ou nostálgico</li>
            <li><strong>:codfish:</strong> Culinária tradicional ou orgulho cultural</li>
          </ul>
          
          <h4>Elementos Interativos:</h4>
          <ul>
            <li><strong>Polls Portuguesas:</strong> "Preferências de culinária Norte vs Sul"</li>
            <li><strong>Quizzes Culturais:</strong> História, geografia, tradições portuguesas</li>
            <li><strong>Partilha de Histórias:</strong> Histórias de imigração e experiências de espectadores</li>
            <li><strong>Trocas de Receitas:</strong> Receitas familiares de diferentes regiões portuguesas</li>
            <li><strong>Jogos de Idioma:</strong> Associações de palavras portuguesas, desafios de pronúncia</li>
          </ul>
          
          <h3>Planeamento de Calendário de Conteúdo:</h3>
          
          <h4>Sugestões de Horário Semanal:</h4>
          <ul>
            <li><strong>Segunda:</strong> "Segunda Portuguesa" - conteúdo cultural, tradições</li>
            <li><strong>Quarta:</strong> "Quarta de Vida em Londres" - comunidade, estilo de vida</li>
            <li><strong>Sexta:</strong> "Sexta Profissional" - carreira, negócios, habilidades</li>
            <li><strong>Fim de semana:</strong> Entretenimento, gaming, interação comunitária casual</li>
          </ul>
          
          <h4>Ideias de Conteúdo Sazonal:</h4>
          <ul>
            <li><strong>Dia de Portugal (10 de junho):</strong> Documentários históricos, celebrações culturais</li>
            <li><strong>Festa de São João (24 de junho):</strong> Celebrações tradicionais, preparação de comida</li>
            <li><strong>Natal em Portugal vs Londres:</strong> Comparações de tradições, partilha de receitas</li>
            <li><strong>Época de Futebol Português:</strong> Festas para ver jogos, discussões de equipas</li>
          </ul>
          
          <h3>Oportunidades de Colaboração:</h3>
          <ul>
            <li><strong>Outros Streamers Portugueses:</strong> Sessões de culinária conjuntas, discussões culturais</li>
            <li><strong>Negócios Portugueses em Londres:</strong> Features de restaurantes, reviews de produtos</li>
            <li><strong>Organizações Culturais Portuguesas:</strong> Cobertura de eventos, conteúdo educacional</li>
            <li><strong>Conteúdo Intercultural:</strong> Trocas culturais britânico-portuguesas</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Choose your primary content pillar (cultural, lifestyle, professional)', textPortuguese: 'Escolher o seu pilar de conteúdo primário (cultural, estilo de vida, profissional)' },
              { text: 'Plan 5 initial stream topics', textPortuguese: 'Planear 5 tópicos iniciais de stream' },
              { text: 'Research Portuguese cultural calendar dates', textPortuguese: 'Pesquisar datas do calendário cultural português' },
              { text: 'Create content calendar for first month', textPortuguese: 'Criar calendário de conteúdo para primeiro mês' },
              { text: 'Identify potential collaboration partners', textPortuguese: 'Identificar potenciais parceiros de colaboração' }
            ]
          }
        },
        tips: [
          'Start with content you\'re genuinely passionate about',
          'Engage with your audience in Portuguese to build authentic connections',
          'Collaborate with other Portuguese creators to grow your network',
          'Keep track of what content performs best and create more of it'
        ],
        tipsPortuguese: [
          'Comece com conteúdo pelo qual é genuinamente apaixonado',
          'Envolva-se com a sua audiência em português para construir conexões autênticas',
          'Colabore com outros criadores portugueses para crescer a sua rede',
          'Acompanhe que conteúdo tem melhor desempenho e crie mais dele'
        ]
      },
      {
        id: 'audience-building',
        title: 'Building Your Portuguese-Speaking Audience',
        titlePortuguese: 'Construindo a Sua Audiência de Falantes de Português',
        type: 'tutorial',
        estimatedTime: 7,
        content: `
          <p>Building a loyal Portuguese-speaking audience requires understanding the diaspora community's unique needs and creating genuine connections.</p>
          
          <h3>Understanding Your Portuguese Audience in London:</h3>
          
          <h4>Audience Segments:</h4>
          <ul>
            <li><strong>Recent Immigrants (0-2 years in London):</strong>
              <ul>
                <li>Need: Practical London life guidance, language support</li>
                <li>Content: How-to guides, cultural comparisons, community integration</li>
                <li>Engagement: Respond in Portuguese, offer direct help and advice</li>
              </ul>
            </li>
            <li><strong>Established Professionals (2-10+ years):</strong>
              <ul>
                <li>Need: Career advancement, cultural maintenance, networking</li>
                <li>Content: Professional development, business insights, cultural events</li>
                <li>Engagement: Industry discussions, networking opportunities</li>
              </ul>
            </li>
            <li><strong>Portuguese Students:</strong>
              <ul>
                <li>Need: Academic support, social connections, budget living</li>
                <li>Content: Study tips, affordable Portuguese food, student community</li>
                <li>Engagement: Study groups, exam support, social meetups</li>
              </ul>
            </li>
            <li><strong>Second-Generation Portuguese (British-born):</strong>
              <ul>
                <li>Need: Cultural connection, language maintenance, heritage pride</li>
                <li>Content: Portuguese traditions, language lessons, cultural history</li>
                <li>Engagement: Heritage storytelling, family tradition sharing</li>
              </ul>
            </li>
          </ul>
          
          <h3>Growth Strategies Specific to Portuguese Community:</h3>
          
          <h4>1. Community Integration Approach</h4>
          <ul>
            <li><strong>Portuguese Community Events:</strong>
              <ul>
                <li>Stream live from Portuguese festivals and events in London</li>
                <li>Cover Portuguese religious celebrations and cultural gatherings</li>
                <li>Interview community leaders and Portuguese business owners</li>
                <li>Document Portuguese community milestones and achievements</li>
              </ul>
            </li>
            <li><strong>Portuguese Social Media Groups:</strong>
              <ul>
                <li>Share your content in "Portugueses em Londres" Facebook groups</li>
                <li>Engage in Portuguese WhatsApp community groups</li>
                <li>Post on Portuguese Instagram hashtags (#portugueseslondres #lusolondon)</li>
                <li>Participate in Portuguese LinkedIn professional groups</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Content Discovery Optimization</h4>
          <ul>
            <li><strong>Portuguese SEO Keywords:</strong>
              <ul>
                <li>"Portugueses em Londres", "Comunidade Portuguesa Londres"</li>
                <li>"Fado Londres", "Comida Portuguesa Londres"</li>
                <li>"Trabalhar em Londres sendo português"</li>
                <li>"Estudar em Londres português"</li>
              </ul>
            </li>
            <li><strong>Cross-Platform Promotion:</strong>
              <ul>
                <li>YouTube: Portuguese vlogs and tutorials</li>
                <li>TikTok: Short Portuguese cultural content</li>
                <li>Instagram: Portuguese food and lifestyle posts</li>
                <li>LinkedIn: Portuguese professional content</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Community Building Techniques</h4>
          <ul>
            <li><strong>Regular Interaction Schedule:</strong>
              <ul>
                <li>Weekly Portuguese Q&A sessions</li>
                <li>Monthly community challenges (cooking, language, cultural)</li>
                <li>Seasonal Portuguese tradition explanations</li>
                <li>Regular viewer spotlight segments</li>
              </ul>
            </li>
            <li><strong>Portuguese Language Engagement:</strong>
              <ul>
                <li>Respond to comments in Portuguese</li>
                <li>Use Portuguese expressions and idioms naturally</li>
                <li>Incorporate different Portuguese regional dialects</li>
                <li>Switch between Portuguese and English based on audience preference</li>
              </ul>
            </li>
          </ul>
          
          <h3>Collaboration Network Building:</h3>
          
          <h4>Portuguese Streamer Network:</h4>
          <ul>
            <li><strong>Joint Streams:</strong> Cooking competitions, cultural discussions, gaming tournaments</li>
            <li><strong>Guest Appearances:</strong> Regular appearances on each other's streams</li>
            <li><strong>Community Projects:</strong> Collaborative Portuguese cultural documentation</li>
            <li><strong>Mutual Promotion:</strong> Cross-promote each other's content to expand reach</li>
          </ul>
          
          <h4>Portuguese Business Partnerships:</h4>
          <ul>
            <li><strong>Restaurant Partnerships:</strong> Live cooking shows from Portuguese restaurants</li>
            <li><strong>Cultural Organization Partnerships:</strong> Stream Portuguese cultural events</li>
            <li><strong>Portuguese Service Providers:</strong> Feature Portuguese lawyers, accountants, doctors</li>
            <li><strong>Portuguese Product Reviews:</strong> Portuguese food imports, cultural items</li>
          </ul>
          
          <h3>Audience Retention Strategies:</h3>
          
          <h4>Creating Portuguese Community Value:</h4>
          <ul>
            <li><strong>Practical Information:</strong> Visa updates, Brexit implications, travel information</li>
            <li><strong>Emotional Connection:</strong> Shared experiences of missing Portugal, cultural pride</li>
            <li><strong>Social Connection:</strong> Facilitate connections between community members</li>
            <li><strong>Cultural Preservation:</strong> Document and share Portuguese traditions</li>
          </ul>
          
          <h4>Consistency and Reliability:</h4>
          <ul>
            <li><strong>Regular Schedule:</strong> Same day/time each week for main content</li>
            <li><strong>Reliable Quality:</strong> Consistent audio/video quality in Portuguese</li>
            <li><strong>Community Updates:</strong> Regular updates on Portuguese community news</li>
            <li><strong>Responsive Engagement:</strong> Quick responses to community questions</li>
          </ul>
          
          <h3>Measuring Growth Success:</h3>
          
          <h4>Portuguese Community Metrics:</h4>
          <ul>
            <li><strong>Engagement Quality:</strong> Comments in Portuguese, cultural discussions</li>
            <li><strong>Community Building:</strong> Viewers connecting with each other</li>
            <li><strong>Cultural Impact:</strong> Preservation and sharing of Portuguese traditions</li>
            <li><strong>Professional Growth:</strong> Career opportunities created through community</li>
          </ul>
          
          <h4>Growth Milestones:</h4>
          <ul>
            <li><strong>Month 1:</strong> 50+ regular Portuguese viewers</li>
            <li><strong>Month 3:</strong> 200+ community members</li>
            <li><strong>Month 6:</strong> 500+ Portuguese audience, community partnerships</li>
            <li><strong>Year 1:</strong> 1000+ audience, established Portuguese cultural presence</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Construir uma audiência leal de falantes de português requer entender as necessidades únicas da comunidade da diáspora e criar conexões genuínas.</p>
          
          <h3>Entendendo a Sua Audiência Portuguesa em Londres:</h3>
          
          <h4>Segmentos de Audiência:</h4>
          <ul>
            <li><strong>Imigrantes Recentes (0-2 anos em Londres):</strong>
              <ul>
                <li>Necessidade: Orientação prática da vida em Londres, apoio linguístico</li>
                <li>Conteúdo: Guias como fazer, comparações culturais, integração comunitária</li>
                <li>Envolvimento: Responder em português, oferecer ajuda e conselhos diretos</li>
              </ul>
            </li>
            <li><strong>Profissionais Estabelecidos (2-10+ anos):</strong>
              <ul>
                <li>Necessidade: Avanço na carreira, manutenção cultural, networking</li>
                <li>Conteúdo: Desenvolvimento profissional, insights de negócios, eventos culturais</li>
                <li>Envolvimento: Discussões da indústria, oportunidades de networking</li>
              </ul>
            </li>
            <li><strong>Estudantes Portugueses:</strong>
              <ul>
                <li>Necessidade: Apoio académico, conexões sociais, vida com orçamento</li>
                <li>Conteúdo: Dicas de estudo, comida portuguesa acessível, comunidade estudantil</li>
                <li>Envolvimento: Grupos de estudo, apoio para exames, encontros sociais</li>
              </ul>
            </li>
            <li><strong>Segunda Geração Portuguesa (nascidos britânicos):</strong>
              <ul>
                <li>Necessidade: Conexão cultural, manutenção do idioma, orgulho de herança</li>
                <li>Conteúdo: Tradições portuguesas, lições de idioma, história cultural</li>
                <li>Envolvimento: Storytelling de herança, partilha de tradições familiares</li>
              </ul>
            </li>
          </ul>
          
          <h3>Estratégias de Crescimento Específicas para Comunidade Portuguesa:</h3>
          
          <h4>1. Abordagem de Integração Comunitária</h4>
          <ul>
            <li><strong>Eventos da Comunidade Portuguesa:</strong>
              <ul>
                <li>Transmitir ao vivo de festivais e eventos portugueses em Londres</li>
                <li>Cobrir celebrações religiosas portuguesas e encontros culturais</li>
                <li>Entrevistar líderes comunitários e proprietários de negócios portugueses</li>
                <li>Documentar marcos e conquistas da comunidade portuguesa</li>
              </ul>
            </li>
            <li><strong>Grupos de Redes Sociais Portuguesas:</strong>
              <ul>
                <li>Partilhar o seu conteúdo em grupos do Facebook "Portugueses em Londres"</li>
                <li>Envolver-se em grupos comunitários portugueses do WhatsApp</li>
                <li>Postar em hashtags portuguesas do Instagram (#portugueseslondres #lusolondon)</li>
                <li>Participar em grupos profissionais portugueses do LinkedIn</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Otimização de Descoberta de Conteúdo</h4>
          <ul>
            <li><strong>Palavras-chave SEO Portuguesas:</strong>
              <ul>
                <li>"Portugueses em Londres", "Comunidade Portuguesa Londres"</li>
                <li>"Fado Londres", "Comida Portuguesa Londres"</li>
                <li>"Trabalhar em Londres sendo português"</li>
                <li>"Estudar em Londres português"</li>
              </ul>
            </li>
            <li><strong>Promoção Cross-Platform:</strong>
              <ul>
                <li>YouTube: Vlogs e tutoriais portugueses</li>
                <li>TikTok: Conteúdo cultural português curto</li>
                <li>Instagram: Posts de comida e estilo de vida português</li>
                <li>LinkedIn: Conteúdo profissional português</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Técnicas de Construção de Comunidade</h4>
          <ul>
            <li><strong>Horário de Interação Regular:</strong>
              <ul>
                <li>Sessões semanais de Q&A português</li>
                <li>Desafios comunitários mensais (culinária, idioma, cultural)</li>
                <li>Explicações de tradições portuguesas sazonais</li>
                <li>Segmentos regulares de destaque do espectador</li>
              </ul>
            </li>
            <li><strong>Envolvimento em Língua Portuguesa:</strong>
              <ul>
                <li>Responder a comentários em português</li>
                <li>Usar expressões e idiomas portugueses naturalmente</li>
                <li>Incorporar diferentes dialetos regionais portugueses</li>
                <li>Alternar entre português e inglês baseado na preferência da audiência</li>
              </ul>
            </li>
          </ul>
          
          <h3>Construção de Rede de Colaboração:</h3>
          
          <h4>Rede de Streamers Portugueses:</h4>
          <ul>
            <li><strong>Streams Conjuntos:</strong> Competições de culinária, discussões culturais, torneios de gaming</li>
            <li><strong>Aparições Convidadas:</strong> Aparições regulares nos streams uns dos outros</li>
            <li><strong>Projetos Comunitários:</strong> Documentação cultural portuguesa colaborativa</li>
            <li><strong>Promoção Mútua:</strong> Promover o conteúdo uns dos outros para expandir alcance</li>
          </ul>
          
          <h4>Parcerias de Negócios Portugueses:</h4>
          <ul>
            <li><strong>Parcerias de Restaurantes:</strong> Shows de culinária ao vivo de restaurantes portugueses</li>
            <li><strong>Parcerias de Organizações Culturais:</strong> Transmitir eventos culturais portugueses</li>
            <li><strong>Prestadores de Serviços Portugueses:</strong> Destacar advogados, contabilistas, médicos portugueses</li>
            <li><strong>Reviews de Produtos Portugueses:</strong> Importações de comida portuguesa, itens culturais</li>
          </ul>
          
          <h3>Estratégias de Retenção de Audiência:</h3>
          
          <h4>Criando Valor da Comunidade Portuguesa:</h4>
          <ul>
            <li><strong>Informação Prática:</strong> Atualizações de visto, implicações do Brexit, informações de viagem</li>
            <li><strong>Conexão Emocional:</strong> Experiências partilhadas de sentir falta de Portugal, orgulho cultural</li>
            <li><strong>Conexão Social:</strong> Facilitar conexões entre membros da comunidade</li>
            <li><strong>Preservação Cultural:</strong> Documentar e partilhar tradições portuguesas</li>
          </ul>
          
          <h4>Consistência e Confiabilidade:</h4>
          <ul>
            <li><strong>Horário Regular:</strong> Mesmo dia/hora cada semana para conteúdo principal</li>
            <li><strong>Qualidade Confiável:</strong> Qualidade de áudio/vídeo consistente em português</li>
            <li><strong>Atualizações da Comunidade:</strong> Atualizações regulares sobre notícias da comunidade portuguesa</li>
            <li><strong>Envolvimento Responsivo:</strong> Respostas rápidas a questões da comunidade</li>
          </ul>
          
          <h3>Medindo Sucesso de Crescimento:</h3>
          
          <h4>Métricas da Comunidade Portuguesa:</h4>
          <ul>
            <li><strong>Qualidade de Envolvimento:</strong> Comentários em português, discussões culturais</li>
            <li><strong>Construção de Comunidade:</strong> Espectadores conectando-se uns com os outros</li>
            <li><strong>Impacto Cultural:</strong> Preservação e partilha de tradições portuguesas</li>
            <li><strong>Crescimento Profissional:</strong> Oportunidades de carreira criadas através da comunidade</li>
          </ul>
          
          <h4>Marcos de Crescimento:</h4>
          <ul>
            <li><strong>Mês 1:</strong> 50+ espectadores portugueses regulares</li>
            <li><strong>Mês 3:</strong> 200+ membros da comunidade</li>
            <li><strong>Mês 6:</strong> 500+ audiência portuguesa, parcerias comunitárias</li>
            <li><strong>Ano 1:</strong> 1000+ audiência, presença cultural portuguesa estabelecida</li>
          </ul>
        `
      },
      {
        id: 'monetization-revenue',
        title: 'Monetization and Revenue Strategies',
        titlePortuguese: 'Estratégias de Monetização e Receita',
        type: 'tutorial',
        estimatedTime: 5,
        content: `
          <p>LusoTown offers multiple revenue streams for Portuguese streamers, with industry-leading 85/15 revenue sharing that lets you keep most of what you earn.</p>
          
          <h3>LusoTown Revenue Sharing Program (85/15 Split):</h3>
          
          <h4>How It Works:</h4>
          <ul>
            <li><strong>You Keep 85%:</strong> Of all revenue generated from your content</li>
            <li><strong>Platform Takes 15%:</strong> Covers hosting, payment processing, platform development</li>
            <li><strong>Monthly Payouts:</strong> Direct bank transfer on the 15th of each month</li>
            <li><strong>Multi-Currency Support:</strong> Payments in GBP, EUR, or BRL based on your preference</li>
          </ul>
          
          <h3>Revenue Streams Available:</h3>
          
          <h4>1. Subscription Revenue (Primary Income)</h4>
          <ul>
            <li><strong>Monthly Subscriptions:</strong> £2.99-£9.99/month based on your tier</li>
            <li><strong>Annual Subscriptions:</strong> 15% discount for yearly payments</li>
            <li><strong>Subscriber Benefits:</strong> Ad-free viewing, exclusive content, Portuguese emotes</li>
            <li><strong>Portuguese Community Focus:</strong> Market to Portuguese speakers specifically</li>
          </ul>
          
          <h4>2. Live Stream Donations (Secondary Income)</h4>
          <ul>
            <li><strong>Real-time Tips:</strong> Viewers can tip during live streams</li>
            <li><strong>Portuguese Cultural Messages:</strong> Custom donation messages in Portuguese</li>
            <li><strong>Goal Setting:</strong> Set funding goals for equipment, events, cultural projects</li>
            <li><strong>Special Recognition:</strong> Highlight donors during streams</li>
          </ul>
          
          <h4>3. Portuguese Cultural Merchandise</h4>
          <ul>
            <li><strong>Branded Portuguese Items:</strong> T-shirts with Portuguese sayings, cultural designs</li>
            <li><strong>Food Products:</strong> Portuguese recipe books, spice sets, cooking tools</li>
            <li><strong>Cultural Accessories:</strong> Portuguese flag items, traditional crafts</li>
            <li><strong>Educational Materials:</strong> Portuguese language learning resources</li>
          </ul>
          
          <h4>4. Sponsored Content & Partnerships</h4>
          <ul>
            <li><strong>Portuguese Business Partnerships:</strong> Restaurants, shops, services in London</li>
            <li><strong>Cultural Event Sponsorships:</strong> Portuguese festivals, concerts, community events</li>
            <li><strong>Product Reviews:</strong> Portuguese food imports, cultural products</li>
            <li><strong>Service Promotions:</strong> Portuguese travel agencies, legal services, education</li>
          </ul>
          
          <h4>5. Educational Content & Courses</h4>
          <ul>
            <li><strong>Portuguese Language Courses:</strong> For diaspora children or British learners</li>
            <li><strong>Cultural Education:</strong> Portuguese history, traditions, customs</li>
            <li><strong>Professional Development:</strong> Business skills for Portuguese professionals</li>
            <li><strong>Cooking Classes:</strong> Traditional Portuguese cuisine tutorials</li>
          </ul>
          
          <h3>Pricing Strategies for Portuguese Audience:</h3>
          
          <h4>Subscription Tier Recommendations:</h4>
          <ul>
            <li><strong>Basic Tier (£2.99/month):</strong>
              <ul>
                <li>Ad-free viewing</li>
                <li>Portuguese chat emotes</li>
                <li>Community access</li>
              </ul>
            </li>
            <li><strong>Premium Tier (£5.99/month):</strong>
              <ul>
                <li>Exclusive Portuguese cultural content</li>
                <li>Monthly virtual meetups</li>
                <li>Recipe sharing access</li>
                <li>Early access to new content</li>
              </ul>
            </li>
            <li><strong>VIP Tier (£9.99/month):</strong>
              <ul>
                <li>One-on-one Portuguese cultural consultations</li>
                <li>Custom content requests</li>
                <li>Priority support in Portuguese</li>
                <li>Exclusive Portuguese community events</li>
              </ul>
            </li>
          </ul>
          
          <h3>Revenue Optimization Strategies:</h3>
          
          <h4>Portuguese Community Marketing:</h4>
          <ul>
            <li><strong>Cultural Value Proposition:</strong> "Support Portuguese culture preservation in London"</li>
            <li><strong>Community Building:</strong> "Join exclusive Portuguese community"</li>
            <li><strong>Language Maintenance:</strong> "Help your children maintain Portuguese"</li>
            <li><strong>Professional Networking:</strong> "Connect with Portuguese professionals"</li>
          </ul>
          
          <h4>Content Strategy for Revenue:</h4>
          <ul>
            <li><strong>Free Content (60%):</strong> Build audience with valuable free content</li>
            <li><strong>Premium Content (30%):</strong> Exclusive cultural insights, detailed tutorials</li>
            <li><strong>VIP Content (10%):</strong> Personal consultations, custom cultural education</li>
          </ul>
          
          <h3>Financial Planning for Portuguese Creators:</h3>
          
          <h4>Revenue Milestones:</h4>
          <ul>
            <li><strong>Month 1-3:</strong> £50-200/month (building initial audience)</li>
            <li><strong>Month 4-6:</strong> £200-500/month (growing subscription base)</li>
            <li><strong>Month 7-12:</strong> £500-1,500/month (established creator with partnerships)</li>
            <li><strong>Year 2+:</strong> £1,500-5,000/month (successful Portuguese cultural creator)</li>
          </ul>
          
          <h4>Tax Considerations (UK):</h4>
          <ul>
            <li><strong>Self-Employment Registration:</strong> Register as self-employed with HMRC</li>
            <li><strong>VAT Registration:</strong> Required if earning over £85,000/year</li>
            <li><strong>Expense Tracking:</strong> Equipment, internet, studio space can be deducted</li>
            <li><strong>Portuguese Tax Implications:</strong> Understand double taxation agreements</li>
          </ul>
          
          <h3>Success Tips for Portuguese Creators:</h3>
          
          <h4>Community-First Approach:</h4>
          <ul>
            <li><strong>Authentic Value:</strong> Focus on genuine Portuguese cultural value</li>
            <li><strong>Community Investment:</strong> Reinvest earnings into better equipment and content</li>
            <li><strong>Long-term Vision:</strong> Build sustainable Portuguese cultural presence</li>
            <li><strong>Collaboration:</strong> Work with other Portuguese creators to grow together</li>
          </ul>
          
          <h4>Revenue Diversification:</h4>
          <ul>
            <li><strong>Multiple Streams:</strong> Don't rely on just one revenue source</li>
            <li><strong>Seasonal Content:</strong> Capitalize on Portuguese holidays and events</li>
            <li><strong>Cross-Platform Revenue:</strong> YouTube ad revenue, TikTok creator fund</li>
            <li><strong>Offline Opportunities:</strong> Portuguese cultural workshops, events</li>
          </ul>
        `,
        contentPortuguese: `
          <p>A LusoTown oferece múltiplas fontes de receita para criadores de conteúdo portugueses, com taxas de partilha de receitas líderes da indústria.</p>
          
          <h3>Programa de Partilha de Receitas da LusoTown (85/15 Divisão):</h3>
          
          <h4>Como Funciona:</h4>
          <ul>
            <li><strong>Você Fica com 85%:</strong> De toda a receita gerada do seu conteúdo</li>
            <li><strong>Plataforma Fica com 15%:</strong> Cobre hospedagem, processamento de pagamentos, desenvolvimento da plataforma</li>
            <li><strong>Pagamentos Mensais:</strong> Transferência bancária direta no dia 15 de cada mês</li>
            <li><strong>Suporte Multi-Moeda:</strong> Pagamentos em GBP, EUR ou BRL baseado na sua preferência</li>
          </ul>
          
          <h3>Fontes de Receita Disponíveis:</h3>
          
          <h4>1. Receita de Subscrição (Receita Primária)</h4>
          <ul>
            <li><strong>Subscrições Mensais:</strong> £2.99-£9.99/mês baseado no seu nível</li>
            <li><strong>Subscrições Anuais:</strong> 15% desconto para pagamentos anuais</li>
            <li><strong>Benefícios de Subscritor:</strong> Visualização sem anúncios, conteúdo exclusivo, emotes portugueses</li>
            <li><strong>Foco na Comunidade Portuguesa:</strong> Marketing para falantes de português especificamente</li>
          </ul>
          
          <h4>2. Doações de Live Stream (Receita Secundária)</h4>
          <ul>
            <li><strong>Tips em Tempo Real:</strong> Espectadores podem dar tips durante streams ao vivo</li>
            <li><strong>Mensagens Culturais Portuguesas:</strong> Mensagens de doação personalizadas em português</li>
            <li><strong>Definição de Objetivos:</strong> Definir objetivos de financiamento para equipamento, eventos, projetos culturais</li>
            <li><strong>Reconhecimento Especial:</strong> Destacar doadores durante streams</li>
          </ul>
          
          <h4>3. Merchandising Cultural Português</h4>
          <ul>
            <li><strong>Itens Portugueses de Marca:</strong> T-shirts com ditados portugueses, designs culturais</li>
            <li><strong>Produtos Alimentares:</strong> Livros de receitas portuguesas, conjuntos de especiarias, ferramentas de culinária</li>
            <li><strong>Acessórios Culturais:</strong> Itens com bandeira portuguesa, artesanato tradicional</li>
            <li><strong>Materiais Educacionais:</strong> Recursos de aprendizagem da língua portuguesa</li>
          </ul>
          
          <h4>4. Conteúdo Patrocinado e Parcerias</h4>
          <ul>
            <li><strong>Parcerias de Negócios Portugueses:</strong> Restaurantes, lojas, serviços em Londres</li>
            <li><strong>Patrocínios de Eventos Culturais:</strong> Festivais portugueses, concertos, eventos comunitários</li>
            <li><strong>Reviews de Produtos:</strong> Importações de comida portuguesa, produtos culturais</li>
            <li><strong>Promoções de Serviços:</strong> Agências de viagem portuguesas, serviços legais, educação</li>
          </ul>
          
          <h4>5. Conteúdo Educacional e Cursos</h4>
          <ul>
            <li><strong>Cursos de Língua Portuguesa:</strong> Para filhos da diáspora ou aprendizes britânicos</li>
            <li><strong>Educação Cultural:</strong> História, tradições, costumes portugueses</li>
            <li><strong>Desenvolvimento Profissional:</strong> Habilidades de negócios para profissionais portugueses</li>
            <li><strong>Aulas de Culinária:</strong> Tutoriais de culinária tradicional portuguesa</li>
          </ul>
          
          <h3>Estratégias de Preços para Audiência Portuguesa:</h3>
          
          <h4>Recomendações de Níveis de Subscrição:</h4>
          <ul>
            <li><strong>Nível Básico (£2.99/mês):</strong>
              <ul>
                <li>Visualização sem anúncios</li>
                <li>Emotes de chat portugueses</li>
                <li>Acesso à comunidade</li>
              </ul>
            </li>
            <li><strong>Nível Premium (£5.99/mês):</strong>
              <ul>
                <li>Conteúdo cultural português exclusivo</li>
                <li>Encontros virtuais mensais</li>
                <li>Acesso a partilha de receitas</li>
                <li>Acesso antecipado a novo conteúdo</li>
              </ul>
            </li>
            <li><strong>Nível VIP (£9.99/mês):</strong>
              <ul>
                <li>Consultas culturais portuguesas individuais</li>
                <li>Pedidos de conteúdo personalizado</li>
                <li>Apoio prioritário em português</li>
                <li>Eventos exclusivos da comunidade portuguesa</li>
              </ul>
            </li>
          </ul>
          
          <h3>Estratégias de Otimização de Receita:</h3>
          
          <h4>Marketing da Comunidade Portuguesa:</h4>
          <ul>
            <li><strong>Proposta de Valor Cultural:</strong> "Apoie a preservação da cultura portuguesa em Londres"</li>
            <li><strong>Construção de Comunidade:</strong> "Junte-se à comunidade portuguesa exclusiva"</li>
            <li><strong>Manutenção do Idioma:</strong> "Ajude os seus filhos a manter o português"</li>
            <li><strong>Networking Profissional:</strong> "Conecte-se com profissionais portugueses"</li>
          </ul>
          
          <h4>Estratégia de Conteúdo para Receita:</h4>
          <ul>
            <li><strong>Conteúdo Gratuito (60%):</strong> Construir audiência com conteúdo gratuito valioso</li>
            <li><strong>Conteúdo Premium (30%):</strong> Insights culturais exclusivos, tutoriais detalhados</li>
            <li><strong>Conteúdo VIP (10%):</strong> Consultas pessoais, educação cultural personalizada</li>
          </ul>
          
          <h3>Planeamento Financeiro para Criadores Portugueses:</h3>
          
          <h4>Marcos de Receita:</h4>
          <ul>
            <li><strong>Mês 1-3:</strong> £50-200/mês (construindo audiência inicial)</li>
            <li><strong>Mês 4-6:</strong> £200-500/mês (crescendo base de subscrição)</li>
            <li><strong>Mês 7-12:</strong> £500-1,500/mês (criador estabelecido com parcerias)</li>
            <li><strong>Ano 2+:</strong> £1,500-5,000/mês (criador cultural português bem-sucedido)</li>
          </ul>
          
          <h4>Considerações Fiscais (Reino Unido):</h4>
          <ul>
            <li><strong>Registo de Trabalho Independente:</strong> Registar como trabalhador independente com HMRC</li>
            <li><strong>Registo de IVA:</strong> Necessário se ganhar mais de £85,000/ano</li>
            <li><strong>Acompanhamento de Despesas:</strong> Equipamento, internet, espaço de estúdio podem ser deduzidos</li>
            <li><strong>Implicações Fiscais Portuguesas:</strong> Entender acordos de dupla tributação</li>
          </ul>
          
          <h3>Dicas de Sucesso para Criadores Portugueses:</h3>
          
          <h4>Abordagem Comunidade-Primeiro:</h4>
          <ul>
            <li><strong>Valor Autêntico:</strong> Foque em valor cultural português genuíno</li>
            <li><strong>Investimento na Comunidade:</strong> Reinvestir ganhos em melhor equipamento e conteúdo</li>
            <li><strong>Visão de Longo Prazo:</strong> Construir presença cultural portuguesa sustentável</li>
            <li><strong>Colaboração:</strong> Trabalhar com outros criadores portugueses para crescer juntos</li>
          </ul>
          
          <h4>Diversificação de Receita:</h4>
          <ul>
            <li><strong>Múltiplas Fontes:</strong> Não depender apenas de uma fonte de receita</li>
            <li><strong>Conteúdo Sazonal:</strong> Capitalizar feriados e eventos portugueses</li>
            <li><strong>Receita Cross-Platform:</strong> Receita de anúncios do YouTube, fundo de criador do TikTok</li>
            <li><strong>Oportunidades Offline:</strong> Workshops culturais portugueses, eventos</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Set up payment information for revenue sharing', textPortuguese: 'Configurar informações de pagamento para partilha de receitas' },
              { text: 'Plan subscription tier pricing strategy', textPortuguese: 'Planear estratégia de preços de níveis de subscrição' },
              { text: 'Research Portuguese business partnership opportunities', textPortuguese: 'Pesquisar oportunidades de parceria de negócios portugueses' },
              { text: 'Register as self-employed with HMRC if needed', textPortuguese: 'Registar como trabalhador independente com HMRC se necessário' },
              { text: 'Create revenue tracking spreadsheet', textPortuguese: 'Criar folha de cálculo de acompanhamento de receitas' }
            ]
          }
        },
        tips: [
          'Start with lower subscription prices to build initial audience',
          'Focus on providing genuine value before monetizing heavily',
          'Keep detailed records of all income and expenses for tax purposes',
          'Consider offering annual subscription discounts to improve cash flow'
        ],
        tipsPortuguese: [
          'Comece com preços de subscrição mais baixos para construir audiência inicial',
          'Foque em fornecer valor genuíno antes de monetizar pesadamente',
          'Mantenha registos detalhados de toda a receita e despesas para propósitos fiscais',
          'Considere oferecer descontos de subscrição anual para melhorar fluxo de caixa'
        ]
      }
    ],
    practicalExercises: [],
    resources: [
      {
        title: 'Streaming Equipment Buying Guide',
        titlePortuguese: 'Guia de Compra de Equipamento de Streaming',
        url: '/guides/streaming-equipment-guide',
        type: 'guide'
      },
      {
        title: 'Portuguese Cultural Content Calendar',
        titlePortuguese: 'Calendário de Conteúdo Cultural Português',
        url: '/downloads/portuguese-cultural-calendar.pdf',
        type: 'download'
      },
      {
        title: 'OBS Studio Setup Tutorial',
        titlePortuguese: 'Tutorial de Configuração OBS Studio',
        url: EXTERNAL_SERVICES.obsHelp,
        type: 'external'
      }
    ]
  };

  return (
    <LearningModuleFramework
      module={liveStreamingModule}
      onComplete={handleModuleComplete}
      onStepComplete={handleStepComplete}
      completedSteps={completedSteps}
      showProgress={true}
    />
  );
}