'use strict';
var Promise = require('promise');
var exec = require('child_process').exec;
var async = require('async');
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
require('colors');
require("xcept");

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

var getFilesCached = function(){
    return new Promise(function(resolve, reject){
        exec('git diff --name-only --cached', function(err, result){
            if (err){
                reject(err);
            }
            else {
                var files = result.split("\n");
                files.pop();
                resolve(files);
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
        fs.lstat(path.join(process.cwd(), ".git"), function(err, exists){
            if (err){
                reject('This is not a git repository. Please make sure this is a git repository before you continue');
            }
            else{
                resolve(exists);
            }
        });
    });
};

var isGitSync = function(){
    return fs.lstatSync(path.join(process.cwd(),".git"))? true: false;
};

var parseBranches = {
    all: function(result){
        var branches = [];
        result = result.split('\n');
        result.pop();
        result.forEach(function(branch){
            branch = branch.substring(2);
            if(branch.indexOf('remotes') > -1){
                branch = branch.replace('remotes/','');
                branch = branch.substring(branch.indexOf('/')+1);
                branches.push(branch);
            }
            else {
                branches.push(branch);
            } 
        });
        return branches;
    },
    local: function(result){
        var branches = [];
        result.split('\n').forEach(function(branch){
            if(branch.indexOf('refs/heads') > -1){
                branches.push(branch.replace('refs/heads','').substring(branch.indexOf('refs/heads')+1));
            }
        });
        return branches;
    } 
};

var getBranches = {
    local: function(){ 
        return new Promise(function(resolve, reject){
            exec('git show-ref', function(err, result){
                if(err){
                    reject(err);
                }
                else {
                    var branches = parseBranches.local(result);
                    resolve(branches);
                }
            });
        });
    },
    all: function(){
        return new Promise(function(resolve, reject){
            exec('git branch -a', function(err, result){
                if(err){
                    reject(err);
                }
                else {
                    var branches = parseBranches.all(result);
                    branches = _.uniq(branches);
                    resolve(branches);
                }
            });
        });
    }
}

var checkout = function(branch){
    return new Promise(function(resolve, reject){
        exec('git checkout ' + branch, function(err, result){
            if(err){
                reject(err);
            }
            else {
                resolve(branch);
            }
        });
    });
};

var newBranch = function(newBranchName){
    return new Promise(function(resolve, reject){
        exec('git checkout -b ' + newBranchName, function(err){
            if(err){
                reject(err);
            }
            else {
                resolve(newBranchName);
            }
        }); 
    });
}; 

var deleteBranch = function(branch){
    return new Promise(function(resolve, reject){
        exec("git branch -d " + branch, function(err){
            if (err){
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};

var deleteBranches = function(branches){
    var obj = {
        success: [],
        failure: []
    };
    return new Promise(function(resolve){
        async.each(branches, function(branch, next){
            deleteBranch(branch).then(function(){
                obj.success.push(branch);
                next();
            }).catch(function(err){
                obj.failure.push(branch);
                next();
            });
        }, function(){
            resolve(obj);
        });
    });
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
    isGitSync: isGitSync,
    getBranches: getBranches,
    newBranch: newBranch,
    checkout: checkout,
    getFilesCached: getFilesCached,
    deleteBranch: deleteBranch,
    deleteBranches: deleteBranches
};
