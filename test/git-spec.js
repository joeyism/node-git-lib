'use strict';
var mockery = require('mockery');
var expect = require('chai').expect;
var git;

var fakeChild = function(error, result){
    return {
        exec: function(cmd, callback){
            callback(error, result);
        }
    };
};

describe('git', function(){

    describe('add', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully add given files', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'doesnt matter'));
            git = require('../git');
            git.add('fake.file').then(function(result){
                expect(result).to.be.undefined;
                done();
            });
        });

        it('should throw an error if exec throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../git');
            git.add('fake.file').catch(function(err){
                expect(err).to.equal('error');
                done();
            });
        });
    });

    describe('commit', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully commit given files', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'doesnt matter'));
            git = require('../git');
            git.commit('message').then(function(result){
                expect(result).to.be.undefined;
                done();
            });
        });

        it('should throw an error if exec throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../git');
            git.commit('message').catch(function(err){
                expect(err).to.equal('error');
                done();
            });
        });
    });

    describe('getCurrentBranch', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully return the current branch the user is on', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'develop\n'));
            git = require('../git');
            git.getCurrentBranch().then(function(currentBranch){
                expect(currentBranch).to.equal('develop');
                done();
            });       
        });

        it('should throw an error when getting current branch throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','whatever'));
            git = require('../git');
            git.getCurrentBranch().catch(function(error){
                expect(error).to.equal('error');
                done();
            });       
        });
    });

    describe('haveFilesToCommit', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully return success since there are files to commit', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'there are files to commmit\n'));
            git = require('../git');
            git.haveFilesToCommit().then(function(){
                done();
            });       
        });

        it('should throw an error when there are no files to commit', function(done){
            mockery.registerMock('child_process', fakeChild(null,'blahblahblah\nnothing to commit\n'));
            git = require('../git');
            git.haveFilesToCommit().catch(function(error){
                expect(error).to.equal('There are no files to commit');
                done();
            });       
        });

        it('should throw an error when getting current branch throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','whatever'));
            git = require('../git');
            git.haveFilesToCommit().catch(function(error){
                expect(error).to.equal('error');
                done();
            });       
        });
    });

    describe('showFilesModified', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should correctly display files added', function(done){
            var result ='file1\nfile2\n' ;
            mockery.registerMock('child_process', fakeChild(null, result));
            git = require('../git');
            git.showFilesModified().then(function(result){
                expect(result).to.deep.equal(['file1','file2']);
                done();
            });             
        });

        it('should catch an error', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../git');
            git.showFilesModified().catch(function(result){
                expect(result).to.equal('error');
                done();
            });             
        });
    });

    describe("revert", function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it("should successfully revert files", function(done){
            var files = ["file1", "file2"];
            mockery.registerMock("child_process", fakeChild(null, null));
            git = require("../git");
            git.revert(files).then(function(result){
                expect(result).to.be.undefined;
                done();
            });
        });

        it("should successfully revert file", function(done){
            var files = "file1";
            mockery.registerMock("child_process", fakeChild(null, null));
            git = require("../git");
            git.revert(files).then(function(result){
                expect(result).to.be.undefined;
                done();
            });
        });

        it("should throw a catchable error", function(done){
            var files = ["file1", "file2"];
            mockery.registerMock("child_process", fakeChild("error", null));
            git = require("../git");
            git.revert(files).catch(function(result){
                expect(result).to.equal("error");
                done();
            });
        });
    });

    describe('showFilesAdded', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should correctly display files added', function(done){
            var result ='On branch master\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n\tmodified:   README.md\n\n' ;
            mockery.registerMock('child_process', fakeChild(null, result));
            git = require('../git');
            git.showFilesAdded().then(function(result){
                expect(result).to.equal('\tmodified:   README.md');
                done();
            });             
        });

        it('should throw an error successfully', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../git');
            git.showFilesAdded().catch(function(result){
                expect(result).to.equal('error');
                done();
            });             
        });
    });

    describe("isGit", function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it("should find that this is a git repository", function(done){
            git = require("../git");
            git.isGit().then(function(result){
                expect(result).to.not.be.undefined;
                done();
            });
        });
    });

    describe("isGitSync", function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it("should find that this is a git repository", function(done){
            git = require("../git");
            expect(git.isGitSync()).to.be.true;
            done();
        });
    });

    describe("getFilesCached", function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should correctly display files cached', function(done){
            var result ='file1\nfile2\n' ;
            mockery.registerMock('child_process', fakeChild(null, result));
            git = require('../git');
            git.getFilesCached().then(function(result){
                expect(result).to.deep.equal(['file1','file2']);
                done();
            });             
        });

        it('should throw an error', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../git');
            git.getFilesCached().catch(function(result){
                expect(result).to.equal('error');
                done();
            });             
        });
    });

    describe('getBranches', function(){

        describe('local', function(){

            beforeEach(function(done){
                mockery.enable({
                    warnOnReplace: false,
                    warnOnUnregistered: false,
                    useCleanCache: true
                });
                done();
            });

            afterEach(function(done){
                mockery.resetCache();
                mockery.deregisterAll();
                done();
            });

            it('should successfully return local branch information', function(done){
                mockery.registerMock('child_process',fakeChild(null ,'123 refs/heads/branch1\n 123 refs/heads/feature/branch2\n'));
                git = require('../git');
                git.getBranches.local().then(function(branches){
                    expect(branches).to.deep.equal(['branch1','feature/branch2']);
                    done();
                });
            });

            it('should successfully throw an error when there is no branch information', function(done){
                mockery.registerMock('child_process', fakeChild('no branches', 'doesnt mamtter'));
                git = require('../git');
                git.getBranches.local().then(function(result){
                    expect(result).to.be.undefined;
                }).catch(function(error){
                    expect(error).to.equal('no branches');
                    done();
                });
            });
        });

        describe('all', function(){

            beforeEach(function(done){
                mockery.enable({
                    warnOnReplace: false,
                    warnOnUnregistered: false,
                    useCleanCache: true
                });
                done();
            });

            afterEach(function(done){
                mockery.resetCache();
                mockery.deregisterAll();
                done();
            });

            it('should successfully return all branch information', function(done){
                mockery.registerMock('child_process',fakeChild(null ,'* master\n  develop\n  remotes/origin/master\n  remotes/origin/develop\n  remotes/origin/feature/branch1\n'));
                git = require('../git');
                git.getBranches.all().then(function(branches){
                    expect(branches).to.deep.equal(['master','develop','feature/branch1']);
                    done();
                });
            });

            it('should successfully throw an error when there is no branch information', function(done){
                mockery.registerMock('child_process', fakeChild('no branches', 'doesnt mamtter'));
                git = require('../git');
                git.getBranches.all().then(function(result){
                    expect(result).to.be.undefined;
                }).catch(function(error){
                    expect(error).to.equal('no branches');
                    done();
                });
            });
        });

    });
    describe('checkout', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should return the branch name if checkout is successful', function(done){
            mockery.registerMock('child_process', fakeChild(null,'success'));
            git = require('../git');
            git.checkout('branch name').then(function(result){
                expect(result).to.equal('branch name');
                done();
            });
        });

        it('should return an error if checkout throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','doesnt matter'));
            git = require('../git');
            git.checkout().catch(function(error){
                expect(error).to.equal('error');
                done();
            });
        });

    });

    describe('newBranch', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully return the current branch the user is on', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'switched to new branch\n'));
            git = require('../git');
            git.newBranch('branchname').then(function(result){
                expect(result).to.equal('branchname');
                done();
            });       
        });

        it('should throw an error when getting current branch throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','whatever'));
            git = require('../git');
            git.newBranch().catch(function(error){
                expect(error).to.equal('error');
                done();
            });       
        });
    });

    describe('deleteBranch', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully delete a branch and returns', function(done){
            mockery.registerMock('child_process', fakeChild(null, ''));
            git = require('../git');
            git.deleteBranch().then(function(result){
                expect(result).to.be.undefined;
                done();
            });       
        });

        it('should throw an error if deletion was unsuccessful', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../git');
            git.deleteBranch().catch(function(error){
                expect(error).to.equal('error');
                done();
            });       
        });
    });
});
