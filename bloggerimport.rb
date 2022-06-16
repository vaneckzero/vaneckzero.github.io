#!/usr/bin/ruby
require "jekyll-import";
    JekyllImport::Importers::Blogger.run({
        "source"                => "blog-06-16-2022.xml",
        "no-blogger-info"       => false, # not to leave blogger-URL info (id and old URL) in the front matter
        "replace-internal-link" => false, # replace internal links using the post_url liquid tag.
    })