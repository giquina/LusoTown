'use client'

import { motion } from 'framer-motion'
import { 
  InformationCircleIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CogIcon,
  UserGroupIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface QuestionExplainerProps {
  step: number
  isVisible?: boolean
}

const explanations = {
  1: {
    icon: CogIcon,
    titleEn: "Why do we ask about service type?",
    titlePt: "Porque perguntamos sobre o tipo de serviço?",
    contentEn: "We need to assign the right type of SIA-licensed officer for your specific needs. Different services require different training levels and certifications.",
    contentPt: "Precisamos de atribuir o tipo correto de oficial licenciado SIA para as suas necessidades específicas. Diferentes serviços requerem diferentes níveis de treino e certificações.",
    complianceEn: "UK law requires specific qualifications for different security services",
    compliancePt: "A lei do Reino Unido exige qualificações específicas para diferentes serviços de segurança"
  },
  2: {
    icon: UserGroupIcon,
    titleEn: "Why do we need date, time, and location details?",
    titlePt: "Porque precisamos de detalhes de data, hora e localização?",
    contentEn: "This helps us schedule the right officer and prepare for your specific route and timing. We also need to assess location-based risks and traffic patterns.",
    contentPt: "Isto ajuda-nos a programar o oficial certo e preparar para a sua rota específica e timing. Também precisamos de avaliar riscos baseados na localização e padrões de trânsito.",
    complianceEn: "Required for operational planning and insurance compliance",
    compliancePt: "Necessário para planeamento operacional e conformidade de seguros"
  },
  3: {
    icon: ExclamationTriangleIcon,
    titleEn: "Why do we assess risks?",
    titlePt: "Porque avaliamos riscos?",
    contentEn: "UK law requires us to assess potential risks to ensure your safety and our officer's safety. This helps us prepare appropriate security measures.",
    contentPt: "A lei do Reino Unido exige que avaliemos riscos potenciais para garantir a sua segurança e a segurança do nosso oficial. Isto ajuda-nos a preparar medidas de segurança apropriadas.",
    complianceEn: "SIA regulations mandate risk assessment for all protection services",
    compliancePt: "Regulamentações SIA obrigam avaliação de riscos para todos os serviços de proteção"
  },
  4: {
    icon: ShieldCheckIcon,
    titleEn: "Why do we ask about protection level?",
    titlePt: "Porque perguntamos sobre o nível de proteção?",
    contentEn: "This helps us match you with an officer who has the right training and certification level for your needs. Higher risk situations require more specialized training.",
    contentPt: "Isto ajuda-nos a combiná-lo com um oficial que tem o nível certo de treino e certificação para as suas necessidades. Situações de maior risco requerem treino mais especializado.",
    complianceEn: "Different SIA license categories cover different protection levels",
    compliancePt: "Diferentes categorias de licença SIA cobrem diferentes níveis de proteção"
  },
  5: {
    icon: UserGroupIcon,
    titleEn: "Why do we ask about special requirements?",
    titlePt: "Porque perguntamos sobre requisitos especiais?",
    contentEn: "We want to ensure our service meets your specific needs and accessibility requirements. This includes language preferences and any special accommodations.",
    contentPt: "Queremos garantir que o nosso serviço atende às suas necessidades específicas e requisitos de acessibilidade. Isto inclui preferências de idioma e quaisquer acomodações especiais.",
    complianceEn: "Part of our commitment to inclusive and accessible services",
    compliancePt: "Parte do nosso compromisso com serviços inclusivos e acessíveis"
  },
  6: {
    icon: PhoneIcon,
    titleEn: "Why do we need emergency contact information?",
    titlePt: "Porque precisamos de informações de contacto de emergência?",
    contentEn: "Required by SIA regulations for all close protection services. This ensures we can reach someone if needed during the service period.",
    contentPt: "Exigido pelas regulamentações SIA para todos os serviços de proteção próxima. Isto garante que podemos contactar alguém se necessário durante o período de serviço.",
    complianceEn: "Legal requirement under SIA close protection regulations",
    compliancePt: "Requisito legal sob regulamentações SIA de proteção próxima"
  }
}

export default function QuestionExplainer({ step, isVisible = true }: QuestionExplainerProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const explanation = explanations[step as keyof typeof explanations]
  
  if (!explanation || !isVisible) return null
  
  const IconComponent = explanation.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-blue-900 mb-2">
            {isPortuguese ? explanation.titlePt : explanation.titleEn}
          </h4>
          <p className="text-sm text-blue-800 mb-3">
            {isPortuguese ? explanation.contentPt : explanation.contentEn}
          </p>
          
          {/* Compliance badge */}
          <div className="flex items-center space-x-2">
            <InformationCircleIcon className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">
              {isPortuguese ? explanation.compliancePt : explanation.complianceEn}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}