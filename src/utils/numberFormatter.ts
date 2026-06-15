
/**
 * تحويل الأرقام الكبيرة إلى صيغة مختصرة ومقروءة (مثال: 1000 يصبح 1K)
 */
export const formatLikes = (count: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(count);
};