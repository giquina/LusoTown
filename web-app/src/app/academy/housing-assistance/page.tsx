'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, PoundSterling, FileText, Users, Shield, Search, CheckCircle } from 'lucide-react';
import LearningModuleFramework, { LearningModule, LearningStep } from '@/components/academy/LearningModuleFramework';
import { useLanguage } from '@/context/LanguageContext';

export default function HousingAssistanceModule() {
  const { language } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const isPortuguese = language === 'pt';

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lusotown-academy-housing-assistance-progress');
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
      localStorage.setItem('lusotown-academy-housing-assistance-progress', JSON.stringify({
        completedSteps: newCompleted,
        lastAccess: Date.now()
      }));
    }
  };

  const handleModuleComplete = () => {
    // Module completion logic
    console.log('Housing Assistance module completed!');
  };

  // Define the learning module structure
  const housingAssistanceModule: LearningModule = {
    id: 'housing-assistance',
    title: 'Housing Assistance',
    titlePortuguese: 'Assistência Habitacional',
    description: 'Navigate London\'s housing market with Portuguese-speaking community support and resources',
    descriptionPortuguese: 'Navegar no mercado habitacional de Londres com apoio e recursos da comunidade de falantes de português',
    difficulty: 'Intermediate',
    estimatedTime: 28,
    icon: Home,
    category: 'Practical',
    categoryPortuguese: 'Prático',
    prerequisites: [],
    prerequisitesPortuguese: [],
    learningObjectives: [
      'Understand London\'s housing market from a Portuguese perspective',
      'Access Portuguese-speaking community housing networks and resources',
      'Navigate UK rental processes and legal requirements',
      'Find Portuguese-friendly neighborhoods and communities',
      'Build support networks for housing stability and growth'
    ],
    learningObjectivesPortuguese: [
      'Compreender o mercado habitacional de Londres numa perspetiva portuguesa',
      'Aceder a redes e recursos habitacionais da comunidade de falantes de português',
      'Navegar processos de arrendamento do Reino Unido e requisitos legais',
      'Encontrar bairros e comunidades amigáveis aos portugueses',
      'Construir redes de apoio para estabilidade e crescimento habitacional'
    ],
    steps: [
      {
        id: 'understanding-london-housing',
        title: 'Understanding London Housing for Portuguese Speakers',
        titlePortuguese: 'Compreendendo Habitação em Londres para Falantes de Português',
        type: 'introduction',
        estimatedTime: 5,
        content: `
          <p>London's housing market can be complex, but understanding it from a Portuguese-speaking community perspective makes navigation easier and more successful.</p>
          
          <h3>London Housing Market Overview:</h3>
          
          <h4>Types of Housing Available:</h4>
          <ul>
            <li><strong>Private Rental (Most Common for Portuguese-speaking community):</strong>
              <ul>
                <li>Studio apartments: £1,200-£2,000+ per month</li>
                <li>1-bedroom flats: £1,500-£3,000+ per month</li>
                <li>2-bedroom flats: £2,200-£4,500+ per month</li>
                <li>House shares: £600-£1,200+ per room per month</li>
              </ul>
            </li>
            <li><strong>Council Housing (Social Housing):</strong>
              <ul>
                <li>Heavily subsidized housing for eligible residents</li>
                <li>Long waiting lists (2-10+ years)</li>
                <li>Priority given to families and vulnerable individuals</li>
                <li>Portuguese families may qualify if settled in UK</li>
              </ul>
            </li>
            <li><strong>Housing Association Properties:</strong>
              <ul>
                <li>Semi-private affordable housing</li>
                <li>Shared ownership options available</li>
                <li>Income requirements and local connection criteria</li>
              </ul>
            </li>
            <li><strong>Buying Property:</strong>
              <ul>
                <li>First-time buyer schemes available</li>
                <li>Help to Buy and Shared Ownership programs</li>
                <li>Portuguese-speaking community mortgage advisors available</li>
              </ul>
            </li>
          </ul>
          
          <h3>Portuguese-speaking community Housing Advantages:</h3>
          
          <h4>Community Networks:</h4>
          <ul>
            <li><strong>Portuguese Landlords:</strong> Better cultural understanding and communication</li>
            <li><strong>Portuguese Flatmates:</strong> Shared language and cultural comfort</li>
            <li><strong>Community Recommendations:</strong> Trusted referrals from Portuguese-speaking friends</li>
            <li><strong>Portuguese Estate Agents:</strong> Bilingual service and cultural sensitivity</li>
          </ul>
          
          <h4>Preferred Portuguese Areas in London:</h4>
          <ul>
            <li><strong>South London:</strong>
              <ul>
                <li>Stockwell: Large Portuguese-speaking community, good transport links</li>
                <li>Vauxhall: Close to central London, Portuguese businesses</li>
                <li>Lambeth: Affordable options, established Portuguese families</li>
                <li>Elephant & Castle: Portuguese shops and services</li>
              </ul>
            </li>
            <li><strong>West London:</strong>
              <ul>
                <li>Shepherd's Bush: Portuguese-speaking community presence</li>
                <li>Hammersmith: Good transport, family-friendly</li>
                <li>Golborne Road area: Portuguese businesses and culture</li>
              </ul>
            </li>
            <li><strong>East London:</strong>
              <ul>
                <li>Bethnal Green: Growing Portuguese-speaking community</li>
                <li>Canary Wharf area: Professional Portuguese-speaking community</li>
              </ul>
            </li>
          </ul>
          
          <h3>Financial Considerations for Portuguese-speaking community:</h3>
          <ul>
            <li><strong>Salary Multiples:</strong> Generally need 30-40x monthly rent as annual salary</li>
            <li><strong>Deposit Requirements:</strong> Usually 1-6 weeks rent upfront</li>
            <li><strong>Guarantors:</strong> May need UK-based guarantor or international guarantor service</li>
            <li><strong>Portuguese Banking:</strong> Some Portuguese banks offer UK mortgage services</li>
          </ul>
          
          <p><strong>Transportation Note:</strong> When viewing properties or moving, our professional transport service is available separately to assist with property visits or moving logistics, but is not included with housing services.</p>
        `,
        contentPortuguese: `
          <p>O mercado habitacional de Londres pode ser complexo, mas compreendê-lo numa perspetiva da comunidade de falantes de português torna a navegação mais fácil e bem-sucedida.</p>
          
          <h3>Visão Geral do Mercado Habitacional de Londres:</h3>
          
          <h4>Tipos de Habitação Disponível:</h4>
          <ul>
            <li><strong>Arrendamento Privado (Mais Comum para Comunidade de Falantes de Português):</strong>
              <ul>
                <li>Estúdios: £1,200-£2,000+ por mês</li>
                <li>Apartamentos de 1 quarto: £1,500-£3,000+ por mês</li>
                <li>Apartamentos de 2 quartos: £2,200-£4,500+ por mês</li>
                <li>Partilha de casa: £600-£1,200+ por quarto por mês</li>
              </ul>
            </li>
            <li><strong>Habitação Municipal (Habitação Social):</strong>
              <ul>
                <li>Habitação fortemente subsidiada para residentes elegíveis</li>
                <li>Listas de espera longas (2-10+ anos)</li>
                <li>Prioridade dada a famílias e indivíduos vulneráveis</li>
                <li>Famílias portuguesas podem qualificar-se se estabelecidas no Reino Unido</li>
              </ul>
            </li>
            <li><strong>Propriedades de Associações Habitacionais:</strong>
              <ul>
                <li>Habitação acessível semi-privada</li>
                <li>Opções de propriedade partilhada disponíveis</li>
                <li>Requisitos de rendimento e critérios de conexão local</li>
              </ul>
            </li>
            <li><strong>Compra de Propriedade:</strong>
              <ul>
                <li>Esquemas para compradores de primeira vez disponíveis</li>
                <li>Programas Help to Buy e Shared Ownership</li>
                <li>Conselheiros hipotecários da comunidade de falantes de português disponíveis</li>
              </ul>
            </li>
          </ul>
          
          <h3>Vantagens Habitacionais da Comunidade de Falantes de Português:</h3>
          
          <h4>Redes Comunitárias:</h4>
          <ul>
            <li><strong>Senhorios Portugueses:</strong> Melhor compreensão cultural e comunicação</li>
            <li><strong>Colegas de Casa Portugueses:</strong> Idioma partilhado e conforto cultural</li>
            <li><strong>Recomendações Comunitárias:</strong> Referências confiáveis de amigos portugueses</li>
            <li><strong>Agentes Imobiliários Portugueses:</strong> Serviço bilingue e sensibilidade cultural</li>
          </ul>
          
          <h4>Áreas Portuguesas Preferidas em Londres:</h4>
          <ul>
            <li><strong>Sul de Londres:</strong>
              <ul>
                <li>Stockwell: Grande comunidade de falantes de português, boas ligações de transporte</li>
                <li>Vauxhall: Perto do centro de Londres, negócios portugueses</li>
                <li>Lambeth: Opções acessíveis, famílias portuguesas estabelecidas</li>
                <li>Elephant & Castle: Lojas e serviços portugueses</li>
              </ul>
            </li>
            <li><strong>Oeste de Londres:</strong>
              <ul>
                <li>Shepherd's Bush: Presença da comunidade de falantes de português</li>
                <li>Hammersmith: Bom transporte, adequado para famílias</li>
                <li>Área de Golborne Road: Negócios e cultura portugueses</li>
              </ul>
            </li>
            <li><strong>Leste de Londres:</strong>
              <ul>
                <li>Bethnal Green: Comunidade de falantes de português crescente</li>
                <li>Área de Canary Wharf: Comunidade de falantes de português profissional</li>
              </ul>
            </li>
          </ul>
          
          <h3>Considerações Financeiras para a Comunidade de Falantes de Português:</h3>
          <ul>
            <li><strong>Múltiplos de Salário:</strong> Geralmente precisa de 30-40x a renda mensal como salário anual</li>
            <li><strong>Requisitos de Depósito:</strong> Normalmente 1-6 semanas de renda antecipadamente</li>
            <li><strong>Fiadores:</strong> Pode precisar de fiador baseado no Reino Unido ou serviço de fiador internacional</li>
            <li><strong>Banca Portuguesa:</strong> Alguns bancos portugueses oferecem serviços de hipoteca no Reino Unido</li>
          </ul>
          
          <p><strong>Nota de Transporte:</strong> Ao visitar propriedades ou mudar-se, o nosso serviço de transporte profissional está disponível separadamente para assistir com visitas a propriedades ou logística de mudança, mas não está incluído com serviços habitacionais.</p>
        `,
        tips: [
          'Start your housing search 2-3 months before you need to move',
          'Join Portuguese housing groups on WhatsApp and Facebook for insider tips',
          'Consider areas with good transport links to central London for work flexibility'
        ],
        tipsPortuguese: [
          'Comece a sua procura habitacional 2-3 meses antes de precisar de se mudar',
          'Junte-se a grupos habitacionais portugueses no WhatsApp e Facebook para dicas internas',
          'Considere áreas com boas ligações de transporte para o centro de Londres para flexibilidade de trabalho'
        ]
      },
      {
        id: 'portuguese-community-resources',
        title: 'Portuguese-speaking community Housing Resources and Networks',
        titlePortuguese: 'Recursos e Redes Habitacionais da Comunidade de Falantes de Português',
        type: 'tutorial',
        estimatedTime: 6,
        content: `
          <p>The Portuguese-speaking community in London has developed strong networks and resources to help each other navigate housing challenges. Here's how to access and contribute to these support systems.</p>
          
          <h3>Portuguese-speaking community Housing Networks:</h3>
          
          <h4>1. Online Portuguese Housing Groups:</h4>
          <ul>
            <li><strong>WhatsApp Groups:</strong>
              <ul>
                <li>"Portuguese Housing London" - property listings and roommate searches</li>
                <li>"Lusitanos London Housing" - family housing and neighborhood advice</li>
                <li>"Portuguese Professionals Housing" - higher-end properties and house shares</li>
                <li>"Portuguese Students London" - budget-friendly housing for students</li>
              </ul>
            </li>
            <li><strong>Facebook Groups:</strong>
              <ul>
                <li>"Portuguese in London - Housing Help"</li>
                <li>"Brasileiros e Portugueses em Londres - Habitação"</li>
                <li>"Portuguese Families London Housing"</li>
                <li>"Portuguese Property London"</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Portuguese Estate Agents and Property Services:</h4>
          <ul>
            <li><strong>Portuguese-Speaking Estate Agents:</strong>
              <ul>
                <li>Bilingual property consultations</li>
                <li>Understanding of Portuguese financial situations</li>
                <li>Cultural sensitivity in property matching</li>
                <li>Assistance with UK rental procedures</li>
              </ul>
            </li>
            <li><strong>Portuguese Property Management:</strong>
              <ul>
                <li>Portuguese landlords with multiple properties</li>
                <li>Property management companies serving Portuguese-speaking community</li>
                <li>Maintenance services with Portuguese-speaking staff</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Community Organizations Housing Support:</h4>
          <ul>
            <li><strong>Portuguese-speaking community Centers:</strong>
              <ul>
                <li>Housing advice and support services</li>
                <li>Translation assistance for housing documents</li>
                <li>Legal advice referrals for housing issues</li>
                <li>Emergency housing assistance programs</li>
              </ul>
            </li>
            <li><strong>Portuguese Churches:</strong>
              <ul>
                <li>Emergency accommodation networks</li>
                <li>Community housing referrals</li>
                <li>Family housing support programs</li>
                <li>Pastoral care during housing transitions</li>
              </ul>
            </li>
          </ul>
          
          <h3>How to Access Community Housing Support:</h3>
          
          <h4>Step 1: Join Portuguese Housing Networks</h4>
          <ul>
            <li><strong>Verify Groups:</strong> Ensure groups are moderated and safe</li>
            <li><strong>Introduce Yourself:</strong> Share your housing needs respectfully</li>
            <li><strong>Follow Group Rules:</strong> Respect community guidelines and etiquette</li>
            <li><strong>Contribute Value:</strong> Share useful housing information with others</li>
          </ul>
          
          <h4>Step 2: Build Relationships</h4>
          <ul>
            <li><strong>Attend Portuguese-speaking community Events:</strong> Meet potential roommates and landlords</li>
            <li><strong>Network at Portuguese Businesses:</strong> Portuguese restaurants, shops, services</li>
            <li><strong>Connect with Portuguese Professionals:</strong> Business networking with housing benefits</li>
            <li><strong>Engage with Portuguese Families:</strong> Learn from established community members</li>
          </ul>
          
          <h4>Step 3: Leverage Community Recommendations</h4>
          <ul>
            <li><strong>Ask for Referrals:</strong> Request recommendations from trusted community members</li>
            <li><strong>Seek References:</strong> Get character references from Portuguese-speaking community leaders</li>
            <li><strong>Share Experiences:</strong> Contribute your own housing reviews and recommendations</li>
            <li><strong>Build Reputation:</strong> Establish yourself as a trustworthy community member</li>
          </ul>
          
          <h3>Portuguese-Specific Housing Services:</h3>
          
          <h4>Documentation and Legal Support:</h4>
          <ul>
            <li><strong>Translation Services:</strong>
              <ul>
                <li>Tenancy agreement translations</li>
                <li>Housing benefit application assistance</li>
                <li>Legal document interpretation</li>
                <li>Communication with English-speaking landlords</li>
              </ul>
            </li>
            <li><strong>Legal Advice:</strong>
              <ul>
                <li>Portuguese-speaking housing lawyers</li>
                <li>Tenant rights education in Portuguese</li>
                <li>Deposit protection scheme guidance</li>
                <li>Eviction protection and advice</li>
              </ul>
            </li>
          </ul>
          
          <h4>Financial Support and Guidance:</h4>
          <ul>
            <li><strong>Portuguese Banking Services:</strong>
              <ul>
                <li>Mortgage advice from Portuguese financial advisors</li>
                <li>Help to Buy scheme guidance</li>
                <li>Credit building advice for new UK residents</li>
                <li>International money transfer for deposits</li>
              </ul>
            </li>
            <li><strong>Community Financial Support:</strong>
              <ul>
                <li>Emergency housing funds from Portuguese organizations</li>
                <li>Deposit loan schemes within the community</li>
                <li>Financial literacy workshops in Portuguese</li>
              </ul>
            </li>
          </ul>
          
          <h3>Contributing to the Portuguese Housing Community:</h3>
          
          <h4>How to Give Back:</h4>
          <ul>
            <li><strong>Share Your Experience:</strong> Help others learn from your housing journey</li>
            <li><strong>Provide References:</strong> Offer character references for trustworthy community members</li>
            <li><strong>Recommend Services:</strong> Share positive experiences with Portuguese housing services</li>
            <li><strong>Mentor Newcomers:</strong> Guide new Portuguese arrivals through housing processes</li>
            <li><strong>Volunteer:</strong> Help Portuguese-speaking community organizations with housing support programs</li>
          </ul>
        `,
        contentPortuguese: `
          <p>A comunidade de falantes de português em Londres desenvolveu redes e recursos fortes para se ajudarem mutuamente a navegar desafios habitacionais. Aqui está como aceder e contribuir para estes sistemas de apoio.</p>
          
          <h3>Redes Habitacionais da Comunidade de Falantes de Português:</h3>
          
          <h4>1. Grupos Habitacionais Portugueses Online:</h4>
          <ul>
            <li><strong>Grupos WhatsApp:</strong>
              <ul>
                <li>"Portuguese Housing London" - listagens de propriedades e procura de colegas de quarto</li>
                <li>"Lusitanos London Housing" - habitação familiar e conselhos de bairro</li>
                <li>"Portuguese Professionals Housing" - propriedades de gama alta e partilhas de casa</li>
                <li>"Portuguese Students London" - habitação económica para estudantes</li>
              </ul>
            </li>
            <li><strong>Grupos Facebook:</strong>
              <ul>
                <li>"Portuguese in London - Housing Help"</li>
                <li>"Brasileiros e Portugueses em Londres - Habitação"</li>
                <li>"Portuguese Families London Housing"</li>
                <li>"Portuguese Property London"</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Agentes Imobiliários e Serviços de Propriedade Portugueses:</h4>
          <ul>
            <li><strong>Agentes Imobiliários Falantes de Português:</strong>
              <ul>
                <li>Consultas de propriedade bilingues</li>
                <li>Compreensão de situações financeiras portuguesas</li>
                <li>Sensibilidade cultural na correspondência de propriedades</li>
                <li>Assistência com procedimentos de arrendamento do Reino Unido</li>
              </ul>
            </li>
            <li><strong>Gestão de Propriedades Portuguesas:</strong>
              <ul>
                <li>Senhorios portugueses com múltiplas propriedades</li>
                <li>Empresas de gestão de propriedades servindo a comunidade de falantes de português</li>
                <li>Serviços de manutenção com pessoal falante de português</li>
              </ul>
            </li>
          </ul>
          
          <h4>3. Apoio Habitacional de Organizações Comunitárias:</h4>
          <ul>
            <li><strong>Centros Comunitários Portugueses:</strong>
              <ul>
                <li>Serviços de aconselhamento e apoio habitacional</li>
                <li>Assistência de tradução para documentos habitacionais</li>
                <li>Referências de aconselhamento legal para questões habitacionais</li>
                <li>Programas de assistência habitacional de emergência</li>
              </ul>
            </li>
            <li><strong>Igrejas Portuguesas:</strong>
              <ul>
                <li>Redes de acomodação de emergência</li>
                <li>Referências habitacionais comunitárias</li>
                <li>Programas de apoio habitacional familiar</li>
                <li>Cuidado pastoral durante transições habitacionais</li>
              </ul>
            </li>
          </ul>
          
          <h3>Como Aceder ao Apoio Habitacional Comunitário:</h3>
          
          <h4>Passo 1: Juntar-se a Redes Habitacionais Portuguesas</h4>
          <ul>
            <li><strong>Verificar Grupos:</strong> Assegurar que grupos são moderados e seguros</li>
            <li><strong>Apresentar-se:</strong> Partilhar as suas necessidades habitacionais respeitosamente</li>
            <li><strong>Seguir Regras do Grupo:</strong> Respeitar diretrizes comunitárias e etiqueta</li>
            <li><strong>Contribuir com Valor:</strong> Partilhar informação habitacional útil com outros</li>
          </ul>
          
          <h4>Passo 2: Construir Relacionamentos</h4>
          <ul>
            <li><strong>Participar em Eventos da Comunidade de Falantes de Português:</strong> Conhecer potenciais colegas de quarto e senhorios</li>
            <li><strong>Fazer Networking em Negócios Portugueses:</strong> Restaurantes, lojas, serviços portugueses</li>
            <li><strong>Conectar com Profissionais Portugueses:</strong> Networking empresarial com benefícios habitacionais</li>
            <li><strong>Envolver-se com Famílias Portuguesas:</strong> Aprender com membros comunitários estabelecidos</li>
          </ul>
          
          <h4>Passo 3: Aproveitar Recomendações Comunitárias</h4>
          <ul>
            <li><strong>Pedir Referências:</strong> Solicitar recomendações de membros comunitários confiáveis</li>
            <li><strong>Procurar Referências:</strong> Obter referências de carácter de líderes da comunidade de falantes de português</li>
            <li><strong>Partilhar Experiências:</strong> Contribuir com as suas próprias avaliações e recomendações habitacionais</li>
            <li><strong>Construir Reputação:</strong> Estabelecer-se como um membro comunitário confiável</li>
          </ul>
          
          <h3>Serviços Habitacionais Específicos Portugueses:</h3>
          
          <h4>Documentação e Apoio Legal:</h4>
          <ul>
            <li><strong>Serviços de Tradução:</strong>
              <ul>
                <li>Traduções de contratos de arrendamento</li>
                <li>Assistência com candidaturas de benefícios habitacionais</li>
                <li>Interpretação de documentos legais</li>
                <li>Comunicação com senhorios falantes de inglês</li>
              </ul>
            </li>
            <li><strong>Aconselhamento Legal:</strong>
              <ul>
                <li>Advogados habitacionais falantes de português</li>
                <li>Educação sobre direitos de inquilinos em português</li>
                <li>Orientação sobre esquemas de proteção de depósitos</li>
                <li>Proteção e aconselhamento contra despejos</li>
              </ul>
            </li>
          </ul>
          
          <h4>Apoio e Orientação Financeira:</h4>
          <ul>
            <li><strong>Serviços Bancários Portugueses:</strong>
              <ul>
                <li>Aconselhamento hipotecário de conselheiros financeiros portugueses</li>
                <li>Orientação sobre esquemas Help to Buy</li>
                <li>Aconselhamento sobre construção de crédito para novos residentes do Reino Unido</li>
                <li>Transferência internacional de dinheiro para depósitos</li>
              </ul>
            </li>
            <li><strong>Apoio Financeiro Comunitário:</strong>
              <ul>
                <li>Fundos habitacionais de emergência de organizações portuguesas</li>
                <li>Esquemas de empréstimo de depósito dentro da comunidade</li>
                <li>Workshops de literacia financeira em português</li>
              </ul>
            </li>
          </ul>
          
          <h3>Contribuindo para a Comunidade Habitacional Portuguesa:</h3>
          
          <h4>Como Retribuir:</h4>
          <ul>
            <li><strong>Partilhar a Sua Experiência:</strong> Ajudar outros a aprender com a sua jornada habitacional</li>
            <li><strong>Fornecer Referências:</strong> Oferecer referências de carácter para membros comunitários confiáveis</li>
            <li><strong>Recomendar Serviços:</strong> Partilhar experiências positivas com serviços habitacionais portugueses</li>
            <li><strong>Orientar Recém-chegados:</strong> Guiar novos portugueses através de processos habitacionais</li>
            <li><strong>Voluntariar:</strong> Ajudar organizações da comunidade de falantes de português com programas de apoio habitacional</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Join 3 Portuguese housing WhatsApp or Facebook groups', textPortuguese: 'Junte-se a 3 grupos habitacionais portugueses no WhatsApp ou Facebook' },
              { text: 'Research Portuguese estate agents in London', textPortuguese: 'Pesquise agentes imobiliários portugueses em Londres' },
              { text: 'Connect with Portuguese-speaking community centers for housing advice', textPortuguese: 'Conecte-se com centros comunitários portugueses para aconselhamento habitacional' },
              { text: 'Attend a Portuguese-speaking community event to network about housing', textPortuguese: 'Participe num evento da comunidade de falantes de português para fazer networking sobre habitação' }
            ]
          }
        },
        tips: [
          'Always verify the legitimacy of housing offers from online groups',
          'Build relationships before asking for housing help - contribute to the community first',
          'Keep your Portuguese-speaking community housing contacts organized for future reference'
        ],
        tipsPortuguese: [
          'Sempre verifique a legitimidade de ofertas habitacionais de grupos online',
          'Construa relacionamentos antes de pedir ajuda habitacional - contribua para a comunidade primeiro',
          'Mantenha os seus contactos habitacionais da comunidade de falantes de português organizados para referência futura'
        ]
      },
      {
        id: 'rental-process-navigation',
        title: 'Navigating UK Rental Processes and Legal Requirements',
        titlePortuguese: 'Navegando Processos de Arrendamento do Reino Unido e Requisitos Legais',
        type: 'tutorial',
        estimatedTime: 8,
        content: `
          <p>Understanding UK rental processes and legal requirements is essential for Portuguese speakers to secure housing and protect their rights as tenants.</p>
          
          <h3>UK Rental Application Process:</h3>
          
          <h4>Step 1: Property Viewing and Application</h4>
          <ul>
            <li><strong>Viewing Preparation:</strong>
              <ul>
                <li>Bring identification documents (passport, visa, BRP card)</li>
                <li>Prepare questions about property and area</li>
                <li>Take photos and notes for comparison</li>
                <li>Check transport links and local amenities</li>
                <li>Note any property condition issues</li>
              </ul>
            </li>
            <li><strong>Application Documents Required:</strong>
              <ul>
                <li>Completed application form</li>
                <li>Photo identification (passport/driving license)</li>
                <li>Proof of right to rent (visa/BRP card)</li>
                <li>Proof of income (payslips, employment contract)</li>
                <li>Bank statements (3-6 months)</li>
                <li>Previous landlord references</li>
                <li>Credit report (can be requested by agent)</li>
              </ul>
            </li>
          </ul>
          
          <h4>Step 2: Right to Rent Checks</h4>
          <ul>
            <li><strong>Legal Requirement:</strong> All tenants must prove legal right to rent in UK</li>
            <li><strong>Acceptable Documents for Portuguese Citizens:</strong>
              <ul>
                <li>Portuguese passport with indefinite leave to remain</li>
                <li>Portuguese passport with valid UK visa</li>
                <li>Biometric Residence Permit (BRP)</li>
                <li>EU Settlement Scheme document (pre-settled/settled status)</li>
              </ul>
            </li>
            <li><strong>Process:</strong>
              <ul>
                <li>Landlord or agent must see original documents</li>
                <li>They will take copies for their records</li>
                <li>Process must be completed before tenancy begins</li>
                <li>Failure to comply can result in refused application</li>
              </ul>
            </li>
          </ul>
          
          <h4>Step 3: Credit Checks and Financial Assessment</h4>
          <ul>
            <li><strong>Credit Check Process:</strong>
              <ul>
                <li>Most landlords require credit check</li>
                <li>New UK residents may have limited credit history</li>
                <li>Some agencies specialize in applications with limited UK credit</li>
                <li>Portuguese bank references may be accepted as alternative</li>
              </ul>
            </li>
            <li><strong>Income Requirements:</strong>
              <ul>
                <li>Annual income typically 30-40x monthly rent</li>
                <li>Proof of employment and salary required</li>
                <li>Self-employed applicants need additional documentation</li>
                <li>Students may need guarantors or advance rent payment</li>
              </ul>
            </li>
          </ul>
          
          <h3>Tenancy Agreement Understanding:</h3>
          
          <h4>Types of Tenancy Agreements:</h4>
          <ul>
            <li><strong>Assured Shorthold Tenancy (AST) - Most Common:</strong>
              <ul>
                <li>Initial term usually 6-12 months</li>
                <li>Can be extended or become periodic</li>
                <li>Landlord can regain possession after fixed term</li>
                <li>Tenant has legal protections against unfair eviction</li>
              </ul>
            </li>
            <li><strong>Periodic Tenancy:</strong>
              <ul>
                <li>Month-to-month or week-to-week arrangement</li>
                <li>More flexibility but less security</li>
                <li>Notice periods apply for both parties</li>
              </ul>
            </li>
          </ul>
          
          <h4>Key Tenancy Agreement Terms:</h4>
          <ul>
            <li><strong>Rent and Payment Terms:</strong>
              <ul>
                <li>Monthly rent amount and due date</li>
                <li>Acceptable payment methods</li>
                <li>Late payment penalties</li>
                <li>Rent increase procedures</li>
              </ul>
            </li>
            <li><strong>Deposit Requirements:</strong>
              <ul>
                <li>Usually 1-6 weeks rent as security deposit</li>
                <li>Must be protected in government-approved scheme</li>
                <li>Conditions for deposit return</li>
                <li>Inventory and condition report importance</li>
              </ul>
            </li>
            <li><strong>Tenant Responsibilities:</strong>
              <ul>
                <li>Property maintenance and care</li>
                <li>Utility bill responsibilities</li>
                <li>Council tax obligations</li>
                <li>Restrictions on property modifications</li>
                <li>Guest and subletting policies</li>
              </ul>
            </li>
          </ul>
          
          <h3>Legal Rights and Protections:</h3>
          
          <h4>Tenant Rights:</h4>
          <ul>
            <li><strong>Right to Peaceful Enjoyment:</strong>
              <ul>
                <li>Landlord cannot enter without proper notice (usually 24 hours)</li>
                <li>Protection from harassment</li>
                <li>Right to privacy in your home</li>
              </ul>
            </li>
            <li><strong>Right to Safe and Habitable Property:</strong>
              <ul>
                <li>Property must meet safety standards</li>
                <li>Landlord responsible for major repairs</li>
                <li>Gas and electrical safety certificates required</li>
                <li>Protection from dangerous living conditions</li>
              </ul>
            </li>
            <li><strong>Protection from Unfair Eviction:</strong>
              <ul>
                <li>Proper notice periods must be followed</li>
                <li>Court orders required for possession</li>
                <li>Protection from retaliatory eviction</li>
              </ul>
            </li>
          </ul>
          
          <h4>Landlord Obligations:</h4>
          <ul>
            <li><strong>Safety Requirements:</strong>
              <ul>
                <li>Annual gas safety check</li>
                <li>Electrical safety certification (every 5 years)</li>
                <li>Fire safety measures (smoke alarms, fire doors)</li>
                <li>Energy Performance Certificate (EPC)</li>
              </ul>
            </li>
            <li><strong>Deposit Protection:</strong>
              <ul>
                <li>Must protect deposit in approved scheme</li>
                <li>Provide prescribed information within 30 days</li>
                <li>Return deposit fairly at end of tenancy</li>
              </ul>
            </li>
          </ul>
          
          <h3>Common Issues and Solutions:</h3>
          
          <h4>Guarantor Requirements:</h4>
          <ul>
            <li><strong>When Required:</strong>
              <ul>
                <li>Limited UK credit history</li>
                <li>Income below required threshold</li>
                <li>Student or new professional status</li>
                <li>Self-employed with irregular income</li>
              </ul>
            </li>
            <li><strong>Guarantor Options:</strong>
              <ul>
                <li>UK-based friend or family member</li>
                <li>Professional guarantor services</li>
                <li>International guarantor companies</li>
                <li>Advance rent payment instead of guarantor</li>
              </ul>
            </li>
          </ul>
          
          <h4>Portuguese-speaking community Solutions:</h4>
          <ul>
            <li><strong>Community References:</strong> Portuguese-speaking community leaders can provide character references</li>
            <li><strong>Portuguese Landlords:</strong> May be more flexible with requirements for Portuguese tenants</li>
            <li><strong>Portuguese Estate Agents:</strong> Understand unique challenges and have alternative solutions</li>
            <li><strong>Community Guarantor Networks:</strong> Established Portuguese residents helping newcomers</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Compreender os processos de arrendamento do Reino Unido e requisitos legais é essencial para falantes de português garantirem habitação e protegerem os seus direitos como inquilinos.</p>
          
          <h3>Processo de Candidatura a Arrendamento do Reino Unido:</h3>
          
          <h4>Passo 1: Visualização e Candidatura de Propriedade</h4>
          <ul>
            <li><strong>Preparação para Visualização:</strong>
              <ul>
                <li>Traga documentos de identificação (passaporte, visto, cartão BRP)</li>
                <li>Prepare perguntas sobre propriedade e área</li>
                <li>Tire fotos e tome notas para comparação</li>
                <li>Verifique ligações de transporte e comodidades locais</li>
                <li>Note quaisquer problemas de condição da propriedade</li>
              </ul>
            </li>
            <li><strong>Documentos de Candidatura Necessários:</strong>
              <ul>
                <li>Formulário de candidatura preenchido</li>
                <li>Identificação com foto (passaporte/carta de condução)</li>
                <li>Prova do direito de arrendar (visto/cartão BRP)</li>
                <li>Prova de rendimento (recibos de salário, contrato de emprego)</li>
                <li>Extratos bancários (3-6 meses)</li>
                <li>Referências de senhorios anteriores</li>
                <li>Relatório de crédito (pode ser solicitado pelo agente)</li>
              </ul>
            </li>
          </ul>
          
          <h4>Passo 2: Verificações do Direito de Arrendar</h4>
          <ul>
            <li><strong>Requisito Legal:</strong> Todos os inquilinos devem provar direito legal de arrendar no Reino Unido</li>
            <li><strong>Documentos Aceitáveis para Cidadãos Portugueses:</strong>
              <ul>
                <li>Passaporte português com licença indefinida para permanecer</li>
                <li>Passaporte português com visto válido do Reino Unido</li>
                <li>Cartão de Residência Biométrico (BRP)</li>
                <li>Documento do Esquema de Estabelecimento da UE (estatuto pré-estabelecido/estabelecido)</li>
              </ul>
            </li>
            <li><strong>Processo:</strong>
              <ul>
                <li>Senhorio ou agente deve ver documentos originais</li>
                <li>Farão cópias para os seus registos</li>
                <li>Processo deve ser concluído antes do arrendamento começar</li>
                <li>Falha em cumprir pode resultar em candidatura recusada</li>
              </ul>
            </li>
          </ul>
          
          <h4>Passo 3: Verificações de Crédito e Avaliação Financeira</h4>
          <ul>
            <li><strong>Processo de Verificação de Crédito:</strong>
              <ul>
                <li>A maioria dos senhorios requer verificação de crédito</li>
                <li>Novos residentes do Reino Unido podem ter histórico de crédito limitado</li>
                <li>Algumas agências especializam-se em candidaturas com crédito limitado do Reino Unido</li>
                <li>Referências bancárias portuguesas podem ser aceites como alternativa</li>
              </ul>
            </li>
            <li><strong>Requisitos de Rendimento:</strong>
              <ul>
                <li>Rendimento anual tipicamente 30-40x renda mensal</li>
                <li>Prova de emprego e salário necessária</li>
                <li>Candidatos autónomos precisam de documentação adicional</li>
                <li>Estudantes podem precisar de fiadores ou pagamento antecipado de renda</li>
              </ul>
            </li>
          </ul>
          
          <h3>Compreensão do Acordo de Arrendamento:</h3>
          
          <h4>Tipos de Acordos de Arrendamento:</h4>
          <ul>
            <li><strong>Arrendamento Garantido de Curto Prazo (AST) - Mais Comum:</strong>
              <ul>
                <li>Termo inicial normalmente 6-12 meses</li>
                <li>Pode ser estendido ou tornar-se periódico</li>
                <li>Senhorio pode recuperar posse após termo fixo</li>
                <li>Inquilino tem proteções legais contra despejo injusto</li>
              </ul>
            </li>
            <li><strong>Arrendamento Periódico:</strong>
              <ul>
                <li>Arranjo mês-a-mês ou semana-a-semana</li>
                <li>Mais flexibilidade mas menos segurança</li>
                <li>Períodos de aviso aplicam-se a ambas as partes</li>
              </ul>
            </li>
          </ul>
          
          <h4>Termos Chave do Acordo de Arrendamento:</h4>
          <ul>
            <li><strong>Renda e Termos de Pagamento:</strong>
              <ul>
                <li>Valor da renda mensal e data de vencimento</li>
                <li>Métodos de pagamento aceitáveis</li>
                <li>Penalidades por pagamento atrasado</li>
                <li>Procedimentos de aumento de renda</li>
              </ul>
            </li>
            <li><strong>Requisitos de Depósito:</strong>
              <ul>
                <li>Normalmente 1-6 semanas de renda como depósito de segurança</li>
                <li>Deve ser protegido em esquema aprovado pelo governo</li>
                <li>Condições para devolução do depósito</li>
                <li>Importância do inventário e relatório de condição</li>
              </ul>
            </li>
            <li><strong>Responsabilidades do Inquilino:</strong>
              <ul>
                <li>Manutenção e cuidado da propriedade</li>
                <li>Responsabilidades das contas de serviços públicos</li>
                <li>Obrigações do council tax</li>
                <li>Restrições sobre modificações da propriedade</li>
                <li>Políticas de hóspedes e subarrendamento</li>
              </ul>
            </li>
          </ul>
          
          <h3>Direitos Legais e Proteções:</h3>
          
          <h4>Direitos do Inquilino:</h4>
          <ul>
            <li><strong>Direito ao Usufruto Pacífico:</strong>
              <ul>
                <li>Senhorio não pode entrar sem aviso adequado (normalmente 24 horas)</li>
                <li>Proteção contra assédio</li>
                <li>Direito à privacidade na sua casa</li>
              </ul>
            </li>
            <li><strong>Direito a Propriedade Segura e Habitável:</strong>
              <ul>
                <li>Propriedade deve cumprir padrões de segurança</li>
                <li>Senhorio responsável por reparações maiores</li>
                <li>Certificados de segurança de gás e elétrica necessários</li>
                <li>Proteção contra condições de vida perigosas</li>
              </ul>
            </li>
            <li><strong>Proteção contra Despejo Injusto:</strong>
              <ul>
                <li>Períodos de aviso adequados devem ser seguidos</li>
                <li>Ordens de tribunal necessárias para posse</li>
                <li>Proteção contra despejo retaliativo</li>
              </ul>
            </li>
          </ul>
          
          <h4>Obrigações do Senhorio:</h4>
          <ul>
            <li><strong>Requisitos de Segurança:</strong>
              <ul>
                <li>Verificação anual de segurança de gás</li>
                <li>Certificação de segurança elétrica (a cada 5 anos)</li>
                <li>Medidas de segurança contra incêndios (alarmes de fumo, portas corta-fogo)</li>
                <li>Certificado de Desempenho Energético (EPC)</li>
              </ul>
            </li>
            <li><strong>Proteção de Depósito:</strong>
              <ul>
                <li>Deve proteger depósito em esquema aprovado</li>
                <li>Fornecer informação prescrita dentro de 30 dias</li>
                <li>Devolver depósito justamente no final do arrendamento</li>
              </ul>
            </li>
          </ul>
          
          <h3>Problemas Comuns e Soluções:</h3>
          
          <h4>Requisitos de Fiador:</h4>
          <ul>
            <li><strong>Quando Necessário:</strong>
              <ul>
                <li>Histórico de crédito limitado no Reino Unido</li>
                <li>Rendimento abaixo do limiar necessário</li>
                <li>Estatuto de estudante ou novo profissional</li>
                <li>Autónomo com rendimento irregular</li>
              </ul>
            </li>
            <li><strong>Opções de Fiador:</strong>
              <ul>
                <li>Amigo ou membro da família baseado no Reino Unido</li>
                <li>Serviços profissionais de fiador</li>
                <li>Empresas de fiador internacional</li>
                <li>Pagamento antecipado de renda em vez de fiador</li>
              </ul>
            </li>
          </ul>
          
          <h4>Soluções da Comunidade de Falantes de Português:</h4>
          <ul>
            <li><strong>Referências Comunitárias:</strong> Líderes da comunidade de falantes de português podem fornecer referências de carácter</li>
            <li><strong>Senhorios Portugueses:</strong> Podem ser mais flexíveis com requisitos para inquilinos portugueses</li>
            <li><strong>Agentes Imobiliários Portugueses:</strong> Compreendem desafios únicos e têm soluções alternativas</li>
            <li><strong>Redes de Fiador Comunitário:</strong> Residentes portugueses estabelecidos ajudando recém-chegados</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Gather all required documents for rental applications', textPortuguese: 'Reúna todos os documentos necessários para candidaturas de arrendamento' },
              { text: 'Check your credit score and improve if necessary', textPortuguese: 'Verifique a sua pontuação de crédito e melhore se necessário' },
              { text: 'Research deposit protection schemes in the UK', textPortuguese: 'Pesquise esquemas de proteção de depósitos no Reino Unido' },
              { text: 'Understand your rights and responsibilities as a tenant', textPortuguese: 'Compreenda os seus direitos e responsabilidades como inquilino' },
              { text: 'Find potential guarantors or guarantor services', textPortuguese: 'Encontre potenciais fiadores ou serviços de fiador' }
            ]
          }
        },
        warnings: [
          'Never sign a tenancy agreement without reading and understanding all terms',
          'Ensure your deposit is protected in a government-approved scheme',
          'Take detailed photos during move-in inventory to protect your deposit',
          'Keep records of all communications with landlords and agents'
        ],
        warningsPortuguese: [
          'Nunca assine um acordo de arrendamento sem ler e compreender todos os termos',
          'Assegure que o seu depósito está protegido num esquema aprovado pelo governo',
          'Tire fotos detalhadas durante o inventário de entrada para proteger o seu depósito',
          'Mantenha registos de todas as comunicações com senhorios e agentes'
        ]
      },
      {
        id: 'building-housing-stability',
        title: 'Building Long-term Housing Stability and Community Support',
        titlePortuguese: 'Construindo Estabilidade Habitacional a Longo Prazo e Apoio Comunitário',
        type: 'interactive',
        estimatedTime: 9,
        content: `
          <p>Building long-term housing stability requires strategic planning, community integration, and ongoing support networks within the Portuguese-speaking community in London.</p>
          
          <h3>Long-term Housing Planning Strategy:</h3>
          
          <h4>1. Housing Progression Pathway</h4>
          <ul>
            <li><strong>Stage 1: Initial Settlement (0-12 months)</strong>
              <ul>
                <li>House shares or studio apartments</li>
                <li>Focus on location and transport links</li>
                <li>Build UK credit history and references</li>
                <li>Establish employment and income stability</li>
                <li>Connect with Portuguese-speaking community for support</li>
              </ul>
            </li>
            <li><strong>Stage 2: Stability Building (1-3 years)</strong>
              <ul>
                <li>One-bedroom apartment or better house share</li>
                <li>Develop long-term rental relationships</li>
                <li>Build savings for deposits and emergencies</li>
                <li>Strengthen community networks and references</li>
                <li>Consider areas for long-term settling</li>
              </ul>
            </li>
            <li><strong>Stage 3: Long-term Settlement (3+ years)</strong>
              <ul>
                <li>Family-sized accommodation or property purchase</li>
                <li>Established neighborhood connections</li>
                <li>Property ownership consideration</li>
                <li>Contributing to Portuguese-speaking community housing support</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Financial Planning for Housing Stability</h4>
          <ul>
            <li><strong>Emergency Housing Fund:</strong>
              <ul>
                <li>Save 3-6 months of rent for emergencies</li>
                <li>Set aside funds for potential deposit forfeitures</li>
                <li>Plan for unexpected housing moves</li>
                <li>Consider Portuguese-speaking community emergency support networks</li>
              </ul>
            </li>
            <li><strong>Housing Upgrade Planning:</strong>
              <ul>
                <li>Budget for improved housing over time</li>
                <li>Save for larger deposits on better properties</li>
                <li>Plan income growth to support housing improvements</li>
                <li>Consider shared ownership or purchase options</li>
              </ul>
            </li>
            <li><strong>Portuguese Banking Integration:</strong>
              <ul>
                <li>Maintain Portuguese bank accounts for flexibility</li>
                <li>Use Portuguese bank UK services where available</li>
                <li>Build credit history in both countries</li>
                <li>Consider international mortgage options</li>
              </ul>
            </li>
          </ul>
          
          <h3>Community Integration for Housing Security:</h3>
          
          <h4>1. Neighborhood Portuguese-speaking community Building</h4>
          <ul>
            <li><strong>Local Portuguese Networks:</strong>
              <ul>
                <li>Connect with Portuguese neighbors and families</li>
                <li>Join local Portuguese WhatsApp groups</li>
                <li>Participate in neighborhood Portuguese activities</li>
                <li>Support Portuguese local businesses</li>
              </ul>
            </li>
            <li><strong>Multi-cultural Community Integration:</strong>
              <ul>
                <li>Build relationships with non-Portuguese neighbors</li>
                <li>Participate in local community events</li>
                <li>Engage with local councils and representatives</li>
                <li>Contribute to neighborhood improvements</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Portuguese-speaking community Support Networks</h4>
          <ul>
            <li><strong>Mentorship and Guidance:</strong>
              <ul>
                <li>Connect with established Portuguese families</li>
                <li>Seek advice from Portuguese homeowners</li>
                <li>Learn from Portuguese landlords and property professionals</li>
                <li>Share experiences with other Portuguese newcomers</li>
              </ul>
            </li>
            <li><strong>Practical Support Systems:</strong>
              <ul>
                <li>Portuguese moving and logistics support</li>
                <li>Shared resources for furniture and household items</li>
                <li>Portuguese tradespeople and maintenance contacts</li>
                <li>Emergency accommodation networks</li>
              </ul>
            </li>
          </ul>
          
          <h3>Housing Rights and Advocacy:</h3>
          
          <h4>1. Understanding and Protecting Your Rights</h4>
          <ul>
            <li><strong>Tenant Rights Education:</strong>
              <ul>
                <li>Regularly update knowledge of UK tenant rights</li>
                <li>Understand deposit protection and return processes</li>
                <li>Know eviction procedures and protection measures</li>
                <li>Learn about rent increase limitations and procedures</li>
              </ul>
            </li>
            <li><strong>Documentation and Record Keeping:</strong>
              <ul>
                <li>Maintain organized records of all housing documents</li>
                <li>Keep communication records with landlords and agents</li>
                <li>Document property condition with photos and dates</li>
                <li>Store important documents securely and accessibly</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Portuguese-speaking community Advocacy</h4>
          <ul>
            <li><strong>Collective Voice for Housing Issues:</strong>
              <ul>
                <li>Participate in Portuguese-speaking community housing forums</li>
                <li>Support fair housing initiatives for immigrants</li>
                <li>Share experiences to help improve community housing access</li>
                <li>Advocate for Portuguese-friendly housing policies</li>
              </ul>
            </li>
            <li><strong>Supporting Other Portuguese Tenants:</strong>
              <ul>
                <li>Share knowledge about tenant rights with others</li>
                <li>Provide translation help for housing documents</li>
                <li>Offer moral support during housing difficulties</li>
                <li>Connect struggling tenants with appropriate resources</li>
              </ul>
            </li>
          </ul>
          
          <h3>Property Ownership Pathway:</h3>
          
          <h4>1. Transition from Renting to Buying</h4>
          <ul>
            <li><strong>Financial Preparation:</strong>
              <ul>
                <li>Build substantial deposit (typically 5-20% of property value)</li>
                <li>Establish strong UK credit history</li>
                <li>Maintain stable employment for mortgage applications</li>
                <li>Consider government first-time buyer schemes</li>
              </ul>
            </li>
            <li><strong>Property Search Strategy:</strong>
              <ul>
                <li>Research Portuguese-friendly areas for investment</li>
                <li>Consider properties near Portuguese-speaking community hubs</li>
                <li>Evaluate transport links and future development plans</li>
                <li>Assess potential for property value growth</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Portuguese-speaking community Property Support</h4>
          <ul>
            <li><strong>Portuguese Property Professionals:</strong>
              <ul>
                <li>Mortgage advisors who understand Portuguese financial situations</li>
                <li>Estate agents specializing in Portuguese-speaking community needs</li>
                <li>Solicitors with Portuguese language skills</li>
                <li>Portuguese surveyors and property inspectors</li>
              </ul>
            </li>
            <li><strong>Community Property Investment:</strong>
              <ul>
                <li>Group purchasing opportunities with other Portuguese families</li>
                <li>Shared ownership arrangements within the community</li>
                <li>Portuguese-speaking community property investment clubs</li>
                <li>Inter-generational property planning and support</li>
              </ul>
            </li>
          </ul>
          
          <h3>Giving Back to the Portuguese Housing Community:</h3>
          
          <h4>1. Mentoring New Arrivals</h4>
          <ul>
            <li><strong>Sharing Your Experience:</strong>
              <ul>
                <li>Guide newcomers through housing processes</li>
                <li>Share lessons learned from your housing journey</li>
                <li>Provide practical tips for different London areas</li>
                <li>Offer emotional support during housing transitions</li>
              </ul>
            </li>
            <li><strong>Practical Support:</strong>
              <ul>
                <li>Help with property viewings and area orientation</li>
                <li>Assist with housing document translation and understanding</li>
                <li>Provide character references for trustworthy community members</li>
                <li>Share contacts for reliable Portuguese housing services</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Community Housing Initiatives</h4>
          <ul>
            <li><strong>Organizing Housing Support:</strong>
              <ul>
                <li>Establish formal Portuguese housing support groups</li>
                <li>Create resource databases for Portuguese housing services</li>
                <li>Organize housing workshops and information sessions</li>
                <li>Advocate for improved housing policies affecting Portuguese-speaking community</li>
              </ul>
            </li>
            <li><strong>Building Long-term Community Assets:</strong>
              <ul>
                <li>Support development of Portuguese-speaking community centers</li>
                <li>Contribute to Portuguese-speaking community housing funds</li>
                <li>Help establish Portuguese housing cooperatives</li>
                <li>Work toward sustainable Portuguese-speaking community growth in London</li>
              </ul>
            </li>
          </ul>
          
          <p><strong>Transportation Integration:</strong> As you establish housing stability, our professional transport service remains available as a separate service for any housing-related needs such as property viewings, moving assistance, or accessing housing services across London.</p>
        `,
        contentPortuguese: `
          <p>Construir estabilidade habitacional a longo prazo requer planeamento estratégico, integração comunitária e redes de apoio contínuas dentro da comunidade de falantes de português em Londres.</p>
          
          <h3>Estratégia de Planeamento Habitacional a Longo Prazo:</h3>
          
          <h4>1. Caminho de Progressão Habitacional</h4>
          <ul>
            <li><strong>Fase 1: Estabelecimento Inicial (0-12 meses)</strong>
              <ul>
                <li>Partilhas de casa ou apartamentos estúdio</li>
                <li>Foco na localização e ligações de transporte</li>
                <li>Construir histórico de crédito do Reino Unido e referências</li>
                <li>Estabelecer estabilidade de emprego e rendimento</li>
                <li>Conectar com a comunidade de falantes de português para apoio</li>
              </ul>
            </li>
            <li><strong>Fase 2: Construção de Estabilidade (1-3 anos)</strong>
              <ul>
                <li>Apartamento de um quarto ou melhor partilha de casa</li>
                <li>Desenvolver relacionamentos de arrendamento de longo prazo</li>
                <li>Construir poupanças para depósitos e emergências</li>
                <li>Fortalecer redes comunitárias e referências</li>
                <li>Considerar áreas para estabelecimento de longo prazo</li>
              </ul>
            </li>
            <li><strong>Fase 3: Estabelecimento de Longo Prazo (3+ anos)</strong>
              <ul>
                <li>Acomodação de tamanho familiar ou compra de propriedade</li>
                <li>Conexões de bairro estabelecidas</li>
                <li>Consideração de propriedade imobiliária</li>
                <li>Contribuir para apoio habitacional da comunidade de falantes de português</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Planeamento Financeiro para Estabilidade Habitacional</h4>
          <ul>
            <li><strong>Fundo Habitacional de Emergência:</strong>
              <ul>
                <li>Poupar 3-6 meses de renda para emergências</li>
                <li>Reservar fundos para potenciais perdas de depósito</li>
                <li>Planear para mudanças habitacionais inesperadas</li>
                <li>Considerar redes de apoio de emergência da comunidade de falantes de português</li>
              </ul>
            </li>
            <li><strong>Planeamento de Melhoria Habitacional:</strong>
              <ul>
                <li>Orçamentar para habitação melhorada ao longo do tempo</li>
                <li>Poupar para depósitos maiores em propriedades melhores</li>
                <li>Planear crescimento de rendimento para apoiar melhorias habitacionais</li>
                <li>Considerar opções de propriedade partilhada ou compra</li>
              </ul>
            </li>
            <li><strong>Integração Bancária Portuguesa:</strong>
              <ul>
                <li>Manter contas bancárias portuguesas para flexibilidade</li>
                <li>Usar serviços portugueses do Reino Unido onde disponíveis</li>
                <li>Construir histórico de crédito em ambos os países</li>
                <li>Considerar opções de hipoteca internacional</li>
              </ul>
            </li>
          </ul>
          
          <h3>Integração Comunitária para Segurança Habitacional:</h3>
          
          <h4>1. Construção de Comunidade de Falantes de Português de Bairro</h4>
          <ul>
            <li><strong>Redes Portuguesas Locais:</strong>
              <ul>
                <li>Conectar com vizinhos e famílias portuguesas</li>
                <li>Juntar-se a grupos locais portugueses do WhatsApp</li>
                <li>Participar em atividades portuguesas do bairro</li>
                <li>Apoiar negócios locais portugueses</li>
              </ul>
            </li>
            <li><strong>Integração Comunitária Multicultural:</strong>
              <ul>
                <li>Construir relacionamentos com vizinhos não-portugueses</li>
                <li>Participar em eventos comunitários locais</li>
                <li>Envolver-se com conselhos e representantes locais</li>
                <li>Contribuir para melhorias do bairro</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Redes de Apoio da Comunidade de Falantes de Português</h4>
          <ul>
            <li><strong>Mentoria e Orientação:</strong>
              <ul>
                <li>Conectar com famílias portuguesas estabelecidas</li>
                <li>Procurar aconselhamento de proprietários portugueses</li>
                <li>Aprender com senhorios e profissionais de propriedades portugueses</li>
                <li>Partilhar experiências com outros recém-chegados portugueses</li>
              </ul>
            </li>
            <li><strong>Sistemas de Apoio Prático:</strong>
              <ul>
                <li>Apoio português para mudanças e logística</li>
                <li>Recursos partilhados para mobília e itens domésticos</li>
                <li>Contactos de comerciantes e manutenção portugueses</li>
                <li>Redes de acomodação de emergência</li>
              </ul>
            </li>
          </ul>
          
          <h3>Direitos Habitacionais e Advocacia:</h3>
          
          <h4>1. Compreender e Proteger os Seus Direitos</h4>
          <ul>
            <li><strong>Educação sobre Direitos de Inquilinos:</strong>
              <ul>
                <li>Atualizar regularmente conhecimento dos direitos de inquilinos do Reino Unido</li>
                <li>Compreender proteção de depósito e processos de devolução</li>
                <li>Conhecer procedimentos de despejo e medidas de proteção</li>
                <li>Aprender sobre limitações e procedimentos de aumento de renda</li>
              </ul>
            </li>
            <li><strong>Documentação e Manutenção de Registos:</strong>
              <ul>
                <li>Manter registos organizados de todos os documentos habitacionais</li>
                <li>Manter registos de comunicação com senhorios e agentes</li>
                <li>Documentar condição da propriedade com fotos e datas</li>
                <li>Armazenar documentos importantes de forma segura e acessível</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Advocacia da Comunidade de Falantes de Português</h4>
          <ul>
            <li><strong>Voz Coletiva para Questões Habitacionais:</strong>
              <ul>
                <li>Participar em fóruns habitacionais da comunidade de falantes de português</li>
                <li>Apoiar iniciativas de habitação justa para imigrantes</li>
                <li>Partilhar experiências para ajudar a melhorar o acesso habitacional comunitário</li>
                <li>Advogar por políticas habitacionais amigáveis aos portugueses</li>
              </ul>
            </li>
            <li><strong>Apoiar Outros Inquilinos Portugueses:</strong>
              <ul>
                <li>Partilhar conhecimento sobre direitos de inquilinos com outros</li>
                <li>Fornecer ajuda de tradução para documentos habitacionais</li>
                <li>Oferecer apoio moral durante dificuldades habitacionais</li>
                <li>Conectar inquilinos em dificuldades com recursos apropriados</li>
              </ul>
            </li>
          </ul>
          
          <h3>Caminho para Propriedade Imobiliária:</h3>
          
          <h4>1. Transição de Arrendamento para Compra</h4>
          <ul>
            <li><strong>Preparação Financeira:</strong>
              <ul>
                <li>Construir depósito substancial (tipicamente 5-20% do valor da propriedade)</li>
                <li>Estabelecer forte histórico de crédito do Reino Unido</li>
                <li>Manter emprego estável para candidaturas hipotecárias</li>
                <li>Considerar esquemas governamentais para compradores de primeira vez</li>
              </ul>
            </li>
            <li><strong>Estratégia de Procura de Propriedade:</strong>
              <ul>
                <li>Pesquisar áreas amigáveis aos portugueses para investimento</li>
                <li>Considerar propriedades perto de centros comunitários portugueses</li>
                <li>Avaliar ligações de transporte e planos de desenvolvimento futuro</li>
                <li>Avaliar potencial para crescimento do valor da propriedade</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Apoio de Propriedade da Comunidade de Falantes de Português</h4>
          <ul>
            <li><strong>Profissionais de Propriedade Portugueses:</strong>
              <ul>
                <li>Conselheiros hipotecários que compreendem situações financeiras portuguesas</li>
                <li>Agentes imobiliários especializados em necessidades da comunidade de falantes de português</li>
                <li>Advogados com competências em língua portuguesa</li>
                <li>Avaliadores e inspetores de propriedade portugueses</li>
              </ul>
            </li>
            <li><strong>Investimento Comunitário em Propriedade:</strong>
              <ul>
                <li>Oportunidades de compra em grupo com outras famílias portuguesas</li>
                <li>Arranjos de propriedade partilhada dentro da comunidade</li>
                <li>Clubes de investimento imobiliário da comunidade de falantes de português</li>
                <li>Planeamento e apoio imobiliário intergeracional</li>
              </ul>
            </li>
          </ul>
          
          <h3>Retribuindo à Comunidade Habitacional Portuguesa:</h3>
          
          <h4>1. Mentorar Recém-chegados</h4>
          <ul>
            <li><strong>Partilhar a Sua Experiência:</strong>
              <ul>
                <li>Orientar recém-chegados através de processos habitacionais</li>
                <li>Partilhar lições aprendidas da sua jornada habitacional</li>
                <li>Fornecer dicas práticas para diferentes áreas de Londres</li>
                <li>Oferecer apoio emocional durante transições habitacionais</li>
              </ul>
            </li>
            <li><strong>Apoio Prático:</strong>
              <ul>
                <li>Ajudar com visualizações de propriedades e orientação de área</li>
                <li>Assistir com tradução e compreensão de documentos habitacionais</li>
                <li>Fornecer referências de carácter para membros comunitários confiáveis</li>
                <li>Partilhar contactos para serviços habitacionais portugueses confiáveis</li>
              </ul>
            </li>
          </ul>
          
          <h4>2. Iniciativas Habitacionais Comunitárias</h4>
          <ul>
            <li><strong>Organizar Apoio Habitacional:</strong>
              <ul>
                <li>Estabelecer grupos formais de apoio habitacional português</li>
                <li>Criar bases de dados de recursos para serviços habitacionais portugueses</li>
                <li>Organizar workshops habitacionais e sessões de informação</li>
                <li>Advogar por políticas habitacionais melhoradas que afetem a comunidade de falantes de português</li>
              </ul>
            </li>
            <li><strong>Construir Ativos Comunitários de Longo Prazo:</strong>
              <ul>
                <li>Apoiar desenvolvimento de centros comunitários portugueses</li>
                <li>Contribuir para fundos habitacionais da comunidade de falantes de português</li>
                <li>Ajudar a estabelecer cooperativas habitacionais portuguesas</li>
                <li>Trabalhar para crescimento sustentável da comunidade de falantes de português em Londres</li>
              </ul>
            </li>
          </ul>
          
          <p><strong>Integração de Transporte:</strong> Ao estabelecer estabilidade habitacional, o nosso serviço de transporte profissional permanece disponível como um serviço separado para quaisquer necessidades relacionadas com habitação, como visualizações de propriedades, assistência de mudança ou acesso a serviços habitacionais em Londres.</p>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Create a 5-year housing progression plan', textPortuguese: 'Crie um plano de progressão habitacional de 5 anos' },
              { text: 'Build an emergency housing fund (3-6 months rent)', textPortuguese: 'Construa um fundo habitacional de emergência (3-6 meses de renda)' },
              { text: 'Connect with established Portuguese families in your area', textPortuguese: 'Conecte-se com famílias portuguesas estabelecidas na sua área' },
              { text: 'Research first-time buyer schemes and mortgage options', textPortuguese: 'Pesquise esquemas de comprador de primeira vez e opções de hipoteca' },
              { text: 'Volunteer to help other Portuguese newcomers with housing', textPortuguese: 'Voluntarie-se para ajudar outros recém-chegados portugueses com habitação' },
              { text: 'Document your housing journey to share lessons learned', textPortuguese: 'Documente a sua jornada habitacional para partilhar lições aprendidas' }
            ]
          }
        },
        tips: [
          'Build relationships with your current landlord for future references',
          'Keep detailed records of all housing experiences for future applications',
          'Consider house-sitting opportunities for Portuguese families going to Portugal'
        ],
        tipsPortuguese: [
          'Construa relacionamentos com o seu senhorio atual para referências futuras',
          'Mantenha registos detalhados de todas as experiências habitacionais para candidaturas futuras',
          'Considere oportunidades de cuidar de casa para famílias portuguesas que vão a Portugal'
        ]
      }
    ],
    practicalExercises: [],
    resources: [
      {
        title: 'UK Tenant Rights and Responsibilities Guide',
        titlePortuguese: 'Guia de Direitos e Responsabilidades de Inquilinos do Reino Unido',
        url: '/downloads/uk-tenant-rights-guide.pdf',
        type: 'download'
      },
      {
        title: 'Portuguese Housing Support Directory London',
        titlePortuguese: 'Diretório de Apoio Habitacional Português Londres',
        url: '/housing/portuguese-support-directory',
        type: 'guide'
      },
      {
        title: 'Rental Application Checklist and Templates',
        titlePortuguese: 'Lista de Verificação e Modelos de Candidatura de Arrendamento',
        url: '/downloads/rental-application-templates.pdf',
        type: 'download'
      },
      {
        title: 'London Portuguese Areas Housing Guide',
        titlePortuguese: 'Guia Habitacional das Áreas Portuguesas de Londres',
        url: '/guides/portuguese-areas-london',
        type: 'external'
      }
    ]
  };

  return (
    <LearningModuleFramework
      module={housingAssistanceModule}
      onComplete={handleModuleComplete}
      onStepComplete={handleStepComplete}
      completedSteps={completedSteps}
      showProgress={true}
    />
  );
}