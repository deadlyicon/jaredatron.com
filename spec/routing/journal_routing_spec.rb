require "spec_helper"

describe JournalController do
  describe "routing" do

    it "routes to #index" do
      get("/journal").should route_to("journal#index")
    end

    it "routes to #new" do
      get("/journal/new").should route_to("journal#new")
    end

    it "routes to #show" do
      get("/journal/1").should route_to("journal#show", :id => "1")
    end

    it "routes to #edit" do
      get("/journal/1/edit").should route_to("journal#edit", :id => "1")
    end

    it "routes to #create" do
      post("/journal").should route_to("journal#create")
    end

    it "routes to #update" do
      put("/journal/1").should route_to("journal#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/journal/1").should route_to("journal#destroy", :id => "1")
    end

  end
end
