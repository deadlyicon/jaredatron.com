require 'rails_helper'

describe "journal/show" do
  before(:each) do
    @journal_entry = assign(:journal_entry, stub_model(JournalEntry,
      :body => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/MyText/)
  end
end
