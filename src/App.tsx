import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/auth'
import { useProgressSync } from './lib/useProgressSync'
import DashboardPage from './pages/DashboardPage'
import ChapterListPage from './pages/vocabulary/ChapterListPage'
import ChapterHubPage from './pages/vocabulary/ChapterHubPage'
import FlashcardPage from './pages/vocabulary/FlashcardPage'
import MatchingGamePage from './pages/vocabulary/MatchingGamePage'
import TypingChallengePage from './pages/vocabulary/TypingChallengePage'
import WordRushPage from './pages/vocabulary/WordRushPage'
import ChapterQuizPage from './pages/vocabulary/ChapterQuizPage'
import GrammarTopicListPage from './pages/grammar/GrammarTopicListPage'
import GrammarLessonPage from './pages/grammar/GrammarLessonPage'
import GrammarPracticePage from './pages/grammar/GrammarPracticePage'
import ListeningPartListPage from './pages/listening/ListeningPartListPage'
import ListeningPracticePage from './pages/listening/ListeningPracticePage'
import ReadingListPage from './pages/reading/ReadingListPage'
import ReadingPracticePage from './pages/reading/ReadingPracticePage'
import MockTestHubPage from './pages/mocktest/MockTestHubPage'
import MockTestPage from './pages/mocktest/MockTestPage'
import FullMockTestPage from './pages/mocktest/FullMockTestPage'
import GamesHubPage from './pages/games/GamesHubPage'
import GrammarBlitzPage from './pages/games/GrammarBlitzPage'
import SettingsPage from './pages/SettingsPage'
import LevelTestPage from './pages/LevelTestPage'
import LoginPage from './pages/LoginPage'
import FriendsPage from './pages/FriendsPage'
import DuelPage from './pages/DuelPage'
import {
  GatedGrammarTopic,
  GatedListeningPart,
  GatedReadingPassage,
  GatedVocabChapter,
  RequireAuth,
} from './components/gates'

export default function App() {
  const checkSession = useAuthStore((s) => s.checkSession)

  useEffect(() => {
    checkSession()
  }, [checkSession])

  useProgressSync()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/vocabulary" element={<ChapterListPage />} />
          <Route path="/vocabulary/:chapterId" element={<GatedVocabChapter><ChapterHubPage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/flashcards" element={<GatedVocabChapter><FlashcardPage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/matching" element={<GatedVocabChapter><MatchingGamePage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/typing" element={<GatedVocabChapter><TypingChallengePage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/wordrush" element={<GatedVocabChapter><WordRushPage /></GatedVocabChapter>} />
          <Route path="/vocabulary/:chapterId/quiz" element={<GatedVocabChapter><ChapterQuizPage /></GatedVocabChapter>} />

          <Route path="/grammar" element={<GrammarTopicListPage />} />
          <Route path="/grammar/:topicId" element={<GatedGrammarTopic><GrammarLessonPage /></GatedGrammarTopic>} />
          <Route path="/grammar/:topicId/practice" element={<GatedGrammarTopic><GrammarPracticePage /></GatedGrammarTopic>} />

          <Route path="/listening" element={<ListeningPartListPage />} />
          <Route path="/listening/:part" element={<GatedListeningPart><ListeningPracticePage /></GatedListeningPart>} />

          <Route path="/reading" element={<ReadingListPage />} />
          <Route path="/reading/:passageId" element={<GatedReadingPassage><ReadingPracticePage /></GatedReadingPassage>} />

          <Route path="/mock-test" element={<MockTestHubPage />} />
          <Route path="/mock-test/mini" element={<RequireAuth><MockTestPage /></RequireAuth>} />
          <Route path="/mock-test/full" element={<RequireAuth><FullMockTestPage /></RequireAuth>} />

          <Route path="/games" element={<RequireAuth><GamesHubPage /></RequireAuth>} />
          <Route path="/games/flashcards" element={<RequireAuth><FlashcardPage /></RequireAuth>} />
          <Route path="/games/word-rush" element={<RequireAuth><WordRushPage /></RequireAuth>} />
          <Route path="/games/matching" element={<RequireAuth><MatchingGamePage /></RequireAuth>} />
          <Route path="/games/typing" element={<RequireAuth><TypingChallengePage /></RequireAuth>} />
          <Route path="/games/grammar-blitz" element={<RequireAuth><GrammarBlitzPage /></RequireAuth>} />

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/level-test" element={<RequireAuth><LevelTestPage /></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/friends" element={<RequireAuth><FriendsPage /></RequireAuth>} />
          <Route path="/duels/:duelId" element={<RequireAuth><DuelPage /></RequireAuth>} />
        </Routes>
      </main>
    </div>
  )
}
