'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {

  const Location = sequelize.define('location', {
    name: Sequelize.STRING,
  })

  return Location
}

const Model = model()
export default Model