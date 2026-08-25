import prisma from '../lib/prisma.js';

export const updateClientProgress = async (clientId: string, earnedCoupons: number) => {
    const trail = await prisma.trailConfig.findFirst({ where: { isActive: true } });
    if (!trail) return null;
    
    let progress = await prisma.clientProgress.findUnique({ where: { clientId } });
    if (!progress) {
        progress = await prisma.clientProgress.create({
            data: { clientId, trailId: trail.id }
        });
    }
    
    const newTotal = progress.totalCoupons + earnedCoupons;
    const currentStep = Math.floor(newTotal / trail.couponsPerStep);
    const couponsInCurrentStep = newTotal % trail.couponsPerStep;
    const treasureUnlocked = currentStep >= trail.totalSteps;
    
    const updated = await prisma.clientProgress.update({
        where: { id: progress.id },
        data: {
            totalCoupons: newTotal,
            currentStep,
            couponsInCurrentStep,
            treasureUnlocked
        }
    });
    
    // Check milestones and add rewards
    const steps = await prisma.trailStep.findMany({ where: { trailId: trail.id, stepNumber: { lte: currentStep } } });
    for (const step of steps) {
        if (step.milestoneRewardId) {
            const existingReward = await prisma.clientReward.findFirst({
                where: { clientId, rewardId: step.milestoneRewardId }
            });
            if (!existingReward) {
                await prisma.clientReward.create({
                    data: { clientId, rewardId: step.milestoneRewardId }
                });
            }
        }
    }
    
    return updated;
};
