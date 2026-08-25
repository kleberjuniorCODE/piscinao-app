import prisma from '../lib/prisma.js';

export const triggerRecommendations = async (clientId: string, purchaseId: string) => {
    // Basic implementation that checks RULES
    const rules = await prisma.recommendationRule.findMany({ where: { isActive: true } });
    
    for (const rule of rules) {
        if (rule.triggerType === 'CAMPAIGN') continue;
        
        // Simple logic for days since purchase or just generally creating a recommendation
        await prisma.clientRecommendation.create({
            data: {
                clientId,
                ruleId: rule.id,
                purchaseId,
                title: rule.messageTitle,
                body: rule.messageBody,
            }
        });
    }
    return true;
};
