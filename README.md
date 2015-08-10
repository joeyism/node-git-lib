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
* [`getFilesCached`](#showfilescached)
* [`getBranches`](#getbranches)
* [`newBranch`](#newbranch)
* [`checkout`](#checkout)


### haveFilesToCommit
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

### add
Attempts to *git add* a file

    git.add("example.file").then(function(){
        /** successfully added **/
    }).catch(function(err){
        /** unsuccessful **/
    });
    
### getCurrentBranch
Gets the name of the directory's current branch

    git.getCurrentBranch().then(function(branchname){
        /** branchname has the name of current branch **/
    }).catch(function(err){
        /** throws an error **/
    });
    
### showFilesAdded
Show files that has already been added

    git.showFilesAdded().then(function(filesAdded){
        /** filesAdded shows, in a string, a list of files added **/
    }).catch(function(err){
        /** throws an error**/
    });
    
### showFilesModified
Show files in current directory that has been modified (and probably needs to be commited)

    git.showFilesModified().then(function(modifiedFiles){
        /** modifiedFiles is an array of files that has been modified **/
    }).catch(function(err){
        /** throws an error **/
    });
    
### commit
Commits with a string of message and a string of options

    git.commmit("message to commit", "--force").then(function(){
        /** commit successful **/
    }).catch(function(err){
        /** throws an error **/
    });
    
### revert
Takes an array of files, or a string of only one file, and reverts them

    git.revert(["file1","file2"]).then(function(){
        /** successfully reverted **/
    }).catch(function(err){
        /** throws an error **/
    });

### isGit
Determines if current directory has git initialized

    git.isGit().then(function(){
        /** has git initialized **/
    }).catch(function(err){
        /** doesn't have git initialized, and err displays that **/
    });

### isGitSync
A synchronous version of [`isGit`](#isgit), so it can be used in an *if* statement

    if (git.isGitSync()){
        /** has git initialized **/
    }
    else {
        /** doesn't have git initialized **/
    }

### getFilesCached
Show files that are cached, which are also files that are added

    git.getFilesCached().then(function(files){
        /** files is an array list of files that has been added **/
    }).catch(function(err){
        /** throws an error **/
    });

### getBranches
**Local**

Returns all local branches for the current git repository

    git.getBranches.local().then(function(branches){
        /** branches is an array of local branches **/  
    }).catch(function(error){
        /** throws an error **/
    });

**all**

Returns all branches, including remote, for the current git repository

    git.getBranches.all().then(function(branches){
        /** branches is an array of all branches **/  
    }).catch(function(error){
        /** throws an error **/
    });

### checkout
Changes into branch *thisBranch*, where *thisBranch* is passed into the function

    git.checkout("thisBranch").then(function(){
        /** successfully checked out into branch *thisBranch* **/
    }).catch(function(err){
        /** throws an error **/
    });

### newBranch
Creates new branch *newBranch*, where *newBranch* is passed into the function

    git.newBranch("newBranch").then(function(){
        /** new branch *newBranch* was successfully created **/
    }).catch(function(err){
        /** throws an error **/
    });

## Versions
**1.3.1**
* changed showFilesCached to getFilesCached

**1.3.0**
* Added showFilesCached

**1.2.3**
* fixed both isGit

**1.2.2**
* Added error output with isGit

**1.2.1**
* Fixed README bugs

**1.2.0**
* Updated with isGit and isGitSync

**1.1.0**
* Added README
* Added showFilesAdded

**1.0.0**
* First publish
