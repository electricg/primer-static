module Jekyll
  class TemplateListing < Liquid::Block

    def initialize(tag_name, markup, tokens)
      attributes = {}

      # Parse parameters
      markup.scan(Liquid::TagAttributes) do |key, value|
        attributes[key] = value
      end

      @path = attributes['path'] || ''
      super
    end

    def render(context)

      @source = context.registers[:site].source

      templatelist = []
      templates = Dir["#{@source}/#{@path}/*.html"]
      length = templates.length

      context.stack do
        templates.each_with_index do |template, index|

          name = File.basename(template)

          if name == "index.html"
            next
          end

          prfx = File.dirname(template).sub("#{@source}", "").gsub(/\/([^\/]+)/, "\\1-")
          tplpath = [@path, name] - ['.']
          path = tplpath.join '/'
          url =  tplpath.join('/')
          date = File.ctime(template).strftime("%d %b %Y - %H:%M")


          context['tpl'] = {
            'name' => name,
            'url'  => url,
            'path' => path,
            'date' => date,
            'screenshot' => "/screenshots/#{prfx}#{name}.jpg"
          }


          context['forloop'] = {
            'name' => 'directory',
            'length' => length,
            'index' => index + 1,
            'index0' => index,
            'rindex' => length - index,
            'rindex0' => length - index - 1,
            'first' => (index == 0),
            'last' => (index == length - 1)
          }

          templatelist << render_all(@nodelist, context)
        end
      end
      templatelist
    end

  end
end
Liquid::Template.register_tag('templatelist', Jekyll::TemplateListing)