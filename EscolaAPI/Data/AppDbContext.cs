using EscolaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EscolaAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Professor> Professores { get; set; }
        public DbSet<Aluno> Alunos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração do relacionamento Professor -> Alunos
            modelBuilder.Entity<Aluno>()
                .HasOne(a => a.Professor)
                .WithMany(p => p.Alunos)
                .HasForeignKey(a => a.ProfessorId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}