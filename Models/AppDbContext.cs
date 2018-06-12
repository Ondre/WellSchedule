using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace WellSchedule.Models {
    class AppDbContext : DbContext
    {
        public DbSet<Job> Jobs { get; set; }

        public DbSet<Well> Well { get; set; }

        public DbSet<Schedule> Schedule { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./wellschedule.db");
        }

    }
}