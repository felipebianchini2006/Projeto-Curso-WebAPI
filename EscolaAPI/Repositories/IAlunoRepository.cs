// IAlunoRepository.cs
using EscolaAPI.Models;

namespace EscolaAPI.Repositories
{
    public interface IAlunoRepository
    {
        Task<IEnumerable<Aluno>> GetAllAsync();
        Task<Aluno> GetByIdAsync(int id);
        Task<Aluno> AddAsync(Aluno aluno);
        Task<Aluno> UpdateAsync(Aluno aluno);
        Task<bool> DeleteAsync(int id);
    }
}