import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "something wrong with services",
        EC: 0,
        DT: users,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "error from server",
      EC: 1,
      DT: users,
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: "fetch ok",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with services",
      EC: 1,
      DT: users,
    };
  }
};

const createNewUser = async (data) => {
  try {
    await db.User.create({});
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      user.save({});
    } else {
      //not found user
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.delete({
      where: { id: id },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
