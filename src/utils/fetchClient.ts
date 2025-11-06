export const BASE_URL = 'http://gorest.co.in/public/v2/users'

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'PATCH';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null, 
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(100)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  patch: <T>(url: string, data: unknown) => request<T>(url, 'PATCH', data),
};