"use strict";
var Promise = require('promise');
var exec = require("child_process").exec;

module.exports = function(){
    return new Promise(function(resolve, reject){
        var head = (process.platform === 'win32') ? "^HEAD" : "HEAD^"
        exec("git reset --soft " + head, function(err){
            if(err){
                reject(err);
            } 
            else {
                resolve();
            }
        });
    });
};
