using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EscolaAPI.Enums;

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

        // Propriedade de navegação
        [ForeignKey("ProfessorId")]
        public virtual Professor Professor { get; set; }
    }
}