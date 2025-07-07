export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user.name;
export const selectAvatarUrl = (state) => state.auth.user.avatarUrl;

export const selectRefreshToken = (state) => state.auth.refreshToken;

export const selectAccessToken = (state) => state.auth.token;
export const selectAuthTokens = (state) => ({
  accessToken: state.auth.token,
  refreshToken: state.auth.refreshToken,
  sid: state.auth.sid,
});
