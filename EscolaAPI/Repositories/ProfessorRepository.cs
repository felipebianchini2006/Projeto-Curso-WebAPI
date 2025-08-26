using EscolaAPI.Data;
using EscolaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EscolaAPI.Repositories
{
    public class ProfessorRepository : IProfessorRepository
    {
        private readonly AppDbContext _context;

        public ProfessorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Professor>> GetAllAsync()
        {
            return await _context.Professores.ToListAsync();
        }

        public async Task<Professor> GetByIdAsync(int id)
        {
            return await _context.Professores.FindAsync(id);
        }

        public async Task<Professor> AddAsync(Professor professor)
        {
            _context.Professores.Add(professor);
            await _context.SaveChangesAsync();
            return professor;
        }

        public async Task<Professor> UpdateAsync(Professor professor)
        {
            _context.Entry(professor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return professor;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var professor = await _context.Professores.FindAsync(id);
            if (professor == null)
                return false;

            _context.Professores.Remove(professor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}