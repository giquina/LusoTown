"use client";

import { motion } from "framer-motion";
import { Tv, Mic, PlayCircle, DollarSign, Shield, Sparkles, Users, CheckCircle2, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import CreatorEarningsCalculator from "@/components/CreatorEarningsCalculator";

export default function StreamingInfoPage() {
	const { t, language } = useLanguage();
	const isPt = language === "pt";

	return (
		<div className="min-h-screen bg-white">
			{/* Hero */}
			<section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
				<div className="absolute inset-0 opacity-[0.08] pointer-events-none">
					<div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
					<div className="absolute -bottom-8 -right-8 w-72 h-72 bg-secondary-500 rounded-full blur-3xl" />
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="max-w-5xl mx-auto text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="inline-flex items-center gap-2 bg-primary-100 border border-primary-200 rounded-full px-5 py-2 text-sm font-medium text-primary-700 mb-6"
						>
							<Tv className="w-4 h-4" />
							{t("streaming.info.badge", isPt ? "Transmissões LusoTown" : "LusoTown Streaming")}
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.05 }}
							className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4"
						>
							{t(
								"streaming.info.title",
								isPt ? "Transmita connosco" : "Stream with us"
							)}
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
						>
							{t(
								"streaming.info.subtitle",
								isPt
									? "Partilhe música, cultura, workshops e eventos com a comunidade portuguesa em Londres e no Reino Unido. Simples de começar, generoso para criadores."
									: "Share music, culture, workshops, and events with the Portuguese community in London and the UK. Easy to start, generous for creators."
							)}
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.15 }}
							className="flex flex-col sm:flex-row gap-3 justify-center"
						>
							<a
								href="/creator-signup"
								className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
							>
								<Mic className="w-5 h-5" />
								{t("streaming.info.cta.apply", isPt ? "Candidatar-me para Criador" : "Apply as a Creator")}
								<ArrowRight className="w-5 h-5" />
							</a>
							<a
								href="/live"
								className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 font-semibold transition-all"
							>
								<PlayCircle className="w-5 h-5" />
								{t("streaming.info.cta.watch", isPt ? "Ver Live TV" : "Watch Live TV")}
							</a>
						</motion.div>
					</div>
				</div>
			</section>

			{/* How to sign up */}
			<section className="py-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold text-gray-900 mb-3">
								{t("streaming.info.how.title", isPt ? "Como inscrever-se" : "How to sign up")}
							</h2>
							<p className="text-gray-600 max-w-3xl mx-auto">
								{t(
									"streaming.info.how.subtitle",
									isPt
										? "Três passos simples para começar a transmitir e ganhar."
										: "Three simple steps to start streaming and earning."
								)}
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{[
								{
									icon: Users,
									title: isPt ? "Crie a sua conta" : "Create your account",
									desc: isPt
										? "Conte-nos sobre si e o tipo de conteúdo que quer partilhar."
										: "Tell us about you and the content you want to share.",
								},
								{
									icon: Shield,
									title: isPt ? "Verificação simples" : "Simple verification",
									desc: isPt
										? "Protegemos a comunidade com verificação leve e rápida."
										: "We keep the community safe with a quick, lightweight check.",
								},
								{
									icon: Sparkles,
									title: isPt ? "Comece a transmitir" : "Start streaming",
									desc: isPt
										? "Use telemóvel ou computador. Nós tratamos de pagamentos e audiência."
										: "Use your phone or computer. We handle payments and audience.",
								},
							].map((step, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ delay: i * 0.05 }}
									className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
								>
									<div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
										<step.icon className="w-6 h-6" />
									</div>
									<h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
									<p className="text-gray-600 text-sm">{step.desc}</p>
								</motion.div>
							))}
						</div>

						<div className="text-center mt-8">
							<a
								href="/creator-signup"
								className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary-600 hover:bg-secondary-700 text-white font-semibold transition-all"
							>
								<Mic className="w-5 h-5" />
								{t("streaming.info.how.cta", isPt ? "Quero começar a criar" : "I want to start creating")}
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Earnings */}
			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="flex items-center gap-3 mb-6">
							<DollarSign className="w-6 h-6 text-primary-600" />
							<h2 className="text-2xl font-bold text-gray-900">
								{t("streaming.info.earnings.title", isPt ? "Ganhos potenciais" : "Potential earnings")}
							</h2>
						</div>

						<p className="text-gray-600 mb-8">
							{t(
								"streaming.info.earnings.subtitle",
								isPt
									? "A nossa divisão 85/15 significa mais para si. Ajuste os valores abaixo para ver cenários realistas."
									: "Our 85/15 split means more for you. Tweak the values below to see realistic scenarios."
							)}
						</p>

						<CreatorEarningsCalculator />
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="py-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 mb-4">
									{t("streaming.info.hiw.title", isPt ? "Como funciona" : "How it works")}
								</h2>
								<ul className="space-y-4">
									{[
										isPt
											? "Transmita em direto do YouTube/RTMP — incorporamos e gerimos a experiência."
											: "Go live via YouTube/RTMP — we embed and manage the experience.",
										isPt
											? "Ganhe com doações, subscrições premium e workshops pagos."
											: "Earn from donations, premium subscriptions, and paid workshops.",
										isPt
											? "Ferramentas de chat e comunidade integradas para criar ligação real."
											: "Integrated chat and community tools to build real connection.",
										isPt
											? "Acompanhamento transparente de estatísticas e pagamentos."
											: "Transparent stats and payouts tracking.",
									].map((item, idx) => (
										<li key={idx} className="flex items-start gap-3">
											<CheckCircle2 className="w-5 h-5 text-secondary-600 mt-0.5" />
											<span className="text-gray-700">{item}</span>
										</li>
									))}
								</ul>

								<div className="mt-6">
									<a
										href="/creator-signup"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all"
									>
										<Mic className="w-5 h-5" />
										{t("streaming.info.hiw.cta", isPt ? "Candidatar-me agora" : "Apply now")}
									</a>
								</div>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
								<div className="flex items-center gap-2 mb-4">
									<Sparkles className="w-5 h-5 text-accent-600" />
									<h3 className="text-lg font-semibold text-gray-900">
										{t("streaming.info.benefits.title", isPt ? "Vantagens para criadores" : "Benefits for creators")}
									</h3>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{[
										isPt ? "Divisão justa 85/15" : "Fair 85/15 split",
										isPt ? "Apoio 24/7" : "24/7 support",
										isPt ? "Audiência portuguesa local" : "Local Portuguese audience",
										isPt ? "Ferramentas simples e eficazes" : "Simple, effective tools",
									].map((b, i) => (
										<div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-800">
											{b}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
