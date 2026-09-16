import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
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

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/vocabulary" element={<ChapterListPage />} />
          <Route path="/vocabulary/:chapterId" element={<ChapterHubPage />} />
          <Route path="/vocabulary/:chapterId/flashcards" element={<FlashcardPage />} />
          <Route path="/vocabulary/:chapterId/matching" element={<MatchingGamePage />} />
          <Route path="/vocabulary/:chapterId/typing" element={<TypingChallengePage />} />
          <Route path="/vocabulary/:chapterId/wordrush" element={<WordRushPage />} />
          <Route path="/vocabulary/:chapterId/quiz" element={<ChapterQuizPage />} />

          <Route path="/grammar" element={<GrammarTopicListPage />} />
          <Route path="/grammar/:topicId" element={<GrammarLessonPage />} />
          <Route path="/grammar/:topicId/practice" element={<GrammarPracticePage />} />

          <Route path="/listening" element={<ListeningPartListPage />} />
          <Route path="/listening/:part" element={<ListeningPracticePage />} />

          <Route path="/reading" element={<ReadingListPage />} />
          <Route path="/reading/:passageId" element={<ReadingPracticePage />} />

          <Route path="/mock-test" element={<MockTestHubPage />} />
          <Route path="/mock-test/mini" element={<MockTestPage />} />
          <Route path="/mock-test/full" element={<FullMockTestPage />} />

          <Route path="/games" element={<GamesHubPage />} />
          <Route path="/games/word-rush" element={<WordRushPage />} />
          <Route path="/games/matching" element={<MatchingGamePage />} />
          <Route path="/games/typing" element={<TypingChallengePage />} />
          <Route path="/games/grammar-blitz" element={<GrammarBlitzPage />} />

          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}
