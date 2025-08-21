'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Coins, Trophy, Users, Calendar, Gift, Zap, Star, TrendingUp, Wallet, Award, Heart, Share2, Target, ChevronRight } from 'lucide-react';

interface TokenBalance {
  total: number;
  available: number;
  staked: number;
  earned: number;
  pending: number;
}

interface TokenReward {
  id: string;
  activity: string;
  activityPt: string;
  amount: number;
  multiplier: number;
  description: string;
  descriptionPt: string;
  category: 'cultural' | 'social' | 'business' | 'learning' | 'community' | 'special';
  requirements: string[];
  requirementsPt: string[];
  frequency: 'daily' | 'weekly' | 'monthly' | 'one-time';
  culturalSignificance: number;
}

interface Achievement {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  icon: string;
  tokenReward: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
  category: 'cultural_ambassador' | 'community_builder' | 'business_connector' | 'event_organizer' | 'heritage_keeper';
}

interface StakingPool {
  id: string;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  purpose: string;
  purposePt: string;
  apr: number;
  totalStaked: number;
  userStaked: number;
  minStake: number;
  lockPeriod: number; // days
  benefits: string[];
  benefitsPt: string[];
  culturalImpact: {
    projects: string[];
    projectsPt: string[];
    beneficiaries: number;
  };
}

interface GovernanceProposal {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  proposer: string;
  category: 'cultural_events' | 'community_support' | 'business_grants' | 'platform_improvement' | 'heritage_preservation';
  votingPower: number;
  votesFor: number;
  votesAgainst: number;
  quorum: number;
  endDate: string;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  culturalImpact: string;
  culturalImpactPt: string;
  fundingRequired: number;
  expectedBeneficiaries: number;
}

interface TokenTransaction {
  id: string;
  type: 'earned' | 'spent' | 'staked' | 'unstaked' | 'governance' | 'transfer';
  amount: number;
  description: string;
  descriptionPt: string;
  timestamp: string;
  culturalActivity?: string;
  recipient?: string;
  transactionHash?: string;
}

const LusoCommunityToken: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'earn' | 'stake' | 'governance' | 'achievements' | 'marketplace'>('earn');
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    total: 2847,
    available: 1923,
    staked: 800,
    earned: 2847,
    pending: 124
  });
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedStakingPool, setSelectedStakingPool] = useState<string>('');
  const [selectedProposal, setSelectedProposal] = useState<GovernanceProposal | null>(null);
  const [userVotingPower, setUserVotingPower] = useState(856);

  // Mock token rewards system
  const tokenRewards: TokenReward[] = [
    {
      id: 'attend-fado-night',
      activity: 'Attend Fado Night',
      activityPt: 'Participar em Noite de Fado',
      amount: 50,
      multiplier: 1.5,
      description: 'Attend authentic Portuguese Fado performances',
      descriptionPt: 'Participar em apresentações autênticas de Fado português',
      category: 'cultural',
      requirements: ['Attend event', 'Check-in via app', 'Stay for minimum 2 hours'],
      requirementsPt: ['Participar no evento', 'Check-in via aplicação', 'Permanecer pelo menos 2 horas'],
      frequency: 'weekly',
      culturalSignificance: 95
    },
    {
      id: 'portuguese-business-review',
      activity: 'Review Portuguese Business',
      activityPt: 'Avaliar Negócio Português',
      amount: 25,
      multiplier: 1.2,
      description: 'Write authentic reviews for Portuguese businesses',
      descriptionPt: 'Escrever avaliações autênticas para negócios portugueses',
      category: 'business',
      requirements: ['Detailed review (min 100 words)', 'Include photos', 'Verify visit'],
      requirementsPt: ['Avaliação detalhada (mín. 100 palavras)', 'Incluir fotos', 'Verificar visita'],
      frequency: 'daily',
      culturalSignificance: 70
    },
    {
      id: 'teach-portuguese-phrase',
      activity: 'Teach Portuguese Phrase',
      activityPt: 'Ensinar Expressão Portuguesa',
      amount: 30,
      multiplier: 1.3,
      description: 'Share and explain Portuguese expressions with cultural context',
      descriptionPt: 'Partilhar e explicar expressões portuguesas com contexto cultural',
      category: 'learning',
      requirements: ['Record audio pronunciation', 'Provide cultural context', 'Get community approval'],
      requirementsPt: ['Gravar pronúncia áudio', 'Fornecer contexto cultural', 'Obter aprovação da comunidade'],
      frequency: 'daily',
      culturalSignificance: 88
    },
    {
      id: 'organize-santos-populares',
      activity: 'Organize Santos Populares Event',
      activityPt: 'Organizar Evento Santos Populares',
      amount: 500,
      multiplier: 3.0,
      description: 'Create and manage traditional Portuguese festival celebration',
      descriptionPt: 'Criar e gerir celebração tradicional de festival português',
      category: 'special',
      requirements: ['Plan authentic activities', 'Minimum 50 participants', 'Document traditions'],
      requirementsPt: ['Planear atividades autênticas', 'Mínimo 50 participantes', 'Documentar tradições'],
      frequency: 'one-time',
      culturalSignificance: 98
    },
    {
      id: 'mentor-newcomer',
      activity: 'Mentor Newcomer',
      activityPt: 'Orientar Recém-chegado',
      amount: 75,
      multiplier: 1.8,
      description: 'Guide new Portuguese community members in London',
      descriptionPt: 'Orientar novos membros da comunidade portuguesa em Londres',
      category: 'community',
      requirements: ['Complete mentor training', 'Minimum 10 hours monthly', 'Positive feedback'],
      requirementsPt: ['Completar formação de mentor', 'Mínimo 10 horas mensais', 'Feedback positivo'],
      frequency: 'monthly',
      culturalSignificance: 85
    }
  ];

  // Mock achievements system
  const achievements: Achievement[] = [
    {
      id: 'cultural-ambassador',
      title: 'Cultural Ambassador',
      titlePt: 'Embaixador Cultural',
      description: 'Attend 50 Portuguese cultural events',
      descriptionPt: 'Participar em 50 eventos culturais portugueses',
      icon: '🇵🇹',
      tokenReward: 1000,
      rarity: 'epic',
      progress: 37,
      maxProgress: 50,
      category: 'cultural_ambassador'
    },
    {
      id: 'fado-connoisseur',
      title: 'Fado Connoisseur',
      titlePt: 'Conhecedor de Fado',
      description: 'Attend 20 Fado performances and share knowledge',
      descriptionPt: 'Participar em 20 apresentações de Fado e partilhar conhecimento',
      icon: '🎵',
      tokenReward: 500,
      rarity: 'rare',
      progress: 20,
      maxProgress: 20,
      unlockedAt: '2024-01-15',
      category: 'heritage_keeper'
    },
    {
      id: 'business-connector',
      title: 'Business Connector',
      titlePt: 'Conector de Negócios',
      description: 'Connect 100 people with Portuguese businesses',
      descriptionPt: 'Conectar 100 pessoas com negócios portugueses',
      icon: '🤝',
      tokenReward: 750,
      rarity: 'rare',
      progress: 68,
      maxProgress: 100,
      category: 'business_connector'
    },
    {
      id: 'pasteis-de-nata-expert',
      title: 'Pastéis de Nata Expert',
      titlePt: 'Especialista em Pastéis de Nata',
      description: 'Review 25 Portuguese bakeries and rate their pastéis de nata',
      descriptionPt: 'Avaliar 25 pastelarias portuguesas e classificar os seus pastéis de nata',
      icon: '🥮',
      tokenReward: 300,
      rarity: 'uncommon',
      progress: 25,
      maxProgress: 25,
      unlockedAt: '2023-12-20',
      category: 'heritage_keeper'
    },
    {
      id: 'saudade-storyteller',
      title: 'Saudade Storyteller',
      titlePt: 'Contador de Saudade',
      description: 'Share 50 stories about Portuguese heritage and homesickness',
      descriptionPt: 'Partilhar 50 histórias sobre património português e saudade',
      icon: '💭',
      tokenReward: 600,
      rarity: 'epic',
      progress: 32,
      maxProgress: 50,
      category: 'heritage_keeper'
    }
  ];

  // Mock staking pools
  const stakingPools: StakingPool[] = [
    {
      id: 'cultural-events-fund',
      name: 'Cultural Events Fund',
      namePt: 'Fundo de Eventos Culturais',
      description: 'Support Portuguese cultural events and festivals in London',
      descriptionPt: 'Apoiar eventos e festivais culturais portugueses em Londres',
      purpose: 'Fund authentic Portuguese cultural celebrations',
      purposePt: 'Financiar celebrações culturais portuguesas autênticas',
      apr: 15.5,
      totalStaked: 125000,
      userStaked: 800,
      minStake: 100,
      lockPeriod: 90,
      benefits: ['Priority event tickets', 'Cultural event planning input', 'Exclusive meet-and-greets'],
      benefitsPt: ['Bilhetes prioritários para eventos', 'Contribuição no planeamento de eventos culturais', 'Encontros exclusivos'],
      culturalImpact: {
        projects: ['Santos Populares 2024', 'Fado Festival London', 'Portuguese Film Festival'],
        projectsPt: ['Santos Populares 2024', 'Festival de Fado Londres', 'Festival de Cinema Português'],
        beneficiaries: 15000
      }
    },
    {
      id: 'business-support-pool',
      name: 'Business Support Pool',
      namePt: 'Fundo de Apoio a Negócios',
      description: 'Support Portuguese businesses and entrepreneurs',
      descriptionPt: 'Apoiar negócios e empreendedores portugueses',
      purpose: 'Provide grants and support for Portuguese businesses',
      purposePt: 'Fornecer subsídios e apoio para negócios portugueses',
      apr: 12.0,
      totalStaked: 87500,
      userStaked: 0,
      minStake: 200,
      lockPeriod: 180,
      benefits: ['Business network access', 'Investment opportunities', 'Entrepreneur mentorship'],
      benefitsPt: ['Acesso à rede de negócios', 'Oportunidades de investimento', 'Orientação empresarial'],
      culturalImpact: {
        projects: ['Portuguese Startup Incubator', 'Traditional Crafts Support', 'Restaurant Revival Fund'],
        projectsPt: ['Incubadora de Startups Portuguesas', 'Apoio a Artesanato Tradicional', 'Fundo de Revitalização de Restaurantes'],
        beneficiaries: 450
      }
    },
    {
      id: 'heritage-preservation',
      name: 'Heritage Preservation',
      namePt: 'Preservação do Património',
      description: 'Preserve Portuguese cultural heritage and traditions',
      descriptionPt: 'Preservar o património e tradições culturais portuguesas',
      purpose: 'Document and preserve Portuguese cultural practices',
      purposePt: 'Documentar e preservar práticas culturais portuguesas',
      apr: 18.5,
      totalStaked: 68900,
      userStaked: 0,
      minStake: 50,
      lockPeriod: 365,
      benefits: ['Digital archive access', 'Cultural documentation projects', 'Heritage expert consultations'],
      benefitsPt: ['Acesso ao arquivo digital', 'Projetos de documentação cultural', 'Consultas com especialistas em património'],
      culturalImpact: {
        projects: ['Oral History Project', 'Traditional Recipe Archive', 'Azulejo Digital Museum'],
        projectsPt: ['Projeto de História Oral', 'Arquivo de Receitas Tradicionais', 'Museu Digital de Azulejos'],
        beneficiaries: 25000
      }
    }
  ];

  // Mock governance proposals
  const governanceProposals: GovernanceProposal[] = [
    {
      id: 'santos-populares-2024',
      title: 'Santos Populares London 2024 Expansion',
      titlePt: 'Expansão Santos Populares Londres 2024',
      description: 'Expand the annual Santos Populares celebration to multiple London venues',
      descriptionPt: 'Expandir a celebração anual dos Santos Populares para múltiplos locais em Londres',
      proposer: 'Cultural Committee',
      category: 'cultural_events',
      votingPower: 15000,
      votesFor: 8750,
      votesAgainst: 2100,
      quorum: 12000,
      endDate: '2024-02-15',
      status: 'active',
      culturalImpact: 'Preserve and celebrate Portuguese June festivals tradition',
      culturalImpactPt: 'Preservar e celebrar a tradição dos festivais portugueses de junho',
      fundingRequired: 25000,
      expectedBeneficiaries: 8000
    },
    {
      id: 'portuguese-language-program',
      title: 'Community Portuguese Language Program',
      titlePt: 'Programa Comunitário de Língua Portuguesa',
      description: 'Establish free Portuguese language classes for children and adults',
      descriptionPt: 'Estabelecer aulas gratuitas de língua portuguesa para crianças e adultos',
      proposer: 'Education Working Group',
      category: 'community_support',
      votingPower: 12500,
      votesFor: 11200,
      votesAgainst: 800,
      quorum: 10000,
      endDate: '2024-01-30',
      status: 'passed',
      culturalImpact: 'Maintain Portuguese language skills in diaspora community',
      culturalImpactPt: 'Manter competências da língua portuguesa na comunidade da diáspora',
      fundingRequired: 15000,
      expectedBeneficiaries: 500
    },
    {
      id: 'business-directory-enhancement',
      title: 'Enhanced Portuguese Business Directory',
      titlePt: 'Diretório Melhorado de Negócios Portugueses',
      description: 'Upgrade business directory with virtual tours and AI recommendations',
      descriptionPt: 'Melhorar diretório de negócios com tours virtuais e recomendações de IA',
      proposer: 'Tech Innovation Team',
      category: 'platform_improvement',
      votingPower: 8900,
      votesFor: 5200,
      votesAgainst: 3700,
      quorum: 7000,
      endDate: '2024-02-28',
      status: 'active',
      culturalImpact: 'Better connect community with Portuguese businesses',
      culturalImpactPt: 'Melhor conexão da comunidade com negócios portugueses',
      fundingRequired: 35000,
      expectedBeneficiaries: 12000
    }
  ];

  const [transactions] = useState<TokenTransaction[]>([
    {
      id: 'tx-001',
      type: 'earned',
      amount: 50,
      description: 'Attended Fado Night at Casa do Bacalhau',
      descriptionPt: 'Participou na Noite de Fado na Casa do Bacalhau',
      timestamp: '2024-01-16T20:00:00Z',
      culturalActivity: 'Fado Performance'
    },
    {
      id: 'tx-002',
      type: 'staked',
      amount: 500,
      description: 'Staked tokens in Cultural Events Fund',
      descriptionPt: 'Investiu tokens no Fundo de Eventos Culturais',
      timestamp: '2024-01-15T14:30:00Z'
    },
    {
      id: 'tx-003',
      type: 'earned',
      amount: 25,
      description: 'Reviewed Portuguese restaurant "O Tasco"',
      descriptionPt: 'Avaliou restaurante português "O Tasco"',
      timestamp: '2024-01-14T18:45:00Z',
      culturalActivity: 'Business Review'
    }
  ]);

  const connectWallet = async () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
  };

  const stakeTokens = (poolId: string, amount: number) => {
    if (amount <= tokenBalance.available) {
      setTokenBalance(prev => ({
        ...prev,
        available: prev.available - amount,
        staked: prev.staked + amount
      }));
    }
  };

  const voteOnProposal = (proposalId: string, support: boolean, votingPower: number) => {
    // Simulate voting
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-secondary-600 bg-secondary-100';
      case 'uncommon': return 'text-action-600 bg-green-100';
      case 'rare': return 'text-primary-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-secondary-600 bg-secondary-100';
    }
  };

  const formatTokenAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4"
          >
            🪙 {language === 'pt' ? 'LusoToken - Token da Comunidade' : 'LusoToken - Community Token'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8"
          >
            {language === 'pt'
              ? 'Ganhe tokens participando na comunidade portuguesa, apoie projetos culturais e tenha voz na governança comunitária.'
              : 'Earn tokens by participating in the Portuguese community, support cultural projects, and have a voice in community governance.'}
          </motion.p>

          {/* Wallet Connection */}
          <div className="flex justify-center mb-8">
            {!isWalletConnected ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Wallet className="h-5 w-5" />
                <span>{language === 'pt' ? 'Conectar Carteira' : 'Connect Wallet'}</span>
              </motion.button>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg px-6 py-3 flex items-center space-x-3 shadow-sm">
                <div className="w-3 h-3 bg-action-500 rounded-full"></div>
                <span className="text-sm font-medium text-secondary-700">
                  {language === 'pt' ? 'Carteira Conectada' : 'Wallet Connected'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Token Balance Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">{formatTokenAmount(tokenBalance.total)}</div>
              <div className="text-sm text-gray-500">{language === 'pt' ? 'Total de Tokens' : 'Total Tokens'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">{formatTokenAmount(tokenBalance.available)}</div>
              <div className="text-sm text-gray-500">{language === 'pt' ? 'Disponível' : 'Available'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{formatTokenAmount(tokenBalance.staked)}</div>
              <div className="text-sm text-gray-500">{language === 'pt' ? 'Investido' : 'Staked'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-action-600">{formatTokenAmount(tokenBalance.earned)}</div>
              <div className="text-sm text-gray-500">{language === 'pt' ? 'Ganho' : 'Earned'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">{formatTokenAmount(tokenBalance.pending)}</div>
              <div className="text-sm text-gray-500">{language === 'pt' ? 'Pendente' : 'Pending'}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b">
            {[
              { id: 'earn', label: language === 'pt' ? 'Ganhar' : 'Earn', icon: Coins },
              { id: 'stake', label: language === 'pt' ? 'Investir' : 'Stake', icon: TrendingUp },
              { id: 'governance', label: language === 'pt' ? 'Governança' : 'Governance', icon: Users },
              { id: 'achievements', label: language === 'pt' ? 'Conquistas' : 'Achievements', icon: Trophy },
              { id: 'marketplace', label: language === 'pt' ? 'Mercado' : 'Marketplace', icon: Gift }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-emerald-500 text-emerald-600'
                      : 'text-gray-500 hover:text-secondary-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Earn Tokens Tab */}
            {activeTab === 'earn' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-800 mb-6">
                  {language === 'pt' ? 'Ganhe Tokens Participando' : 'Earn Tokens by Participating'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tokenRewards.map((reward) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-secondary-800 mb-2">
                            {language === 'pt' ? reward.activityPt : reward.activity}
                          </h3>
                          <p className="text-secondary-600 text-sm mb-3">
                            {language === 'pt' ? reward.descriptionPt : reward.description}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-emerald-600">
                            {reward.amount} LT
                          </div>
                          {reward.multiplier > 1 && (
                            <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              {reward.multiplier}x {language === 'pt' ? 'multiplicador' : 'multiplier'}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-semibold text-secondary-700 mb-1">
                            {language === 'pt' ? 'Requisitos:' : 'Requirements:'}
                          </div>
                          <ul className="text-xs text-secondary-600 space-y-1">
                            {(language === 'pt' ? reward.requirementsPt : reward.requirements).map((req, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                            <span className="text-xs text-secondary-600">
                              {language === 'pt' ? 'Significância Cultural:' : 'Cultural Significance:'} {reward.culturalSignificance}%
                            </span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                            {reward.frequency}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Staking Tab */}
            {activeTab === 'stake' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-800 mb-6">
                  {language === 'pt' ? 'Investir Tokens para Apoiar Projetos' : 'Stake Tokens to Support Projects'}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {stakingPools.map((pool) => (
                    <motion.div
                      key={pool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-secondary-800 mb-2">
                          {language === 'pt' ? pool.namePt : pool.name}
                        </h3>
                        <p className="text-secondary-600 text-sm mb-4">
                          {language === 'pt' ? pool.descriptionPt : pool.description}
                        </p>
                        <div className="text-3xl font-bold text-emerald-600 mb-2">
                          {pool.apr}% APR
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === 'pt' ? 'Bloqueio:' : 'Lock:'} {pool.lockPeriod} {language === 'pt' ? 'dias' : 'days'}
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="text-sm font-semibold text-secondary-700 mb-2">
                            {language === 'pt' ? 'Benefícios:' : 'Benefits:'}
                          </div>
                          <ul className="text-xs text-secondary-600 space-y-1">
                            {(language === 'pt' ? pool.benefitsPt : pool.benefits).map((benefit, index) => (
                              <li key={index} className="flex items-center">
                                <Star className="h-3 w-3 text-accent-500 mr-2" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="text-sm font-semibold text-secondary-700 mb-2">
                            {language === 'pt' ? 'Impacto Cultural:' : 'Cultural Impact:'}
                          </div>
                          <div className="text-xs text-secondary-600 mb-2">
                            {pool.culturalImpact.beneficiaries.toLocaleString()} {language === 'pt' ? 'beneficiários' : 'beneficiaries'}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {(language === 'pt' ? pool.culturalImpact.projectsPt : pool.culturalImpact.projects).slice(0, 2).map((project, index) => (
                              <span key={index} className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-center text-sm">
                          <div>
                            <div className="font-semibold text-secondary-800">{formatTokenAmount(pool.totalStaked)}</div>
                            <div className="text-gray-500 text-xs">{language === 'pt' ? 'Total Investido' : 'Total Staked'}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-emerald-600">{formatTokenAmount(pool.userStaked)}</div>
                            <div className="text-gray-500 text-xs">{language === 'pt' ? 'Seu Investimento' : 'Your Stake'}</div>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => stakeTokens(pool.id, 100)}
                          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                        >
                          {language === 'pt' ? 'Investir Tokens' : 'Stake Tokens'}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Governance Tab */}
            {activeTab === 'governance' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800">
                    {language === 'pt' ? 'Governança da Comunidade' : 'Community Governance'}
                  </h2>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-600">{formatTokenAmount(userVotingPower)}</div>
                    <div className="text-sm text-gray-500">{language === 'pt' ? 'Poder de Voto' : 'Voting Power'}</div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {governanceProposals.map((proposal) => (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-secondary-800">
                              {language === 'pt' ? proposal.titlePt : proposal.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              proposal.status === 'active' ? 'bg-blue-100 text-blue-800' :
                              proposal.status === 'passed' ? 'bg-green-100 text-green-800' :
                              proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-secondary-100 text-secondary-800'
                            }`}>
                              {proposal.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-secondary-600 mb-3">
                            {language === 'pt' ? proposal.descriptionPt : proposal.description}
                          </p>
                          <p className="text-sm text-purple-600 mb-3">
                            💡 {language === 'pt' ? proposal.culturalImpactPt : proposal.culturalImpact}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center text-sm">
                        <div>
                          <div className="font-semibold text-action-600">{formatTokenAmount(proposal.votesFor)}</div>
                          <div className="text-gray-500">{language === 'pt' ? 'Votos a Favor' : 'Votes For'}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-coral-600">{formatTokenAmount(proposal.votesAgainst)}</div>
                          <div className="text-gray-500">{language === 'pt' ? 'Votos Contra' : 'Votes Against'}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-purple-600">{formatTokenAmount(proposal.fundingRequired)}</div>
                          <div className="text-gray-500">{language === 'pt' ? 'Financiamento' : 'Funding'}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-orange-600">{proposal.expectedBeneficiaries.toLocaleString()}</div>
                          <div className="text-gray-500">{language === 'pt' ? 'Beneficiários' : 'Beneficiaries'}</div>
                        </div>
                      </div>
                      
                      {/* Voting Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>{language === 'pt' ? 'Progresso da Votação' : 'Voting Progress'}</span>
                          <span>{Math.round((proposal.votesFor + proposal.votesAgainst) / proposal.quorum * 100)}% {language === 'pt' ? 'do quórum' : 'of quorum'}</span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((proposal.votesFor + proposal.votesAgainst) / proposal.quorum * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {proposal.status === 'active' && (
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => voteOnProposal(proposal.id, true, userVotingPower)}
                            className="flex-1 bg-action-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                          >
                            <span>✓</span>
                            <span>{language === 'pt' ? 'Votar a Favor' : 'Vote For'}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => voteOnProposal(proposal.id, false, userVotingPower)}
                            className="flex-1 bg-coral-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                          >
                            <span>✗</span>
                            <span>{language === 'pt' ? 'Votar Contra' : 'Vote Against'}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedProposal(proposal)}
                            className="px-6 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-800 mb-6">
                  {language === 'pt' ? 'Conquistas Culturais' : 'Cultural Achievements'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`rounded-xl p-6 border-2 transition-all duration-300 ${
                        achievement.unlockedAt
                          ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-lg'
                          : 'bg-white border-gray-200 hover:border-secondary-300'
                      }`}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="text-lg font-bold text-secondary-800 mb-2">
                          {language === 'pt' ? achievement.titlePt : achievement.title}
                        </h3>
                        <p className="text-secondary-600 text-sm mb-3">
                          {language === 'pt' ? achievement.descriptionPt : achievement.description}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{language === 'pt' ? 'Progresso' : 'Progress'}</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <div className="w-full bg-secondary-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity.toUpperCase()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Coins className="h-4 w-4 text-emerald-600" />
                            <span className="font-bold text-emerald-600">{achievement.tokenReward}</span>
                          </div>
                        </div>
                        
                        {achievement.unlockedAt && (
                          <div className="text-center pt-3 border-t border-yellow-200">
                            <div className="text-xs text-yellow-800 font-semibold">
                              🏆 {language === 'pt' ? 'Desbloqueado em' : 'Unlocked on'} {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Marketplace Tab */}
            {activeTab === 'marketplace' && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-800 mb-6">
                  {language === 'pt' ? 'Mercado de Tokens' : 'Token Marketplace'}
                </h2>
                <div className="text-center py-12">
                  <Gift className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-secondary-600 mb-4">
                    {language === 'pt' ? 'Mercado em Desenvolvimento' : 'Marketplace Coming Soon'}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {language === 'pt'
                      ? 'Estamos a desenvolver um mercado onde poderá trocar tokens por produtos portugueses exclusivos, experiências culturais e serviços da comunidade.'
                      : 'We\'re developing a marketplace where you can exchange tokens for exclusive Portuguese products, cultural experiences, and community services.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-secondary-800 mb-6">
            {language === 'pt' ? 'Transações Recentes' : 'Recent Transactions'}
          </h2>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    tx.type === 'earned' ? 'bg-green-100 text-action-600' :
                    tx.type === 'staked' ? 'bg-blue-100 text-primary-600' :
                    tx.type === 'spent' ? 'bg-red-100 text-coral-600' :
                    'bg-secondary-100 text-secondary-600'
                  }`}>
                    {tx.type === 'earned' && <Zap className="h-5 w-5" />}
                    {tx.type === 'staked' && <Target className="h-5 w-5" />}
                    {tx.type === 'spent' && <Gift className="h-5 w-5" />}
                    {tx.type === 'governance' && <Users className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-800">
                      {language === 'pt' ? tx.descriptionPt : tx.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(tx.timestamp).toLocaleDateString()}
                      {tx.culturalActivity && (
                        <span className="ml-2 text-purple-600">• {tx.culturalActivity}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  tx.type === 'earned' ? 'text-action-600' :
                  tx.type === 'spent' ? 'text-coral-600' :
                  'text-primary-600'
                }`}>
                  {tx.type === 'earned' ? '+' : tx.type === 'spent' ? '-' : ''}{tx.amount} LT
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LusoCommunityToken;