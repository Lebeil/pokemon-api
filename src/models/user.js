module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                message: 'Le nom est déjà pris!'
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })
}