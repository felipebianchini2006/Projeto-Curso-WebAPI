using EscolaAPI.DTOs;
using EscolaAPI.Models;
using EscolaAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EscolaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private readonly AlunoService _alunoService;

        public AlunosController(AlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        // GET: api/Alunos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlunoDTO>>> GetAlunos()
        {
            var alunos = await _alunoService.GetAllAsync();
            return Ok(alunos);
        }

        // GET: api/Alunos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlunoDTO>> GetAluno(int id)
        {
            var aluno = await _alunoService.GetByIdAsync(id);

            if (aluno == null)
            {
                return NotFound();
            }

            return aluno;
        }

        // PUT: api/Alunos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAluno(int id, AlunoCreateDTO alunoDTO)
        {
            var aluno = await _alunoService.UpdateAsync(id, alunoDTO);

            if (aluno == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Alunos
        [HttpPost]
        public async Task<ActionResult<Aluno>> PostAluno(AlunoCreateDTO alunoDTO)
        {
            var aluno = await _alunoService.AddAsync(alunoDTO);
            return CreatedAtAction("GetAluno", new { id = aluno.Id }, aluno);
        }

        // DELETE: api/Alunos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAluno(int id)
        {
            var result = await _alunoService.DeleteAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}