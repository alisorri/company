'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable('employees',{
    id:{type:'int',primaryKey:true,autoIncrement: true},
    firstName:{type:'string',notNull: true},
    lastName:{type:'string',notNull: true},
    age:'int',
    managerId:'int',
    isManager:'boolean',
    departmentId:{type:'int'},
    userId:{type:'int',notNull:true},
    userAddedOrder:{type:'int',notNull:true}
  });
  db.addIndex('employees','unique_insert',['userId','userAddedOrder'],true,(err)=>{

  });
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
