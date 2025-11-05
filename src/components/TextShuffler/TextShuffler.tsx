import { useState, type ChangeEvent } from "react";
import { Layout } from "../Layout"
import styles from './TextShuffler.module.scss'

export const TextShuffler = () => {
  const [output, setOutput] = useState<string>('Tutaj pojawi się tekst.');

  function shuffleMiddleLetters(word: string): string {
    if (word.length <= 3) return word;

    const first = word[0];
    const last = word[word.length - 1];
    const middle = word.slice(1, -1).split("");

    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }

    return first + middle.join("") + last;
  }

  function jumbleText(text: string): string {
    return text.replace(/\p{L}+/gu, (word) => shuffleMiddleLetters(word));
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;

      if (!text) {
        return;
      }

      const modified = jumbleText(text)
      setOutput(modified);

    };

    reader.readAsText(file);
  };

  
  return (
    <Layout>
      <main className={styles.page}>
        <h1>Szyfrak</h1>
        <div className={styles.page__container}>
          <div className={styles.page__item}>
            <label className={styles.page__label} htmlFor="text">Dodaj plik tekstowy (.txt)</label>
            <input
              className={styles.page__input}
              id="text"
              accept=".txt"
              placeholder="Dodaj plik tekstowy"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <pre className={styles.page__text}>{output}</pre>
        </div>
      </main>
    </Layout>
  );
}