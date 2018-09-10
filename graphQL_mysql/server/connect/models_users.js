export default (sequelize, dataType) => {

  const schema = {
    id: {
      type: dataType.BIGINT(11),
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: dataType.CHAR(255)
    }
  }

  return sequelize.define('test_table', schema, {
    underscored: true,
    charset: 'utf8',
    timestamps: true,
    paranoid: false
  })

}
