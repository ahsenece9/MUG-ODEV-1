import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle, Clock, X, Send, Search } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { Article, Comment } from '@/mocks/articles';
import { useUser } from '@/context/UserContext';
import { useBlog } from '@/context/BlogContext';

export default function BlogScreen() {
  const { displayName, avatar } = useUser();
  const { articles, toggleLike, addComment: addBlogComment } = useBlog();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');

  const categories = ['Tümü', 'Beslenme', 'Sağlık', 'Egzersiz', 'Yaşam Tarzı'];

  const handleToggleLike = (id: string) => {
    toggleLike(id);
    if (selectedArticle?.id === id) {
      setSelectedArticle((prev) =>
        prev ? { ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 } : prev
      );
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !selectedArticle) return;
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      author: displayName,
      avatar: avatar,
      text: commentText.trim(),
      date: 'Az önce',
    };
    addBlogComment(selectedArticle.id, newComment);
    setSelectedArticle((prev) =>
      prev ? { ...prev, comments: [...prev.comments, newComment] } : prev
    );
    setCommentText('');
  };

  const filteredArticles = articles.filter((a) => {
    const matchCat = activeCategory === 'Tümü' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <View style={styles.root}>
      <AppHeader title="Blog" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchWrap}>
          <Search size={16} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Yazı ara..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, activeCategory === cat && styles.catPillActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.75}
            >
              <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {featured && (
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => setSelectedArticle(featured)}
            activeOpacity={0.87}
            testID="blog-featured"
          >
            <Image source={{ uri: featured.image }} style={styles.featuredImg} contentFit="cover" />
            <LinearGradient colors={['transparent', 'rgba(44,24,16,0.9)']} style={StyleSheet.absoluteFill} />
            <View style={styles.featuredOverlay}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{featured.category}</Text>
              </View>
              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <Text style={styles.featuredExcerpt} numberOfLines={2}>{featured.excerpt}</Text>
              <View style={styles.featuredMeta}>
                <View style={styles.metaItem}>
                  <Heart size={13} color="#fff" fill={featured.liked ? '#fff' : 'none'} />
                  <Text style={styles.metaText}>{featured.likes}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MessageCircle size={13} color="#fff" />
                  <Text style={styles.metaText}>{featured.comments.length}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={13} color="#fff" />
                  <Text style={styles.metaText}>{featured.readTime} dk</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.listSection}>
          {rest.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => setSelectedArticle(article)}
              activeOpacity={0.82}
              testID={`blog-article-${article.id}`}
            >
              <Image source={{ uri: article.image }} style={styles.articleImg} contentFit="cover" />
              <View style={styles.articleInfo}>
                <View style={styles.pillSmall}>
                  <Text style={styles.pillSmallText}>{article.category}</Text>
                </View>
                <Text style={styles.articleTitle} numberOfLines={2}>{article.title}</Text>
                <Text style={styles.articleExcerpt} numberOfLines={2}>{article.excerpt}</Text>
                <View style={styles.articleBottom}>
                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => handleToggleLike(article.id)}
                    activeOpacity={0.7}
                  >
                    <Heart
                      size={14}
                      color={article.liked ? Colors.primary : Colors.textMuted}
                      fill={article.liked ? Colors.primary : 'none'}
                    />
                    <Text style={[styles.likeCount, article.liked && styles.likeCountActive]}>
                      {article.likes}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.metaItem}>
                    <MessageCircle size={14} color={Colors.textMuted} />
                    <Text style={styles.metaTextDark}>{article.comments.length}</Text>
                  </View>
                  <Text style={styles.articleDate}>{article.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={!!selectedArticle} animationType="slide" onRequestClose={() => setSelectedArticle(null)}>
        {selectedArticle && (
          <KeyboardAvoidingView
            style={styles.modalRoot}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalHeroWrap}>
                <Image
                  source={{ uri: selectedArticle.image }}
                  style={styles.modalHeroImg}
                  contentFit="cover"
                />
                <LinearGradient colors={['rgba(0,0,0,0.3)', 'transparent']} style={styles.modalTopGradient} />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelectedArticle(null)}
                  testID="article-close"
                >
                  <X size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{selectedArticle.category}</Text>
                </View>
                <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                <View style={styles.authorRow}>
                  <View style={styles.authorAvatar}>
                    <Text style={styles.authorAvatarText}>{selectedArticle.author[0]}</Text>
                  </View>
                  <View>
                    <Text style={styles.authorName}>{selectedArticle.author}</Text>
                    <Text style={styles.authorTitle}>{selectedArticle.authorTitle}</Text>
                  </View>
                  <Text style={styles.modalDate}>{selectedArticle.date}</Text>
                </View>

                <View style={styles.articleActions}>
                  <TouchableOpacity
                    style={[styles.actionBtn, selectedArticle.liked && styles.actionBtnActive]}
                    onPress={() => handleToggleLike(selectedArticle.id)}
                  >
                    <Heart
                      size={16}
                      color={selectedArticle.liked ? '#fff' : Colors.primary}
                      fill={selectedArticle.liked ? '#fff' : 'none'}
                    />
                    <Text style={[styles.actionBtnText, selectedArticle.liked && styles.actionBtnTextActive]}>
                      {selectedArticle.likes} Beğeni
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.actionMeta}>
                    <Clock size={14} color={Colors.textMuted} />
                    <Text style={styles.actionMetaText}>{selectedArticle.readTime} dk okuma</Text>
                  </View>
                </View>

                <Text style={styles.modalContent}>{selectedArticle.content}</Text>

                <View style={styles.commentsSection}>
                  <Text style={styles.commentsTitle}>Yorumlar ({selectedArticle.comments.length})</Text>
                  {selectedArticle.comments.length === 0 && (
                    <Text style={styles.noComments}>Henüz yorum yok. İlk yorumu sen yap!</Text>
                  )}
                  {selectedArticle.comments.map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                      <View style={styles.commentAvatar}>
                        <Text style={styles.commentAvatarText}>{comment.avatar}</Text>
                      </View>
                      <View style={styles.commentBody}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.commentAuthor}>{comment.author}</Text>
                          <Text style={styles.commentDate}>{comment.date}</Text>
                        </View>
                        <Text style={styles.commentText}>{comment.text}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.commentInputWrap}>
              <TextInput
                style={styles.commentInput}
                placeholder="Yorum yazın..."
                placeholderTextColor={Colors.textMuted}
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity
                style={[styles.sendBtn, !commentText.trim() && styles.sendBtnDisabled]}
                onPress={handleAddComment}
                disabled={!commentText.trim()}
              >
                <Send size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 24 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: 16,
    marginBottom: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 44, fontSize: 14, color: Colors.text },
  catRow: { paddingHorizontal: 16, gap: 8, paddingBottom: 12 },
  catPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catPillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  catTextActive: { color: '#fff', fontWeight: '700' },
  featuredCard: {
    marginHorizontal: 16,
    height: 220,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredImg: { ...StyleSheet.absoluteFillObject },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  pill: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  pillText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  featuredTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 4, letterSpacing: -0.3 },
  featuredExcerpt: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginBottom: 10 },
  featuredMeta: { flexDirection: 'row', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  metaTextDark: { color: Colors.textMuted, fontSize: 12 },
  listSection: { paddingHorizontal: 16, gap: 12 },
  articleCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  articleImg: { width: 96, height: 110 },
  articleInfo: { flex: 1, padding: 12 },
  pillSmall: {
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  pillSmallText: { color: Colors.primary, fontSize: 9, fontWeight: '700' },
  articleTitle: { fontSize: 13, fontWeight: '700', color: Colors.text, letterSpacing: -0.2, marginBottom: 3 },
  articleExcerpt: { fontSize: 11, color: Colors.textMuted, lineHeight: 15, marginBottom: 8 },
  articleBottom: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeCount: { fontSize: 12, color: Colors.textMuted },
  likeCountActive: { color: Colors.primary },
  articleDate: { fontSize: 11, color: Colors.textMuted, marginLeft: 'auto' },
  modalRoot: { flex: 1, backgroundColor: Colors.background },
  modalScroll: { flex: 1 },
  modalHeroWrap: { height: 260, position: 'relative' },
  modalHeroImg: { width: '100%', height: '100%' },
  modalTopGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: 80 },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: { padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, marginTop: 10, marginBottom: 14, letterSpacing: -0.5 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  authorAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorAvatarText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  authorName: { fontSize: 13, fontWeight: '700', color: Colors.text },
  authorTitle: { fontSize: 11, color: Colors.textMuted },
  modalDate: { marginLeft: 'auto', fontSize: 11, color: Colors.textMuted },
  articleActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  actionBtnActive: { backgroundColor: Colors.primary },
  actionBtnText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  actionBtnTextActive: { color: '#fff' },
  actionMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionMetaText: { fontSize: 13, color: Colors.textMuted },
  modalContent: { fontSize: 15, color: Colors.textSecondary, lineHeight: 24, marginBottom: 16 },
  commentsSection: { marginTop: 8, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 16 },
  commentsTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 14 },
  noComments: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', paddingVertical: 12 },
  commentItem: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: { fontWeight: '700', color: Colors.primary, fontSize: 13 },
  commentBody: { flex: 1 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  commentAuthor: { fontSize: 13, fontWeight: '700', color: Colors.text },
  commentDate: { fontSize: 11, color: Colors.textMuted },
  commentText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  commentInputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  commentInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text,
    maxHeight: 80,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.border },
});
