export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  benefit: string;
}

export const SHOPPING_ITEMS: ShoppingItem[] = [
  { id: 's1', name: 'Avokado', category: 'Meyve & Sebze', checked: false, benefit: 'Folik asit & sağlıklı yağ' },
  { id: 's2', name: 'Ispanak', category: 'Meyve & Sebze', checked: false, benefit: 'Demir & kalsiyum' },
  { id: 's3', name: 'Ceviz', category: 'Kuruyemiş', checked: false, benefit: 'Omega-3 yağ asitleri' },
  { id: 's4', name: 'Somon Fileto', category: 'Protein', checked: false, benefit: 'DHA & protein' },
  { id: 's5', name: 'Yumurta', category: 'Protein', checked: false, benefit: 'Kolin & protein' },
  { id: 's6', name: 'Tatlı Patates', category: 'Meyve & Sebze', checked: false, benefit: 'Beta-karoten & lif' },
  { id: 's7', name: 'Yoğurt (Tam Yağlı)', category: 'Süt Ürünleri', checked: false, benefit: 'Kalsiyum & probiyotik' },
  { id: 's8', name: 'Mercimek', category: 'Baklagil', checked: false, benefit: 'Protein & demir' },
  { id: 's9', name: 'Brokoli', category: 'Meyve & Sebze', checked: false, benefit: 'C vitamini & K vitamini' },
  { id: 's10', name: 'Badem', category: 'Kuruyemiş', checked: false, benefit: 'E vitamini & magnezyum' },
  { id: 's11', name: 'Portakal', category: 'Meyve & Sebze', checked: false, benefit: 'C vitamini & folik asit' },
  { id: 's12', name: 'Kinoa', category: 'Tahıl', checked: false, benefit: 'Tam protein & lif' },
];
