"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { authService } from "@/lib/auth";
import { plans, formatPrice } from "@/config/pricing";

export interface EmailSequenceConfig {
  type:
    | "welcome"
    | "trial_reminder_day3"
    | "trial_reminder_day6"
    | "trial_expired"
    | "upgrade_sequence"
    | "retention";
  delayDays?: number;
  delayHours?: number;
  conditions?: {
    hasTrialStarted?: boolean;
    isTrialActive?: boolean;
    hasSubscription?: boolean;
    daysSinceSignup?: number;
    lastActivityDays?: number;
  };
}

interface EmailTemplate {
  subject: { en: string; pt: string };
  preheader: { en: string; pt: string };
  content: { en: string; pt: string };
  cta: { en: string; pt: string };
  ctaUrl: string;
}

// Email template configurations
const EMAIL_TEMPLATES: Record<EmailSequenceConfig["type"], EmailTemplate> = {
  welcome: {
    subject: {
      en: "Welcome to LusoTown - Your Portuguese Community in London! 🇵🇹",
      pt: "Bem-vindo ao LusoTown - A Sua Comunidade Portuguesa em Londres! 🇵🇹",
    },
    preheader: {
      en: "Start connecting with Portuguese speakers in London today",
      pt: "Comece a conectar com falantes de português em Londres hoje",
    },
    content: {
      en: `
        <h1>Bem-vindos à Comunidade Portuguesa em Londres!</h1>
        
        <p>Welcome to LusoTown! We're thrilled to have you join our vibrant community of Portuguese speakers in London.</p>
        
        <h2>What you can do right now:</h2>
        <ul>
          <li><strong>Find Your Match:</strong> Connect with 3 Portuguese community members daily</li>
          <li><strong>Join Events:</strong> Discover Portuguese cultural events and meetups</li>
          <li><strong>Send Messages:</strong> Start conversations with up to 10 messages monthly</li>
          <li><strong>Explore Culture:</strong> Access Portuguese cultural content and resources</li>
        </ul>
        
        <div style="background: linear-gradient(135deg, #006633, #FF0000); padding: 24px; border-radius: 12px; margin: 24px 0;">
          <h3 style="color: white; margin-bottom: 16px;">🎉 Special Launch Offer</h3>
          <p style="color: white; margin-bottom: 20px;">Join thousands of Portuguese speakers with unlimited access to community features!</p>
          <p style="color: white; font-size: 18px; font-weight: bold;">Try Community Premium FREE for 7 days</p>
        </div>
        
        <h3>Popular with Portuguese Community Members:</h3>
        <ul>
          <li>📍 Portuguese business networking events in Central London</li>
          <li>🎭 Fado nights and cultural performances</li>
          <li>👨‍👩‍👧‍👦 Family-friendly Portuguese festivals and celebrations</li>
          <li>🍽️ Traditional Portuguese food and restaurant meetups</li>
          <li>⚽ Football watching parties (Benfica, Porto, Sporting)</li>
        </ul>
      `,
      pt: `
        <h1>Bem-vindos à Comunidade Portuguesa em Londres!</h1>
        
        <p>Bem-vindo ao LusoTown! Estamos muito contentes por se juntar à nossa vibrante comunidade de falantes de português em Londres.</p>
        
        <h2>O que pode fazer agora mesmo:</h2>
        <ul>
          <li><strong>Encontre o Seu Match:</strong> Conecte-se com 3 membros da comunidade portuguesa diariamente</li>
          <li><strong>Participe em Eventos:</strong> Descubra eventos culturais portugueses e encontros</li>
          <li><strong>Envie Mensagens:</strong> Inicie conversas com até 10 mensagens mensais</li>
          <li><strong>Explore a Cultura:</strong> Aceda a conteúdo cultural português e recursos</li>
        </ul>
        
        <div style="background: linear-gradient(135deg, #006633, #FF0000); padding: 24px; border-radius: 12px; margin: 24px 0;">
          <h3 style="color: white; margin-bottom: 16px;">🎉 Oferta Especial de Lançamento</h3>
          <p style="color: white; margin-bottom: 20px;">Junte-se a milhares de falantes de português com acesso ilimitado às funcionalidades da comunidade!</p>
          <p style="color: white; font-size: 18px; font-weight: bold;">Experimente o Premium da Comunidade GRÁTIS por 7 dias</p>
        </div>
        
        <h3>Popular entre os Membros da Comunidade Portuguesa:</h3>
        <ul>
          <li>📍 Eventos de networking empresarial português no Centro de Londres</li>
          <li>🎭 Noites de fado e performances culturais</li>
          <li>👨‍👩‍👧‍👦 Festivais e celebrações portuguesas familiares</li>
          <li>🍽️ Encontros de comida tradicional portuguesa e restaurantes</li>
          <li>⚽ Festas para ver futebol (Benfica, Porto, Sporting)</li>
        </ul>
      `,
    },
    cta: {
      en: "Start Your Free Trial",
      pt: "Iniciar Teste Gratuito",
    },
    ctaUrl: "/subscription?trial=true",
  },

  trial_reminder_day3: {
    subject: {
      en: "Your LusoTown trial - 4 days left to explore! ⏰",
      pt: "O seu teste LusoTown - 4 dias restantes para explorar! ⏰",
    },
    preheader: {
      en: "Have you tried unlimited matches with Portuguese speakers yet?",
      pt: "Já experimentou matches ilimitados com falantes de português?",
    },
    content: {
      en: `
        <h1>How's your LusoTown experience going?</h1>
        
        <p>You're 3 days into your free trial - we hope you're loving the unlimited access to our Portuguese community features!</p>
        
        <h2>Trial members are loving:</h2>
        <ul>
          <li>🔄 <strong>Unlimited Matches:</strong> No daily limits - find as many connections as you want</li>
          <li>💬 <strong>Unlimited Messaging:</strong> Keep conversations flowing with Portuguese speakers</li>
          <li>🎭 <strong>Premium Events:</strong> Access exclusive Portuguese cultural events in London</li>
          <li>✅ <strong>Verified Profiles:</strong> Your profile gets a verification badge</li>
        </ul>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #1a365d;">💡 Pro Tip from Other Portuguese Members:</h3>
          <p style="color: #4a5568;">"Use the cultural compatibility filters to find Portuguese speakers who share your interests - whether it's football, fado, or business networking!"</p>
        </div>
        
        <p><strong>4 days left</strong> to experience everything. After that, you'll return to the free plan (3 matches/day, 10 messages/month).</p>
      `,
      pt: `
        <h1>Como está a correr a sua experiência LusoTown?</h1>
        
        <p>Está há 3 dias no seu teste gratuito - esperamos que esteja a adorar o acesso ilimitado às funcionalidades da nossa comunidade portuguesa!</p>
        
        <h2>Os membros do teste estão a adorar:</h2>
        <ul>
          <li>🔄 <strong>Matches Ilimitados:</strong> Sem limites diários - encontre tantas conexões quantas quiser</li>
          <li>💬 <strong>Mensagens Ilimitadas:</strong> Mantenha conversas a fluir com falantes de português</li>
          <li>🎭 <strong>Eventos Premium:</strong> Aceda a eventos culturais portugueses exclusivos em Londres</li>
          <li>✅ <strong>Perfis Verificados:</strong> O seu perfil recebe um distintivo de verificação</li>
        </ul>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #1a365d;">💡 Dica Pro de Outros Membros Portugueses:</h3>
          <p style="color: #4a5568;">"Use os filtros de compatibilidade cultural para encontrar falantes de português que partilham os seus interesses - seja futebol, fado ou networking empresarial!"</p>
        </div>
        
        <p><strong>4 dias restantes</strong> para experimentar tudo. Depois disso, voltará ao plano gratuito (3 matches/dia, 10 mensagens/mês).</p>
      `,
    },
    cta: {
      en: "Continue Your Trial",
      pt: "Continuar o Seu Teste",
    },
    ctaUrl: "/matches",
  },

  trial_reminder_day6: {
    subject: {
      en: "⚡ Last day of your LusoTown trial - Don't miss out!",
      pt: "⚡ Último dia do seu teste LusoTown - Não perca!",
    },
    preheader: {
      en: "Your trial expires tomorrow - continue your Portuguese community journey",
      pt: "O seu teste expira amanhã - continue a sua jornada na comunidade portuguesa",
    },
    content: {
      en: `
        <h1>Your trial ends tomorrow! ⏰</h1>
        
        <p>Your 7-day free trial of LusoTown Community Premium expires in 24 hours. We hope you've enjoyed unlimited access to our Portuguese community features!</p>
        
        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
          <h3 style="margin-bottom: 12px;">⏳ Less than 24 hours remaining</h3>
          <p style="margin-bottom: 0;">Continue with Community Premium at just ${formatPrice(
            plans.community.monthly
          )}/month</p>
        </div>
        
        <h2>What you'll lose without Premium:</h2>
        <ul>
          <li>❌ Back to 3 matches per day (instead of unlimited)</li>
          <li>❌ Only 10 messages per month (instead of unlimited)</li>
          <li>❌ No access to premium Portuguese cultural events</li>
          <li>❌ No profile verification badge</li>
        </ul>
        
        <h2>What Portuguese Community Members Say:</h2>
        <div style="background: #f9fafb; border-left: 4px solid #10b981; padding: 16px; margin: 16px 0;">
          <p style="font-style: italic; margin-bottom: 8px;">"The premium features helped me find my Portuguese business partner and we now run successful events together in London!"</p>
          <p style="color: #6b7280; font-size: 14px;">— Maria Santos, Premium Member</p>
        </div>
        
        <p>Join 2,500+ Portuguese speakers who trust LusoTown for authentic community connections in London.</p>
      `,
      pt: `
        <h1>O seu teste termina amanhã! ⏰</h1>
        
        <p>O seu teste gratuito de 7 dias do LusoTown Community Premium expira em 24 horas. Esperamos que tenha gostado do acesso ilimitado às funcionalidades da nossa comunidade portuguesa!</p>
        
        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
          <h3 style="margin-bottom: 12px;">⏳ Menos de 24 horas restantes</h3>
          <p style="margin-bottom: 0;">Continue com Community Premium por apenas ${formatPrice(
            plans.community.monthly
          )}/mês</p>
        </div>
        
        <h2>O que perderá sem Premium:</h2>
        <ul>
          <li>❌ Volta a 3 matches por dia (em vez de ilimitados)</li>
          <li>❌ Apenas 10 mensagens por mês (em vez de ilimitadas)</li>
          <li>❌ Sem acesso a eventos culturais portugueses premium</li>
          <li>❌ Sem distintivo de verificação de perfil</li>
        </ul>
        
        <h2>O Que Dizem os Membros da Comunidade Portuguesa:</h2>
        <div style="background: #f9fafb; border-left: 4px solid #10b981; padding: 16px; margin: 16px 0;">
          <p style="font-style: italic; margin-bottom: 8px;">"As funcionalidades premium ajudaram-me a encontrar o meu parceiro de negócios português e agora organizamos eventos bem-sucedidos em Londres!"</p>
          <p style="color: #6b7280; font-size: 14px;">— Maria Santos, Membro Premium</p>
        </div>
        
        <p>Junte-se a 2.500+ falantes de português que confiam no LusoTown para conexões comunitárias autênticas em Londres.</p>
      `,
    },
    cta: {
      en: "Continue with Premium",
      pt: "Continuar com Premium",
    },
    ctaUrl: "/subscription?upgrade=community",
  },

  trial_expired: {
    subject: {
      en: "Your trial has ended - Special 20% discount for Portuguese community members",
      pt: "O seu teste terminou - Desconto especial de 20% para membros da comunidade portuguesa",
    },
    preheader: {
      en: "Come back with a special discount just for Portuguese speakers",
      pt: "Volte com um desconto especial só para falantes de português",
    },
    content: {
      en: `
        <h1>We miss you in our Portuguese community! 💔</h1>
        
        <p>Your LusoTown trial ended, but we'd love to welcome you back with a special offer.</p>
        
        <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center;">
          <h3 style="margin-bottom: 16px;">🎉 Exclusive Portuguese Community Discount</h3>
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">20% OFF</p>
          <p style="margin-bottom: 16px;">Community Premium - Just £15.99/month</p>
          <p style="font-size: 14px; opacity: 0.9;">Use code: LUSO20 (Valid for 7 days only)</p>
        </div>
        
        <h2>What you're missing:</h2>
        <ul>
          <li>🤝 Unlimited matches with Portuguese speakers in London</li>
          <li>💬 Unlimited messaging to build real connections</li>
          <li>🎭 Access to exclusive Portuguese cultural events</li>
          <li>✅ Verified profile badge for authenticity</li>
          <li>🏆 Priority visibility to other community members</li>
        </ul>
        
        <p>This discount is our way of saying obrigado for considering our Portuguese community platform.</p>
        
        <p style="color: #6b7280; font-size: 14px;">Offer expires in 7 days. Cannot be combined with other offers.</p>
      `,
      pt: `
        <h1>Temos saudades suas na nossa comunidade portuguesa! 💔</h1>
        
        <p>O seu teste LusoTown terminou, mas adoraríamos recebê-lo de volta com uma oferta especial.</p>
        
        <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center;">
          <h3 style="margin-bottom: 16px;">🎉 Desconto Exclusivo da Comunidade Portuguesa</h3>
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">20% DESCONTO</p>
          <p style="margin-bottom: 16px;">Community Premium - Apenas £15.99/mês</p>
          <p style="font-size: 14px; opacity: 0.9;">Use o código: LUSO20 (Válido apenas por 7 dias)</p>
        </div>
        
        <h2>O que está a perder:</h2>
        <ul>
          <li>🤝 Matches ilimitados com falantes de português em Londres</li>
          <li>💬 Mensagens ilimitadas para construir conexões reais</li>
          <li>🎭 Acesso a eventos culturais portugueses exclusivos</li>
          <li>✅ Distintivo de perfil verificado para autenticidade</li>
          <li>🏆 Visibilidade prioritária para outros membros da comunidade</li>
        </ul>
        
        <p>Este desconto é a nossa maneira de dizer obrigado por considerar a nossa plataforma da comunidade portuguesa.</p>
        
        <p style="color: #6b7280; font-size: 14px;">Oferta expira em 7 dias. Não pode ser combinada com outras ofertas.</p>
      `,
    },
    cta: {
      en: "Claim 20% Discount",
      pt: "Reclamar 20% Desconto",
    },
    ctaUrl: "/subscription?code=LUSO20",
  },

  upgrade_sequence: {
    subject: {
      en: "Unlock more Portuguese community connections 🇵🇹",
      pt: "Desbloqueie mais conexões da comunidade portuguesa 🇵🇹",
    },
    preheader: {
      en: "You're popular! Upgrade to connect with everyone interested in you",
      pt: "És popular! Faça upgrade para conectar com todos interessados em si",
    },
    content: {
      en: `
        <h1>You're making great connections! 🌟</h1>
        
        <p>We've noticed you're actively using LusoTown and connecting with other Portuguese speakers in London. That's fantastic!</p>
        
        <h2>Did you know?</h2>
        <ul>
          <li>📊 You've used your daily matches 8 times this month</li>
          <li>💬 You've sent messages to Portuguese community members</li>
          <li>👀 Other members are interested in connecting with you</li>
        </ul>
        
        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #92400e; margin-bottom: 12px;">⚡ You have potential matches waiting</h3>
          <p style="color: #92400e;">Upgrade to Community Premium to see who wants to connect with you and send unlimited messages!</p>
        </div>
        
        <h2>Premium members in London are connecting with:</h2>
        <ul>
          <li>🏢 Portuguese business professionals for networking</li>
          <li>👨‍👩‍👧‍👦 Portuguese families for cultural activities</li>
          <li>🎓 Students from Portuguese universities in London</li>
          <li>🎭 Artists and creators from Portuguese-speaking countries</li>
        </ul>
        
        <p>Ready to unlock your full potential in the Portuguese community?</p>
      `,
      pt: `
        <h1>Está a fazer ótimas conexões! 🌟</h1>
        
        <p>Notámos que está a usar ativamente o LusoTown e a conectar-se com outros falantes de português em Londres. Isso é fantástico!</p>
        
        <h2>Sabia que?</h2>
        <ul>
          <li>📊 Usou os seus matches diários 8 vezes este mês</li>
          <li>💬 Enviou mensagens para membros da comunidade portuguesa</li>
          <li>👀 Outros membros estão interessados em conectar consigo</li>
        </ul>
        
        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #92400e; margin-bottom: 12px;">⚡ Tem matches potenciais à espera</h3>
          <p style="color: #92400e;">Faça upgrade para Community Premium para ver quem quer conectar consigo e enviar mensagens ilimitadas!</p>
        </div>
        
        <h2>Os membros premium em Londres estão a conectar-se com:</h2>
        <ul>
          <li>🏢 Profissionais portugueses de negócios para networking</li>
          <li>👨‍👩‍👧‍👦 Famílias portuguesas para atividades culturais</li>
          <li>🎓 Estudantes de universidades portuguesas em Londres</li>
          <li>🎭 Artistas e criadores de países de língua portuguesa</li>
        </ul>
        
        <p>Pronto para desbloquear o seu potencial completo na comunidade portuguesa?</p>
      `,
    },
    cta: {
      en: "Upgrade to Premium",
      pt: "Fazer Upgrade para Premium",
    },
    ctaUrl: "/subscription?source=activity",
  },

  retention: {
    subject: {
      en: "Miss connecting with Portuguese speakers in London? Come back! 🏠",
      pt: "Sente falta de conectar com falantes de português em Londres? Volte! 🏠",
    },
    preheader: {
      en: "Your Portuguese community is waiting for you",
      pt: "A sua comunidade portuguesa está à sua espera",
    },
    content: {
      en: `
        <h1>We miss you! 💙</h1>
        
        <p>It's been a while since we've seen you in our Portuguese community. The LusoTown family isn't the same without you!</p>
        
        <h2>What's new in your Portuguese community:</h2>
        <ul>
          <li>🎭 5 new Portuguese cultural events added in London this month</li>
          <li>👥 250+ new Portuguese-speaking members joined</li>
          <li>🏢 New business networking group for Portuguese entrepreneurs</li>
          <li>⚽ Football viewing parties for Benfica, Porto, and Sporting</li>
        </ul>
        
        <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #065f46;">🎁 Welcome Back Gift</h3>
          <p style="color: #065f46;">Return today and get 3 extra daily matches for your first week back!</p>
        </div>
        
        <h2>Portuguese members recently found:</h2>
        <ul>
          <li>💼 Business partners for Portuguese import/export companies</li>
          <li>🏡 Housemates who speak Portuguese in London zones 2-3</li>
          <li>👶 Portuguese families for children's playdates and cultural education</li>
          <li>🎵 Musicians for Portuguese folk and fado music groups</li>
        </ul>
        
        <p>Your Portuguese community is waiting. Come home to LusoTown!</p>
      `,
      pt: `
        <h1>Temos saudades suas! 💙</h1>
        
        <p>Já passou algum tempo desde que o vimos na nossa comunidade portuguesa. A família LusoTown não é a mesma sem si!</p>
        
        <h2>Novidades na sua comunidade portuguesa:</h2>
        <ul>
          <li>🎭 5 novos eventos culturais portugueses adicionados em Londres este mês</li>
          <li>👥 250+ novos membros falantes de português juntaram-se</li>
          <li>🏢 Novo grupo de networking empresarial para empreendedores portugueses</li>
          <li>⚽ Festas para ver futebol do Benfica, Porto e Sporting</li>
        </ul>
        
        <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #065f46;">🎁 Presente de Boas-Vindas</h3>
          <p style="color: #065f46;">Volte hoje e receba 3 matches diários extra na sua primeira semana de volta!</p>
        </div>
        
        <h2>Membros portugueses encontraram recentemente:</h2>
        <ul>
          <li>💼 Parceiros de negócios para empresas portuguesas de importação/exportação</li>
          <li>🏡 Colegas de casa que falam português nas zonas 2-3 de Londres</li>
          <li>👶 Famílias portuguesas para encontros de crianças e educação cultural</li>
          <li>🎵 Músicos para grupos de música folclórica portuguesa e fado</li>
        </ul>
        
        <p>A sua comunidade portuguesa está à espera. Volte para casa no LusoTown!</p>
      `,
    },
    cta: {
      en: "Welcome Back - Get Extra Matches",
      pt: "Bem-vindo de Volta - Receber Matches Extra",
    },
    ctaUrl: "/login?welcome_back=true",
  },
};

// Email sequence manager
export class EmailSequenceManager {
  private static instance: EmailSequenceManager;

  static getInstance(): EmailSequenceManager {
    if (!EmailSequenceManager.instance) {
      EmailSequenceManager.instance = new EmailSequenceManager();
    }
    return EmailSequenceManager.instance;
  }

  // Queue an email to be sent
  async queueEmail(
    userId: string,
    emailType: EmailSequenceConfig["type"],
    config: Omit<EmailSequenceConfig, "type"> = {}
  ): Promise<boolean> {
    try {
      const response = await fetch("/api/email/queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          emailType,
          config: {
            ...config,
            type: emailType,
          },
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to queue email:", error);
      return false;
    }
  }

  // Send immediate email
  async sendEmail(
    userId: string,
    emailType: EmailSequenceConfig["type"],
    userLanguage: "en" | "pt" = "en"
  ): Promise<boolean> {
    try {
      const template = EMAIL_TEMPLATES[emailType];

      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          emailType,
          subject: template.subject[userLanguage],
          preheader: template.preheader[userLanguage],
          content: template.content[userLanguage],
          cta: template.cta[userLanguage],
          ctaUrl: template.ctaUrl,
          language: userLanguage,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }

  // Cancel scheduled emails
  async cancelEmailSequence(
    userId: string,
    emailType?: EmailSequenceConfig["type"]
  ): Promise<boolean> {
    try {
      const response = await fetch("/api/email/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          emailType,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to cancel email sequence:", error);
      return false;
    }
  }
}

// React component for managing email sequences
export function EmailSequenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const { trial, isInTrial, hasActiveSubscription, subscription } =
    useSubscription();
  const [emailManager] = useState(() => EmailSequenceManager.getInstance());

  // Handle new user welcome email
  useEffect(() => {
    const handleNewUser = async () => {
      const user = authService.getCurrentUser();
      if (!user || authService.isDemoUser()) return;

      // Check if this is a new user (signed up recently)
      const signupDate = new Date(user.joinedDate);
      const now = new Date();
      const daysSinceSignup = Math.floor(
        (now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceSignup === 0) {
        // New user - send welcome email
        await emailManager.sendEmail(user.id, "welcome", language);
      }
    };

    handleNewUser();
  }, [language, emailManager]);

  // Handle trial reminder emails
  useEffect(() => {
    const handleTrialEmails = async () => {
      const user = authService.getCurrentUser();
      if (!user || !trial || !isInTrial) return;

      const trialStart = new Date(trial.trial_start);
      const now = new Date();
      const daysSinceTrialStart = Math.floor(
        (now.getTime() - trialStart.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Day 3 reminder
      if (daysSinceTrialStart === 3) {
        await emailManager.queueEmail(user.id, "trial_reminder_day3");
      }

      // Day 6 reminder (last day)
      if (daysSinceTrialStart === 6) {
        await emailManager.queueEmail(user.id, "trial_reminder_day6");
      }
    };

    handleTrialEmails();
  }, [trial, isInTrial, emailManager]);

  // Handle trial expiry
  useEffect(() => {
    const handleTrialExpiry = async () => {
      const user = authService.getCurrentUser();
      if (!user || !trial || isInTrial || hasActiveSubscription) return;

      // Check if trial just expired (within last day)
      const trialEnd = new Date(trial.trial_end);
      const now = new Date();
      const hoursSinceTrialEnd = Math.floor(
        (now.getTime() - trialEnd.getTime()) / (1000 * 60 * 60)
      );

      if (hoursSinceTrialEnd >= 0 && hoursSinceTrialEnd <= 24) {
        await emailManager.queueEmail(user.id, "trial_expired", {
          delayHours: 2,
        });
      }
    };

    handleTrialExpiry();
  }, [trial, isInTrial, hasActiveSubscription, emailManager]);

  return <>{children}</>;
}

export default EmailSequenceManager;
