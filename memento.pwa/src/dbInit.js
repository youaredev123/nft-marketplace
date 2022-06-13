import Dexie from "dexie";

const db = new Dexie("memento");

db.version(1).stores({
  users: "id, username, email, bio, profilePicture, followerCount, postIds",
  posts: "id, userId, likes, images",
  comments: "id, username, postId, text",
});
db.version(2)
  .stores({
    users:
      "id, username, bio, profilePic, followersCount, followingCount, postIds",
    posts: "id, userId, likes, images",
    comments: "id, username, postId, text",
  })
  .upgrade((tx) => {
    return tx
      .table("users")
      .toCollection()
      .modify((user) => {
        delete user.email;
        delete user.followerCount;
        user.profilePic = user.profilePicture;
        delete user.profilePicture;
      });
  });

db.version(3).stores({
  users:
    "id, username, bio, profilePic, followersCount, bannerPic, followingCount, postIds",
  posts: "id, userId, likes, images",
  comments: "id, username, postId, text",
});

db.version(4).stores({
  users:
    "id, username, bio, profilePic, followersCount, bannerPic, followingCount, postIds",
  posts: "id, userId, likes, images, timestamp",
  comments: "id, username, postId, text",
});

db.version(4).stores({
  users:
    "id, username, bio, profilePic, followersCount, bannerPic, followingCount, postIds",
  posts: "id, userId, likes, images, timestamp, comment",
  comments: "id, username, postId, text",
});

db.version(5)
  .stores({
    users:
      "id, username, bio, profilePic, followersCount, bannerPic, followingCount, postIds",
    posts: "id, username, likes, images, timestamp, comment",
    comments: "id, username, postId, text",
  })
  .upgrade((tx) => {
    return tx
      .table("posts")
      .toCollection()
      .modify((post) => {
        delete post.userId;
      });
  });

db.version(6).stores({
  users:
    "&id, &username, bio, profilePic, followersCount, bannerPic, followingCount, postIds",
  posts: "&id, username, likes, images, timestamp, comment",
  comments: "&id, username, postId, text",
  notifications: "&id",
});

db.version(7).stores({
  users:
    "&id, &username, bio, profilePic, followersCount, bannerPic, followingCount, postIds",
  posts: "&id, username, likes, totalFavourites, images, timestamp, comment",
  comments: "&id, username, postId, text",
  notifications: "&id",
});

export default db;
