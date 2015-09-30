module ApplicationHelper
  def embedded_svg(filename, options={})
    doc = Nokogiri::HTML::DocumentFragment.parse(Rails.application.assets.find_asset(filename).to_s.force_encoding("UTF-8"))
    svg = doc.at_css "svg"

    if options[:class].present?
      svg["class"] = options[:class]
    end

    raw doc
  end
end

