"use strict";
var Promise = require('promise');
var exec = require("child_process").exec;

module.exports = function(){
    return new Promise(function(resolve, reject){
        exec("git reset --soft HEAD^", function(err){
            if(err){
                reject(err);
            } 
            else {
                resolve();
            }
        });
    });
};
