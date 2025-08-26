using System.ComponentModel.DataAnnotations;

namespace EscolaAPI.Models
{
    public class Professor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        [Required]
        [StringLength(100)]
        public string Materia { get; set; }

        // Relacionamento com Alunos (um professor pode ter muitos alunos)
        public virtual ICollection<Aluno> Alunos { get; set; }
    }
}