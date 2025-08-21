"use client";

import { motion } from "framer-motion";
import {
  EyeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Users, Activity, BarChart3, Globe } from "lucide-react";

interface StreamViewerStatsProps {
  currentViewers: number;
  peakViewers: number;
  totalViews: number;
  language: string;
}

export default function StreamViewerStats({
  currentViewers,
  peakViewers,
  totalViews,
  language,
}: StreamViewerStatsProps) {
  // Calculate growth percentage (mock heuristic). If low traffic, keep neutral to avoid misleading negatives.
  let viewerGrowth = Math.round(
    ((currentViewers - peakViewers * 0.8) / (peakViewers * 0.8)) * 100
  );
  const isLowTraffic = peakViewers <= 5 || currentViewers <= 1;
  if (isLowTraffic || !isFinite(viewerGrowth)) viewerGrowth = 0;

  const stats = [
    {
      id: "current",
      label: language === "pt" ? "Espectadores Atuais" : "Current Viewers",
      value: currentViewers.toLocaleString(),
      icon: EyeIcon,
      color: "text-action-600",
      bgColor: "bg-action-100",
      change:
        currentViewers === 0
          ? language === "pt" ? "aguardando" : "waiting"
          : viewerGrowth > 0
          ? `+${viewerGrowth}%`
          : "—",
      changeColor: viewerGrowth > 0 ? "text-secondary-600" : "text-gray-400",
    },
    {
      id: "peak",
      label: language === "pt" ? "Pico de Audiência" : "Peak Viewers",
      value: peakViewers.toLocaleString(),
      icon: ArrowTrendingUpIcon,
      color: "text-secondary-600",
      bgColor: "bg-secondary-100",
      change: language === "pt" ? "hoje" : "today",
      changeColor: "text-gray-500",
    },
    {
      id: "total",
      label: language === "pt" ? "Total de Visualizações" : "Total Views",
      value: totalViews.toLocaleString(),
      icon: BarChart3,
      color: "text-primary-600",
      bgColor: "bg-primary-100",
      change: language === "pt" ? "histórico" : "all time",
      changeColor: "text-gray-500",
    },
  ];

  // Mock engagement data
  const engagementStats = [
    {
      label: language === "pt" ? "Tempo Médio" : "Avg. Watch Time",
      value: "23min",
      icon: ClockIcon,
    },
    {
      label: language === "pt" ? "Engagement" : "Engagement Rate",
      value: "87%",
      icon: Activity,
    },
    {
      label: language === "pt" ? "Comunidade PT" : "PT Community",
      value: "92%",
      icon: Globe,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {language === "pt" ? "Estatísticas Ao Vivo" : "Live Statistics"}
        </h3>
      </div>

      {/* Main Stats */}
      <div className="space-y-4 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
              </div>
              <div className={`text-xs ${stat.changeColor} font-medium`}>
                {stat.change}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Engagement Metrics */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          {language === "pt" ? "Métricas de Engagement" : "Engagement Metrics"}
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {engagementStats.map((metric, index) => {
            const IconComponent = metric.icon;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + 0.1 * index }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{metric.label}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {metric.value}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-3 bg-gradient-to-r from-action-50 to-secondary-50 border border-action-200 rounded-lg"
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-action-500 rounded-full"
          />
          <span className="text-sm font-medium text-action-700">
            {language === "pt" ? "Estatísticas ao vivo" : "Live statistics"}
          </span>
        </div>
        <div className="text-xs text-center text-gray-600 mt-1">
          {language === "pt"
            ? "Atualizadas a cada 30 segundos"
            : "Updated every 30 seconds"}
        </div>
      </motion.div>

      {/* Community Insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          {language === "pt" ? "Insights da Comunidade" : "Community Insights"}
        </h4>

        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>
              {language === "pt" ? "Membros Premium:" : "Premium Members:"}
            </span>
            <span className="font-medium">34%</span>
          </div>
          <div className="flex justify-between">
            <span>
              {language === "pt" ? "Novos Espectadores:" : "New Viewers:"}
            </span>
            <span className="font-medium">18%</span>
          </div>
          <div className="flex justify-between">
            <span>
              {language === "pt" ? "Dispositivos Móveis:" : "Mobile Devices:"}
            </span>
            <span className="font-medium">67%</span>
          </div>
          <div className="flex justify-between">
            <span>
              {language === "pt" ? "Localização Londres:" : "London Location:"}
            </span>
            <span className="font-medium">78%</span>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="mt-4">
        <div className="text-xs text-gray-500 text-center">
          {language === "pt"
            ? `Última atualização: ${new Date().toLocaleTimeString("pt-PT")}`
            : `Last updated: ${new Date().toLocaleTimeString("en-GB")}`}
        </div>
      </div>
    </motion.div>
  );
}
