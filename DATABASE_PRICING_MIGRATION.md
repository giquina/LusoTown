# Database Migration Notes for Pricing Updates

## Overview

After implementing centralized pricing configuration, database administrators need to update any hardcoded price defaults to reference the new pricing constants or align with the current pricing structure.

## Migration Tasks

### 1. Subscription Plans Table

Update subscription plan prices to match `SUBSCRIPTION_PLANS` in `src/config/pricing.ts`:

```sql
-- Update Community Member plan
UPDATE subscription_plans 
SET 
  monthly_price = 19.99,
  annual_price = 199.99,
  updated_at = NOW()
WHERE plan_id = 'community';

-- Update Cultural Ambassador plan  
UPDATE subscription_plans 
SET 
  monthly_price = 39.99,
  annual_price = 399.99,
  updated_at = NOW()
WHERE plan_id = 'ambassador';

-- Ensure Free plan is correct
UPDATE subscription_plans 
SET 
  monthly_price = 0.00,
  annual_price = 0.00,
  updated_at = NOW()
WHERE plan_id = 'free';
```

### 2. Transport Pricing Tables

Update transport rates to match `TRANSPORT_PRICING` constants:

```sql
-- Update luxury transport rates
UPDATE transport_rates 
SET 
  base_rate = 45.00,
  minimum_booking_hours = 2,
  extra_passenger_fee = 5.00,
  wait_time_rate = 25.00,
  airport_surcharge = 15.00,
  updated_at = NOW()
WHERE service_type = 'luxury';

-- Update group transport rates
UPDATE transport_rates 
SET 
  base_rate = 35.00,
  minimum_booking_hours = 3,
  max_passengers = 8,
  extra_hour_rate = 30.00,
  updated_at = NOW()
WHERE service_type = 'group';

-- Update student transport rates
UPDATE transport_rates 
SET 
  base_rate = 25.00,
  discount_rate = 0.50,
  verification_required = true,
  updated_at = NOW()
WHERE service_type = 'student';
```

### 3. Event and Creator Pricing

Update event platform fees to match `EVENT_PRICING`:

```sql
-- Update event pricing configuration
UPDATE platform_settings 
SET 
  value = '8'
WHERE key = 'ticket_fee_percent';

UPDATE platform_settings 
SET 
  value = '0.4'
WHERE key = 'ticket_fee_flat';

UPDATE platform_settings 
SET 
  value = '0.85'
WHERE key = 'creator_revenue_split';

UPDATE platform_settings 
SET 
  value = '15'
WHERE key = 'premium_event_fee';
```

### 4. Business Directory Pricing

Update business listing fees:

```sql
-- Update business directory pricing
UPDATE business_listing_tiers 
SET 
  monthly_price = 0.00
WHERE tier = 'basic';

UPDATE business_listing_tiers 
SET 
  monthly_price = 29.99
WHERE tier = 'premium';

UPDATE business_listing_tiers 
SET 
  monthly_price = 49.99
WHERE tier = 'featured';

-- Update verification and add-on fees
UPDATE platform_settings 
SET 
  value = '15'
WHERE key = 'business_verification_fee';

UPDATE platform_settings 
SET 
  value = '5'
WHERE key = 'additional_photo_fee';

UPDATE platform_settings 
SET 
  value = '19.99'
WHERE key = 'social_media_boost_fee';
```

### 5. Streaming Platform Pricing

Update creator monetization settings:

```sql
-- Update streaming pricing
UPDATE platform_settings 
SET 
  value = '24.99'
WHERE key = 'creator_monthly_fee';

UPDATE platform_settings 
SET 
  value = '0.03'
WHERE key = 'donation_platform_fee';

UPDATE platform_settings 
SET 
  value = '0.05'
WHERE key = 'subscription_platform_fee';

UPDATE platform_settings 
SET 
  value = '1'
WHERE key = 'minimum_donation';

UPDATE platform_settings 
SET 
  value = '500'
WHERE key = 'maximum_donation';

UPDATE platform_settings 
SET 
  value = '0.85'
WHERE key = 'creator_revenue_split';
```

### 6. Payment Processing Fees

Update payment processor configurations:

```sql
-- Stripe fees
UPDATE payment_processor_config 
SET 
  card_rate = 0.014,
  card_fee = 0.20,
  european_card_rate = 0.025,
  payment_intent_fee = 0.20
WHERE processor = 'stripe';

-- PayPal fees  
UPDATE payment_processor_config 
SET 
  domestic_rate = 0.034,
  international_rate = 0.044,
  fixed_fee = 0.20
WHERE processor = 'paypal';
```

### 7. Discount Configuration

Update discount rates to match `DISCOUNTS` constants:

```sql
-- Update discount rates
UPDATE discount_config 
SET rate = 0.50 WHERE type = 'student';

UPDATE discount_config 
SET rate = 0.17 WHERE type = 'annual';

UPDATE discount_config 
SET rate = 0.20 WHERE type = 'early_bird';

UPDATE discount_config 
SET rate = 0.10 WHERE type = 'referral';

UPDATE discount_config 
SET rate = 0.15 WHERE type = 'group_booking';

UPDATE discount_config 
SET rate = 0.05 WHERE type = 'portuguese_cultural';
```

## Validation Queries

Run these queries to verify the migration:

```sql
-- Check subscription plan pricing
SELECT plan_id, monthly_price, annual_price 
FROM subscription_plans 
ORDER BY monthly_price;

-- Check transport rates
SELECT service_type, base_rate, minimum_booking_hours 
FROM transport_rates;

-- Check platform settings  
SELECT key, value 
FROM platform_settings 
WHERE key LIKE '%fee%' OR key LIKE '%price%' OR key LIKE '%rate%'
ORDER BY key;

-- Check discount configuration
SELECT type, rate 
FROM discount_config 
ORDER BY rate DESC;
```

## Post-Migration Tasks

### 1. Update Environment Variables

Ensure production environment variables match the pricing configuration:

```env
# Add to production .env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Update any pricing-related variables
NEXT_PUBLIC_COMMUNITY_PLAN_PRICE=19.99
NEXT_PUBLIC_AMBASSADOR_PLAN_PRICE=39.99
```

### 2. Cache Invalidation

Clear any cached pricing data:

```sql
-- Clear pricing cache (if using database caching)
DELETE FROM cache_entries 
WHERE cache_key LIKE 'pricing_%' 
   OR cache_key LIKE 'subscription_%'
   OR cache_key LIKE 'transport_%';
```

### 3. Notification to Users

Consider notifying users of any pricing changes:

```sql
-- Log pricing update for audit trail
INSERT INTO admin_logs (
  action, 
  description, 
  performed_by, 
  timestamp
) VALUES (
  'pricing_migration',
  'Updated database pricing to match centralized configuration',
  'system',
  NOW()
);
```

## Rollback Plan

If rollback is needed, save current values before migration:

```sql
-- Backup current pricing before migration
CREATE TABLE pricing_backup_20250821 AS 
SELECT * FROM subscription_plans;

CREATE TABLE transport_rates_backup_20250821 AS 
SELECT * FROM transport_rates;

CREATE TABLE platform_settings_backup_20250821 AS 
SELECT * FROM platform_settings 
WHERE key LIKE '%fee%' OR key LIKE '%price%' OR key LIKE '%rate%';
```

## Testing Checklist

After migration, verify:

- [ ] Subscription page displays correct prices
- [ ] Payment processing works with new rates
- [ ] Transport booking calculates correct costs
- [ ] Event creation applies correct fees
- [ ] Business listings show proper pricing
- [ ] Discounts calculate correctly
- [ ] Stripe webhooks handle new pricing
- [ ] Student discounts apply properly

## Contact

For questions about this migration, contact:
- **Developer:** See HARDCODING_PREVENTION.md
- **Database Admin:** Check platform_settings for configuration
- **Business:** Verify pricing matches business requirements