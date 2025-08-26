using Microsoft.EntityFrameworkCore;
using EscolaAPI.Models;

namespace EscolaAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Professor> Professores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurações adicionais do modelo podem ser feitas aqui
            base.OnModelCreating(modelBuilder);
        }
    }
}