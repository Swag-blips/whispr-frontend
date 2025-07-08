export const getAvatar = (
  avatar?: string | undefined,

  type?: "private" | "group",
  otherUsers?: any,
  senderId?: string
) => {
  if (type === "group") {
    const user = otherUsers.find((user: any) => user._id === senderId);
    return user.avatar
      ? user.avatar
      : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg";
  }
  return avatar
    ? avatar
    : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg";
};
