'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin, Shield, Clock, Star, Phone, CreditCard, Route } from 'lucide-react';
import LearningModuleFramework, { LearningModule, LearningStep } from '@/components/academy/LearningModuleFramework';
import { useLanguage } from '@/context/LanguageContext';

export default function TransportChauffeurModule() {
  const { language } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const isPortuguese = language === 'pt';

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lusotown-academy-transport-chauffeur-progress');
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
      localStorage.setItem('lusotown-academy-transport-chauffeur-progress', JSON.stringify({
        completedSteps: newCompleted,
        lastAccess: Date.now()
      }));
    }
  };

  const handleModuleComplete = () => {
    // Module completion logic
    console.log('Transport & Chauffeur module completed!');
  };

  // Define the learning module structure
  const transportModule: LearningModule = {
    id: 'transport-chauffeur',
    title: 'Transport & Chauffeur',
    titlePortuguese: 'Transporte e Motorista',
    description: 'Learn to use premium Portuguese-speaking transport services in London safely and efficiently',
    descriptionPortuguese: 'Aprenda a usar serviços de transporte premium com falantes de português em Londres de forma segura e eficiente',
    difficulty: 'Beginner',
    estimatedTime: 15,
    icon: Car,
    category: 'Services',
    categoryPortuguese: 'Serviços',
    prerequisites: ['Active LusoTown membership', 'Basic understanding of London geography'],
    prerequisitesPortuguese: ['Membro ativo da LusoTown', 'Compreensão básica da geografia de Londres'],
    learningObjectives: [
      'Understand premium transport service offerings',
      'Book Portuguese-speaking chauffeurs effectively',
      'Navigate pricing and membership benefits',
      'Ensure safety and security protocols',
      'Use mobile app and booking features',
      'Handle special requirements and requests'
    ],
    learningObjectivesPortuguese: [
      'Entender ofertas de serviços de transporte premium',
      'Reservar motoristas que falam português efetivamente',
      'Navegar preços e benefícios de membro',
      'Garantir protocolos de segurança e proteção',
      'Usar app móvel e funcionalidades de reserva',
      'Lidar com requisitos especiais e pedidos'
    ],
    steps: [
      {
        id: 'service-overview',
        title: 'LusoTown Premium Transport Services Overview',
        titlePortuguese: 'Visão Geral dos Serviços de Transporte Premium LusoTown',
        type: 'introduction',
        estimatedTime: 3,
        content: `
          <p>LusoTown Premium Transport connects you with professional Portuguese-speaking chauffeurs across London, offering a luxury alternative to standard ride services.</p>
          
          <h3>What Makes LusoTown Transport Special:</h3>
          <ul>
            <li><strong>Portuguese-Speaking Drivers:</strong> All chauffeurs speak Portuguese fluently and understand cultural nuances</li>
            <li><strong>SIA-Compliant Security:</strong> Drivers are SIA (Security Industry Authority) licensed for executive protection</li>
            <li><strong>Professional Fleet:</strong> Modern, well-maintained vehicles with professional standards</li>
            <li><strong>Cultural Comfort:</strong> Drivers understand Portuguese business culture, social customs, and can assist with cultural navigation</li>
            <li><strong>London Expertise:</strong> Extensive knowledge of London's Portuguese community, businesses, and cultural venues</li>
          </ul>
          
          <h3>Service Categories Available:</h3>
          
          <h4>1. Executive Chauffeur (£45-65/hour)</h4>
          <ul>
            <li>Business meetings and corporate events</li>
            <li>Airport transfers with meet & greet</li>
            <li>Portuguese business district navigation</li>
            <li>Multilingual communication support</li>
          </ul>
          
          <h4>2. Personal Security Driver (£65-85/hour)</h4>
          <ul>
            <li>SIA-licensed close protection officers</li>
            <li>High-value asset protection</li>
            <li>Threat assessment and route planning</li>
            <li>Discreet personal security services</li>
          </ul>
          
          <h4>3. Cultural & Social Transport (£35-50/hour)</h4>
          <ul>
            <li>Portuguese restaurant and venue tours</li>
            <li>Cultural event transportation</li>
            <li>Community gathering pickups</li>
            <li>Social occasion chauffeur services</li>
          </ul>
          
          <h4>4. Airport & Travel Services (Fixed rates)</h4>
          <ul>
            <li>Heathrow: £65-85 (depending on terminal)</li>
            <li>Gatwick: £75-95</li>
            <li>City Airport: £45-55</li>
            <li>Stansted/Luton: £85-105</li>
          </ul>
          
          <h3>Membership Benefits:</h3>
          <ul>
            <li><strong>Priority Booking:</strong> Guaranteed availability with 2-hour notice</li>
            <li><strong>Discounted Rates:</strong> 15-25% off standard pricing</li>
            <li><strong>Portuguese Cultural Concierge:</strong> Recommendations for Portuguese events, restaurants, services</li>
            <li><strong>24/7 Portuguese Support:</strong> Customer service available in Portuguese</li>
          </ul>
          
          <h3>Coverage Areas:</h3>
          <p>Full London coverage with specialized knowledge of:</p>
          <ul>
            <li>Portuguese business districts (Canary Wharf, City, West End)</li>
            <li>Portuguese residential areas (Vauxhall, Stockwell, Golborne Road)</li>
            <li>Portuguese cultural venues and restaurants</li>
            <li>Major airports and transport hubs</li>
            <li>Extended coverage to Portuguese communities in surrounding areas</li>
          </ul>
        `,
        contentPortuguese: `
          <p>O Transporte Premium LusoTown conecta-o com motoristas profissionais que falam português em Londres, oferecendo uma alternativa de luxo aos serviços de transporte padrão.</p>
          
          <h3>O Que Torna o Transporte LusoTown Especial:</h3>
          <ul>
            <li><strong>Motoristas que Falam Português:</strong> Todos os motoristas falam português fluentemente e entendem nuances culturais</li>
            <li><strong>Segurança Conforme SIA:</strong> Motoristas são licenciados pela SIA (Security Industry Authority) para proteção executiva</li>
            <li><strong>Frota Profissional:</strong> Veículos modernos e bem mantidos com padrões profissionais</li>
            <li><strong>Conforto Cultural:</strong> Motoristas entendem cultura empresarial portuguesa, costumes sociais e podem ajudar com navegação cultural</li>
            <li><strong>Experiência em Londres:</strong> Conhecimento extenso da comunidade portuguesa de Londres, negócios e locais culturais</li>
          </ul>
          
          <h3>Categorias de Serviço Disponíveis:</h3>
          
          <h4>1. Motorista Executivo (£45-65/hora)</h4>
          <ul>
            <li>Reuniões de negócios e eventos corporativos</li>
            <li>Transferências do aeroporto com encontro e saudação</li>
            <li>Navegação do distrito empresarial português</li>
            <li>Suporte de comunicação multilingue</li>
          </ul>
          
          <h4>2. Motorista de Segurança Pessoal (£65-85/hora)</h4>
          <ul>
            <li>Oficiais de proteção próxima licenciados pela SIA</li>
            <li>Proteção de ativos de alto valor</li>
            <li>Avaliação de ameaças e planeamento de rotas</li>
            <li>Serviços de segurança pessoal discretos</li>
          </ul>
          
          <h4>3. Transporte Cultural e Social (£35-50/hora)</h4>
          <ul>
            <li>Tours de restaurantes e locais portugueses</li>
            <li>Transporte para eventos culturais</li>
            <li>Pickups para encontros comunitários</li>
            <li>Serviços de motorista para ocasiões sociais</li>
          </ul>
          
          <h4>4. Serviços de Aeroporto e Viagem (Tarifas fixas)</h4>
          <ul>
            <li>Heathrow: £65-85 (dependendo do terminal)</li>
            <li>Gatwick: £75-95</li>
            <li>City Airport: £45-55</li>
            <li>Stansted/Luton: £85-105</li>
          </ul>
          
          <h3>Benefícios de Membro:</h3>
          <ul>
            <li><strong>Reserva Prioritária:</strong> Disponibilidade garantida com aviso de 2 horas</li>
            <li><strong>Tarifas com Desconto:</strong> 15-25% de desconto nos preços padrão</li>
            <li><strong>Concierge Cultural Português:</strong> Recomendações para eventos, restaurantes, serviços portugueses</li>
            <li><strong>Apoio Português 24/7:</strong> Atendimento ao cliente disponível em português</li>
          </ul>
          
          <h3>Áreas de Cobertura:</h3>
          <p>Cobertura completa de Londres com conhecimento especializado de:</p>
          <ul>
            <li>Distritos empresariais portugueses (Canary Wharf, City, West End)</li>
            <li>Áreas residenciais portuguesas (Vauxhall, Stockwell, Golborne Road)</li>
            <li>Locais culturais e restaurantes portugueses</li>
            <li>Principais aeroportos e hubs de transporte</li>
            <li>Cobertura estendida para comunidades portuguesas em áreas circundantes</li>
          </ul>
        `,
        tips: [
          'Book 24 hours in advance for guaranteed availability',
          'Specify Portuguese language preference when booking',
          'Mention any cultural requirements or preferences',
          'Keep membership status active for best rates and priority service'
        ],
        tipsPortuguese: [
          'Reserve com 24 horas de antecedência para disponibilidade garantida',
          'Especifique preferência de língua portuguesa ao reservar',
          'Mencione quaisquer requisitos culturais ou preferências',
          'Mantenha status de membro ativo para melhores tarifas e serviço prioritário'
        ]
      },
      {
        id: 'booking-process',
        title: 'How to Book Your Portuguese-Speaking Chauffeur',
        titlePortuguese: 'Como Reservar o Seu Motorista que Fala Português',
        type: 'tutorial',
        estimatedTime: 5,
        content: `
          <p>Booking your Portuguese-speaking chauffeur is simple through multiple channels. Here's your step-by-step guide:</p>
          
          <h3>Booking Methods Available:</h3>
          
          <h4>1. LusoTown Mobile App (Recommended)</h4>
          <ol>
            <li><strong>Download & Setup:</strong>
              <ul>
                <li>Download "LusoTown" app from App Store/Google Play</li>
                <li>Log in with your LusoTown account</li>
                <li>Enable location services for pickup accuracy</li>
                <li>Set language preference to Portuguese</li>
              </ul>
            </li>
            
            <li><strong>Select Transport Service:</strong>
              <ul>
                <li>Tap "Transport" from main menu</li>
                <li>Choose service category (Executive, Security, Cultural, Airport)</li>
                <li>Select "Portuguese-speaking driver required"</li>
                <li>View available chauffeurs with Portuguese profiles</li>
              </ul>
            </li>
            
            <li><strong>Journey Details:</strong>
              <ul>
                <li>Enter pickup location (or use "Current Location")</li>
                <li>Set destination address</li>
                <li>Choose pickup date and time</li>
                <li>Specify journey type (one-way, return, hourly)</li>
              </ul>
            </li>
            
            <li><strong>Chauffeur Selection:</strong>
              <ul>
                <li>Review available Portuguese-speaking drivers</li>
                <li>Check driver profiles, ratings, and Portuguese language level</li>
                <li>Read previous customer reviews in Portuguese</li>
                <li>Select preferred chauffeur or allow auto-assignment</li>
              </ul>
            </li>
            
            <li><strong>Special Requirements:</strong>
              <ul>
                <li>Add special requests (Portuguese cultural music, specific route preferences)</li>
                <li>Specify any mobility requirements</li>
                <li>Request Portuguese-language assistance for destinations</li>
                <li>Add notes about cultural preferences or business requirements</li>
              </ul>
            </li>
          </ol>
          
          <h4>2. Website Booking (lusotown.com/transport)</h4>
          <ul>
            <li>Similar process to mobile app</li>
            <li>Full desktop interface with map integration</li>
            <li>Detailed driver profiles and Portuguese language certificates</li>
            <li>Corporate booking options for business accounts</li>
          </ul>
          
          <h4>3. Phone Booking (24/7 Portuguese Support)</h4>
          <ul>
            <li><strong>Portuguese Line:</strong> +44 20 XXXX XXXX</li>
            <li><strong>Available:</strong> 24/7 with Portuguese-speaking operators</li>
            <li><strong>Best For:</strong> Complex bookings, group transport, security requirements</li>
            <li><strong>Services:</strong> Complete booking assistance in Portuguese</li>
          </ul>
          
          <h3>Pricing Structure & Payment:</h3>
          
          <h4>Hourly Rate Structure:</h4>
          <table class="w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-2">Service Type</th>
                <th class="border border-gray-300 p-2">Standard Rate</th>
                <th class="border border-gray-300 p-2">Member Rate</th>
                <th class="border border-gray-300 p-2">Minimum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-2">Cultural/Social</td>
                <td class="border border-gray-300 p-2">£35-50/hour</td>
                <td class="border border-gray-300 p-2">£30-42/hour</td>
                <td class="border border-gray-300 p-2">2 hours</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">Executive</td>
                <td class="border border-gray-300 p-2">£45-65/hour</td>
                <td class="border border-gray-300 p-2">£38-55/hour</td>
                <td class="border border-gray-300 p-2">2 hours</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">Security</td>
                <td class="border border-gray-300 p-2">£65-85/hour</td>
                <td class="border border-gray-300 p-2">£55-72/hour</td>
                <td class="border border-gray-300 p-2">3 hours</td>
              </tr>
            </tbody>
          </table>
          
          <h4>Additional Charges:</h4>
          <ul>
            <li><strong>Waiting Time:</strong> £15/hour after 15-minute grace period</li>
            <li><strong>Congestion Charge:</strong> £15 (when applicable)</li>
            <li><strong>Parking Fees:</strong> Actual cost (when required)</li>
            <li><strong>Out-of-Hours Premium:</strong> 25% surcharge (11pm-6am)</li>
            <li><strong>Short Notice Booking:</strong> 20% surcharge (less than 2 hours notice)</li>
          </ul>
          
          <h3>Payment Methods:</h3>
          <ul>
            <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard, Amex</li>
            <li><strong>Digital Payments:</strong> Apple Pay, Google Pay, PayPal</li>
            <li><strong>Corporate Accounts:</strong> Monthly billing with Portuguese invoicing</li>
            <li><strong>Cash:</strong> Accepted for same-day bookings only</li>
          </ul>
          
          <h3>Booking Confirmation & Communication:</h3>
          
          <h4>Confirmation Process:</h4>
          <ol>
            <li><strong>Immediate Confirmation:</strong> Booking reference number sent via SMS/email</li>
            <li><strong>Driver Assignment:</strong> Driver details shared 30-60 minutes before pickup</li>
            <li><strong>Portuguese Communication:</strong> All communications available in Portuguese</li>
            <li><strong>Real-time Updates:</strong> Driver location tracking and ETA updates</li>
          </ol>
          
          <h4>What You'll Receive:</h4>
          <ul>
            <li>Driver name and photo</li>
            <li>Portuguese language proficiency level</li>
            <li>Vehicle details (make, model, color, license plate)</li>
            <li>Driver contact number (Portuguese-speaking)</li>
            <li>Estimated arrival time with live tracking</li>
          </ul>
          
          <h3>Cancellation & Modification Policy:</h3>
          <ul>
            <li><strong>Free Cancellation:</strong> Up to 2 hours before pickup</li>
            <li><strong>Modifications:</strong> Route, time, or requirements can be changed up to 1 hour before</li>
            <li><strong>Late Cancellation:</strong> 50% charge for cancellations within 2 hours</li>
            <li><strong>No-Show:</strong> Full charge applies</li>
            <li><strong>Weather/Emergency:</strong> Flexible cancellation policy for extreme circumstances</li>
          </ul>
        `,
        contentPortuguese: `
          <p>Reservar o seu motorista que fala português é simples através de múltiplos canais. Aqui está o seu guia passo a passo:</p>
          
          <h3>Métodos de Reserva Disponíveis:</h3>
          
          <h4>1. App Móvel LusoTown (Recomendado)</h4>
          <ol>
            <li><strong>Download e Configuração:</strong>
              <ul>
                <li>Descarregar app "LusoTown" da App Store/Google Play</li>
                <li>Fazer login com a sua conta LusoTown</li>
                <li>Ativar serviços de localização para precisão de pickup</li>
                <li>Definir preferência de idioma para português</li>
              </ul>
            </li>
            
            <li><strong>Selecionar Serviço de Transporte:</strong>
              <ul>
                <li>Tocar "Transporte" do menu principal</li>
                <li>Escolher categoria de serviço (Executivo, Segurança, Cultural, Aeroporto)</li>
                <li>Selecionar "Motorista que fala português obrigatório"</li>
                <li>Ver motoristas disponíveis com perfis portugueses</li>
              </ul>
            </li>
            
            <li><strong>Detalhes da Viagem:</strong>
              <ul>
                <li>Inserir localização de pickup (ou usar "Localização Atual")</li>
                <li>Definir endereço de destino</li>
                <li>Escolher data e hora de pickup</li>
                <li>Especificar tipo de viagem (ida, ida e volta, por hora)</li>
              </ul>
            </li>
            
            <li><strong>Seleção de Motorista:</strong>
              <ul>
                <li>Rever motoristas disponíveis que falam português</li>
                <li>Verificar perfis de motoristas, classificações e nível de português</li>
                <li>Ler avaliações de clientes anteriores em português</li>
                <li>Selecionar motorista preferido ou permitir atribuição automática</li>
              </ul>
            </li>
            
            <li><strong>Requisitos Especiais:</strong>
              <ul>
                <li>Adicionar pedidos especiais (música cultural portuguesa, preferências de rota específicas)</li>
                <li>Especificar quaisquer requisitos de mobilidade</li>
                <li>Solicitar assistência em português para destinos</li>
                <li>Adicionar notas sobre preferências culturais ou requisitos de negócios</li>
              </ul>
            </li>
          </ol>
          
          <h4>2. Reserva via Website (lusotown.com/transport)</h4>
          <ul>
            <li>Processo similar ao app móvel</li>
            <li>Interface desktop completa com integração de mapa</li>
            <li>Perfis detalhados de motoristas e certificados de língua portuguesa</li>
            <li>Opções de reserva corporativa para contas empresariais</li>
          </ul>
          
          <h4>3. Reserva por Telefone (Apoio Português 24/7)</h4>
          <ul>
            <li><strong>Linha Portuguesa:</strong> +44 20 XXXX XXXX</li>
            <li><strong>Disponível:</strong> 24/7 com operadores que falam português</li>
            <li><strong>Melhor Para:</strong> Reservas complexas, transporte de grupo, requisitos de segurança</li>
            <li><strong>Serviços:</strong> Assistência completa de reserva em português</li>
          </ul>
          
          <h3>Estrutura de Preços e Pagamento:</h3>
          
          <h4>Estrutura de Tarifas por Hora:</h4>
          <table class="w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-2">Tipo de Serviço</th>
                <th class="border border-gray-300 p-2">Tarifa Padrão</th>
                <th class="border border-gray-300 p-2">Tarifa de Membro</th>
                <th class="border border-gray-300 p-2">Mínimo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-2">Cultural/Social</td>
                <td class="border border-gray-300 p-2">£35-50/hora</td>
                <td class="border border-gray-300 p-2">£30-42/hora</td>
                <td class="border border-gray-300 p-2">2 horas</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">Executivo</td>
                <td class="border border-gray-300 p-2">£45-65/hora</td>
                <td class="border border-gray-300 p-2">£38-55/hora</td>
                <td class="border border-gray-300 p-2">2 horas</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">Segurança</td>
                <td class="border border-gray-300 p-2">£65-85/hora</td>
                <td class="border border-gray-300 p-2">£55-72/hora</td>
                <td class="border border-gray-300 p-2">3 horas</td>
              </tr>
            </tbody>
          </table>
          
          <h4>Encargos Adicionais:</h4>
          <ul>
            <li><strong>Tempo de Espera:</strong> £15/hora após período de tolerância de 15 minutos</li>
            <li><strong>Taxa de Congestionamento:</strong> £15 (quando aplicável)</li>
            <li><strong>Taxas de Estacionamento:</strong> Custo real (quando necessário)</li>
            <li><strong>Premium Fora de Horas:</strong> 25% sobretaxa (23h-6h)</li>
            <li><strong>Reserva de Curto Prazo:</strong> 20% sobretaxa (menos de 2 horas de aviso)</li>
          </ul>
          
          <h3>Métodos de Pagamento:</h3>
          <ul>
            <li><strong>Cartões de Crédito/Débito:</strong> Visa, Mastercard, Amex</li>
            <li><strong>Pagamentos Digitais:</strong> Apple Pay, Google Pay, PayPal</li>
            <li><strong>Contas Corporativas:</strong> Faturação mensal com faturas em português</li>
            <li><strong>Dinheiro:</strong> Aceite apenas para reservas do mesmo dia</li>
          </ul>
          
          <h3>Confirmação de Reserva e Comunicação:</h3>
          
          <h4>Processo de Confirmação:</h4>
          <ol>
            <li><strong>Confirmação Imediata:</strong> Número de referência de reserva enviado via SMS/email</li>
            <li><strong>Atribuição de Motorista:</strong> Detalhes do motorista partilhados 30-60 minutos antes do pickup</li>
            <li><strong>Comunicação Portuguesa:</strong> Todas as comunicações disponíveis em português</li>
            <li><strong>Atualizações em Tempo Real:</strong> Rastreamento de localização do motorista e atualizações de ETA</li>
          </ol>
          
          <h4>O Que Vai Receber:</h4>
          <ul>
            <li>Nome e foto do motorista</li>
            <li>Nível de proficiência em português</li>
            <li>Detalhes do veículo (marca, modelo, cor, matrícula)</li>
            <li>Número de contacto do motorista (que fala português)</li>
            <li>Tempo estimado de chegada com rastreamento ao vivo</li>
          </ul>
          
          <h3>Política de Cancelamento e Modificação:</h3>
          <ul>
            <li><strong>Cancelamento Gratuito:</strong> Até 2 horas antes do pickup</li>
            <li><strong>Modificações:</strong> Rota, hora ou requisitos podem ser alterados até 1 hora antes</li>
            <li><strong>Cancelamento Tardio:</strong> 50% de encargo para cancelamentos dentro de 2 horas</li>
            <li><strong>Não Comparência:</strong> Encargo total aplicável</li>
            <li><strong>Tempo/Emergência:</strong> Política de cancelamento flexível para circunstâncias extremas</li>
          </ul>
        `,
        interactive: {
          type: 'checklist',
          data: {
            items: [
              { text: 'Download LusoTown mobile app', textPortuguese: 'Descarregar app móvel LusoTown' },
              { text: 'Set up account with payment method', textPortuguese: 'Configurar conta com método de pagamento' },
              { text: 'Enable location services', textPortuguese: 'Ativar serviços de localização' },
              { text: 'Set language preference to Portuguese', textPortuguese: 'Definir preferência de idioma para português' },
              { text: 'Save frequently used pickup/drop-off locations', textPortuguese: 'Guardar localizações de pickup/drop-off frequentemente usadas' },
              { text: 'Test booking process with a trial booking', textPortuguese: 'Testar processo de reserva com uma reserva de teste' }
            ]
          }
        },
        tips: [
          'Book during off-peak hours for better availability and pricing',
          'Specify Portuguese cultural requirements in advance',
          'Save your frequent destinations for quicker booking',
          'Join LusoTown membership for significant discounts and priority service'
        ],
        tipsPortuguese: [
          'Reserve durante horas fora de pico para melhor disponibilidade e preços',
          'Especifique requisitos culturais portugueses com antecedência',
          'Guarde os seus destinos frequentes para reserva mais rápida',
          'Adira à membro LusoTown para descontos significativos e serviço prioritário'
        ]
      },
      {
        id: 'safety-security',
        title: 'Safety, Security, and Quality Standards',
        titlePortuguese: 'Padrões de Segurança, Proteção e Qualidade',
        type: 'tutorial',
        estimatedTime: 4,
        content: `
          <p>LusoTown maintains the highest safety and security standards for all transport services, with additional cultural sensitivity training for Portuguese community needs.</p>
          
          <h3>Driver Vetting & Certification Process:</h3>
          
          <h4>Background Checks & Licensing:</h4>
          <ul>
            <li><strong>Enhanced DBS Check:</strong> All drivers undergo enhanced criminal background screening</li>
            <li><strong>SIA Licensing:</strong> Security drivers hold valid SIA (Security Industry Authority) licenses</li>
            <li><strong>PCO Licensing:</strong> All drivers licensed by Transport for London (TfL)</li>
            <li><strong>Portuguese Language Certification:</strong> Verified fluency through certified Portuguese language testing</li>
            <li><strong>Cultural Competency Training:</strong> Specialized training in Portuguese cultural sensitivity and business etiquette</li>
          </ul>
          
          <h4>Ongoing Quality Assurance:</h4>
          <ul>
            <li><strong>Monthly Reviews:</strong> Regular performance assessments based on customer feedback</li>
            <li><strong>Continuous Training:</strong> Quarterly Portuguese cultural awareness and security update sessions</li>
            <li><strong>Medical Clearance:</strong> Annual health checks and fitness assessments</li>
            <li><strong>Vehicle Inspections:</strong> Weekly vehicle safety and cleanliness inspections</li>
          </ul>
          
          <h3>Vehicle Fleet Standards:</h3>
          
          <h4>Executive Fleet Specifications:</h4>
          <ul>
            <li><strong>Modern Vehicles:</strong> Recent models with comfortable interior, Wi-Fi, charging ports</li>
            <li><strong>Executive Transport:</strong> Professional comfort with privacy glass and climate control</li>
            <li><strong>Group Transport:</strong> Large vehicles for group transport</li>
            <li><strong>All vehicles:</strong> Maximum 3 years old, maintained to dealership standards</li>
          </ul>
          
          <h4>Security Vehicle Features:</h4>
          <ul>
            <li><strong>Reinforced Safety Glass:</strong> Level B4 protection standard</li>
            <li><strong>Run-flat Tyres:</strong> Continued mobility under puncture</li>
            <li><strong>GPS Tracking:</strong> Real-time location monitoring and emergency response</li>
            <li><strong>Communication Systems:</strong> Direct link to security operations center</li>
            <li><strong>First Aid Equipment:</strong> Professional medical kits and emergency supplies</li>
          </ul>
          
          <h3>Safety Protocols During Service:</h3>
          
          <h4>Pre-Journey Safety Checks:</h4>
          <ol>
            <li><strong>Identity Verification:</strong> Driver confirms passenger identity using photo and booking reference</li>
            <li><strong>Route Planning:</strong> Optimal route planning with security considerations</li>
            <li><strong>Vehicle Inspection:</strong> Pre-journey safety and cleanliness check</li>
            <li><strong>Communication Setup:</strong> Confirm contact details and emergency procedures</li>
            <li><strong>Special Requirements Review:</strong> Confirm any cultural or accessibility needs</li>
          </ol>
          
          <h4>During Journey Protocols:</h4>
          <ul>
            <li><strong>Professional Conduct:</strong> Drivers maintain professional boundaries and cultural respect</li>
            <li><strong>Privacy Protection:</strong> Confidentiality of conversations and destinations</li>
            <li><strong>Safe Driving:</strong> Adherence to speed limits, traffic laws, and defensive driving techniques</li>
            <li><strong>Route Flexibility:</strong> Ability to adjust routes for safety or passenger preferences</li>
            <li><strong>Emergency Response:</strong> Immediate access to emergency services and security support</li>
          </ul>
          
          <h3>Portuguese Cultural Safety Considerations:</h3>
          
          <h4>Cultural Sensitivity Protocols:</h4>
          <ul>
            <li><strong>Language Accommodation:</strong> Drivers respect passenger language preferences (Portuguese/English mix)</li>
            <li><strong>Cultural Events Security:</strong> Special awareness for Portuguese community events and potential crowd situations</li>
            <li><strong>Business Culture Understanding:</strong> Knowledge of Portuguese business customs and meeting protocols</li>
            <li><strong>Family Service Considerations:</strong> Appropriate behavior when transporting families with children</li>
          </ul>
          
          <h4>Portuguese Community Venues:</h4>
          <ul>
            <li><strong>Venue Familiarity:</strong> Drivers know Portuguese restaurants, cultural centers, and community spaces</li>
            <li><strong>Event Security:</strong> Awareness of Portuguese cultural events and associated security considerations</li>
            <li><strong>Discretion:</strong> Understanding of community privacy needs and gossip sensitivity</li>
            <li><strong>Cultural Calendar Awareness:</strong> Knowledge of Portuguese holidays and cultural celebrations</li>
          </ul>
          
          <h3>Emergency Procedures & Support:</h3>
          
          <h4>Emergency Response System:</h4>
          <ul>
            <li><strong>24/7 Operations Center:</strong> Portuguese-speaking emergency support available</li>
            <li><strong>GPS Tracking:</strong> Real-time vehicle location monitoring</li>
            <li><strong>Panic Button:</strong> Silent alarm system in all vehicles</li>
            <li><strong>Medical Emergency Protocol:</strong> Direct contact with emergency services and medical support</li>
            <li><strong>Incident Reporting:</strong> Comprehensive incident documentation and follow-up</li>
          </ul>
          
          <h4>Passenger Safety Features:</h4>
          <ul>
            <li><strong>Live Journey Sharing:</strong> Passengers can share live location with family/colleagues</li>
            <li><strong>In-App Emergency Button:</strong> One-touch emergency contact</li>
            <li><strong>Driver Photo & Details:</strong> Real-time driver identification</li>
            <li><strong>Journey Recording:</strong> GPS route recording for all journeys</li>
            <li><strong>Customer Service Escalation:</strong> Immediate escalation procedures for concerns</li>
          </ul>
          
          <h3>Quality Assurance & Feedback:</h3>
          
          <h4>Rating System:</h4>
          <ul>
            <li><strong>Post-Journey Rating:</strong> 5-star rating system with detailed feedback options</li>
            <li><strong>Portuguese Language Feedback:</strong> Feedback forms available in Portuguese</li>
            <li><strong>Cultural Sensitivity Scoring:</strong> Specific ratings for cultural understanding and respect</li>
            <li><strong>Driver Recognition:</strong> Top-rated drivers receive recognition and bonuses</li>
          </ul>
          
          <h4>Continuous Improvement:</h4>
          <ul>
            <li><strong>Monthly Quality Reviews:</strong> Analysis of all feedback and performance metrics</li>
            <li><strong>Portuguese Community Input:</strong> Regular consultation with Portuguese community leaders</li>
            <li><strong>Service Enhancement:</strong> Continuous improvement based on community needs</li>
            <li><strong>Cultural Training Updates:</strong> Regular updates to cultural awareness training</li>
          </ul>
          
          <h3>Insurance & Liability Coverage:</h3>
          <ul>
            <li><strong>Comprehensive Insurance:</strong> £10 million public liability coverage</li>
            <li><strong>Personal Accident Cover:</strong> Full passenger accident insurance</li>
            <li><strong>Professional Indemnity:</strong> Coverage for professional services</li>
            <li><strong>Vehicle Insurance:</strong> Comprehensive coverage for all fleet vehicles</li>
            <li><strong>Security Services Insurance:</strong> Specialized coverage for security driver services</li>
          </ul>
        `,
        contentPortuguese: `
          <p>A LusoTown mantém os mais altos padrões de segurança e proteção para todos os serviços de transporte, com formação adicional de sensibilidade cultural para as necessidades da comunidade portuguesa.</p>
          
          <h3>Processo de Verificação e Certificação de Motoristas:</h3>
          
          <h4>Verificações de Antecedentes e Licenciamento:</h4>
          <ul>
            <li><strong>Verificação DBS Melhorada:</strong> Todos os motoristas passam por triagem melhorada de antecedentes criminais</li>
            <li><strong>Licenciamento SIA:</strong> Motoristas de segurança possuem licenças SIA (Security Industry Authority) válidas</li>
            <li><strong>Licenciamento PCO:</strong> Todos os motoristas licenciados pelo Transport for London (TfL)</li>
            <li><strong>Certificação de Língua Portuguesa:</strong> Fluência verificada através de testes certificados de língua portuguesa</li>
            <li><strong>Formação de Competência Cultural:</strong> Formação especializada em sensibilidade cultural portuguesa e etiqueta empresarial</li>
          </ul>
          
          <h4>Garantia de Qualidade Contínua:</h4>
          <ul>
            <li><strong>Revisões Mensais:</strong> Avaliações regulares de desempenho baseadas no feedback do cliente</li>
            <li><strong>Formação Contínua:</strong> Sessões trimestrais de consciência cultural portuguesa e atualizações de segurança</li>
            <li><strong>Autorização Médica:</strong> Verificações de saúde anuais e avaliações de aptidão</li>
            <li><strong>Inspeções de Veículos:</strong> Inspeções semanais de segurança e limpeza do veículo</li>
          </ul>
          
          <h3>Padrões da Frota de Veículos:</h3>
          
          <h4>Especificações da Frota Executiva:</h4>
          <ul>
            <li><strong>Veículos Modernos:</strong> Modelos recentes com interior confortável, Wi-Fi, portas de carregamento</li>
            <li><strong>Transporte Executivo:</strong> Conforto profissional com vidros de privacidade e controle climático</li>
            <li><strong>Transporte de Grupo:</strong> Veículos grandes para transporte de grupo</li>
            <li><strong>Todos os veículos:</strong> Máximo 3 anos de idade, mantidos aos padrões de concessionária</li>
          </ul>
          
          <h4>Funcionalidades de Veículos de Segurança:</h4>
          <ul>
            <li><strong>Vidro de Segurança Reforçado:</strong> Padrão de proteção nível B4</li>
            <li><strong>Pneus Run-flat:</strong> Mobilidade contínua sob perfuração</li>
            <li><strong>Rastreamento GPS:</strong> Monitorização de localização em tempo real e resposta de emergência</li>
            <li><strong>Sistemas de Comunicação:</strong> Ligação direta ao centro de operações de segurança</li>
            <li><strong>Equipamento de Primeiros Socorros:</strong> Kits médicos profissionais e suprimentos de emergência</li>
          </ul>
          
          <h3>Protocolos de Segurança Durante o Serviço:</h3>
          
          <h4>Verificações de Segurança Pré-Viagem:</h4>
          <ol>
            <li><strong>Verificação de Identidade:</strong> Motorista confirma identidade do passageiro usando foto e referência de reserva</li>
            <li><strong>Planeamento de Rota:</strong> Planeamento ótimo de rota com considerações de segurança</li>
            <li><strong>Inspeção do Veículo:</strong> Verificação de segurança e limpeza pré-viagem</li>
            <li><strong>Configuração de Comunicação:</strong> Confirmar detalhes de contacto e procedimentos de emergência</li>
            <li><strong>Revisão de Requisitos Especiais:</strong> Confirmar quaisquer necessidades culturais ou de acessibilidade</li>
          </ol>
          
          <h4>Protocolos Durante a Viagem:</h4>
          <ul>
            <li><strong>Conduta Profissional:</strong> Motoristas mantêm limites profissionais e respeito cultural</li>
            <li><strong>Proteção de Privacidade:</strong> Confidencialidade de conversas e destinos</li>
            <li><strong>Condução Segura:</strong> Aderência a limites de velocidade, leis de trânsito e técnicas de condução defensiva</li>
            <li><strong>Flexibilidade de Rota:</strong> Capacidade de ajustar rotas para segurança ou preferências do passageiro</li>
            <li><strong>Resposta de Emergência:</strong> Acesso imediato a serviços de emergência e apoio de segurança</li>
          </ul>
          
          <h3>Considerações de Segurança Cultural Portuguesa:</h3>
          
          <h4>Protocolos de Sensibilidade Cultural:</h4>
          <ul>
            <li><strong>Acomodação de Idioma:</strong> Motoristas respeitam preferências de idioma do passageiro (mistura português/inglês)</li>
            <li><strong>Segurança de Eventos Culturais:</strong> Consciência especial para eventos da comunidade portuguesa e situações potenciais de multidão</li>
            <li><strong>Compreensão da Cultura Empresarial:</strong> Conhecimento de costumes empresariais portugueses e protocolos de reunião</li>
            <li><strong>Considerações de Serviço Familiar:</strong> Comportamento apropriado ao transportar famílias com crianças</li>
          </ul>
          
          <h4>Locais da Comunidade Portuguesa:</h4>
          <ul>
            <li><strong>Familiaridade com Locais:</strong> Motoristas conhecem restaurantes portugueses, centros culturais e espaços comunitários</li>
            <li><strong>Segurança de Eventos:</strong> Consciência de eventos culturais portugueses e considerações de segurança associadas</li>
            <li><strong>Discrição:</strong> Compreensão das necessidades de privacidade da comunidade e sensibilidade a fofocas</li>
            <li><strong>Consciência do Calendário Cultural:</strong> Conhecimento de feriados portugueses e celebrações culturais</li>
          </ul>
          
          <h3>Procedimentos de Emergência e Apoio:</h3>
          
          <h4>Sistema de Resposta de Emergência:</h4>
          <ul>
            <li><strong>Centro de Operações 24/7:</strong> Apoio de emergência em português disponível</li>
            <li><strong>Rastreamento GPS:</strong> Monitorização de localização de veículo em tempo real</li>
            <li><strong>Botão de Pânico:</strong> Sistema de alarme silencioso em todos os veículos</li>
            <li><strong>Protocolo de Emergência Médica:</strong> Contacto direto com serviços de emergência e apoio médico</li>
            <li><strong>Relatório de Incidentes:</strong> Documentação abrangente de incidentes e seguimento</li>
          </ul>
          
          <h4>Funcionalidades de Segurança do Passageiro:</h4>
          <ul>
            <li><strong>Partilha de Viagem Ao Vivo:</strong> Passageiros podem partilhar localização ao vivo com família/colegas</li>
            <li><strong>Botão de Emergência no App:</strong> Contacto de emergência com um toque</li>
            <li><strong>Foto e Detalhes do Motorista:</strong> Identificação do motorista em tempo real</li>
            <li><strong>Gravação de Viagem:</strong> Gravação de rota GPS para todas as viagens</li>
            <li><strong>Escalação de Atendimento ao Cliente:</strong> Procedimentos de escalação imediata para preocupações</li>
          </ul>
          
          <h3>Garantia de Qualidade e Feedback:</h3>
          
          <h4>Sistema de Classificação:</h4>
          <ul>
            <li><strong>Classificação Pós-Viagem:</strong> Sistema de classificação de 5 estrelas com opções de feedback detalhadas</li>
            <li><strong>Feedback em Língua Portuguesa:</strong> Formulários de feedback disponíveis em português</li>
            <li><strong>Pontuação de Sensibilidade Cultural:</strong> Classificações específicas para compreensão e respeito cultural</li>
            <li><strong>Reconhecimento de Motorista:</strong> Motoristas mais bem classificados recebem reconhecimento e bónus</li>
          </ul>
          
          <h4>Melhoria Contínua:</h4>
          <ul>
            <li><strong>Revisões de Qualidade Mensais:</strong> Análise de todo o feedback e métricas de desempenho</li>
            <li><strong>Input da Comunidade Portuguesa:</strong> Consulta regular com líderes da comunidade portuguesa</li>
            <li><strong>Melhoria de Serviço:</strong> Melhoria contínua baseada nas necessidades da comunidade</li>
            <li><strong>Atualizações de Formação Cultural:</strong> Atualizações regulares à formação de consciência cultural</li>
          </ul>
          
          <h3>Cobertura de Seguro e Responsabilidade:</h3>
          <ul>
            <li><strong>Seguro Abrangente:</strong> Cobertura de responsabilidade pública de £10 milhões</li>
            <li><strong>Cobertura de Acidente Pessoal:</strong> Seguro completo de acidente de passageiro</li>
            <li><strong>Indemnização Profissional:</strong> Cobertura para serviços profissionais</li>
            <li><strong>Seguro de Veículo:</strong> Cobertura abrangente para todos os veículos da frota</li>
            <li><strong>Seguro de Serviços de Segurança:</strong> Cobertura especializada para serviços de motorista de segurança</li>
          </ul>
        `,
        warnings: [
          'Always verify driver identity before entering vehicle',
          'Keep emergency contacts readily available',
          'Report any safety concerns immediately to customer service',
          'Ensure your mobile phone is charged for journey tracking'
        ],
        warningsPortuguese: [
          'Sempre verificar identidade do motorista antes de entrar no veículo',
          'Manter contactos de emergência facilmente disponíveis',
          'Reportar qualquer preocupação de segurança imediatamente ao atendimento ao cliente',
          'Garantir que o seu telemóvel está carregado para rastreamento de viagem'
        ]
      }
    ],
    practicalExercises: [],
    resources: [
      {
        title: 'London Portuguese Areas Map',
        titlePortuguese: 'Mapa de Áreas Portuguesas de Londres',
        url: '/guides/portuguese-areas-london-map',
        type: 'guide'
      },
      {
        title: 'Transport Service Price Calculator',
        titlePortuguese: 'Calculadora de Preços de Serviço de Transporte',
        url: '/tools/transport-price-calculator',
        type: 'external'
      },
      {
        title: 'Emergency Contact Card',
        titlePortuguese: 'Cartão de Contacto de Emergência',
        url: '/downloads/emergency-contact-card.pdf',
        type: 'download'
      }
    ]
  };

  return (
    <LearningModuleFramework
      module={transportModule}
      onComplete={handleModuleComplete}
      onStepComplete={handleStepComplete}
      completedSteps={completedSteps}
      showProgress={true}
    />
  );
}