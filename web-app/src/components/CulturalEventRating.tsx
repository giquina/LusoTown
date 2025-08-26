"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StarIcon,
  HeartIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  CameraIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  FlagIcon,
  MusicalNoteIcon,
  InformationCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { Event, EventReview } from '@/lib/events';

interface CulturalEventRatingProps {
  event: Event;
  userReview?: EventReview | null;
  onSubmitReview: (review: {
    rating: number;
    comment: string;
    culturalValue: number;
    organizationQuality: number;
    venueRating: number;
    wouldRecommend: boolean;
    culturalAuthenticity: number;
    languageAccessibility: number;
    communityEngagement: number;
    tags: string[];
  }) => Promise<{ success: boolean; error?: string }>;
  onHelpfulVote: (reviewId: string, helpful: boolean) => Promise<void>;
  className?: string;
}

interface CulturalRatingData {
  overall: number;
  culturalValue: number;
  organizationQuality: number;
  venueRating: number;
  culturalAuthenticity: number;
  languageAccessibility: number;
  communityEngagement: number;
  wouldRecommend: boolean;
  comment: string;
  culturalHighlights: string[];
  improvementSuggestions: string[];
  recommendedFor: string[];
}

const CulturalEventRating: React.FC<CulturalEventRatingProps> = ({
  event,
  userReview,
  onSubmitReview,
  onHelpfulVote,
  className = ''
}) => {
  const { language, t } = useLanguage();
  const isPortuguese = language === 'pt';

  // Rating state
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState<CulturalRatingData>({
    overall: 0,
    culturalValue: 0,
    organizationQuality: 0,
    venueRating: 0,
    culturalAuthenticity: 0,
    languageAccessibility: 0,
    communityEngagement: 0,
    wouldRecommend: false,
    comment: '',
    culturalHighlights: [],
    improvementSuggestions: [],
    recommendedFor: []
  });

  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Cultural context detection
  const isCulturalEvent = event.tags.some(tag => 
    ['portuguese', 'brazilian', 'angolan', 'cape-verdean', 'cultural', 'heritage'].includes(tag.toLowerCase())
  );

  const culturalElements = [
    { key: 'fado', label: isPortuguese ? 'Fado' : 'Fado Music' },
    { key: 'cuisine', label: isPortuguese ? 'Culinária Portuguesa' : 'Portuguese Cuisine' },
    { key: 'language', label: isPortuguese ? 'Língua Portuguesa' : 'Portuguese Language' },
    { key: 'heritage', label: isPortuguese ? 'Património' : 'Heritage' },
    { key: 'community', label: isPortuguese ? 'Comunidade' : 'Community' },
    { key: 'traditions', label: isPortuguese ? 'Tradições' : 'Traditions' },
    { key: 'arts', label: isPortuguese ? 'Artes' : 'Arts' },
    { key: 'history', label: isPortuguese ? 'História' : 'History' }
  ];

  const recommendedForOptions = [
    { key: 'families', label: isPortuguese ? 'Famílias' : 'Families' },
    { key: 'couples', label: isPortuguese ? 'Casais' : 'Couples' },
    { key: 'singles', label: isPortuguese ? 'Solteiros' : 'Singles' },
    { key: 'students', label: isPortuguese ? 'Estudantes' : 'Students' },
    { key: 'seniors', label: isPortuguese ? 'Idosos' : 'Seniors' },
    { key: 'newcomers', label: isPortuguese ? 'Recém-chegados ao Reino Unido' : 'UK Newcomers' },
    { key: 'portuguese-learners', label: isPortuguese ? 'Aprendizes de Português' : 'Portuguese Learners' },
    { key: 'culture-enthusiasts', label: isPortuguese ? 'Entusiastas Culturais' : 'Culture Enthusiasts' }
  ];

  const handleStarClick = (category: keyof CulturalRatingData, value: number) => {
    setRating(prev => ({ ...prev, [category]: value }));
  };

  const handleToggleOption = (category: 'culturalHighlights' | 'recommendedFor', option: string) => {
    setRating(prev => ({
      ...prev,
      [category]: prev[category].includes(option)
        ? prev[category].filter(item => item !== option)
        : [...prev[category], option]
    }));
  };

  const handleSubmit = async () => {
    if (rating.overall === 0) return;

    setLoading(true);
    try {
      const result = await onSubmitReview({
        rating: rating.overall,
        comment: rating.comment,
        culturalValue: rating.culturalValue,
        organizationQuality: rating.organizationQuality,
        venueRating: rating.venueRating,
        wouldRecommend: rating.wouldRecommend,
        culturalAuthenticity: rating.culturalAuthenticity,
        languageAccessibility: rating.languageAccessibility,
        communityEngagement: rating.communityEngagement,
        tags: [...rating.culturalHighlights, ...rating.recommendedFor]
      });

      if (result.success) {
        setShowRatingForm(false);
        // Reset form or show success message
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = (
    category: keyof CulturalRatingData,
    value: number,
    label: string,
    description?: string
  ) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-900">{label}</h4>
          {description && <p className="text-xs text-gray-600">{description}</p>}
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(category, star)}
              className="transition-colors hover:scale-110"
            >
              {star <= value ? (
                <StarSolid className="w-6 h-6 text-yellow-500" />
              ) : (
                <StarIcon className="w-6 h-6 text-gray-300 hover:text-yellow-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviewCard = (review: EventReview) => (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {review.profileImage && (
            <img 
              src={review.profileImage} 
              alt={review.reviewerName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarSolid
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
              {review.verified && (
                <CheckCircleIcon className="w-4 h-4 text-green-500" title="Verified attendee" />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {review.culturalValue && (
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              🇵🇹 {review.culturalValue}/5
            </div>
          )}
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {review.membershipTier}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

      {/* Cultural Ratings */}
      {isCulturalEvent && (review.culturalValue || review.organizationQuality || review.venueRating) && (
        <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gradient-to-r from-green-50 to-red-50 rounded-xl">
          {review.culturalValue && (
            <div className="text-center">
              <div className="font-bold text-green-600">{review.culturalValue}/5</div>
              <div className="text-xs text-gray-600">
                {isPortuguese ? 'Valor Cultural' : 'Cultural Value'}
              </div>
            </div>
          )}
          {review.organizationQuality && (
            <div className="text-center">
              <div className="font-bold text-blue-600">{review.organizationQuality}/5</div>
              <div className="text-xs text-gray-600">
                {isPortuguese ? 'Organização' : 'Organization'}
              </div>
            </div>
          )}
          {review.venueRating && (
            <div className="text-center">
              <div className="font-bold text-purple-600">{review.venueRating}/5</div>
              <div className="text-xs text-gray-600">
                {isPortuguese ? 'Local' : 'Venue'}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Helpful Votes */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onHelpfulVote(review.id, true)}
            className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm"
          >
            <HandThumbUpIcon className="w-4 h-4" />
            <span>{isPortuguese ? 'Útil' : 'Helpful'} ({review.helpful || 0})</span>
          </button>
          
          {review.wouldRecommend && (
            <div className="flex items-center gap-1 text-primary-600 text-sm">
              <CheckCircleIcon className="w-4 h-4" />
              <span>{isPortuguese ? 'Recomenda' : 'Recommends'}</span>
            </div>
          )}
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <ShareIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Rating Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {isPortuguese ? 'Avaliações da Comunidade' : 'Community Reviews'}
            </h3>
            <p className="text-gray-600">
              {event.totalReviews} {isPortuguese ? 'avaliações' : 'reviews'} • 
              {event.averageRating.toFixed(1)} ⭐
            </p>
          </div>

          {!userReview && (
            <button
              onClick={() => setShowRatingForm(true)}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
            >
              <StarIcon className="w-5 h-5" />
              {isPortuguese ? 'Avaliar Evento' : 'Rate Event'}
            </button>
          )}
        </div>

        {/* Rating Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-xl">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {event.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarSolid
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(event.averageRating) ? 'text-yellow-500' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Classificação Geral' : 'Overall Rating'}
            </div>
          </div>

          {isCulturalEvent && (
            <>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-1">4.8</div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Autenticidade Cultural' : 'Cultural Authenticity'}
                </div>
              </div>

              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-1">4.6</div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Engajamento Comunitário' : 'Community Engagement'}
                </div>
              </div>

              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-1">4.5</div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Acessibilidade Linguística' : 'Language Accessibility'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Reviews */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {isPortuguese ? 'Avaliações Recentes' : 'Recent Reviews'}
          </h3>
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {showAllReviews 
              ? (isPortuguese ? 'Mostrar Menos' : 'Show Less')
              : (isPortuguese ? 'Ver Todas' : 'View All')
            }
          </button>
        </div>

        <div className="space-y-4">
          {event.reviews
            .slice(0, showAllReviews ? event.reviews.length : 3)
            .map(renderReviewCard)}
        </div>

        {event.reviews.length === 0 && (
          <div className="text-center py-12">
            <ChatBubbleBottomCenterTextIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {isPortuguese ? 'Ainda sem avaliações' : 'No reviews yet'}
            </h4>
            <p className="text-gray-600">
              {isPortuguese 
                ? 'Seja o primeiro a avaliar este evento cultural!'
                : 'Be the first to review this cultural event!'}
            </p>
          </div>
        )}
      </div>

      {/* Rating Form Modal */}
      <AnimatePresence>
        {showRatingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {isPortuguese ? 'Avaliar Evento Cultural' : 'Rate Cultural Event'}
                    </h3>
                    <p className="text-gray-600 mt-1">{event.title}</p>
                  </div>
                  <button
                    onClick={() => setShowRatingForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Step 1: Overall Rating */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-semibold mb-4">
                        {isPortuguese ? 'Como foi a experiência geral?' : 'How was your overall experience?'}
                      </h4>
                      <div className="flex items-center justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleStarClick('overall', star)}
                            className="transition-transform hover:scale-125"
                          >
                            {star <= rating.overall ? (
                              <StarSolid className="w-12 h-12 text-yellow-500" />
                            ) : (
                              <StarIcon className="w-12 h-12 text-gray-300 hover:text-yellow-400" />
                            )}
                          </button>
                        ))}
                      </div>
                      {rating.overall > 0 && (
                        <p className="text-lg font-medium text-gray-700">
                          {rating.overall === 1 && (isPortuguese ? 'Terrível' : 'Terrible')}
                          {rating.overall === 2 && (isPortuguese ? 'Fraco' : 'Poor')}
                          {rating.overall === 3 && (isPortuguese ? 'OK' : 'OK')}
                          {rating.overall === 4 && (isPortuguese ? 'Bom' : 'Good')}
                          {rating.overall === 5 && (isPortuguese ? 'Excelente' : 'Excellent')}
                        </p>
                      )}
                    </div>

                    {rating.overall > 0 && (
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
                      >
                        {isPortuguese ? 'Continuar' : 'Continue'}
                      </button>
                    )}
                  </div>
                )}

                {/* Step 2: Cultural Ratings */}
                {currentStep === 2 && isCulturalEvent && (
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-center mb-6">
                      {isPortuguese ? 'Avalie os aspectos culturais' : 'Rate the cultural aspects'}
                    </h4>

                    <div className="space-y-4">
                      {renderStarRating(
                        'culturalAuthenticity',
                        rating.culturalAuthenticity,
                        isPortuguese ? 'Autenticidade Cultural' : 'Cultural Authenticity',
                        isPortuguese 
                          ? 'Quão autêntica foi a representação da cultura portuguesa?'
                          : 'How authentic was the representation of Portuguese culture?'
                      )}

                      {renderStarRating(
                        'languageAccessibility',
                        rating.languageAccessibility,
                        isPortuguese ? 'Acessibilidade Linguística' : 'Language Accessibility',
                        isPortuguese 
                          ? 'Facilidade de entender e participar em português/inglês'
                          : 'Ease of understanding and participating in Portuguese/English'
                      )}

                      {renderStarRating(
                        'communityEngagement',
                        rating.communityEngagement,
                        isPortuguese ? 'Engajamento Comunitário' : 'Community Engagement',
                        isPortuguese 
                          ? 'Quão bem o evento conectou a comunidade portuguesa?'
                          : 'How well did the event connect the Portuguese community?'
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                      >
                        {isPortuguese ? 'Voltar' : 'Back'}
                      </button>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
                      >
                        {isPortuguese ? 'Continuar' : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-center mb-6">
                      {isPortuguese ? 'Detalhes adicionais' : 'Additional details'}
                    </h4>

                    <div className="space-y-4">
                      {renderStarRating(
                        'organizationQuality',
                        rating.organizationQuality,
                        isPortuguese ? 'Qualidade da Organização' : 'Organization Quality'
                      )}

                      {renderStarRating(
                        'venueRating',
                        rating.venueRating,
                        isPortuguese ? 'Qualidade do Local' : 'Venue Quality'
                      )}
                    </div>

                    {/* Would Recommend */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900">
                        {isPortuguese ? 'Recomendaria este evento?' : 'Would you recommend this event?'}
                      </h5>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setRating(prev => ({ ...prev, wouldRecommend: true }))}
                          className={`flex-1 p-3 rounded-xl font-medium transition-colors ${
                            rating.wouldRecommend
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isPortuguese ? 'Sim' : 'Yes'}
                        </button>
                        <button
                          onClick={() => setRating(prev => ({ ...prev, wouldRecommend: false }))}
                          className={`flex-1 p-3 rounded-xl font-medium transition-colors ${
                            !rating.wouldRecommend
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isPortuguese ? 'Não' : 'No'}
                        </button>
                      </div>
                    </div>

                    {/* Cultural Highlights */}
                    {isCulturalEvent && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">
                          {isPortuguese ? 'Destaques Culturais' : 'Cultural Highlights'}
                        </h5>
                        <div className="grid grid-cols-2 gap-2">
                          {culturalElements.map((element) => (
                            <button
                              key={element.key}
                              onClick={() => handleToggleOption('culturalHighlights', element.key)}
                              className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                                rating.culturalHighlights.includes(element.key)
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {element.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                      >
                        {isPortuguese ? 'Voltar' : 'Back'}
                      </button>
                      <button
                        onClick={() => setCurrentStep(4)}
                        className="flex-1 bg-primary-500 text-white py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
                      >
                        {isPortuguese ? 'Finalizar' : 'Finish'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Written Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-center mb-6">
                      {isPortuguese ? 'Partilhe os seus comentários' : 'Share your feedback'}
                    </h4>

                    <div>
                      <label className="block font-medium text-gray-900 mb-2">
                        {isPortuguese ? 'Comentário (opcional)' : 'Comment (optional)'}
                      </label>
                      <textarea
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder={isPortuguese 
                          ? 'Conte-nos sobre a sua experiência...'
                          : 'Tell us about your experience...'}
                        value={rating.comment}
                        onChange={(e) => setRating(prev => ({ ...prev, comment: e.target.value }))}
                      />
                    </div>

                    {/* Recommended For */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">
                        {isPortuguese ? 'Recomendado para:' : 'Recommended for:'}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {recommendedForOptions.map((option) => (
                          <button
                            key={option.key}
                            onClick={() => handleToggleOption('recommendedFor', option.key)}
                            className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                              rating.recommendedFor.includes(option.key)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                      >
                        {isPortuguese ? 'Voltar' : 'Back'}
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        {loading 
                          ? (isPortuguese ? 'Enviando...' : 'Submitting...')
                          : (isPortuguese ? 'Enviar Avaliação' : 'Submit Review')
                        }
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CulturalEventRating;