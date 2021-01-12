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
  await db.createTable('departments',{
    id:{type:'int',primaryKey:true,autoIncrement: true},
    name:{type:'string',notNull: true},
    userId:{type:'int',notNull:true},
    userAddedOrder:{type:'int',notNull:true}
  });
  db.addIndex('departments','unique_insert',['userId','userAddedOrder'],true,(err)=>{

  });
  
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
