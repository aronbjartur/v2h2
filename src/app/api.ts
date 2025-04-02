import { /* Paginated, */ Transaction } from './types';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class TransactionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (error) {
      console.error('Error fetching from api', url, error);
      return null;
    }
    if (!response.ok) {
      console.error('non 200 status from API', url);
      return null;
    }
    if (response.status === 404) {
      console.error('404 from API', url);
      return null;
    }
    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('Error parsing JSON', url, e);
      return null;
    }
    return json as T;
  }
  async getTransactions(user: string): Promise<Transaction | null> {
    const url = BASE_URL + `/transactions/${user}`;
    const response = await this.fetchFromApi<Transaction | null>(url);
    return response;
  }
  async getAllTransactions(): Promise<Transaction | null> {
    const url = BASE_URL + `/transactions`;
    const response = await this.fetchFromApi<Transaction | null>(url);
    return response;
  }
}
