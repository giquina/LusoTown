/**
 * Ad Network Configuration Component
 * Allows easy swapping between ad networks (Google AdSense, Ezoic, Propeller, etc.)
 */

'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Toggle, 
  Save, 
  Eye, 
  EyeOff, 
  Globe, 
  Target,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AdNetwork {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'testing';
  priority: number;
  publisher_id?: string;
  site_id?: string;
  api_key?: string;
  custom_config: Record<string, any>;
  target_countries: string[];
  target_languages: string[];
  fill_rate: number;
  average_cpm: number;
}

interface AdNetworkConfig {
  google_adsense: {
    label: string;
    fields: Array<{
      key: string;
      label: { pt: string; en: string };
      type: 'text' | 'password' | 'textarea';
      required: boolean;
      placeholder?: { pt: string; en: string };
    }>;
  };
  ezoic: {
    label: string;
    fields: Array<{
      key: string;
      label: { pt: string; en: string };
      type: 'text' | 'password' | 'textarea';
      required: boolean;
      placeholder?: { pt: string; en: string };
    }>;
  };
  propeller: {
    label: string;
    fields: Array<{
      key: string;
      label: { pt: string; en: string };
      type: 'text' | 'password' | 'textarea';
      required: boolean;
      placeholder?: { pt: string; en: string };
    }>;
  };
  custom: {
    label: string;
    fields: Array<{
      key: string;
      label: { pt: string; en: string };
      type: 'text' | 'password' | 'textarea';
      required: boolean;
      placeholder?: { pt: string; en: string };
    }>;
  };
}

const NETWORK_CONFIGS: AdNetworkConfig = {
  google_adsense: {
    label: 'Google AdSense',
    fields: [
      {
        key: 'publisher_id',
        label: { pt: 'ID do Editor', en: 'Publisher ID' },
        type: 'text',
        required: true,
        placeholder: { pt: 'pub-1234567890123456', en: 'pub-1234567890123456' }
      },
      {
        key: 'ad_client',
        label: { pt: 'Cliente de Anúncio', en: 'Ad Client' },
        type: 'text',
        required: false,
        placeholder: { pt: 'ca-pub-1234567890123456', en: 'ca-pub-1234567890123456' }
      }
    ]
  },
  ezoic: {
    label: 'Ezoic',
    fields: [
      {
        key: 'site_id',
        label: { pt: 'ID do Site', en: 'Site ID' },
        type: 'text',
        required: true,
        placeholder: { pt: '123456', en: '123456' }
      },
      {
        key: 'api_key',
        label: { pt: 'Chave da API', en: 'API Key' },
        type: 'password',
        required: true,
        placeholder: { pt: 'Chave secreta da API', en: 'Secret API key' }
      }
    ]
  },
  propeller: {
    label: 'Propeller Ads',
    fields: [
      {
        key: 'zone_id',
        label: { pt: 'ID da Zona', en: 'Zone ID' },
        type: 'text',
        required: true,
        placeholder: { pt: '123456', en: '123456' }
      },
      {
        key: 'website_id',
        label: { pt: 'ID do Website', en: 'Website ID' },
        type: 'text',
        required: false,
        placeholder: { pt: '789012', en: '789012' }
      }
    ]
  },
  custom: {
    label: 'Custom Network',
    fields: [
      {
        key: 'network_name',
        label: { pt: 'Nome da Rede', en: 'Network Name' },
        type: 'text',
        required: true,
        placeholder: { pt: 'Nome da sua rede personalizada', en: 'Your custom network name' }
      },
      {
        key: 'api_endpoint',
        label: { pt: 'Endpoint da API', en: 'API Endpoint' },
        type: 'text',
        required: true,
        placeholder: { pt: 'https://api.suarede.com', en: 'https://api.yournetwork.com' }
      },
      {
        key: 'api_key',
        label: { pt: 'Chave da API', en: 'API Key' },
        type: 'password',
        required: true,
        placeholder: { pt: 'Chave secreta da API', en: 'Secret API key' }
      },
      {
        key: 'custom_config',
        label: { pt: 'Configuração Personalizada (JSON)', en: 'Custom Configuration (JSON)' },
        type: 'textarea',
        required: false,
        placeholder: { pt: '{"custom": "settings"}', en: '{"custom": "settings"}' }
      }
    ]
  }
};

export function AdNetworkConfiguration() {
  const { t } = useLanguage();
  const [networks, setNetworks] = useState<AdNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<AdNetwork | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const streamingServerUrl = process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080';

  // Fetch ad networks
  const fetchNetworks = async () => {
    try {
      setLoading(true);
      // This would be a protected admin endpoint
      const response = await fetch(`${streamingServerUrl}/api/ads/config/admin`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Admin auth
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNetworks(data.networks || []);
      } else {
        // Fallback to mock data for demo
        const mockNetworks: AdNetwork[] = [
          {
            id: '1',
            name: 'Google AdSense',
            type: 'google_adsense',
            status: 'active',
            priority: 1,
            publisher_id: 'pub-****',
            custom_config: {},
            target_countries: ['PT', 'BR', 'GB', 'US'],
            target_languages: ['pt', 'en'],
            fill_rate: 85.5,
            average_cpm: 0.75
          },
          {
            id: '2',
            name: 'Ezoic',
            type: 'ezoic',
            status: 'inactive',
            priority: 2,
            site_id: '',
            custom_config: {},
            target_countries: ['PT', 'BR', 'GB', 'US'],
            target_languages: ['pt', 'en'],
            fill_rate: 0,
            average_cpm: 0
          },
          {
            id: '3',
            name: 'Propeller Ads',
            type: 'propeller',
            status: 'inactive',
            priority: 3,
            custom_config: {},
            target_countries: ['PT', 'BR', 'GB', 'US'],
            target_languages: ['pt', 'en'],
            fill_rate: 0,
            average_cpm: 0
          },
          {
            id: '4',
            name: 'LusoTown Promos',
            type: 'lusotown_promo',
            status: 'active',
            priority: 999,
            custom_config: {},
            target_countries: ['PT', 'BR', 'GB', 'US', 'CA', 'FR'],
            target_languages: ['pt', 'en'],
            fill_rate: 100,
            average_cpm: 0.50
          }
        ];
        setNetworks(mockNetworks);
      }
    } catch (err) {
      setError('Failed to fetch ad networks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save network configuration
  const saveNetwork = async (network: AdNetwork) => {
    try {
      setSaving(true);
      setError(null);
      
      // This would save to the database
      const response = await fetch(`${streamingServerUrl}/api/ads/config/admin/${network.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(network)
      });
      
      if (response.ok) {
        setSuccess('Network configuration saved successfully');
        setIsEditing(false);
        fetchNetworks();
      } else {
        // Mock success for demo
        setNetworks(prev => prev.map(n => n.id === network.id ? network : n));
        setSuccess('Network configuration saved successfully');
        setIsEditing(false);
      }
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save network configuration');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Toggle network status
  const toggleNetworkStatus = async (network: AdNetwork) => {
    const newStatus = network.status === 'active' ? 'inactive' : 'active';
    await saveNetwork({ ...network, status: newStatus });
  };

  // Update network priority
  const updatePriority = async (network: AdNetwork, newPriority: number) => {
    await saveNetwork({ ...network, priority: newPriority });
  };

  useEffect(() => {
    fetchNetworks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">{t({ pt: 'Carregando configurações...', en: 'Loading configurations...' })}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t({ pt: 'Configuração de Redes de Anúncios', en: 'Ad Network Configuration' })}
          </h1>
          <p className="text-gray-600">
            {t({ 
              pt: 'Gerencie e configure redes de anúncios para monetização da comunidade portuguesa', 
              en: 'Manage and configure ad networks for Portuguese community monetization' 
            })}
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
          >
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
          >
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-700">{success}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Networks List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t({ pt: 'Redes de Anúncios Disponíveis', en: 'Available Ad Networks' })}
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {networks.map((network) => (
                  <div
                    key={network.id}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedNetwork(network);
                      setIsEditing(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          network.status === 'active' 
                            ? 'bg-green-100 text-green-600'
                            : network.status === 'testing'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Globe className="w-5 h-5" />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">{network.name}</h3>
                          <p className="text-sm text-gray-600">{network.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {network.fill_rate.toFixed(1)}% Fill Rate
                          </p>
                          <p className="text-sm text-gray-600">
                            £{network.average_cpm.toFixed(2)} CPM
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Priority {network.priority}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNetworkStatus(network);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              network.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                network.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            {selectedNetwork ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedNetwork.name}
                    </h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {isEditing ? (
                    <NetworkConfigForm
                      network={selectedNetwork}
                      onSave={saveNetwork}
                      onCancel={() => setIsEditing(false)}
                      saving={saving}
                    />
                  ) : (
                    <NetworkConfigView network={selectedNetwork} />
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  {t({ 
                    pt: 'Selecione uma rede de anúncios para configurar', 
                    en: 'Select an ad network to configure' 
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Network configuration form
function NetworkConfigForm({ 
  network, 
  onSave, 
  onCancel, 
  saving 
}: { 
  network: AdNetwork; 
  onSave: (network: AdNetwork) => void; 
  onCancel: () => void;
  saving: boolean;
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(network);
  const config = NETWORK_CONFIGS[network.type as keyof AdNetworkConfig];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
      custom_config: {
        ...prev.custom_config,
        [key]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {config?.fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t(field.label)}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              value={formData.custom_config[field.key] || ''}
              onChange={(e) => updateField(field.key, e.target.value)}
              required={field.required}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={field.placeholder ? t(field.placeholder) : ''}
            />
          ) : (
            <input
              type={field.type}
              value={formData.custom_config[field.key] || formData[field.key as keyof AdNetwork] || ''}
              onChange={(e) => updateField(field.key, e.target.value)}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={field.placeholder ? t(field.placeholder) : ''}
            />
          )}
        </div>
      ))}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t({ pt: 'Prioridade', en: 'Priority' })}
        </label>
        <input
          type="number"
          min="1"
          max="999"
          value={formData.priority}
          onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center justify-center"
        >
          {saving ? (
            <Loader className="animate-spin w-4 h-4 mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {t({ pt: 'Salvar', en: 'Save' })}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {t({ pt: 'Cancelar', en: 'Cancel' })}
        </button>
      </div>
    </form>
  );
}

// Network configuration view
function NetworkConfigView({ network }: { network: AdNetwork }) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          {t({ pt: 'Status', en: 'Status' })}
        </h4>
        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
          network.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : network.status === 'testing'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {network.status}
        </span>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          {t({ pt: 'Performance', en: 'Performance' })}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fill Rate:</span>
            <span className="font-medium">{network.fill_rate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Average CPM:</span>
            <span className="font-medium">£{network.average_cpm.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Priority:</span>
            <span className="font-medium">{network.priority}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          {t({ pt: 'Segmentação', en: 'Targeting' })}
        </h4>
        <div className="space-y-2">
          <div>
            <span className="text-sm text-gray-600">Countries:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {network.target_countries.map(country => (
                <span key={country} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {country}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-600">Languages:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {network.target_languages.map(lang => (
                <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}