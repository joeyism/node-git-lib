# git-lib
A library that contains different methods to be consumed by a node module

## Install
To install, simply run

    > npm install --save git-lib

## Use
To use, require it by
    
    var git = require("git-lib");

## Methods
* [`haveFilesToCommit`](#havefilestocommit)
* [`add`](#add)
* [`getCurrentBranch`](#getcurrentbranch)
* [`showFilesAdded`](#showfilesadded)
* [`showFilesModified`](#showfilesmodified)
* [`commit`](#commit)
* [`revert`](#revert)
* [`isGit`](#isgit)
* [`isGitSync`](#isgitsync)

##### haveFilesToCommit
Resolves if current directory has files to commit, throws if it doesn't
    
    git.haveFilesToCommit().then(function(){
        /** there are files to commit **/
    }).catch(function(err){
        if (err === "There are no files to commit"){
            /** there are no files to commit **/
        }
        else {
            /** some error has occured **/
        }
    });

##### add
Attempts to *git add* a file

    git.add("example.file").then(function(){
        /** successfully added **/
    }).catch(function(err){
        /** unsuccessful **/
    });
    
##### getCurrentBranch
Gets the name of the directory's current branch

    git.getCurrentBranch().then(function(branchname){
        /** branchname has the name of current branch **/
    }).catch(function(err){
        /** throws an error **/
    });
    
##### showFilesAdded
Show files that has already been added

    git.showFilesAdded().then(function(filesAdded){
        /** filesAdded shows, in a string, a list of files added **/
    }).catch(function(err){
        /** throws an error**/
    });
    
##### showFilesModified
Show files in current directory that has been modified (and probably needs to be commited)

    git.showFilesModified().then(function(modifiedFiles){
        /** modifiedFiles is an array of files that has been modified **/
    }).catch(function(err){
        /** throws an error **/
    });
    
##### commit
Commits with a string of message and a string of options

    git.commmit("message to commit", "--force").then(function(){
        /** commit successful **/
    }).catch(function(err){
        /** throws an error **/
    });
    
##### revert
Takes an array of files, or a string of only one file, and reverts them

    git.revert(["file1","file2"]).then(function(){
        /** successfully reverted **/
    }).catch(function(err){
        /** throws an error **/
    });

##### isGit
Determines if current directory has git initialized

    git.isGit().then(function(){
        /** has git initialized **/
    }).catch(function(){
        /** doesn't have git initialized **/
    });

##### isGitSync
A synchronous version of [`isGit`](#isgit), so it can be used in an *if* statement

    if (git.isGitSync()){
        /** has git initialized **/
    }
    else {
        /** doesn't have git initialized **/
    }
    
## Versions
**1.2.0**
* Updated with isGit and isGitSync

**1.1.0**
* Added README
* Added showFilesAdded

**1.0.0**
* First publish
