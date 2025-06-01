export const handleUnauthorized = (error: Error & { status?: number }) => {
  if (error?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  throw error;
};
