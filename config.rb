
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
