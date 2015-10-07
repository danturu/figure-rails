module ApplicationHelper
  def embedded_svg(path, options={})
    doc = Nokogiri::HTML::DocumentFragment.parse(File.read(AssetsManifest.find_asset(path)).force_encoding("UTF-8"))
    svg = doc.at_css "svg"

    if options[:class].present?
      svg["class"] = options[:class]
    end

    raw doc
  end
end

