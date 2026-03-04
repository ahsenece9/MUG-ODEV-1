import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHOPPING_ITEMS, ShoppingItem } from '@/mocks/shoppingList';

const STORAGE_KEY = 'shopping_list_state';

export const [ShoppingListProvider, useShoppingList] = createContextHook(() => {
  const [items, setItems] = useState<ShoppingItem[]>(SHOPPING_ITEMS);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored) {
        try {
          const savedMap: Record<string, boolean> = JSON.parse(stored);
          setItems(SHOPPING_ITEMS.map((item) => ({
            ...item,
            checked: savedMap[item.id] ?? item.checked,
          })));
        } catch (e) {
          console.log('Failed to parse shopping list state', e);
        }
      }
      setIsLoaded(true);
    }).catch(() => {
      setIsLoaded(true);
    });
  }, []);

  const persist = useCallback(async (list: ShoppingItem[]) => {
    try {
      const map: Record<string, boolean> = {};
      list.forEach((item) => { map[item.id] = item.checked; });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (e) {
      console.log('Failed to save shopping list state', e);
    }
  }, []);

  const toggleItem = useCallback((id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      persist(updated);
      return updated;
    });
  }, [persist]);

  const checkedCount = items.filter((i) => i.checked).length;

  return {
    items,
    isLoaded,
    toggleItem,
    checkedCount,
    totalCount: items.length,
  };
});
