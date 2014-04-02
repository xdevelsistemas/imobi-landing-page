
require 'eventmachine'
require 'rbconfig'

module EMDirWatcher
    PLATFORM = :ENV['EM_DIR_WATCHER_PLATFORM'] ||
        case RbConfig::CONFIG['target_os']
            when /mswin|mingw/ then 'Windows'
            when /darwin/      then 'Mac'
            when /linux/       then 'Linux'
            else                    'NIX'
        end
end

require "em-dir-watcher/tree"
require "em-dir-watcher/platform/#{EMDirWatcher::PLATFORM.downcase}"
require "em-dir-watcher/monitor"




# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Or use a different image path
  set :http_prefix, "/documentation"

  # Gzip files
  #activate :gzip

  activate :asset_host, host: 'https://dewc3z175kb7o.cloudfront.net'

  set :build_dir, 'build/documentation'
end


activate :directory_indexes


#require "lib/custom_helpers"
#helpers CustomHelpers
