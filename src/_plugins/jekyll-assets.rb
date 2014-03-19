require "jekyll-assets"
require "yui/compressor"
require "sprockets/sass"
require "sprockets/sass/functions"
require "sass"

module Sprockets
  class SassCompressor
    def evaluate(context, locals, &block)
      
      engine = ::Sass::Engine.new(data, {
        :syntax => :scss,
        :style => :expanded,
        :cache => :false,
        :sourcemap => true
      }).render 

      #engine.render_with_sourcemap('sourcemap_url')

    end

  end
end

class Jekyll::AssetsPlugin::Renderer
  remove_const :STYLESHEET
  remove_const :JAVASCRIPT
  STYLESHEET = '<link rel="stylesheet" href="%s" />'
  JAVASCRIPT = '<script src="%s"></script>'
end