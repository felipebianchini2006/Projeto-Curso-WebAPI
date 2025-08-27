using EscolaAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace EscolaAPI.Models
{
    public class Aluno
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public TipoEscolaridade Escolaridade { get; set; }

        // Chave estrangeira para Professor
        public int ProfessorId { get; set; }

        // Propriedade de navega��o
        public virtual Professor Professor { get; set; }
    }
}