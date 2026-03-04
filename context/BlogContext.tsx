import createContextHook from '@nkzw/create-context-hook';
import { useState, useCallback } from 'react';
import { ARTICLES, Article, Comment } from '@/mocks/articles';

export const [BlogProvider, useBlog] = createContextHook(() => {
  const [articles, setArticles] = useState<Article[]>(ARTICLES);

  const toggleLike = useCallback((id: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, liked: !a.liked, likes: a.liked ? a.likes - 1 : a.likes + 1 }
          : a
      )
    );
  }, []);

  const addComment = useCallback((articleId: string, comment: Comment) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === articleId
          ? { ...a, comments: [...a.comments, comment] }
          : a
      )
    );
  }, []);

  return {
    articles,
    toggleLike,
    addComment,
  };
});
