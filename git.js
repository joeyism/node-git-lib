'use strict';
var Promise = require('promise');
var exec = require('child_process').exec;
var async = require('async');
var fs = require("fs");
var path = require("path");
require('colors');

var add = function(files){
    return new Promise(function(resolve, reject){
        exec('git add ' + files, function(err){
            if (err){
                reject(err);
            }
            else {
                resolve();
            }
        }); 
    });
};

var commit = function(message, options){
    options = options || "";
    return new Promise(function(resolve, reject){
        exec('git commit ' + options + ' -m \"' + message + '\"', function(err){
            if(err){
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};

var getCurrentBranch = function(){
    return new Promise(function(resolve, reject){
        exec('git rev-parse --abbrev-ref HEAD', function(err, result){
            if(err){
                reject(err);
            }
            else {
                resolve(result.split("\n").join(""));
            }
        }); 
    });
};

var showFilesAdded = function(){
    return new Promise(function(resolve, reject){
        exec('git status', function(err, result){
            if(err){
                reject(err);
            }
            else {
                var filesAdded = [];
                result = result.split("\n");
                result.forEach(function(line){
                    if(line.indexOf('\t') > -1){
                        filesAdded.push(line);
                    }
                });
                resolve(filesAdded.join("\n"));
            }
        });
    });
}; 

var haveFilesToCommit = function(){
    return new Promise(function(resolve, reject){ 
        exec('git status', function(err, result){
            if (err){
                reject(err);
            }
            else {
                result = result.split("\n")
                result.pop();
                if (result.pop().indexOf('nothing to commit') > -1){
                    reject('There are no files to commit');
                }
                else {
                    resolve();
                }
            }
        });
    });
};

var showFilesModified = function(){
    return new Promise(function(resolve, reject){
        exec('git diff --name-only', function(err, result){
            if(err){
                reject(err);
            }
            else {
                var filesAdded = [];
                result = result.split("\n");
                result.pop();
                resolve(result);
            }
        });
    });
}; 

var revert = function(files){
    files = Array.isArray(files) ? files : [files];
    return new Promise(function(resolve, reject){
        async.each(files, function(file, next){
            exec('git checkout -- ' + file, function(err){
                if (err){
                    next(err);
                }
                else {
                    next();
                }
            });
        }, function(err){
            if(err){
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};

var isGit = function(){
    return new Promise(function(resolve, reject){
        fs.exists(path.join(__dirname, ".git"), function(exists){
            if (exists){
                resolve();
            }
            else{
                reject('This is not a git repository. Please make sure this is a git repository before you continue');
            }
        });
    });
};

var isGitSync = function(){
    return fs.existsSync(path.join(__dirname,".git"));
};

module.exports = {
    haveFilesToCommit: haveFilesToCommit,
    add: add,
    getCurrentBranch: getCurrentBranch,
    showFilesAdded: showFilesAdded,
    showFilesModified: showFilesModified,
    commit: commit,
    revert: revert,
    isGit: isGit,
    isGitSync: isGitSync
};
