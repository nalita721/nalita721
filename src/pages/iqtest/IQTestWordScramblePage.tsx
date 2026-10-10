import { iqTestVocab } from '../../data/iqTest'
import { WordScrambleGame } from '../../components/WordScrambleGame'

export default function IQTestWordScramblePage() {
  return <WordScrambleGame words={iqTestVocab} title="IQ Test" backTo="/iq-test" />
}
