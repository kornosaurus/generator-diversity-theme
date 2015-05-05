var generators = require('yeoman-generator');
var changeCase = require('change-case');
var fs         = require('fs');
var chalk      = require('chalk');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('themename', { type: String, required: false});
  },

  initializing: function() {
    this.files    = this.fs.readJSON(this.sourceRoot() + '/files.json');
    this.newdir   = false;
    if (this.themename) {
      this.appname = this.themename;
      this.newdir  = true;
    }

    this.appname  = changeCase.paramCase(this.appname);
  },

  writing: function() {
    //Let's format the theme name to our needs
    this.name      = changeCase.paramCase(this.appname);
    this.nameTitle = changeCase.titleCase(this.name);
    this.file      = this.name + '.scss';

    //if we need a new directory, set path
    this.projectdir = '';
    if (this.newdir) {
      this.projectdir = this.appname + '/';
    }

    this.fs.copy(
      this.templatePath('base'),
      this.destinationPath(this.projectdir)
    );

    this.files.forEach(function(entry) {
      var destination = entry;
      destination     = destination.replace('style.scss', this.file);
      this.fs.copyTpl(
        this.templatePath('files/' + entry),
        this.destinationPath(this.projectdir + destination), {
          themename: this.name,
          themenameTitle: this.nameTitle,
          stylefile: this.file
        }
      );
    }.bind(this));

  },

  install: function() {
    if (this.newdir) {
      try { process.chdir(this.projectdir); }
      catch (error) { return this.log('Ooops, there has been an error:', error); }
    }

    this.log('\nI\'m just running ' + chalk.bold.yellow('npm install') +
             ' for you, if this fails try running the command yourself.\n');

    this.npmInstall();
  },

  end: function() {
    this.log(chalk.bold.green('\nI\'m all done! Have a great day.'));
  }

});
