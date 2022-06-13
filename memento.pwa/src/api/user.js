class User {
  db = null;

  constructor(db) {
    this.db = db;
  }

  get = async (id) => {
    if (id) {
      return await this.db.users.get({ id });
    }
    return undefined;
  };

  getByObj = async (obj) => {
    return new Promise((resolve) => {
      this.db.users.get(obj, (item) => {
        resolve(item);
      });
    });
  };

  create = async (data) => {
    let hasError = false;
    try {
      await this.db.users.add(data);
    } catch (e) {
      hasError = true;
      console.error(e);
    } finally {
      if (hasError) {
        return null;
      }
      return this.get(data.id);
    }
  };

  update = async (id, data) => {
    let hasError = false;
    try {
      await this.db.users.update(id, data);
    } catch (e) {
      hasError = true;
      console.error(e);
    } finally {
      if (hasError) {
        return null;
      }
      return this.get(data.id);
    }
  };

  delete = async (id) => {
    return await this.db.users.get({ id }).delete();
  };
}

export default User;
