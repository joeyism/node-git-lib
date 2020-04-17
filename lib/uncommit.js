"use strict";
var Promise = require('promise');
var execFile = require("child_process").execFile;

module.exports = function(){
    return new Promise(function(resolve, reject){
        var head = (process.platform === 'win32') ? "^HEAD" : "HEAD^"
        execFile('git', ['reset', '--soft', head], function(err){
            if(err){
                reject(err);
            } 
            else {
                resolve();
            }
        });
    });
};
