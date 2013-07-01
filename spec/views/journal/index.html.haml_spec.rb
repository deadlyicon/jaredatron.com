require 'spec_helper'

describe "journal/index" do
  before(:each) do
    assign(:journal, [
      stub_model(JournalEntry,
        :body => "MyText"
      ),
      stub_model(JournalEntry,
        :body => "MyText"
      )
    ])
  end

  it "renders a list of journal" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
