const renderWithHashTags = (comment, parsed = false) => {
  if (!comment) {
    return;
  }

  let value = comment;
  if (!parsed) {
    value = decodeURIComponent(escape(atob(comment)));
  }

  const hashRegex = /\B\#\w\w+\b/g;
  const hashTags = value.match(hashRegex);

  if (hashTags && hashTags.length) {
    hashTags.forEach((item) => {
      value = value.replace(
        item,
        `<a href="/search?searchTerm=${
          encodeURIComponent(item)
        }&searchType=tags">${item}</a>`
      );
    });
  }

  const userRegex = /\B\@\w\w+\b/g;
  const userTags = value.match(userRegex);

  if (userTags && userTags.length) {
    userTags.forEach((item) => {
      value = value.replace(
        item,
        `<a href="/${
          encodeURIComponent(item.replace("@", ""))
        }">${item}</a>`
      );
    });
  }

  return { __html: `<p class="tag-description">${value}</p>` };
};

export default renderWithHashTags;
