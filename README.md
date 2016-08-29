# MxGulp - Automate Mendix styling using Sass & Gulp
Gulp script to automate styling when using Sass (http://sass-lang.com). Compiles the SASS theme into CSS and updates the adjustments in the browser using Browsersync (https://www.browsersync.io/).

## How to install:  
  
1) Install Node.js (https://nodejs.org/en/)  
2) Unzip the MxGulp folder to your Mendix projects folder, for example C:\Mendix Projects\MxGulp  
3) Open your command prompt and navigate to the MxGulp folder  
4) Run ```npm install --global gulp-cli``` (installs Gulp globally, see https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)  
5) Run ```npm install``` (installs all other dependencies)  
  
## How to run:  
1) Run ```gulp -d "(project directory)" -p (project port)```  
      Example: ```gulp -d "Example project-main" -p 8080```
