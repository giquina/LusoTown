"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  FlagIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  BellIcon,
  StarIcon,
  EyeIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import LearningModuleFramework, {
  LearningModule,
} from "../../../components/academy/LearningModuleFramework";
// Local page uses component-defined LearningModule type

const communityForumsModule = {
  id: "community-forums",
  title: "Community Forums",
  titlePortuguese: "Fóruns da Comunidade",
  description:
    "Navigate and contribute to Portuguese-speaking community discussions with confidence and cultural awareness",
  descriptionPortuguese:
    "Navegue e contribua para discussões da comunidade de falantes de português com confiança e consciência cultural",
  difficulty: "Beginner",
  estimatedTime: 22,
  category: "community",
  categoryPortuguese: "comunidade",
  icon: ChatBubbleLeftRightIcon,
  prerequisites: [],
  prerequisitesPortuguese: [],
  learningObjectives: [],
  learningObjectivesPortuguese: [],
  practicalExercises: [],
  resources: [],
  steps: [
    {
      id: "forum-navigation",
      title: "Understanding LusoTown Forums",
      titlePortuguese: "Compreender os Fóruns da LusoTown",
      content: `
        <p>LusoTown's community forums are the heart of our Portuguese-speaking community in London. Learn how to navigate, search, and participate in meaningful discussions that celebrate our shared heritage while respecting diverse perspectives.</p>
        
        <h4>Forum Categories</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <UserGroupIcon class="h-4 w-4" />
              Community Life
            </h5>
            <p class="text-sm text-blue-700">Daily life, local recommendations, neighborhood discussions</p>
            <ul class="text-xs text-blue-600 mt-2 list-disc list-inside">
              <li>Housing and accommodation</li>
              <li>Local services and recommendations</li>
              <li>Cultural adaptation experiences</li>
            </ul>
          </div>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <PencilSquareIcon class="h-4 w-4" />
              Professional Network
            </h5>
            <p class="text-sm text-green-700">Career advice, job opportunities, business networking</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>Job market insights</li>
              <li>Professional development</li>
              <li>Business opportunities</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800 flex items-center gap-2">
              <HeartIcon class="h-4 w-4" />
              Cultural Heritage
            </h5>
            <p class="text-sm text-purple-700">Portuguese traditions, festivals, cultural discussions</p>
            <ul class="text-xs text-purple-600 mt-2 list-disc list-inside">
              <li>Traditional celebrations</li>
              <li>Language preservation</li>
              <li>Cultural exchange stories</li>
            </ul>
          </div>
          
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800 flex items-center gap-2">
              <BellIcon class="h-4 w-4" />
              Events & Meetups
            </h5>
            <p class="text-sm text-orange-700">Community events, meetup coordination, social gatherings</p>
            <ul class="text-xs text-orange-600 mt-2 list-disc list-inside">
              <li>Event announcements</li>
              <li>Meetup organization</li>
              <li>Photo sharing from events</li>
            </ul>
          </div>
        </div>
        
        <h4>Navigation Features</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Search Function:</strong> Find discussions by keywords, topics, or Portuguese phrases</li>
          <li><strong>Tag System:</strong> Filter by location (Stockwell, Camden, Vauxhall), topic, or urgency</li>
          <li><strong>Trending Discussions:</strong> See what the community is actively discussing</li>
          <li><strong>Bilingual Support:</strong> Switch between Portuguese and English seamlessly</li>
          <li><strong>Notification Settings:</strong> Stay updated on topics that matter to you</li>
        </ul>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
          <p><strong>Getting Started Tip:</strong> Begin by browsing the "New Members" section where fellow Portuguese speakers share their first experiences in London. It's a welcoming space to introduce yourself and ask initial questions.</p>
        </div>
      `,
      contentPortuguese: `
        <p>Os fóruns comunitários da LusoTown são o coração da nossa comunidade de língua portuguesa em Londres. Aprenda a navegar, pesquisar e participar em discussões significativas que celebram a nossa herança partilhada respeitando perspetivas diversas.</p>
        
        <h4>Categorias do Fórum</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <UserGroupIcon class="h-4 w-4" />
              Vida Comunitária
            </h5>
            <p class="text-sm text-blue-700">Vida quotidiana, recomendações locais, discussões de bairro</p>
            <ul class="text-xs text-blue-600 mt-2 list-disc list-inside">
              <li>Habitação e alojamento</li>
              <li>Serviços locais e recomendações</li>
              <li>Experiências de adaptação cultural</li>
            </ul>
          </div>
          
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <PencilSquareIcon class="h-4 w-4" />
              Rede Profissional
            </h5>
            <p class="text-sm text-green-700">Conselhos de carreira, oportunidades de emprego, networking empresarial</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>Insights do mercado de trabalho</li>
              <li>Desenvolvimento profissional</li>
              <li>Oportunidades de negócio</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800 flex items-center gap-2">
              <HeartIcon class="h-4 w-4" />
              Herança Cultural
            </h5>
            <p class="text-sm text-purple-700">Tradições portuguesas, festivais, discussões culturais</p>
            <ul class="text-xs text-purple-600 mt-2 list-disc list-inside">
              <li>Celebrações tradicionais</li>
              <li>Preservação da língua</li>
              <li>Histórias de intercâmbio cultural</li>
            </ul>
          </div>
          
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800 flex items-center gap-2">
              <BellIcon class="h-4 w-4" />
              Eventos e Encontros
            </h5>
            <p class="text-sm text-orange-700">Eventos comunitários, coordenação de encontros, reuniões sociais</p>
            <ul class="text-xs text-orange-600 mt-2 list-disc list-inside">
              <li>Anúncios de eventos</li>
              <li>Organização de encontros</li>
              <li>Partilha de fotos de eventos</li>
            </ul>
          </div>
        </div>
        
        <h4>Funcionalidades de Navegação</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Função de Pesquisa:</strong> Encontre discussões por palavras-chave, tópicos ou frases portuguesas</li>
          <li><strong>Sistema de Tags:</strong> Filtre por localização (Stockwell, Camden, Vauxhall), tópico ou urgência</li>
          <li><strong>Discussões em Tendência:</strong> Veja o que a comunidade está a discutir ativamente</li>
          <li><strong>Apoio Bilingue:</strong> Alterne entre português e inglês facilmente</li>
          <li><strong>Configurações de Notificações:</strong> Mantenha-se atualizado sobre tópicos que lhe interessam</li>
        </ul>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
          <p><strong>Dica para Começar:</strong> Comece por navegar na secção "Novos Membros" onde outros falantes de português partilham as suas primeiras experiências em Londres. É um espaço acolhedor para se apresentar e fazer perguntas iniciais.</p>
        </div>
      `,
      icon: MagnifyingGlassIcon,
      estimatedTime: 6,
      interactiveElements: [
        {
          type: "checklist",
          title: "Forum Navigation Checklist",
          titlePortuguese: "Lista de Verificação de Navegação do Fórum",
          items: [
            {
              text: "Explore all four main forum categories",
              textPortuguese:
                "Explorar todas as quatro categorias principais do fórum",
            },
            {
              text: "Set up notification preferences for relevant topics",
              textPortuguese:
                "Configurar preferências de notificação para tópicos relevantes",
            },
            {
              text: 'Introduce yourself in the "New Members" section',
              textPortuguese: 'Apresentar-se na secção "Novos Membros"',
            },
            {
              text: "Practice using search and tag filtering features",
              textPortuguese:
                "Praticar o uso de pesquisa e funcionalidades de filtragem por tags",
            },
          ],
        },
      ],
    },
    {
      id: "posting-guidelines",
      title: "Community Posting Guidelines",
      titlePortuguese: "Diretrizes de Publicação da Comunidade",
      content: `
        <p>Create meaningful, respectful posts that contribute to our vibrant Portuguese-speaking community. Learn the cultural norms and best practices that make LusoTown forums a welcoming space for all Portuguese speakers.</p>
        
        <h4>Cultural Communication Style</h4>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
          <h5 class="font-semibold text-blue-800">Portuguese Communication Values</h5>
          <ul class="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
            <li><strong>Warmth & Hospitality:</strong> Begin posts with friendly greetings like "Olá pessoal" or "Hello everyone"</li>
            <li><strong>Respect for Hierarchy:</strong> Address experienced community members with appropriate courtesy</li>
            <li><strong>Family & Community Focus:</strong> Share personal context when relevant to your questions</li>
            <li><strong>Indirect Communication:</strong> Frame requests politely rather than demanding immediate answers</li>
            <li><strong>Cultural Sensitivity:</strong> Acknowledge diverse Portuguese-speaking backgrounds (Portugal, Brazil, Africa)</li>
          </ul>
        </div>
        
        <h4>Post Structure Best Practices</h4>
        <div class="space-y-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800">Clear Subject Lines</h5>
            <p class="text-sm text-green-700 mt-2">Examples of effective subject lines:</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>"Procuro médico que fale português em Camden" (Looking for Portuguese-speaking doctor in Camden)</li>
              <li>"Recomendações: melhor padaria portuguesa em Stockwell?" (Recommendations: best Portuguese bakery in Stockwell?)</li>
              <li>"Ajuda com documentos - experiência de outros portugueses" (Help with documents - other Portuguese experiences)</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800">Detailed Context</h5>
            <p class="text-sm text-purple-700 mt-2">Provide helpful background information:</p>
            <ul class="text-xs text-purple-600 mt-2 list-disc list-inside">
              <li>Your location in London (area/borough)</li>
              <li>Timeline for your question (urgent vs. general inquiry)</li>
              <li>Previous steps you've already taken</li>
              <li>Specific preferences or requirements</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 class="font-semibold text-yellow-800">Engagement Encouragement</h5>
            <p class="text-sm text-yellow-700 mt-2">End posts with questions that invite community participation:</p>
            <ul class="text-xs text-yellow-600 mt-2 list-disc list-inside">
              <li>"Alguém teve experiência similar?" (Anyone had similar experience?)</li>
              <li>"Que acham? Aceito todas as sugestões!" (What do you think? I welcome all suggestions!)</li>
              <li>"Obrigado/a desde já pela ajuda!" (Thanks in advance for the help!)</li>
            </ul>
          </div>
        </div>
        
        <h4>Content Guidelines</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Language Choice:</strong> Post in Portuguese, English, or both - community members are multilingual</li>
          <li><strong>Local Relevance:</strong> Focus on London and UK-specific content and experiences</li>
          <li><strong>Constructive Tone:</strong> Even when discussing challenges, maintain hope and community spirit</li>
          <li><strong>Privacy Awareness:</strong> Avoid sharing personal details like full addresses or phone numbers publicly</li>
          <li><strong>Photo Sharing:</strong> Include relevant photos when helpful (restaurants, locations, documents needing translation)</li>
        </ul>
        
        <div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
          <p><strong>Cultural Tip:</strong> Portuguese communication often includes personal context. Don't hesitate to mention if you're new to London, missing home, or celebrating a Portuguese holiday - this builds authentic community connections.</p>
        </div>
      `,
      contentPortuguese: `
        <p>Crie publicações significativas e respeitosas que contribuam para a nossa vibrante comunidade de falantes de português. Aprenda as normas culturais e melhores práticas que fazem dos fóruns da LusoTown um espaço acolhedor para todos os falantes de português.</p>
        
        <h4>Estilo de Comunicação Cultural</h4>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
          <h5 class="font-semibold text-blue-800">Valores de Comunicação Portuguesa</h5>
          <ul class="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
            <li><strong>Calor e Hospitalidade:</strong> Comece as publicações com saudações amigáveis como "Olá pessoal" ou "Hello everyone"</li>
            <li><strong>Respeito pela Hierarquia:</strong> Dirija-se a membros experientes da comunidade com cortesia apropriada</li>
            <li><strong>Foco na Família e Comunidade:</strong> Partilhe contexto pessoal quando relevante para as suas perguntas</li>
            <li><strong>Comunicação Indireta:</strong> Formule pedidos educadamente em vez de exigir respostas imediatas</li>
            <li><strong>Sensibilidade Cultural:</strong> Reconheça backgrounds diversos de falantes de português (Portugal, Brasil, África)</li>
          </ul>
        </div>
        
        <h4>Melhores Práticas de Estrutura de Publicação</h4>
        <div class="space-y-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800">Linhas de Assunto Claras</h5>
            <p class="text-sm text-green-700 mt-2">Exemplos de linhas de assunto eficazes:</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>"Procuro médico que fale português em Camden"</li>
              <li>"Recomendações: melhor padaria portuguesa em Stockwell?"</li>
              <li>"Ajuda com documentos - experiência de outros portugueses"</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800">Contexto Detalhado</h5>
            <p class="text-sm text-purple-700 mt-2">Forneça informações de background úteis:</p>
            <ul class="text-xs text-purple-600 mt-2 list-disc list-inside">
              <li>A sua localização em Londres (área/borough)</li>
              <li>Cronograma para a sua pergunta (urgente vs. consulta geral)</li>
              <li>Passos anteriores que já tomou</li>
              <li>Preferências ou requisitos específicos</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 class="font-semibold text-yellow-800">Encorajamento ao Envolvimento</h5>
            <p class="text-sm text-yellow-700 mt-2">Termine as publicações com perguntas que convidem à participação da comunidade:</p>
            <ul class="text-xs text-yellow-600 mt-2 list-disc list-inside">
              <li>"Alguém teve experiência similar?"</li>
              <li>"Que acham? Aceito todas as sugestões!"</li>
              <li>"Obrigado/a desde já pela ajuda!"</li>
            </ul>
          </div>
        </div>
        
        <h4>Diretrizes de Conteúdo</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Escolha de Idioma:</strong> Publique em português, inglês, ou ambos - os membros da comunidade são multilingues</li>
          <li><strong>Relevância Local:</strong> Foque em conteúdo e experiências específicas de Londres e do Reino Unido</li>
          <li><strong>Tom Construtivo:</strong> Mesmo ao discutir desafios, mantenha esperança e espírito comunitário</li>
          <li><strong>Consciência de Privacidade:</strong> Evite partilhar detalhes pessoais como endereços completos ou números de telefone publicamente</li>
          <li><strong>Partilha de Fotos:</strong> Inclua fotos relevantes quando úteis (restaurantes, localizações, documentos precisando tradução)</li>
        </ul>
        
        <div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
          <p><strong>Dica Cultural:</strong> A comunicação portuguesa frequentemente inclui contexto pessoal. Não hesite em mencionar se é novo em Londres, sente saudades de casa, ou está celebrando um feriado português - isto constrói conexões comunitárias autênticas.</p>
        </div>
      `,
      icon: PencilSquareIcon,
      estimatedTime: 7,
      interactiveElements: [
        {
          type: "decision-tree",
          title: "Choose Your Post Type",
          titlePortuguese: "Escolha o Seu Tipo de Publicação",
          question: "What type of post do you want to create?",
          questionPortuguese: "Que tipo de publicação quer criar?",
          options: [
            {
              text: "Asking for help or recommendations",
              textPortuguese: "Pedir ajuda ou recomendações",
              result:
                "Use clear subject line, provide location/context, and ask specific questions. End with gratitude.",
              resultPortuguese:
                "Use linha de assunto clara, forneça localização/contexto, e faça perguntas específicas. Termine com gratidão.",
            },
            {
              text: "Sharing an experience or recommendation",
              textPortuguese: "Partilhar uma experiência ou recomendação",
              result:
                "Start with location/context, share detailed experience, and invite others to ask questions.",
              resultPortuguese:
                "Comece com localização/contexto, partilhe experiência detalhada, e convide outros a fazer perguntas.",
            },
            {
              text: "Organizing a meetup or event",
              textPortuguese: "Organizar um encontro ou evento",
              result:
                "Include clear date, time, location, and how to RSVP. Explain the Portuguese cultural element.",
              resultPortuguese:
                "Inclua data, hora, localização clara, e como confirmar presença. Explique o elemento cultural português.",
            },
          ],
        },
      ],
    },
    {
      id: "community-safety",
      title: "Safety & Moderation Standards",
      titlePortuguese: "Segurança e Padrões de Moderação",
      content: `
        <p>LusoTown forums maintain high safety standards while preserving the warmth and openness of Portuguese-speaking community culture. Learn how our moderation works and how to contribute to a safe, welcoming environment.</p>
        
        <h4>Community Safety Features</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <ShieldCheckIcon class="h-4 w-4" />
              Verified Profiles
            </h5>
            <p class="text-sm text-green-700">Members can verify their identity through:</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>Portuguese passport or ID verification</li>
              <li>UK address confirmation</li>
              <li>University or workplace verification</li>
              <li>Community member referrals</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <EyeIcon class="h-4 w-4" />
              Community Moderation
            </h5>
            <p class="text-sm text-blue-700">Trusted community members help moderate:</p>
            <ul class="text-xs text-blue-600 mt-2 list-disc list-inside">
              <li>Experienced Portuguese residents as moderators</li>
              <li>Cultural sensitivity in moderation decisions</li>
              <li>Quick response to community concerns</li>
              <li>Transparent moderation policies</li>
            </ul>
          </div>
        </div>
        
        <h4>Reporting & Safety Tools</h4>
        <div class="space-y-4">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h5 class="font-semibold text-red-800 flex items-center gap-2">
              <FlagIcon class="h-4 w-4" />
              When to Report Content
            </h5>
            <ul class="text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>Harassment or discrimination</strong> based on origin (Portugal vs. Brazil vs. African countries)</li>
              <li><strong>Scams or fraudulent services</strong> targeting Portuguese speakers</li>
              <li><strong>Inappropriate personal information sharing</strong> without consent</li>
              <li><strong>Off-topic content</strong> that doesn't serve the Portuguese-speaking community</li>
              <li><strong>Spam or excessive self-promotion</strong> without community value</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 class="font-semibold text-yellow-800 flex items-center gap-2">
              <ExclamationTriangleIcon class="h-4 w-4" />
              Privacy Protection
            </h5>
            <ul class="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>Never share:</strong> Full addresses, phone numbers, or financial details publicly</li>
              <li><strong>Use private messages</strong> for exchanging personal contact information</li>
              <li><strong>Be cautious with photos</strong> that might reveal personal information</li>
              <li><strong>Report suspicious requests</strong> for personal or financial information</li>
            </ul>
          </div>
        </div>
        
        <h4>Positive Community Building</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Welcome New Members:</strong> Respond warmly to introduction posts and questions</li>
          <li><strong>Share Constructively:</strong> Offer helpful advice based on your London experience</li>
          <li><strong>Celebrate Diversity:</strong> Acknowledge different Portuguese-speaking cultures and experiences</li>
          <li><strong>Support During Challenges:</strong> Offer emotional support to members facing difficulties</li>
          <li><strong>Maintain Optimism:</strong> Focus on solutions and positive community experiences</li>
        </ul>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
          <p><strong>Community Pledge:</strong> "I commit to treating fellow Portuguese speakers with the same warmth and respect I would show to family, while maintaining the safety and dignity of our London community."</p>
        </div>
        
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p><strong>Emergency Support:</strong> For urgent safety concerns or immediate help needed, use our 24/7 WhatsApp support line staffed by Portuguese-speaking community volunteers.</p>
        </div>
      `,
      contentPortuguese: `
        <p>Os fóruns da LusoTown mantêm padrões altos de segurança preservando o calor e abertura da cultura comunitária portuguesa. Aprenda como funciona a nossa moderação e como contribuir para um ambiente seguro e acolhedor.</p>
        
        <h4>Funcionalidades de Segurança da Comunidade</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800 flex items-center gap-2">
              <ShieldCheckIcon class="h-4 w-4" />
              Perfis Verificados
            </h5>
            <p class="text-sm text-green-700">Membros podem verificar a sua identidade através de:</p>
            <ul class="text-xs text-green-600 mt-2 list-disc list-inside">
              <li>Verificação de passaporte português ou BI</li>
              <li>Confirmação de endereço do Reino Unido</li>
              <li>Verificação universitária ou local de trabalho</li>
              <li>Referências de membros da comunidade</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <EyeIcon class="h-4 w-4" />
              Moderação Comunitária
            </h5>
            <p class="text-sm text-blue-700">Membros confiáveis da comunidade ajudam a moderar:</p>
            <ul class="text-xs text-blue-600 mt-2 list-disc list-inside">
              <li>Residentes portugueses experientes como moderadores</li>
              <li>Sensibilidade cultural nas decisões de moderação</li>
              <li>Resposta rápida a preocupações da comunidade</li>
              <li>Políticas de moderação transparentes</li>
            </ul>
          </div>
        </div>
        
        <h4>Ferramentas de Relatório e Segurança</h4>
        <div class="space-y-4">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h5 class="font-semibold text-red-800 flex items-center gap-2">
              <FlagIcon class="h-4 w-4" />
              Quando Reportar Conteúdo
            </h5>
            <ul class="text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>Assédio ou discriminação</strong> baseado em origem (Portugal vs. Brasil vs. países africanos)</li>
              <li><strong>Esquemas ou serviços fraudulentos</strong> visando falantes de português</li>
              <li><strong>Partilha inadequada de informações pessoais</strong> sem consentimento</li>
              <li><strong>Conteúdo fora de tópico</strong> que não serve a comunidade de falantes de português</li>
              <li><strong>Spam ou autopromoção excessiva</strong> sem valor comunitário</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 class="font-semibold text-yellow-800 flex items-center gap-2">
              <ExclamationTriangleIcon class="h-4 w-4" />
              Proteção de Privacidade
            </h5>
            <ul class="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>Nunca partilhe:</strong> Endereços completos, números de telefone, ou detalhes financeiros publicamente</li>
              <li><strong>Use mensagens privadas</strong> para trocar informações de contacto pessoal</li>
              <li><strong>Seja cuidadoso com fotos</strong> que possam revelar informações pessoais</li>
              <li><strong>Reporte pedidos suspeitos</strong> de informações pessoais ou financeiras</li>
            </ul>
          </div>
        </div>
        
        <h4>Construção Positiva da Comunidade</h4>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Receba Novos Membros:</strong> Responda calorosamente a publicações de apresentação e perguntas</li>
          <li><strong>Partilhe Construtivamente:</strong> Ofereça conselhos úteis baseados na sua experiência em Londres</li>
          <li><strong>Celebre a Diversidade:</strong> Reconheça diferentes culturas e experiências de falantes de português</li>
          <li><strong>Apoie Durante Desafios:</strong> Ofereça apoio emocional a membros enfrentando dificuldades</li>
          <li><strong>Mantenha Otimismo:</strong> Foque em soluções e experiências comunitárias positivas</li>
        </ul>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
          <p><strong>Compromisso da Comunidade:</strong> "Comprometo-me a tratar outros falantes de português com o mesmo calor e respeito que mostraria à família, mantendo a segurança e dignidade da nossa comunidade londrina."</p>
        </div>
        
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p><strong>Apoio de Emergência:</strong> Para preocupações urgentes de segurança ou ajuda imediata necessária, use a nossa linha de apoio WhatsApp 24/7 com voluntários da comunidade que falam português.</p>
        </div>
      `,
      icon: ShieldCheckIcon,
      estimatedTime: 5,
      interactiveElements: [
        {
          type: "checklist",
          title: "Safety Practices Checklist",
          titlePortuguese: "Lista de Verificação de Práticas de Segurança",
          items: [
            {
              text: "Review and understand community guidelines",
              textPortuguese: "Rever e compreender diretrizes da comunidade",
            },
            {
              text: "Set privacy preferences for your profile",
              textPortuguese:
                "Configurar preferências de privacidade para o seu perfil",
            },
            {
              text: "Learn how to report inappropriate content",
              textPortuguese: "Aprender como reportar conteúdo inadequado",
            },
            {
              text: "Practice positive community engagement",
              textPortuguese: "Praticar envolvimento comunitário positivo",
            },
            {
              text: "Save emergency contact information",
              textPortuguese: "Guardar informações de contacto de emergência",
            },
          ],
        },
      ],
    },
    {
      id: "engagement-mastery",
      title: "Building Meaningful Connections",
      titlePortuguese: "Construir Conexões Significativas",
      content: `
        <p>Master the art of forum engagement to build lasting relationships within the Portuguese-speaking community. Learn advanced techniques for meaningful participation that leads to real friendships and professional opportunities.</p>
        
        <h4>Advanced Engagement Strategies</h4>
        <div class="space-y-4">
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800 flex items-center gap-2">
              <StarIcon class="h-4 w-4" />
              Becoming a Valued Community Member
            </h5>
            <ul class="text-sm text-purple-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>Consistent Participation:</strong> Regular, thoughtful contributions rather than sporadic posting</li>
              <li><strong>Expertise Sharing:</strong> Share your unique knowledge (your profession, neighborhood, hobbies)</li>
              <li><strong>Question Following:</strong> Return to threads you've participated in to see outcomes</li>
              <li><strong>Success Stories:</strong> Share positive outcomes from community advice you received</li>
              <li><strong>Cultural Bridge-Building:</strong> Help newcomers understand both Portuguese and British cultures</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <HandRaisedIcon class="h-4 w-4" />
              Mentorship & Leadership
            </h5>
            <ul class="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>New Member Welcoming:</strong> Actively respond to introduction posts with helpful resources</li>
              <li><strong>FAQ Development:</strong> Help create comprehensive answers to common questions</li>
              <li><strong>Event Coordination:</strong> Organize and promote community meetups through forum coordination</li>
              <li><strong>Cultural Education:</strong> Share knowledge about Portuguese traditions and London adaptation</li>
              <li><strong>Professional Networking:</strong> Connect community members with similar career interests</li>
            </ul>
          </div>
        </div>
        
        <h4>Relationship Building Techniques</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800">Online to Offline Connections</h5>
            <ul class="text-sm text-green-700 mt-2 list-disc list-inside">
              <li>Suggest coffee meetups with regular forum participants</li>
              <li>Organize neighborhood-specific gatherings</li>
              <li>Create professional networking events</li>
              <li>Plan cultural celebration parties</li>
            </ul>
          </div>
          
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800">Professional Network Building</h5>
            <ul class="text-sm text-orange-700 mt-2 list-disc list-inside">
              <li>Share career opportunities and insights</li>
              <li>Offer professional mentorship to newcomers</li>
              <li>Create industry-specific discussion groups</li>
              <li>Recommend Portuguese professionals for services</li>
            </ul>
          </div>
        </div>
        
        <h4>Community Impact Metrics</h4>
        <p>Track your positive impact on the community:</p>
        <ul class="list-disc list-inside space-y-2 mt-3">
          <li><strong>Helpful Responses:</strong> Number of times your advice was marked as helpful</li>
          <li><strong>Event Attendance:</strong> Participation in community events you've promoted or organized</li>
          <li><strong>Member Connections:</strong> Number of successful introductions you've facilitated</li>
          <li><strong>Cultural Contributions:</strong> Portuguese traditions, recipes, or cultural insights shared</li>
          <li><strong>Professional Referrals:</strong> Successful job or service referrals within the community</li>
        </ul>
        
        <h4>Long-term Community Building</h4>
        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4 my-4">
          <h5 class="font-semibold text-primary-800">Your Portuguese-speaking community Legacy</h5>
          <p class="text-sm text-primary-700 mt-2">Consider how you want to contribute to the long-term growth and success of Portuguese speakers in London:</p>
          <ul class="text-xs text-primary-600 mt-2 list-disc list-inside space-y-1">
            <li>Mentor new Portuguese arrivals in your professional field</li>
            <li>Document and share resources for common challenges (housing, healthcare, education)</li>
            <li>Build bridges between different Portuguese-speaking communities (Portugal, Brazil, African countries)</li>
            <li>Create lasting traditions and events that strengthen community bonds</li>
            <li>Develop resources that will help future generations of Portuguese speakers in London</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p><strong>Success Indicator:</strong> When newer community members start referring to your advice and recommending your expertise to others, you've become a true community leader and cultural bridge-builder.</p>
        </div>
      `,
      contentPortuguese: `
        <p>Domine a arte do envolvimento nos fóruns para construir relacionamentos duradouros dentro da comunidade de falantes de português. Aprenda técnicas avançadas para participação significativa que leva a amizades reais e oportunidades profissionais.</p>
        
        <h4>Estratégias Avançadas de Envolvimento</h4>
        <div class="space-y-4">
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 class="font-semibold text-purple-800 flex items-center gap-2">
              <StarIcon class="h-4 w-4" />
              Tornar-se um Membro Valioso da Comunidade
            </h5>
            <ul class="text-sm text-purple-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>Participação Consistente:</strong> Contribuições regulares e ponderadas em vez de publicações esporádicas</li>
              <li><strong>Partilha de Expertise:</strong> Partilhe o seu conhecimento único (sua profissão, bairro, hobbies)</li>
              <li><strong>Acompanhamento de Perguntas:</strong> Retorne a threads em que participou para ver resultados</li>
              <li><strong>Histórias de Sucesso:</strong> Partilhe resultados positivos de conselhos da comunidade que recebeu</li>
              <li><strong>Construção de Pontes Culturais:</strong> Ajude recém-chegados a compreender culturas portuguesas e britânicas</li>
            </ul>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 class="font-semibold text-blue-800 flex items-center gap-2">
              <HandRaisedIcon class="h-4 w-4" />
              Mentoria e Liderança
            </h5>
            <ul class="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
              <li><strong>Recepção de Novos Membros:</strong> Responda ativamente a publicações de apresentação com recursos úteis</li>
              <li><strong>Desenvolvimento de FAQ:</strong> Ajude a criar respostas abrangentes para perguntas comuns</li>
              <li><strong>Coordenação de Eventos:</strong> Organize e promova encontros comunitários através da coordenação do fórum</li>
              <li><strong>Educação Cultural:</strong> Partilhe conhecimento sobre tradições portuguesas e adaptação a Londres</li>
              <li><strong>Networking Profissional:</strong> Conecte membros da comunidade com interesses de carreira similares</li>
            </ul>
          </div>
        </div>
        
        <h4>Técnicas de Construção de Relacionamentos</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 class="font-semibold text-green-800">Conexões Online para Offline</h5>
            <ul class="text-sm text-green-700 mt-2 list-disc list-inside">
              <li>Sugerir encontros de café com participantes regulares do fórum</li>
              <li>Organizar reuniões específicas do bairro</li>
              <li>Criar eventos de networking profissional</li>
              <li>Planear festas de celebração cultural</li>
            </ul>
          </div>
          
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 class="font-semibold text-orange-800">Construção de Rede Profissional</h5>
            <ul class="text-sm text-orange-700 mt-2 list-disc list-inside">
              <li>Partilhar oportunidades de carreira e insights</li>
              <li>Oferecer mentoria profissional a recém-chegados</li>
              <li>Criar grupos de discussão específicos da indústria</li>
              <li>Recomendar profissionais portugueses para serviços</li>
            </ul>
          </div>
        </div>
        
        <h4>Métricas de Impacto Comunitário</h4>
        <p>Acompanhe o seu impacto positivo na comunidade:</p>
        <ul class="list-disc list-inside space-y-2 mt-3">
          <li><strong>Respostas Úteis:</strong> Número de vezes que o seu conselho foi marcado como útil</li>
          <li><strong>Participação em Eventos:</strong> Participação em eventos comunitários que promoveu ou organizou</li>
          <li><strong>Conexões de Membros:</strong> Número de apresentações bem-sucedidas que facilitou</li>
          <li><strong>Contribuições Culturais:</strong> Tradições portuguesas, receitas ou insights culturais partilhados</li>
          <li><strong>Referências Profissionais:</strong> Referências bem-sucedidas de emprego ou serviço dentro da comunidade</li>
        </ul>
        
        <h4>Construção Comunitária a Longo Prazo</h4>
        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4 my-4">
          <h5 class="font-semibold text-primary-800">O Seu Legado da Comunidade de Falantes de Português</h5>
          <p class="text-sm text-primary-700 mt-2">Considere como quer contribuir para o crescimento e sucesso a longo prazo de falantes de português em Londres:</p>
          <ul class="text-xs text-primary-600 mt-2 list-disc list-inside space-y-1">
            <li>Mentorar novos portugueses na sua área profissional</li>
            <li>Documentar e partilhar recursos para desafios comuns (habitação, saúde, educação)</li>
            <li>Construir pontes entre diferentes comunidades de falantes de português (Portugal, Brasil, países africanos)</li>
            <li>Criar tradições e eventos duradouros que fortaleçam laços comunitários</li>
            <li>Desenvolver recursos que ajudarão futuras gerações de falantes de português em Londres</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p><strong>Indicador de Sucesso:</strong> Quando membros mais novos da comunidade começam a referenciar o seu conselho e recomendar a sua expertise a outros, tornou-se um verdadeiro líder comunitário e construtor de pontes culturais.</p>
        </div>
      `,
      icon: HeartIcon,
      estimatedTime: 4,
      interactiveElements: [
        {
          type: "checklist",
          title: "Community Leadership Checklist",
          titlePortuguese: "Lista de Verificação de Liderança Comunitária",
          items: [
            {
              text: "Welcome and help at least 3 new community members each month",
              textPortuguese:
                "Receber e ajudar pelo menos 3 novos membros da comunidade a cada mês",
            },
            {
              text: "Share your professional expertise and local knowledge regularly",
              textPortuguese:
                "Partilhar a sua expertise profissional e conhecimento local regularmente",
            },
            {
              text: "Organize or participate in offline community meetups",
              textPortuguese:
                "Organizar ou participar em encontros comunitários offline",
            },
            {
              text: "Connect members with similar interests or needs",
              textPortuguese:
                "Conectar membros com interesses ou necessidades similares",
            },
            {
              text: "Contribute to community resources and FAQ development",
              textPortuguese:
                "Contribuir para recursos comunitários e desenvolvimento de FAQ",
            },
          ],
        },
      ],
    },
  ],
};

export default function CommunityForumsPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const handleStep = (id: string) =>
    setCompleted((prev: string[]) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  const handleComplete = () => {};
  return (
    <LearningModuleFramework
      module={communityForumsModule as unknown as LearningModule}
      onComplete={handleComplete}
      onStepComplete={handleStep}
      completedSteps={completed}
    />
  );
}
