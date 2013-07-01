json.array!(@journal) do |journal_entry|
  json.extract! journal_entry, :body
  json.url journal_entry_url(journal_entry, format: :json)
end
