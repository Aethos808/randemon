import { unstable_rethrow } from 'next/navigation';

const DEFAULT_TIMEOUT_MS = 5_000;

export type PokeApiRequestOptions = {
  fetcher?: typeof fetch;
  timeoutMs?: number;
};

type FetchPokeApiJsonOptions = PokeApiRequestOptions & {
  cache: RequestCache;
  context: string;
};

function getErrorName(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('name' in error)) {
    return undefined;
  }

  return typeof error.name === 'string' ? error.name : undefined;
}

export async function fetchPokeApiJson(endpoint: string, options: FetchPokeApiJsonOptions): Promise<unknown> {
  const { cache, context, fetcher = fetch, timeoutMs = DEFAULT_TIMEOUT_MS } = options;
  let response: Response;

  try {
    response = await fetcher(endpoint, {
      cache,
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    unstable_rethrow(error);

    const errorName = getErrorName(error);

    if (errorName === 'AbortError' || errorName === 'TimeoutError') {
      throw new Error(`PokeAPI request timed out for ${context}: ${endpoint}`);
    }

    throw new Error(`PokeAPI request failed for ${context}: ${endpoint}`, { cause: error });
  }

  if (!response.ok) {
    const status = response.statusText ? `${response.status} ${response.statusText}` : `${response.status}`;
    throw new Error(`PokeAPI request failed for ${context} with status ${status}: ${endpoint}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error(`PokeAPI returned invalid JSON for ${context}: ${endpoint}`, { cause: error });
  }
}
