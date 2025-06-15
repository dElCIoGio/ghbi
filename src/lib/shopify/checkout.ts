export function getNumericId(gid: string): string {
  if (gid.startsWith('gid://')) {
    const parts = gid.split('/');
    return parts[parts.length - 1];
  }
  return gid;
}

import type { CartItem } from '@/types/cart';
import { getEnv } from '@/lib/get-env';

export function buildCheckoutUrl(items: CartItem[]): string {
  const { SHOPIFY_DOMAIN } = getEnv();
  const params = items
    .map((item) => `${getNumericId(item.id)}:${item.quantity}`)
    .join(',');
  return `https://${SHOPIFY_DOMAIN}/cart/${params}`;
}
