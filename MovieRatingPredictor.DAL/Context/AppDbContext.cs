using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MovieRatingPredictor.DAL.Entities;

namespace MovieRatingPredictor.DAL.Context;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<UserStatistic> UserStatistics { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:imdb-rating-predictor.database.windows.net,1433;Initial Catalog=imdb-rating-predictor-db;Persist Security Info=False;User ID=serverAdmin;Password=Pa$$word!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserStatistic>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserStat__3214EC07F07A15F7");

            entity.Property(e => e.ImdbRating)
                .HasColumnType("decimal(2, 1)")
                .HasColumnName("IMDB_Rating");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
