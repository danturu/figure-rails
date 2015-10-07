module ActionView
  module Helpers
    def compute_asset_path(source, options={})
      AssetsManifest.asset_path source
    end
  end
end
