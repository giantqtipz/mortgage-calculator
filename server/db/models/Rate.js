const Sequelize = require('sequelize');

const { UUID, UUIDV4, DATEONLY, DECIMAL, STRING } = Sequelize;
const { db } = require('../db');

const Rate = db.define(
  'Rate',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    series: {
      type: STRING,
      allowNull: false,
    },
    date: {
      type: DATEONLY,
      allowNull: false,
    },
    value: {
      type: DECIMAL,
      allowNull: false,
    },
  },
  {
    // Composite unique constraints - date and series must be unique simultaneously
    indexes: [
      {
        unique: true,
        fields: ['date', 'series'],
      },
    ],
  }
);

module.exports = { Rate };
