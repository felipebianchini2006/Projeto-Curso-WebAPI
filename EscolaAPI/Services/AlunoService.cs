using EscolaAPI.DTOs;
using EscolaAPI.Enums;
using EscolaAPI.Models;
using EscolaAPI.Repositories;

namespace EscolaAPI.Services
{
    public class AlunoService
    {
        private readonly IAlunoRepository _alunoRepository;

        public AlunoService(IAlunoRepository alunoRepository)
        {
            _alunoRepository = alunoRepository;
        }

        public async Task<IEnumerable<AlunoDTO>> GetAllAsync()
        {
            var alunos = await _alunoRepository.GetAllAsync();
            return alunos.Select(a => new AlunoDTO
            {
                Id = a.Id,
                Nome = a.Nome,
                DataNascimento = a.DataNascimento,
                Escolaridade = (int)a.Escolaridade,
                ProfessorId = a.ProfessorId,
                ProfessorNome = a.Professor?.Nome
            });
        }

        public async Task<AlunoDTO> GetByIdAsync(int id)
        {
            var aluno = await _alunoRepository.GetByIdAsync(id);
            if (aluno == null)
                return null;

            return new AlunoDTO
            {
                Id = aluno.Id,
                Nome = aluno.Nome,
                DataNascimento = aluno.DataNascimento,
                Escolaridade = (int)aluno.Escolaridade,
                ProfessorId = aluno.ProfessorId,
                ProfessorNome = aluno.Professor?.Nome
            };
        }

        public async Task<Aluno> AddAsync(AlunoCreateDTO alunoDTO)
        {
            var aluno = new Aluno
            {
                Nome = alunoDTO.Nome,
                DataNascimento = alunoDTO.DataNascimento,
                Escolaridade = (TipoEscolaridade)alunoDTO.Escolaridade,
                ProfessorId = alunoDTO.ProfessorId
            };

            return await _alunoRepository.AddAsync(aluno);
        }

        public async Task<Aluno> UpdateAsync(int id, AlunoCreateDTO alunoDTO)
        {
            var aluno = await _alunoRepository.GetByIdAsync(id);
            if (aluno == null)
                return null;

            aluno.Nome = alunoDTO.Nome;
            aluno.DataNascimento = alunoDTO.DataNascimento;
            aluno.Escolaridade = (TipoEscolaridade)alunoDTO.Escolaridade;
            aluno.ProfessorId = alunoDTO.ProfessorId;

            return await _alunoRepository.UpdateAsync(aluno);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _alunoRepository.DeleteAsync(id);
        }
    }
}