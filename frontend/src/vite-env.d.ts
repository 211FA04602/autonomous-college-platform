/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL including the version segment, e.g. http://localhost:8080/v1 */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
