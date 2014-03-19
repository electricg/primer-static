Primerstatic
===

Primerstatic is a base configuration for JekyllRB and GruntJS for an efficient-n-fast 
workflow for the modern development of static sites.
***

Requirements
---

- **Ruby 1.9.x**. *You can check the version intalled by typing `ruby -v` into your terminal*
- **NodeJS 0.10.x** (or higher) 


Setup
---
Clone this repository in a local folder, then:


1. Install NPM (Node Package Manager) and Grunt CLI
    <pre>
curl https://npmjs.org/install.sh | sudo sh
npm update npm -g
sudo npm install -g grunt-cli
</pre>


2. Install all the Node modules listed on `package.json`
    <pre>npm install</pre>


3. Install all the Ruby gems required to Jekyll (listed into `Gemfile`

    <pre>bundle install</pre>
&mdash; or &mdash;

    <pre>sudo gem install jekyll jekyll-assets jekyll-contentblocks sass sprockets sprockets-sass yui-compressor</pre>


Development
---

Open the terminal and type

<pre>grunt watch</pre>

This task will listen to any changes that occur into your `/src` folder and   this will cause Jekyll to immediately recompile all the pages into the `/dev` folder.
***

When you also want to perform some further checks, you may just type only

<pre>grunt</pre>

This task cause Jekyll to immediately recompile all the pages into the `/dev` folder as in the prvious task, but some other GruntJS tasks will be executed: A jslinter will check the javascript code, another task will assure that every template has no validation errors and the *smushit* task will shrink the size of your images inside  `/src` folder (the images into `/src` won't be changed).
***

When your code is ready for a stage deployment, the task to call is 

<pre>grunt deploy</pre>

With this task the optimized website will be compiled into `/prod` folder
but GruntJS will execute further tasks, like space/indent normalization, an automatic compressed archive of `/src` and `/prod` inside the `/backup` folder and if properly configured will try to copy the generated site by remote synchronization (*rsync*)



Note: `jekyll` may raise a warning 

<pre>Error encountered while saving cache ./.sass-cache/...</pre>

when the static site is built with `jekyll-assets` and `sass > 3.2.9`.  
If this happens you need to find a file `engine.rb` located under your `<gems-folder>/sass-3.3.x/lib/sass/`, changing 

<pre>:cache => true</pre>

into

<pre>:cache => false</pre>
