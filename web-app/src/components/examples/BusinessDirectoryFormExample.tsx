/**
 * Business Directory Form Example
 * 
 * Example implementation of the ValidatedForm component for Portuguese
 * business directory submissions with comprehensive validation.
 */

'use client'

import { ValidatedForm, FormField, BilingualFormField } from '@/components/forms/ValidatedForm'
import { businessDirectorySchema } from '@/lib/validation-schemas'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries'

export function BusinessDirectoryFormExample() {
  const { t } = useLanguage()

  const handleSuccess = (data: any) => {
    console.log('Business submitted successfully:', data)
    // Redirect to success page or show confirmation
  }

  const handleError = (errors: Record<string, string>) => {
    console.error('Business submission errors:', errors)
  }

  // Business categories for dropdown
  const businessCategories = [
    { value: 'restaurants', label: t('business.category.restaurants') },
    { value: 'cafes', label: t('business.category.cafes') },
    { value: 'import_export', label: t('business.category.import_export') },
    { value: 'professional_services', label: t('business.category.professional_services') },
    { value: 'beauty_wellness', label: t('business.category.beauty_wellness') },
    { value: 'cultural_services', label: t('business.category.cultural_services') },
    { value: 'retail', label: t('business.category.retail') },
    { value: 'technology', label: t('business.category.technology') }
  ]

  // Portuguese-speaking countries for dropdown
  const countryOptions = PORTUGUESE_SPEAKING_COUNTRIES.map(country => ({
    value: country.code.toLowerCase(),
    label: country.name,
    labelPt: country.namePortuguese
  }))

  // Business types
  const businessTypes = [
    { value: 'sole_trader', label: t('business.type.sole_trader') },
    { value: 'partnership', label: t('business.type.partnership') },
    { value: 'limited_company', label: t('business.type.limited_company') },
    { value: 'franchise', label: t('business.type.franchise') }
  ]

  // Price ranges
  const priceRanges = [
    { value: '£', label: '£ - ' + t('business.price.budget') },
    { value: '££', label: '££ - ' + t('business.price.moderate') },
    { value: '£££', label: '£££ - ' + t('business.price.premium') },
    { value: '££££', label: '££££ - ' + t('business.price.luxury') }
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <ValidatedForm
        schema={businessDirectorySchema}
        endpoint="/api/business-directory/submit"
        onSuccess={handleSuccess}
        onError={handleError}
        title={t('business.directory.submit_title')}
        description={t('business.directory.submit_description')}
        submitButtonText={t('business.directory.submit_button')}
        showCulturalContext={true}
        antiSpam={true}
        className="space-y-8"
      >
        {/* Basic Business Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('business.form.basic_info')}
          </h3>
          
          <div className="space-y-4">
            <FormField
              name="businessName"
              label={t('business.form.business_name')}
              type="text"
              required
              placeholder={t('business.form.business_name_placeholder')}
              maxLength={100}
              helpText={t('business.form.business_name_help')}
            />

            <FormField
              name="businessNamePortuguese"
              label={t('business.form.business_name_portuguese')}
              type="text"
              placeholder={t('business.form.business_name_portuguese_placeholder')}
              maxLength={100}
              helpText={t('business.form.business_name_portuguese_help')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="ownerName"
                label={t('business.form.owner_name')}
                type="text"
                required
                placeholder={t('business.form.owner_name_placeholder')}
                maxLength={50}
              />

              <FormField
                name="ownerCountry"
                label={t('business.form.owner_country')}
                type="select"
                required
                options={countryOptions}
                helpText={t('business.form.owner_country_help')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                name="category"
                label={t('business.form.category')}
                type="select"
                required
                options={businessCategories}
              />

              <FormField
                name="subcategory"
                label={t('business.form.subcategory')}
                type="text"
                required
                placeholder={t('business.form.subcategory_placeholder')}
                maxLength={50}
              />

              <FormField
                name="businessType"
                label={t('business.form.business_type')}
                type="select"
                required
                options={businessTypes}
              />
            </div>
          </div>
        </div>

        {/* Business Description (Bilingual) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('business.form.description_section')}
          </h3>

          <div className="space-y-6">
            <BilingualFormField
              name="description"
              label={t('business.form.description')}
              type="textarea"
              required
              placeholder={{
                en: t('business.form.description_placeholder_en'),
                pt: t('business.form.description_placeholder_pt')
              }}
              maxLength={500}
              rows={4}
              helpText={t('business.form.description_help')}
            />

            <FormField
              name="culturalConnection"
              label={t('business.form.cultural_connection')}
              type="textarea"
              required
              placeholder={t('business.form.cultural_connection_placeholder')}
              maxLength={300}
              rows={3}
              helpText={t('business.form.cultural_connection_help')}
            />

            <FormField
              name="uniqueSellingPoint"
              label={t('business.form.unique_selling_point')}
              type="text"
              required
              placeholder={t('business.form.unique_selling_point_placeholder')}
              maxLength={150}
            />
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('business.form.location_contact')}
          </h3>

          <div className="space-y-4">
            <FormField
              name="address"
              label={t('business.form.address')}
              type="text"
              required
              placeholder={t('business.form.address_placeholder')}
              culturalContext={true}
              helpText={t('business.form.address_help')}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                name="postcode"
                label={t('business.form.postcode')}
                type="text"
                required
                placeholder="SW1A 1AA"
                formatType="postcode"
                countryCode="GB"
              />

              <FormField
                name="city"
                label={t('business.form.city')}
                type="text"
                required
                placeholder="London"
                formatType="capitalize"
              />

              <FormField
                name="region"
                label={t('business.form.region')}
                type="text"
                required
                placeholder="Greater London"
                formatType="capitalize"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="phone"
                label={t('business.form.phone')}
                type="tel"
                required
                placeholder="+44 20 1234 5678"
                formatType="phone"
                countryCode="GB"
                helpText={t('business.form.phone_help')}
              />

              <FormField
                name="email"
                label={t('business.form.email')}
                type="email"
                required
                placeholder="info@business.co.uk"
                helpText={t('business.form.email_help')}
              />
            </div>

            <FormField
              name="website"
              label={t('business.form.website')}
              type="url"
              placeholder="https://www.business.co.uk"
            />
          </div>
        </div>

        {/* Services & Pricing */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('business.form.services_pricing')}
          </h3>

          <div className="space-y-4">
            <FormField
              name="priceRange"
              label={t('business.form.price_range')}
              type="select"
              required
              options={priceRanges}
              helpText={t('business.form.price_range_help')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="establishedYear"
                label={t('business.form.established_year')}
                type="number"
                required
                min={1900}
                max={new Date().getFullYear()}
                placeholder="2020"
              />

              <FormField
                name="employees"
                label={t('business.form.employees')}
                type="number"
                required
                min={1}
                max={1000}
                placeholder="5"
              />
            </div>
          </div>
        </div>

        {/* Terms & Verification */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('business.form.verification')}
          </h3>

          <div className="space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="termsAccepted"
                required
                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {t('business.form.terms_acceptance')}
                <a href="/terms" className="text-primary-600 hover:underline ml-1">
                  {t('business.form.terms_link')}
                </a>
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="gdprConsent"
                required
                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {t('business.form.gdpr_consent')}
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="culturalAuthenticity"
                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {t('business.form.cultural_authenticity_confirmation')}
              </span>
            </label>
          </div>
        </div>
      </ValidatedForm>
    </div>
  )
}