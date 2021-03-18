using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public partial class WarehouseContext : DbContext
    {
        public WarehouseContext(DbContextOptions<WarehouseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<County> Counties { get; set; }
        public virtual DbSet<SchoolDistrict> SchoolDistricts { get; set; }
        public virtual DbSet<Township> Townships { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<County>(entity =>
            {
                entity.ToTable("ODOTREF_COUNTY");

                entity.Property(e => e.CountyId)
                    .HasColumnName("COUNTY_ABREV3_CD")
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Abbrev4)
                    .HasColumnName("COUNTY_ABREV4_CD")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("COUNTY_NME")
                    .HasMaxLength(20)
                    .IsUnicode(false);

            });
            modelBuilder.Entity<SchoolDistrict>(entity =>
            {
                entity.ToTable("ODOTREF_WGIS_SCHOOL_DISTRICTS");

                entity.Property(e => e.SchoolDistrictId)
                    .HasColumnName("ID")
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(true);

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .IsRequired()
                    .HasMaxLength(51)
                    .IsUnicode(true);
            });
            modelBuilder.Entity<Township>(entity =>
            {
                entity.ToTable("REFER_TOWNSHIP");

                entity.Property(e => e.TownshipId)
                    .HasColumnName("TOWNSHIP_ID")
                    .IsRequired();

                entity.Property(e => e.Name)
                    .HasColumnName("TOWNSHIP_NAME")
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(true);

                entity.Property(e => e.CountyId)
                    .HasColumnName("COUNTY_CD")
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(true);
            });
        }
    }
}
