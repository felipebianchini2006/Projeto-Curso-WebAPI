using EscolaAPI.DTOs;
using EscolaAPI.Models;
using EscolaAPI.Repositories;

namespace EscolaAPI.Services
{
    public class ProfessorService
    {
        private readonly IProfessorRepository _professorRepository;

        public ProfessorService(IProfessorRepository professorRepository)
        {
            _professorRepository = professorRepository;
        }

        public async Task<IEnumerable<ProfessorDTO>> GetAllAsync()
        {
            var professores = await _professorRepository.GetAllAsync();
            return professores.Select(p => new ProfessorDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                DataNascimento = p.DataNascimento,
                Materia = p.Materia
            });
        }

        public async Task<ProfessorDTO> GetByIdAsync(int id)
        {
            var professor = await _professorRepository.GetByIdAsync(id);
            if (professor == null)
                return null;

            return new ProfessorDTO
            {
                Id = professor.Id,
                Nome = professor.Nome,
                DataNascimento = professor.DataNascimento,
                Materia = professor.Materia
            };
        }

        public async Task<Professor> AddAsync(ProfessorCreateDTO professorDTO)
        {
            var professor = new Professor
            {
                Nome = professorDTO.Nome,
                DataNascimento = professorDTO.DataNascimento,
                Materia = professorDTO.Materia
            };

            return await _professorRepository.AddAsync(professor);
        }

        public async Task<Professor> UpdateAsync(int id, ProfessorCreateDTO professorDTO)
        {
            var professor = await _professorRepository.GetByIdAsync(id);
            if (professor == null)
                return null;

            professor.Nome = professorDTO.Nome;
            professor.DataNascimento = professorDTO.DataNascimento;
            professor.Materia = professorDTO.Materia;

            return await _professorRepository.UpdateAsync(professor);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _professorRepository.DeleteAsync(id);
        }
    }
}