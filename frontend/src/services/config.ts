// Base URL for the backend service
export const BACKEND_URL = "http://localhost:3000";

// Construct specific endpoint URLs based on the base URL
export const STATUS_URL = `${BACKEND_URL}/status`;
export const AUTH_URL = `${BACKEND_URL}/auth/`;
export const LOGOUT_URL = `${STATUS_URL}/logout`;
export const MOVIES_URL = `${BACKEND_URL}/movies`;
export const MOVIES_BUDGET_URL = `${MOVIES_URL}/average-budget-per-year`;
export const MOVIES_RELEASE_URL = `${MOVIES_URL}/releases-per-year`;