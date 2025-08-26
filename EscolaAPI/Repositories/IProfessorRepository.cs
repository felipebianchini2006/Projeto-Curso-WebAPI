// IProfessorRepository.cs
using EscolaAPI.Models;

namespace EscolaAPI.Repositories
{
    public interface IProfessorRepository
    {
        Task<IEnumerable<Professor>> GetAllAsync();
        Task<Professor> GetByIdAsync(int id);
        Task<Professor> AddAsync(Professor professor);
        Task<Professor> UpdateAsync(Professor professor);
        Task<bool> DeleteAsync(int id);
    }
}