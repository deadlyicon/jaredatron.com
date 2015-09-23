require 'rails_helper'

describe "Journal" do
  describe "GET /journal" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get journal_entries_path
      response.status.should be(200)
    end
  end
end
