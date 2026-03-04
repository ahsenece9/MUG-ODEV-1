import React, { useState, useCallback } from 'react';
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
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import {
  Plus,
  X,
  Send,
  Image as ImageIcon,
  MessageSquare,
  Eye,
  ChevronRight,
  Tag,
  ArrowLeft,
  Heart,
  Clock,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { FORUM_POSTS, ForumPost, ForumReply } from '@/mocks/forumPosts';
import { useUser } from '@/context/UserContext';

export default function ForumScreen() {
  const { displayName, avatar } = useUser();
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('Soru');
  const [replyText, setReplyText] = useState<string>('');

  const tags = ['Soru', 'Deneyim', 'Bilgi', 'Etkinlik', 'Diğer'];

  const tagColor = useCallback((tag: string) => {
    const map: Record<string, string> = {
      Soru: '#E8943A',
      Deneyim: Colors.secondary,
      Bilgi: Colors.primary,
      Etkinlik: '#7A6FC4',
      Diğer: Colors.textMuted,
    };
    return map[tag] ?? Colors.textMuted;
  }, []);

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Bilgi', 'Resim ekleme mobil uygulamada kullanılabilir.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPickedImage(result.assets[0].uri);
    }
  };

  const submitPost = () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen başlık ve mesajı doldurun.');
      return;
    }
    const newPost: ForumPost = {
      id: `p_${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      author: displayName,
      avatar: avatar,
      date: 'Az önce',
      image: pickedImage ?? undefined,
      replies: 0,
      views: 1,
      tag: selectedTag,
      replyList: [],
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setMessage('');
    setPickedImage(null);
    setSelectedTag('Soru');
    setShowNew(false);
  };

  const resetModal = () => {
    setTitle('');
    setMessage('');
    setPickedImage(null);
    setSelectedTag('Soru');
    setShowNew(false);
  };

  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());

  const toggleReplyLike = (replyId: string) => {
    if (!selectedPost) return;
    const alreadyLiked = likedReplies.has(replyId);
    const newLiked = new Set(likedReplies);
    if (alreadyLiked) {
      newLiked.delete(replyId);
    } else {
      newLiked.add(replyId);
    }
    setLikedReplies(newLiked);

    const updatedReplyList = (selectedPost.replyList ?? []).map((r) =>
      r.id === replyId ? { ...r, likes: r.likes + (alreadyLiked ? -1 : 1) } : r
    );
    const updatedPost: ForumPost = { ...selectedPost, replyList: updatedReplyList };
    setPosts((prev) => prev.map((p) => (p.id === selectedPost.id ? updatedPost : p)));
    setSelectedPost(updatedPost);
  };

  const submitReply = () => {
    if (!replyText.trim() || !selectedPost) return;
    const newReply: ForumReply = {
      id: `r_${Date.now()}`,
      author: displayName,
      avatar: avatar,
      message: replyText.trim(),
      date: 'Az önce',
      likes: 0,
    };
    const updatedPost: ForumPost = {
      ...selectedPost,
      replies: selectedPost.replies + 1,
      replyList: [...(selectedPost.replyList ?? []), newReply],
    };
    setPosts((prev) => prev.map((p) => (p.id === selectedPost.id ? updatedPost : p)));
    setSelectedPost(updatedPost);
    setReplyText('');
  };

  const openPost = (post: ForumPost) => {
    const updated: ForumPost = { ...post, views: post.views + 1 };
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
    setSelectedPost(updated);
  };

  return (
    <View style={styles.root}>
      <AppHeader title="Forum" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>Topluluğumuza Katıl</Text>
          <Text style={styles.bannerSub}>
            Sorularını sor, deneyimlerini paylaş, diğer annelerle bağlantı kur.
          </Text>
          <TouchableOpacity
            style={styles.newPostBtn}
            onPress={() => setShowNew(true)}
            activeOpacity={0.85}
            testID="new-post-btn"
          >
            <Plus size={16} color="#fff" />
            <Text style={styles.newPostBtnText}>Yeni Gönderi Oluştur</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{posts.length}</Text>
            <Text style={styles.statLbl}>Gönderi</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>247</Text>
            <Text style={styles.statLbl}>Üye</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>1.2K</Text>
            <Text style={styles.statLbl}>Yorum</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Son Gönderiler</Text>

        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postCard}
            onPress={() => openPost(post)}
            activeOpacity={0.85}
            testID={`forum-post-${post.id}`}
          >
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} contentFit="cover" />
            )}
            <View style={styles.postBody}>
              <View style={styles.postTop}>
                <View style={[styles.tagBadge, { backgroundColor: tagColor(post.tag) + '20' }]}>
                  <Tag size={10} color={tagColor(post.tag)} />
                  <Text style={[styles.tagText, { color: tagColor(post.tag) }]}>{post.tag}</Text>
                </View>
                <Text style={styles.postDate}>{post.date}</Text>
              </View>

              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postMessage} numberOfLines={2}>{post.message}</Text>

              <View style={styles.postBottom}>
                <View style={styles.authorRow}>
                  <View style={[styles.avatar, { backgroundColor: Colors.primaryLight }]}>
                    <Text style={styles.avatarText}>{post.avatar}</Text>
                  </View>
                  <Text style={styles.authorName}>{post.author}</Text>
                </View>
                <View style={styles.postStats}>
                  <View style={styles.statItem}>
                    <MessageSquare size={13} color={Colors.textMuted} />
                    <Text style={styles.statItemText}>{post.replies}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Eye size={13} color={Colors.textMuted} />
                    <Text style={styles.statItemText}>{post.views}</Text>
                  </View>
                  <ChevronRight size={16} color={Colors.border} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* New Post Modal */}
      <Modal visible={showNew} animationType="slide" onRequestClose={resetModal}>
        <KeyboardAvoidingView
          style={styles.modalRoot}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Yeni Gönderi</Text>
            <TouchableOpacity onPress={resetModal} style={styles.closeBtn} testID="forum-modal-close">
              <X size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalScroll}
            contentContainerStyle={styles.modalContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.fieldLabel}>Etiket</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
              <View style={styles.tagsRow}>
                {tags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tagOption,
                      selectedTag === tag && { backgroundColor: tagColor(tag), borderColor: tagColor(tag) },
                    ]}
                    onPress={() => setSelectedTag(tag)}
                  >
                    <Text
                      style={[
                        styles.tagOptionText,
                        selectedTag === tag && styles.tagOptionTextActive,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Text style={styles.fieldLabel}>Gönderinin Başlığını Yazın</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Başlık girin..."
              placeholderTextColor={Colors.textMuted}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
              testID="forum-title-input"
            />
            <Text style={styles.charCount}>{title.length}/100</Text>

            <Text style={styles.fieldLabel}>Mesajı Yazın</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Mesajınızı buraya yazın..."
              placeholderTextColor={Colors.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              testID="forum-message-input"
            />

            <Text style={styles.fieldLabel}>Resim Ekle (İsteğe Bağlı)</Text>
            {pickedImage ? (
              <View style={styles.pickedImageWrap}>
                <Image source={{ uri: pickedImage }} style={styles.pickedImage} contentFit="cover" />
                <TouchableOpacity
                  style={styles.removeImageBtn}
                  onPress={() => setPickedImage(null)}
                >
                  <X size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imagePickerBtn}
                onPress={pickImage}
                activeOpacity={0.75}
                testID="image-picker-btn"
              >
                <ImageIcon size={24} color={Colors.primary} />
                <Text style={styles.imagePickerText}>Galeriden Resim Seç</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <View style={styles.submitWrap}>
            <TouchableOpacity
              style={[styles.submitBtn, (!title.trim() || !message.trim()) && styles.submitBtnDisabled]}
              onPress={submitPost}
              disabled={!title.trim() || !message.trim()}
              testID="submit-post-btn"
            >
              <Send size={18} color="#fff" />
              <Text style={styles.submitBtnText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Post Detail Modal */}
      <Modal
        visible={!!selectedPost}
        animationType="slide"
        onRequestClose={() => { setSelectedPost(null); setReplyText(''); }}
      >
        {selectedPost && (
          <KeyboardAvoidingView
            style={styles.detailRoot}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.detailHeader}>
              <TouchableOpacity
                onPress={() => { setSelectedPost(null); setReplyText(''); }}
                style={styles.backBtn}
                testID="post-detail-back"
              >
                <ArrowLeft size={20} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.detailHeaderTitle} numberOfLines={1}>Gönderi Detayı</Text>
              <View style={{ width: 36 }} />
            </View>

            <ScrollView
              style={styles.detailScroll}
              contentContainerStyle={styles.detailScrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.detailAuthorRow}>
                <View style={[styles.detailAvatar, { backgroundColor: Colors.primary }]}>
                  <Text style={styles.detailAvatarText}>{selectedPost.avatar}</Text>
                </View>
                <View style={styles.detailAuthorInfo}>
                  <Text style={styles.detailAuthorName}>{selectedPost.author}</Text>
                  <View style={styles.detailDateRow}>
                    <Clock size={11} color={Colors.textMuted} />
                    <Text style={styles.detailDate}>{selectedPost.date}</Text>
                  </View>
                </View>
                <View style={[styles.detailTag, { backgroundColor: tagColor(selectedPost.tag) + '20' }]}>
                  <Text style={[styles.detailTagText, { color: tagColor(selectedPost.tag) }]}>{selectedPost.tag}</Text>
                </View>
              </View>

              <Text style={styles.detailTitle}>{selectedPost.title}</Text>
              <Text style={styles.detailMessage}>{selectedPost.message}</Text>

              {selectedPost.image && (
                <Image source={{ uri: selectedPost.image }} style={styles.detailImage} contentFit="cover" />
              )}

              <View style={styles.detailStatsRow}>
                <View style={styles.detailStatItem}>
                  <Eye size={14} color={Colors.textMuted} />
                  <Text style={styles.detailStatText}>{selectedPost.views} görüntülenme</Text>
                </View>
                <View style={styles.detailStatItem}>
                  <MessageSquare size={14} color={Colors.primary} />
                  <Text style={[styles.detailStatText, { color: Colors.primary }]}>{selectedPost.replies} yanıt</Text>
                </View>
              </View>

              <View style={styles.repliesDivider}>
                <View style={styles.dividerLine} />
                <Text style={styles.repliesTitle}>Yanıtlar ({selectedPost.replyList?.length ?? 0})</Text>
                <View style={styles.dividerLine} />
              </View>

              {(!selectedPost.replyList || selectedPost.replyList.length === 0) && (
                <View style={styles.noReplies}>
                  <MessageSquare size={32} color={Colors.border} />
                  <Text style={styles.noRepliesText}>Henüz yanıt yok. İlk yanıtı sen yaz!</Text>
                </View>
              )}

              {selectedPost.replyList?.map((reply) => (
                <View key={reply.id} style={styles.replyCard} testID={`reply-${reply.id}`}>
                  <View style={styles.replyTop}>
                    <View style={[styles.replyAvatar, {
                      backgroundColor: reply.author.startsWith('Dr.') ? Colors.secondary : Colors.primaryLight,
                    }]}>
                      <Text style={[styles.replyAvatarText, {
                        color: reply.author.startsWith('Dr.') ? '#fff' : Colors.primary,
                      }]}>{reply.avatar}</Text>
                    </View>
                    <View style={styles.replyAuthorInfo}>
                      <Text style={styles.replyAuthorName}>{reply.author}</Text>
                      <Text style={styles.replyDate}>{reply.date}</Text>
                    </View>
                  </View>
                  <Text style={styles.replyMessage}>{reply.message}</Text>
                  <View style={styles.replyActions}>
                    <TouchableOpacity
                      style={styles.replyLikeBtn}
                      onPress={() => toggleReplyLike(reply.id)}
                      activeOpacity={0.7}
                      testID={`like-reply-${reply.id}`}
                    >
                      <Heart
                        size={14}
                        color={likedReplies.has(reply.id) ? '#E8443A' : Colors.textMuted}
                        fill={likedReplies.has(reply.id) ? '#E8443A' : 'none'}
                      />
                      <Text style={[
                        styles.replyLikeText,
                        likedReplies.has(reply.id) && styles.replyLikedText,
                      ]}>{reply.likes}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <View style={{ height: 20 }} />
            </ScrollView>

            <View style={styles.replyInputWrap}>
              <TextInput
                style={styles.replyInput}
                placeholder="Yanıtınızı yazın..."
                placeholderTextColor={Colors.textMuted}
                value={replyText}
                onChangeText={setReplyText}
                multiline
                maxLength={500}
                testID="reply-input"
              />
              <TouchableOpacity
                style={[styles.replySendBtn, !replyText.trim() && styles.replySendBtnDisabled]}
                onPress={submitReply}
                disabled={!replyText.trim()}
                testID="reply-send-btn"
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
  content: { padding: 16, paddingBottom: 32 },
  bannerCard: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  bannerTitle: { fontSize: 18, fontWeight: '800' as const, color: '#fff', marginBottom: 6, letterSpacing: -0.3 },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 16, lineHeight: 18 },
  newPostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  newPostBtnText: { color: '#fff', fontWeight: '700' as const, fontSize: 14 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statNum: { fontSize: 20, fontWeight: '800' as const, color: Colors.primary },
  statLbl: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700' as const, color: Colors.text, marginBottom: 12 },
  postCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  postImage: { width: '100%', height: 140 },
  postBody: { padding: 14 },
  postTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { fontSize: 11, fontWeight: '700' as const },
  postDate: { fontSize: 11, color: Colors.textMuted },
  postTitle: { fontSize: 15, fontWeight: '700' as const, color: Colors.text, marginBottom: 5, letterSpacing: -0.2 },
  postMessage: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 12 },
  postBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700' as const, fontSize: 12, color: Colors.primary },
  authorName: { fontSize: 13, fontWeight: '600' as const, color: Colors.text },
  postStats: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statItemText: { fontSize: 12, color: Colors.textMuted },
  modalRoot: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: { fontSize: 18, fontWeight: '700' as const, color: Colors.text },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: { flex: 1 },
  modalContent: { padding: 20 },
  fieldLabel: { fontSize: 13, fontWeight: '700' as const, color: Colors.text, marginBottom: 8, marginTop: 4 },
  tagsScroll: { marginBottom: 16 },
  tagsRow: { flexDirection: 'row', gap: 8 },
  tagOption: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  tagOptionText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' as const },
  tagOptionTextActive: { color: '#fff', fontWeight: '700' as const },
  titleInput: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 4,
  },
  charCount: { fontSize: 11, color: Colors.textMuted, textAlign: 'right', marginBottom: 16 },
  messageInput: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 120,
    marginBottom: 20,
  },
  imagePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  imagePickerText: { fontSize: 14, color: Colors.primary, fontWeight: '600' as const },
  pickedImageWrap: { borderRadius: 14, overflow: 'hidden', position: 'relative', marginBottom: 8 },
  pickedImage: { width: '100%', height: 160 },
  removeImageBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitWrap: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
  },
  submitBtnDisabled: { backgroundColor: Colors.border },
  submitBtnText: { color: '#fff', fontWeight: '700' as const, fontSize: 16 },
  detailRoot: { flex: 1, backgroundColor: Colors.background },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 14,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailHeaderTitle: { fontSize: 16, fontWeight: '700' as const, color: Colors.text, flex: 1, textAlign: 'center' },
  detailScroll: { flex: 1 },
  detailScrollContent: { padding: 16 },
  detailAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailAvatarText: { color: '#fff', fontWeight: '700' as const, fontSize: 18 },
  detailAuthorInfo: { flex: 1, marginLeft: 12 },
  detailAuthorName: { fontSize: 15, fontWeight: '700' as const, color: Colors.text },
  detailDateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  detailDate: { fontSize: 12, color: Colors.textMuted },
  detailTag: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  detailTagText: { fontSize: 12, fontWeight: '700' as const },
  detailTitle: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 12,
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  detailMessage: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 23,
    marginBottom: 16,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  detailStatsRow: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  detailStatItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailStatText: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' as const },
  repliesDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.borderLight },
  repliesTitle: { fontSize: 14, fontWeight: '700' as const, color: Colors.text },
  noReplies: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 10,
  },
  noRepliesText: { fontSize: 13, color: Colors.textMuted },
  replyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  replyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyAvatarText: { fontWeight: '700' as const, fontSize: 13 },
  replyAuthorInfo: { marginLeft: 10 },
  replyAuthorName: { fontSize: 13, fontWeight: '700' as const, color: Colors.text },
  replyDate: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  replyMessage: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  replyActions: { flexDirection: 'row', marginTop: 10 },
  replyLikeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  replyLikeText: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' as const },
  replyLikedText: { color: '#E8443A' },
  replyInputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 12,
    paddingBottom: 28,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  replyInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  replySendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replySendBtnDisabled: { backgroundColor: Colors.border },
});
