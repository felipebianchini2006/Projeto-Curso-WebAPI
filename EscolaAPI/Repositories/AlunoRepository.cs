// AlunoRepository.cs
using EscolaAPI.Data;
using EscolaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EscolaAPI.Repositories
{
    public class AlunoRepository : IAlunoRepository
    {
        private readonly AppDbContext _context;

        public AlunoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Aluno>> GetAllAsync()
        {
            return await _context.Alunos.Include(a => a.Professor).ToListAsync();
        }

        public async Task<Aluno> GetByIdAsync(int id)
        {
            return await _context.Alunos.Include(a => a.Professor).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Aluno> AddAsync(Aluno aluno)
        {
            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();
            return aluno;
        }

        public async Task<Aluno> UpdateAsync(Aluno aluno)
        {
            _context.Entry(aluno).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return aluno;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var aluno = await _context.Alunos.FindAsync(id);
            if (aluno == null)
                return false;

            _context.Alunos.Remove(aluno);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}