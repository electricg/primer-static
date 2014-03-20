Primerstatic
===

Primerstatic is a base configuration for JekyllRB and GruntJS for an efficient-n-fast 
workflow for the modern development of static sites.
***

Requirements
---

- **Ruby 1.9.x**. *You can check the version intalled by typing `ruby -v` into your terminal*
- **NodeJS 0.10.25** (or higher) 


Setup
---
Clone this repository in a local folder, then:


1. Install NPM (Node Package Manager) and Grunt CLI
    <pre>
curl https://npmjs.org/install.sh | sudo sh
npm update npm -g
sudo npm install -g grunt-cli
</pre>


2. Install all the Node modules listed into `package.json`
    <pre>npm install</pre>


3. Install all the Ruby gems required to Jekyll (listed into `Gemfile`)

    <pre>bundle install</pre>
&mdash; or &mdash;

    <pre>sudo gem install jekyll jekyll-assets jekyll-contentblocks sass sprockets sprockets-sass yui-compressor</pre>
***

Configuration
---

Once the setup has completed and this repository is cloned locally, go on with the following steps:

- remove ``.git`` folder and ``.gitignore`` file;

- if you need to use your own Git repository for the project then rename ``.gitignore.dist`` into `.gitignore` 

- open ``_config.yml`` and change the information under *Project owner / contributor* and *Language & Copyright Note* sections with the project information; 

- if you want to take benefit of the *livereload* feature then change the livereload value under *Site Libraries* section, Otherwise just remove the whole line. In the same section you may change, add or remove as many references to js libraries as you prefer;
***


Workflow
---

- Place your HTML templates into the ``/src`` folder;

- partials must be saved under ``/src/_includes/`` folder, layouts must be saved under ``/src/_layouts/``;

- place all the javascript files under ``_assets/javascript/js`` and all the SASS file under ``_assets/stylesheets/css``. (the content of ``_assets`` folder is managed by *jekyll-assets*);

- if *livereload* is properly configured, the grunt watch is running, and your client is connected to the page through a LAN IP, all the changes done are automatically available without the need to manually refresh the page. This is really time-saving especially during multidevice testing. 

    Livereload is enabled by default only on **development** environment and not on ``IE<10``;

- If you have the need to check how your website works with a slow connection. In the ``/utils`` folder try to run ``./slowconn.sh`` (follow the simple instructions);

***


Development
---

Open the terminal and type

<pre>grunt watch</pre>

This task will only listen to any changes that occur into your `/src` folder and this will cause Jekyll to immediately recompile all the pages into the `/dev` folder. 

The *jekyll-assets* rubygem provides automatic SASS compilation and minification of the assets on the optimized version of the website.

**When a new file is created in the source directory, stop and re-launch this task and then just apply a change to force a Jekyll recompilation.**
***

When you also want to perform some further checks , you may just type only

<pre>grunt dev</pre>

This task cause Jekyll to immediately recompile all the pages into the `/dev` folder as in the previous task, but some other GruntJS tasks will be executed: 

- *grunt-jslint* checks the quality of the javascript code (the libraries under ``_assets/javascript/js/vendors`` folder won't be checked);

- *grunt-html-validation* assures that every template has no validation errors (a report with the validation result will be generated in the destination folder).
***

When your code is ready for a stage deployment, the task to call is 

<pre>grunt prod</pre>

and the optimized website will be compiled under the `/prod` folder.

GruntJS will execute all the tasks previously described  plus the following others: 

- *grunt-smushit* task will shrink the size of your `.png` and `.jpg` images inside `/prod` folder (the images into `/src` won't be changed);

- spaces and indentation are normalized by *grunt-prettify*;  

- two compressed archives of `/src` and `/prod` will be automatically created inside the `/backup` folder by *grunt-contrib-compress*;

- *grunt-rsync*, when properly configured, will try to copy the generated site to a staging server by a remote synchronization.

***


Known issues
---

Note: `jekyll` may raise a warning 

<pre>Error encountered while saving cache ./.sass-cache/...</pre>

when the static site is built with `jekyll-assets` and `sass > 3.2.9`.  
If this happens you need to find a file `engine.rb` located under your `<gems-folder>/sass-3.3.x/lib/sass/`, changing 

<pre>:cache => true</pre>

into

<pre>:cache => false</pre>
