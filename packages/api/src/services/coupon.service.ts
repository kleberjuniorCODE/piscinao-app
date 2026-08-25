import prisma from '../lib/prisma.js';

export const calculateCoupons = async (totalAmount: number, items: any[]) => {
    const config = await prisma.couponsConfig.findFirst({ where: { isActive: true } });
    if (!config) return 0;

    let baseCoupons = Math.floor(totalAmount / config.amountPerCoupon);
    
    const activeRules = await prisma.couponRule.findMany({ where: { configId: config.id, isActive: true } });
    
    let bonus = 0;
    let multiplier = 1.0;
    
    for (const rule of activeRules) {
        if (rule.ruleType === 'DOUBLE_COUPONS') {
            multiplier *= rule.bonusMultiplier;
        } else if (rule.ruleType === 'PRODUCT_BONUS' && rule.targetProductId) {
            const hasProduct = items.some(i => i.productId === rule.targetProductId);
            if (hasProduct) bonus += rule.bonusCoupons;
        } else if (rule.ruleType === 'CATEGORY_BONUS' && rule.targetCategoryId) {
            const hasCategory = items.some(i => i.categoryId === rule.targetCategoryId);
            if (hasCategory) bonus += rule.bonusCoupons;
        } else if (rule.ruleType === 'SPECIAL') {
            bonus += rule.bonusCoupons;
        }
    }
    
    return Math.floor(baseCoupons * multiplier) + bonus;
};
