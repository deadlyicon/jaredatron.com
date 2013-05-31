class Wiki::Page::Tree

  def initialize pages=Wiki::Page.all
    @pages = pages
    @root = Node.new
    build
  end

  attr_reader :root

  private

  def build

    @pages.each do |page|
      parts = page.path.split('/')

      parent = parts.inject(root) do |parent, name|
        parent[name] ||= Node.new(name, parent)
      end
      parent.page = page
    end
  end

  class Node < Hash

    def initialize(name=nil, parent=nil)
      @name = name
      @parent = parent
    end

    attr_reader :name, :parent
    attr_accessor :page

    def path
      parent && parent.path ? "#{parent.path}/#{name}" : name
    end

    def exists?
      !page.nil?
    end

  end

end
