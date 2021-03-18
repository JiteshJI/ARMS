using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ODOT.ARMS.Web.DTOs;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsWarehouseContext : DbContext
    {

        public ArmsWarehouseContext(DbContextOptions<ArmsWarehouseContext> options) : base(options)
        {
        }

        public virtual DbSet<Encumbrance> ArmsEncumbrance { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Encumbrance>().HasNoKey();
        }

    }
}
