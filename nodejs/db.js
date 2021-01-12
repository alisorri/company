//TODO: 1. add the certeficate thing to the connection.
//2. grep the conf from file.
var mysql = require("mysql");
const fs = require("fs");
let db_options = require("./database");

const state = {
  pool: null
};
let isConncted = false;
let conns = {};
let last_query = 0;
exports.connect = () => {
  db_options.dev.connectionLimit = 3;
  state.pool = mysql.createPool(db_options.dev);

  state.pool.on("connection", connection => {
    // option before connection
    console.log("state.pool.on Connection");
  });

  state.pool.on("error", error => {
    console.log("pool error", error);
    // option before connection
  });

  state.pool.on("acquire", connection => {
    //console.log('Connection %d acquired', connection.threadId);
    conns[connection.threadId] = true;
  });

  state.pool.on("enqueue", () => {
    // console.log('Waiting for available connection slot');
    console.log("Waiting for available connection slot");
  });

  state.pool.on("release", connection => {
    //console.log('Connection %d released', connection.threadId);
    conns[connection.threadId] = false;
  });

  console.log("db connected : ", db_options.dev);
  let isConncted = true;
};

const get = function() {
  return state.pool;
};

exports.disconnect = function() {
  let isConncted = false;
  state.pool.end();
  console.log("db disconnect: ", db_options.dev.database);
};
exports.query =  function(statment,data=null) {
    if(!data){
        return new Promise((resolve, reject) => {
            get().query(statment, (err, result) => {
              if (err) {
                  console.log(err);
                  reject(err);
              }
              resolve(result);
            });
          });
    }else{
        return new Promise((resolve, reject) => {
            console.log("data iss sss",data);
            get().query(statment,data, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
              resolve(result);
            });
          });
    }

};
exports.get =get;
