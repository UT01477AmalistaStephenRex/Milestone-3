using Microsoft.EntityFrameworkCore;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;
using WebApplication1.Database.Entities;

namespace WebApplication1.Database
{
    public class LeaveDBContext : DbContext
    {

        public LeaveDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<LeaveRequest> leaveRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .Property(u => u.Status)
                .HasConversion<string>();

            modelBuilder.Entity<LeaveRequest>()
            .Property(u => u.Status)
            .HasConversion<string>();

            modelBuilder.Entity<User>()
                .HasMany(u => u.leaveRequests)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

        


            modelBuilder.Entity<LeaveRequest>()
                .HasOne(r => r.User)
                .WithMany(u => u.leaveRequests)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);


           


            base.OnModelCreating(modelBuilder);
        }


    }

}

