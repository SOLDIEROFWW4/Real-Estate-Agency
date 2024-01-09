const sequelize = require('.');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Property = sequelize.define('Property', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    isSold: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
});

const PropertyType = sequelize.define('PropertyType', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false}
});

const Review = sequelize.define('Review', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isPositive: {type: DataTypes.BOOLEAN, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
});

const Image = sequelize.define('Image', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: {type: DataTypes.BLOB('long'), allowNull: false}
});

const Admin = sequelize.define('Admin', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Contact = sequelize.define('Contact', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.STRING, allowNull: false}
});

const ContactType = sequelize.define('ContactType', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
});

const Deal = sequelize.define('Deal', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isClosed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isSold: { type: DataTypes.BOOLEAN, allowNull: false}
});

Property.hasOne(PropertyType);
PropertyType.belongsTo(Property);

Property.belongsToMany(User, { through: Deal });
User.belongsToMany(Property, { through: Deal });

Review.hasOne(User);
User.belongsTo(Review);

Image.hasOne(Property);
Property.belongsTo(Image);

Contact.hasOne(ContactType);
ContactType.belongsTo(Contact);

module.exports = {
    User,
    Property,
    PropertyType,
    Deal,
    Contact,
    Image,
    Review,
    ContactType,
    Admin
};