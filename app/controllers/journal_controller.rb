class JournalController < ApplicationController

  before_filter :require_authentication!
  before_action :set_journal_entry, only: [:show, :edit, :update, :destroy]

  # GET /journal
  # GET /journal.json
  def index
    @journal = JournalEntry.all
  end

  # GET /journal/1
  # GET /journal/1.json
  def show
  end

  # GET /journal/new
  def new
    @journal_entry = JournalEntry.new
  end

  # GET /journal/1/edit
  def edit
  end

  # POST /journal
  # POST /journal.json
  def create
    @journal_entry = JournalEntry.new(journal_entry_params)

    respond_to do |format|
      if @journal_entry.save
        format.html { redirect_to @journal_entry, notice: 'Journal entry was successfully created.' }
        format.json { render action: 'show', status: :created, location: @journal_entry }
      else
        format.html { render action: 'new' }
        format.json { render json: @journal_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /journal/1
  # PATCH/PUT /journal/1.json
  def update
    respond_to do |format|
      if @journal_entry.update(journal_entry_params)
        format.html { redirect_to @journal_entry, notice: 'Journal entry was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @journal_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /journal/1
  # DELETE /journal/1.json
  def destroy
    @journal_entry.destroy
    respond_to do |format|
      format.html { redirect_to journal_entries_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_journal_entry
      @journal_entry = JournalEntry.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def journal_entry_params
      params.require(:journal_entry).permit(:body)
    end
end
