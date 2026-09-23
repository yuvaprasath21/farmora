import { supabase } from '../lib/supabase';
export async function fetchMarketPrices() {
    try {
        const { data, error } = await supabase
            .from('market_prices')
            .select('*')
            .order('recorded_at', { ascending: false })
            .limit(10);
        if (error) {
            throw error;
        }
        return data.map((record) => ({
            crop_name: record.crop_name,
            price_per_unit: record.price_per_unit,
            unit: record.unit,
            trend: record.trend || 'stable',
            market_location: record.market_location,
            recorded_at: record.recorded_at
        }));
    }
    catch (error) {
        console.error('Error fetching market prices:', error);
        throw error;
    }
}
