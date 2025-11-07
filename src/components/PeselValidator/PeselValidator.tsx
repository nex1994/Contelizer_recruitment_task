import { useEffect, useState } from "react";
import { Layout } from "../Layout"
import styles from './PeselValidator.module.scss';

const CHECK_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

const ERROR = {
  noError: 'noError',
  notDigit: 'notDigit',
  tooShort: 'tooShort',
  incorectControlDigit: 'incorectControlDigit',
} as const;

type InputError = (typeof ERROR)[keyof typeof ERROR];

export const PeselValidator = () => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<InputError>(ERROR.noError);

  const digits = input.split("").map((digit) => Number(digit));

  const calcControlDigits = (digits: number[]) => {
    {
      let sum = 0;
      for (let i = 0; i < CHECK_WEIGHTS.length; i++) {
        sum += digits[i] * CHECK_WEIGHTS[i];
      }

      return (10 - (sum % 10) % 10);
    }
  }


  useEffect(() => {
    setError(ERROR.noError);

    if (digits.includes(NaN)) {
      setError("notDigit");
      return;
    }

    if (input.length !== 11) {
      setError(ERROR.tooShort);
      return;
    }

    if (calcControlDigits(digits) !== digits[10]) {
      setError('incorectControlDigit');
      return;
    }

    


  }, [digits, input])

  

  return (
    <Layout>
      <main className={styles.page}>
        <h1 className={styles.page__header}>Walidator numeru PESEL</h1>
        <div>
          <input
            placeholder="Wprowadź numer PESEL"
            value={input}
            type="text"
            maxLength={11}
            onChange={(e) => setInput(e.target.value.trim())}
          />
          {error === "noError" && <p>Numer PESEL jest poprawny</p>}
          {error === "tooShort" && <p>Numer PESEL jest za krótki</p>}
          {error === "notDigit" && <p>Numer PESEL składa się tylko z cyfr</p>}
          {error === "incorectControlDigit" && (
            <p>
               Cyfra kontrolna numeru PESEL jest nie prawidłowa.
            </p>
          )}
        </div>
      </main>
    </Layout>
  );
}