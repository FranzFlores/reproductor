module.exports = (sequelize, type) => {
  return sequelize.define('artist', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: type.STRING, allowNull: false },
    description: { type: type.STRING, allowNull: false },
    image: { type: type.STRING, allowNull: false },
    status: { type: type.BOOLEAN, defaultValue: true },
    external_id: { type: type.STRING, defaultValue: type.UUIDV4 }
  }, {
    createdAt: 'date_create',
    updatedAt: 'date_update'
  });
}
