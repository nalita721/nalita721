import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import { useAuthStore } from './store/auth'
import { useProgressSync } from './lib/useProgressSync'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import ProgressPage from './pages/ProgressPage'
import StudyPlanPage from './pages/StudyPlanPage'
import CheckpointTestPage from './pages/CheckpointTestPage'
import ProfilePage from './pages/ProfilePage'
import ChapterListPage from './pages/vocabulary/ChapterListPage'
import ChapterHubPage from './pages/vocabulary/ChapterHubPage'
import FlashcardPage from './pages/vocabulary/FlashcardPage'
import MatchingGamePage from './pages/vocabulary/MatchingGamePage'
import TouchTypingPage from './pages/vocabulary/TouchTypingPage'
import WordRushPage from './pages/vocabulary/WordRushPage'
import WordScramblePage from './pages/vocabulary/WordScramblePage'
import ChapterQuizPage from './pages/vocabulary/ChapterQuizPage'
import VocabGamePathPage from './pages/vocabulary/path/VocabGamePathPage'
import LearnStagePage from './pages/vocabulary/path/LearnStagePage'
import MatchingStagePage from './pages/vocabulary/path/MatchingStagePage'
import SpellingStagePage from './pages/vocabulary/path/SpellingStagePage'
import RecallStagePage from './pages/vocabulary/path/RecallStagePage'
import ToeicStagePage from './pages/vocabulary/path/ToeicStagePage'
import GrammarTopicListPage from './pages/grammar/GrammarTopicListPage'
import GrammarLessonPage from './pages/grammar/GrammarLessonPage'
import GrammarWritingPage from './pages/grammar/GrammarWritingPage'
import GrammarPracticePage from './pages/grammar/GrammarPracticePage'
import ListeningPartListPage from './pages/listening/ListeningPartListPage'
import ListeningPracticePage from './pages/listening/ListeningPracticePage'
import ReadingListPage from './pages/reading/ReadingListPage'
import ReadingPracticePage from './pages/reading/ReadingPracticePage'
import MockTestHubPage from './pages/mocktest/MockTestHubPage'
import IQTestHubPage from './pages/iqtest/IQTestHubPage'
import IQTestVocabPage from './pages/iqtest/IQTestVocabPage'
import IQTestQuizPage from './pages/iqtest/IQTestQuizPage'
import IQTestWordScramblePage from './pages/iqtest/IQTestWordScramblePage'
import MockTestPage from './pages/mocktest/MockTestPage'
import FullMockTestPage from './pages/mocktest/FullMockTestPage'
import GamesHubPage from './pages/games/GamesHubPage'
import GrammarBlitzPage from './pages/games/GrammarBlitzPage'
import SettingsPage from './pages/SettingsPage'
import AchievementsPage from './pages/AchievementsPage'
import LangHubPage from './pages/lang/LangHubPage'
import LangLevelPage from './pages/lang/LangLevelPage'
import LangVocabPage from './pages/lang/LangVocabPage'
import LangGrammarPage from './pages/lang/LangGrammarPage'
import LangMockPage from './pages/lang/LangMockPage'
import KanaPage from './pages/lang/KanaPage'
import KanjiPage from './pages/lang/KanjiPage'
import PinyinPage from './pages/lang/PinyinPage'
import SpeakingPage from './pages/SpeakingPage'
import LevelTestPage from './pages/LevelTestPage'
import LoginPage from './pages/LoginPage'
import FriendsPage from './pages/FriendsPage'
import DuelPage from './pages/DuelPage'
import {
  GatedCheckpoint,
  GatedGrammarTopic,
  GatedListeningPart,
  GatedReadingPassage,
  GatedVocabChapter,
  RequireAuth,
} from './components/gates'

export default function App() {
  const checkSession = useAuthStore((s) => s.checkSession)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    checkSession()
  }, [checkSession])

  useProgressSync()

  if (location.pathname === '/') return <HomePage />

  return (
    <div className="min-h-screen md:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <TopBar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/progress" element={<RequireAuth><ProgressPage /></RequireAuth>} />
          <Route path="/study-plan" element={<RequireAuth><StudyPlanPage /></RequireAuth>} />
          <Route path="/study-plan/checkpoint/:level" element={<GatedCheckpoint><CheckpointTestPage /></GatedCheckpoint>} />
          <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />

          <Route path="/vocabulary" element={<ChapterListPage />} />
          <Route path="/vocabulary/:chapterId" element={<GatedVocabChapter><ChapterHubPage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/quiz" element={<GatedVocabChapter><ChapterQuizPage /></GatedVocabChapter>} />

          <Route path="/vocabulary/:chapterId/path" element={<GatedVocabChapter><VocabGamePathPage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/path/:setIndex/learn" element={<GatedVocabChapter><LearnStagePage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/path/:setIndex/matching" element={<GatedVocabChapter><MatchingStagePage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/path/:setIndex/spelling" element={<GatedVocabChapter><SpellingStagePage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/path/:setIndex/recall" element={<GatedVocabChapter><RecallStagePage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/path/:setIndex/toeic" element={<GatedVocabChapter><ToeicStagePage /></GatedVocabChapter>} />

          <Route path="/grammar" element={<GrammarTopicListPage />} />
          <Route path="/grammar/:topicId" element={<GatedGrammarTopic><GrammarLessonPage /></GatedGrammarTopic>} />
          <Route path="/grammar/:topicId/writing" element={<GatedGrammarTopic><GrammarWritingPage /></GatedGrammarTopic>} />
          <Route path="/grammar/:topicId/practice" element={<GatedGrammarTopic><GrammarPracticePage /></GatedGrammarTopic>} />

          <Route path="/listening" element={<ListeningPartListPage />} />
          <Route path="/listening/:part" element={<GatedListeningPart><ListeningPracticePage /></GatedListeningPart>} />

          <Route path="/reading" element={<ReadingListPage />} />
          <Route path="/reading/:passageId" element={<GatedReadingPassage><ReadingPracticePage /></GatedReadingPassage>} />

          <Route path="/mock-test" element={<MockTestHubPage />} />
          <Route path="/iq-test" element={<RequireAuth><IQTestHubPage /></RequireAuth>} />
          <Route path="/iq-test/vocab" element={<RequireAuth><IQTestVocabPage /></RequireAuth>} />
          <Route path="/iq-test/quiz" element={<RequireAuth><IQTestQuizPage /></RequireAuth>} />
          <Route path="/iq-test/word-scramble" element={<RequireAuth><IQTestWordScramblePage /></RequireAuth>} />
          <Route path="/mock-test/mini" element={<RequireAuth><MockTestPage /></RequireAuth>} />
          <Route path="/mock-test/full/:setId" element={<RequireAuth><FullMockTestPage /></RequireAuth>} />

          <Route path="/games" element={<RequireAuth><GamesHubPage /></RequireAuth>} />
          <Route path="/games/flashcards" element={<RequireAuth><FlashcardPage /></RequireAuth>} />
          <Route path="/games/word-rush" element={<RequireAuth><WordRushPage /></RequireAuth>} />
          <Route path="/games/word-scramble" element={<RequireAuth><WordScramblePage /></RequireAuth>} />
          <Route path="/games/matching" element={<RequireAuth><MatchingGamePage /></RequireAuth>} />
          <Route path="/games/touch-typing" element={<RequireAuth><TouchTypingPage /></RequireAuth>} />
          <Route path="/games/grammar-blitz" element={<RequireAuth><GrammarBlitzPage /></RequireAuth>} />

          <Route path="/chinese/pinyin" element={<RequireAuth><PinyinPage /></RequireAuth>} />
          <Route path="/chinese" element={<RequireAuth><LangHubPage lang="zh" /></RequireAuth>} />
          <Route path="/chinese/:level" element={<RequireAuth><LangLevelPage lang="zh" /></RequireAuth>} />
          <Route path="/chinese/:level/vocab/:chapterId" element={<RequireAuth><LangVocabPage lang="zh" /></RequireAuth>} />
          <Route path="/chinese/:level/grammar/:topicId" element={<RequireAuth><LangGrammarPage lang="zh" /></RequireAuth>} />
          <Route path="/chinese/:level/mock" element={<RequireAuth><LangMockPage lang="zh" /></RequireAuth>} />

          <Route path="/japanese/kana" element={<RequireAuth><KanaPage /></RequireAuth>} />
          <Route path="/japanese/n5/kanji" element={<RequireAuth><KanjiPage /></RequireAuth>} />
          <Route path="/japanese" element={<RequireAuth><LangHubPage lang="ja" /></RequireAuth>} />
          <Route path="/japanese/:level" element={<RequireAuth><LangLevelPage lang="ja" /></RequireAuth>} />
          <Route path="/japanese/:level/vocab/:chapterId" element={<RequireAuth><LangVocabPage lang="ja" /></RequireAuth>} />
          <Route path="/japanese/:level/grammar/:topicId" element={<RequireAuth><LangGrammarPage lang="ja" /></RequireAuth>} />
          <Route path="/japanese/:level/mock" element={<RequireAuth><LangMockPage lang="ja" /></RequireAuth>} />

          <Route path="/speaking" element={<RequireAuth><SpeakingPage /></RequireAuth>} />

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/level-test" element={<RequireAuth><LevelTestPage /></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/friends" element={<RequireAuth><FriendsPage /></RequireAuth>} />
          <Route path="/duels/:duelId" element={<RequireAuth><DuelPage /></RequireAuth>} />
        </Routes>
        </main>
      </div>
    </div>
  )
}
