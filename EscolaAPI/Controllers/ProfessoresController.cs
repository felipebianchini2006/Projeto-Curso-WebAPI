using EscolaAPI.DTOs;
using EscolaAPI.Models;
using EscolaAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EscolaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessoresController : ControllerBase
    {
        private readonly ProfessorService _professorService;

        public ProfessoresController(ProfessorService professorService)
        {
            _professorService = professorService;
        }

        // GET: api/Professores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfessorDTO>>> GetProfessores()
        {
            var professores = await _professorService.GetAllAsync();
            return Ok(professores);
        }

        // GET: api/Professores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfessorDTO>> GetProfessor(int id)
        {
            var professor = await _professorService.GetByIdAsync(id);

            if (professor == null)
            {
                return NotFound();
            }

            return professor;
        }

        // PUT: api/Professores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfessor(int id, ProfessorCreateDTO professorDTO)
        {
            var professor = await _professorService.UpdateAsync(id, professorDTO);

            if (professor == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Professores
        [HttpPost]
        public async Task<ActionResult<Professor>> PostProfessor(ProfessorCreateDTO professorDTO)
        {
            var professor = await _professorService.AddAsync(professorDTO);
            return CreatedAtAction("GetProfessor", new { id = professor.Id }, professor);
        }

        // DELETE: api/Professores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessor(int id)
        {
            var result = await _professorService.DeleteAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}