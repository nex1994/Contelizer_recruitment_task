import { useEffect, useState } from "react";
import { Layout } from "../Layout"
// import styles from './PeselValidator.module.scss';

export const PeselValidator = () => {
  const [input, setInput] = useState<string>();

  // const validateInput = (input: string) => {
  //   if (input.length !== 11) {
  //     return false;
  //   }
  // };

  useEffect(() => {

  })

  

  return (
    <Layout>
      <main>
        <h1>Walidator numeru PESEL</h1>
        <div>
            <input
              placeholder="Wprowadź numer PESEL"
              value={input}
              type="text"
              maxLength={11}
              onChange={(e) => setInput(e.target.value.trim())}
            />
          <p>{input}</p>
        </div>
      </main>
    </Layout>
  );
}