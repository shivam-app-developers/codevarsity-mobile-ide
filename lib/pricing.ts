/**
 * Pricing Utility for Regional Localization
 * This handles Purchasing Power Parity (PPP) adjustments based on user country.
 */

export interface RegionalPricing {
    currency: string;
    symbol: string;
    courseLevels: {
        [key: string]: number;
    };
    subscriptionPlans: {
        [key: string]: number;
    };
}

export const PRICING_MAP: Record<string, RegionalPricing> = {
    'IN': {
        currency: 'INR',
        symbol: '₹',
        courseLevels: {
            'Beginner': 499,
            'Intermediate': 799,
            'Advanced': 1199,
            'Professional': 1499,
            'Expert': 1999,
        },
        subscriptionPlans: {
            'sub_workspace_web': 149,
            'sub_workspace_enterprise': 149,
            'sub_workspace_fullstack': 399,
            'lifetime_power_pack': 6499
        }
    },
    'US': {
        currency: 'USD',
        symbol: '$',
        courseLevels: {
            'Beginner': 5.99,
            'Intermediate': 9.99,
            'Advanced': 14.99,
            'Professional': 19.99,
            'Expert': 24.99,
        },
        subscriptionPlans: {
            'sub_workspace_web': 1.99,
            'sub_workspace_enterprise': 1.99,
            'sub_workspace_fullstack': 4.99,
            'lifetime_power_pack': 79.99
        }
    },
    'DEFAULT': {
        currency: 'USD',
        symbol: '$',
        courseLevels: {
            'Beginner': 5.99,
            'Intermediate': 9.99,
            'Advanced': 14.99,
            'Professional': 19.99,
            'Expert': 24.99,
        },
        subscriptionPlans: {
            'sub_workspace_web': 1.99,
            'sub_workspace_enterprise': 1.99,
            'sub_workspace_fullstack': 4.99,
            'lifetime_power_pack': 79.99
        }
    }
};

/**
 * Detects user country based on IP using a public API.
 * Falls back to 'DEFAULT' if detection fails.
 */
export async function detectCountry(): Promise<string> {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code || 'DEFAULT';
    } catch (error) {
        console.error('Country detection failed:', error);
        return 'DEFAULT';
    }
}

/**
 * Returns the localized price and currency for a given course level or plan ID.
 */
export function getRegionalPrice(idOrLevel: string, countryCode: string = 'DEFAULT', type: 'course' | 'subscription' = 'course') {
    const region = PRICING_MAP[countryCode] || PRICING_MAP['DEFAULT'];

    if (type === 'subscription') {
        return {
            amount: region.subscriptionPlans[idOrLevel] || region.subscriptionPlans['sub_workspace_fullstack'],
            currency: region.currency,
            symbol: region.symbol
        };
    }

    // Find the closest course level match
    let priceLevel = 'Beginner';
    if (idOrLevel.includes('Expert') || idOrLevel.includes('Specialization')) priceLevel = 'Expert';
    else if (idOrLevel.includes('Professional')) priceLevel = 'Professional';
    else if (idOrLevel.includes('Advanced')) priceLevel = 'Advanced';
    else if (idOrLevel.includes('Intermediate')) priceLevel = 'Intermediate';

    return {
        amount: region.courseLevels[priceLevel] || region.courseLevels['Beginner'],
        currency: region.currency,
        symbol: region.symbol
    };
}
