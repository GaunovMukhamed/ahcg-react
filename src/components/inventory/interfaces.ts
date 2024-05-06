export interface InventoryItem {
  type: 'sword';
  name: string;
  rarity?: 'common'|'uncommon'|'rare'|'epic'|'legendary';
  dmg?: number;
}