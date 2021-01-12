//TODO: 1. add the certeficate thing to the connection.
//2. grep the conf from file.
var mysql = require('mysql');
const fs = require('fs');
let db_options = require('./database');

exports.DbConnection = function () {
	let _this=this;
    const state = {
        pool: null,
    };
    this.isConncted=false;
	this.conns={};
	this.last_query=0;
    this.connect =  () => {
        db_options.dev.connectionLimit = 3;
        state.pool = mysql.createPool(
            db_options.dev
        );

        state.pool.on('connection', (connection) => {

            // option before connection
            console.log('state.pool.on Connection');
        });

        state.pool.on('error', (error) => {
            console.log('pool error', error);
            // option before connection
        });

        state.pool.on('acquire', (connection) => {
            //console.log('Connection %d acquired', connection.threadId);
			_this.conns[connection.threadId] = true;
        });

        state.pool.on('enqueue', () => {
            // console.log('Waiting for available connection slot');
            console.log('Waiting for available connection slot');
        });

        state.pool.on('release', (connection) => {
            //console.log('Connection %d released', connection.threadId);
			_this.conns[connection.threadId] = false;
        });

        console.log('db connected : ', db_options.dev);
		this.isConncted=true;
    };

    this.get = function () {
        return state.pool;
    };
		
	this.disconnect= function(){
		this.isConncted=false;
		state.pool.end();
		console.log("db disconnect: ",db_options.dev.database);
	};
	





}

