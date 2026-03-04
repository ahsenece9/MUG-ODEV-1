import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import {
  Play,
  Clock,
  ChevronRight,
  X,
  CheckCircle2,
  BookOpen,
  Users,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { COURSES, Course, Lesson } from '@/mocks/courses';

export default function CoursesScreen() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [playingLesson, setPlayingLesson] = useState<Lesson | null>(null);

  const handlePlayLesson = (lesson: Lesson) => {
    setPlayingLesson(lesson);
  };

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const getYouTubeHtml = (videoId: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #1A0E0C; display: flex; align-items: center; justify-content: center; height: 100vh; }
          iframe { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
          allow="autoplay; encrypted-media; fullscreen"
          allowfullscreen
        ></iframe>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.root}>
      <AppHeader title="Kurslar" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#FDE8E6', '#FFF5F3']}
          style={styles.heroBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View>
            <Text style={styles.heroTitle}>Doğum Eğitimleri</Text>
            <Text style={styles.heroSub}>Uzmanlardan, kendi hızınızda öğrenin</Text>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <BookOpen size={16} color={Colors.primary} />
              <Text style={styles.heroStatText}>10 Ders</Text>
            </View>
            <View style={styles.heroStat}>
              <Users size={16} color={Colors.primary} />
              <Text style={styles.heroStatText}>2.4K Öğrenci</Text>
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Tüm Kurslar</Text>

        {COURSES.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => setSelectedCourse(course)}
            activeOpacity={0.85}
            testID={`course-card-${course.id}`}
          >
            <Image source={{ uri: course.cover }} style={styles.courseCover} contentFit="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(44,24,16,0.75)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.courseOverlay}>
              <View style={styles.courseTopRow}>
                <View style={styles.lessonCountBadge}>
                  <Text style={styles.lessonCountText}>{course.totalLessons} Ders</Text>
                </View>
                <View style={styles.durationBadge}>
                  <Clock size={11} color="#fff" />
                  <Text style={styles.durationText}>{course.totalDuration}</Text>
                </View>
              </View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDesc} numberOfLines={2}>{course.description}</Text>
              <View style={styles.instructorRow}>
                <View style={styles.instructorAvatar}>
                  <Text style={styles.instructorAvatarText}>{course.instructor[0]}</Text>
                </View>
                <View>
                  <Text style={styles.instructorName}>{course.instructor}</Text>
                  <Text style={styles.instructorTitle}>{course.instructorTitle}</Text>
                </View>
                <View style={styles.playCircle}>
                  <Play size={16} color={Colors.primary} fill={Colors.primary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={!!selectedCourse}
        animationType="slide"
        onRequestClose={() => setSelectedCourse(null)}
      >
        {selectedCourse && (
          <View style={styles.modalRoot}>
            <View style={styles.modalHeroWrap}>
              <Image source={{ uri: selectedCourse.cover }} style={styles.modalHeroImg} contentFit="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.1)']}
                style={StyleSheet.absoluteFill}
              />
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setSelectedCourse(null)}
                testID="course-modal-close"
              >
                <X size={20} color="#fff" />
              </TouchableOpacity>
              <View style={styles.modalHeroContent}>
                <Text style={styles.modalCourseTitle}>{selectedCourse.title}</Text>
                <View style={styles.modalMetaRow}>
                  <View style={styles.lessonCountBadge}>
                    <Text style={styles.lessonCountText}>{selectedCourse.totalLessons} Ders</Text>
                  </View>
                  <View style={styles.durationBadge}>
                    <Clock size={11} color="#fff" />
                    <Text style={styles.durationText}>{selectedCourse.totalDuration}</Text>
                  </View>
                </View>
              </View>
            </View>

            <ScrollView
              style={styles.lessonList}
              contentContainerStyle={styles.lessonListContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.instructorCard}>
                <View style={styles.instructorAvatarLarge}>
                  <Text style={styles.instructorAvatarLargeText}>{selectedCourse.instructor[0]}</Text>
                </View>
                <View>
                  <Text style={styles.instructorNameLarge}>{selectedCourse.instructor}</Text>
                  <Text style={styles.instructorTitleLarge}>{selectedCourse.instructorTitle}</Text>
                </View>
              </View>

              <Text style={styles.lessonSectionTitle}>Dersler</Text>

              {selectedCourse.lessons.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonItem}
                  onPress={() => handlePlayLesson(lesson)}
                  activeOpacity={0.8}
                  testID={`lesson-${lesson.id}`}
                >
                  <View style={styles.lessonThumb}>
                    <Image source={{ uri: lesson.thumbnail }} style={styles.lessonThumbImg} contentFit="cover" />
                    <View style={styles.playOverlay}>
                      <Play size={14} color="#fff" fill="#fff" />
                    </View>
                  </View>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle} numberOfLines={2}>
                      {lesson.title}
                    </Text>
                    <Text style={styles.lessonDescription} numberOfLines={1}>{lesson.description}</Text>
                    <View style={styles.lessonMeta}>
                      <Clock size={12} color={Colors.primary} />
                      <Text style={styles.lessonDuration}>
                        {lesson.duration}
                      </Text>
                      <CheckCircle2 size={13} color={Colors.success} />
                    </View>
                  </View>
                  <ChevronRight size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </Modal>

      <Modal
        visible={!!playingLesson}
        animationType="fade"
        onRequestClose={() => setPlayingLesson(null)}
      >
        {playingLesson && (
          <View style={styles.playerRoot}>
            <TouchableOpacity
              style={styles.playerClose}
              onPress={() => setPlayingLesson(null)}
              testID="player-close"
            >
              <X size={22} color="#fff" />
            </TouchableOpacity>

            <View style={styles.videoContainer}>
              {Platform.OS === 'web' ? (
                <iframe
                  src={getYouTubeEmbedUrl(playingLesson.videoId)}
                  style={{ width: '100%', height: '100%', border: 'none' } as React.CSSProperties}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              ) : (
                <WebView
                  source={{ html: getYouTubeHtml(playingLesson.videoId) }}
                  style={styles.webview}
                  allowsInlineMediaPlayback
                  mediaPlaybackRequiresUserAction={false}
                  javaScriptEnabled
                  domStorageEnabled
                />
              )}
            </View>

            <View style={styles.playerInfo}>
              <Text style={styles.playerLessonTitle}>{playingLesson.title}</Text>
              <Text style={styles.playerLessonDesc}>{playingLesson.description}</Text>
              <View style={styles.playerDurationRow}>
                <Clock size={14} color={Colors.primaryLight} />
                <Text style={styles.playerDurationText}>{playingLesson.duration}</Text>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  heroBanner: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: { fontSize: 18, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.4 },
  heroSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 3 },
  heroStats: { gap: 8, alignItems: 'flex-end' },
  heroStat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroStatText: { fontSize: 13, color: Colors.primary, fontWeight: '600' as const },
  sectionTitle: { fontSize: 17, fontWeight: '700' as const, color: Colors.text, marginBottom: 14 },
  courseCard: {
    height: 200,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
  },
  courseCover: { ...StyleSheet.absoluteFillObject },
  courseOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  courseTopRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  lessonCountBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lessonCountText: { color: '#fff', fontSize: 11, fontWeight: '700' as const },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  durationText: { color: '#fff', fontSize: 11, fontWeight: '700' as const },
  courseTitle: { fontSize: 18, fontWeight: '800' as const, color: '#fff', marginBottom: 4, letterSpacing: -0.3 },
  courseDesc: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 12 },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  instructorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructorAvatarText: { fontWeight: '700' as const, color: Colors.primary, fontSize: 12 },
  instructorName: { fontSize: 12, fontWeight: '700' as const, color: '#fff' },
  instructorTitle: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  playCircle: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalRoot: { flex: 1, backgroundColor: Colors.background },
  modalHeroWrap: { height: 220, position: 'relative' },
  modalHeroImg: { width: '100%', height: '100%' },
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
    zIndex: 10,
  },
  modalHeroContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  modalCourseTitle: { fontSize: 20, fontWeight: '800' as const, color: '#fff', marginBottom: 8, letterSpacing: -0.4 },
  modalMetaRow: { flexDirection: 'row', gap: 8 },
  lessonList: { flex: 1 },
  lessonListContent: { padding: 16, paddingBottom: 32 },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  instructorAvatarLarge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructorAvatarLargeText: { fontWeight: '800' as const, color: '#fff', fontSize: 18 },
  instructorNameLarge: { fontSize: 15, fontWeight: '700' as const, color: Colors.text },
  instructorTitleLarge: { fontSize: 12, color: Colors.textMuted },
  lessonSectionTitle: { fontSize: 16, fontWeight: '700' as const, color: Colors.text, marginBottom: 12 },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  lessonThumb: { width: 70, height: 50, borderRadius: 10, overflow: 'hidden', position: 'relative' },
  lessonThumbImg: { width: '100%', height: '100%' },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(196,113,106,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 13, fontWeight: '700' as const, color: Colors.text, marginBottom: 3, letterSpacing: -0.1 },
  lessonDescription: { fontSize: 11, color: Colors.textMuted, marginBottom: 5 },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  lessonDuration: { fontSize: 12, color: Colors.primary, fontWeight: '600' as const },
  playerRoot: { flex: 1, backgroundColor: '#1A0E0C' },
  playerClose: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  videoContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#000',
    marginTop: 0,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  playerInfo: { flex: 1, padding: 20 },
  playerLessonTitle: { fontSize: 18, fontWeight: '700' as const, color: '#fff', marginBottom: 8 },
  playerLessonDesc: { fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 20, marginBottom: 12 },
  playerDurationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  playerDurationText: { fontSize: 13, color: Colors.primaryLight, fontWeight: '600' as const },
});
