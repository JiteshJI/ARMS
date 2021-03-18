using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ODOT.ARMS.Web.DTOs;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ARMSContext : DbContext
    {

        public ARMSContext(DbContextOptions<ARMSContext> options)
          : base(options)
        {
        }

        public virtual DbSet<ArmsProject> ArmsProject { get; set; }
        public virtual DbSet<SearchProject> ArmsProjectSearch { get; set; }
        public virtual DbSet<ArmsAgency> ArmsAgency { get; set; }
        public virtual DbSet<ArmsAgencyCategory> ArmsAgencyCategory { get; set; }
        public virtual DbSet<ArmsBudget> ArmsBudget { get; set; }
        public virtual DbSet<ArmsBudgetCategory> ArmsBudgetCategory { get; set; }
        public virtual DbSet<ArmsFundingSource> ArmsFundingSource { get; set; }
        public virtual DbSet<ArmsFundingType> ArmsFundingType { get; set; }
        public virtual DbSet<ArmsAdministrationCategory> ArmsAdministrationCategory { get; set; }
        public virtual DbSet<ArmsSpecificList> ArmsSpecificList { get; set; }
        public virtual DbSet<ArmsInvoiceStatus> ArmsInvoiceStatus { get; set; }
        public virtual DbSet<ArmsMeetingType> ArmsMeetingType { get; set; }
        public virtual DbSet<ArmsProjectStatus> ArmsProjectStatus { get; set; }
        public virtual DbSet<ArmsProjectType> ArmsProjectType { get; set; }
        public virtual DbSet<ArmsDeliverableStatus> ArmsDeliverableStatus { get; set; }
        public virtual DbSet<ArmsDeliverableType> ArmsDeliverableType { get; set; }
        public virtual DbSet<ArmsRoles> ArmsRoles { get; set; }
        public virtual DbSet<ArmsContacts> ArmsContacts { get; set; }
        public virtual DbSet<ArmsContactAgency> ArmsContactAgency { get; set; }
        public virtual DbSet<ArmsVendorAddress> ArmsVendorAddress { get; set; }
        public virtual DbSet<ArmsPhase> ArmsPhases { get; set; }
        public virtual DbSet<Event> ArmsEvents { get; set; }
        public virtual DbSet<ArmsPersonnel> ArmsPersonnel { get; set; }
        public virtual DbSet<FileUpload> ArmsEventUploads { get; set; }
        public virtual DbSet<SrcFileCount> ArmsSrcFileCount { get; set; }
        public virtual DbSet<SrcFileCount> ArmsSrcCBFileCount { get; set; }
        public virtual DbSet<BudgetCatDD> ArmsBudgetCatDD { get; set; }

        public virtual DbSet<Funding> ArmsFunding { get; set; }

        public virtual DbSet<ControllingBoard> ArmsControllingBoards { get; set; }
        public virtual DbSet<ConfigItem> ArmsConfigItems { get; set; }
        public virtual DbSet<Invoice> ArmsInvoices { get; set; }
        public virtual DbSet<InvoiceDetail> ArmsInvoiceDetails { get; set; }

        public virtual DbSet<ProjectBalance> ArmsProjectBalance { get; set; }

        public virtual DbSet<ArmsDeliverables> ArmsDeliverables {get;set;}

        public virtual DbSet<ArmsProjectDeliverables> ArmsProjectDeliverables {get;set;}

        public virtual DbSet<LedgerForDD> ArmsLedger { get; set; }

        public virtual DbSet<FinOverviewDD> ArmsFinOverview { get; set; }

        public virtual DbSet<ArmsBudgetInventory> ArmsBudgetInventory { get; set; }

        public virtual DbSet<ArmsContribution> ARMSContributions { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<SearchProject>();
            modelBuilder.Entity<SearchProject>().HasNoKey();
            modelBuilder.Entity<SrcFileCount>().HasNoKey();
            modelBuilder.Entity<BudgetCatDD>().HasNoKey();
            modelBuilder.Entity<LedgerForDD>().HasNoKey();
            modelBuilder.Entity<ProjectBalance>().HasNoKey();
            modelBuilder.Entity<FinOverviewDD>().HasNoKey();
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<ArmsAgency>(entity =>
            {
                entity.HasKey(e => e.AgencyId);

                entity.ToTable("ARMS_AGENCY");

                entity.Property(e => e.AgencyId).HasColumnName("AGENCY_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.UserId)
                  .IsRequired()
                  .HasColumnName("USER_ID");

                entity.Property(e => e.EntryDt)
                  .IsRequired()
                  .HasColumnName("ENTRY_DT");

                entity.Property(e => e.AgencyCatId).HasColumnName("AGENCY_CAT_ID");

                entity.Property(e => e.AgencyNameTxt)
                  .IsRequired()
                  .HasColumnName("AGENCY_NAME_TXT")
                  .HasMaxLength(255);

                entity.Property(e => e.AgencyStatusInd)
                  .IsRequired()
                  .HasColumnName("AGENCY_STATUS_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.ControlBoardApprvlInd)
                  .IsRequired()
                  .HasColumnName("CONTROL_BOARD_APPRVL_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('N')");

                entity.Property(e => e.VendorId).IsRequired(false)
                 .HasColumnName("OAKS_VENDOR_NO");

                //entity.HasOne(d => d.AgencyCat)
                //    .WithMany(p => p.ArmsAgency)
                //    .HasForeignKey(d => d.AgencyCatId)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK_AGENCY_CATEGORY");
            });

            modelBuilder.Entity<ArmsAgencyCategory>(entity =>
            {
                entity.HasKey(e => e.AgencyCatId)
                  .HasName("PK_AGENCY_CAT");

                entity.ToTable("ARMS_AGENCY_CATEGORY");

                entity.Property(e => e.AgencyCatId)
                  .HasColumnName("AGENCY_CAT_ID");

                entity.Property(e => e.AgencyCategoryTxt)
                  .IsRequired()
                  .HasColumnName("AGENCY_CATEGORY_TXT")
                  .HasMaxLength(255);

                entity.Property(e => e.ControllingBoardApprvl)
                  .IsRequired()
                  .HasColumnName("CONTROLLING_BOARD_APPRVL")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('N')");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");
            });

            modelBuilder.Entity<ArmsBudget>(entity =>
            {
                entity.HasKey(e => e.BudgetId);

                entity.ToTable("ARMS_BUDGET");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .IsFixedLength();

                entity.Property(e => e.Amount).HasColumnName("AMOUNT");

                entity.Property(e => e.BcAltId).HasColumnName("BC_ALT_ID");

                //entity.Property(e => e.BudgetAltId).HasColumnName("BUDGET_ALT_ID"); 

                entity.Property(e => e.BudgetId)
                  .HasColumnName("BUDGET_ID")
                  .HasDefaultValueSql("(newid())");

                entity.Property(e => e.BudgetTitle)
                  .IsRequired()
                  .HasColumnName("BUDGET_TITLE")
                  .HasMaxLength(255);

                entity.Property(e => e.EntryDt)
                  .HasColumnName("ENTRY_DT")
                  .HasColumnType("date");

                entity.Property(e => e.Notes)
                  .HasColumnName("NOTES")
                  .IsUnicode(false);

                entity.Property(e => e.OdotFunding)
                  .HasColumnName("ODOT_FUNDING")
                  .HasColumnType("money");

                entity.Property(e => e.OrgCostSharing)
                  .HasColumnName("ORG_COST_SHARING")
                  .HasColumnType("money");

                entity.Property(e => e.PhaseId)
                  .HasColumnName("PHASE_ID")
                  .HasDefaultValueSql("(newid())");

                entity.Property(e => e.Qty).HasColumnName("QTY");

                entity.Property(e => e.UserId)
                  .IsRequired()
                  .HasColumnName("USER_ID")
                  .HasMaxLength(50);
            });

            modelBuilder.Entity<ArmsBudgetCategory>(entity =>
            {
                entity.HasKey(e => e.BudgetCatId);

                entity.HasKey(e => new { e.BudgetCatId, e.ProjId });

                entity.ToTable("ARMS_BUDGET_CATEGORY");

                entity.Property(e => e.BudgetCatId)
                  .HasColumnName("BUDGET_CAT_ID");

                entity.Property(e => e.ProjId)
                  .HasColumnName("PROJ_ID");

                entity.Property(e => e.BcAltId)
                  .HasColumnName("BC_ALT_ID")
                  .ValueGeneratedOnAdd();

                entity.Property(e => e.BudgetAmt)
                  .HasColumnName("BUDGET_AMT")
                  .HasColumnType("money");

                entity.Property(e => e.BudgetCatId).HasColumnName("BUDGET_CAT_ID").ValueGeneratedNever();

                entity.Property(e => e.EntryDt)
                  .HasColumnName("ENTRY_DT")
                  .HasColumnType("date");

                entity.Property(e => e.ProjId).HasColumnName("PROJ_ID");

                entity.Property(e => e.UserId)
                  .IsRequired()
                  .HasColumnName("USER_ID")
                  .HasMaxLength(50);
            });

            modelBuilder.Entity<ArmsFundingSource>(entity =>
            {
                entity.HasKey(e => e.FundingSrcId)
                  .HasName("PK_ARMS_FUNDING_SOURCE");

                entity.ToTable("ARMS_FUNDING_SOURCE");

                entity.Property(e => e.FundingSrcId).HasColumnName("FUNDING_SRC_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.FundingSrcTxt)
                  .IsRequired()
                  .HasColumnName("FUNDING_SRC_TXT")
                  .HasMaxLength(50);
            });

            modelBuilder.Entity<ArmsFundingType>(entity =>
            {
                entity.HasKey(e => e.FundingTypeId);

                entity.ToTable("ARMS_FUNDING_TYPE");

                entity.Property(e => e.FundingTypeId).HasColumnName("FUNDING_TYPE_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.FundingTypeTxt)
                  .IsRequired()
                  .HasColumnName("FUNDING_TYPE_TEXT")
                  .HasMaxLength(50);

            });

            modelBuilder.Entity<ArmsSpecificList>(entity =>
            {
                entity.HasKey(e => e.SpecificListID)
                  .HasName("PK_ARMS_Specific_List");

                entity.ToTable("ARMS_SPECIFIC_LIST");

                entity.Property(e => e.SpecificListID)
                  .HasColumnName("Specific_List_ID");

                entity.Property(e => e.SpecificListText)
                  .HasColumnName("Specific_List_Text")
                  .HasMaxLength(255);

                entity.Property(e => e.SpecificListActive)
                  .HasColumnName("Specific_List_Active");

                entity.Property(e => e.FundingTypeID).HasColumnName("Funding_Type_ID");

            });

            modelBuilder.Entity<ArmsAdministrationCategory>(entity =>
            {
                entity.HasKey(e => e.AdministrationCategoryID).HasName("PK_ARMS_ADMINISTRAION_CATEGORY"); ;

                entity.ToTable("ARMS_ADMINISTRATION_CATEGORY");

                entity.Property(e => e.AdministrationCategoryID)
                .HasColumnName("Administration_Category_ID");

                entity.Property(e => e.PrimaryTypeId)
                .HasColumnName("Primary_Type_ID");

                entity.Property(e => e.AdministrationCategoryText)
                  .HasColumnName("Administration_Category_Text")
                  .HasMaxLength(255);


                entity.Property(e => e.ControllingBoardApprvl)
                  .HasColumnName("Controlling_Board_Apprvl")
                  .HasMaxLength(10)
                  .IsUnicode(false);

                entity.Property(e => e.ACTIVEIND)
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.SpecificListID).HasColumnName("Specific_List_ID");

                entity.Property(e => e.AdministrationCategoryActive)
                  .HasColumnName("Administration_Category_Active");

                entity.HasOne(d => d.ArmsSpecificList)
                  .WithMany(p => p.ArmsAdministrationCategories)
                  .HasForeignKey(d => d.SpecificListID)
                  .HasConstraintName("FK_ARMS_ADMINISTRAION_CATEGORY_ARMS_Specific_List");
            });

            modelBuilder.Entity<ArmsInvoiceStatus>(entity =>
            {
                entity.HasKey(e => e.InvoiceStatusId);

                entity.ToTable("ARMS_INVOICE_STATUS");

                entity.Property(e => e.InvoiceStatusId).HasColumnName("INVOICE_STATUS_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.InvoiceStatusTxt)
                  .IsRequired()
                  .HasColumnName("INVOICE_STATUS_TXT")
                  .HasMaxLength(50);
            });

            modelBuilder.Entity<ArmsMeetingType>(entity =>
            {
                entity.HasKey(e => e.MeetingTypeId);

                entity.ToTable("ARMS_MEETING_TYPE");

                entity.Property(e => e.MeetingTypeId).HasColumnName("MEETING_TYPE_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.MeetingTypeTxt)
                  .IsRequired()
                  .HasColumnName("MEETING_TYPE_TXT")
                  .HasMaxLength(255);
            });

            modelBuilder.Entity<ArmsProjectStatus>(entity =>
            {
                entity.HasKey(e => e.ProjectStatusId);

                entity.ToTable("ARMS_PROJECT_STATUS");

                entity.Property(e => e.ProjectStatusId).HasColumnName("PROJECT_STATUS_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.ProjectStatusTxt)
                  .IsRequired()
                  .HasColumnName("PROJECT_STATUS_TXT")
                  .HasMaxLength(255);

            });

            modelBuilder.Entity<ArmsProjectType>(entity =>
            {
                entity.HasKey(e => new { e.ProjectTypeId, e.ProjectId });
                entity.ToTable("ARMS_PROJECT_TYPES");
                entity.Property(e => e.ProjectTypeId).HasColumnName("PROJECT_TYPE_ID");
                entity.Property(e => e.ProjectId).HasColumnName("PROJ_ID");
                entity.Property(e => e.UserId)
                    .HasColumnName("USER_ID")
                    .HasMaxLength(50);
                entity.Property(e => e.EntryDate)
                   .HasColumnName("ENTRY_DT")
                   .HasColumnType("date")
                   .HasDefaultValueSql("(getdate())");
                entity.HasOne(d => d.Project)
                  .WithMany(p => p.ArmsProjectType)
                  .HasForeignKey(d => d.ProjectId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_PROJECT_TYPES_PROJ");
                entity.HasOne(d => d.AdminCategory)
                  .WithMany(p => p.ArmsProjectType)
                  .HasForeignKey(d => d.ProjectTypeId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_PROJECT_TYPES_PROJECT_TYPE");
            });

            modelBuilder.Entity<ArmsDeliverableStatus>(entity =>
            {
                entity.HasKey(e => e.DeliverableStatusId)
                .HasName("PK_ARMS_DELIVERABLE_STATUS"); ;

                entity.ToTable("ARMS_DELIVERABLE_STATUS");

                entity.Property(e => e.DeliverableStatusId).HasColumnName("DELIVERABLE_STATUS_ID");

                entity.Property(e => e.ActiveInd)
                .IsRequired()
                .HasColumnName("ACTIVE_IND")
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasDefaultValueSql("('A')");


                entity.Property(e => e.DeliverableStatustxt)
                .IsRequired()
                .HasColumnName("DELIVERABLE_STATUS_TXT")
                .HasMaxLength(255);
            });

            modelBuilder.Entity<ArmsDeliverableType>(entity =>
            {
                entity.HasKey(e => e.DeliverableTypeId);

                entity.ToTable("ARMS_DELIVERABLE_TYPE");

                entity.Property(e => e.DeliverableTypeId).HasColumnName("DELIVERABLE_TYPE_ID");

                entity.Property(e => e.ActiveInd)
                .IsRequired()
                .HasColumnName("ACTIVE_IND")
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasDefaultValueSql("('A')");


                entity.Property(e => e.DeliverableTypeTxt)
                .IsRequired()
                .HasColumnName("DELIVERABLE_TYPE_TXT")
                .HasMaxLength(255);
            });

            modelBuilder.Entity<ArmsRoles>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.ToTable("ARMS_ROLES");

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.RoleNameTxt)
                  .IsRequired()
                  .HasColumnName("ROLE_NAME_TXT")
                  .HasMaxLength(255);
            });

            modelBuilder.Entity<ArmsContacts>(entity =>
            {
                entity.HasKey(e => e.ContactID).HasName("PK_ARMS_CONTACT");


                entity.ToTable("ARMS_CONTACT");

                entity.Property(e => e.ContactID).HasColumnName("CONTACT_ID");

                entity.Property(e => e.FirstName)
               .HasColumnName("FIRST_NME")
               .HasMaxLength(255);

                entity.Property(e => e.LastName)
               .HasColumnName("LAST_NME")
               .HasMaxLength(255);

                entity.Property(e => e.BusinessTitle)
               .HasColumnName("BUSINESS_TITLE")
               .HasMaxLength(255);

                entity.Property(e => e.Suffix)
               .HasColumnName("SUFFIX")
               .HasMaxLength(10);

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.EmailAddress)
               .HasColumnName("EMAIL_TXT")
               .HasMaxLength(255);

                entity.Property(e => e.OrilBrdMbr)
                  .IsRequired()
                  .HasColumnName("ORIL_BRD_MBR_IND")
                  .HasMaxLength(1);

                entity.Property(e => e.UserId)
                .IsRequired()
                .HasColumnName("USER_ID")
                .HasMaxLength(50);

                entity.Property(e => e.Entry_date)
                .IsRequired()
                .HasColumnName("ENTRY_DT")
                .HasColumnType("date");

            });

            modelBuilder.Entity<ArmsContactAgency>(entity =>
            {
                entity.HasKey(e => e.ContactAgencyId).HasName("PK_ARMS_CONTACT_AGENCY");


                entity.ToTable("ARMS_CONTACT_AGENCY");

                entity.Property(e => e.ContactAgencyId)
                .HasColumnName("CONTACT_AGENCY_ID");

                entity.Property(e => e.AgencyID)
                .HasColumnName("AGENCY_ID");

                entity.Property(e => e.Address1)
               .HasColumnName("ADDR1_TXT")
               .HasMaxLength(255);

                entity.Property(e => e.Address2)
               .HasColumnName("ADDR2_TXT")
               .HasMaxLength(255);

                entity.Property(e => e.City)
               .HasColumnName("CITY_TXT")
               .HasMaxLength(255);

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.State)
               .HasColumnName("STATE_CD")
               .HasMaxLength(2);

                entity.Property(e => e.Zip)
               .HasColumnName("ZIP_CD")
               .HasMaxLength(5);

                entity.Property(e => e.ZipExtCd)
                .HasColumnName("ZIP_EXT_CD")
                .HasMaxLength(4);

                entity.Property(e => e.BusinessPhone)
               .HasColumnName("BUSINESS_PHONE")
               .HasMaxLength(15);


                entity.Property(e => e.BusinessPhoneExt)
              .HasColumnName("BUSINESS_PHONE_EXT")
              .HasMaxLength(10);

                entity.Property(e => e.MobilePhone)
              .HasColumnName("MOBILE_PHONE")
              .HasMaxLength(15);

                entity.Property(e => e.ActiveInd)
              .HasColumnName("ACTIVE_IND")
              .HasMaxLength(1);

                entity.Property(e => e.ContactId)
               .HasColumnName("CONTACT_ID");


                entity.Property(e => e.UserId)
                .IsRequired()
                .HasColumnName("USER_ID")
                .HasMaxLength(50);

                entity.Property(e => e.Entry_Date)
                .IsRequired()
                .HasColumnName("ENTRY_DT")
                .HasColumnType("date")
                .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.StateCdNavigation)
                  .WithMany(p => p.ArmsContactAgency)
                  .HasForeignKey(d => d.State)
                  .HasConstraintName("FK_CONTACT_AGENCY_STATE");

                entity.HasOne(d => d.Contact)
                  .WithMany(p => p.ArmsContactAgency)
                  .HasForeignKey(d => d.ContactId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_CONTACT_AGENCY_CONTACT");

                entity.HasOne(d => d.Agency)
                  .WithMany(p => p.ArmsContactAgency)
                  .HasForeignKey(d => d.AgencyID);




            });

            modelBuilder.Entity<ArmsUsStates>(entity =>
            {
                entity.HasKey(e => e.UsStateCd);

                entity.ToTable("ARMS_US_STATES");

                entity.Property(e => e.UsStateCd)
                  .HasColumnName("US_STATE_CD")
                  .HasMaxLength(2);

                entity.Property(e => e.UsStateNme)
                  .IsRequired()
                  .HasColumnName("US_STATE_NME")
                  .HasMaxLength(255);

                entity.Property(e => e.UsStatesId)
                  .HasColumnName("US_STATES_ID")
                  .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<ArmsPersonnel>(entity =>
            {
                entity.HasKey(e => e.PersonnelId);

                entity.ToTable("ARMS_PERSONNEL");

                entity.Property(e => e.PersonnelId)
                  .HasColumnName("PERSONNEL_ID")
                  .HasDefaultValueSql("(newid())");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .IsFixedLength()
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.ContactId).HasColumnName("CONTACT_ID");

                entity.Property(e => e.EntryDt)
                  .HasColumnName("ENTRY_DT")
                  .HasColumnType("date")
                  .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsLeadInd)
                  .HasColumnName("IS_LEAD_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .IsFixedLength();

                entity.Property(e => e.ProjId).HasColumnName("PROJ_ID");

                entity.Property(e => e.RoleId).HasColumnName("ROLE_ID");

                entity.Property(e => e.UserId)
                  .IsRequired()
                  .HasColumnName("USER_ID")
                  .HasMaxLength(50);

                entity.HasOne(d => d.Contact)
                  .WithMany(p => p.ArmsPersonnel)
                  .HasForeignKey(d => d.ContactId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_PERSONNEL_CONTACT");

                entity.HasOne(d => d.Proj)
                  .WithMany(p => p.ArmsPersonnel)
                  .HasForeignKey(d => d.ProjId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_PERSONNEL_PROJ");

                entity.HasOne(d => d.Role)
                  .WithMany(p => p.ArmsPersonnel)
                  .HasForeignKey(d => d.RoleId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_PERSONNEL_ROLE");
            });

            modelBuilder.Entity<ArmsProject>(entity =>
            {
                entity.HasKey(e => e.ProjId);

                entity.ToTable("ARMS_PROJECT");

                entity.Property(e => e.ProjId)
                  .HasColumnName("PROJ_ID")
                .HasDefaultValueSql("(newid())");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .IsFixedLength()
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.AddressCd)
                  .HasColumnName("ADDRESS_CD")
                  .HasMaxLength(100);

                entity.Property(e => e.AgencyId).HasColumnName("AGENCY_ID");

                entity.Property(e => e.AgreementNum)
                  .HasColumnName("AGREEMENT_NUM")
                  .HasMaxLength(100);

                entity.Property(e => e.ContractEndDt)
                  .HasColumnName("CONTRACT_END_DT")
                  .HasColumnType("date");

                entity.Property(e => e.ContractStartDt)
                  .HasColumnName("CONTRACT_START_DT")
                  .HasColumnType("date");

                entity.Property(e => e.CurrentEndDt)
                  .HasColumnName("CURRENT_END_DT")
                  .HasColumnType("date");

                entity.Property(e => e.EntryDt)
                  .HasColumnName("ENTRY_DT")
                  .HasColumnType("date")
                  .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FedAuthNum)
                  .HasColumnName("FED_AUTH_NUM")
                  .HasMaxLength(100);

                entity.Property(e => e.GoalsTxt)
                  .HasColumnName("GOALS_TXT")
                  .HasColumnType("ntext");

                entity.Property(e => e.IdeaNum)
                  .HasColumnName("IDEA_NUM")
                  .HasMaxLength(100);

                entity.Property(e => e.ImpStatusInd)
                  .HasColumnName("IMP_STATUS_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .IsFixedLength();

                entity.Property(e => e.ObjectiveTxt)
                  .HasColumnName("ABSTRACT_TXT")
                  .HasColumnType("ntext");

                entity.Property(e => e.PidNum)
                  .HasColumnName("PID_NUM")
                  .HasMaxLength(100);

                entity.Property(e => e.ProjectClassificationId)
                  .HasColumnName("PROJECT_CLASSIFICATION_ID");

                entity.Property(e => e.ProjectDuration)
                  .HasColumnName("PROJECT_DURATION");

                entity.Property(e => e.ProjectStatusId)
                  .HasColumnName("PROJECT_STATUS_ID");

                entity.Property(e => e.ProjectTitleTxt)
                  .HasColumnName("PROJECT_TITLE_TXT")
                  .HasMaxLength(255);

                entity.Property(e => e.PropFiscalYr)
                  .HasColumnName("PROP_FISCAL_YR")
                  .HasMaxLength(4);

                entity.Property(e => e.RfpNum)
                  .HasColumnName("RFP_NUM")
                  .HasMaxLength(100);


                entity.Property(e => e.StandardDeliverableInd)
                  .HasColumnName("STANDARD_DELIVERABLE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .IsFixedLength();

                entity.Property(e => e.StateJobNum)
                  .HasColumnName("STATE_JOB_NUM")
                  .HasMaxLength(100);

                entity.Property(e => e.SummaryTxt)
                  .HasColumnName("SUMMARY_TXT")
                  .HasMaxLength(255);

                entity.Property(e => e.TpfNum)
                  .HasColumnName("TPF_NUM")
                  .HasMaxLength(50);

                entity.Property(e => e.UserId)
                  .IsRequired()
                  .HasColumnName("USER_ID")
                  .HasMaxLength(50);

                entity.Property(e => e.VendorIdTxt)
                  .HasColumnName("VENDOR_ID_TXT")
                  .HasMaxLength(100);

                entity.Property(e => e.WithholdingAmount)
                 .HasColumnName("WITHHOLDING_AMOUNT")
                 .HasMaxLength(100);
                //entity.Property(e => e.ProjectAltId).IsRequired().HasColumnName("PROJ_ALT_ID");
                entity.Property(e => e.ProjectAltId).HasColumnName("PROJ_ALT_ID").Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            });

            modelBuilder.Entity<ArmsVendorAddress>(entity =>
            {
                entity.ToTable("ARMS_VENDOR_ADDRESS");
                entity.Property(e => e.oaksVendorNo).HasColumnName("OAKS_VENDOR_NO");
                entity.Property(e => e.oaksVendorNo).HasColumnName("OAKS_VENDOR_NO").HasMaxLength(10);
                entity.Property(e => e.vendorName).HasColumnName("VENDOR_NAME").HasMaxLength(110);
                entity.Property(e => e.addressSeqNo).HasColumnName("ADDRESS_SEQ_NO").HasMaxLength(3);
                entity.Property(e => e.vendorAddress).HasColumnName("VENDOR_ADDRESS").HasMaxLength(120);
                entity.HasKey(n => new { n.oaksVendorNo, n.addressSeqNo });
            });

            modelBuilder.Entity<ArmsPhase>(entity =>
            {
                // Properties
                entity.Property(t => t.UserId)
          .IsRequired()
          .HasMaxLength(50);
                entity.Property(t => t.ActiveInd)
                  .IsRequired()
                  .IsFixedLength()
                  .HasMaxLength(1);
                entity.Property(t => t.PhaseTitle)
                  .HasMaxLength(100);
                entity.Property(t => t.MergeInd)
                  .IsFixedLength()
                  .HasMaxLength(1);
                entity.ToTable("ARMS_PHASE");
                entity.Property(t => t.PhaseId).HasColumnName("PHASE_ID");
                entity.Property(t => t.ProjId).HasColumnName("PROJ_ID");
                entity.Property(t => t.PhaseNum).HasColumnName("PHASE_NUM");
                entity.Property(t => t.BeginDate).HasColumnName("BEGIN_DT");
                entity.Property(t => t.EndDate).HasColumnName("END_DT");
                entity.Property(t => t.Amount).HasColumnName("AMT");
                entity.Property(t => t.UserId).HasColumnName("USER_ID");
                entity.Property(t => t.EntryDate).HasColumnName("ENTRY_DT").HasDefaultValueSql("getdate()");
                entity.Property(t => t.ActiveInd).HasColumnName("ACTIVE_IND");
                entity.Property(t => t.PhaseTitle).HasColumnName("PHASE_TITLE");
                entity.Property(t => t.MergeInd).HasColumnName("MERGE_IND");
                entity.Property(t => t.MergePhaseId).HasColumnName("MERGE_PHASE_ID");
                entity.Property(t => t.StatusId).HasColumnName("STATUS_ID");
                entity.HasKey(t => t.PhaseId);


            });

            modelBuilder.Entity<Event>(entity =>
            {

                // Primary Key
                entity.HasKey(t => t.EventId);
                // Properties
                entity.Property(t => t.InvoiceNumber)
          .HasMaxLength(50);
                entity.Property(t => t.PublicCommentTxt)
                  .HasMaxLength(255);
                entity.Property(t => t.PrivateCommentTxt)
                  .HasMaxLength(255);
                entity.Property(t => t.UserId)
                  .IsRequired()
                  .HasMaxLength(50);
                entity.Property(t => t.ActiveInd)
                  .IsRequired()
                  .IsFixedLength()
                  .HasMaxLength(1);
                // Table & Column Mappings
                entity.ToTable("ARMS_EVENT");
                entity.Property(t => t.EventSrc).HasColumnName("EVENT_SRC");
                entity.Property(t => t.PrimaryTypeId).HasColumnName("PRIMARY_TYPE_ID");
                entity.Property(t => t.SecondaryTypeId).HasColumnName("SECONDARY_TYPE_ID");
                entity.Property(t => t.InvoiceNumber).HasColumnName("INVOICE_NUM");
                entity.Property(t => t.PublicCommentTxt).HasColumnName("PUBLIC_COMMENT_TXT");
                entity.Property(t => t.PrivateCommentTxt).HasColumnName("PRIVATE_COMMENT_TXT");
                entity.Property(t => t.UserId).HasColumnName("USER_ID");
                entity.Property(t => t.BeginDate).HasColumnName("BEGIN_DATE").HasDefaultValueSql("getdate()");
                entity.Property(t => t.EndDate).HasColumnName("END_DATE");
                entity.Property(t => t.ActiveInd).HasColumnName("ACTIVE_IND");
                entity.Property(t => t.EventId).HasColumnName("EVENT_ID");//.HasDefaultValueSql("newid()");
                entity.Property(t => t.ProjectId).HasColumnName("PROJ_ID");
                entity.Property(t => t.ContactId).HasColumnName("CONTACT_ID");
            });

            modelBuilder.Entity<FileUpload>(entity =>
            {
                // Primary Key
                entity.HasKey(t => t.EventUploadId);

                // Properties
                entity.Property(t => t.DocumentName)
          .IsRequired()
          .HasMaxLength(255);

                entity.Property(t => t.PrivateInd)
                  .IsRequired()
                  .IsFixedLength()
                  .HasMaxLength(1);

                entity.Property(t => t.ActiveInd)
                  .IsRequired()
                  .IsFixedLength()
                  .HasMaxLength(1);

                entity.Property(t => t.UserId)
                  .IsRequired()
                  .HasMaxLength(50);
                // Table & Column Mappings
                entity.ToTable("ARMS_EVENT_UPLOAD");
                entity.Property(t => t.EventUploadId).HasColumnName("EVENT_UPLOAD_ID");
                entity.Property(t => t.EventSrc).HasColumnName("EVENT_SRC");
                entity.Property(t => t.DocumentName).HasColumnName("DOC_NME");
                entity.Property(t => t.ProjAltId).HasColumnName("PROJ_ALT_ID");
                entity.Property(t => t.FileSize).HasColumnName("FILE_SIZE");
                entity.Property(t => t.PrivateInd).HasColumnName("PRIVATE_IND");
                entity.Property(t => t.ActiveInd).HasColumnName("ACTIVE_IND");
                entity.Property(t => t.UserId).HasColumnName("USER_ID");
                entity.Property(t => t.UploadDate).HasColumnName("UPLOAD_DT");
            });

            modelBuilder.Entity<ControllingBoard>(entity =>
            {

                entity.HasKey(e => e.ControllingBoardId);

                entity.ToTable("ARMS_CONTROLLING_BOARD");

                entity.Property(e => e.ControllingBoardId)
                  .HasColumnName("CONTROLLING_BOARD_ID");


                entity.Property(e => e.ProjectId)
                 .HasColumnName("PROJ_ID");

                entity.Property(e => e.ControllingBoardNumber)
                .HasColumnName("CONTROLLING_BOARDS_NUM");

                entity.Property(e => e.ControllingBoardType)
                .HasColumnName("CONTROLLING_BOARD_TYPE");
                entity.Property(e => e.PublicCommentText)
               .HasColumnName("PUBLIC_COMMENT_TXT");

                entity.Property(e => e.ControllingBoardStatus)
                .HasColumnName("CONTROLLING_BOARD_STATUS");

                entity.Property(e => e.EntryDate)
                .HasColumnName("ENTRY_DT");

                entity.Property(e => e.UserId)
                .HasColumnName("USER_ID");

                entity.Property(e => e.ActiveInd)
                  .IsRequired()
                  .HasColumnName("ACTIVE_IND")
                  .HasMaxLength(1)
                  .IsUnicode(false)
                  .IsFixedLength()
                  .HasDefaultValueSql("('A')");

                entity.Property(e => e.ControllingBoardDate)
                  .HasColumnName("CONTROLLING_BOARD_DT");

                entity.Property(e => e.SubmissionDate)
                  .HasColumnName("SUBMISSION_DT");

                entity.Property(e => e.ControllingBoardCategory)
                  .HasColumnName("CONTROLLING_BOARD_CAT");
            });

            modelBuilder.Entity<ConfigItem>(entity =>
            {
                entity.HasKey(e => e.KeyNme);
                entity.ToTable("ARMS_CONFIG");

                entity.Property(e => e.KeyNme)
                .IsRequired()
                .HasColumnName("KEY_NAME")
                .HasMaxLength(100);

                entity.Property(e => e.Value)
                .HasColumnName("VALUE");
            });

            modelBuilder.Entity<Funding>(entity =>
            {
                // Primary Key
                entity.HasKey(t => t.EncumbranceId);
                // Properties
                entity.Property(t => t.EncubrancePONum)
          .HasMaxLength(6);
                entity.Property(t => t.UserId)
                  .IsRequired()
                  .HasMaxLength(50);
                entity.Property(t => t.ActiveInd)
                  .IsRequired()
                  .IsFixedLength()
                  .HasMaxLength(1);
                // Table & Column Mappings
                entity.ToTable("ARMS_EMBUMBRANCE");
                entity.Property(t => t.EncumbranceId).HasColumnName("ENCUMBRANCE_ID");
                entity.Property(t => t.ProjectId).HasColumnName("PROJ_ID");
                entity.Property(t => t.EncubranceTypeCD).HasColumnName("ENCUMBRANCE_TYPE_CD");
                entity.Property(t => t.CategoryId).HasColumnName("CATEGORY_ID");
                entity.Property(t => t.FundingSrcCD).HasColumnName("FUNDING_SRC_CD");
                entity.Property(t => t.FundingTypeCD).HasColumnName("FUNDING_TYPE_CD");
                entity.Property(t => t.FiscalYr).HasColumnName("FISCAL_YR");
                entity.Property(t => t.EncubrancePONum).HasColumnName("ENCUMBRANCE_PO_NUM");
                entity.Property(t => t.Amount).HasColumnName("AMT");
                entity.Property(t => t.Notes).HasColumnName("NOTES");
                entity.Property(t => t.UserId).HasColumnName("USER_ID");
                entity.Property(t => t.EntryDate).HasColumnName("ENTRY_DT").HasDefaultValueSql("getdate()");
                entity.Property(t => t.ActiveInd).HasColumnName("ACTIVE_IND");
            });

            // Invoices
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.ToTable("ARMS_INVOICE");
                entity.HasKey(inv => inv.InvoiceId);
                entity.Property(inv => inv.InvoiceId).HasColumnName("INVOICE_ID").HasDefaultValueSql("(newid())");
                entity.Property(inv => inv.PhaseId).IsRequired().HasColumnName("PHASE_ID");
                entity.Property(inv => inv.InvRcvdDt).HasColumnName("INV_RCVD_DT");
                entity.Property(inv => inv.InvDt).HasColumnName("INV_DT");
                entity.Property(inv => inv.StartDt).HasColumnName("INV_START_DT");
                entity.Property(inv => inv.EndDt).HasColumnName("INV_END_DT");
                entity.Property(inv => inv.InvToFinancePaidDt).HasColumnName("INV_TO_FINANCE_PAID_DT");
                entity.Property(inv => inv.ProperInvDt).HasColumnName("PROPER_INV_DT");
                entity.Property(inv => inv.FinalNoticeInd).HasMaxLength(1).HasColumnName("FINAL_NOTICE_IND");
                entity.Property(inv => inv.UserId).HasMaxLength(50).IsRequired().HasColumnName("USER_ID");
                entity.Property(inv => inv.EntryDt).HasColumnName("ENTRY_DT").HasDefaultValueSql("getdate()");
                entity.Property(inv => inv.InvNum).HasMaxLength(300).IsRequired().HasColumnName("INVOICE_NUM");
                entity.Property(inv => inv.FundingStatusCd).IsRequired().HasColumnName("FUNDING_STATUS_CD");
                entity.Property(inv => inv.ProjId).IsRequired().HasColumnName("PROJ_ID");
                entity.Property(inv => inv.PublicCommentTxt).HasColumnName("PUBLIC_COMMENT_TXT");
                entity.Property(inv => inv.PrivateCommentTxt).HasColumnName("PRIVATE_COMMENT_TXT");
            });

            modelBuilder.Entity<InvoiceDetail>(entity =>
            {
                entity.ToTable("ARMS_INVOICE_DETAIL");
                entity.HasKey(invd => invd.invoiceDetailId);
                entity.Property(invd => invd.invoiceDetailId).HasColumnName("INVOICE_DETAIL_ID").ValueGeneratedOnAdd();
                entity.Property(invd => invd.InvoiceId).HasColumnName("INVOICE_ID").IsRequired();
                entity.Property(invd => invd.budgetCategoryId).HasColumnName("BC_ALT_ID").IsRequired();
                entity.Property(invd => invd.budgetId).HasColumnName("BUDGET_ALT_ID");
                entity.Property(invd => invd.InvAmt).HasColumnName("INV_AMT");
                entity.Property(invd => invd.UserId).HasMaxLength(50).IsRequired().HasColumnName("USER_ID");
                entity.Property(invd => invd.EntryDt).HasColumnName("ENTRY_DT").HasDefaultValueSql("getdate()");

            });
       

            
            modelBuilder.Entity<ArmsProjectDeliverables>(entity =>
            {
              entity.ToTable("ARMS_PROJECT_DELIVERABLES");
              entity.HasKey(prjdev => prjdev.ProjectDeliverableId);           
              entity.Property(prjdev => prjdev.ProjectDeliverableId).HasColumnName("PROJ_DELIVERABLE_ID").HasDefaultValueSql("(newid())");
              entity.Property( prjdev => prjdev.ProjId).HasColumnName("PROJ_ID");
              entity.Property(prjdev => prjdev.DeliverableId).HasColumnName("DELIVERABLE_ID");
              entity.Property(prjdev => prjdev.EntryDt).HasColumnName("ENTRY_DT").HasDefaultValueSql("(getdate())");
              entity.Property(prjdev => prjdev.UserId).IsRequired().HasColumnName("USER_ID").HasMaxLength(50);
              entity.HasOne(prjdev => prjdev.armsDeliverables).WithMany(dev => dev.ArmsProjectDeliverables).HasForeignKey(prjdev => prjdev.DeliverableId)
              .OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_ARMS_PROJECT_DELIVERABLES_ARMS_DELIVERABLES");
            });

            modelBuilder.Entity<ArmsDeliverables>(entity =>
            {
              entity.ToTable("ARMS_DELIVERABLES");
              entity.HasKey(dev => dev.DeliverableId);           
              entity.Property(dev => dev.DeliverableId).HasColumnName("DELIVERABLE_ID").HasDefaultValueSql("(newid())");
              entity.Property( dev => dev.DeliverableTxt).HasColumnName("DELIVERABLE_TXT");
              entity.Property(dev => dev.ProjAltId).HasColumnName("PROJ_ALT_ID");
              entity.Property(e => e.EntryDt).HasColumnName("ENTRY_DT").HasDefaultValueSql("(getdate())");
              entity.Property(e => e.UserId).IsRequired().HasColumnName("USER_ID").HasMaxLength(50);
              entity.Property(t => t.ActiveInd).HasColumnName("ACTIVE_IND");
                entity.Property(t => t.DeliverableType).HasColumnName("DELIVERABLE_TYPE");
                entity.Property(t => t.DeliverableAltId).HasColumnName("DELIVERABLE_ALT_ID").HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<ArmsBudgetInventory>(entity =>
            {
                entity.ToTable("ARMS_BUDGET_INVENTORY");
                entity.HasKey(dev => dev.InventoryNumber);
                entity.Property(dev => dev.BudgetId).HasColumnName("BUDGET_ID");
                entity.Property(dev => dev.InventoryNumber).HasColumnName("INVENTORY_NUM");
                entity.Property(dev => dev.UserId).HasColumnName("USER_ID");
                entity.Property(dev => dev.EntryDate).HasColumnName("ENTRY_DT");
            });

            modelBuilder.Entity<ArmsContribution>(entity =>
            {

                entity.ToTable("ARMS_PULLING_CONTRIBUTION");

                entity.Property(e => e.ContributionId)
                  .HasColumnName("CONTROLLING_BOARD_ID");


                entity.Property(e => e.ProjectId)
                 .HasColumnName("PROJ_ID");

                entity.Property(e => e.FiscalYear)
                .HasColumnName("FISCAL_YR");

                entity.Property(e => e.CommittedAmt)
                .HasColumnName("AMT_COMMITTED");
                entity.Property(e => e.TransferredAmt)
               .HasColumnName("AMT_TRANSFERRED");

                entity.Property(e => e.TransferReceiveDate)
                .HasColumnName("TRNSFR_REC_DT");

                entity.Property(e => e.Comment)
               .HasColumnName("COMMENT_TXT");

                entity.Property(e => e.USStateCode)
                .HasColumnName("US_STATES_CD");

                entity.Property(e => e.EntryDate)
                .HasColumnName("ENTRY_DT");

                entity.Property(e => e.UserId)
                .HasColumnName("USER_ID");

            });
        }
    }
}
