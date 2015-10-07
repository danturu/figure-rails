module AssetsManifest
  extend self

  def asset_path(path)
    File.join "/assets", digest_for(path)
  end

  def find_asset(path)
    Rails.root.join "public/assets", digest_for(path)
  end

  def digest_for(path)
    manifest[path] || path
  end

protected

  def manifest
    if File.exists? manifest_path
      @manifest ||= JSON.parse(File.read(manifest_path))
    else
      @manifest ||= {}
    end
  end

  def manifest_path
    @manifest_path ||= Rails.root.join("public/assets/rev-manifest.json")
  end
end
